import { ApiProperty } from '@nestjs/swagger';

export class PageSectionDto {
  @ApiProperty({
    example: 'BBA',
  })
  programCode: string;
}
