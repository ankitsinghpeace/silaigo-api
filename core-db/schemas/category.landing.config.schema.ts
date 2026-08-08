import { ICategoryLandingConfig } from 'core-db/interface';
import { Schema, model, Types } from 'mongoose';

interface ICustomizationOption {
  enabled: boolean;
  optionIds?: Types.ObjectId[];
}

interface ICustomizationOptions {
  neck: ICustomizationOption;
  sleeve: ICustomizationOption;
  backNeck: { enabled: boolean };
  addOns: { enabled: boolean };
  accessories: { enabled: boolean };
  options: { enabled: boolean };
}

export const CustomizationOptionsSchema = new Schema<ICustomizationOptions>(
  {
    neck: {
      enabled: Boolean,
      optionIds: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
    },
    sleeve: {
      enabled: Boolean,
      optionIds: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
    },
    backNeck: {
      enabled: Boolean,
    },
    addOns: {
      enabled: Boolean,
    },
    accessories: {
      enabled: Boolean,
    },
    options: {
      enabled: Boolean,
    },
  },
  { _id: false },
);

export const CategoryLandingConfigSchema = new Schema<ICategoryLandingConfig>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    categoryName: { type: String, required: true },

    pricingCardSubCategoryIds: [
      { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    ],

    mainCardSubCategoryIds: [
      { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    ],

    customizationOptions: CustomizationOptionsSchema,

    longDescription: String,
  },
  { timestamps: true },
);

export const CategoryLandingConfigModel = model<ICategoryLandingConfig>(
  'CategoryLandingConfig',
  CategoryLandingConfigSchema,
);
