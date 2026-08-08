import { Schema } from 'mongoose';
import { PageSectionType } from 'core-db/enums';

export const PageSectionSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(PageSectionType),
    required: true,
  },

  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
});
