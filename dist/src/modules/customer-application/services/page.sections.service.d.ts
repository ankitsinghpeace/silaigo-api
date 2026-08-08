import { Model } from 'mongoose';
import { IPageSection } from 'core-db/interface';
export declare class PageSectionService {
    private readonly pageSectionModel;
    constructor(pageSectionModel: Model<IPageSection>);
    findSectionByType(type: string): Promise<any>;
    getNavbarData(): Promise<(import("mongoose").Document<unknown, {}, IPageSection, {}, {}> & IPageSection & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getCompleteHomePage(): Promise<any>;
    updateSectionByType(type: string, updateData: Partial<IPageSection>): Promise<(import("mongoose").Document<unknown, {}, IPageSection, {}, {}> & IPageSection & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    uploadFileService(fileInfo: any): Promise<{
        url: string;
        key: string;
    }>;
}
