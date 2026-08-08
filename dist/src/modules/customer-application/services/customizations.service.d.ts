import mongoose, { Model } from 'mongoose';
import { ICategory, ICustomization, ICustomizationOptionMapping } from 'core-db/interface';
import { GetCustomizationOptionsMappingDto } from '../dto/customization-option-mapping.dto';
export declare class CustomizationsService {
    private readonly customizationsModel;
    private readonly customizationOptionsMappingModel;
    private readonly categoryModel;
    constructor(customizationsModel: Model<ICustomization>, customizationOptionsMappingModel: Model<ICustomizationOptionMapping>, categoryModel: Model<ICategory>);
    getCustomizations(): Promise<(mongoose.FlattenMaps<{
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
    addCustomizationsOptions(type: any, customizations: any): Promise<(mongoose.Document<unknown, {}, ICustomization, {}, {}> & ICustomization & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    removeCustomizationsOptions(type: any, customizationIds: any): Promise<(mongoose.Document<unknown, {}, ICustomization, {}, {}> & ICustomization & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateCustomizationsOptions(type: any, customization: any): Promise<(mongoose.Document<unknown, {}, ICustomization, {}, {}> & ICustomization & Required<{
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
    addCustomizationsMapping(mapping: any): Promise<{
        _id: string;
        customizationType: any;
        categoryId: any;
        optionIds: number[];
        subCategoryIds: mongoose.Types.ObjectId[];
    }>;
    editCustomizationsMapping(mapping: any, id: any): Promise<{
        _id: any;
        customizationType: any;
        categoryId: mongoose.Types.ObjectId;
        optionIds: number[];
        subCategoryIds: mongoose.Types.ObjectId[];
    }>;
    deleteCustomizationsMapping(id: any): Promise<(mongoose.Document<unknown, {}, ICustomizationOptionMapping, {}, {}> & ICustomizationOptionMapping & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getCustomizationOptionsMapping(data: GetCustomizationOptionsMappingDto): Promise<any[]>;
    getCustomizationTypesList(): Promise<any[]>;
    updateCustomizationRank(body: {
        type: string;
        rank: number;
    }): Promise<{
        customization: mongoose.Document<unknown, {}, ICustomization, {}, {}> & ICustomization & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
}
