import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as moment from 'moment-timezone';
import { CouponSubType } from 'core-db/enums/payment.enums';

import { IMetaMaster, IOrder } from 'core-db/interface';
import { ModelMetadata } from 'core-db/model.metadata';
import { MetaMasterDto } from '../dto/meta.master.dto';
import { OrderStatus } from 'core-db/enums';

@Injectable()
export class MetaMasterService {
  constructor(
    @Inject(ModelMetadata.MetaMaster.token)
    private readonly metaModel: Model<IMetaMaster>,
    @Inject(ModelMetadata.Order.token)
    private readonly orderModel: Model<IOrder>,
  ) {}

  async findAll() {
    try {
      return await this.metaModel.find();
    } catch (error) {
      throw new Error(`Error fetching all metadata: ${error.message}`);
    }
  }

  async findDistinctTypes(): Promise<string[]> {
    try {
      return await this.metaModel.distinct('type', { isActive: true });
    } catch (error) {
      throw new Error(`Error fetching distinct label types: ${error.message}`);
    }
  }

  async findMetaType(type: string): Promise<any[]> {
    try {
      return await this.metaModel.find({ type: type, isActive: true }).exec();
    } catch (error) {
      throw new Error(
        `Error fetching meta data for type "${type}": ${error.message}`,
      );
    }
  }

  async addCoupon(dto: MetaMasterDto) {
    const coupon = await this.metaModel.findOne({ label: dto.label });
    if (coupon) {
      throw new BadRequestException('Coupon already exists');
    }

    if (
      dto.subType !== CouponSubType.PRICE_REDUCTION &&
      dto.subType !== CouponSubType.PERCENTAGE_REDUCTION
    ) {
      throw new BadRequestException('Invalid coupon sub type');
    }

    if (!dto.value?.expiryDate || !dto.value?.amount || dto.value.amount <= 0) {
      throw new BadRequestException('Expiry date and amount are required');
    }

    const date = moment
      .tz(dto.value?.expiryDate, 'Asia/Kolkata')
      .startOf('day');
    const utcDate = moment(date).utc().toDate();

    if (utcDate < new Date()) {
      throw new BadRequestException('Expiry date is in the past');
    }

    if (dto.value.amount <= 0) {
      throw new BadRequestException('Amount cannot be negative or zero');
    }

    return await this.metaModel.create({
      ...dto,
      value: {
        ...dto.value,
        expiryDate: utcDate,
      },
    });
  }

  async updateCoupon(id: string, dto: MetaMasterDto) {
    const coupon = await this.metaModel.findById(id);
    if (!coupon) {
      throw new BadRequestException('Coupon not found');
    }

    if (
      dto.subType !== CouponSubType.PRICE_REDUCTION &&
      dto.subType !== CouponSubType.PERCENTAGE_REDUCTION
    ) {
      throw new BadRequestException('Invalid coupon sub type');
    }

    if (!dto.value?.expiryDate || !dto.value?.amount || dto.value.amount <= 0) {
      throw new BadRequestException('Expiry date and amount are required');
    }

    const date = moment
      .tz(dto.value?.expiryDate, 'Asia/Kolkata')
      .startOf('day');
    const utcDate = moment(date).utc().toDate();

    if (utcDate < new Date()) {
      throw new BadRequestException('Expiry date is in the past');
    }

    return await this.metaModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        value: {
          ...dto.value,
          expiryDate: utcDate,
        },
      },
      { new: true },
    );
  }

  async deleteCoupon(id: string) {
    const coupon = await this.metaModel.findById(id);
    if (!coupon) {
      throw new BadRequestException('Coupon not found');
    }
    return await this.metaModel.findByIdAndDelete(id);
  }

  async validateCoupon(
    { couponCode, amount }: { couponCode: string; amount: number },
    req: any,
  ) {
    const coupon = await this.metaModel.findOne({ label: couponCode });

    if (!coupon) {
      throw new BadRequestException('Coupon not found');
    }

    if (coupon.value.expiryDate < new Date() || !coupon.isActive) {
      throw new BadRequestException('Coupon has expired');
    }

    if (coupon.value.amount <= 0) {
      throw new BadRequestException('Coupon amount is not valid');
    }

    const ordersCount = await this.orderModel.countDocuments({
      profile: req.user._id,
      status: OrderStatus.COMPLETED,
    });
    const maxDiscount = coupon.value.maxDiscount
      ? parseFloat(coupon.value.maxDiscount)
      : 0;

    if (coupon.value.nthOrder && coupon.value.nthOrder > 0) {
      if (ordersCount !== coupon.value.nthOrder) {
        throw new BadRequestException(
          'You are not eligible for this coupon on this order',
        );
      }
    }

    if (coupon.value.minOrderValue && amount < coupon.value.minOrderValue) {
      throw new BadRequestException(
        'This coupon valid for order amount greater than ' +
          coupon.value.minOrderValue,
      );
    }

    if (coupon.subType === CouponSubType.PRICE_REDUCTION) {
      const couponAmount = parseFloat(coupon.value.amount);
      const discount = Math.min(couponAmount, amount);
      return {
        discount: maxDiscount > 0 ? Math.min(discount, maxDiscount) : discount,
        code: couponCode,
      };
    }

    if (coupon.subType === CouponSubType.PERCENTAGE_REDUCTION) {
      const couponAmount = parseFloat(coupon.value.amount);
      const discount = parseFloat(((amount * couponAmount) / 100).toFixed(2));
      return {
        discount: maxDiscount > 0 ? Math.min(discount, maxDiscount) : discount,
        code: couponCode,
      };
    }
    return {
      discount: 0,
      code: couponCode,
    };
  }

  async listEligibleCoupons() {
    const query = {
      isActive: true,
      type: 'coupon',
      'value.isVisible': true,
      'value.expiryDate': { $gte: new Date() },
    };

    const coupons = await this.metaModel.find(query);

    const couponList = coupons.map((coupon: any) => {
      const code = coupon.label;
      const maxDiscount =
        coupon.value.maxDiscount && coupon.value.maxDiscount > 0
          ? parseFloat(coupon.value.maxDiscount)
          : 'N/A';
      const amount = coupon.value.amount;
      const validTill = coupon.value.expiryDate;
      const minOrderValue = coupon.value.minOrderValue || 'N/A';
      const nthOrder = coupon.value.nthOrder;

      return {
        code,
        maxDiscount,
        amount:
          coupon.subType === CouponSubType.PRICE_REDUCTION
            ? 'Rs.' + amount
            : amount + '%',
        validTill,
        minOrderValue,
        nthOrder,
      };
    });
    return {
      couponList,
    };
  }

  async getMetaMasterList(options: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'newest' | 'oldest';
    type?: string;
  }) {
    const {
      page = 1,
      limit = 50,
      search,
      sortBy = 'newest',
      type = 'coupon',
    } = options;

    const pageLimit = Math.min(limit, 50);
    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * pageLimit;

    let query: any = {};
    if (search) {
      query.$or = [
        { label: { $regex: search, $options: 'i' } },
        { subType: { $regex: search, $options: 'i' } },
      ];
    }

    if (type) {
      query.type = type;
    }

    const isNewest = sortBy === 'newest';
    const sortDirection = isNewest ? -1 : 1;
    const sort: { _id: 1 | -1 } = { _id: sortDirection as 1 | -1 };

    const total = await this.metaModel.countDocuments(query);
    const items = await this.metaModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(pageLimit)
      .lean();

    const totalPages = Math.ceil(total / pageLimit);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return {
      items,
      pagination: {
        currentPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
        total,
        count: items.length,
        limit: pageLimit,
        nextPage: hasNextPage ? currentPage + 1 : null,
        prevPage: hasPrevPage ? currentPage - 1 : null,
      },
      filters: {
        search,
        sortBy,
      },
    };
  }
}
