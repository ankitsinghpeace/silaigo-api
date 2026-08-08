import { Schema, Types } from 'mongoose';

export const CustomizationOptionMappingSchema = new Schema({
  customizationType: { type: String, required: true },

  optionIds: [{ type:String, required: true }], // Assuming options are still number-based

  subCategoryIds: [
    {
      type: Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
  ],

  categoryId: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

// Optional: You can still keep this index if customizationType + category must be unique
CustomizationOptionMappingSchema.index(
  { customizationType: 1, categoryId: 1 },
  { unique: true },
);