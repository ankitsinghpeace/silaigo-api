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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const order_enums_1 = require("../../../../core-db/enums/order.enums");
const { ObjectId } = mongoose_1.default.Types;
let AppointmentsService = class AppointmentsService {
    constructor(appointmentModel, scheduleModel, availabilityModel, orderModel) {
        this.appointmentModel = appointmentModel;
        this.scheduleModel = scheduleModel;
        this.availabilityModel = availabilityModel;
        this.orderModel = orderModel;
    }
    normailizeDate(dateStr) {
        const date = new Date(`${dateStr}T00:00:00.000Z`);
        if (isNaN(date.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        return date;
    }
    getDayName(date) {
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        return days[date.getUTCDay()];
    }
    getFallbackSlots(date) {
        const fallbackSlots = [];
        for (let hour = 10; hour <= 17; hour++) {
            fallbackSlots.push({
                time: `${hour.toString().padStart(2, '0')}:00`,
                available: false,
                remaining: -1,
            });
        }
        return fallbackSlots;
    }
    getAvailableSlots(dateStr) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const date = this.normailizeDate(dateStr);
            const dayName = this.getDayName(date);
            const schedule = yield this.scheduleModel.findOne({ isActive: true });
            if (!schedule)
                throw new common_1.NotFoundException('No active schedule found');
            if (!schedule.workingDays.includes(dayName)) {
                return this.getFallbackSlots(date);
            }
            const availability = yield this.availabilityModel
                .findOne({
                date,
            })
                .lean();
            if (availability && availability.type === 'HOLIDAY') {
                return this.getFallbackSlots(date);
            }
            let startTime, endTime, slotInterval, maxAppointmentsPerSlot, slotOverrides = {};
            if (availability && availability.type === 'CUSTOM') {
                startTime =
                    ((_a = availability.workingHours) === null || _a === void 0 ? void 0 : _a.startTime) || schedule.dailyHours.startTime;
                endTime =
                    ((_b = availability.workingHours) === null || _b === void 0 ? void 0 : _b.endTime) || schedule.dailyHours.endTime;
                slotOverrides = availability.slots || {};
            }
            else {
                startTime = schedule.dailyHours.startTime;
                endTime = schedule.dailyHours.endTime;
            }
            slotInterval = schedule.slotIntervalMinutes;
            maxAppointmentsPerSlot = schedule.maxAppointmentsPerSlot;
            const slots = [];
            let [h, m] = startTime.split(':').map(Number);
            const [endH, endM] = endTime.split(':').map(Number);
            while (h < endH || (h === endH && m < endM)) {
                const slotTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                const slotOverride = slotOverrides[slotTime];
                const isBlocked = (slotOverride === null || slotOverride === void 0 ? void 0 : slotOverride.isBlocked) === true;
                const slotMax = (slotOverride === null || slotOverride === void 0 ? void 0 : slotOverride.maxAppointments) || maxAppointmentsPerSlot;
                if (!isBlocked) {
                    const count = yield this.appointmentModel.countDocuments({
                        date,
                        time: slotTime,
                        status: 'BOOKED',
                    });
                    slots.push({
                        time: slotTime,
                        available: count < slotMax,
                        remaining: Math.max(0, slotMax - count),
                    });
                }
                m += slotInterval;
                if (m >= 60) {
                    h += Math.floor(m / 60);
                    m = m % 60;
                }
            }
            return slots;
        });
    }
    bookSlot(dateStr, time, orderId, req, notes, addressId, impersonateUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const order = yield this.orderModel.findById(orderId);
            if (!order)
                throw new common_1.NotFoundException('Order not found');
            if (order.appointment) {
                throw new common_1.BadRequestException('Order already has an appointment');
            }
            const date = this.normailizeDate(dateStr);
            const schedule = yield this.scheduleModel.findOne({ isActive: true });
            if (!schedule)
                throw new common_1.NotFoundException('No active schedule found');
            const availability = yield this.availabilityModel
                .findOne({
                date,
            })
                .lean();
            if (availability && availability.type === 'HOLIDAY') {
                throw new common_1.BadRequestException('Cannot book on a holiday');
            }
            let startTime, endTime, slotInterval, maxAppointmentsPerSlot, slotOverrides = {};
            if (availability && availability.type === 'CUSTOM') {
                startTime =
                    ((_a = availability.workingHours) === null || _a === void 0 ? void 0 : _a.startTime) || schedule.dailyHours.startTime;
                endTime =
                    ((_b = availability.workingHours) === null || _b === void 0 ? void 0 : _b.endTime) || schedule.dailyHours.endTime;
                slotOverrides = availability.slots || {};
            }
            else {
                startTime = schedule.dailyHours.startTime;
                endTime = schedule.dailyHours.endTime;
                slotOverrides = {};
            }
            slotInterval = schedule.slotIntervalMinutes;
            maxAppointmentsPerSlot = schedule.maxAppointmentsPerSlot;
            const [slotHour, slotMinute] = time.split(':').map(Number);
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);
            const slotDate = new Date(date);
            slotDate.setHours(slotHour, slotMinute, 0, 0);
            const startDate = new Date(date);
            startDate.setHours(startHour, startMinute, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(endHour, endMinute, 0, 0);
            if (slotDate < startDate || slotDate >= endDate) {
                throw new common_1.BadRequestException('Selected time is outside working hours');
            }
            let slotOverride = slotOverrides[time];
            if (slotOverride && slotOverride.isBlocked) {
                throw new common_1.BadRequestException('This slot is blocked');
            }
            const slotMax = (slotOverride === null || slotOverride === void 0 ? void 0 : slotOverride.maxAppointments) || maxAppointmentsPerSlot;
            const session = yield this.appointmentModel.db.startSession();
            session.startTransaction();
            try {
                const count = yield this.appointmentModel
                    .countDocuments({
                    date,
                    time,
                    status: 'BOOKED',
                })
                    .session(session);
                if (count >= slotMax) {
                    throw new common_1.BadRequestException('This slot is already full');
                }
                console.log(impersonateUserId);
                const userId = req.user.role != 'customer' ? impersonateUserId : req.user._id;
                const appointment = yield this.appointmentModel.create([
                    {
                        profile: userId,
                        order: new ObjectId(orderId),
                        date,
                        time,
                        status: 'BOOKED',
                        notes,
                    },
                ], { session });
                yield this.orderModel.findByIdAndUpdate(orderId, {
                    appointment: appointment[0]._id,
                    status: order_enums_1.OrderStatus.PAYMENT_PENDING,
                    addressId: addressId,
                    $push: {
                        timeLine: {
                            status: order_enums_1.OrderTimeLine.APPOINTMENT_BOOKED,
                            timeStamp: new Date(),
                            updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                            updatedByUserId: req.user._id,
                        },
                    },
                }, { session });
                yield session.commitTransaction();
                return appointment[0];
            }
            catch (err) {
                yield session.abortTransaction();
                throw err;
            }
            finally {
                session.endSession();
            }
        });
    }
    getGlobalSchedule() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.scheduleModel.findOne({ isActive: true });
        });
    }
    updateSchedule(scheduleId, schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.scheduleModel.findByIdAndUpdate(scheduleId, schedule, {
                new: true,
            });
        });
    }
    addAvailabilityOverride(dto_1) {
        return __awaiter(this, arguments, void 0, function* (dto, clearPrevious = false) {
            if (clearPrevious) {
                yield this.availabilityModel.deleteMany({
                    date: {
                        $lt: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                });
            }
            const dateObj = new Date(dto.date);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            return this.availabilityModel.create({
                date: this.normailizeDate(dateStr),
                type: dto.type,
                workingHours: dto.workingHours,
                slots: dto.slots,
                reason: dto.reason,
            });
        });
    }
    getAllAvailabilityOverrides() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.availabilityModel.find({}).lean();
        });
    }
    updateAvailabilityOverride(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateObj = new Date(dto.date);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            return this.availabilityModel.findByIdAndUpdate(id, {
                date: this.normailizeDate(dateStr),
                type: dto.type,
                workingHours: dto.workingHours,
                slots: dto.slots,
                reason: dto.reason,
            }, { new: true });
        });
    }
    deleteAvailabilityOverride(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.availabilityModel.findByIdAndDelete(id);
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Appointment.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Schedule.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Availability.token)),
    __param(3, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Order.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map