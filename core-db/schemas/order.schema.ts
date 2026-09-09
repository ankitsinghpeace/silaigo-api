import {
  OrderProcessingState,
  OrderStatus,
  OrderTimeLine,
} from 'core-db/enums';
import mongoose, { Schema, Types } from 'mongoose';

export const OrderSchema = new Schema({
  profile: {
    type: Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  pickupId: {
    type: Types.ObjectId,
    ref: 'Pickup',
  },
  items: [
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
    // enum: Object.values(OrderStatus),
    default: OrderStatus.PLACED,
  },
  orderProcessingState: {
    type: String,
    enum: Object.values(OrderProcessingState),
    default: OrderProcessingState.ORDER_FULFILLED,
  },
  payment: {
    type: Types.ObjectId,
    ref: 'Payment',
  },
  appointment: {
    type: Types.ObjectId,
    ref: 'Appointment',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrls: {
    type: [String],
  },
  customPrice: {
    type: Number,
  },
  addressId: {
    type: Types.ObjectId,
    ref: 'Address',
  },
  timeLine: [
    {
      status: {
        type: String,
        required: true,
      },
      timeStamp: {
        type: Date,
        default: Date.now,
        required: true,
      },
      updatedBy: {
        type: String,
        required: true,
      },
      updatedByUserId: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  ],
  measurements: {
    type: mongoose.Schema.Types.Mixed,
  },
  notes: {
    type: String,
  },
  pinPosition: {
    type: Number,
  },
  assignedToStitchingAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  isPinned: {
    type: Boolean,
  },
  paymentStatus: {
    type: String,
    enum: ['PAID', 'UNPAID', 'PARTIALLY_PAID'],
  },
  alterationNotes: {
    type: String,
  },
  alterationPhotos: {
    type: [String],
  },
});
