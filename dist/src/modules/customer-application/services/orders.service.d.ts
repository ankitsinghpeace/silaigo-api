import mongoose, { Model } from 'mongoose';
import { ICustomization, IOrder, ISubCategory, IProfile, ICategory, IPayment, IMetaMaster, IAppointment, IIdentityCounters, IAddress, IMaterialPickup } from 'core-db/interface';
import { CreateAdminOrderDto, CreateMaterialPickupDto, CreateOrderDto, GetAllOrdersDto, UpdatePickupDto } from '../dto/order.dto';
import { OrderProcessingState, OrderStatus, OrderTimeLine } from 'core-db/enums/order.enums';
import { PaymentService } from './payment.service';
import { VerifyPaymentRequest } from './payments/interfaces';
import { MetaMasterService } from './metamaster.service';
import { AppointmentsService } from './appointments.service';
import { OrderEventsOptionsService } from './order-events-options.service';
export declare class OrdersService {
    private readonly orderModel;
    private readonly subCategoryModel;
    private readonly identityCountersModel;
    private readonly customizationModel;
    private readonly categoryModel;
    private readonly paymentService;
    private readonly paymentModel;
    private readonly metaMasterModel;
    private readonly metaMasterService;
    private readonly appointmentModel;
    private readonly profileModel;
    private readonly addressModel;
    private readonly pickupModel;
    private readonly appointmentsService;
    private readonly ordersEventsService;
    constructor(orderModel: Model<IOrder>, subCategoryModel: Model<ISubCategory>, identityCountersModel: Model<IIdentityCounters>, customizationModel: Model<ICustomization>, categoryModel: Model<ICategory>, paymentService: PaymentService, paymentModel: Model<IPayment>, metaMasterModel: Model<IMetaMaster>, metaMasterService: MetaMasterService, appointmentModel: Model<IAppointment>, profileModel: Model<IProfile>, addressModel: Model<IAddress>, pickupModel: Model<IMaterialPickup>, appointmentsService: AppointmentsService, ordersEventsService: OrderEventsOptionsService);
    getSubCategoryStyle(subCategoryId: mongoose.Types.ObjectId, subCategoryStyleId: number): Promise<any>;
    getTotalPrice(subCategory: any, customizations: any, options: any, order: any): Promise<{
        basePrice: number;
        customizations: {
            title: string;
            price: number;
            image: string | undefined;
            type: "customizations" | "options";
            id: string;
        }[];
        total: number;
    }>;
    formatTimeSlot(slotTime: any): string;
    createOrder(orderDto: CreateOrderDto, req: any): Promise<mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    createAdminOrder(orderDto: CreateAdminOrderDto, req: any): Promise<mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    cart(orderData: any, req: any): Promise<{
        message: string;
    }>;
    getOrderDetails(orderId: string, req: any): Promise<{
        appointment: {};
        address: {
            phone: any;
            name: string;
            _id?: mongoose.Types.ObjectId | undefined;
        } | null;
        order: {
            _id: string;
            status: OrderStatus | undefined;
            items: mongoose.FlattenMaps<{
                _id?: string | undefined;
                orderId?: string | undefined;
                subCategory: mongoose.Types.ObjectId;
                subCategoryStyleId?: number | undefined;
                customizations?: {
                    optionId: mongoose.Types.ObjectId;
                    type: string;
                } | undefined;
                notes?: string | undefined;
                options?: {
                    categoryId: mongoose.Types.ObjectId;
                    optionId: mongoose.Types.ObjectId;
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
        measurements: mongoose.FlattenMaps<{
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
    getOrderList(req: any, page: number, limit: number): Promise<{
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
    getAllOrders(dto: GetAllOrdersDto, req: any): Promise<{
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
    updateOrderStatus(orderId: string, status: OrderStatus, req: any): Promise<(mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    addTimelineEvent(orderId: string, event: OrderTimeLine, req: any): Promise<(mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    cancelOrder(orderId: any, req: any): Promise<{
        order: any;
        message: string;
    }>;
    createRazorpayOrder(orderId: string, couponCode: string, req: any): Promise<import("./payments/interfaces").PaymentOrder>;
    verifyPayment(body: VerifyPaymentRequest, req: any): Promise<any>;
    updateMeasurements(orderId: string, details: Record<string, string>): Promise<mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    removeOrderCustomizationsAndOptions(data: any): Promise<mongoose.UpdateWriteOpResult>;
    updateOrderCustomizationsAndOptions(data: {
        orderId: string;
        customPrice?: number;
        customizations?: {
            type: string;
            optionId: string;
        }[];
        options?: {
            categoryId?: string;
            optionId: string;
        }[];
        subCategoryId: string;
        subCategoryStyleId: string;
    }): Promise<mongoose.UpdateWriteOpResult>;
    createPickup(data: CreateMaterialPickupDto): Promise<mongoose.Document<unknown, {}, IMaterialPickup, {}, {}> & IMaterialPickup & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPickupList(): Promise<(mongoose.Document<unknown, {}, IMaterialPickup, {}, {}> & IMaterialPickup & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    updatePickupOptions(pickupId: string, options: {
        label: string;
        value: boolean;
    }[], req: any): Promise<mongoose.Document<unknown, {}, IMaterialPickup, {}, {}> & IMaterialPickup & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPickupById(id: string): Promise<mongoose.FlattenMaps<{
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
            updatedByUserId?: mongoose.Types.ObjectId | undefined;
        }[] | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    duplicateOrder(orderId: string, req: any): Promise<mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    updatePickupDetails(pickupId: string, payload: UpdatePickupDto): Promise<(mongoose.Document<unknown, {}, IMaterialPickup, {}, {}> & IMaterialPickup & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateOrderImages(orderId: string, dto: {
        add?: string[];
        remove?: string[];
    }): Promise<(mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateOrderProcessingState(orderId: string, nextState: OrderProcessingState, req: any): Promise<(mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateBulkOrders(body: any, req: any): Promise<mongoose.UpdateWriteOpResult>;
    pinOrder(orderId: string, body: any): Promise<(mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    assignStitchingAgent(orderId: string, agentId: string): Promise<(mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    updateOrderPaymentStatus(orderId: string, status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID'): Promise<(mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}
