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
exports.OrderEventsOptionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const order_enums_1 = require("../../../../core-db/enums/order.enums");
const roles_enums_1 = require("../../../../core-db/enums/roles.enums");
let OrderEventsOptionsService = class OrderEventsOptionsService {
    constructor(orderEventsOptionsModel, orderMicroEventsModel, orderModel, pickupModel, userModel) {
        this.orderEventsOptionsModel = orderEventsOptionsModel;
        this.orderMicroEventsModel = orderMicroEventsModel;
        this.orderModel = orderModel;
        this.pickupModel = pickupModel;
        this.userModel = userModel;
    }
    getEventsOptions(req, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const res = yield this.orderEventsOptionsModel.findOne({
                roleId: req.user.roleId,
            });
            const filter = { orderId: orderId, roleId: req.user.roleId };
            const alreadyAddedEventsInTimeLine = yield this.orderMicroEventsModel
                .findOne(filter, { events: 1 })
                .lean();
            if (!res.options) {
                return { aggregatedState: {}, options: [] };
            }
            const aggregatedState = {};
            res.options.map((el) => {
                aggregatedState[el.label] = el.type === 'checkbox' ? false : '';
            });
            (_a = alreadyAddedEventsInTimeLine === null || alreadyAddedEventsInTimeLine === void 0 ? void 0 : alreadyAddedEventsInTimeLine.events) === null || _a === void 0 ? void 0 : _a.map((el) => {
                aggregatedState[el.key] = el.value;
            });
            return { aggregatedState, options: res.options };
        });
    }
    addMicroEventInTimeLine(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId, events } = body;
            if (!Array.isArray(events) || events.length === 0) {
                throw new common_1.BadRequestException('events must be a non-empty array');
            }
            const session = yield this.orderModel.db.startSession();
            try {
                let res;
                yield session.withTransaction(() => __awaiter(this, void 0, void 0, function* () {
                    const order = yield this.orderModel
                        .findOne({ _id: orderId })
                        .session(session);
                    if (!order) {
                        throw new common_1.NotFoundException('order not found');
                    }
                    const deselected = events.filter(({ value }) => {
                        return value === false;
                    });
                    console.log(events);
                    for (const evt of events) {
                        const { status, key, value } = evt;
                        if (!status || !key) {
                            continue;
                        }
                        if (key === 'Cutting End' && value === true) {
                            order.isPinned = false;
                            order.pinPosition = undefined;
                        }
                        if (deselected.length === events.length) {
                            order.orderProcessingState = order_enums_1.OrderProcessingStateTimeLineMap[key];
                            console.log('updated order state to ', order.orderProcessingState);
                            break;
                        }
                        if (order_enums_1.OrderProcessingStateTimeLineMap[key]) {
                            order.orderProcessingState = order_enums_1.OrderProcessingStateTimeLineMap[key];
                            console.log('updated order state to ', order.orderProcessingState);
                        }
                    }
                    yield order.save({ session });
                    const pushEvents = events.map((evt) => ({
                        status: evt.status,
                        key: evt.key,
                        value: evt.value,
                        timeStamp: new Date(),
                        updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                        updatedByUserId: req.user._id,
                    }));
                    res = yield this.orderMicroEventsModel.updateOne({ orderId, roleId: req.user.roleId }, {
                        $setOnInsert: { orderId, roleId: req.user.roleId },
                        $push: { events: { $each: pushEvents } },
                    }, { upsert: true, session });
                }));
                return res;
            }
            finally {
                console.log('here');
                session.endSession();
            }
        });
    }
    getAggregatedTimeLine(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.orderMicroEventsModel
                .find({ orderId }, { events: 1 })
                .lean();
            if (!data || data.length === 0) {
                return [];
            }
            const mergedEvents = data
                .flatMap((doc) => doc.events || [])
                .map((event) => {
                var _a;
                return ({
                    key: event.key,
                    value: event.value,
                    status: `${event.status} : ${typeof event.value === 'boolean'
                        ? event.value
                            ? '✔️'
                            : '❌'
                        : event.value}`,
                    timeStamp: event.timeStamp,
                    updatedBy: event.updatedBy,
                    updatedByUserId: (_a = event.updatedByUserId) === null || _a === void 0 ? void 0 : _a.toString(),
                });
            })
                .sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime());
            return mergedEvents;
        });
    }
    getTimeLine(orderId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { orderId, roleId: req.user.roleId };
            const data = yield this.orderMicroEventsModel
                .findOne(filter, { events: 1 })
                .lean();
            if (!data || !data.events || data.events.length === 0) {
                return [];
            }
            return data.events.map((event) => {
                var _a;
                return ({
                    key: event.key,
                    value: event.value,
                    status: `${event.status} : ${event.value === true && typeof event.value === 'boolean'
                        ? '✔️'
                        : event.value === false && typeof event.value === 'boolean'
                            ? '❌'
                            : event.value}
`,
                    timeStamp: event.timeStamp,
                    updatedBy: event.updatedBy,
                    updatedByUserId: (_a = event.updatedByUserId) === null || _a === void 0 ? void 0 : _a.toString(),
                });
            });
        });
    }
    getUserAnalytics(userId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const user = yield this.userModel.findOne({ _id: userId }).populate("role");
            const role = user === null || user === void 0 ? void 0 : user.role.code;
            console.log(role);
            const userObjectId = new mongoose_1.Types.ObjectId(userId);
            const dateFilter = {};
            if (startDate) {
                const s = new Date(startDate);
                s.setHours(0, 0, 0, 0);
                dateFilter.$gte = s;
            }
            if (endDate) {
                const e = new Date(endDate);
                e.setHours(23, 59, 59, 999);
                dateFilter.$lte = e;
            }
            const hasDateFilter = Object.keys(dateFilter).length > 0;
            if (role === roles_enums_1.RoleCode.PICKUP_COORDINATOR || role === roles_enums_1.RoleCode.ADMIN) {
                const pickupDateMatch = {};
                if (hasDateFilter) {
                    pickupDateMatch['createdAt'] = dateFilter;
                }
                const [completedRes, pendingRes] = yield Promise.all([
                    this.pickupModel.countDocuments(Object.assign(Object.assign({}, pickupDateMatch), { 'options.label': 'Order fulfilled', 'options.value': true, 'timeline.updatedByUserId': userObjectId })),
                    this.pickupModel.countDocuments(Object.assign(Object.assign({}, pickupDateMatch), { 'options.label': 'Order fulfilled', 'options.value': false, 'timeline.updatedByUserId': userObjectId })),
                ]);
                const assigned = completedRes + pendingRes;
                return {
                    userId,
                    role,
                    analytics: {
                        assigned,
                        completed: completedRes,
                        pending: pendingRes,
                    },
                    dateRange: { startDate: startDate !== null && startDate !== void 0 ? startDate : null, endDate: endDate !== null && endDate !== void 0 ? endDate : null },
                };
            }
            if (role === roles_enums_1.RoleCode.CUTTING) {
                const cuttingStates = [
                    order_enums_1.OrderProcessingState.ORDER_FULFILLED,
                    order_enums_1.OrderProcessingState.CUTTING_END,
                    order_enums_1.OrderProcessingState.STITCHING_END,
                    order_enums_1.OrderProcessingState.PRODUCT_VERIFIED_OR_RECTIFIED,
                    order_enums_1.OrderProcessingState.MATERIAL_PACKED,
                    order_enums_1.OrderProcessingState.READY_FOR_DISPATCH,
                    order_enums_1.OrderProcessingState.ORDER_COMPLETE,
                ];
                const orderDateQuery = {
                    orderProcessingState: { $in: cuttingStates },
                };
                if (hasDateFilter) {
                    orderDateQuery['createdAt'] = dateFilter;
                }
                const microEventMatch = Object.assign({ 'events.key': 'Cutting End', 'events.value': true, 'events.updatedByUserId': userObjectId }, (hasDateFilter ? { 'events.timeStamp': dateFilter } : {}));
                const [assigned, completedAgg] = yield Promise.all([
                    this.orderModel.countDocuments(orderDateQuery),
                    this.orderMicroEventsModel.aggregate([
                        { $unwind: '$events' },
                        { $match: microEventMatch },
                        { $group: { _id: '$orderId' } },
                        { $count: 'total' },
                    ]),
                ]);
                const completed = (_b = (_a = completedAgg[0]) === null || _a === void 0 ? void 0 : _a.total) !== null && _b !== void 0 ? _b : 0;
                return {
                    userId,
                    role,
                    analytics: {
                        assigned,
                        completed,
                        pending: Math.max(0, assigned - completed),
                    },
                    dateRange: { startDate: startDate !== null && startDate !== void 0 ? startDate : null, endDate: endDate !== null && endDate !== void 0 ? endDate : null },
                };
            }
            if (role === roles_enums_1.RoleCode.STITCHING) {
                const stitchingOrderQuery = {
                    assignedToStitchingAgentId: userObjectId,
                };
                if (hasDateFilter) {
                    stitchingOrderQuery['createdAt'] = dateFilter;
                }
                const microEventMatch = Object.assign({ 'events.key': 'Stitching End', 'events.value': true, 'events.updatedByUserId': userObjectId }, (hasDateFilter ? { 'events.timeStamp': dateFilter } : {}));
                const [assigned, completedAgg] = yield Promise.all([
                    this.orderModel.countDocuments(stitchingOrderQuery),
                    this.orderMicroEventsModel.aggregate([
                        { $unwind: '$events' },
                        { $match: microEventMatch },
                        { $group: { _id: '$orderId' } },
                        { $count: 'total' },
                    ]),
                ]);
                const completed = (_d = (_c = completedAgg[0]) === null || _c === void 0 ? void 0 : _c.total) !== null && _d !== void 0 ? _d : 0;
                return {
                    userId,
                    role,
                    analytics: {
                        assigned,
                        completed,
                        pending: Math.max(0, assigned - completed),
                    },
                    dateRange: { startDate: startDate !== null && startDate !== void 0 ? startDate : null, endDate: endDate !== null && endDate !== void 0 ? endDate : null },
                };
            }
            throw new common_1.BadRequestException(`Analytics not supported for role: ${role}`);
        });
    }
};
exports.OrderEventsOptionsService = OrderEventsOptionsService;
exports.OrderEventsOptionsService = OrderEventsOptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.OrderEventsOptions.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.OrderMicroEvents.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Order.token)),
    __param(3, (0, common_1.Inject)(model_metadata_1.ModelMetadata.MaterialPickup.token)),
    __param(4, (0, common_1.Inject)(model_metadata_1.ModelMetadata.User.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], OrderEventsOptionsService);
//# sourceMappingURL=order-events-options.service.js.map