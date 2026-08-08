import { Schema, Types } from 'mongoose';
import { Gender } from 'core-db/enums/profile.enums';
export interface IProfile {
    _id?: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    phone?: string;
    email?: string;
    referralCode?: string;
    referredBy?: string;
    notes?: string;
    createdAt: Date;
    colorCode?: string;
}
export declare const ProfileSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    firstName: string;
    gender: Gender;
    createdAt: NativeDate;
    phone?: string | null | undefined;
    email?: string | null | undefined;
    lastName?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    referralCode?: string | null | undefined;
    referredBy?: string | null | undefined;
    notes?: string | null | undefined;
    colorCode?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    firstName: string;
    gender: Gender;
    createdAt: NativeDate;
    phone?: string | null | undefined;
    email?: string | null | undefined;
    lastName?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    referralCode?: string | null | undefined;
    referredBy?: string | null | undefined;
    notes?: string | null | undefined;
    colorCode?: string | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    firstName: string;
    gender: Gender;
    createdAt: NativeDate;
    phone?: string | null | undefined;
    email?: string | null | undefined;
    lastName?: string | null | undefined;
    birthDate?: NativeDate | null | undefined;
    referralCode?: string | null | undefined;
    referredBy?: string | null | undefined;
    notes?: string | null | undefined;
    colorCode?: string | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { Gender };
