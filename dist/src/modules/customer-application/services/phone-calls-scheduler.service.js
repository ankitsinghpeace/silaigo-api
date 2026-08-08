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
exports.CreatePhoneCallService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const moment = require("moment-timezone");
const phoneCall_scheduler_status_1 = require("../../../../core-db/enums/phoneCall.scheduler.status");
let CreatePhoneCallService = class CreatePhoneCallService {
    constructor(PhoneCallSchedulerModel, categoryModel) {
        this.PhoneCallSchedulerModel = PhoneCallSchedulerModel;
        this.categoryModel = categoryModel;
    }
    createPhoneCallAppointment(dto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.PhoneCallSchedulerModel.findOne({
                profile: req.user._id,
                callStatus: phoneCall_scheduler_status_1.PhoneCallStatus.PENDING,
                orderInitiationStatus: phoneCall_scheduler_status_1.OrderInitiationStatus.PENDING,
            });
            const appointmentDate = moment.tz(dto.appointmentDate, 'Asia/Kolkata');
            const utcDate = moment(appointmentDate).utc().toDate();
            const now = moment().tz('Asia/Kolkata');
            const isPastDate = appointmentDate.isBefore(now);
            if (isPastDate) {
                throw new common_1.BadRequestException('Cannot schedule appointment in the past');
            }
            const cat = yield this.categoryModel.findOne({ id: dto.category });
            if (!cat) {
                throw new common_1.BadRequestException('Invalis selected category');
            }
            if (isExist) {
                isExist.appointmentDate = utcDate;
                isExist.category = cat._id;
                isExist.notes = dto.notes;
                yield isExist.save();
                return isExist;
            }
            return this.PhoneCallSchedulerModel.create(Object.assign(Object.assign({}, dto), { profile: req.user._id, appointmentDate: utcDate, category: cat._id }));
        });
    }
    getAllCallsList(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { categoryName, customerPhone, sortBy = 'newest', appointmentDate, page = 1, limit = 20, callStatus, orderStatus, } = dto;
            const pageLimit = Math.min(Number(limit), 50);
            const currentPage = Math.max(1, Number(page));
            const skip = (currentPage - 1) * pageLimit;
            const query = {};
            if (appointmentDate) {
                const startOfDay = new Date(appointmentDate + 'T00:00:00.000Z');
                const endOfDay = new Date(appointmentDate + 'T23:59:59.999Z');
                query.appointmentDate = {
                    $gte: startOfDay,
                    $lte: endOfDay,
                };
            }
            if (callStatus) {
                query.callStatus = callStatus;
            }
            if (orderStatus) {
                query.orderInitiationStatus = orderStatus;
            }
            const sortOptions = {
                newest: { createdAt: -1 },
                oldest: { createdAt: 1 },
                appointmentDate: { appointmentDate: 1 },
            };
            const pipeline = [
                { $match: query },
                {
                    $lookup: {
                        from: 'profiles',
                        localField: 'profile',
                        foreignField: '_id',
                        as: 'profile',
                        pipeline: [
                            ...(customerPhone ? [{ $match: { phone: customerPhone } }] : []),
                            { $project: { phone: 1, firstName: 1, lastName: 1 } },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category',
                        pipeline: [
                            ...(categoryName
                                ? [
                                    {
                                        $match: {
                                            name: { $regex: categoryName, $options: 'i' },
                                        },
                                    },
                                ]
                                : []),
                            { $project: { name: 1, id: 1 } },
                        ],
                    },
                },
                ...(customerPhone
                    ? [{ $match: { 'profile.0': { $exists: true } } }]
                    : []),
                ...(categoryName
                    ? [{ $match: { 'category.0': { $exists: true } } }]
                    : []),
                {
                    $addFields: {
                        profile: { $arrayElemAt: ['$profile', 0] },
                        category: { $arrayElemAt: ['$category', 0] },
                    },
                },
                { $sort: sortOptions[sortBy] || sortOptions.newest },
                {
                    $facet: {
                        data: [{ $skip: skip }, { $limit: pageLimit }],
                        count: [{ $count: 'total' }],
                    },
                },
            ];
            const [result] = yield this.PhoneCallSchedulerModel.aggregate(pipeline);
            const calls = result.data;
            const totalCount = ((_a = result.count[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
            const totalPages = Math.ceil(totalCount / pageLimit);
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            return {
                calls,
                pagination: {
                    currentPage,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    count: totalCount,
                    limit: pageLimit,
                    nextPage: hasNextPage ? currentPage + 1 : null,
                    prevPage: hasPrevPage ? currentPage - 1 : null,
                },
                filters: {
                    customerPhone,
                    appointmentDate,
                    sortBy,
                    categoryName,
                },
            };
        });
    }
    updateCall(callId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const allowedFields = ['callStatus', 'orderInitiationStatus'];
            const filteredUpdates = Object.keys(updates)
                .filter((key) => allowedFields.includes(key))
                .reduce((obj, key) => {
                obj[key] = updates[key];
                return obj;
            }, {});
            return this.PhoneCallSchedulerModel.findOneAndUpdate({ _id: callId }, { $set: filteredUpdates }, { new: true, lean: true });
        });
    }
};
exports.CreatePhoneCallService = CreatePhoneCallService;
exports.CreatePhoneCallService = CreatePhoneCallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.PhoneCallScheduler.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Category.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], CreatePhoneCallService);
//# sourceMappingURL=phone-calls-scheduler.service.js.map