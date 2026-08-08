import { PaymentMethodType, PaymentStatus } from "core-db/enums";

export interface PaymentOrder {
    id: string;
    amount: number;
    currency: string;
    status: string;
    receipt?: string;
    created_at: number;
  }
  
  export interface PaymentVerification {
    isValid: boolean;
    paymentId?: string;
    orderId?: string;
  }
  
  export interface CreateOrderRequest {
    amount: number;
    currency?: string;
    receipt?: string;
    description?: string;
    notes?: {
      couponCode?: string;
      discount?: number;
      internalOrderId:string,
      originalAmount:number
    };
  }
  
  export interface VerifyPaymentRequest {
    orderId: string;
    paymentId: string;
    signature: string;
  }


export interface ExtractedPaymentData {
  paymentId: string;
  paymentMethod: PaymentMethodType | null;
  couponCode: string | null;
  discount: number | null;
  internalOrderId: string | null;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
  originalAmount:number | null
}
  
  export interface IPaymentGateway {
    createOrder(request: CreateOrderRequest): Promise<PaymentOrder>;
    verifyPayment(request: VerifyPaymentRequest): Promise<PaymentVerification>;
    getPaymentDetails(paymentId: string): Promise<any>;
    refundPayment(paymentId: string, amount?: number): Promise<any>;
  }