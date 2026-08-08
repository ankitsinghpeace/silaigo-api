import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Req,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from '../services/appointments.service';
import {
  CreateAvailabilityOverrideDto,
  UpdateScheduleDto,
} from '../dto/appointments.dto';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { PermissionSubType, PermissionType } from 'core-db/enums';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('slots')
  async getAvailableSlots(@Query('date') date: string) {
    return this.appointmentsService.getAvailableSlots(date);
  }

  @Post('book')
  async bookSlot(
    @Body()
    body: {
      dateStr: string;
      time: string;
      orderId: string;
      notes?: string;
      addressId?: string;
      impersonateUserId?: string;
    },
    @Req() req: Request,
  ) {
    return this.appointmentsService.bookSlot(
      body.dateStr,
      body.time,
      body.orderId,
      req,
      body.notes,
      body.addressId,
      body.impersonateUserId,
    );
  }

  @Get('schedule')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.APPOINTMENTS}.${PermissionSubType.VIEW}`,
    ]),
  )
  async getGlobalSchedule() {
    return this.appointmentsService.getGlobalSchedule();
  }

  @Put('schedule/:scheduleId')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.APPOINTMENTS}.${PermissionSubType.EDIT}`,
    ]),
  )
  async updateSchedule(
    @Param('scheduleId') scheduleId: string,
    @Body() body: UpdateScheduleDto,
  ) {
    return this.appointmentsService.updateSchedule(scheduleId, body);
  }

  @Post('availability-overrides')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.APPOINTMENTS}.${PermissionSubType.CREATE}`,
    ]),
  )
  async addAvailabilityOverride(
    @Body() body: CreateAvailabilityOverrideDto,
    @Query('clearPrevious') clearPrevious: boolean = false,
  ) {
    return this.appointmentsService.addAvailabilityOverride(
      body,
      Boolean(clearPrevious),
    );
  }

  @Get('availability-overrides')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.APPOINTMENTS}.${PermissionSubType.VIEW}`,
    ]),
  )
  async getAllAvailabilityOverrides() {
    return this.appointmentsService.getAllAvailabilityOverrides();
  }

  @Put('availability-overrides/:id')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.APPOINTMENTS}.${PermissionSubType.EDIT}`,
    ]),
  )
  async updateAvailabilityOverride(
    @Param('id') id: string,
    @Body() body: CreateAvailabilityOverrideDto,
  ) {
    return this.appointmentsService.updateAvailabilityOverride(id, body);
  }

  @Delete('availability-overrides/:id')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.APPOINTMENTS}.${PermissionSubType.DELETE}`,
    ]),
  )
  async deleteAvailabilityOverride(@Param('id') id: string) {
    return this.appointmentsService.deleteAvailabilityOverride(id);
  }
}
