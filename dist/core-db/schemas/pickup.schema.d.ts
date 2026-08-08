import { Schema, Types } from 'mongoose';
export declare const MaterialPickupSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    firstName: string;
    options: Types.DocumentArray<{
        type: string;
        label: string;
        value: boolean;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        type: string;
        label: string;
        value: boolean;
    }> & {
        type: string;
        label: string;
        value: boolean;
    }>;
    timeline: Types.DocumentArray<{
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
    }, Types.Subdocument<import("bson").ObjectId, any, {
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
    phone?: string | null | undefined;
    lastName?: string | null | undefined;
    addressLine1?: string | null | undefined;
    addressLine2?: string | null | undefined;
    city?: string | null | undefined;
    state?: string | null | undefined;
    pincode?: string | null | undefined;
    pickupFor?: string | null | undefined;
    scheduledPickupDate?: string | null | undefined;
    scheduledPickupTime?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    firstName: string;
    options: Types.DocumentArray<{
        type: string;
        label: string;
        value: boolean;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        type: string;
        label: string;
        value: boolean;
    }> & {
        type: string;
        label: string;
        value: boolean;
    }>;
    timeline: Types.DocumentArray<{
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
    }, Types.Subdocument<import("bson").ObjectId, any, {
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
    phone?: string | null | undefined;
    lastName?: string | null | undefined;
    addressLine1?: string | null | undefined;
    addressLine2?: string | null | undefined;
    city?: string | null | undefined;
    state?: string | null | undefined;
    pincode?: string | null | undefined;
    pickupFor?: string | null | undefined;
    scheduledPickupDate?: string | null | undefined;
    scheduledPickupTime?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    firstName: string;
    options: Types.DocumentArray<{
        type: string;
        label: string;
        value: boolean;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        type: string;
        label: string;
        value: boolean;
    }> & {
        type: string;
        label: string;
        value: boolean;
    }>;
    timeline: Types.DocumentArray<{
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
    }, Types.Subdocument<import("bson").ObjectId, any, {
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
    phone?: string | null | undefined;
    lastName?: string | null | undefined;
    addressLine1?: string | null | undefined;
    addressLine2?: string | null | undefined;
    city?: string | null | undefined;
    state?: string | null | undefined;
    pincode?: string | null | undefined;
    pickupFor?: string | null | undefined;
    scheduledPickupDate?: string | null | undefined;
    scheduledPickupTime?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
