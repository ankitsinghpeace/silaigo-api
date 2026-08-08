import { OrderProcessingState } from 'core-db/enums';
import mongoose, { Types } from 'mongoose';
export declare const OrderSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
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
    status: string;
    items: Types.DocumentArray<{
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    orderProcessingState: OrderProcessingState;
    imageUrls: string[];
    timeLine: Types.DocumentArray<{
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }> & {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }>;
    payment?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    notes?: string | null | undefined;
    isPinned?: boolean | null | undefined;
    appointment?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    customPrice?: number | null | undefined;
    addressId?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    measurements?: any;
    pinPosition?: number | null | undefined;
    assignedToStitchingAgentId?: Types.ObjectId | null | undefined;
    paymentStatus?: "PAID" | "UNPAID" | "PARTIALLY_PAID" | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
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
    status: string;
    items: Types.DocumentArray<{
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    orderProcessingState: OrderProcessingState;
    imageUrls: string[];
    timeLine: Types.DocumentArray<{
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }> & {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }>;
    payment?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    notes?: string | null | undefined;
    isPinned?: boolean | null | undefined;
    appointment?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    customPrice?: number | null | undefined;
    addressId?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    measurements?: any;
    pinPosition?: number | null | undefined;
    assignedToStitchingAgentId?: Types.ObjectId | null | undefined;
    paymentStatus?: "PAID" | "UNPAID" | "PARTIALLY_PAID" | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
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
    status: string;
    items: Types.DocumentArray<{
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    orderProcessingState: OrderProcessingState;
    imageUrls: string[];
    timeLine: Types.DocumentArray<{
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }> & {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
    }>;
    payment?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    notes?: string | null | undefined;
    isPinned?: boolean | null | undefined;
    appointment?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    customPrice?: number | null | undefined;
    addressId?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    measurements?: any;
    pinPosition?: number | null | undefined;
    assignedToStitchingAgentId?: Types.ObjectId | null | undefined;
    paymentStatus?: "PAID" | "UNPAID" | "PARTIALLY_PAID" | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
