import { Schema } from 'mongoose';
export declare const IdentityCountersSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    field: string;
    modelName: string;
    count: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    field: string;
    modelName: string;
    count: number;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    field: string;
    modelName: string;
    count: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
