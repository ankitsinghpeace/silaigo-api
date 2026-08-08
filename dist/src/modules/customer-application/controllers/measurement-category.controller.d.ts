import { MeasurementCategoryDto, MeasurementFieldDto } from '../dto/measurement.dto';
import { MeasurementsService } from '../services/measurements.service';
export declare class MeasurementsCategoryController {
    private readonly measurementCategoryService;
    constructor(measurementCategoryService: MeasurementsService);
    listCategories(): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMeasurementCategory, {}, {}> & import("../../../../core-db/interface").IMeasurementCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createCategory(data: MeasurementCategoryDto): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMeasurementCategory, {}, {}> & import("../../../../core-db/interface").IMeasurementCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateCategoty(data: MeasurementCategoryDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMeasurementCategory, {}, {}> & import("../../../../core-db/interface").IMeasurementCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    removeCategory(name: string): Promise<import("mongodb").DeleteResult>;
    listMeasurementsFields(): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMeasurementField, {}, {}> & import("../../../../core-db/interface").IMeasurementField & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getUserMeasurements(phone: string): Promise<{
        bodyMeasurement: any;
    }>;
    createMeasurementFiled(data: MeasurementFieldDto): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMeasurementField, {}, {}> & import("../../../../core-db/interface").IMeasurementField & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteMeasurementField(id: string): Promise<import("mongodb").DeleteResult>;
}
