import { OrderInitiationStatus, PhoneCallStatus } from 'core-db/enums/phoneCall.scheduler.status';
import { Schema, Types } from 'mongoose';

export const PhoneCallSchedulerSchema = new Schema({
  profile: {
    type: Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  category: {
    type: Types.ObjectId,
    required: true,
    ref:"Category"
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  callStatus: {
    type: String,
    enum:Object.values(PhoneCallStatus),
    required: true,
    default: PhoneCallStatus.PENDING
  },
  orderInitiationStatus: {
    type:String,
    enum: Object.values(OrderInitiationStatus),
    required: true,
    default: OrderInitiationStatus.PENDING
  },
  notes: {
    type: String
  }
}, { timestamps: true });
