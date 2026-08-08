import { ILocationCategory } from 'core-db/interface';
import { Schema } from 'mongoose';
export declare const LocationCategorySchema: Schema<ILocationCategory, import("mongoose").Model<ILocationCategory, any, any, any, import("mongoose").Document<unknown, any, ILocationCategory, any, {}> & ILocationCategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ILocationCategory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ILocationCategory>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ILocationCategory> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const LocationCategoryModel: import("mongoose").Model<ILocationCategory, {}, {}, {}, import("mongoose").Document<unknown, {}, ILocationCategory, {}, {}> & ILocationCategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
