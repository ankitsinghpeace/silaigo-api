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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderImagesDto = exports.UpdatePickupDto = exports.CreateMaterialPickupDto = exports.UpdateOrderStatusDto = exports.GetAllOrdersDto = exports.UpdateOrderDto = exports.CreateAdminOrderDto = exports.CreateOrderDto = exports.OrderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const order_enums_1 = require("../../../../core-db/enums/order.enums");
class OrderItemDto {
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the subcategory',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of customization IDs',
        example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], OrderItemDto.prototype, "customizations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes for the order item',
        example: 'Extra spicy, no onions',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "notes", void 0);
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of order items',
        type: [OrderItemDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'image url',
        example: 'https://example.com/image.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "imageUrls", void 0);
class CreateAdminOrderDto {
}
exports.CreateAdminOrderDto = CreateAdminOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of order items',
        type: [OrderItemDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], CreateAdminOrderDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'image url',
        example: 'https://example.com/image.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateAdminOrderDto.prototype, "imageUrls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminOrderDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminOrderDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'custom price',
        example: 'Rs ...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAdminOrderDto.prototype, "customPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAdminOrderDto.prototype, "measurements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'scheduled pickup date',
        example: '2025-01-26',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateAdminOrderDto.prototype, "scheduledPickupDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'scheduled pickup time',
        example: '13:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], CreateAdminOrderDto.prototype, "scheduledPickupTime", void 0);
class UpdateOrderDto {
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the order',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the order',
        example: 'PENDING',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the payment',
        example: '507f1f77bcf86cd799439011',
        required: false,
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "payment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the appointment',
        example: '507f1f77bcf86cd799439011',
        required: false,
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "appointment", void 0);
class GetAllOrdersDto {
    constructor() {
        this.sortBy = 'newest';
        this.limit = 50;
    }
}
exports.GetAllOrdersDto = GetAllOrdersDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the order',
        example: '507f1f77bcf86cd799439011',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'customer phone',
        example: '9999999999',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "customerPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'customer name',
        example: 'John Doe',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'order status',
        example: 'PENDING',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "orderStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'order date',
        example: '2021-01-01',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "orderDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'sort by',
        example: 'newest',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['newest', 'oldest']),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'start date',
        example: '2021-01-01',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'end date',
        example: '2021-01-01',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'page',
        example: 1,
        required: false,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetAllOrdersDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'limit',
        example: 10,
        required: false,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], GetAllOrdersDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'appointment date',
        example: '2021-01-01',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "appointmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'coupon code',
        example: 'WELCOME50',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "couponCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'product name',
        example: 'Kurti',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'whteher show all order or restrict via role',
        example: '1|0',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "all_orders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'whether sort by delievery date or not',
        example: '1|0',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "sortByDeliveryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'customer id',
        example: '1234567890...',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllOrdersDto.prototype, "customerId", void 0);
class UpdateOrderStatusDto {
}
exports.UpdateOrderStatusDto = UpdateOrderStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the order',
        example: 'PENDING',
        enum: Object.values(order_enums_1.OrderStatus),
    }),
    (0, class_validator_1.IsEnum)(order_enums_1.OrderStatus),
    __metadata("design:type", String)
], UpdateOrderStatusDto.prototype, "status", void 0);
class CreateMaterialPickupDto {
}
exports.CreateMaterialPickupDto = CreateMaterialPickupDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "addressLine1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "addressLine2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "pincode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "pickupFor", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "scheduledPickupDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMaterialPickupDto.prototype, "scheduledPickupTime", void 0);
class UpdatePickupDto {
}
exports.UpdatePickupDto = UpdatePickupDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "addressLine1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "addressLine2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "pincode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "pickupFor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "scheduledPickupDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePickupDto.prototype, "scheduledPickupTime", void 0);
class UpdateOrderImagesDto {
}
exports.UpdateOrderImagesDto = UpdateOrderImagesDto;
//# sourceMappingURL=order.dto.js.map