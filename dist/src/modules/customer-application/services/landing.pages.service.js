"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
let LandingPagesService = class LandingPagesService {
    constructor(locationModel, locationCategoryModel, categoryLandingConfigModel, categoryModel, subcategoryModel) {
        this.locationModel = locationModel;
        this.locationCategoryModel = locationCategoryModel;
        this.categoryLandingConfigModel = categoryLandingConfigModel;
        this.categoryModel = categoryModel;
        this.subcategoryModel = subcategoryModel;
    }
    getLocationData(locationName) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield this.locationModel
                .findOne({
                name: { $regex: `^${locationName}$`, $options: 'i' },
            })
                .lean();
            if (!location) {
                throw new common_1.NotFoundException(`Location "${locationName}" not found`);
            }
            const pricingSubcategories = yield this.subcategoryModel
                .find({
                'SubCategories._id': { $in: location.pricingCardSubCategoryIds },
            })
                .lean();
            const mainSubcategories = yield this.subcategoryModel
                .find({ 'SubCategories._id': { $in: location.mainCardSubCategoryIds } })
                .lean();
            const flatten = (docs, ids) => docs.flatMap((doc) => doc.SubCategories.filter((sub) => ids.map(String).includes(String(sub._id))));
            const pricing = flatten(pricingSubcategories, location.pricingCardSubCategoryIds || []);
            const main = flatten(mainSubcategories, location.mainCardSubCategoryIds || []);
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
        });
    }
    getCategoryData(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const categoryLandingConfig = yield this.categoryLandingConfigModel
                .findOne({
                categoryName: { $regex: `^${categoryName}$`, $options: 'i' },
            })
                .lean();
            if (!categoryLandingConfig)
                throw new common_1.NotFoundException(`Category "${categoryName}" not found`);
            const pricingDocs = yield this.subcategoryModel
                .find({
                'SubCategories._id': {
                    $in: categoryLandingConfig.pricingCardSubCategoryIds,
                },
            })
                .lean();
            const mainDocs = yield this.subcategoryModel
                .find({
                'SubCategories._id': {
                    $in: categoryLandingConfig.mainCardSubCategoryIds,
                },
            })
                .lean();
            const flatten = (docs, ids) => docs.flatMap((doc) => doc.SubCategories.filter((sub) => ids.map(String).includes(String(sub._id))));
            const pricingSubcategories = flatten(pricingDocs, categoryLandingConfig.pricingCardSubCategoryIds || []);
            const mainSubcategories = flatten(mainDocs, categoryLandingConfig.mainCardSubCategoryIds || []);
            const category = yield this.categoryModel
                .findOne({
                name: { $regex: `^${categoryName}$`, $options: 'i' },
            })
                .lean();
            if (!category)
                throw new common_1.NotFoundException(`Category "${categoryName}" not found`);
            return {
                category: {
                    name: category.name,
                    imageUrl: category.mImageUrl,
                    label: (_a = category.label) === null || _a === void 0 ? void 0 : _a.title,
                },
                categoryName: categoryLandingConfig === null || categoryLandingConfig === void 0 ? void 0 : categoryLandingConfig.categoryName,
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
        });
    }
    getLocationCategoryData(locationName, categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const locCategory = yield this.locationCategoryModel
                .findOne({
                locationName: { $regex: `^${locationName}$`, $options: 'i' },
                categoryName: { $regex: `^${categoryName}$`, $options: 'i' },
            })
                .lean();
            if (!locCategory) {
                throw new common_1.NotFoundException(`Location-category "${locationName} - ${categoryName}" not found`);
            }
            const categoryLandingConfig = yield this.categoryLandingConfigModel
                .findOne({
                categoryName: { $regex: `^${categoryName}$`, $options: 'i' },
            })
                .lean();
            if (!categoryLandingConfig)
                throw new common_1.NotFoundException(`Category "${categoryName}" not found`);
            const category = yield this.categoryModel
                .findOne({
                name: { $regex: `^${categoryName}$`, $options: 'i' },
            })
                .lean();
            if (!category)
                throw new common_1.NotFoundException(`Category "${categoryName}" not found`);
            const pricingDocs = yield this.subcategoryModel
                .find({
                'SubCategories._id': {
                    $in: categoryLandingConfig.pricingCardSubCategoryIds,
                },
            })
                .lean();
            const mainDocs = yield this.subcategoryModel
                .find({
                'SubCategories._id': {
                    $in: categoryLandingConfig.mainCardSubCategoryIds,
                },
            })
                .lean();
            const flatten = (docs, ids) => docs.flatMap((doc) => doc.SubCategories.filter((sub) => ids.map(String).includes(String(sub._id))));
            const location = yield this.locationModel
                .findOne({
                name: { $regex: `^${locationName}$`, $options: 'i' },
            })
                .lean();
            if (!location) {
                throw new common_1.NotFoundException(`Location "${locationName}" not found`);
            }
            const pricingSubcategories = flatten(pricingDocs, categoryLandingConfig.pricingCardSubCategoryIds || []);
            const mainSubcategories = flatten(mainDocs, categoryLandingConfig.mainCardSubCategoryIds || []);
            return {
                locationName: locCategory.locationName,
                categoryName: categoryLandingConfig === null || categoryLandingConfig === void 0 ? void 0 : categoryLandingConfig.categoryName,
                longDescription: locCategory.longDescription,
                category: {
                    name: category.name,
                    imageUrl: category.mImageUrl,
                    label: (_a = category.label) === null || _a === void 0 ? void 0 : _a.title,
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
        });
    }
    getRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            const format = (value) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.toLowerCase().replace(/\s+/g, '-')) !== null && _a !== void 0 ? _a : ''; };
            const [locationsCategoryData, locationsData, categoriesData] = yield Promise.all([
                this.locationCategoryModel
                    .find()
                    .lean(),
                this.locationModel
                    .find()
                    .lean(),
                this.categoryLandingConfigModel
                    .find()
                    .lean(),
            ]);
            const activeLocations = locationsData.filter((loc) => loc.isActive);
            const activeCategories = categoriesData.filter((cat) => cat.isActive);
            const locationSet = new Set(activeLocations.map((loc) => loc.name));
            const categorySet = new Set(activeCategories.map((cat) => cat.categoryName));
            const filteredLocationsCategoryData = locationsCategoryData.filter((locCat) => locationSet.has(locCat.locationName) &&
                categorySet.has(locCat.categoryName));
            const locationsCategoryMappings = filteredLocationsCategoryData.map((locCat) => ({
                location: locCat.locationName,
                category: locCat.categoryName,
                route: `/stitching/${format(locCat.locationName)}/${format(locCat.categoryName)}`,
            }));
            const locationsMappings = activeLocations.map((loc) => ({
                location: loc.name,
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
        });
    }
};
exports.LandingPagesService = LandingPagesService;
exports.LandingPagesService = LandingPagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Location.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.LocationCategory.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.CategoryLandingConfig.token)),
    __param(3, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Category.token)),
    __param(4, (0, common_1.Inject)(model_metadata_1.ModelMetadata.SubCategory.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], LandingPagesService);
//# sourceMappingURL=landing.pages.service.js.map