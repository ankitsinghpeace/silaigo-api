import { PaymentMethodsService } from '../services/payment-methods.service';
import { Request } from 'express';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodsService);
    getPaymentMethods(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IPaymentMethod, {}, {}> & import("../../../../core-db/interface").IPaymentMethod & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    removePaymentMethod(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IPaymentMethod, {}, {}> & import("../../../../core-db/interface").IPaymentMethod & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}
