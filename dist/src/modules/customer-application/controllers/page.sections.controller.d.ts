import { PageSectionService } from '../services/page.sections.service';
interface FileInfo {
    resourceName: string;
    resourceId: number;
    subResourceName?: string;
    subResourceId?: number;
    fileType: string;
    fileSize: number;
}
export declare class PageSectionController {
    private readonly pageSectionService;
    constructor(pageSectionService: PageSectionService);
    getHomepageData(): Promise<any>;
    getNavbarData(): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IPageSection, {}, {}> & import("../../../../core-db/interface").IPageSection & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getSectionByType(type: string): Promise<any>;
    updateSectionByType(type: string, body: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IPageSection, {}, {}> & import("../../../../core-db/interface").IPageSection & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getSignedUrl(fileInfo: FileInfo): Promise<{
        url: string;
        key: string;
    }>;
    uploadFile(files: {
        file?: any;
        fileInfo?: any;
    }): Promise<{
        url: string;
    }>;
}
export {};
