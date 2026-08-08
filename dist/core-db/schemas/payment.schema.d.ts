import { Schema, Types } from 'mongoose';
import { PaymentMethodType, PaymentStatus } from 'core-db/enums';
export declare const PaymentSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    profile: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    order: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    createdAt: NativeDate;
    status: PaymentStatus;
    amount: number;
    priceBreakup: Types.DocumentArray<{
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }> & {
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }>;
    method?: PaymentMethodType | null | undefined;
    razorpayPaymentId?: string | null | undefined;
    paymentMethod?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    discountedAmount?: number | null | undefined;
    coupon?: string | null | undefined;
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
    order: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    createdAt: NativeDate;
    status: PaymentStatus;
    amount: number;
    priceBreakup: Types.DocumentArray<{
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }> & {
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }>;
    method?: PaymentMethodType | null | undefined;
    razorpayPaymentId?: string | null | undefined;
    paymentMethod?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    discountedAmount?: number | null | undefined;
    coupon?: string | null | undefined;
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
    order: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    createdAt: NativeDate;
    status: PaymentStatus;
    amount: number;
    priceBreakup: Types.DocumentArray<{
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }> & {
        options: Types.DocumentArray<{
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            categoryId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        subCategory: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        customizations: Types.DocumentArray<{
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }, Types.Subdocument<import("bson").ObjectId, any, {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }> & {
            type?: string | null | undefined;
            optionId?: {
                prototype?: Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
        }>;
        notes?: string | null | undefined;
        subCategoryStyleId?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        orderId?: string | null | undefined;
    }>;
    method?: PaymentMethodType | null | undefined;
    razorpayPaymentId?: string | null | undefined;
    paymentMethod?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    discountedAmount?: number | null | undefined;
    coupon?: string | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
