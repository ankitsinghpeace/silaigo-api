import mongoose, { Model } from 'mongoose';
import { ICategory, ISubCategory } from 'core-db/interface';
export declare class SubCategoryService {
    private readonly subCategoryModel;
    private readonly categoryModel;
    constructor(subCategoryModel: Model<ISubCategory>, categoryModel: Model<ICategory>);
    getAllSubCategoriesByCategory(categoryId: number): Promise<(mongoose.Document<unknown, {}, ISubCategory, {}, {}> & ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    createNewSubCategory(subCategoryData: ISubCategory | ISubCategory[]): Promise<(mongoose.Document<unknown, {}, ISubCategory, {}, {}> & ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | (mongoose.Document<unknown, {}, ISubCategory, {}, {}> & ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    updateSubCategory(subCategories: any[] | any): Promise<(mongoose.Document<unknown, {}, ISubCategory, {}, {}> & ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | ISubCategory[] | {
        error: string;
    } | null>;
    deleteSubCategory(input: number | {
        id: number;
    }[]): Promise<mongoose.mongo.DeleteResult | (mongoose.Document<unknown, {}, ISubCategory, {}, {}> & ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getSubCategoryStyle(subCategoryId: string, subCategoryStyleId: string): Promise<any>;
}
