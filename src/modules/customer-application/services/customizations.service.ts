import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { ModelMetadata } from 'core-db/model.metadata';
import { ICategory, ICustomization, ICustomizationOptionMapping } from 'core-db/interface';
import {
  CustomizationOptionMappingDto,
  GetCustomizationOptionsMappingDto,
} from '../dto/customization-option-mapping.dto';

const { ObjectId } = mongoose.Types;
@Injectable()
export class CustomizationsService {
  constructor(
    @Inject(ModelMetadata.Customization.token)
    private readonly customizationsModel: Model<ICustomization>,
    @Inject(ModelMetadata.CustomizationOptionMapping.token)
    private readonly customizationOptionsMappingModel: Model<ICustomizationOptionMapping>,
    @Inject(ModelMetadata.Category.token)
    private readonly categoryModel: Model<ICategory>,
  ) {}

  async getCustomizations() {
    return this.customizationsModel.find({}).lean();
  }

  async addCustomizationsOptions(type, customizations) {
    return this.customizationsModel.findOneAndUpdate(
      { type },
      { $push: { options: { $each: customizations } } },
      { new: true },
    );
  }

  async removeCustomizationsOptions(type, customizationIds) {
    return this.customizationsModel.findOneAndUpdate(
      { type },
      { $pull: { options: { _id: { $in: customizationIds } } } },
      { new: true },
    );
  }

  async updateCustomizationsOptions(type, customization) {
    return this.customizationsModel.findOneAndUpdate(
      { type },
      {
        $set: {
          'options.$[elem].title': customization.title,
          'options.$[elem].imageUrl': customization.imageUrl,
          'options.$[elem].complexity': customization.complexity,
          'options.$[elem].price': customization.price,
          'options.$[elem].discountedPrice': customization.discountedPrice
        }
      },
      {
        new: true,
        arrayFilters: [{ 'elem._id': customization._id }]
      }
    );
  }

  async getCustomizationsMapping(){
    const data = await this.customizationOptionsMappingModel.find({}).select({_id:1,categoryId:1,optionIds:1,subCategoryIds:1,customizationType:1}).populate("categoryId","name _id").lean();
    const res = data.map((mapping:any)=>{
      return {
        _id:mapping._id,
        customizationType:mapping.customizationType,
        categoryName:mapping.categoryId.name,
        categoryId:mapping.categoryId._id,
        optionIds:mapping.optionIds,
        subCategoryIds:mapping.subCategoryIds
      }
    });

    return res
  }

  async addCustomizationsMapping(mapping:any){
   const data = await this.customizationOptionsMappingModel.insertOne(mapping);
   return {
    _id:data._id,
    customizationType:mapping.customizationType,
    categoryId:mapping.categoryId,
    optionIds:data.optionIds,
    subCategoryIds:data.subCategoryIds
   }
  }

  async editCustomizationsMapping(mapping:any,id){
    const data = await this.customizationOptionsMappingModel.findOneAndUpdate({_id:id},{$set:{...mapping}},{new:true});
    return {
      _id:id,
      customizationType:mapping.customizationType,
      categoryId:data!.categoryId,
      optionIds:data!.optionIds,
      subCategoryIds:data!.subCategoryIds
    }
  }

  async deleteCustomizationsMapping(id){
    return this.customizationOptionsMappingModel.findByIdAndDelete(id);
  }

  async getCustomizationOptionsMapping(data: GetCustomizationOptionsMappingDto) {
      let catId:number|string = Number(data.categoryId);
      if(!isNaN(catId)){
        const category = await this.categoryModel.findOne({id:catId});
        if(!category){
          return []
        }
        catId = category._id.toString();
      }

      const result = await this.customizationOptionsMappingModel.findOne({
        customizationType: data.customizationType,
        categoryId: catId,
      }).lean()

      const subCatIds = result?.subCategoryIds.map((id)=>{return id.toString()});
      if(!subCatIds?.includes(data.subCategoryId)){
        return [];
      }

      const optionIds = result!.optionIds.map(id => new ObjectId(id));
      const options = this.customizationsModel.aggregate([
        {
          $match: { type: data.customizationType }
        },
        {
          $project: {
            options: {
              $filter: {
                input: "$options",
                as: "option",
                cond: { $in: ["$$option._id", optionIds] }
              }
            },
            type: 1
          }
        }
      ]);

    return options;
  }

  async getCustomizationTypesList() {
    const options = await this.customizationsModel.find({}).select({type: 1, rank: 1}).lean();
    const data = options.sort((a, b) => a.rank - b.rank).map((option: any) => {
      return option.type;
    });
    return data;
  }

  async updateCustomizationRank(body:{type:string,rank:number}){
    const customization = await this.customizationsModel.findOne({type:body.type});

    if(!customization){
      throw new BadRequestException("customization not found");
    }
    
    customization.rank = body.rank;
    await customization.save();

    return {customization}
  }
}
