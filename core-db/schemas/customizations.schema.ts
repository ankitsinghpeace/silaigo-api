import { Schema, Types } from 'mongoose';
import { CustomizationComplexity } from 'core-db/enums';


export const CustomizationOptionSchema = new Schema({
  _id: { type: Types.ObjectId, auto: true }, // ensures ObjectId for each option
  title: { type: String, required: true },
  imageUrl: { type: String },
  complexity: {
    type: String,
    enum: Object.values(CustomizationComplexity),
    required: true,
  },
  price: { type: Number, default: 0  },
  discountedPrice: { type: Number ,default: 0},
});

export const CustomizationSchema = new Schema({
  type: { type: String, required: true }, // e.g. "Neck Design", "Sleeve Type"
  options: { type: [CustomizationOptionSchema], required: true },
  rank : {type : Number}
});
