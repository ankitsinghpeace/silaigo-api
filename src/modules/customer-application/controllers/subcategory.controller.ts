import { Controller, Get, Param, Body, Put, Post, Delete, UseGuards } from '@nestjs/common';
import { SubCategoryService } from '../services/subcategory.service';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { inventoryPermissions } from './customizations.controller';

@Controller('subcategory')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get(':categoryId')
  async getAllCategories(@Param('categoryId') categoryId: string) {
    return this.subCategoryService.getAllSubCategoriesByCategory(parseInt(categoryId));
  }

  @Post()
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async createNewSubCategory(@Body() subCategories: any[]) {
    return this.subCategoryService.createNewSubCategory(subCategories);
  }

  @Put()
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async updateSubCategory(@Body() subCategories: any[]) {
    return this.subCategoryService.updateSubCategory(subCategories);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async deleteCategoryById(@Param('id') id: string) {
    return this.subCategoryService.deleteSubCategory(parseInt(id));
  }

  @Delete()
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async deleteMultipleCategories(@Body() subCategories: any[]) {
    return this.subCategoryService.deleteSubCategory(subCategories);
  }

  @Get(':subCategoryId/:subCategoryStyleId')
  async getSubCategoryStyle(@Param('subCategoryId') subCategoryId: string, @Param('subCategoryStyleId') subCategoryStyleId: string) {
    return this.subCategoryService.getSubCategoryStyle(subCategoryId, subCategoryStyleId);
  }
}
