import { CustomizationsService } from '../services/customizations.service';
export declare const inventoryPermissions: string[];
export declare class CustomizationsController {
    private readonly customizationsService;
    constructor(customizationsService: CustomizationsService);
    getCustomizations(): Promise<(import("mongoose").FlattenMaps<{
        _id?: string | undefined;
        type: string;
        options: {
            _id?: string | undefined;
            title: string;
            imageUrl?: string | undefined;
            complexity: string;
            price: number;
            discountedPrice: number;
            enabled: boolean;
            optionIds?: string[] | undefined;
        }[];
        rank: number;
    }> & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    updateCustomizationRank(body: {
        type: string;
        rank: number;
    }): Promise<{
        customization: import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ICustomization, {}, {}> & import("../../../../core-db/interface").ICustomization & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
    addCustiomizationsOptions(type: string, customizations: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ICustomization, {}, {}> & import("../../../../core-db/interface").ICustomization & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateCustomizationsOptions(type: string, customizations: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ICustomization, {}, {}> & import("../../../../core-db/interface").ICustomization & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    removeCustomizationOptions(type: string, customizationIds: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ICustomization, {}, {}> & import("../../../../core-db/interface").ICustomization & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getCustomizationsMapping(): Promise<{
        _id: any;
        customizationType: any;
        categoryName: any;
        categoryId: any;
        optionIds: any;
        subCategoryIds: any;
    }[]>;
    addCustomizationsMapping(body: any): Promise<{
        _id: string;
        customizationType: any;
        categoryId: any;
        optionIds: number[];
        subCategoryIds: import("mongoose").Types.ObjectId[];
    }>;
    editCustomizationsMapping(body: any): Promise<{
        _id: any;
        customizationType: any;
        categoryId: import("mongoose").Types.ObjectId;
        optionIds: number[];
        subCategoryIds: import("mongoose").Types.ObjectId[];
    }>;
    deleteCustomizationsMapping(body: {
        id: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").ICustomizationOptionMapping, {}, {}> & import("../../../../core-db/interface").ICustomizationOptionMapping & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getCustomizationOptionsMapping(subCategoryId: string, categoryId: string, customizationType: string): Promise<any[]>;
    getCustomizationTypesList(): Promise<any[]>;
}
