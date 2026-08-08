import { ILocation } from 'core-db/interface';
import { Schema } from 'mongoose';
export declare const LocationSchema: Schema<ILocation, import("mongoose").Model<ILocation, any, any, any, import("mongoose").Document<unknown, any, ILocation, any, {}> & ILocation & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ILocation, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ILocation>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ILocation> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const LocationModel: import("mongoose").Model<ILocation, {}, {}, {}, import("mongoose").Document<unknown, {}, ILocation, {}, {}> & ILocation & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
