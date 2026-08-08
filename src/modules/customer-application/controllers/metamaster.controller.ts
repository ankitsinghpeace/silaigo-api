import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MetaMasterService } from '../services/metamaster.service';
import { GetMetaMasterListDto, MetaMasterDto } from '../dto/meta.master.dto';
import { PermissionSubType, PermissionType } from 'core-db/enums';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';

@Controller('meta-master')
export class MetaMasterController {
  constructor(private readonly metaService: MetaMasterService) {}

  @Get()
  getAll() {
    return this.metaService.findAll();
  }

  @Get('types')
  async getDistinctTypes() {
    return await this.metaService.findDistinctTypes();
  }

  @Get('types/:type')
  async getMetaDataType(@Param('type') type: string) {
    return await this.metaService.findMetaType(type);
  }

  @Get('all')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.VIEW}`]),
  )
  async getMetaMasterList(@Query() query: GetMetaMasterListDto) {
    return this.metaService.getMetaMasterList(query);
  }

  @Get('coupons/eligible')
  async getEligibleCoupons() {
    return this.metaService.listEligibleCoupons();
  }

  @Post('coupons')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.CREATE}`]),
  )
  async addMetaMaster(@Body() dto: MetaMasterDto) {
    return this.metaService.addCoupon(dto);
  }

  @Put('coupons/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.EDIT}`]),
  )
  async updateMetaMaster(@Param('id') id: string, @Body() dto: MetaMasterDto) {
    return this.metaService.updateCoupon(id, dto);
  }

  @Delete('coupons/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.DELETE}`]),
  )
  async deleteMetaMaster(@Param('id') id: string) {
    return this.metaService.deleteCoupon(id);
  }

  @Post('coupons/validate')
  async validateCoupon(
    @Body(new ValidationPipe()) dto: { couponCode: string; amount: number },
    @Req() req: Request,
  ) {
    return this.metaService.validateCoupon(dto, req);
  }
}
