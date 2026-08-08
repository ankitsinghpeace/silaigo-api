import { Schema } from 'mongoose';

export const ScheduleSchema = new Schema({
  name: { type: String, default: 'Global Schedule' },
  workingDays: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  dailyHours: {
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true }, // "18:00"
  },
  slotIntervalMinutes: { type: Number, default: 60 },
  maxAppointmentsPerSlot: { type: Number, default: 2 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
