import { Schema, Types } from 'mongoose';
import { RoleCode } from 'core-db/enums';

export const RolesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  code: {
    type: String,
    enum: Object.values(RoleCode),
    required: true,
    unique: true,
  },

  permissions: [
    {
      type: Types.ObjectId,
      ref: 'Permission',
      required: true,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
