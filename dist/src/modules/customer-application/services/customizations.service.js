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
exports.CustomizationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const { ObjectId } = mongoose_1.default.Types;
let CustomizationsService = class CustomizationsService {
    constructor(customizationsModel, customizationOptionsMappingModel, categoryModel) {
        this.customizationsModel = customizationsModel;
        this.customizationOptionsMappingModel = customizationOptionsMappingModel;
        this.categoryModel = categoryModel;
    }
    getCustomizations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsModel.find({}).lean();
        });
    }
    addCustomizationsOptions(type, customizations) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsModel.findOneAndUpdate({ type }, { $push: { options: { $each: customizations } } }, { new: true });
        });
    }
    removeCustomizationsOptions(type, customizationIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsModel.findOneAndUpdate({ type }, { $pull: { options: { _id: { $in: customizationIds } } } }, { new: true });
        });
    }
    updateCustomizationsOptions(type, customization) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsModel.findOneAndUpdate({ type }, {
                $set: {
                    'options.$[elem].title': customization.title,
                    'options.$[elem].imageUrl': customization.imageUrl,
                    'options.$[elem].complexity': customization.complexity,
                    'options.$[elem].price': customization.price,
                    'options.$[elem].discountedPrice': customization.discountedPrice
                }
            }, {
                new: true,
                arrayFilters: [{ 'elem._id': customization._id }]
            });
        });
    }
    getCustomizationsMapping() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.customizationOptionsMappingModel.find({}).select({ _id: 1, categoryId: 1, optionIds: 1, subCategoryIds: 1, customizationType: 1 }).populate("categoryId", "name _id").lean();
            const res = data.map((mapping) => {
                return {
                    _id: mapping._id,
                    customizationType: mapping.customizationType,
                    categoryName: mapping.categoryId.name,
                    categoryId: mapping.categoryId._id,
                    optionIds: mapping.optionIds,
                    subCategoryIds: mapping.subCategoryIds
                };
            });
            return res;
        });
    }
    addCustomizationsMapping(mapping) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.customizationOptionsMappingModel.insertOne(mapping);
            return {
                _id: data._id,
                customizationType: mapping.customizationType,
                categoryId: mapping.categoryId,
                optionIds: data.optionIds,
                subCategoryIds: data.subCategoryIds
            };
        });
    }
    editCustomizationsMapping(mapping, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.customizationOptionsMappingModel.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, mapping) }, { new: true });
            return {
                _id: id,
                customizationType: mapping.customizationType,
                categoryId: data.categoryId,
                optionIds: data.optionIds,
                subCategoryIds: data.subCategoryIds
            };
        });
    }
    deleteCustomizationsMapping(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationOptionsMappingModel.findByIdAndDelete(id);
        });
    }
    getCustomizationOptionsMapping(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let catId = Number(data.categoryId);
            if (!isNaN(catId)) {
                const category = yield this.categoryModel.findOne({ id: catId });
                if (!category) {
                    return [];
                }
                catId = category._id.toString();
            }
            const result = yield this.customizationOptionsMappingModel.findOne({
                customizationType: data.customizationType,
                categoryId: catId,
            }).lean();
            const subCatIds = result === null || result === void 0 ? void 0 : result.subCategoryIds.map((id) => { return id.toString(); });
            if (!(subCatIds === null || subCatIds === void 0 ? void 0 : subCatIds.includes(data.subCategoryId))) {
                return [];
            }
            const optionIds = result.optionIds.map(id => new ObjectId(id));
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
        });
    }
    getCustomizationTypesList() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = yield this.customizationsModel.find({}).select({ type: 1, rank: 1 }).lean();
            const data = options.sort((a, b) => a.rank - b.rank).map((option) => {
                return option.type;
            });
            return data;
        });
    }
    updateCustomizationRank(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const customization = yield this.customizationsModel.findOne({ type: body.type });
            if (!customization) {
                throw new common_1.BadRequestException("customization not found");
            }
            customization.rank = body.rank;
            yield customization.save();
            return { customization };
        });
    }
};
exports.CustomizationsService = CustomizationsService;
exports.CustomizationsService = CustomizationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Customization.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.CustomizationOptionMapping.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Category.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], CustomizationsService);
//# sourceMappingURL=customizations.service.js.map