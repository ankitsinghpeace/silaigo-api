"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("../services/orders.service");
const order_dto_1 = require("../dto/order.dto");
const enums_1 = require("../../../../core-db/enums");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    createOrder(orderDto, req) {
        return this.ordersService.createOrder(orderDto, req);
    }
    createAdminOrder(orderDto, req) {
        return this.ordersService.createAdminOrder(orderDto, req);
    }
    duplicateOrder(orderDto, req) {
        return this.ordersService.duplicateOrder(orderDto.id, req);
    }
    checkoutCart(orderData, req) {
        console.log('cakk');
        return this.ordersService.cart(orderData, req);
    }
    getAllOrders(query, req) {
        return this.ordersService.getAllOrders(query, req);
    }
    getPickupList() {
        console.log('called');
        return this.ordersService.getPickupList();
    }
    getPickupById(id) {
        return this.ordersService.getPickupById(id);
    }
    getOrderDetails(orderId, req) {
        return this.ordersService.getOrderDetails(orderId, req);
    }
    getNextOrderId(categoryId, subCategoryName) {
        return this.ordersService.getNextOrderId(categoryId, subCategoryName);
    }
    getOrderList(req, page = 1, limit = 10) {
        return this.ordersService.getOrderList(req, Number(page), Number(limit));
    }
    updateOrderStatus(orderId, body, req) {
        return this.ordersService.updateOrderStatus(orderId, body.status, req);
    }
    updateOrderTimeLIne(orderId, body, req) {
        return this.ordersService.addTimelineEvent(orderId, body.status, req);
    }
    updateMeasurements(orderId, body) {
        return this.ordersService.updateMeasurements(orderId, body.details);
    }
    cancelOrder(orderId, req) {
        return this.ordersService.cancelOrder(orderId, req);
    }
    createRazorpayOrder(body, req) {
        return this.ordersService.createRazorpayOrder(body.internalOrderId, body.couponCode, req);
    }
    verifyPayment(body, req) {
        return this.ordersService.verifyPayment(body, req);
    }
    removeCustomizationAndOptions(body) {
        return this.ordersService.removeOrderCustomizationsAndOptions(body);
    }
    updateOrderImages(id, dto) {
        return this.ordersService.updateOrderImages(id, dto);
    }
    addOrderCustomizations(body) {
        console.log(body);
        return this.ordersService.updateOrderCustomizationsAndOptions(body);
    }
    updateProcessingState(body, id, req) {
        return this.ordersService.updateOrderProcessingState(id, body.nextState, req);
    }
    updatePaymentStatus(body, id) {
        return this.ordersService.updateOrderPaymentStatus(id, body.paymentStatus);
    }
    updateBulkOrders(body, req) {
        return this.ordersService.updateBulkOrders(body, req);
    }
    updateRank(body, id, req) {
        return this.ordersService.pinOrder(id, body);
    }
    assignStitchingAgent(body, id, req) {
        return this.ordersService.assignStitchingAgent(id, body.agentId);
    }
    createPickup(data) {
        return this.ordersService.createPickup(data);
    }
    updatePickupDetails(id, body) {
        return this.ordersService.updatePickupDetails(id, body);
    }
    updatePickupOptions(id, options, req) {
        return this.ordersService.updatePickupOptions(id, options, req);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('admin'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateAdminOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createAdminOrder", null);
__decorate([
    (0, common_1.Post)('duplicate'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "duplicateOrder", null);
__decorate([
    (0, common_1.Post)('admin-cart'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "checkoutCart", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.VIEW}`,
        `${enums_1.PermissionType.APPOINTMENTS}.${enums_1.PermissionSubType.VIEW}`,
    ])),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.GetAllOrdersDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Get)('pickup'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.VIEW}`])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getPickupList", null);
__decorate([
    (0, common_1.Get)('pickup/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.VIEW}`])),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getPickupById", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrderDetails", null);
__decorate([
    (0, common_1.Get)('next-order-id/:categoryId/:subCategoryName'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Param)('subCategoryName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getNextOrderId", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrderList", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.UpdateOrderStatusDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Put)(':id/timeline'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateOrderTimeLIne", null);
__decorate([
    (0, common_1.Put)(':id/measurements'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateMeasurements", null);
__decorate([
    (0, common_1.Put)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Post)('initiate-payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createRazorpayOrder", null);
__decorate([
    (0, common_1.Post)('verify-payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "verifyPayment", null);
__decorate([
    (0, common_1.Put)('update/remove'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "removeCustomizationAndOptions", null);
__decorate([
    (0, common_1.Put)('update/images/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateOrderImages", null);
__decorate([
    (0, common_1.Put)('update/add-customizations'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "addOrderCustomizations", null);
__decorate([
    (0, common_1.Put)('update/processing-state/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateProcessingState", null);
__decorate([
    (0, common_1.Put)('update/payment-status/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updatePaymentStatus", null);
__decorate([
    (0, common_1.Put)('update/bulk'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateBulkOrders", null);
__decorate([
    (0, common_1.Put)('update/pin/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateRank", null);
__decorate([
    (0, common_1.Put)('update/stitching-agent/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "assignStitchingAgent", null);
__decorate([
    (0, common_1.Post)('pickup/'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateMaterialPickupDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createPickup", null);
__decorate([
    (0, common_1.Patch)('pickup/:id/details'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.UpdatePickupDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updatePickupDetails", null);
__decorate([
    (0, common_1.Patch)('pickup/:id/options'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updatePickupOptions", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map