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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementsCategoryController = void 0;
const common_1 = require("@nestjs/common");
const measurement_dto_1 = require("../dto/measurement.dto");
const measurements_service_1 = require("../services/measurements.service");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
const enums_1 = require("../../../../core-db/enums");
let MeasurementsCategoryController = class MeasurementsCategoryController {
    constructor(measurementCategoryService) {
        this.measurementCategoryService = measurementCategoryService;
    }
    listCategories() {
        return this.measurementCategoryService.listCategories();
    }
    createCategory(data) {
        return this.measurementCategoryService.createCategory(data);
    }
    updateCategoty(data) {
        return this.measurementCategoryService.updateCategory(data);
    }
    removeCategory(name) {
        return this.measurementCategoryService.deleteCategory(name);
    }
    listMeasurementsFields() {
        return this.measurementCategoryService.listMeasurementsFields();
    }
    getUserMeasurements(phone) {
        return this.measurementCategoryService.getUserMeasurements(phone);
    }
    createMeasurementFiled(data) {
        return this.measurementCategoryService.addMeasureMentField(data);
    }
    deleteMeasurementField(id) {
        return this.measurementCategoryService.deleteMeasurementField(id);
    }
};
exports.MeasurementsCategoryController = MeasurementsCategoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MeasurementsCategoryController.prototype, "listCategories", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [measurement_dto_1.MeasurementCategoryDto]),
    __metadata("design:returntype", void 0)
], MeasurementsCategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [measurement_dto_1.MeasurementCategoryDto]),
    __metadata("design:returntype", void 0)
], MeasurementsCategoryController.prototype, "updateCategoty", null);
__decorate([
    (0, common_1.Delete)(':name'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.DELETE}`])),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeasurementsCategoryController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.Get)('fields'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MeasurementsCategoryController.prototype, "listMeasurementsFields", null);
__decorate([
    (0, common_1.Get)('user/:phone'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.VIEW}`])),
    __param(0, (0, common_1.Param)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeasurementsCategoryController.prototype, "getUserMeasurements", null);
__decorate([
    (0, common_1.Post)('fields'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [measurement_dto_1.MeasurementFieldDto]),
    __metadata("design:returntype", void 0)
], MeasurementsCategoryController.prototype, "createMeasurementFiled", null);
__decorate([
    (0, common_1.Delete)('fields/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.DELETE}`])),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeasurementsCategoryController.prototype, "deleteMeasurementField", null);
exports.MeasurementsCategoryController = MeasurementsCategoryController = __decorate([
    (0, common_1.Controller)('measurement-category'),
    __metadata("design:paramtypes", [measurements_service_1.MeasurementsService])
], MeasurementsCategoryController);
//# sourceMappingURL=measurement-category.controller.js.map