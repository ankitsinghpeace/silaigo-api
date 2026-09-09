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
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { Request } from 'express';
import {
  CreateAdminOrderDto,
  CreateMaterialPickupDto,
  CreateOrderDto,
  GetAllOrdersDto,
  UpdateOrderStatusDto,
  UpdateProcessingStateDto,
  UpdatePickupDto,
} from '../dto/order.dto';
import {
  OrderStatus,
  OrderTimeLine,
  PaymentStatus,
  PermissionSubType,
  PermissionType,
} from 'core-db/enums';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { VerifyPaymentRequest } from '../services/payments/interfaces';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() orderDto: CreateOrderDto, @Req() req: Request) {
    return this.ordersService.createOrder(orderDto, req);
  }

  @Post('admin')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.CREATE}`]),
  )
  createAdminOrder(@Body() orderDto: CreateAdminOrderDto, @Req() req: Request) {
    return this.ordersService.createAdminOrder(orderDto, req);
  }

  @Post('duplicate')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.CREATE}`]),
  )
  duplicateOrder(@Body() orderDto: any, @Req() req: Request) {
    return this.ordersService.duplicateOrder(orderDto.id, req);
  }

  @Post('admin-cart')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.CREATE}`]),
  )
  checkoutCart(@Body() orderData: any, @Req() req: Request) {
    console.log('cakk');
    return this.ordersService.cart(orderData, req);
  }

  @Get('all')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.ORDER}.${PermissionSubType.VIEW}`,
      `${PermissionType.APPOINTMENTS}.${PermissionSubType.VIEW}`,
    ]),
  )
  getAllOrders(
    @Query(new ValidationPipe()) query: GetAllOrdersDto,
    @Req() req: Request,
  ) {
    return this.ordersService.getAllOrders(query, req);
  }

  @Get('pickup')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.VIEW}`]),
  )
  getPickupList() {
    console.log('called');
    return this.ordersService.getPickupList();
  }

  @Get('pickup/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.VIEW}`]),
  )
  getPickupById(@Param('id') id: string) {
    return this.ordersService.getPickupById(id);
  }

  @Get(':id')
  getOrderDetails(@Param('id') orderId: string, @Req() req: Request) {
    return this.ordersService.getOrderDetails(orderId, req);
  }

  @Get('next-order-id/:categoryId/:subCategoryName')
  getNextOrderId(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryName') subCategoryName: string,
  ) {
    return this.ordersService.getNextOrderId(categoryId, subCategoryName);
  }

  @Get()
  getOrderList(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ordersService.getOrderList(req, Number(page), Number(limit));
  }

  @Put(':id/status')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updateOrderStatus(
    @Param('id') orderId: string,
    @Body() body: UpdateOrderStatusDto,
    @Req() req: Request,
  ) {
    return this.ordersService.updateOrderStatus(
      orderId,
      body.status as OrderStatus,
      req,
    );
  }

  @Put(':id/timeline')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updateOrderTimeLIne(
    @Param('id') orderId: string,
    @Body() body: { status: OrderTimeLine },
    @Req() req: Request,
  ) {
    return this.ordersService.addTimelineEvent(
      orderId,
      body.status as OrderTimeLine,
      req,
    );
  }

  @Put(':id/measurements')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updateMeasurements(
    @Param('id') orderId: string,
    @Body() body: { details: Record<string, string> },
  ) {
    return this.ordersService.updateMeasurements(orderId, body.details);
  }

  @Put(':id/cancel')
  cancelOrder(@Param('id') orderId: string, @Req() req: any) {
    return this.ordersService.cancelOrder(orderId, req);
  }

  @Post('initiate-payment')
  createRazorpayOrder(
    @Body() body: { internalOrderId: string; couponCode: string },
    @Req() req: Request,
  ) {
    return this.ordersService.createRazorpayOrder(
      body.internalOrderId,
      body.couponCode,
      req,
    );
  }

  @Post('verify-payment')
  verifyPayment(@Body() body: VerifyPaymentRequest, @Req() req: Request) {
    return this.ordersService.verifyPayment(body, req);
  }

  @Put('update/remove')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  removeCustomizationAndOptions(@Body() body: any) {
    return this.ordersService.removeOrderCustomizationsAndOptions(body);
  }

  @Put('update/images/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updateOrderImages(@Param('id') id: string, @Body() dto: any) {
    return this.ordersService.updateOrderImages(id, dto);
  }

  @Put('update/add-customizations')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  addOrderCustomizations(@Body() body: any) {
    console.log(body);
    return this.ordersService.updateOrderCustomizationsAndOptions(body);
  }

  @Put('update/processing-state/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updateProcessingState(
    @Body() body: UpdateProcessingStateDto,
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.ordersService.updateOrderProcessingState(
      id,
      body,
      req,
    );
  }

  @Put('update/payment-status/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updatePaymentStatus(@Body() body: any, @Param('id') id: string) {
    return this.ordersService.updateOrderPaymentStatus(id, body.paymentStatus);
  }

  @Put('update/bulk')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updateBulkOrders(@Body() body: any, @Req() req: any) {
    return this.ordersService.updateBulkOrders(body, req);
  }

  @Put('update/pin/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updateRank(@Body() body: any, @Param('id') id: string, @Req() req: any) {
    return this.ordersService.pinOrder(id, body);
  }

  @Put('update/stitching-agent/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  assignStitchingAgent(
    @Body() body: any,
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.ordersService.assignStitchingAgent(id, body.agentId);
  }

  @Post('pickup/')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.CREATE}`]),
  )
  createPickup(@Body() data: CreateMaterialPickupDto) {
    return this.ordersService.createPickup(data);
  }

  @Patch('pickup/:id/details')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updatePickupDetails(@Param('id') id: string, @Body() body: UpdatePickupDto) {
    return this.ordersService.updatePickupDetails(id, body);
  }

  @Patch('pickup/:id/options')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.EDIT}`]),
  )
  updatePickupOptions(
    @Param('id') id: string,
    @Body() options: { label: string; value: boolean }[],
    @Req() req: any,
  ) {
    return this.ordersService.updatePickupOptions(id, options, req);
  }
}
