import { QueryStatus } from 'core-db/enums';
import { Schema } from 'mongoose';
export declare const QuerySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    id: number;
    createdAt: NativeDate;
    status: QueryStatus;
    user?: import("mongoose").Types.ObjectId | null | undefined;
    message?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    id: number;
    createdAt: NativeDate;
    status: QueryStatus;
    user?: import("mongoose").Types.ObjectId | null | undefined;
    message?: string | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    id: number;
    createdAt: NativeDate;
    status: QueryStatus;
    user?: import("mongoose").Types.ObjectId | null | undefined;
    message?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
