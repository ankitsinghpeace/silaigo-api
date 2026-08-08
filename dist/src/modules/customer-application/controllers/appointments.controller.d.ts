import { AppointmentsService } from '../services/appointments.service';
import { CreateAvailabilityOverrideDto, UpdateScheduleDto } from '../dto/appointments.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    getAvailableSlots(date: string): Promise<{
        time: string;
        available: boolean;
        remaining: number;
    }[]>;
    bookSlot(body: {
        dateStr: string;
        time: string;
        orderId: string;
        notes?: string;
        addressId?: string;
        impersonateUserId?: string;
    }, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IAppointment, {}, {}> & import("../../../../core-db/interface").IAppointment & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getGlobalSchedule(): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IScheduleConfig, {}, {}> & import("../../../../core-db/interface").IScheduleConfig & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateSchedule(scheduleId: string, body: UpdateScheduleDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IScheduleConfig, {}, {}> & import("../../../../core-db/interface").IScheduleConfig & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    addAvailabilityOverride(body: CreateAvailabilityOverrideDto, clearPrevious?: boolean): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IAvailabilityOverride, {}, {}> & import("../../../../core-db/interface").IAvailabilityOverride & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getAllAvailabilityOverrides(): Promise<(import("mongoose").FlattenMaps<{
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
    updateAvailabilityOverride(id: string, body: CreateAvailabilityOverrideDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IAvailabilityOverride, {}, {}> & import("../../../../core-db/interface").IAvailabilityOverride & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    deleteAvailabilityOverride(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IAvailabilityOverride, {}, {}> & import("../../../../core-db/interface").IAvailabilityOverride & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}
