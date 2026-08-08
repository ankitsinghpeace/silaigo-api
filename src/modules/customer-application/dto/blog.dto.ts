import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BlogReactionType } from 'core-db/schemas/blogReactions.schema';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Title of the blog post',
    example: 'Getting Started with NestJS'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Content of the blog post',
    example: 'This is the main content of the blog post...'
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Category of the blog post',
    example: 'Technology'
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'URL of the featured image',
    example: 'https://example.com/image.jpg'
  })
  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @ApiProperty({
    description: 'ID of the author (User)',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  @IsNotEmpty()
  author: string;
}

export class UpdateBlogDto {
  @ApiPropertyOptional({
    description: 'Title of the blog post',
    example: 'Getting Started with NestJS'
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Content of the blog post',
    example: 'This is the main content of the blog post...'
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'Category of the blog post',
    example: 'Technology'
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'URL of the featured image',
    example: 'https://example.com/image.jpg'
  })
  @IsString()
  @IsOptional()
  featuredImage?: string;

  @ApiPropertyOptional({
    description: 'ID of the author (User)',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  @IsOptional()
  author?: string;
}

export class BlogResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the blog post',
    example: '507f1f77bcf86cd799439011'
  })
  _id: string;

  @ApiProperty({
    description: 'Title of the blog post',
    example: 'Getting Started with NestJS'
  })
  title: string;

  @ApiProperty({
    description: 'Content of the blog post',
    example: 'This is the main content of the blog post...'
  })
  content: string;

  @ApiProperty({
    description: 'Category of the blog post',
    example: 'Technology'
  })
  category: string;

  @ApiProperty({
    description: 'URL of the featured image',
    example: 'https://example.com/image.jpg'
  })
  featuredImage: string;

  @ApiProperty({
    description: 'ID of the author (User)',
    example: '507f1f77bcf86cd799439011'
  })
  author: string;

  @ApiProperty({
    description: 'Array of blog reaction IDs',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013']
  })
  reactions: string[];

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T00:00:00.000Z'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-01T00:00:00.000Z'
  })
  updatedAt: string;
}

export class BlogQueryDto {
  @ApiPropertyOptional({
    description: 'Search by title',
    example: 'NestJS'
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Filter by category',
    example: 'Technology'
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'Filter by author ID',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1
  })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10
  })
  @IsOptional()
  limit?: number;
}

export class BlogReactionDto {
  @ApiProperty({
    description: 'Type of reaction',
    example: 'like'
  })
  @IsEnum(BlogReactionType)
  @IsNotEmpty()
  type: BlogReactionType;

  @ApiProperty({
    description: 'Slug of the blog post',
    example: 'getting-started-with-nestjs'
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

}