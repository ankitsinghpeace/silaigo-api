import { Schema } from 'mongoose';

export const AvailabilitySchema = new Schema({
  date: { type: Date, required: true, unique: true },

  type: {
    type: String,
    enum: ['HOLIDAY', 'CUSTOM'],
    required: true,
  },

  // Optional: if the working hours differ on this date
  workingHours: {
    startTime: { type: String }, // e.g., "10:00"
    endTime: { type: String }, // e.g., "16:00"
  },

  // Slot-level rules on this date (Map<slotTime, settings>)
  slots: {
    type: Map,
    of: new Schema({
      isBlocked: { type: Boolean, default: false },
      maxAppointments: { type: Number }, // Optional override
    }),
    default: {},
  },

  reason: { type: String },
  createdAt: { type: Date, default: Date.now },
});
