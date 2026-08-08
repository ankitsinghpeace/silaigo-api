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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("../services/appointments.service");
const appointments_dto_1 = require("../dto/appointments.dto");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
const enums_1 = require("../../../../core-db/enums");
let AppointmentsController = class AppointmentsController {
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    getAvailableSlots(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentsService.getAvailableSlots(date);
        });
    }
    bookSlot(body, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentsService.bookSlot(body.dateStr, body.time, body.orderId, req, body.notes, body.addressId, body.impersonateUserId);
        });
    }
    getGlobalSchedule() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentsService.getGlobalSchedule();
        });
    }
    updateSchedule(scheduleId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentsService.updateSchedule(scheduleId, body);
        });
    }
    addAvailabilityOverride(body_1) {
        return __awaiter(this, arguments, void 0, function* (body, clearPrevious = false) {
            return this.appointmentsService.addAvailabilityOverride(body, Boolean(clearPrevious));
        });
    }
    getAllAvailabilityOverrides() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentsService.getAllAvailabilityOverrides();
        });
    }
    updateAvailabilityOverride(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentsService.updateAvailabilityOverride(id, body);
        });
    }
    deleteAvailabilityOverride(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentsService.deleteAvailabilityOverride(id);
        });
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Get)('slots'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Post)('book'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "bookSlot", null);
__decorate([
    (0, common_1.Get)('schedule'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.APPOINTMENTS}.${enums_1.PermissionSubType.VIEW}`,
    ])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getGlobalSchedule", null);
__decorate([
    (0, common_1.Put)('schedule/:scheduleId'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.APPOINTMENTS}.${enums_1.PermissionSubType.EDIT}`,
    ])),
    __param(0, (0, common_1.Param)('scheduleId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, appointments_dto_1.UpdateScheduleDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "updateSchedule", null);
__decorate([
    (0, common_1.Post)('availability-overrides'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.APPOINTMENTS}.${enums_1.PermissionSubType.CREATE}`,
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('clearPrevious')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointments_dto_1.CreateAvailabilityOverrideDto, Boolean]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "addAvailabilityOverride", null);
__decorate([
    (0, common_1.Get)('availability-overrides'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.APPOINTMENTS}.${enums_1.PermissionSubType.VIEW}`,
    ])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAllAvailabilityOverrides", null);
__decorate([
    (0, common_1.Put)('availability-overrides/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.APPOINTMENTS}.${enums_1.PermissionSubType.EDIT}`,
    ])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, appointments_dto_1.CreateAvailabilityOverrideDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "updateAvailabilityOverride", null);
__decorate([
    (0, common_1.Delete)('availability-overrides/:id'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([
        `${enums_1.PermissionType.APPOINTMENTS}.${enums_1.PermissionSubType.DELETE}`,
    ])),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "deleteAvailabilityOverride", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map