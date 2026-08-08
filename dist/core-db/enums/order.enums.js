"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusToTimelineMap = exports.TimelineToStatusMap = exports.OrderTimeLine = exports.RoleToProfileAttributesMap = exports.OrderProcessingStateToUserRole = exports.OrderProcessingStateTimeLineMap = exports.OrderProcessingState = exports.OrderStatus = void 0;
const roles_enums_1 = require("./roles.enums");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PAYMENT_PENDING"] = "PAYMENT PENDING";
    OrderStatus["PLACED"] = "PLACED";
    OrderStatus["PAYMENT_DONE"] = "PAYMENT DONE";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["COMPLETED"] = "COMPLETED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var OrderProcessingState;
(function (OrderProcessingState) {
    OrderProcessingState["ORDER_INITIATED"] = "ORDER_INITIATED";
    OrderProcessingState["ORDER_PLACED"] = "ORDER_PLACED";
    OrderProcessingState["MATERIAL_DELIVERED_TO_WORKSHOP"] = "MATERIAL_DELIVERED_TO_WORKSHOP";
    OrderProcessingState["ORDER_FULFILLED"] = "ORDER_FULFILLED";
    OrderProcessingState["CUTTING_END"] = "CUTTING_END";
    OrderProcessingState["STITCHING_END"] = "STITCHING_END";
    OrderProcessingState["PRODUCT_VERIFIED_OR_RECTIFIED"] = "PRODUCT_VERIFIED_OR_RECTIFIED";
    OrderProcessingState["MATERIAL_PACKED"] = "MATERIAL_PACKED";
    OrderProcessingState["READY_FOR_DISPATCH"] = "READY_FOR_DISPATCH";
    OrderProcessingState["ORDER_COMPLETE"] = "ORDER_COMPLETE";
})(OrderProcessingState || (exports.OrderProcessingState = OrderProcessingState = {}));
exports.OrderProcessingStateTimeLineMap = {
    'Order fulfilled': OrderProcessingState.ORDER_FULFILLED,
    'Cutting End': OrderProcessingState.CUTTING_END,
    'Stitching End': OrderProcessingState.STITCHING_END,
};
exports.OrderProcessingStateToUserRole = {
    [roles_enums_1.RoleCode.PICKUP_COORDINATOR]: [OrderProcessingState.ORDER_PLACED],
    [roles_enums_1.RoleCode.CUTTING]: [OrderProcessingState.ORDER_FULFILLED],
    [roles_enums_1.RoleCode.STITCHING]: [OrderProcessingState.CUTTING_END],
};
exports.RoleToProfileAttributesMap = {
    [roles_enums_1.RoleCode.ADMIN]: 'firstName lastName phone email',
    [roles_enums_1.RoleCode.PICKUP_COORDINATOR]: 'firstName lastName phone email',
    [roles_enums_1.RoleCode.CUTTING]: 'firstName lastName email',
    [roles_enums_1.RoleCode.STITCHING]: 'firstName lastName email',
};
var OrderTimeLine;
(function (OrderTimeLine) {
    OrderTimeLine["ORDER_CREATED"] = "ORDER CREATED";
    OrderTimeLine["APPOINTMENT_BOOKED"] = "APPOINTMENT BOOKED";
    OrderTimeLine["PICKUP_PERSON_ASSIGNED"] = "PICKUP PERSON ASSIGNED";
    OrderTimeLine["OUT_FOR_PICKUP"] = "OUT FOR PICKUP";
    OrderTimeLine["PICKUP_COMPLETED"] = "PICKUP COMPLETED";
    OrderTimeLine["RETURNED_TO_FACILITY"] = "RETURNED TO FACILITY";
    OrderTimeLine["PAYMENT_DONE"] = "PAYMENT COMPLETED";
    OrderTimeLine["ORDER_CANCELLED"] = "ORDER CANCELLED";
    OrderTimeLine["ORDER_COMPLETED"] = "ORDER COMPLETED";
})(OrderTimeLine || (exports.OrderTimeLine = OrderTimeLine = {}));
exports.TimelineToStatusMap = {
    [OrderTimeLine.PAYMENT_DONE]: OrderStatus.PAYMENT_DONE,
    [OrderTimeLine.ORDER_CANCELLED]: OrderStatus.CANCELLED,
    [OrderTimeLine.ORDER_COMPLETED]: OrderStatus.COMPLETED,
};
exports.OrderStatusToTimelineMap = {
    [OrderStatus.PAYMENT_DONE]: OrderTimeLine.PAYMENT_DONE,
    [OrderStatus.CANCELLED]: OrderTimeLine.ORDER_CANCELLED,
    [OrderStatus.COMPLETED]: OrderTimeLine.ORDER_COMPLETED,
};
//# sourceMappingURL=order.enums.js.map