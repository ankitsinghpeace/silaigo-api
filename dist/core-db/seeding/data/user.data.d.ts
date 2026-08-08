import { Gender } from 'core-db/enums';
import { Types } from 'mongoose';
export declare const users: {
    email: string;
    passwordHash: string;
    empId: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    joiningDate: Date;
    designation: string;
    role: Types.ObjectId;
    createdAt: Date;
}[];
