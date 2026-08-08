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
exports.JwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwtService_1 = require("../../utils/jwtService");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../core-db/model.metadata");
let JwtMiddleware = class JwtMiddleware {
    constructor(profileModel, roleModel, permissionModel, userModel) {
        this.profileModel = profileModel;
        this.roleModel = roleModel;
        this.permissionModel = permissionModel;
        this.userModel = userModel;
    }
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.cookies['accessToken'];
                if (!accessToken) {
                    throw new common_1.UnauthorizedException('Unauthorized user');
                }
                const decoded = (0, jwtService_1.verifyJwt)(accessToken, process.env.ACCESS_TOKEN_SECRET);
                if (!decoded) {
                    throw new common_1.UnauthorizedException('Unauthorized user');
                }
                const userId = decoded.userId;
                const userRole = decoded === null || decoded === void 0 ? void 0 : decoded.role;
                if (userId && userRole) {
                    const user = yield this.userModel
                        .findOne({ _id: userId })
                        .populate({
                        path: 'role',
                        populate: {
                            path: 'permissions',
                            model: 'Permission',
                        },
                    })
                        .lean();
                    if (!user || !user.role)
                        throw new common_1.UnauthorizedException('Unauthorized user');
                    const transformedPermissions = (user.role.permissions || [])
                        .filter((perm) => typeof perm === 'object' && (perm === null || perm === void 0 ? void 0 : perm.type) && (perm === null || perm === void 0 ? void 0 : perm.subType))
                        .map((perm) => `${perm.type}.${perm.subType}`);
                    req.user = Object.assign(Object.assign({}, user), { permissions: transformedPermissions, role: user.role.code, roleId: user.role._id });
                    next();
                }
                else {
                    const user = yield this.profileModel
                        .findOne({ _id: userId })
                        .select({
                        passwordHash: 0,
                        addresses: 0,
                        savedPaymentMethods: 0,
                    })
                        .lean();
                    if (!user) {
                        throw new common_1.UnauthorizedException('Unauthorized user');
                    }
                    req.user = Object.assign(Object.assign({}, user), { role: 'customer' });
                    next();
                }
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Unauthorized user');
            }
        });
    }
};
exports.JwtMiddleware = JwtMiddleware;
exports.JwtMiddleware = JwtMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Profile.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Role.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Permission.token)),
    __param(3, (0, common_1.Inject)(model_metadata_1.ModelMetadata.User.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], JwtMiddleware);
//# sourceMappingURL=jwt.middleware.js.map