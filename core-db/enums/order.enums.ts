import { RoleCode } from './roles.enums';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAYMENT_PENDING = 'PAYMENT PENDING',
  PLACED = 'PLACED',
  PAYMENT_DONE = 'PAYMENT DONE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum OrderProcessingState {
  ORDER_INITIATED = 'ORDER_INITIATED',
  ORDER_PLACED = 'ORDER_PLACED',
  MATERIAL_DELIVERED_TO_WORKSHOP = 'MATERIAL_DELIVERED_TO_WORKSHOP',
  ORDER_FULFILLED = 'ORDER_FULFILLED',
  CUTTING_END = 'CUTTING_END',
  STITCHING_END = 'STITCHING_END',
  PRODUCT_VERIFIED_OR_RECTIFIED = 'PRODUCT_VERIFIED_OR_RECTIFIED',
  MATERIAL_PACKED = 'MATERIAL_PACKED',
  READY_FOR_DISPATCH = 'READY_FOR_DISPATCH',
  ORDER_COMPLETE = 'ORDER_COMPLETE',
}

export const OrderProcessingStateTimeLineMap = {
  'Order fulfilled': OrderProcessingState.ORDER_FULFILLED,
  'Cutting End': OrderProcessingState.CUTTING_END,
  'Stitching End': OrderProcessingState.STITCHING_END,
};

export const OrderProcessingStateToUserRole = {
  [RoleCode.PICKUP_COORDINATOR]: [
    OrderProcessingState.ORDER_PLACED,
    OrderProcessingState.MATERIAL_PACKED,
    OrderProcessingState.READY_FOR_DISPATCH,
  ],
  [RoleCode.CUTTING]: [OrderProcessingState.ORDER_FULFILLED],
  [RoleCode.STITCHING]: [OrderProcessingState.CUTTING_END],
  [RoleCode.SUPPORT]: [
    OrderProcessingState.STITCHING_END,
    OrderProcessingState.PRODUCT_VERIFIED_OR_RECTIFIED,
    OrderProcessingState.MATERIAL_PACKED,
  ],
};

export const RoleToProfileAttributesMap = {
  [RoleCode.ADMIN]: 'firstName lastName phone email',
  [RoleCode.PICKUP_COORDINATOR]: 'firstName lastName phone email',
  [RoleCode.CUTTING]: 'firstName lastName email',
  [RoleCode.STITCHING]: 'firstName lastName email',
  [RoleCode.SUPPORT]: 'firstName lastName phone email',
};

export enum OrderTimeLine {
  ORDER_CREATED = 'ORDER CREATED',
  APPOINTMENT_BOOKED = 'APPOINTMENT BOOKED',
  PICKUP_PERSON_ASSIGNED = 'PICKUP PERSON ASSIGNED',
  OUT_FOR_PICKUP = 'OUT FOR PICKUP',
  PICKUP_COMPLETED = 'PICKUP COMPLETED',
  RETURNED_TO_FACILITY = 'RETURNED TO FACILITY',
  PAYMENT_DONE = 'PAYMENT COMPLETED',
  ORDER_CANCELLED = 'ORDER CANCELLED',
  ORDER_COMPLETED = 'ORDER COMPLETED',
}

export const TimelineToStatusMap = {
  [OrderTimeLine.PAYMENT_DONE]: OrderStatus.PAYMENT_DONE,
  [OrderTimeLine.ORDER_CANCELLED]: OrderStatus.CANCELLED,
  [OrderTimeLine.ORDER_COMPLETED]: OrderStatus.COMPLETED,
} as const;

export const OrderStatusToTimelineMap = {
  [OrderStatus.PAYMENT_DONE]: OrderTimeLine.PAYMENT_DONE,
  [OrderStatus.CANCELLED]: OrderTimeLine.ORDER_CANCELLED,
  [OrderStatus.COMPLETED]: OrderTimeLine.ORDER_COMPLETED,
} as const;
