import { PermissionType, PermissionSubType } from 'core-db/enums';
import { Schema, Types } from 'mongoose';

export const PermissionsSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: Object.values(PermissionType),
  },

  subType: {
    type: String,
    required: true,
    enum: Object.values(PermissionSubType),
  },

  description: { type: String }, // optional label

  createdAt: { type: Date, default: Date.now },
});

PermissionsSchema.index({ type: 1, subType: 1 }, { unique: true });
