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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../services/category.service");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
const category_dto_1 = require("../dto/category.dto");
const customizations_controller_1 = require("./customizations.controller");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryService.getAllCategories();
        });
    }
    getCategoryTypeData(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryService.getCategoryTypeData(type);
        });
    }
    getCategoryDetails(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryService.getCategoryDetails(categoryId);
        });
    }
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryService.createCategory(category);
        });
    }
    editCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            this.categoryService.editCategory(category);
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryService.deleteCategory(parseInt(id));
        });
    }
    updateCategoryStyles(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryService.updateCategoryStyles(data, id);
        });
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryTypeData", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryDetails", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(customizations_controller_1.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(customizations_controller_1.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "editCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(customizations_controller_1.inventoryPermissions)),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Put)('id/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(customizations_controller_1.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategoryStyles", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map