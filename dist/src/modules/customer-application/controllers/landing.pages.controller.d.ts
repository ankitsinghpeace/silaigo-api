import { LandingPagesService } from '../services/landing.pages.service';
export declare class LandingPagesController {
    private readonly landingPagesService;
    constructor(landingPagesService: LandingPagesService);
    getLocationData(location: string): Promise<any>;
    getCategoryData(category: string): Promise<any>;
    getLocationCategoryData(location: string, category: string): Promise<any>;
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
