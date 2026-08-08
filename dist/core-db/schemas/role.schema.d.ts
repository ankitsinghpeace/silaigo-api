import { Schema, Types } from 'mongoose';
import { RoleCode } from 'core-db/enums';
export declare const RolesSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    code: RoleCode;
    permissions: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    }[];
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    code: RoleCode;
    permissions: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    }[];
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    code: RoleCode;
    permissions: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    }[];
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
