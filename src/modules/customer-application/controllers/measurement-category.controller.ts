import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  MeasurementCategoryDto,
  MeasurementFieldDto,
} from '../dto/measurement.dto';
import { MeasurementsService } from '../services/measurements.service';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { PermissionSubType, PermissionType } from 'core-db/enums';

@Controller('measurement-category')
export class MeasurementsCategoryController {
  constructor(
    private readonly measurementCategoryService: MeasurementsService,
  ) {}

  @Get()
  listCategories() {
    return this.measurementCategoryService.listCategories();
  }

  @Post()
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.CREATE}`]),
  )
  createCategory(@Body() data: MeasurementCategoryDto) {
    return this.measurementCategoryService.createCategory(data);
  }

  @Patch()
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.EDIT}`]),
  )
  updateCategoty(@Body() data: MeasurementCategoryDto) {
    return this.measurementCategoryService.updateCategory(data);
  }

  @Delete(':name')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.DELETE}`]),
  )
  removeCategory(@Param('name') name: string) {
    return this.measurementCategoryService.deleteCategory(name);
  }

  @Get('fields')
  listMeasurementsFields() {
    return this.measurementCategoryService.listMeasurementsFields();
  }

  @Get('user/:phone')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.VIEW}`]),
  )
  getUserMeasurements(@Param('phone') phone: string) {
    return this.measurementCategoryService.getUserMeasurements(phone);
  }

  @Post('fields')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.CREATE}`]),
  )
  createMeasurementFiled(@Body() data: MeasurementFieldDto) {
    return this.measurementCategoryService.addMeasureMentField(data);
  }

  @Delete('fields/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.DELETE}`]),
  )
  deleteMeasurementField(@Param('id') id: string) {
    return this.measurementCategoryService.deleteMeasurementField(id);
  }
}
