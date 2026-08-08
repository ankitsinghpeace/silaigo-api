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
exports.PageSectionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const aws_1 = require("../../../utils/aws");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const appCache_1 = require("../../../utils/appCache");
let PageSectionService = class PageSectionService {
    constructor(pageSectionModel) {
        this.pageSectionModel = pageSectionModel;
    }
    findSectionByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.pageSectionModel
                .findOne({ type }, { _id: 0 })
                .lean();
            return doc === null || doc === void 0 ? void 0 : doc.data;
        });
    }
    getNavbarData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pageSectionModel.findOne({ type: 'navbar' }, { _id: 0 });
        });
    }
    getCompleteHomePage() {
        return __awaiter(this, void 0, void 0, function* () {
            const cached = appCache_1.appCache.get('homepage');
            if (cached) {
                console.log('CACHE HIT');
                return cached;
            }
            console.log('CACHE MISS');
            const sectionTypes = [
                'navbar',
                'hero',
                'journey',
                'achievements',
                'videos',
                'partners',
                'testimonials',
                'fnq',
            ];
            const sections = yield this.pageSectionModel
                .find({ type: { $in: sectionTypes } }, { _id: 0, type: 1, data: 1 })
                .lean();
            const homepage = {};
            sections.forEach((section) => {
                homepage[section.type] = section.data;
            });
            appCache_1.appCache.set('homepage', homepage);
            return homepage;
        });
    }
    updateSectionByType(type, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            appCache_1.appCache.del('homepage');
            return this.pageSectionModel.findOneAndUpdate({ type }, { $set: updateData }, { new: true });
        });
    }
    uploadFileService(fileInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resourceName, resourceId, fileType } = fileInfo;
            if (!resourceName || !resourceId || !fileType) {
                throw new Error('Missing required fields: resourceName, resourceId, or fileType');
            }
            const { url, key } = yield (0, aws_1.generateUploadUrl)(fileInfo);
            return { url, key };
        });
    }
};
exports.PageSectionService = PageSectionService;
exports.PageSectionService = PageSectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.PageSection.token)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PageSectionService);
//# sourceMappingURL=page.sections.service.js.map