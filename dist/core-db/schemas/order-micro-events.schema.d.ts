import { Schema, Types } from 'mongoose';
export declare const OrderMicroEventsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    orderId: Types.ObjectId;
    roleId: Types.ObjectId;
    events: Types.DocumentArray<{
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }> & {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    orderId: Types.ObjectId;
    roleId: Types.ObjectId;
    events: Types.DocumentArray<{
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }> & {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }>;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    orderId: Types.ObjectId;
    roleId: Types.ObjectId;
    events: Types.DocumentArray<{
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }> & {
        status: string;
        timeStamp: NativeDate;
        updatedBy: string;
        updatedByUserId: Types.ObjectId;
        key: string;
        value?: any;
    }>;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
