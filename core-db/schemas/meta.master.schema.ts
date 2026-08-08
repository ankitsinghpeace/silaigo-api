import { Schema } from 'mongoose';

export const MetaMasterSchema = new Schema({
  type: { type: String, required: true },
  subType: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: Schema.Types.Mixed },
  isActive: { type: Boolean, default: true },
});
