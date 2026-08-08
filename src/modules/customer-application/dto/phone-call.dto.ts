import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsIn,
  IsInt,
  Min,
} from 'class-validator';
import {
  OrderInitiationStatus,
  PhoneCallStatus,
} from 'core-db/enums/phoneCall.scheduler.status';

export class CreatePhoneCallSchedulerDto {
  @IsOptional()
  @IsString()
  notes: string;

  @IsNumber()
  category: number;

  @IsDateString()
  @IsNotEmpty()
  appointmentDate: string;
}

export class GetPhoneCallSchedulerDto {
  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @IsOptional()
  @IsIn(['newest', 'oldest'])
  sortBy: 'newest' | 'oldest' = 'newest';

  @IsOptional()
  @IsDateString()
  appointmentDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 20;

  @IsOptional()
  @IsEnum(PhoneCallStatus)
  callStatus: PhoneCallStatus;

  @IsOptional()
  @IsEnum(OrderInitiationStatus)
  orderStatus: OrderInitiationStatus;
}
