import { SubCategoryService } from '../services/subcategory.service';
export declare class SubCategoryController {
    private readonly subCategoryService;
    constructor(subCategoryService: SubCategoryService);
    getAllCategories(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ISubCategory, {}, {}> & import("../../../../core-db/interface").ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    createNewSubCategory(subCategories: any[]): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ISubCategory, {}, {}> & import("../../../../core-db/interface").ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | (import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ISubCategory, {}, {}> & import("../../../../core-db/interface").ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    updateSubCategory(subCategories: any[]): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ISubCategory, {}, {}> & import("../../../../core-db/interface").ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | import("../../../../core-db/interface").ISubCategory[] | {
        error: string;
    } | null>;
    deleteCategoryById(id: string): Promise<import("mongodb").DeleteResult | (import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ISubCategory, {}, {}> & import("../../../../core-db/interface").ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    deleteMultipleCategories(subCategories: any[]): Promise<import("mongodb").DeleteResult | (import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ISubCategory, {}, {}> & import("../../../../core-db/interface").ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getSubCategoryStyle(subCategoryId: string, subCategoryStyleId: string): Promise<any>;
}
