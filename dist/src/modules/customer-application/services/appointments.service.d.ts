import mongoose, { Model } from 'mongoose';
import { IAppointment, IScheduleConfig, IAvailabilityOverride, IOrder } from 'core-db/interface';
import { CreateAvailabilityOverrideDto, UpdateScheduleDto } from '../dto/appointments.dto';
type Slot = {
    time: string;
    available: boolean;
    remaining: number;
};
export declare class AppointmentsService {
    private readonly appointmentModel;
    private readonly scheduleModel;
    private readonly availabilityModel;
    private readonly orderModel;
    constructor(appointmentModel: Model<IAppointment>, scheduleModel: Model<IScheduleConfig>, availabilityModel: Model<IAvailabilityOverride>, orderModel: Model<IOrder>);
    private normailizeDate;
    private getDayName;
    private getFallbackSlots;
    getAvailableSlots(dateStr: string): Promise<Slot[]>;
    bookSlot(dateStr: string, time: string, orderId: string, req: any, notes?: string, addressId?: string, impersonateUserId?: string): Promise<mongoose.Document<unknown, {}, IAppointment, {}, {}> & IAppointment & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getGlobalSchedule(): Promise<(mongoose.Document<unknown, {}, IScheduleConfig, {}, {}> & IScheduleConfig & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateSchedule(scheduleId: string, schedule: UpdateScheduleDto): Promise<(mongoose.Document<unknown, {}, IScheduleConfig, {}, {}> & IScheduleConfig & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    addAvailabilityOverride(dto: CreateAvailabilityOverrideDto, clearPrevious?: boolean): Promise<mongoose.Document<unknown, {}, IAvailabilityOverride, {}, {}> & IAvailabilityOverride & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getAllAvailabilityOverrides(): Promise<(mongoose.FlattenMaps<{
        _id?: string | undefined;
        date: Date;
        type: "HOLIDAY" | "CUSTOM";
        workingHours?: {
            startTime: string;
            endTime: string;
        } | undefined;
        slots?: {
            [x: string]: {
                isBlocked?: boolean | undefined;
                maxAppointments?: number | undefined;
            };
        } | undefined;
        reason?: string | undefined;
    }> & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    updateAvailabilityOverride(id: string, dto: CreateAvailabilityOverrideDto): Promise<(mongoose.Document<unknown, {}, IAvailabilityOverride, {}, {}> & IAvailabilityOverride & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    deleteAvailabilityOverride(id: string): Promise<(mongoose.Document<unknown, {}, IAvailabilityOverride, {}, {}> & IAvailabilityOverride & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}
export {};
