import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ModelMetadata } from 'core-db/model.metadata';

import {
  ICategory,
  ICustomization,
  ISubCategory,
  ICustomizationOptionMapping,
  IMetaMaster,
} from 'core-db/interface';
import { UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(ModelMetadata.Category.token)
    private readonly categoryModel: Model<ICategory>,
    @Inject(ModelMetadata.SubCategory.token)
    private readonly subCategoryModel: Model<ISubCategory>,
    @Inject(ModelMetadata.Customization.token)
    private readonly customizationsModel: Model<ICustomization>,
    @Inject(ModelMetadata.MetaMaster.token)
    private readonly metaModel: Model<IMetaMaster>,
    @Inject(ModelMetadata.CustomizationOptionMapping.token)
    private readonly customizationOptionMappingModel: Model<ICustomizationOptionMapping>,
  ) {}

  async getAllCategories() {
    return this.categoryModel.find({}).lean();
  }

  async getCategoryDetails(categoryId: number) {
    const [categoryData, subCategoriesData] = await Promise.all([
      await this.categoryModel.findOne({ id: Number(categoryId) }).lean(),
      await this.subCategoryModel
        .find({ categoryId: Number(categoryId) })
        .lean()
        .then((data) => ({ subCategories: data }) as any), // 👈 wrap in object
    ]);

    return {
      ...categoryData,
      styles: subCategoriesData?.subCategories?.[0]?.SubCategories,
      subCategoryId: subCategoriesData?.subCategories?.[0]?._id,
    };
  }

  async getCategoryTypeData(type: string) {
    try {
      const modelMap: Record<string, Model<any>> = {
        category: this.categoryModel,
        subCategory: this.subCategoryModel,
        customizations: this.customizationsModel,
        customizationOptionMapping: this.customizationOptionMappingModel,
      };

      const selectedModel = modelMap[type];
      if (!selectedModel) {
        throw new Error(`Invalid type: ${type}`);
      }

      const data = await selectedModel.find({}, { _id: 0 }).lean();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async createCategory(category) {
    return this.categoryModel.insertOne(category);
  }

  async editCategory(categoryDto: UpdateCategoryDto) {
    const { id, label, ...categoryData } = categoryDto;

    // 1. Update category document (excluding label)
    const updatedCategory = await this.categoryModel.findOneAndUpdate(
      { id },
      categoryDto,
      { new: true },
    );

    // 2. Update meta/master label if label exists
    if (label && label.type) {
      await this.metaModel.findOneAndUpdate(
        { type: label.type },
        {
          label: label.title,
          color: label.color,
        },
        { new: true, upsert: true },
      );
    }

    return updatedCategory;
  }

  async deleteCategory(id: number) {
    return this.categoryModel.findOneAndDelete({ id });
  }

  async updateCategoryStyles(data: any, categoryId: number) {
    try {
      const updated = await this. subCategoryModel.findOneAndUpdate(
        { categoryId },
        { $set: { SubCategories: data.styles } },
        { new: true, upsert: true }, // create if not exists
      );
      return updated;
    } catch (err) {
      console.error('Error updating category styles:', err);
      throw err;
    }
  }
}
