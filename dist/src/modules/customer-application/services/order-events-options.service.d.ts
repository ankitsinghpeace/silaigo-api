import { IOrder, IMaterialPickup, MicroEventsTimeline, OrdersEventsOptions, IUser } from './../../../../core-db/interface';
import { Model } from 'mongoose';
import { RoleCode } from 'core-db/enums/roles.enums';
export declare class OrderEventsOptionsService {
    private readonly orderEventsOptionsModel;
    private readonly orderMicroEventsModel;
    private readonly orderModel;
    private readonly pickupModel;
    private readonly userModel;
    constructor(orderEventsOptionsModel: Model<OrdersEventsOptions>, orderMicroEventsModel: Model<MicroEventsTimeline>, orderModel: Model<IOrder>, pickupModel: Model<IMaterialPickup>, userModel: Model<IUser>);
    getEventsOptions(req: any, orderId: any): Promise<{
        aggregatedState: {};
        options: any;
    }>;
    addMicroEventInTimeLine(req: any, body: any): Promise<any>;
    getAggregatedTimeLine(orderId: string): Promise<{
        key: string;
        value: string | number | boolean | import("mongoose").FlattenMaps<{
            [x: string]: any;
        }> | null | undefined;
        status: string;
        timeStamp: Date;
        updatedBy: string;
        updatedByUserId: string;
    }[]>;
    getTimeLine(orderId: string, req: any): Promise<{
        key: string;
        value: string | number | boolean | import("mongoose").FlattenMaps<{
            [x: string]: any;
        }> | null | undefined;
        status: string;
        timeStamp: Date;
        updatedBy: string;
        updatedByUserId: string;
    }[]>;
    getUserAnalytics(userId: string, startDate?: string, endDate?: string): Promise<{
        userId: string;
        role: RoleCode;
        analytics: {
            assigned: number;
            completed: number;
            pending: number;
        };
        dateRange: {
            startDate: string | null;
            endDate: string | null;
        };
    }>;
}
