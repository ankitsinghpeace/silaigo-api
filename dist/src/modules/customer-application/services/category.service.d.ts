import { Model } from 'mongoose';
import { ICategory, ICustomization, ISubCategory, ICustomizationOptionMapping, IMetaMaster } from 'core-db/interface';
import { UpdateCategoryDto } from '../dto/category.dto';
export declare class CategoryService {
    private readonly categoryModel;
    private readonly subCategoryModel;
    private readonly customizationsModel;
    private readonly metaModel;
    private readonly customizationOptionMappingModel;
    constructor(categoryModel: Model<ICategory>, subCategoryModel: Model<ISubCategory>, customizationsModel: Model<ICustomization>, metaModel: Model<IMetaMaster>, customizationOptionMappingModel: Model<ICustomizationOptionMapping>);
    getAllCategories(): Promise<(import("mongoose").FlattenMaps<{
        _id?: string | undefined;
        name: string;
        isActive: boolean;
        isVisibleOnHomePage: boolean;
        imageUrl: string;
        description: string;
        label?: {
            _id?: string | undefined;
            title: string;
            name: string;
            color?: string | undefined;
        } | undefined;
        rank: number;
        options: {
            title: string;
            discountedPrice: string;
            price: string;
        }[];
    }> & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    getCategoryDetails(categoryId: number): Promise<{
        styles: any;
        subCategoryId: any;
        _id?: string;
        name?: string | undefined;
        isActive?: boolean | undefined;
        isVisibleOnHomePage?: boolean | undefined;
        imageUrl?: string | undefined;
        description?: string | undefined;
        label?: import("mongoose").FlattenMaps<{
            _id?: string | undefined;
            title: string;
            name: string;
            color?: string | undefined;
        }> | undefined;
        rank?: number | undefined;
        options?: import("mongoose").FlattenMaps<{
            title: string;
            discountedPrice: string;
            price: string;
        }>[] | undefined;
        __v?: number | undefined;
    }>;
    getCategoryTypeData(type: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | undefined>;
    createCategory(category: any): Promise<import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    editCategory(categoryDto: UpdateCategoryDto): Promise<(import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    deleteCategory(id: number): Promise<(import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateCategoryStyles(data: any, categoryId: number): Promise<import("mongoose").Document<unknown, {}, ISubCategory, {}, {}> & ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
}
