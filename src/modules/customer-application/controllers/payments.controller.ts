
import { Controller, Get } from '@nestjs/common';
import { PaymentService } from '../services/payment.service'; 

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

}