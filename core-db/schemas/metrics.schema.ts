import { Schema, Types } from 'mongoose';
import { ActionType, TargetType } from 'core-db/enums';

export const MetricsSchema = new Schema({
  profile: {
    type: Types.ObjectId,
    ref: 'Profile',
    required: false,
  },

  actionType: {
    type: String,
    required: true,
    enum: Object.values(ActionType),
  },

  page: {
    type: String,
    required: true,
  },

  targetType: {
    type: String,
    enum: Object.values(TargetType),
    required: false,
  },

  targetId: {
    type: Types.ObjectId,
    required: false,
  },

  targetTitle: {
    type: String,
    required: false,
  },

  additionalData: {
    type: Schema.Types.Mixed,
    required: false,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});
