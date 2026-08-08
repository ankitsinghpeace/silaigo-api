import { Schema } from 'mongoose';
export declare const AvailabilitySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    date: NativeDate;
    type: "HOLIDAY" | "CUSTOM";
    createdAt: NativeDate;
    slots: Map<string, {
        isBlocked: boolean;
        maxAppointments?: number | null | undefined;
    }>;
    workingHours?: {
        startTime?: string | null | undefined;
        endTime?: string | null | undefined;
    } | null | undefined;
    reason?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    date: NativeDate;
    type: "HOLIDAY" | "CUSTOM";
    createdAt: NativeDate;
    slots: Map<string, {
        isBlocked: boolean;
        maxAppointments?: number | null | undefined;
    }>;
    workingHours?: {
        startTime?: string | null | undefined;
        endTime?: string | null | undefined;
    } | null | undefined;
    reason?: string | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    date: NativeDate;
    type: "HOLIDAY" | "CUSTOM";
    createdAt: NativeDate;
    slots: Map<string, {
        isBlocked: boolean;
        maxAppointments?: number | null | undefined;
    }>;
    workingHours?: {
        startTime?: string | null | undefined;
        endTime?: string | null | undefined;
    } | null | undefined;
    reason?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
