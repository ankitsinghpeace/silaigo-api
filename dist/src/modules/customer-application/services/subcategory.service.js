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
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const { ObjectId } = mongoose_1.default.Types;
let SubCategoryService = class SubCategoryService {
    constructor(subCategoryModel, categoryModel) {
        this.subCategoryModel = subCategoryModel;
        this.categoryModel = categoryModel;
    }
    getAllSubCategoriesByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subCategoryModel.find({ categoryId });
        });
    }
    createNewSubCategory(subCategoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(subCategoryData)) {
                return this.subCategoryModel.insertMany(subCategoryData);
            }
            else {
                const category = new this.subCategoryModel(subCategoryData);
                return category.save();
            }
        });
    }
    updateSubCategory(subCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(subCategories)) {
                const { id } = subCategories, data = __rest(subCategories, ["id"]);
                return this.subCategoryModel.findOneAndUpdate({ id }, { $set: data }, { new: true });
            }
            const updatedData = [];
            for (const subCategory of subCategories) {
                const { id } = subCategory, data = __rest(subCategory, ["id"]);
                try {
                    const updated = yield this.subCategoryModel.findOneAndUpdate({ id }, { $set: data }, { new: true });
                    if (!updated)
                        return { error: `SubCategory with id ${id} not found` };
                    updatedData.push(updated);
                }
                catch (err) {
                    return { error: `Error updating id ${id}: ${err.message}` };
                }
            }
            return updatedData;
        });
    }
    deleteSubCategory(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(input)) {
                const idsToDelete = input.map((item) => item.id);
                return this.subCategoryModel.deleteMany({ id: { $in: idsToDelete } });
            }
            else {
                return this.subCategoryModel.findOneAndDelete({ id: input });
            }
        });
    }
    getSubCategoryStyle(subCategoryId, subCategoryStyleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const subCategoryDoc = yield this.subCategoryModel
                .findOne({ _id: new ObjectId(subCategoryId) })
                .lean();
            if (!subCategoryDoc) {
                throw new Error('SubCategory document not found');
            }
            const targetStyleId = new ObjectId(subCategoryStyleId);
            const style = subCategoryDoc.SubCategories.find((item) => new ObjectId(item._id).equals(targetStyleId));
            if (!style) {
                throw new Error('SubCategoryStyle not found');
            }
            const category = yield this.categoryModel
                .findOne({ id: subCategoryDoc.categoryId })
                .lean();
            return Object.assign(Object.assign({}, style), { category });
        });
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.SubCategory.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Category.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], SubCategoryService);
//# sourceMappingURL=subcategory.service.js.map