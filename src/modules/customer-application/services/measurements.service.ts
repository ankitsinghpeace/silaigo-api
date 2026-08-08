import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import {
  IAddress,
  IMeasurementCategory,
  IMeasurementField,
  IOrder,
  IProfile,
} from 'core-db/interface';
import { ModelMetadata } from 'core-db/model.metadata';
import { AddressDto } from '../dto/address.dto';
import {
  MeasurementCategoryDto,
  MeasurementFieldDto,
} from '../dto/measurement.dto';

@Injectable()
export class MeasurementsService {
  constructor(
    @Inject(ModelMetadata.MeasurementCategory.token)
    private readonly measurementModel: Model<IMeasurementCategory>,

    @Inject(ModelMetadata.MeasurementField.token)
    private readonly measurementFieldModel: Model<IMeasurementField>,

    @Inject(ModelMetadata.Order.token)
    private readonly orderModel: Model<IOrder>,
    @Inject(ModelMetadata.Profile.token)
    private readonly profileModel: Model<IProfile>,
  ) {}

  async createCategory(data: MeasurementCategoryDto) {
    return this.measurementModel.create(data);
  }

  async addMeasureMentField(data: MeasurementFieldDto) {
    return this.measurementFieldModel.create(data);
  }

  async deleteCategory(name: string) {
    return this.measurementModel.deleteOne({ name: name });
  }

  async updateCategory(data: MeasurementCategoryDto) {
    const updated = await this.measurementModel.findOneAndUpdate(
      { name: data.name },
      { $set: { fields: data.fields } },
      { returnDocument: 'after' }, // replaces { new: true }
    );

    return updated;
  }

  async listCategories() {
    return this.measurementModel.find({});
  }

  async listMeasurementsFields() {
    return this.measurementFieldModel.find({});
  }

  async deleteMeasurementField(id: string) {
    return this.measurementFieldModel.deleteOne({ id: id.trim() });
  }

  async getUserMeasurements(phone: string) {
    const user = await this.profileModel.findOne({ phone: phone.trim() });

    if (!user) {
      return { bodyMeasurement: null };
    }

    const order = await this.orderModel
      .findOne({ profile: user._id })
      .sort({ createdAt: -1 });

    if (order && (order.measurements as any).bodyMeasurement) {
      return { bodyMeasurement: (order.measurements as any).bodyMeasurement };
    }

    return { bodyMeasurement: null };
  }
}
