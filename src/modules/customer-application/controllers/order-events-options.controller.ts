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
} from '@nestjs/common';
import { BlogsService } from '../services/blogs.service';
import { CreateBlogDto, BlogQueryDto, BlogReactionDto } from '../dto/blog.dto';
import {
  PermissionSubType,
  PermissionType,
} from 'core-db/enums/permissions.enums';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { OrderEventsOptionsService } from '../services/order-events-options.service';

@Controller('events-options')
export class OrderEventsOptionsController {
  constructor(
    private readonly ordersEventsService: OrderEventsOptionsService,
  ) { }

  @Get('/')
  async getOptions(@Req() req: any, @Query('orderId') orderId: string) {
    return this.ordersEventsService.getEventsOptions(req, orderId);
  }

  @Post('')
  async addEventInTimeLine(@Req() req: any, @Body() body: any) {
    return this.ordersEventsService.addMicroEventInTimeLine(req, body);
  }

  @Get('/timeline/:orderId')
  async getTimeLine(@Param('orderId') orderId: string, @Req() req) {
    return this.ordersEventsService.getTimeLine(orderId, req);
  }

  @Get('/analytics/:userId')
  async getUserAnalytics(
    @Param('userId') userId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.ordersEventsService.getUserAnalytics(
      userId,
      startDate,
      endDate
    );
  }
}

