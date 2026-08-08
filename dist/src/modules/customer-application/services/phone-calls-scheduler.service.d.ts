import { Model, Types } from 'mongoose';
import { ICategory, IPhoneCalls } from 'core-db/interface';
import { CreatePhoneCallSchedulerDto } from '../dto/phone-call.dto';
import { OrderInitiationStatus, PhoneCallStatus } from 'core-db/enums/phoneCall.scheduler.status';
export declare class CreatePhoneCallService {
    private readonly PhoneCallSchedulerModel;
    private readonly categoryModel;
    constructor(PhoneCallSchedulerModel: Model<IPhoneCalls>, categoryModel: Model<ICategory>);
    createPhoneCallAppointment(dto: CreatePhoneCallSchedulerDto, req: any): Promise<import("mongoose").Document<unknown, {}, IPhoneCalls, {}, {}> & IPhoneCalls & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllCallsList(dto: any): Promise<{
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
    updateCall(callId: any, updates: any): Promise<(import("mongoose").FlattenMaps<{
        profile: Types.ObjectId;
        category: Types.ObjectId;
        appointmentDate: Date;
        callStatus: PhoneCallStatus;
        orderInitiationStatus: OrderInitiationStatus;
        notes?: string | undefined;
    }> & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
