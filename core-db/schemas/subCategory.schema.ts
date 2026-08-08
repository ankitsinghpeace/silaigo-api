import { Schema } from 'mongoose';

// Subdocument schema for individual subcategory items
export const SubCategoryItemSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    keyAttributes: [{ type: String }],
    price: { type: Number }, // Optional field
    discountedPrice: { type: Number }, // Optional field
    label: { type: Schema.Types.Mixed }, // Optional and flexible type
    rank: { type: Number },
  },
  {
    // _id is true by default, so just omit _id:false to have ObjectId generated
    minimize: true,
  },
);

// Main schema for category + subcategories
export const SubCategorySchema = new Schema({
  categoryId: { type: Number, required: true, unique: true }, // Custom category ID
  SubCategories: {
    type: [SubCategoryItemSchema],
    required: true,
    default: [],
  },
});

// Ensure subcategory names are unique within a category
SubCategorySchema.index(
  {
    categoryId: 1,
    'SubCategories.name': 1,
  },
  {
    unique: true,
    partialFilterExpression: { 'SubCategories.name': { $exists: true } },
  },
);
