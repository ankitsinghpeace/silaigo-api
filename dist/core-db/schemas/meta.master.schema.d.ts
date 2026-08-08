import { Schema } from 'mongoose';
export declare const MetaMasterSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    type: string;
    label: string;
    isActive: boolean;
    subType: string;
    value?: any;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    type: string;
    label: string;
    isActive: boolean;
    subType: string;
    value?: any;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    type: string;
    label: string;
    isActive: boolean;
    subType: string;
    value?: any;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
