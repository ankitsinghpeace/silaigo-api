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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
let CategoryService = class CategoryService {
    constructor(categoryModel, subCategoryModel, customizationsModel, metaModel, customizationOptionMappingModel) {
        this.categoryModel = categoryModel;
        this.subCategoryModel = subCategoryModel;
        this.customizationsModel = customizationsModel;
        this.metaModel = metaModel;
        this.customizationOptionMappingModel = customizationOptionMappingModel;
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryModel.find({}).lean();
        });
    }
    getCategoryDetails(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const [categoryData, subCategoriesData] = yield Promise.all([
                yield this.categoryModel.findOne({ id: Number(categoryId) }).lean(),
                yield this.subCategoryModel
                    .find({ categoryId: Number(categoryId) })
                    .lean()
                    .then((data) => ({ subCategories: data })),
            ]);
            return Object.assign(Object.assign({}, categoryData), { styles: (_b = (_a = subCategoriesData === null || subCategoriesData === void 0 ? void 0 : subCategoriesData.subCategories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.SubCategories, subCategoryId: (_d = (_c = subCategoriesData === null || subCategoriesData === void 0 ? void 0 : subCategoriesData.subCategories) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d._id });
        });
    }
    getCategoryTypeData(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelMap = {
                    category: this.categoryModel,
                    subCategory: this.subCategoryModel,
                    customizations: this.customizationsModel,
                    customizationOptionMapping: this.customizationOptionMappingModel,
                };
                const selectedModel = modelMap[type];
                if (!selectedModel) {
                    throw new Error(`Invalid type: ${type}`);
                }
                const data = yield selectedModel.find({}, { _id: 0 }).lean();
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryModel.insertOne(category);
        });
    }
    editCategory(categoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, label } = categoryDto, categoryData = __rest(categoryDto, ["id", "label"]);
            const updatedCategory = yield this.categoryModel.findOneAndUpdate({ id }, categoryDto, { new: true });
            if (label && label.type) {
                yield this.metaModel.findOneAndUpdate({ type: label.type }, {
                    label: label.title,
                    color: label.color,
                }, { new: true, upsert: true });
            }
            return updatedCategory;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryModel.findOneAndDelete({ id });
        });
    }
    updateCategoryStyles(data, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield this.subCategoryModel.findOneAndUpdate({ categoryId }, { $set: { SubCategories: data.styles } }, { new: true, upsert: true });
                return updated;
            }
            catch (err) {
                console.error('Error updating category styles:', err);
                throw err;
            }
        });
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Category.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.SubCategory.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Customization.token)),
    __param(3, (0, common_1.Inject)(model_metadata_1.ModelMetadata.MetaMaster.token)),
    __param(4, (0, common_1.Inject)(model_metadata_1.ModelMetadata.CustomizationOptionMapping.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map