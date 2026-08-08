import { Schema } from 'mongoose';
import { PageSectionType } from 'core-db/enums';
export declare const PageSectionSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    type: PageSectionType;
    data: any;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    type: PageSectionType;
    data: any;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    type: PageSectionType;
    data: any;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
