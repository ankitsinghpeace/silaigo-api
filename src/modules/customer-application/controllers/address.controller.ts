import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { AddressDto } from '../dto/address.dto';
import { Request } from 'express';
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  createAddress(@Body() addressDto: AddressDto, @Req() req: Request) {
    return this.addressService.createAddress(addressDto, req);
  }

  @Get()
  getAll(@Req() req: Request) {
    return this.addressService.findAll(req);
  }

  @Delete(':id')
  removeAddress(@Param('id') id: string) {
    return this.addressService.removeAddress(id);
  }

  @Put(':id')
  updateAddress(
    @Param('id') id: string,
    @Body() addressDto: AddressDto,
    @Req() req: Request,
  ) {
    return this.addressService.updateAddress(id, addressDto, req);
  }

  @Get('phone/:phone')
  getAddressViaPhone(@Param('phone') phone: string) {
    return this.addressService.getAddressViaPhone(phone);
  }
}
