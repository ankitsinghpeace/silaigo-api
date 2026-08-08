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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEventsOptionsController = void 0;
const common_1 = require("@nestjs/common");
const order_events_options_service_1 = require("../services/order-events-options.service");
let OrderEventsOptionsController = class OrderEventsOptionsController {
    constructor(ordersEventsService) {
        this.ordersEventsService = ordersEventsService;
    }
    getOptions(req, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ordersEventsService.getEventsOptions(req, orderId);
        });
    }
    addEventInTimeLine(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ordersEventsService.addMicroEventInTimeLine(req, body);
        });
    }
    getTimeLine(orderId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ordersEventsService.getTimeLine(orderId, req);
        });
    }
    getUserAnalytics(userId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ordersEventsService.getUserAnalytics(userId, startDate, endDate);
        });
    }
};
exports.OrderEventsOptionsController = OrderEventsOptionsController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderEventsOptionsController.prototype, "getOptions", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderEventsOptionsController.prototype, "addEventInTimeLine", null);
__decorate([
    (0, common_1.Get)('/timeline/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderEventsOptionsController.prototype, "getTimeLine", null);
__decorate([
    (0, common_1.Get)('/analytics/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OrderEventsOptionsController.prototype, "getUserAnalytics", null);
exports.OrderEventsOptionsController = OrderEventsOptionsController = __decorate([
    (0, common_1.Controller)('events-options'),
    __metadata("design:paramtypes", [order_events_options_service_1.OrderEventsOptionsService])
], OrderEventsOptionsController);
//# sourceMappingURL=order-events-options.controller.js.map