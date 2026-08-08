import { Model } from 'mongoose';
import { IMeasurementCategory, IMeasurementField, IOrder, IProfile } from 'core-db/interface';
import { MeasurementCategoryDto, MeasurementFieldDto } from '../dto/measurement.dto';
export declare class MeasurementsService {
    private readonly measurementModel;
    private readonly measurementFieldModel;
    private readonly orderModel;
    private readonly profileModel;
    constructor(measurementModel: Model<IMeasurementCategory>, measurementFieldModel: Model<IMeasurementField>, orderModel: Model<IOrder>, profileModel: Model<IProfile>);
    createCategory(data: MeasurementCategoryDto): Promise<import("mongoose").Document<unknown, {}, IMeasurementCategory, {}, {}> & IMeasurementCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    addMeasureMentField(data: MeasurementFieldDto): Promise<import("mongoose").Document<unknown, {}, IMeasurementField, {}, {}> & IMeasurementField & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteCategory(name: string): Promise<import("mongodb").DeleteResult>;
    updateCategory(data: MeasurementCategoryDto): Promise<(import("mongoose").Document<unknown, {}, IMeasurementCategory, {}, {}> & IMeasurementCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    listCategories(): Promise<(import("mongoose").Document<unknown, {}, IMeasurementCategory, {}, {}> & IMeasurementCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    listMeasurementsFields(): Promise<(import("mongoose").Document<unknown, {}, IMeasurementField, {}, {}> & IMeasurementField & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteMeasurementField(id: string): Promise<import("mongodb").DeleteResult>;
    getUserMeasurements(phone: string): Promise<{
        bodyMeasurement: any;
    }>;
}
