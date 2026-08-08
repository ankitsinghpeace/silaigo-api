/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import {
  ICategory,
  ICategoryLandingConfig,
  ILocation,
  ILocationCategory,
  ISubCategory,
} from 'core-db/interface';
import { ModelMetadata } from 'core-db/model.metadata';

@Injectable()
export class LandingPagesService {
  constructor(
    @Inject(ModelMetadata.Location.token)
    private readonly locationModel: Model<ILocation>,
    @Inject(ModelMetadata.LocationCategory.token)
    private readonly locationCategoryModel: Model<ILocationCategory>,
    @Inject(ModelMetadata.CategoryLandingConfig.token)
    private readonly categoryLandingConfigModel: Model<ICategoryLandingConfig>,
    @Inject(ModelMetadata.Category.token)
    private readonly categoryModel: Model<ICategory>,
    @Inject(ModelMetadata.SubCategory.token)
    private readonly subcategoryModel: Model<ISubCategory>,
  ) {}

  async getLocationData(locationName: string): Promise<any> {
    const location = await this.locationModel
      .findOne({
        name: { $regex: `^${locationName}$`, $options: 'i' },
      })
      .lean();

    if (!location) {
      throw new NotFoundException(`Location "${locationName}" not found`);
    }

    const pricingSubcategories = await this.subcategoryModel
      .find({
        'SubCategories._id': { $in: location.pricingCardSubCategoryIds },
      })
      .lean();

    const mainSubcategories = await this.subcategoryModel
      .find({ 'SubCategories._id': { $in: location.mainCardSubCategoryIds } })
      .lean();
    const flatten = (docs: any[], ids: any[]) =>
      docs.flatMap((doc: any) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        doc.SubCategories.filter((sub) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          ids.map(String).includes(String(sub._id)),
        ),
      );

    const pricing = flatten(
      pricingSubcategories,
      location.pricingCardSubCategoryIds || [],
    );
    const main = flatten(
      mainSubcategories,
      location.mainCardSubCategoryIds || [],
    );
    return {
      locationName: location.name,
      subLocations: location.sublocations,
      longDescription: location.longDescription,
      pricingSubcategories: pricing.map((sub) => ({
        id: sub._id,
        name: sub.name,
        image: sub.image,
        description: sub.description,
        price: sub.price,
        discountedPrice: sub.discountedPrice,
      })),
      mainSubcategories: main.map((sub) => ({
        id: sub._id,
        name: sub.name,
        image: sub.image,
        description: sub.description,
        price: sub.price,
        discountedPrice: sub.discountedPrice,
      })),
    };
  }

  async getCategoryData(categoryName: string): Promise<any> {
    const categoryLandingConfig = await this.categoryLandingConfigModel
      .findOne({
        categoryName: { $regex: `^${categoryName}$`, $options: 'i' },
      })
      .lean();
    if (!categoryLandingConfig)
      throw new NotFoundException(`Category "${categoryName}" not found`);

    const pricingDocs = await this.subcategoryModel
      .find({
        'SubCategories._id': {
          $in: categoryLandingConfig.pricingCardSubCategoryIds,
        },
      })
      .lean();

    const mainDocs = await this.subcategoryModel
      .find({
        'SubCategories._id': {
          $in: categoryLandingConfig.mainCardSubCategoryIds,
        },
      })
      .lean();

    const flatten = (docs: any[], ids: any[]) =>
      docs.flatMap((doc) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        doc.SubCategories.filter((sub) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          ids.map(String).includes(String(sub._id)),
        ),
      );

    const pricingSubcategories = flatten(
      pricingDocs,
      categoryLandingConfig.pricingCardSubCategoryIds || [],
    );
    const mainSubcategories = flatten(
      mainDocs,
      categoryLandingConfig.mainCardSubCategoryIds || [],
    );

    const category: any = await this.categoryModel
      .findOne({
        name: { $regex: `^${categoryName}$`, $options: 'i' },
      })
      .lean();
    if (!category)
      throw new NotFoundException(`Category "${categoryName}" not found`);

    return {
      category: {
        name: category.name,
        imageUrl: category.mImageUrl,
        label: category.label?.title,
      },
      categoryName: categoryLandingConfig?.categoryName,
      customizationOptions: categoryLandingConfig.customizationOptions,
      longDescription: categoryLandingConfig.longDescription,
      pricingSubcategories: pricingSubcategories.map((sub) => ({
        id: sub._id,
        name: sub.name,
        image: sub.image,
        description: sub.description,
        price: sub.price,
        discountedPrice: sub.discountedPrice,
      })),
      mainSubcategories: mainSubcategories.map((sub) => ({
        id: sub._id,
        name: sub.name,
        image: sub.image,
        description: sub.description,
        price: sub.price,
        discountedPrice: sub.discountedPrice,
      })),
    };
  }

  async getLocationCategoryData(
    locationName: string,
    categoryName: string,
  ): Promise<any> {
    const locCategory = await this.locationCategoryModel
      .findOne({
        locationName: { $regex: `^${locationName}$`, $options: 'i' },
        categoryName: { $regex: `^${categoryName}$`, $options: 'i' },
      })
      .lean();

    if (!locCategory) {
      throw new NotFoundException(
        `Location-category "${locationName} - ${categoryName}" not found`,
      );
    }

    const categoryLandingConfig = await this.categoryLandingConfigModel
      .findOne({
        categoryName: { $regex: `^${categoryName}$`, $options: 'i' },
      })
      .lean();
    if (!categoryLandingConfig)
      throw new NotFoundException(`Category "${categoryName}" not found`);

    const category: any = await this.categoryModel
      .findOne({
        name: { $regex: `^${categoryName}$`, $options: 'i' },
      })
      .lean();
    if (!category)
      throw new NotFoundException(`Category "${categoryName}" not found`);

    const pricingDocs = await this.subcategoryModel
      .find({
        'SubCategories._id': {
          $in: categoryLandingConfig.pricingCardSubCategoryIds,
        },
      })
      .lean();

    const mainDocs = await this.subcategoryModel
      .find({
        'SubCategories._id': {
          $in: categoryLandingConfig.mainCardSubCategoryIds,
        },
      })
      .lean();

    const flatten = (docs: any[], ids: any[]) =>
      docs.flatMap((doc) =>
        doc.SubCategories.filter((sub) =>
          ids.map(String).includes(String(sub._id)),
        ),
      );
    const location = await this.locationModel
      .findOne({
        name: { $regex: `^${locationName}$`, $options: 'i' },
      })
      .lean();

    if (!location) {
      throw new NotFoundException(`Location "${locationName}" not found`);
    }

    const pricingSubcategories = flatten(
      pricingDocs,
      categoryLandingConfig.pricingCardSubCategoryIds || [],
    );
    const mainSubcategories = flatten(
      mainDocs,
      categoryLandingConfig.mainCardSubCategoryIds || [],
    );

    return {
      locationName: locCategory.locationName,
      categoryName: categoryLandingConfig?.categoryName,
      longDescription: locCategory.longDescription,
      category: {
        name: category.name,
        imageUrl: category.mImageUrl,
        label: category.label?.title,
      },
      pricingSubcategories: pricingSubcategories.map((sub) => ({
        name: sub.name,
        image: sub.image,
        description: sub.description,
        price: sub.price,
        discountedPrice: sub.discountedPrice,
      })),
      mainSubcategories: mainSubcategories.map((sub) => ({
        name: sub.name,
        image: sub.image,
        description: sub.description,
        price: sub.price,
        discountedPrice: sub.discountedPrice,
      })),
      sublocations: location.sublocations,
    };
  }

  async getRoutes(): Promise<{
    locationsCategoryMappings: {
      location: string;
      category: string;
      route: string;
    }[];
    locationsMappings: {
      location: string;
      route: string;
    }[];
    categoriesMappings: {
      category: string;
      route: string;
    }[];
  }> {
    const format = (value?: string) =>
      value?.toLowerCase().replace(/\s+/g, '-') ?? '';

    const [locationsCategoryData, locationsData, categoriesData] =
      await Promise.all([
        this.locationCategoryModel
          .find()
          .lean<{ locationName: string; categoryName: string }[]>(),

        this.locationModel
          .find()
          .lean<{ locationName: string; isActive: boolean }[]>(),

        this.categoryLandingConfigModel
          .find()
          .lean<{ categoryName: string; isActive: boolean }[]>(),
      ]);

    // 1. Filter active locations & categories
    const activeLocations = locationsData.filter((loc) => loc.isActive);
    const activeCategories = categoriesData.filter((cat) => cat.isActive);

    // 2. Create lookup sets (fast O(1) checks)
    const locationSet = new Set(activeLocations.map((loc: any) => loc.name));

    const categorySet = new Set(
      activeCategories.map((cat) => cat.categoryName),
    );

    // 3. Filter location-category mappings
    const filteredLocationsCategoryData = locationsCategoryData.filter(
      (locCat) =>
        locationSet.has(locCat.locationName) &&
        categorySet.has(locCat.categoryName),
    );

    // 4. Build mappings
    const locationsCategoryMappings = filteredLocationsCategoryData.map(
      (locCat) => ({
        location: locCat.locationName,
        category: locCat.categoryName,
        route: `/stitching/${format(locCat.locationName)}/${format(
          locCat.categoryName,
        )}`,
      }),
    );

    const locationsMappings = activeLocations.map((loc: any) => ({
      location: loc.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      route: `/stitching/location/${format(loc.name)}`,
    }));

    const categoriesMappings = activeCategories.map((cat) => ({
      category: cat.categoryName,
      route: `/stitching/type/${format(cat.categoryName)}`,
    }));

    return {
      locationsCategoryMappings,
      locationsMappings,
      categoriesMappings,
    };
  }
}
