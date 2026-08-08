import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { ModelMetadata } from 'core-db/model.metadata';
import { ICategory, ISubCategory } from 'core-db/interface';

const { ObjectId } = mongoose.Types;

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject(ModelMetadata.SubCategory.token)
    private readonly subCategoryModel: Model<ISubCategory>,
    @Inject(ModelMetadata.Category.token)
    private readonly categoryModel: Model<ICategory>,
  ) {}

  async getAllSubCategoriesByCategory(categoryId: number) {
    return this.subCategoryModel.find({ categoryId });
  }

  async createNewSubCategory(subCategoryData: ISubCategory | ISubCategory[]) {
    if (Array.isArray(subCategoryData)) {
      return this.subCategoryModel.insertMany(subCategoryData);
    } else {
      const category = new this.subCategoryModel(subCategoryData);
      return category.save();
    }
  }

  async updateSubCategory(subCategories: any[] | any) {
    if (!Array.isArray(subCategories)) {
      const { id, ...data } = subCategories;
      return this.subCategoryModel.findOneAndUpdate(
        { id },
        { $set: data },
        { new: true },
      );
    }

    const updatedData: ISubCategory[] = [];
    for (const subCategory of subCategories) {
      const { id, ...data } = subCategory;

      try {
        const updated = await this.subCategoryModel.findOneAndUpdate(
          { id },
          { $set: data },
          { new: true },
        );
        if (!updated) return { error: `SubCategory with id ${id} not found` };
        updatedData.push(updated);
      } catch (err) {
        return { error: `Error updating id ${id}: ${err.message}` };
      }
    }

    return updatedData;
  }

  async deleteSubCategory(input: number | { id: number }[]) {
    if (Array.isArray(input)) {
      const idsToDelete = input.map((item) => item.id);
      return this.subCategoryModel.deleteMany({ id: { $in: idsToDelete } });
    } else {
      return this.subCategoryModel.findOneAndDelete({ id: input });
    }
  }

  async getSubCategoryStyle(subCategoryId: string, subCategoryStyleId: string) {
    const subCategoryDoc: any = await this.subCategoryModel
      .findOne({ _id: new ObjectId(subCategoryId) }) // Only find by parent ID
      .lean();

    if (!subCategoryDoc) {
      throw new Error('SubCategory document not found');
    }

    // Convert incoming string ID to ObjectId for safe comparison
    const targetStyleId = new ObjectId(subCategoryStyleId);

    // Use ObjectId equality instead of string comparison
    const style = subCategoryDoc.SubCategories.find((item) =>
      new ObjectId(item._id).equals(targetStyleId),
    );

    if (!style) {
      throw new Error('SubCategoryStyle not found');
    }

    const category = await this.categoryModel
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .findOne({ id: subCategoryDoc.categoryId }) // use _id
      .lean();

    return {
      ...style,
      category,
    };
  }
}
