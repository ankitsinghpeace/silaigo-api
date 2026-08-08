import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { IAddress, IProfile } from 'core-db/interface';
import { ModelMetadata } from 'core-db/model.metadata';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ModelMetadata.Address.token)
    private readonly addressModel: Model<IAddress>,
    @Inject(ModelMetadata.Profile.token)
    private readonly profileModel: Model<IProfile>,
  ) {}

  async createAddress(addressDto: AddressDto, req: any) {
    if (addressDto.isDefault) {
      const existingAddress = await this.addressModel.findOne({
        profile: req.user._id,
        isDefault: true,
      });
      if (existingAddress) {
        existingAddress.isDefault = false;
        await existingAddress.save();
      }
    }

    const address = new this.addressModel({
      ...addressDto,
      profile:
        req.user.role != 'customer'
          ? addressDto.impersonateUserId
          : req.user._id,
    });

    return address.save();
  }

  async findAll(req: any) {
    return await this.addressModel.find({ profile: req.user._id });
  }

  async removeAddress(id: string) {
    return await this.addressModel.findByIdAndDelete(id);
  }

  async updateAddress(id: string, addressDto: AddressDto, req: any) {
    if (addressDto.isDefault) {
      const existingAddress = await this.addressModel.findOne({
        profile: req.user._id,
        isDefault: true,
      });
      if (existingAddress) {
        existingAddress.isDefault = false;
        await existingAddress.save();
      }
    }
    return await this.addressModel.findByIdAndUpdate(id, addressDto);
  }

  async getAddressViaPhone(phone: string) {
    const customer = await this.profileModel.findOne({
      phone: phone,
    });

    if (!customer) {
      throw new NotFoundException('customer not exist');
    }

    const existingAddress = await this.addressModel
      .findOne({
        profile: customer._id,
      })
      .lean();

    if (existingAddress) {
      return {
        ...existingAddress,
        firstName: customer.firstName,
        lastName: customer.lastName,
      };
    }

    return null;
  }
}
