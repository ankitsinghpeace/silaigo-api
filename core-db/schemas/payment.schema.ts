import { Schema, Types } from 'mongoose';
import { PaymentMethodType, PaymentStatus } from 'core-db/enums';

export const PaymentSchema = new Schema({
  profile: {
    type: Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  order: {
    type: Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  razorpayPaymentId: { type: String },
  paymentMethod: {
    type: Types.ObjectId,
    ref: 'PaymentMethod',
    // required: true,
  },
  method: {
    type: String,
    enum: Object.values(PaymentMethodType),
  },
  amount: { type: Number, required: true }, // Total price before discount
  discountedAmount: { type: Number }, // Final price after discount
  coupon: { type: String }, // e.g. "WELCOME50"
  priceBreakup: [
    {
      subCategory: {
        type: Types.ObjectId,
        ref: 'SubCategory',
        required: true,
      },
      subCategoryStyleId: {
        type: Types.ObjectId,
      },
      orderId: {
        type: String,
      },
      customizations: [
        {
          optionId: {
            type: Types.ObjectId,
            ref: 'Customization',
          },
          type: {
            type: String,
          },
        },
      ],
      options: [
        {
          categoryId: {
            type: Types.ObjectId,
            ref: 'Category',
          },
          optionId: {
            type: Types.ObjectId,
          },
        },
      ],
      notes: { type: String },
    },
  ],

  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.SUCCESS,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
