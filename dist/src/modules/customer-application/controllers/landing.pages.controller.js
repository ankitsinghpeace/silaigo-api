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
exports.LandingPagesController = void 0;
const common_1 = require("@nestjs/common");
const landing_pages_service_1 = require("../services/landing.pages.service");
let LandingPagesController = class LandingPagesController {
    constructor(landingPagesService) {
        this.landingPagesService = landingPagesService;
    }
    getLocationData(location) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.landingPagesService.getLocationData(location);
        });
    }
    getCategoryData(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.landingPagesService.getCategoryData(category);
        });
    }
    getLocationCategoryData(location, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.landingPagesService.getLocationCategoryData(location, category);
        });
    }
    getRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.landingPagesService.getRoutes();
        });
    }
};
exports.LandingPagesController = LandingPagesController;
__decorate([
    (0, common_1.Get)('location/:location'),
    __param(0, (0, common_1.Param)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LandingPagesController.prototype, "getLocationData", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LandingPagesController.prototype, "getCategoryData", null);
__decorate([
    (0, common_1.Get)('data/:location/:category'),
    __param(0, (0, common_1.Param)('location')),
    __param(1, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LandingPagesController.prototype, "getLocationCategoryData", null);
__decorate([
    (0, common_1.Get)('routes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LandingPagesController.prototype, "getRoutes", null);
exports.LandingPagesController = LandingPagesController = __decorate([
    (0, common_1.Controller)('landing-pages'),
    __metadata("design:paramtypes", [landing_pages_service_1.LandingPagesService])
], LandingPagesController);
//# sourceMappingURL=landing.pages.controller.js.map