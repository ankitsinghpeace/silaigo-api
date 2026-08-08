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
exports.MetaMasterController = void 0;
const common_1 = require("@nestjs/common");
const metamaster_service_1 = require("../services/metamaster.service");
const meta_master_dto_1 = require("../dto/meta.master.dto");
const enums_1 = require("../../../../core-db/enums");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
let MetaMasterController = class MetaMasterController {
    constructor(metaService) {
        this.metaService = metaService;
    }
    getAll() {
        return this.metaService.findAll();
    }
    getDistinctTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.metaService.findDistinctTypes();
        });
    }
    getMetaDataType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.metaService.findMetaType(type);
        });
    }
    getMetaMasterList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.metaService.getMetaMasterList(query);
        });
    }
    getEligibleCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.metaService.listEligibleCoupons();
        });
    }
    addMetaMaster(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.metaService.addCoupon(dto);
        });
    }
    updateMetaMaster(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.metaService.updateCoupon(id, dto);
        });
    }
    deleteMetaMaster(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.metaService.deleteCoupon(id);
        });
    }
    validateCoupon(dto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.metaService.validateCoupon(dto, req);
        });
    }
};
exports.MetaMasterController = MetaMasterController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetaMasterController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaMasterController.prototype, "getDistinctTypes", null);
__decorate([
    (0, common_1.Get)('types/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetaMasterController.prototype, "getMetaDataType", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.VIEW}`])),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meta_master_dto_1.GetMetaMasterListDto]),
    __metadata("design:returntype", Promise)
], MetaMasterController.prototype, "getMetaMasterList", null);
__decorate([
    (0, common_1.Get)('coupons/eligible'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetaMasterController.prototype, "getEligibleCoupons", null);
__decorate([
    (0, common_1.Post)('coupons'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meta_master_dto_1.MetaMasterDto]),
    __metadata("design:returntype", Promise)
], MetaMasterController.prototype, "addMetaMaster", null);
__decorate([
    (0, common_1.Put)('coupons/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, meta_master_dto_1.MetaMasterDto]),
    __metadata("design:returntype", Promise)
], MetaMasterController.prototype, "updateMetaMaster", null);
__decorate([
    (0, common_1.Delete)('coupons/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.DELETE}`])),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetaMasterController.prototype, "deleteMetaMaster", null);
__decorate([
    (0, common_1.Post)('coupons/validate'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], MetaMasterController.prototype, "validateCoupon", null);
exports.MetaMasterController = MetaMasterController = __decorate([
    (0, common_1.Controller)('meta-master'),
    __metadata("design:paramtypes", [metamaster_service_1.MetaMasterService])
], MetaMasterController);
//# sourceMappingURL=metamaster.controller.js.map