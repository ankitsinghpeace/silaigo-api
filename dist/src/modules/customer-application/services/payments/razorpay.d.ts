import { ConfigService } from '@nestjs/config';
import { IPaymentGateway, PaymentOrder, CreateOrderRequest, VerifyPaymentRequest, PaymentVerification } from './interfaces';
export declare class RazorpayGateway implements IPaymentGateway {
    private configService;
    private razorpay;
    constructor(configService: ConfigService);
    createOrder(request: CreateOrderRequest): Promise<PaymentOrder>;
    verifyPayment(request: VerifyPaymentRequest): Promise<PaymentVerification>;
    getPaymentDetails(paymentId: string): Promise<any>;
    refundPayment(paymentId: string, amount?: number): Promise<any>;
}
