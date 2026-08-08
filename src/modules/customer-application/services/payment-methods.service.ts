import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose';
import { IPaymentMethod } from 'core-db/interface';
import { ModelMetadata } from 'core-db/model.metadata';


@Injectable()
export class PaymentMethodsService {
  constructor(
    @Inject(ModelMetadata.PaymentMethod.token) private readonly paymentMethodModel: Model<IPaymentMethod>,
  ) {}

  async getPaymentMethods(req: any) {
    return await this.paymentMethodModel.find({ user: req.user._id });
  }

  async removePaymentMethod(id: string) {
    return await this.paymentMethodModel.findByIdAndDelete(id);
  }


}
