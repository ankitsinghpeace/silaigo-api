import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class MetaMasterDto {
  @ApiProperty({ example: 'banner' })
  type: string;

  @ApiProperty({ example: 'festival-offer' })
  subType: string;

  @ApiProperty({ example: 'Big Diwali Sale' })
  label: string;

  @ApiPropertyOptional({ description: 'Flexible JSON object' })
  value?: any;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;
  @ApiProperty()
  color:string;
}

export class GetMetaMasterListDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number = 50;

  @IsString()
  @IsOptional()
  search?: string;


  @IsIn(['newest', 'oldest'])
  @IsOptional()
  sortBy?: 'newest' | 'oldest' = 'newest';

  @IsString()
  @IsOptional()
  type?: string;
}
