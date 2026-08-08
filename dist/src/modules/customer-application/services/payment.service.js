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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const razorpay_1 = require("./payments/razorpay");
const enums_1 = require("../../../../core-db/enums");
let PaymentService = class PaymentService {
    constructor(paymentGateway) {
        this.paymentGateway = paymentGateway;
    }
    createOrder(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentGateway.createOrder(request);
        });
    }
    verifyPayment(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentGateway.verifyPayment(request);
        });
    }
    getPaymentDetails(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentGateway.getPaymentDetails(paymentId);
        });
    }
    refundPayment(paymentId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentGateway.refundPayment(paymentId, amount);
        });
    }
    extractPaymentData(razorpayResponse) {
        const paymentId = razorpayResponse.id;
        let paymentMethod = null;
        if (razorpayResponse.method === 'card') {
            paymentMethod = enums_1.PaymentMethodType.CARD;
        }
        else if (razorpayResponse.method === 'upi') {
            paymentMethod = enums_1.PaymentMethodType.UPI;
        }
        const notes = razorpayResponse.notes || {};
        const couponCode = notes.couponCode || null;
        const discount = notes.discount ? Number(notes.discount) : null;
        const internalOrderId = notes.internalOrderId || null;
        const originalAmount = notes.originalAmount || null;
        const amount = razorpayResponse.amount / 100;
        let status;
        if (razorpayResponse.status === 'captured' && razorpayResponse.captured === true) {
            status = enums_1.PaymentStatus.SUCCESS;
        }
        else if (razorpayResponse.status === 'failed') {
            status = enums_1.PaymentStatus.FAILED;
        }
        else if (razorpayResponse.status === 'refunded' || razorpayResponse.amount_refunded > 0) {
            status = enums_1.PaymentStatus.REFUNDED;
        }
        else {
            status = enums_1.PaymentStatus.FAILED;
        }
        const createdAt = new Date(razorpayResponse.created_at * 1000);
        return {
            paymentId,
            paymentMethod,
            couponCode,
            discount,
            internalOrderId,
            amount,
            status,
            createdAt,
            originalAmount
        };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [razorpay_1.RazorpayGateway])
], PaymentService);
//# sourceMappingURL=payment.service.js.map