
import { Body, Controller, Delete, Get, Param, Post,Put,Req } from '@nestjs/common';
import { PaymentMethodsService } from '../services/payment-methods.service';

import { Request } from 'express';
@Controller('payment-methods')
export class PaymentMethodController {  
  constructor(private readonly paymentMethodService: PaymentMethodsService) {}

  @Get()
  getPaymentMethods(@Req() req: Request) {
      return this.paymentMethodService.getPaymentMethods(req);
  }

  @Delete(':id')
  removePaymentMethod(@Param('id') id: string) {
    return this.paymentMethodService.removePaymentMethod(id);
  }
}