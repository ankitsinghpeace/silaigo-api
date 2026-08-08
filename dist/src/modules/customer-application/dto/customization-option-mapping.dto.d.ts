export declare class CustomizationOptionMappingDto {
    _id?: string;
    customizationType: string;
    optionsId: string[];
    subCategoryIds: number[];
    categoryId: number;
}
export declare class GetCustomizationOptionsMappingDto {
    customizationType: string;
    categoryId: string;
    subCategoryId: string;
}
