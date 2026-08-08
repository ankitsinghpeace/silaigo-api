import { OrderStatus } from 'core-db/enums/order.enums';
export declare class OrderItemDto {
    subCategory: string;
    customizations?: string[];
    notes?: string;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
    imageUrls: string[];
}
export declare class CreateAdminOrderDto {
    items: OrderItemDto[];
    imageUrls: string[];
    phone: string;
    name: string;
    customPrice: number;
    measurements?: Record<string, any>;
    scheduledPickupDate: Date;
    scheduledPickupTime: Date;
}
export declare class UpdateOrderDto {
    _id: string;
    status?: string;
    payment?: string;
    appointment?: string;
}
export declare class GetAllOrdersDto {
    orderId: string;
    customerPhone: string;
    customerName: string;
    orderStatus?: string;
    orderDate?: string;
    sortBy?: 'newest' | 'oldest';
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    appointmentDate?: string;
    couponCode?: string;
    productName?: string;
    all_orders?: string;
    sortByDeliveryDate?: string;
    customerId?: string;
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
}
export declare class CreateMaterialPickupDto {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    pickupFor?: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    scheduledPickupDate: string;
    scheduledPickupTime: string;
}
export declare class UpdatePickupDto {
    firstName?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    pickupFor?: string;
    scheduledPickupDate?: string;
    scheduledPickupTime?: string;
}
export declare class UpdateOrderImagesDto {
    add?: string[];
    remove?: string[];
}
