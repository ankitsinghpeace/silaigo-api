import { CreateOrderRequest, VerifyPaymentRequest, ExtractedPaymentData } from './payments/interfaces';
import { RazorpayGateway } from './payments/razorpay';
export declare class PaymentService {
    private readonly paymentGateway;
    constructor(paymentGateway: RazorpayGateway);
    createOrder(request: CreateOrderRequest): Promise<import("./payments/interfaces").PaymentOrder>;
    verifyPayment(request: VerifyPaymentRequest): Promise<import("./payments/interfaces").PaymentVerification>;
    getPaymentDetails(paymentId: string): Promise<any>;
    refundPayment(paymentId: string, amount?: number): Promise<any>;
    extractPaymentData(razorpayResponse: any): ExtractedPaymentData;
}
