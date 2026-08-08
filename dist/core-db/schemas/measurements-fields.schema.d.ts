import { IMeasurementCategory, IMeasurementField } from 'core-db/interface';
import mongoose from 'mongoose';
export declare const FieldSchema: mongoose.Schema<IMeasurementField, mongoose.Model<IMeasurementField, any, any, any, mongoose.Document<unknown, any, IMeasurementField, any, {}> & IMeasurementField & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IMeasurementField, mongoose.Document<unknown, {}, mongoose.FlatRecord<IMeasurementField>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IMeasurementField> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const MeasurementCategorySchema: mongoose.Schema<IMeasurementCategory, mongoose.Model<IMeasurementCategory, any, any, any, mongoose.Document<unknown, any, IMeasurementCategory, any, {}> & IMeasurementCategory & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IMeasurementCategory, mongoose.Document<unknown, {}, mongoose.FlatRecord<IMeasurementCategory>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IMeasurementCategory> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
