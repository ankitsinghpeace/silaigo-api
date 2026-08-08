export declare enum OrderStatus {
    PENDING = "PENDING",
    PAYMENT_PENDING = "PAYMENT PENDING",
    PLACED = "PLACED",
    PAYMENT_DONE = "PAYMENT DONE",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}
export declare enum OrderProcessingState {
    ORDER_INITIATED = "ORDER_INITIATED",
    ORDER_PLACED = "ORDER_PLACED",
    MATERIAL_DELIVERED_TO_WORKSHOP = "MATERIAL_DELIVERED_TO_WORKSHOP",
    ORDER_FULFILLED = "ORDER_FULFILLED",
    CUTTING_END = "CUTTING_END",
    STITCHING_END = "STITCHING_END",
    PRODUCT_VERIFIED_OR_RECTIFIED = "PRODUCT_VERIFIED_OR_RECTIFIED",
    MATERIAL_PACKED = "MATERIAL_PACKED",
    READY_FOR_DISPATCH = "READY_FOR_DISPATCH",
    ORDER_COMPLETE = "ORDER_COMPLETE"
}
export declare const OrderProcessingStateTimeLineMap: {
    'Order fulfilled': OrderProcessingState;
    'Cutting End': OrderProcessingState;
    'Stitching End': OrderProcessingState;
};
export declare const OrderProcessingStateToUserRole: {
    PICKUP_COORDINATOR: OrderProcessingState[];
    CUTTING: OrderProcessingState[];
    STITCHING: OrderProcessingState[];
};
export declare const RoleToProfileAttributesMap: {
    ADMIN: string;
    PICKUP_COORDINATOR: string;
    CUTTING: string;
    STITCHING: string;
};
export declare enum OrderTimeLine {
    ORDER_CREATED = "ORDER CREATED",
    APPOINTMENT_BOOKED = "APPOINTMENT BOOKED",
    PICKUP_PERSON_ASSIGNED = "PICKUP PERSON ASSIGNED",
    OUT_FOR_PICKUP = "OUT FOR PICKUP",
    PICKUP_COMPLETED = "PICKUP COMPLETED",
    RETURNED_TO_FACILITY = "RETURNED TO FACILITY",
    PAYMENT_DONE = "PAYMENT COMPLETED",
    ORDER_CANCELLED = "ORDER CANCELLED",
    ORDER_COMPLETED = "ORDER COMPLETED"
}
export declare const TimelineToStatusMap: {
    readonly "PAYMENT COMPLETED": OrderStatus.PAYMENT_DONE;
    readonly "ORDER CANCELLED": OrderStatus.CANCELLED;
    readonly "ORDER COMPLETED": OrderStatus.COMPLETED;
};
export declare const OrderStatusToTimelineMap: {
    readonly "PAYMENT DONE": OrderTimeLine.PAYMENT_DONE;
    readonly CANCELLED: OrderTimeLine.ORDER_CANCELLED;
    readonly COMPLETED: OrderTimeLine.ORDER_COMPLETED;
};
