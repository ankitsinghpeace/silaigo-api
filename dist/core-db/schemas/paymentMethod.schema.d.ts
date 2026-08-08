import { Schema, Types } from 'mongoose';
import { PaymentMethodType } from 'core-db/enums';
export declare const PaymentMethodSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    profile: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    createdAt: NativeDate;
    methodType: PaymentMethodType;
    token: string;
    cardType?: string | null | undefined;
    last4?: string | null | undefined;
    expiryMonth?: number | null | undefined;
    expiryYear?: number | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    profile: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    createdAt: NativeDate;
    methodType: PaymentMethodType;
    token: string;
    cardType?: string | null | undefined;
    last4?: string | null | undefined;
    expiryMonth?: number | null | undefined;
    expiryYear?: number | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    profile: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    createdAt: NativeDate;
    methodType: PaymentMethodType;
    token: string;
    cardType?: string | null | undefined;
    last4?: string | null | undefined;
    expiryMonth?: number | null | undefined;
    expiryYear?: number | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
