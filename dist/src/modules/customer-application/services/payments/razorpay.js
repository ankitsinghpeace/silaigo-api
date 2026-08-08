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
exports.RazorpayGateway = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Razorpay = require('razorpay');
let RazorpayGateway = class RazorpayGateway {
    constructor(configService) {
        this.configService = configService;
        this.razorpay = new Razorpay({
            key_id: this.configService.get('RAZORPAY_KEY_ID'),
            key_secret: this.configService.get('RAZORPAY_KEY_SECRET'),
        });
    }
    createOrder(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                amount: request.amount * 100,
                currency: request.currency || 'INR',
                receipt: request.receipt || `receipt_${Date.now()}`,
                notes: request.notes || []
            };
            try {
                const order = yield this.razorpay.orders.create(options);
                return {
                    id: order.id,
                    amount: Number(order.amount) / 100,
                    currency: order.currency,
                    status: order.status,
                    receipt: order.receipt,
                    created_at: order.created_at,
                };
            }
            catch (error) {
                throw new Error(`Razorpay order creation failed: ${error.message}`);
            }
        });
    }
    verifyPayment(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const crypto = require('crypto');
            const hmac = crypto.createHmac('sha256', this.configService.get('RAZORPAY_KEY_SECRET'));
            hmac.update(request.orderId + '|' + request.paymentId);
            const generated_signature = hmac.digest('hex');
            return {
                isValid: generated_signature === request.signature,
                paymentId: request.paymentId,
                orderId: request.orderId,
            };
        });
    }
    getPaymentDetails(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.razorpay.payments.fetch(paymentId);
            }
            catch (error) {
                throw new Error(`Failed to fetch payment details: ${error.message}`);
            }
        });
    }
    refundPayment(paymentId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refundData = {};
                if (amount) {
                    refundData.amount = amount * 100;
                }
                return yield this.razorpay.payments.refund(paymentId, refundData);
            }
            catch (error) {
                throw new Error(`Refund failed: ${error.message}`);
            }
        });
    }
};
exports.RazorpayGateway = RazorpayGateway;
exports.RazorpayGateway = RazorpayGateway = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RazorpayGateway);
//# sourceMappingURL=razorpay.js.map