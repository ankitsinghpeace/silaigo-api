import { CategoryService } from '../services/category.service';
import { UpdateCategoryDto } from '../dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    getCategoryTypeData(type: string): Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | undefined>;
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
    createCategory(category: any): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ICategory, {}, {}> & import("../../../../core-db/interface").ICategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    editCategory(category: UpdateCategoryDto): Promise<void>;
    deleteCategory(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ICategory, {}, {}> & import("../../../../core-db/interface").ICategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateCategoryStyles(data: any, id: number): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ISubCategory, {}, {}> & import("../../../../core-db/interface").ISubCategory & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
}
