import { MetaMasterService } from '../services/metamaster.service';
import { GetMetaMasterListDto, MetaMasterDto } from '../dto/meta.master.dto';
export declare class MetaMasterController {
    private readonly metaService;
    constructor(metaService: MetaMasterService);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMetaMaster, {}, {}> & import("../../../../core-db/interface").IMetaMaster & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    getDistinctTypes(): Promise<string[]>;
    getMetaDataType(type: string): Promise<any[]>;
    getMetaMasterList(query: GetMetaMasterListDto): Promise<{
        items: (import("mongoose").FlattenMaps<{
            _id?: string | undefined;
            type: string;
            subType: string;
            label: string;
            value?: any;
            isActive?: boolean | undefined;
            color?: string | undefined;
        }> & Required<{
            _id: string;
        }> & {
            __v: number;
        })[];
        pagination: {
            currentPage: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
            total: number;
            count: number;
            limit: number;
            nextPage: number | null;
            prevPage: number | null;
        };
        filters: {
            search: string | undefined;
            sortBy: "newest" | "oldest";
        };
    }>;
    getEligibleCoupons(): Promise<{
        couponList: {
            code: any;
            maxDiscount: string | number;
            amount: string;
            validTill: any;
            minOrderValue: any;
            nthOrder: any;
        }[];
    }>;
    addMetaMaster(dto: MetaMasterDto): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMetaMaster, {}, {}> & import("../../../../core-db/interface").IMetaMaster & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    updateMetaMaster(id: string, dto: MetaMasterDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMetaMaster, {}, {}> & import("../../../../core-db/interface").IMetaMaster & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    deleteMetaMaster(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMetaMaster, {}, {}> & import("../../../../core-db/interface").IMetaMaster & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    validateCoupon(dto: {
        couponCode: string;
        amount: number;
    }, req: Request): Promise<{
        discount: number;
        code: string;
    }>;
}
