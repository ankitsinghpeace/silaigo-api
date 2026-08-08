import { Model } from 'mongoose';
import { IPaymentMethod } from 'core-db/interface';
export declare class PaymentMethodsService {
    private readonly paymentMethodModel;
    constructor(paymentMethodModel: Model<IPaymentMethod>);
    getPaymentMethods(req: any): Promise<(import("mongoose").Document<unknown, {}, IPaymentMethod, {}, {}> & IPaymentMethod & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    removePaymentMethod(id: string): Promise<(import("mongoose").Document<unknown, {}, IPaymentMethod, {}, {}> & IPaymentMethod & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}
