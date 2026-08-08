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
exports.MetaMasterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const moment = require("moment-timezone");
const payment_enums_1 = require("../../../../core-db/enums/payment.enums");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const enums_1 = require("../../../../core-db/enums");
let MetaMasterService = class MetaMasterService {
    constructor(metaModel, orderModel) {
        this.metaModel = metaModel;
        this.orderModel = orderModel;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.metaModel.find();
            }
            catch (error) {
                throw new Error(`Error fetching all metadata: ${error.message}`);
            }
        });
    }
    findDistinctTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.metaModel.distinct('type', { isActive: true });
            }
            catch (error) {
                throw new Error(`Error fetching distinct label types: ${error.message}`);
            }
        });
    }
    findMetaType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.metaModel.find({ type: type, isActive: true }).exec();
            }
            catch (error) {
                throw new Error(`Error fetching meta data for type "${type}": ${error.message}`);
            }
        });
    }
    addCoupon(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const coupon = yield this.metaModel.findOne({ label: dto.label });
            if (coupon) {
                throw new common_1.BadRequestException('Coupon already exists');
            }
            if (dto.subType !== payment_enums_1.CouponSubType.PRICE_REDUCTION &&
                dto.subType !== payment_enums_1.CouponSubType.PERCENTAGE_REDUCTION) {
                throw new common_1.BadRequestException('Invalid coupon sub type');
            }
            if (!((_a = dto.value) === null || _a === void 0 ? void 0 : _a.expiryDate) || !((_b = dto.value) === null || _b === void 0 ? void 0 : _b.amount) || dto.value.amount <= 0) {
                throw new common_1.BadRequestException('Expiry date and amount are required');
            }
            const date = moment
                .tz((_c = dto.value) === null || _c === void 0 ? void 0 : _c.expiryDate, 'Asia/Kolkata')
                .startOf('day');
            const utcDate = moment(date).utc().toDate();
            if (utcDate < new Date()) {
                throw new common_1.BadRequestException('Expiry date is in the past');
            }
            if (dto.value.amount <= 0) {
                throw new common_1.BadRequestException('Amount cannot be negative or zero');
            }
            return yield this.metaModel.create(Object.assign(Object.assign({}, dto), { value: Object.assign(Object.assign({}, dto.value), { expiryDate: utcDate }) }));
        });
    }
    updateCoupon(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const coupon = yield this.metaModel.findById(id);
            if (!coupon) {
                throw new common_1.BadRequestException('Coupon not found');
            }
            if (dto.subType !== payment_enums_1.CouponSubType.PRICE_REDUCTION &&
                dto.subType !== payment_enums_1.CouponSubType.PERCENTAGE_REDUCTION) {
                throw new common_1.BadRequestException('Invalid coupon sub type');
            }
            if (!((_a = dto.value) === null || _a === void 0 ? void 0 : _a.expiryDate) || !((_b = dto.value) === null || _b === void 0 ? void 0 : _b.amount) || dto.value.amount <= 0) {
                throw new common_1.BadRequestException('Expiry date and amount are required');
            }
            const date = moment
                .tz((_c = dto.value) === null || _c === void 0 ? void 0 : _c.expiryDate, 'Asia/Kolkata')
                .startOf('day');
            const utcDate = moment(date).utc().toDate();
            if (utcDate < new Date()) {
                throw new common_1.BadRequestException('Expiry date is in the past');
            }
            return yield this.metaModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, dto), { value: Object.assign(Object.assign({}, dto.value), { expiryDate: utcDate }) }), { new: true });
        });
    }
    deleteCoupon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const coupon = yield this.metaModel.findById(id);
            if (!coupon) {
                throw new common_1.BadRequestException('Coupon not found');
            }
            return yield this.metaModel.findByIdAndDelete(id);
        });
    }
    validateCoupon(_a, req_1) {
        return __awaiter(this, arguments, void 0, function* ({ couponCode, amount }, req) {
            const coupon = yield this.metaModel.findOne({ label: couponCode });
            if (!coupon) {
                throw new common_1.BadRequestException('Coupon not found');
            }
            if (coupon.value.expiryDate < new Date() || !coupon.isActive) {
                throw new common_1.BadRequestException('Coupon has expired');
            }
            if (coupon.value.amount <= 0) {
                throw new common_1.BadRequestException('Coupon amount is not valid');
            }
            const ordersCount = yield this.orderModel.countDocuments({
                profile: req.user._id,
                status: enums_1.OrderStatus.COMPLETED,
            });
            const maxDiscount = coupon.value.maxDiscount
                ? parseFloat(coupon.value.maxDiscount)
                : 0;
            if (coupon.value.nthOrder && coupon.value.nthOrder > 0) {
                if (ordersCount !== coupon.value.nthOrder) {
                    throw new common_1.BadRequestException('You are not eligible for this coupon on this order');
                }
            }
            if (coupon.value.minOrderValue && amount < coupon.value.minOrderValue) {
                throw new common_1.BadRequestException('This coupon valid for order amount greater than ' +
                    coupon.value.minOrderValue);
            }
            if (coupon.subType === payment_enums_1.CouponSubType.PRICE_REDUCTION) {
                const couponAmount = parseFloat(coupon.value.amount);
                const discount = Math.min(couponAmount, amount);
                return {
                    discount: maxDiscount > 0 ? Math.min(discount, maxDiscount) : discount,
                    code: couponCode,
                };
            }
            if (coupon.subType === payment_enums_1.CouponSubType.PERCENTAGE_REDUCTION) {
                const couponAmount = parseFloat(coupon.value.amount);
                const discount = parseFloat(((amount * couponAmount) / 100).toFixed(2));
                return {
                    discount: maxDiscount > 0 ? Math.min(discount, maxDiscount) : discount,
                    code: couponCode,
                };
            }
            return {
                discount: 0,
                code: couponCode,
            };
        });
    }
    listEligibleCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                isActive: true,
                type: 'coupon',
                'value.isVisible': true,
                'value.expiryDate': { $gte: new Date() },
            };
            const coupons = yield this.metaModel.find(query);
            const couponList = coupons.map((coupon) => {
                const code = coupon.label;
                const maxDiscount = coupon.value.maxDiscount && coupon.value.maxDiscount > 0
                    ? parseFloat(coupon.value.maxDiscount)
                    : 'N/A';
                const amount = coupon.value.amount;
                const validTill = coupon.value.expiryDate;
                const minOrderValue = coupon.value.minOrderValue || 'N/A';
                const nthOrder = coupon.value.nthOrder;
                return {
                    code,
                    maxDiscount,
                    amount: coupon.subType === payment_enums_1.CouponSubType.PRICE_REDUCTION
                        ? 'Rs.' + amount
                        : amount + '%',
                    validTill,
                    minOrderValue,
                    nthOrder,
                };
            });
            return {
                couponList,
            };
        });
    }
    getMetaMasterList(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 50, search, sortBy = 'newest', type = 'coupon', } = options;
            const pageLimit = Math.min(limit, 50);
            const currentPage = Math.max(1, page);
            const skip = (currentPage - 1) * pageLimit;
            let query = {};
            if (search) {
                query.$or = [
                    { label: { $regex: search, $options: 'i' } },
                    { subType: { $regex: search, $options: 'i' } },
                ];
            }
            if (type) {
                query.type = type;
            }
            const isNewest = sortBy === 'newest';
            const sortDirection = isNewest ? -1 : 1;
            const sort = { _id: sortDirection };
            const total = yield this.metaModel.countDocuments(query);
            const items = yield this.metaModel
                .find(query)
                .sort(sort)
                .skip(skip)
                .limit(pageLimit)
                .lean();
            const totalPages = Math.ceil(total / pageLimit);
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            return {
                items,
                pagination: {
                    currentPage,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    total,
                    count: items.length,
                    limit: pageLimit,
                    nextPage: hasNextPage ? currentPage + 1 : null,
                    prevPage: hasPrevPage ? currentPage - 1 : null,
                },
                filters: {
                    search,
                    sortBy,
                },
            };
        });
    }
};
exports.MetaMasterService = MetaMasterService;
exports.MetaMasterService = MetaMasterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.MetaMaster.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Order.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], MetaMasterService);
//# sourceMappingURL=metamaster.service.js.map