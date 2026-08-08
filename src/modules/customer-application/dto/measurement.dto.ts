import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class MeasurementFieldDto {
  @IsString()
  name: string;

  @IsString()
  id: string;
}

export class MeasurementCategoryDto {
  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MeasurementFieldDto)
  fields: MeasurementFieldDto[];
}
