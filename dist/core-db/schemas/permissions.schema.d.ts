import { PermissionType, PermissionSubType } from 'core-db/enums';
import { Schema, Types } from 'mongoose';
export declare const PermissionsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    type: PermissionType;
    createdAt: NativeDate;
    subType: PermissionSubType;
    description?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    type: PermissionType;
    createdAt: NativeDate;
    subType: PermissionSubType;
    description?: string | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    type: PermissionType;
    createdAt: NativeDate;
    subType: PermissionSubType;
    description?: string | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
