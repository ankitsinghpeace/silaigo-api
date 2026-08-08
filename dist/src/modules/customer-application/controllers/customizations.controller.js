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
exports.CustomizationsController = exports.inventoryPermissions = void 0;
const common_1 = require("@nestjs/common");
const customizations_service_1 = require("../services/customizations.service");
const enums_1 = require("../../../../core-db/enums");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
exports.inventoryPermissions = [
    `${enums_1.PermissionType.INVENTORY}.${enums_1.PermissionSubType.CREATE}`,
    `${enums_1.PermissionType.INVENTORY}.${enums_1.PermissionSubType.EDIT}`,
    `${enums_1.PermissionType.INVENTORY}.${enums_1.PermissionSubType.DELETE}`,
];
let CustomizationsController = class CustomizationsController {
    constructor(customizationsService) {
        this.customizationsService = customizationsService;
    }
    getCustomizations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.getCustomizations();
        });
    }
    updateCustomizationRank(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.updateCustomizationRank(body);
        });
    }
    addCustiomizationsOptions(type, customizations) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.addCustomizationsOptions(type, customizations);
        });
    }
    updateCustomizationsOptions(type, customizations) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.updateCustomizationsOptions(type, customizations);
        });
    }
    removeCustomizationOptions(type, customizationIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.removeCustomizationsOptions(type, customizationIds);
        });
    }
    getCustomizationsMapping() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.getCustomizationsMapping();
        });
    }
    addCustomizationsMapping(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.addCustomizationsMapping(body.mapping);
        });
    }
    editCustomizationsMapping(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.editCustomizationsMapping(body.mapping, body.id);
        });
    }
    deleteCustomizationsMapping(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.deleteCustomizationsMapping(body.id);
        });
    }
    getCustomizationOptionsMapping(subCategoryId, categoryId, customizationType) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = { subCategoryId, categoryId, customizationType };
            return this.customizationsService.getCustomizationOptionsMapping(data);
        });
    }
    getCustomizationTypesList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customizationsService.getCustomizationTypesList();
        });
    }
};
exports.CustomizationsController = CustomizationsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "getCustomizations", null);
__decorate([
    (0, common_1.Put)('rank'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "updateCustomizationRank", null);
__decorate([
    (0, common_1.Post)('options/:type'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(exports.inventoryPermissions)),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "addCustiomizationsOptions", null);
__decorate([
    (0, common_1.Put)('options/:type'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(exports.inventoryPermissions)),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "updateCustomizationsOptions", null);
__decorate([
    (0, common_1.Delete)('options/:type'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(exports.inventoryPermissions)),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "removeCustomizationOptions", null);
__decorate([
    (0, common_1.Get)("mapping"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "getCustomizationsMapping", null);
__decorate([
    (0, common_1.Post)("mapping"),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(exports.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "addCustomizationsMapping", null);
__decorate([
    (0, common_1.Put)("mapping"),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(exports.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "editCustomizationsMapping", null);
__decorate([
    (0, common_1.Delete)("mapping"),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(exports.inventoryPermissions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "deleteCustomizationsMapping", null);
__decorate([
    (0, common_1.Get)('options-mapping'),
    __param(0, (0, common_1.Query)("subCategoryId")),
    __param(1, (0, common_1.Query)("categoryId")),
    __param(2, (0, common_1.Query)("customizationType")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "getCustomizationOptionsMapping", null);
__decorate([
    (0, common_1.Get)('types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomizationsController.prototype, "getCustomizationTypesList", null);
exports.CustomizationsController = CustomizationsController = __decorate([
    (0, common_1.Controller)('customizations'),
    __metadata("design:paramtypes", [customizations_service_1.CustomizationsService])
], CustomizationsController);
//# sourceMappingURL=customizations.controller.js.map