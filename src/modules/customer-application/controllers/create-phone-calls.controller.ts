import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePhoneCallService } from '../services/phone-calls-scheduler.service';
import {
  CreatePhoneCallSchedulerDto,
  GetPhoneCallSchedulerDto,
} from '../dto/phone-call.dto';

@Controller('phone-call-schedule')
export class CreatePhoneCallsController {
  constructor(
    private readonly createPhoneCallService: CreatePhoneCallService,
  ) {}

  @Get('')
  async getPhoneCallsList(@Query() query: GetPhoneCallSchedulerDto) {
    return this.createPhoneCallService.getAllCallsList(query);
  }

  @Post('')
  async createPhoneCall(
    @Body(new ValidationPipe()) dto: CreatePhoneCallSchedulerDto,
    @Req() req: any,
  ) {
    return this.createPhoneCallService.createPhoneCallAppointment(dto, req);
  }

  @Put(':id')
  async updateCall(@Param('id') callId: string, @Body() data) {
    return this.createPhoneCallService.updateCall(callId, data.call);
  }
}
