import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Razorpay = require('razorpay');

import { 
  IPaymentGateway, 
  PaymentOrder, 
  CreateOrderRequest, 
  VerifyPaymentRequest, 
  PaymentVerification 
} from './interfaces';

@Injectable()
export class RazorpayGateway implements IPaymentGateway {
  private razorpay: typeof Razorpay;

  constructor(private configService: ConfigService) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get<string>('RAZORPAY_KEY_ID'),
      key_secret: this.configService.get<string>('RAZORPAY_KEY_SECRET'),
    });
  }

  async createOrder(request: CreateOrderRequest): Promise<PaymentOrder> {
    const options = {
      amount: request.amount * 100, // Convert to paise
      currency: request.currency || 'INR',
      receipt: request.receipt || `receipt_${Date.now()}`,
      notes : request.notes || []
    };

    try {
      const order = await this.razorpay.orders.create(options);
      return {
        id: order.id,
        amount: Number(order.amount) / 100,
        currency: order.currency,
        status: order.status,
        receipt: order.receipt,
        created_at: order.created_at,
      };
    } catch (error) {
      throw new Error(`Razorpay order creation failed: ${error.message}`);
    }
  }

  async verifyPayment(request: VerifyPaymentRequest): Promise<PaymentVerification> {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', this.configService.get<string>('RAZORPAY_KEY_SECRET'));
    
    hmac.update(request.orderId + '|' + request.paymentId);
    const generated_signature = hmac.digest('hex');
    
    return {
      isValid: generated_signature === request.signature,
      paymentId: request.paymentId,
      orderId: request.orderId,
    };
  }

  async getPaymentDetails(paymentId: string): Promise<any> {
    try {
      return await this.razorpay.payments.fetch(paymentId);
    } catch (error) {
      throw new Error(`Failed to fetch payment details: ${error.message}`);
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<any> {
    try {
      const refundData: any = {};
      if (amount) {
        refundData.amount = amount * 100; // Convert to paise
      }
      return await this.razorpay.payments.refund(paymentId, refundData);
    } catch (error) {
      throw new Error(`Refund failed: ${error.message}`);
    }
  }
}