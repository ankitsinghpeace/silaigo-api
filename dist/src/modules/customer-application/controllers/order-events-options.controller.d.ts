import { OrderEventsOptionsService } from '../services/order-events-options.service';
export declare class OrderEventsOptionsController {
    private readonly ordersEventsService;
    constructor(ordersEventsService: OrderEventsOptionsService);
    getOptions(req: any, orderId: string): Promise<{
        aggregatedState: {};
        options: any;
    }>;
    addEventInTimeLine(req: any, body: any): Promise<any>;
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
        role: import("../../../../core-db/enums").RoleCode;
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
