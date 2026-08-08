import { QueryStatus } from 'core-db/enums';
import { Schema } from 'mongoose';

export const QuerySchema = new Schema({
  id: { type: Number, required: true, unique: true }, // 👈 Custom unique ID
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  status: {
    type: String,
    enum: Object.values(QueryStatus),
    default: QueryStatus.OPEN,
  },
  createdAt: { type: Date, default: Date.now },
});
