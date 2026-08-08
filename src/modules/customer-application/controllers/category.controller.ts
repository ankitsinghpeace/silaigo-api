import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { UpdateCategoryDto } from '../dto/category.dto';
import { inventoryPermissions } from './customizations.controller';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':type')
  async getCategoryTypeData(@Param('type') type: string) {
    return this.categoryService.getCategoryTypeData(type);
  }
  @Get('id/:id')
  async getCategoryDetails(@Param('id') categoryId: number) {
    return this.categoryService.getCategoryDetails(categoryId);
  }

  
  @Post()
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async createCategory(@Body() category: any) {
    return this.categoryService.createCategory(category);
  }

  @Put()
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async editCategory(@Body() category: UpdateCategoryDto) {
    this.categoryService.editCategory(category);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(parseInt(id));
  }

  @Put('id/:id')
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async updateCategoryStyles(@Body() data: any, @Param('id') id: number) {
    return this.categoryService.updateCategoryStyles(data, id);
  }
}
