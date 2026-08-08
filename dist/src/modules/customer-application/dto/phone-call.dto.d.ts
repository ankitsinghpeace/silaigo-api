import { OrderInitiationStatus, PhoneCallStatus } from 'core-db/enums/phoneCall.scheduler.status';
export declare class CreatePhoneCallSchedulerDto {
    notes: string;
    category: number;
    appointmentDate: string;
}
export declare class GetPhoneCallSchedulerDto {
    categoryName?: string;
    customerPhone?: string;
    sortBy: 'newest' | 'oldest';
    appointmentDate?: string;
    page: number;
    limit: number;
    callStatus: PhoneCallStatus;
    orderStatus: OrderInitiationStatus;
}
