import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CustomizationOptionMappingDto {
  @ApiProperty({
    description: 'The ID of the customization option mapping',
    example: '683546829f23565360e58530',
  })
  @IsString()
  @IsOptional()
  _id?: string;

  @ApiProperty({
    description: 'The type of customization',
    example: '6815ac6816da640fdc87bc03',
  })
  @IsString()
  customizationType: string;

  @ApiProperty({
    description: 'Array of option IDs',
    example: [
      '6815ac6816da640fdc87bc04',
      '6815ac6816da640fdc87bc05',
      '6815ac6816da640fdc87bc06',
      '6815ac6816da640fdc87bc07',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  optionsId: string[];

  @ApiProperty({
    description: 'Array of subcategory IDs',
    example: [1, 2, 3, 4],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  subCategoryIds: number[];

  @ApiProperty({
    description: 'The category ID',
    example: 1,
  })
  @IsNumber()
  categoryId: number;
} 

export class GetCustomizationOptionsMappingDto {
    @ApiProperty({
        description: 'The type of customization',
        example: 'eg. Neck,Sleeves',
    })
    @IsString()
    customizationType: string;

    @ApiProperty({
        description: 'The category ID',
        example: 1,
    })
    @IsNumber()
    categoryId: string;

    @ApiProperty({
        description: 'The subcategory ID',
        example: 1,
    })
    @IsNumber()
    subCategoryId: string;
}