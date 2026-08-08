import { ILocationCategory } from 'core-db/interface';
import { Schema, model } from 'mongoose';

export const LocationCategorySchema = new Schema<ILocationCategory>(
  {
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },

    locationName: {
      type: String,
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    categoryName: {
      type: String,
      required: true,
    },

    longDescription: String,
  },
  { timestamps: true },
);

LocationCategorySchema.index(
  { locationId: 1, categoryId: 1 },
  { unique: true },
);

export const LocationCategoryModel = model<ILocationCategory>(
  'LocationCategory',
  LocationCategorySchema,
);
