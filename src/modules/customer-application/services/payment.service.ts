import { Injectable, Inject } from '@nestjs/common';
import { IPaymentGateway, CreateOrderRequest, VerifyPaymentRequest, ExtractedPaymentData } from './payments/interfaces';
import { RazorpayGateway } from './payments/razorpay';
import { PaymentMethodType, PaymentStatus } from 'core-db/enums';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentGateway: RazorpayGateway
  ) {}

  async createOrder(request: CreateOrderRequest) {
    return await this.paymentGateway.createOrder(request);
  }

  async verifyPayment(request: VerifyPaymentRequest) {
    return await this.paymentGateway.verifyPayment(request);
  }

  async getPaymentDetails(paymentId: string) {
    return await this.paymentGateway.getPaymentDetails(paymentId);
  }

  async refundPayment(paymentId: string, amount?: number) {
    return await this.paymentGateway.refundPayment(paymentId, amount);
  }
  
  extractPaymentData(razorpayResponse: any): ExtractedPaymentData {
    const paymentId = razorpayResponse.id;

    let paymentMethod: PaymentMethodType | null = null;
    if (razorpayResponse.method === 'card') {
      paymentMethod = PaymentMethodType.CARD;
    } else if (razorpayResponse.method === 'upi') {
      paymentMethod = PaymentMethodType.UPI;
    }
  
    const notes = razorpayResponse.notes || {};
    const couponCode = notes.couponCode || null;
    const discount = notes.discount ? Number(notes.discount) : null;
    const internalOrderId = notes.internalOrderId || null;
    const originalAmount = notes.originalAmount || null
    const amount = razorpayResponse.amount / 100;

    let status: PaymentStatus;
    if (razorpayResponse.status === 'captured' && razorpayResponse.captured === true) {
      status = PaymentStatus.SUCCESS;
    } else if (razorpayResponse.status === 'failed') {
      status = PaymentStatus.FAILED;
    } else if (razorpayResponse.status === 'refunded' || razorpayResponse.amount_refunded > 0) {
      status = PaymentStatus.REFUNDED;
    } else {
      status = PaymentStatus.FAILED;
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
}