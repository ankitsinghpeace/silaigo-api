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
exports.PageSectionController = void 0;
const common_1 = require("@nestjs/common");
const page_sections_service_1 = require("../services/page.sections.service");
const platform_express_1 = require("@nestjs/platform-express");
const aws_1 = require("../../../utils/aws");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
const enums_1 = require("../../../../core-db/enums");
const pageSectionsPermissions = [
    `${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.CREATE}`,
    `${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.EDIT}`,
    `${enums_1.PermissionType.CONTENT}.${enums_1.PermissionSubType.DELETE}`,
];
let PageSectionController = class PageSectionController {
    constructor(pageSectionService) {
        this.pageSectionService = pageSectionService;
    }
    getHomepageData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pageSectionService.getCompleteHomePage();
        });
    }
    getNavbarData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pageSectionService.getNavbarData();
        });
    }
    getSectionByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pageSectionService.findSectionByType(type);
        });
    }
    updateSectionByType(type, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pageSectionService.updateSectionByType(type, body);
        });
    }
    getSignedUrl(fileInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pageSectionService.uploadFileService(fileInfo);
        });
    }
    uploadFile(files) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = files.file[0];
            const fileInfoBuffer = files.fileInfo[0].buffer;
            const jsonString = fileInfoBuffer.toString('utf8');
            return (0, aws_1.uploadFileToS3)(image, JSON.parse(JSON.stringify(jsonString)));
        });
    }
};
exports.PageSectionController = PageSectionController;
__decorate([
    (0, common_1.Get)('/homepage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PageSectionController.prototype, "getHomepageData", null);
__decorate([
    (0, common_1.Get)('/navbar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PageSectionController.prototype, "getNavbarData", null);
__decorate([
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PageSectionController.prototype, "getSectionByType", null);
__decorate([
    (0, common_1.Put)(':type'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)(pageSectionsPermissions)),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PageSectionController.prototype, "updateSectionByType", null);
__decorate([
    (0, common_1.Post)('upload-url'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PageSectionController.prototype, "getSignedUrl", null);
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'file', maxCount: 1 },
        { name: 'fileInfo', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PageSectionController.prototype, "uploadFile", null);
exports.PageSectionController = PageSectionController = __decorate([
    (0, common_1.Controller)('page-sections'),
    __metadata("design:paramtypes", [page_sections_service_1.PageSectionService])
], PageSectionController);
//# sourceMappingURL=page.sections.controller.js.map