import { Model } from 'mongoose';
import { IMetaMaster, IOrder } from 'core-db/interface';
import { MetaMasterDto } from '../dto/meta.master.dto';
export declare class MetaMasterService {
    private readonly metaModel;
    private readonly orderModel;
    constructor(metaModel: Model<IMetaMaster>, orderModel: Model<IOrder>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, IMetaMaster, {}, {}> & IMetaMaster & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    findDistinctTypes(): Promise<string[]>;
    findMetaType(type: string): Promise<any[]>;
    addCoupon(dto: MetaMasterDto): Promise<import("mongoose").Document<unknown, {}, IMetaMaster, {}, {}> & IMetaMaster & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    updateCoupon(id: string, dto: MetaMasterDto): Promise<(import("mongoose").Document<unknown, {}, IMetaMaster, {}, {}> & IMetaMaster & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    deleteCoupon(id: string): Promise<(import("mongoose").Document<unknown, {}, IMetaMaster, {}, {}> & IMetaMaster & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    validateCoupon({ couponCode, amount }: {
        couponCode: string;
        amount: number;
    }, req: any): Promise<{
        discount: number;
        code: string;
    }>;
    listEligibleCoupons(): Promise<{
        couponList: {
            code: any;
            maxDiscount: string | number;
            amount: string;
            validTill: any;
            minOrderValue: any;
            nthOrder: any;
        }[];
    }>;
    getMetaMasterList(options: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: 'newest' | 'oldest';
        type?: string;
    }): Promise<{
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
}
