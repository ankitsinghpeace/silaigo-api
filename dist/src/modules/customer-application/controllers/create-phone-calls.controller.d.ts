import { CreatePhoneCallService } from '../services/phone-calls-scheduler.service';
import { CreatePhoneCallSchedulerDto, GetPhoneCallSchedulerDto } from '../dto/phone-call.dto';
export declare class CreatePhoneCallsController {
    private readonly createPhoneCallService;
    constructor(createPhoneCallService: CreatePhoneCallService);
    getPhoneCallsList(query: GetPhoneCallSchedulerDto): Promise<{
        calls: any;
        pagination: {
            currentPage: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
            count: any;
            limit: number;
            nextPage: number | null;
            prevPage: number | null;
        };
        filters: {
            customerPhone: any;
            appointmentDate: any;
            sortBy: any;
            categoryName: any;
        };
    }>;
    createPhoneCall(dto: CreatePhoneCallSchedulerDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IPhoneCalls, {}, {}> & import("../../../../core-db/interface").IPhoneCalls & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateCall(callId: string, data: any): Promise<(import("mongoose").FlattenMaps<{
        profile: import("mongoose").Types.ObjectId;
        category: import("mongoose").Types.ObjectId;
        appointmentDate: Date;
        callStatus: import("../../../../core-db/enums/phoneCall.scheduler.status").PhoneCallStatus;
        orderInitiationStatus: import("../../../../core-db/enums/phoneCall.scheduler.status").OrderInitiationStatus;
        notes?: string | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
