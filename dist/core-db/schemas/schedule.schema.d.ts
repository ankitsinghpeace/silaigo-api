import { Schema } from 'mongoose';
export declare const ScheduleSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    isActive: boolean;
    workingDays: string[];
    slotIntervalMinutes: number;
    maxAppointmentsPerSlot: number;
    dailyHours?: {
        startTime: string;
        endTime: string;
    } | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    isActive: boolean;
    workingDays: string[];
    slotIntervalMinutes: number;
    maxAppointmentsPerSlot: number;
    dailyHours?: {
        startTime: string;
        endTime: string;
    } | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    isActive: boolean;
    workingDays: string[];
    slotIntervalMinutes: number;
    maxAppointmentsPerSlot: number;
    dailyHours?: {
        startTime: string;
        endTime: string;
    } | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
