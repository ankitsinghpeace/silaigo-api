import { Model } from 'mongoose';
import { ICategory, ICategoryLandingConfig, ILocation, ILocationCategory, ISubCategory } from 'core-db/interface';
export declare class LandingPagesService {
    private readonly locationModel;
    private readonly locationCategoryModel;
    private readonly categoryLandingConfigModel;
    private readonly categoryModel;
    private readonly subcategoryModel;
    constructor(locationModel: Model<ILocation>, locationCategoryModel: Model<ILocationCategory>, categoryLandingConfigModel: Model<ICategoryLandingConfig>, categoryModel: Model<ICategory>, subcategoryModel: Model<ISubCategory>);
    getLocationData(locationName: string): Promise<any>;
    getCategoryData(categoryName: string): Promise<any>;
    getLocationCategoryData(locationName: string, categoryName: string): Promise<any>;
    getRoutes(): Promise<{
        locationsCategoryMappings: {
            location: string;
            category: string;
            route: string;
        }[];
        locationsMappings: {
            location: string;
            route: string;
        }[];
        categoriesMappings: {
            category: string;
            route: string;
        }[];
    }>;
}
