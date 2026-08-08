import { IMeasurementCategory, IMeasurementField } from 'core-db/interface';
import mongoose, { Schema, Document } from 'mongoose';

export const FieldSchema = new Schema<IMeasurementField>({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
});

export const MeasurementCategorySchema = new Schema<IMeasurementCategory>({
  name: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  fields: [FieldSchema],
});
