import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ModelMetadata } from 'core-db/model.metadata';
import { ICategory, IPhoneCalls } from 'core-db/interface';
import { CreatePhoneCallSchedulerDto } from '../dto/phone-call.dto';
import * as moment from 'moment-timezone';
import {
  OrderInitiationStatus,
  PhoneCallStatus,
} from 'core-db/enums/phoneCall.scheduler.status';

@Injectable()
export class CreatePhoneCallService {
  constructor(
    @Inject(ModelMetadata.PhoneCallScheduler.token)
    private readonly PhoneCallSchedulerModel: Model<IPhoneCalls>,
    @Inject(ModelMetadata.Category.token)
    private readonly categoryModel: Model<ICategory>,
  ) {}

  async createPhoneCallAppointment(dto: CreatePhoneCallSchedulerDto, req: any) {
    const isExist = await this.PhoneCallSchedulerModel.findOne({
      profile: req.user._id,
      callStatus: PhoneCallStatus.PENDING,
      orderInitiationStatus: OrderInitiationStatus.PENDING,
    });

    const appointmentDate = moment.tz(dto.appointmentDate, 'Asia/Kolkata');
    const utcDate = moment(appointmentDate).utc().toDate();
    const now = moment().tz('Asia/Kolkata');
    const isPastDate = appointmentDate.isBefore(now);

    if (isPastDate) {
      throw new BadRequestException('Cannot schedule appointment in the past');
    }

    const cat = await this.categoryModel.findOne({ id: dto.category });

    if (!cat) {
      throw new BadRequestException('Invalis selected category');
    }

    if (isExist) {
      isExist.appointmentDate = utcDate;
      isExist.category = cat._id as unknown as Types.ObjectId;
      isExist.notes = dto.notes;

      await isExist.save();
      return isExist;
    }

    return this.PhoneCallSchedulerModel.create({
      ...dto,
      profile: req.user._id,
      appointmentDate: utcDate,
      category: cat._id,
    });
  }

  async getAllCallsList(dto: any) {
    const {
      categoryName,
      customerPhone,
      sortBy = 'newest',
      appointmentDate,
      page = 1,
      limit = 20,
      callStatus,
      orderStatus,
    } = dto;

    const pageLimit = Math.min(Number(limit), 50);
    const currentPage = Math.max(1, Number(page));
    const skip = (currentPage - 1) * pageLimit;

    const query: any = {};

    if (appointmentDate) {
      const startOfDay = new Date(appointmentDate + 'T00:00:00.000Z');
      const endOfDay = new Date(appointmentDate + 'T23:59:59.999Z');

      query.appointmentDate = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    if (callStatus) {
      query.callStatus = callStatus;
    }

    if (orderStatus) {
      query.orderInitiationStatus = orderStatus;
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      appointmentDate: { appointmentDate: 1 },
    };

    const pipeline = [
      { $match: query },

      {
        $lookup: {
          from: 'profiles',
          localField: 'profile',
          foreignField: '_id',
          as: 'profile',
          pipeline: [
            ...(customerPhone ? [{ $match: { phone: customerPhone } }] : []),
            { $project: { phone: 1, firstName: 1, lastName: 1 } },
          ],
        },
      },

      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
          pipeline: [
            ...(categoryName
              ? [
                  {
                    $match: {
                      name: { $regex: categoryName, $options: 'i' },
                    },
                  },
                ]
              : []),
            { $project: { name: 1, id: 1 } },
          ],
        },
      },

      ...(customerPhone
        ? [{ $match: { 'profile.0': { $exists: true } } }]
        : []),
      ...(categoryName
        ? [{ $match: { 'category.0': { $exists: true } } }]
        : []),

      {
        $addFields: {
          profile: { $arrayElemAt: ['$profile', 0] },
          category: { $arrayElemAt: ['$category', 0] },
        },
      },

      { $sort: sortOptions[sortBy] || sortOptions.newest },

      {
        $facet: {
          data: [{ $skip: skip }, { $limit: pageLimit }],
          count: [{ $count: 'total' }],
        },
      },
    ];

    const [result] = await this.PhoneCallSchedulerModel.aggregate(pipeline);
    const calls = result.data;
    const totalCount = result.count[0]?.total || 0;
    const totalPages = Math.ceil(totalCount / pageLimit);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return {
      calls,
      pagination: {
        currentPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
        count: totalCount,
        limit: pageLimit,
        nextPage: hasNextPage ? currentPage + 1 : null,
        prevPage: hasPrevPage ? currentPage - 1 : null,
      },
      filters: {
        customerPhone,
        appointmentDate,
        sortBy,
        categoryName,
      },
    };
  }

  async updateCall(callId, updates) {
    const allowedFields = ['callStatus', 'orderInitiationStatus'];
    const filteredUpdates = Object.keys(updates)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    return this.PhoneCallSchedulerModel.findOneAndUpdate(
      { _id: callId },
      { $set: filteredUpdates },
      { new: true, lean: true },
    );
  }
}
