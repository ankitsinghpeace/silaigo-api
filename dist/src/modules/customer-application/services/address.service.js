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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
let AddressService = class AddressService {
    constructor(addressModel, profileModel) {
        this.addressModel = addressModel;
        this.profileModel = profileModel;
    }
    createAddress(addressDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (addressDto.isDefault) {
                const existingAddress = yield this.addressModel.findOne({
                    profile: req.user._id,
                    isDefault: true,
                });
                if (existingAddress) {
                    existingAddress.isDefault = false;
                    yield existingAddress.save();
                }
            }
            const address = new this.addressModel(Object.assign(Object.assign({}, addressDto), { profile: req.user.role != 'customer'
                    ? addressDto.impersonateUserId
                    : req.user._id }));
            return address.save();
        });
    }
    findAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.addressModel.find({ profile: req.user._id });
        });
    }
    removeAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.addressModel.findByIdAndDelete(id);
        });
    }
    updateAddress(id, addressDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (addressDto.isDefault) {
                const existingAddress = yield this.addressModel.findOne({
                    profile: req.user._id,
                    isDefault: true,
                });
                if (existingAddress) {
                    existingAddress.isDefault = false;
                    yield existingAddress.save();
                }
            }
            return yield this.addressModel.findByIdAndUpdate(id, addressDto);
        });
    }
    getAddressViaPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.profileModel.findOne({
                phone: phone,
            });
            if (!customer) {
                throw new common_1.NotFoundException('customer not exist');
            }
            const existingAddress = yield this.addressModel
                .findOne({
                profile: customer._id,
            })
                .lean();
            if (existingAddress) {
                return Object.assign(Object.assign({}, existingAddress), { firstName: customer.firstName, lastName: customer.lastName });
            }
            return null;
        });
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Address.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Profile.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], AddressService);
//# sourceMappingURL=address.service.js.map