import { Gender } from 'core-db/enums';
import { Types } from 'mongoose';

export const users = [
  {
    email: 'admin@silai-go.com',
    passwordHash: '<REPLACE_WITH_HASH>', // use bcrypt hash of your chosen password
    empId: 'EMP-ADMIN-001',

    firstName: 'Super',
    lastName: 'Admin',
    gender: Gender.NOT_SPECIFIED,

    joiningDate: new Date('2024-01-01'),
    designation: 'Administrator',

    role: new Types.ObjectId('64b8c0dfe8e4e24f8a0d4a21'), // Replace with actual Admin Role ID after role is inserted

    createdAt: new Date(),
  },
];
