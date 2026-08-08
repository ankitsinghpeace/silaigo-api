import { Schema, Types } from 'mongoose';

export const OrdersEventsOptionsSchema = new Schema({
  roleId: { type: Types.ObjectId, ref: 'Role', required: true },

  options: [
    {
      label: { type: String, required: true },
      type: { type: String, enum: ['checkbox', 'action', 'input', 'dropdown'] },
      inputRequired: { type: Boolean, default: false },
      inputType: {
        type: String,
        enum: ['text', 'textarea', 'select', null],
        default: null,
      },
      dataSource: { type: String, default: null },
      repeatable: { type: Boolean, default: false },
    },
  ],
});
