import { Controller, Get, Query } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean, IsIn, Min, Max } from 'class-validator';

export class GetCustomersQueryListDto {
  @IsOptional()
  @IsString()
  next?: string;

  @IsOptional()
  @IsString()
  prev?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 50;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @IsOptional()
  @IsString()
  referredBy?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  hasReferral?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['newest', 'oldest'])
  sortBy?: 'newest' | 'oldest' = 'newest';

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}