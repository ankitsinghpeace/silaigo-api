import { ILocation } from 'core-db/interface';
import { Schema, model } from 'mongoose';

export const LocationSchema = new Schema<ILocation>(
  {
    name: { type: String, required: true, unique: true },

    sublocations: {
      type: [String],
      default: [],
    },

    pricingCardSubCategoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
    ],

    mainCardSubCategoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
    ],

    longDescription: String,
  },
  { timestamps: true },
);

export const LocationModel = model<ILocation>('Location', LocationSchema);
