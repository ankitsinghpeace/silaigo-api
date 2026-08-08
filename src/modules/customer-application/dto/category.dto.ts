import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 1 })
  id?: number;

  @ApiPropertyOptional({ example: 'Kurti' })
  name?: string;

  @ApiPropertyOptional({ example: true })
  isActive?: boolean;

  @ApiPropertyOptional({ example: true })
  isVisibleOnHomePage?: boolean;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'Versatile kurtis crafted in luxurious fabrics.' })
  description?: string;

  @ApiPropertyOptional({ type: Object }) // or a defined LabelDto class
  label?: {
    type: string;
    title: string;
    color?: string;
  };
}
