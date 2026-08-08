import { model, Schema } from 'mongoose';

export const labelSchema = new Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String },
  },
  { _id: false }, 
);

export const OptionsSchema = new Schema({
  title: { type: String, required: true },
  discountedPrice: { type: String, required: true },
  price: { type: String, required: true },
}, { _id: true });

export const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  isVisibleOnHomePage: { type: Boolean, default: false },
  imageUrl: { type: String, required: true },
  description: { type: String },
  id: { type: Number, unique: true },
  label: labelSchema,
  rank:{type:Number},
  options: [OptionsSchema]
});

export const CategoryModel = model('Category', CategorySchema);
