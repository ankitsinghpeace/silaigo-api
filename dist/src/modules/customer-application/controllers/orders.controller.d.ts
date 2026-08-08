import { OrdersService } from '../services/orders.service';
import { Request } from 'express';
import { CreateAdminOrderDto, CreateMaterialPickupDto, CreateOrderDto, GetAllOrdersDto, UpdateOrderStatusDto, UpdatePickupDto } from '../dto/order.dto';
import { OrderStatus, OrderTimeLine } from 'core-db/enums';
import { VerifyPaymentRequest } from '../services/payments/interfaces';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(orderDto: CreateOrderDto, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    createAdminOrder(orderDto: CreateAdminOrderDto, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    duplicateOrder(orderDto: any, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    checkoutCart(orderData: any, req: Request): Promise<{
        message: string;
    }>;
    getAllOrders(query: GetAllOrdersDto, req: Request): Promise<{
        orders: any;
        pagination: {
            currentPage: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
            total: number;
            count: any;
            limit: number;
            nextPage: number | null;
            prevPage: number | null;
        };
        filters: {
            orderId: string;
            customerPhone: string;
            customerName: string;
            orderStatus: string | undefined;
            orderDate: string | undefined;
            sortBy: "newest" | "oldest";
        };
        pinnedOrderList: any;
    }>;
    getPickupList(): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMaterialPickup, {}, {}> & import("../../../../core-db/interface").IMaterialPickup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPickupById(id: string): Promise<import("mongoose").FlattenMaps<{
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        pincode?: string | undefined;
        isDefault?: boolean | undefined;
        pickupFor?: string | undefined;
        firstName: string;
        lastName?: string | undefined;
        phone?: string | undefined;
        scheduledPickupTime: string;
        scheduledPickupDate: string;
        options: {
            label: string;
            type: string;
            value: boolean;
        }[];
        timeline?: {
            status?: string | undefined;
            timeStamp?: Date | undefined;
            updatedBy?: string | undefined;
            updatedByUserId?: import("mongoose").Types.ObjectId | undefined;
        }[] | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getOrderDetails(orderId: string, req: Request): Promise<{
        appointment: {};
        address: {
            phone: any;
            name: string;
            _id?: import("mongoose").Types.ObjectId | undefined;
        } | null;
        order: {
            _id: string;
            status: OrderStatus | undefined;
            items: import("mongoose").FlattenMaps<{
                _id?: string | undefined;
                orderId?: string | undefined;
                subCategory: import("mongoose").Types.ObjectId;
                subCategoryStyleId?: number | undefined;
                customizations?: {
                    optionId: import("mongoose").Types.ObjectId;
                    type: string;
                } | undefined;
                notes?: string | undefined;
                options?: {
                    categoryId: import("mongoose").Types.ObjectId;
                    optionId: import("mongoose").Types.ObjectId;
                }[] | undefined;
            }>[];
            imageUrls: string[] | undefined;
            createdAt: Date | undefined;
            notes: string;
        };
        payment: {};
        style: {
            name: any;
            image: any;
            price: number;
        };
        priceBreakup: {
            basePrice: number;
            customizations: {
                title: string;
                price: number;
                image: string | undefined;
                type: "customizations" | "options";
                id: string;
            }[];
            total: number;
        };
        measurements: import("mongoose").FlattenMaps<{
            constructor: Function;
            toString: () => string;
            toLocaleString: () => string;
            valueOf: () => Object;
            hasOwnProperty: (v: PropertyKey) => boolean;
            isPrototypeOf: (v: Object) => boolean;
            propertyIsEnumerable: (v: PropertyKey) => boolean;
        }>;
    }>;
    getNextOrderId(categoryId: string, subCategoryName: string): Promise<string>;
    getOrderList(req: Request, page?: number, limit?: number): Promise<{
        orders: any[];
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
            limit: number;
            page: number;
        };
    }>;
    updateOrderStatus(orderId: string, body: UpdateOrderStatusDto, req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateOrderTimeLIne(orderId: string, body: {
        status: OrderTimeLine;
    }, req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateMeasurements(orderId: string, body: {
        details: Record<string, string>;
    }): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    cancelOrder(orderId: string, req: any): Promise<{
        order: any;
        message: string;
    }>;
    createRazorpayOrder(body: {
        internalOrderId: string;
        couponCode: string;
    }, req: Request): Promise<import("../services/payments/interfaces").PaymentOrder>;
    verifyPayment(body: VerifyPaymentRequest, req: Request): Promise<any>;
    removeCustomizationAndOptions(body: any): Promise<import("mongoose").UpdateWriteOpResult>;
    updateOrderImages(id: string, dto: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    addOrderCustomizations(body: any): Promise<import("mongoose").UpdateWriteOpResult>;
    updateProcessingState(body: any, id: string, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updatePaymentStatus(body: any, id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateBulkOrders(body: any, req: any): Promise<import("mongoose").UpdateWriteOpResult>;
    updateRank(body: any, id: string, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    assignStitchingAgent(body: any, id: string, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IOrder, {}, {}> & import("../../../../core-db/interface").IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    createPickup(data: CreateMaterialPickupDto): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMaterialPickup, {}, {}> & import("../../../../core-db/interface").IMaterialPickup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePickupDetails(id: string, body: UpdatePickupDto): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMaterialPickup, {}, {}> & import("../../../../core-db/interface").IMaterialPickup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updatePickupOptions(id: string, options: {
        label: string;
        value: boolean;
    }[], req: any): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IMaterialPickup, {}, {}> & import("../../../../core-db/interface").IMaterialPickup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
