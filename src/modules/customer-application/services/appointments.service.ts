import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import mongoose, { Model, Types } from 'mongoose';

import {
  IAppointment,
  IScheduleConfig,
  IAvailabilityOverride,
  IOrder,
} from 'core-db/interface';
import { ModelMetadata } from 'core-db/model.metadata';
import { OrderStatus, OrderTimeLine } from 'core-db/enums/order.enums';
import {
  CreateAvailabilityOverrideDto,
  UpdateScheduleDto,
} from '../dto/appointments.dto';

type Slot = {
  time: string;
  available: boolean;
  remaining: number;
};

const { ObjectId } = mongoose.Types;

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject(ModelMetadata.Appointment.token)
    private readonly appointmentModel: Model<IAppointment>,
    @Inject(ModelMetadata.Schedule.token)
    private readonly scheduleModel: Model<IScheduleConfig>,
    @Inject(ModelMetadata.Availability.token)
    private readonly availabilityModel: Model<IAvailabilityOverride>,
    @Inject(ModelMetadata.Order.token)
    private readonly orderModel: Model<IOrder>,
  ) {}

  private normailizeDate(dateStr: string) {
    const date = new Date(`${dateStr}T00:00:00.000Z`);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return date;
  }

  private getDayName(date: Date): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getUTCDay()];
  }

  private getFallbackSlots(date: Date): Slot[] {
    const fallbackSlots: Slot[] = [];
    for (let hour = 10; hour <= 17; hour++) {
      fallbackSlots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: false,
        remaining: -1,
      });
    }
    return fallbackSlots;
  }

  //routes
  async getAvailableSlots(dateStr: string) {
    const date = this.normailizeDate(dateStr);
    const dayName = this.getDayName(date);

    // fetch global schedule
    const schedule = await this.scheduleModel.findOne({ isActive: true });
    if (!schedule) throw new NotFoundException('No active schedule found');

    if (!schedule.workingDays.includes(dayName)) {
      return this.getFallbackSlots(date);
    }

    const availability = await this.availabilityModel
      .findOne({
        date,
      })
      .lean();

    // no slots for holiday
    if (availability && availability.type === 'HOLIDAY') {
      return this.getFallbackSlots(date);
    }

    // 4. Determine working hours and slot interval
    let startTime,
      endTime,
      slotInterval,
      maxAppointmentsPerSlot,
      slotOverrides = {};

    if (availability && availability.type === 'CUSTOM') {
      startTime =
        availability.workingHours?.startTime || schedule.dailyHours.startTime;
      endTime =
        availability.workingHours?.endTime || schedule.dailyHours.endTime;
      slotOverrides = availability.slots || {};
    } else {
      startTime = schedule.dailyHours.startTime;
      endTime = schedule.dailyHours.endTime;
    }

    slotInterval = schedule.slotIntervalMinutes;
    maxAppointmentsPerSlot = schedule.maxAppointmentsPerSlot;

    // 5. Generate slots
    const slots: Slot[] = [];
    let [h, m] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    while (h < endH || (h === endH && m < endM)) {
      const slotTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      // Check if slot is blocked
      const slotOverride = slotOverrides[slotTime];
      const isBlocked = slotOverride?.isBlocked === true;
      const slotMax = slotOverride?.maxAppointments || maxAppointmentsPerSlot;

      if (!isBlocked) {
        // Count existing appointments for this slot
        const count = await this.appointmentModel.countDocuments({
          date,
          time: slotTime,
          status: 'BOOKED',
        });

        slots.push({
          time: slotTime,
          available: count < slotMax,
          remaining: Math.max(0, slotMax - count),
        });
      }

      // Increment slot time
      m += slotInterval;
      if (m >= 60) {
        h += Math.floor(m / 60);
        m = m % 60;
      }
    }

    return slots;
  }

  async bookSlot(
    dateStr: string,
    time: string,
    orderId: string,
    req: any,
    notes?: string,
    addressId?: string,
    impersonateUserId?: string,
  ) {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    if (order.appointment) {
      throw new BadRequestException('Order already has an appointment');
    }

    const date = this.normailizeDate(dateStr);
    const schedule = await this.scheduleModel.findOne({ isActive: true });
    if (!schedule) throw new NotFoundException('No active schedule found');

    const availability = await this.availabilityModel
      .findOne({
        date,
      })
      .lean();

    if (availability && availability.type === 'HOLIDAY') {
      throw new BadRequestException('Cannot book on a holiday');
    }

    let startTime,
      endTime,
      slotInterval,
      maxAppointmentsPerSlot,
      slotOverrides = {};
    if (availability && availability.type === 'CUSTOM') {
      startTime =
        availability.workingHours?.startTime || schedule.dailyHours.startTime;
      endTime =
        availability.workingHours?.endTime || schedule.dailyHours.endTime;
      slotOverrides = availability.slots || {};
    } else {
      startTime = schedule.dailyHours.startTime;
      endTime = schedule.dailyHours.endTime;
      slotOverrides = {};
    }
    slotInterval = schedule.slotIntervalMinutes;
    maxAppointmentsPerSlot = schedule.maxAppointmentsPerSlot;

    const [slotHour, slotMinute] = time.split(':').map(Number);
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const slotDate = new Date(date);
    slotDate.setHours(slotHour, slotMinute, 0, 0);

    const startDate = new Date(date);
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(endHour, endMinute, 0, 0);

    if (slotDate < startDate || slotDate >= endDate) {
      throw new BadRequestException('Selected time is outside working hours');
    }

    let slotOverride = slotOverrides[time];
    if (slotOverride && slotOverride.isBlocked) {
      throw new BadRequestException('This slot is blocked');
    }

    const slotMax = slotOverride?.maxAppointments || maxAppointmentsPerSlot;

    const session = await this.appointmentModel.db.startSession();
    session.startTransaction();
    try {
      const count = await this.appointmentModel
        .countDocuments({
          date,
          time,
          status: 'BOOKED',
        })
        .session(session);

      if (count >= slotMax) {
        throw new BadRequestException('This slot is already full');
      }

      console.log(impersonateUserId);
      const userId =
        req.user.role != 'customer' ? impersonateUserId : req.user._id;
      const appointment = await this.appointmentModel.create(
        [
          {
            profile: userId,
            order: new ObjectId(orderId),
            date,
            time,
            status: 'BOOKED',
            notes,
          },
        ],
        { session },
      );

      await this.orderModel.findByIdAndUpdate(
        orderId,
        {
          appointment: appointment[0]._id,
          status: OrderStatus.PAYMENT_PENDING,
          addressId: addressId,
          $push: {
            timeLine: {
              status: OrderTimeLine.APPOINTMENT_BOOKED,
              timeStamp: new Date(),
              updatedBy: `${req.user.firstName} ${req.user.lastName}`,
              updatedByUserId: req.user._id,
            },
          },
        },
        { session },
      );
      await session.commitTransaction();
      return appointment[0];
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  async getGlobalSchedule() {
    return this.scheduleModel.findOne({ isActive: true });
  }

  async updateSchedule(scheduleId: string, schedule: UpdateScheduleDto) {
    return this.scheduleModel.findByIdAndUpdate(scheduleId, schedule, {
      new: true,
    });
  }

  async addAvailabilityOverride(
    dto: CreateAvailabilityOverrideDto,
    clearPrevious: boolean = false,
  ) {
    if (clearPrevious) {
      await this.availabilityModel.deleteMany({
        date: {
          $lt: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      });
    }
    const dateObj = new Date(dto.date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return this.availabilityModel.create({
      date: this.normailizeDate(dateStr),
      type: dto.type,
      workingHours: dto.workingHours,
      slots: dto.slots,
      reason: dto.reason,
    });
  }

  async getAllAvailabilityOverrides() {
    return this.availabilityModel.find({}).lean();
  }

  async updateAvailabilityOverride(
    id: string,
    dto: CreateAvailabilityOverrideDto,
  ) {
    const dateObj = new Date(dto.date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return this.availabilityModel.findByIdAndUpdate(
      id,
      {
        date: this.normailizeDate(dateStr),
        type: dto.type,
        workingHours: dto.workingHours,
        slots: dto.slots,
        reason: dto.reason,
      },
      { new: true },
    );
  }

  async deleteAvailabilityOverride(id: string) {
    return this.availabilityModel.findByIdAndDelete(id);
  }
}
