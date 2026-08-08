import { Gender } from 'core-db/enums';
import { Schema, Types } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // Secure hash

  empId: { type: String, required: true, unique: true },

  firstName: { type: String, required: true },
  lastName: { type: String },

  gender: {
    type: String,
    enum: Object.values(Gender),
    default: Gender.NOT_SPECIFIED,
  },

  joiningDate: { type: Date, required: true },
  designation: { type: String, required: true },

  role: { type: Types.ObjectId, ref: 'Role', required: true },

  createdAt: { type: Date, default: Date.now },
});
