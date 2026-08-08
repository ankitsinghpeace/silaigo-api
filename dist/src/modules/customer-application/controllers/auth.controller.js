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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const auth_dto_1 = require("../dto/auth.dto");
const enums_1 = require("../../../../core-db/enums");
const get_cutomers_list_query_dto_1 = require("../dto/get-cutomers-list-query.dto");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    generateOtp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.generateOtp(body.phone);
        });
    }
    generateMasterOtp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.generateMasterOtp(body.phone);
        });
    }
    customerLogin(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.verifyOtp(body.otpId, body.otpCode, res);
        });
    }
    createProfile(profile, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.createProfile(profile, res);
        });
    }
    changePassword(payload, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.changePassword(payload);
        });
    }
    updateProfile(req, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.updateProfile(req, profile);
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.refreshToken(req, res);
        });
    }
    internalLoginHandler(req, body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.internalLogin(body, res);
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.me(req, res);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.logout(req, res);
        });
    }
    getTeamMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.getTeamMembers();
        });
    }
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.getRoles();
        });
    }
    registerTeamMember(teamMemebr) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.registerTeamMember(teamMemebr);
        });
    }
    updateTeamMember(teamMemebr, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.updateTeamMember(userId, teamMemebr);
        });
    }
    removeTeamMember(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.removeTeamMember(userId);
        });
    }
    getTeamMemberViaRoleCode(roleCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.getTeamMembersByRole(roleCode);
        });
    }
    createCustomerByAdmin(_a, res_1) {
        return __awaiter(this, arguments, void 0, function* ({ phone, firstName, lastName, gender, notes, colorCode }, res) {
            return this.authService.addCustomerByAdmin({
                phone,
                firstName,
                lastName,
                gender,
                notes,
                colorCode,
            });
        });
    }
    getCustomersList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.getCustomersList(query);
        });
    }
    deleteCustomers(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.deleteCustomers(body.customerIds);
        });
    }
    deleteOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.deleteOrder(body.orderId);
        });
    }
    editCustomer(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.editCustomer(id, body);
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('generate-otp'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateOtp", null);
__decorate([
    (0, common_1.Post)('generate-master-otp'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateMasterOtp", null);
__decorate([
    (0, common_1.Post)('customer-login'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "customerLogin", null);
__decorate([
    (0, common_1.Post)('create-profile'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.CreateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('refresh-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('internal-login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.InternalLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "internalLoginHandler", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('team-members'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ROLES}.${enums_1.PermissionSubType.VIEW}`])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getTeamMembers", null);
__decorate([
    (0, common_1.Get)('roles'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ROLES}.${enums_1.PermissionSubType.VIEW}`])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Post)('team-members'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ROLES}.${enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.TeamMemberRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerTeamMember", null);
__decorate([
    (0, common_1.Put)('team-members/:userId'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ROLES}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateTeamMember", null);
__decorate([
    (0, common_1.Delete)('team-members/:userId'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ROLES}.${enums_1.PermissionSubType.DELETE}`])),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "removeTeamMember", null);
__decorate([
    (0, common_1.Get)('team-members-via-role/:roleCode'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.VIEW}`])),
    __param(0, (0, common_1.Param)('roleCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getTeamMemberViaRoleCode", null);
__decorate([
    (0, common_1.Post)('customers'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.CUSTOMERS}.${enums_1.PermissionSubType.CREATE}`,
    ])),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createCustomerByAdmin", null);
__decorate([
    (0, common_1.Get)('customers'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CUSTOMERS}.${enums_1.PermissionSubType.VIEW}`])),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_cutomers_list_query_dto_1.GetCustomersQueryListDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCustomersList", null);
__decorate([
    (0, common_1.Delete)('customers'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.CUSTOMERS}.${enums_1.PermissionSubType.DELETE}`,
    ])),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteCustomers", null);
__decorate([
    (0, common_1.Delete)('orders'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.ORDER}.${enums_1.PermissionSubType.DELETE}`])),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Put)('customers/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${enums_1.PermissionType.CUSTOMERS}.${enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "editCustomer", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map