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
exports.SubCategoryController = void 0;
const common_1 = require("@nestjs/common");
const subcategory_service_1 = require("../services/subcategory.service");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
const customizations_controller_1 = require("./customizations.controller");
let SubCategoryController = class SubCategoryController {
    constructor(subCategoryService) {
        this.subCategoryService = subCategoryService;
    }
    getAllCategories(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subCategoryService.getAllSubCategoriesByCategory(parseInt(categoryId));
        });
    }
    createNewSubCategory(subCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subCategoryService.createNewSubCategory(subCategories);
        });
    }
    updateSubCategory(subCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subCategoryService.updateSubCategory(subCategories);
        });
    }
    deleteCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subCategoryService.deleteSubCategory(parseInt(id));
        });
    }
    deleteMultipleCategories(subCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subCategoryService.deleteSubCategory(subCategories);
        });
    }
    getSubCategoryStyle(subCategoryId, subCategoryStyleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subCategoryService.getSubCategoryStyle(subCategoryId, subCategoryStyleId);
        });
    }
};
exports.SubCategoryController = SubCategoryController;
__decorate([
    (0, common_1.Get)(':categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(customizations_controller_1.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "createNewSubCategory", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(customizations_controller_1.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "updateSubCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(customizations_controller_1.inventoryPermissions)),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "deleteCategoryById", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(customizations_controller_1.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "deleteMultipleCategories", null);
__decorate([
    (0, common_1.Get)(':subCategoryId/:subCategoryStyleId'),
    __param(0, (0, common_1.Param)('subCategoryId')),
    __param(1, (0, common_1.Param)('subCategoryStyleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getSubCategoryStyle", null);
exports.SubCategoryController = SubCategoryController = __decorate([
    (0, common_1.Controller)('subcategory'),
    __metadata("design:paramtypes", [subcategory_service_1.SubCategoryService])
], SubCategoryController);
//# sourceMappingURL=subcategory.controller.js.map