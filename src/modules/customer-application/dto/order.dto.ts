import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsMongoId,
  IsNumber,
  IsIn,
  Min,
  Max,
  IsEnum,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, OrderProcessingState } from 'core-db/enums';

export class OrderItemDto {
  @ApiProperty({
    description: 'The ID of the subcategory',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  subCategory: string;

  @ApiProperty({
    description: 'Array of customization IDs',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  customizations?: string[];

  @ApiProperty({
    description: 'Additional notes for the order item',
    example: 'Extra spicy, no onions',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Array of order items',
    type: [OrderItemDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({
    description: 'image url',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];
}
export class CreateAdminOrderDto {
  @ApiProperty({
    description: 'Array of order items',
    type: [OrderItemDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({
    description: 'image url',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @ApiProperty({
    description: 'phone number',
    example: '+1234567890',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'phone number',
    example: '+1234567890',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'custom price',
    example: 'Rs ...',
  })
  @IsOptional()
  @IsNumber()
  customPrice: number;

  @IsOptional()
  measurements?: Record<string, any>;

  @ApiProperty({
    description: 'scheduled pickup date',
    example: '2025-01-26',
  })
  @IsOptional()
  @IsDate()
  scheduledPickupDate: Date;

  @ApiProperty({
    description: 'scheduled pickup time',
    example: '13:00',
  })
  @IsOptional()
  @IsString()
  scheduledPickupTime: Date;
}

export class UpdateOrderDto {
  @ApiProperty({
    description: 'The ID of the order',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  _id: string;

  @ApiProperty({
    description: 'Status of the order',
    example: 'PENDING',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'The ID of the payment',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  payment?: string;

  @ApiProperty({
    description: 'The ID of the appointment',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  appointment?: string;
}

export class GetAllOrdersDto {
  @ApiProperty({
    description: 'The ID of the order',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsString()
  @IsOptional()
  orderId: string;

  @ApiProperty({
    description: 'customer phone',
    example: '9999999999',
    required: false,
  })
  @IsString()
  @IsOptional()
  customerPhone: string;

  @ApiProperty({
    description: 'customer name',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  customerName: string;

  @ApiProperty({
    description: 'order status',
    example: 'PENDING',
    required: false,
  })
  @IsString()
  @IsOptional()
  orderStatus?: string;

  @ApiProperty({
    description: 'order date',
    example: '2021-01-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  orderDate?: string;

  @ApiProperty({
    description: 'sort by',
    example: 'newest',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsIn(['newest', 'oldest'])
  sortBy?: 'newest' | 'oldest' = 'newest';

  @ApiProperty({
    description: 'start date',
    example: '2021-01-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'end date',
    example: '2021-01-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'page',
    example: 1,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  page?: number;

  @ApiProperty({
    description: 'limit',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  limit?: number = 50;

  @ApiProperty({
    description: 'appointment date',
    example: '2021-01-01',
    required: false,
  })
  @IsOptional()
  appointmentDate?: string;

  @ApiProperty({
    description: 'coupon code',
    example: 'WELCOME50',
    required: false,
  })
  @IsString()
  @IsOptional()
  couponCode?: string;

  @ApiProperty({
    description: 'product name',
    example: 'Kurti',
    required: false,
  })
  @IsString()
  @IsOptional()
  productName?: string;

  @ApiProperty({
    description: 'whteher show all order or restrict via role',
    example: '1|0',
    required: false,
  })
  @IsString()
  @IsOptional()
  all_orders?: string;

  @ApiProperty({
    description: 'whether sort by delievery date or not',
    example: '1|0',
    required: false,
  })
  @IsString()
  @IsOptional()
  sortByDeliveryDate?: string; // AppointmentDate
  @ApiProperty({
    description: 'customer id',
    example: '1234567890...',
    required: false,
  })
  @IsString()
  @IsOptional()
  customerId?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Status of the order',
    example: 'PENDING',
    enum: Object.values(OrderStatus),
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class CreateMaterialPickupDto {
  @IsOptional()
  @IsString()
  addressLine1?: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsString()
  pickupFor?: string;

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  scheduledPickupDate: string;

  @IsString()
  scheduledPickupTime: string;
}

export class UpdatePickupDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  addressLine1?: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsString()
  pickupFor?: string;

  @IsOptional()
  @IsString()
  scheduledPickupDate?: string;

  @IsOptional()
  @IsString()
  scheduledPickupTime?: string;
}

export class UpdateOrderImagesDto {
  add?: string[];
  remove?: string[];
}

export class UpdateProcessingStateDto {
  @ApiProperty({
    description: 'Next processing state of the order',
    example: 'RETURNED',
  })
  @IsString()
  @IsNotEmpty()
  nextState: OrderProcessingState;

  @ApiProperty({
    description: 'Alteration notes or instructions',
    example: 'Customer requested shortening sleeves by 1 inch and fixing collar line',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Alteration notes or instructions',
    example: 'Customer requested shortening sleeves by 1 inch and fixing collar line',
    required: false,
  })
  @IsOptional()
  @IsString()
  alterationNotes?: string;

  @ApiProperty({
    description: 'Array of photo URLs uploaded for alteration',
    example: [
      'https://silaigo-resources-dev.s3.ap-south-1.amazonaws.com/uploads/photo1.jpg',
      'https://silaigo-resources-dev.s3.ap-south-1.amazonaws.com/uploads/photo2.jpg',
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  alterationPhotos?: string[];
}
