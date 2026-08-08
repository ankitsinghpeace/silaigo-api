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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwtService_1 = require("../../../utils/jwtService");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const redis_service_1 = require("../../../core/redis/redis.service");
const uuid_1 = require("uuid");
const otp_service_1 = require("./otp.service");
const sendEmail_1 = require("../../../utils/sendEmail");
const REFRESH_TOKEN_EXPIRY_TIME = 7 * 86400;
let AuthService = class AuthService {
    constructor(userModel, appointmentModel, orderModel, paymentModel, profileModel, roleModel, permissionModel, redisService, otpService, addressModel) {
        this.userModel = userModel;
        this.appointmentModel = appointmentModel;
        this.orderModel = orderModel;
        this.paymentModel = paymentModel;
        this.profileModel = profileModel;
        this.roleModel = roleModel;
        this.permissionModel = permissionModel;
        this.redisService = redisService;
        this.otpService = otpService;
        this.addressModel = addressModel;
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.hash(password, 10);
        });
    }
    comparePassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(password, hash);
        });
    }
    getTokens(userId, role) {
        const accessToken = role
            ? (0, jwtService_1.signJwt)({ userId, role }, '10d')
            : (0, jwtService_1.signJwt)({ userId }, '10d');
        const refreshToken = role
            ? (0, jwtService_1.signJwt)({ userId, role }, '10d', process.env.REFRESH_TOKEN_SECRET)
            : (0, jwtService_1.signJwt)({ userId }, '10d', process.env.REFRESH_TOKEN_SECRET);
        return {
            accessToken,
            refreshToken,
            atExpiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            rtExpiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        };
    }
    storeRefreshToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisService.set(`refresh_token_${userId}`, token, REFRESH_TOKEN_EXPIRY_TIME);
        });
    }
    formatCustomer(user) {
        return {
            userId: user._id,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            email: user.email,
            role: 'customer',
            permissions: [],
            birthDate: user.birthDate,
            referralCode: user.referralCode,
            referredBy: user.referredBy,
            createdAt: user.createdAt,
            notes: user.notes,
            address: user.address,
            colorCode: user.colorCode,
        };
    }
    formatTeamMember(user) {
        return {
            userId: user._id,
            email: user.email,
            phone: user.phone,
            role: user.role.code,
            firstName: user.firstName,
            lastName: user.lastName,
            joiningDate: user.joiningDate,
            designation: user.designation,
            empId: user.empId,
        };
    }
    generateOtp(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const canSend = yield this.otpService.canSendOtp(phone);
            if (!canSend) {
                throw new common_1.BadRequestException('Please wait before requesting another OTP');
            }
            const { code, otpKey } = yield this.otpService.generateOtp({
                phone,
                isMasterLogin: false,
            });
            return {
                message: 'OTP generated',
                status: true,
                otpId: otpKey,
            };
        });
    }
    generateMasterOtp(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const canSend = yield this.otpService.canSendOtp(phone);
            if (!canSend) {
                throw new common_1.BadRequestException('Please wait before requesting another OTP');
            }
            const { code, otpKey } = yield this.otpService.generateOtp({
                phone,
                isMasterLogin: true,
            });
            return {
                message: 'OTP generated',
                status: true,
                otpId: otpKey,
            };
        });
    }
    verifyOtp(otpId, otpCode, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValid = yield this.otpService.verifyOtp(otpId, otpCode);
            if (!isValid) {
                throw new common_1.BadRequestException('Invalid or expired OTP');
            }
            const phone = otpId.replace('otp:', '');
            const user = yield this.profileModel.findOne({ phone }).lean();
            if (user) {
                const tokens = this.getTokens(user._id.toString());
                yield this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
                const userData = this.formatCustomer(user);
                res.cookie('accessToken', tokens.accessToken, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 2 * 60 * 60 * 1000,
                });
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                return res.json({
                    data: {
                        user: userData,
                        newUser: false,
                        status: true,
                        registrationToken: null,
                    },
                });
            }
            const registrationToken = (0, uuid_1.v4)();
            yield this.redisService.set(`registration_token:${phone}`, registrationToken, 1 * 60 * 60);
            return res.json({
                data: {
                    registrationToken,
                    status: true,
                    newUser: true,
                    user: null,
                },
            });
        });
    }
    createProfile(dto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedRegistrationToken = yield this.redisService.get(`registration_token:${dto.phone}`);
            if (!storedRegistrationToken ||
                storedRegistrationToken !== dto.registrationToken)
                throw new common_1.BadRequestException('Invalid or expired registration token');
            const user = yield this.profileModel.findOne({ phone: dto.phone });
            if (user)
                throw new common_1.NotFoundException('Profile already exists');
            const profile = yield this.profileModel.create({
                phone: dto.phone,
                firstName: dto.firstName,
                lastName: dto.lastName,
                gender: dto.gender,
                referralCode: dto.referralCode || '',
                referredBy: dto.referredBy || '',
            });
            const tokens = this.getTokens(profile._id.toString());
            yield this.storeRefreshToken(profile._id.toString(), tokens.refreshToken);
            yield this.redisService.del(`registration_token:${dto.phone}`);
            yield this.redisService.clearCustomerListCache();
            res.cookie('accessToken', tokens.accessToken, {
                httpOnly: false,
                secure: false,
                maxAge: 2 * 60 * 60 * 1000,
            });
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: false,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            void (0, sendEmail_1.sendMail)({
                to: process.env.ADMIN_EMAIL,
                subject: 'New Customer Registered',
                html: `
    <h3>New Customer Registration</h3>
    <p>A new customer has registered.</p>
    <table cellpadding="6" cellspacing="0">
      <tr>
        <td><strong>Name</strong></td>
        <td>${dto.firstName} ${dto.lastName}</td>
      </tr>
      <tr>
        <td><strong>Gender</strong></td>
        <td>${dto.gender}</td>
      </tr>
      <tr>
        <td><strong>Phone</strong></td>
        <td>${dto.phone.slice(0, 2)}******${dto.phone.slice(-2)}</td>
      </tr>
    </table>
    <p>
      <a href="https://silaigo.com/admin/customers">
        View customer details →
      </a>
    </p>
  `,
            }).catch((err) => {
                console.error('Admin user registration notification failed:', err);
            });
            return {
                user: this.formatCustomer(profile),
                status: true,
            };
        });
    }
    updateProfile(req, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user.role) {
                throw new common_1.BadRequestException('Please request admin to update profile');
            }
            const user = yield this.profileModel.findById(req.user._id);
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const updateData = Object.entries(dto).reduce((acc, [key, value]) => {
                if (value !== undefined && value !== null) {
                    acc[key] = value;
                }
                return acc;
            }, {});
            if (Object.keys(updateData).length === 0) {
                throw new common_1.BadRequestException('No valid fields to update');
            }
            const updated = yield this.profileModel
                .findOneAndUpdate({ _id: user._id }, { $set: updateData }, { new: true })
                .lean();
            if (!updated)
                throw new common_1.NotFoundException('Profile not found');
            yield this.redisService.clearCustomerListCache();
            return { message: 'Profile updated', user: this.formatCustomer(updated) };
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rt = req.cookies.refreshToken;
            if (!rt)
                throw new common_1.UnauthorizedException();
            const decoded = (0, jwtService_1.verifyJwt)(rt, process.env.REFRESH_TOKEN_SECRET);
            const stored = yield this.redisService.get(`refresh_token_${decoded.userId}`);
            let tokens;
            if (decoded.role) {
                const user = yield this.userModel.findById(decoded.userId).lean();
                if (!user)
                    throw new common_1.UnauthorizedException('User not found');
                const role = yield this.roleModel.findOne({ _id: user.role }).lean();
                if (!role)
                    throw new common_1.UnauthorizedException('Invalid credentials');
                tokens = this.getTokens(user._id, role.code);
                yield this.storeRefreshToken(user._id, tokens.refreshToken);
            }
            else {
                if (!stored || stored !== rt)
                    throw new common_1.UnauthorizedException('Invalid refresh token');
                const user = yield this.profileModel.findById(decoded.userId).lean();
                if (!user)
                    throw new common_1.UnauthorizedException('User not found');
                tokens = this.getTokens(user._id);
                yield this.storeRefreshToken(user._id, tokens.refreshToken);
            }
            res.cookie('accessToken', tokens.accessToken, {
                httpOnly: false,
                secure: false,
                maxAge: 2 * 24 * 60 * 60 * 1000,
            });
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: false,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user.role != 'customer') {
                const user = yield this.userModel
                    .findOne({ email: req.user.email })
                    .populate({
                    path: 'role',
                    populate: {
                        path: 'permissions',
                        model: 'Permission',
                    },
                })
                    .lean();
                if (!user || !user.role) {
                    throw new common_1.UnauthorizedException('Invalid credentials');
                }
                const transformedPermissions = (user.role.permissions || [])
                    .filter((perm) => typeof perm === 'object' && (perm === null || perm === void 0 ? void 0 : perm.type) && (perm === null || perm === void 0 ? void 0 : perm.subType))
                    .map((perm) => `${perm.type}.${perm.subType}`);
                const tokens = this.getTokens(user._id, user.role.code);
                yield this.storeRefreshToken(user._id, tokens.refreshToken);
                res.cookie('accessToken', tokens.accessToken, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 10 * 24 * 60 * 60 * 1000,
                });
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 10 * 24 * 60 * 60 * 1000,
                });
                return {
                    user: Object.assign(Object.assign({}, this.formatTeamMember(user)), { permissions: transformedPermissions }),
                };
            }
            else {
                const user = yield this.profileModel.findById(req.user._id).lean();
                if (!user)
                    throw new common_1.UnauthorizedException('User not found');
                const tokens = this.getTokens(user._id.toString());
                yield this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
                const userData = this.formatCustomer(user);
                res.cookie('accessToken', tokens.accessToken, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 2 * 60 * 60 * 1000,
                });
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                return res.json({
                    data: {
                        user: this.formatCustomer(user),
                    },
                });
            }
        });
    }
    internalLogin(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel
                .findOne({ email: data.email })
                .populate({
                path: 'role',
                populate: {
                    path: 'permissions',
                    model: 'Permission',
                },
            })
                .lean();
            if (!user || !user.role) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const transformedPermissions = (user.role.permissions || [])
                .filter((perm) => typeof perm === 'object' && (perm === null || perm === void 0 ? void 0 : perm.type) && (perm === null || perm === void 0 ? void 0 : perm.subType))
                .map((perm) => `${perm.type}.${perm.subType}`);
            if (!user ||
                !(yield this.comparePassword(data.password, user.passwordHash))) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const tokens = this.getTokens(user._id, user.role.code);
            yield this.storeRefreshToken(user._id, tokens.refreshToken);
            res.cookie('accessToken', tokens.accessToken, {
                httpOnly: false,
                secure: false,
                maxAge: 10 * 24 * 60 * 60 * 1000,
            });
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: false,
                secure: false,
                maxAge: 10 * 24 * 60 * 60 * 1000,
            });
            return {
                user: Object.assign(Object.assign({}, this.formatTeamMember(user)), { permissions: transformedPermissions }),
            };
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisService.del(`refresh_token_${req.user._id}`);
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return {
                message: 'Logged out successfully',
            };
        });
    }
    getTeamMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            const teamMembers = yield this.userModel
                .find()
                .select({ passwordHash: 0 })
                .populate('role', 'code')
                .lean();
            return teamMembers.map(this.formatTeamMember);
        });
    }
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roleModel.find().lean();
        });
    }
    registerTeamMember(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.userModel.findOne({
                email: data.email,
            });
            if (existing)
                throw new common_1.ConflictException('User already exists');
            const role = yield this.roleModel.findById(data.role);
            if (!role)
                throw new common_1.NotFoundException('Role not found');
            const passwordHash = yield this.hashPassword(data.password);
            const empId = `EMP-${data.email.split('@')[0]}`;
            const newUser = yield this.userModel.create({
                email: data.email,
                passwordHash,
                role: data.role,
                empId,
                firstName: data.firstName,
                lastName: data.lastName,
                joiningDate: data.joiningDate,
                designation: data.designation,
            });
            return {
                message: 'Team member registered',
                user: this.formatTeamMember(Object.assign(Object.assign({}, newUser), { role: role })),
            };
        });
    }
    updateTeamMember(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(id);
            if (!user)
                throw new common_1.NotFoundException('User not found');
            if (data.email && data.email !== user.email) {
                const existing = yield this.userModel.findOne({ email: data.email });
                if (existing)
                    throw new common_1.ConflictException('Email already in use');
            }
            if (data.role) {
                const role = yield this.roleModel.findOne({ code: data.role });
                if (!role)
                    throw new common_1.NotFoundException('Role not found');
                user.role = role._id;
            }
            if (data.password !== undefined) {
                user.passwordHash = yield this.hashPassword(data.password);
            }
            if (data.firstName !== undefined)
                user.firstName = data.firstName;
            if (data.lastName !== undefined)
                user.lastName = data.lastName;
            if (data.joiningDate !== undefined)
                user.joiningDate = data.joiningDate;
            if (data.designation !== undefined)
                user.designation = data.designation;
            if (data.email) {
                user.email = data.email;
                user.empId = `EMP-${data.email.split('@')[0]}`;
            }
            const updatedUser = yield user.save();
            const roleDetails = yield this.roleModel.findById(updatedUser.role);
            return {
                message: 'Team member updated',
                user: this.formatTeamMember(Object.assign(Object.assign({}, updatedUser), { role: roleDetails })),
            };
        });
    }
    removeTeamMember(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(userId);
            if (!user)
                throw new common_1.NotFoundException('User not found');
            yield this.userModel.deleteOne({ _id: userId });
            return { message: 'User removed successfully' };
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel.findOne({ _id: orderId }).lean().exec();
            if (!order)
                throw new common_1.NotFoundException('Order not found');
            const deletes = [];
            deletes.push(this.paymentModel.deleteMany({ orderId }).exec());
            deletes.push(this.appointmentModel.deleteMany({ orderId }).exec());
            deletes.push(this.orderModel.deleteOne({ _id: orderId }).exec());
            yield Promise.all(deletes);
            return { message: 'Order and related records deleted successfully' };
        });
    }
    getCustomersList(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { page = 1, limit = 20, search, email, phone, gender, referredBy, hasReferral, sortBy = 'newest', startDate, endDate, colorCode, } = options;
            const pageLimit = Math.min(limit, 100);
            const currentPage = Math.max(1, page);
            const skip = (currentPage - 1) * pageLimit;
            const startDateObj = startDate ? new Date(startDate) : null;
            const endDateObj = endDate ? new Date(endDate) : null;
            if (startDateObj &&
                endDateObj &&
                startDateObj.getTime() > endDateObj.getTime()) {
                throw new common_1.BadRequestException('Start date cannot be greater than end date');
            }
            const filters = {
                search: search || null,
                email: email || null,
                phone: phone || null,
                gender: gender || null,
                referredBy: referredBy || null,
                hasReferral: hasReferral !== undefined ? hasReferral : null,
                sortBy,
                startDate: startDateObj || null,
                endDate: endDateObj || null,
                colorCode: colorCode || null,
            };
            const cacheKey = `customers_list_${JSON.stringify(Object.assign({ page: currentPage, limit: pageLimit }, filters))}`;
            const countCacheKey = `customers_count_${JSON.stringify(filters)}`;
            const cachedResult = yield this.redisService.get(cacheKey);
            if (cachedResult) {
                return JSON.parse(cachedResult);
            }
            let query = {};
            if (search) {
                const searchRegex = { $regex: search, $options: 'i' };
                query.$or = [
                    { firstName: searchRegex },
                    { lastName: searchRegex },
                    { email: searchRegex },
                    { phone: searchRegex },
                    { notes: searchRegex },
                ];
            }
            if (email) {
                query.email = { $regex: email, $options: 'i' };
            }
            if (phone) {
                query.phone = { $regex: phone, $options: 'i' };
            }
            if (gender) {
                query.gender = gender;
            }
            if (referredBy) {
                query.referredBy = { $regex: referredBy, $options: 'i' };
            }
            if (hasReferral !== undefined) {
                if (hasReferral) {
                    query.referredBy = { $exists: true, $ne: null };
                }
                else {
                    query.$or = [
                        { referredBy: { $exists: false } },
                        { referredBy: null },
                        { referredBy: '' },
                    ];
                }
            }
            if (startDate && startDateObj) {
                query.createdAt = Object.assign(Object.assign({}, ((_a = query.createdAt) !== null && _a !== void 0 ? _a : {})), { $gte: new Date(startDateObj.setHours(0, 0, 0, 0)) });
            }
            if (endDate && endDateObj) {
                query.createdAt = Object.assign(Object.assign({}, ((_b = query.createdAt) !== null && _b !== void 0 ? _b : {})), { $lte: new Date(endDateObj.setHours(23, 59, 59, 999)) });
            }
            if (colorCode) {
                query.colorCode = colorCode;
            }
            const isNewest = sortBy === 'newest';
            const sortDirection = isNewest ? -1 : 1;
            const sort = { _id: sortDirection };
            let total;
            try {
                const cachedCount = yield this.redisService.get(countCacheKey);
                if (cachedCount) {
                    total = parseInt(cachedCount, 10);
                }
                else {
                    total = yield this.profileModel.countDocuments(query);
                    yield this.redisService.set(countCacheKey, total.toString(), 300);
                }
            }
            catch (error) {
                total = yield this.profileModel.countDocuments(query);
            }
            const customers = yield this.profileModel
                .find(query)
                .sort(sort)
                .skip(skip)
                .limit(pageLimit)
                .lean();
            const customersWithAddress = yield Promise.all(customers.map((customer) => __awaiter(this, void 0, void 0, function* () {
                const existingAddress = yield this.addressModel
                    .findOne({
                    profile: customer._id,
                })
                    .lean();
                const address = existingAddress
                    ? {
                        addressLine1: existingAddress.addressLine1,
                        addressLine2: existingAddress.addressLine2,
                        city: existingAddress.city,
                        state: existingAddress.state,
                        pincode: existingAddress.pincode,
                    }
                    : null;
                return Object.assign(Object.assign({}, customer), { address: address });
            })));
            const totalPages = Math.ceil(total / pageLimit);
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            const result = {
                customers: customersWithAddress.map(this.formatCustomer),
                pagination: {
                    currentPage,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    total,
                    count: customers.length,
                    limit: pageLimit,
                    nextPage: hasNextPage ? currentPage + 1 : null,
                    prevPage: hasPrevPage ? currentPage - 1 : null,
                },
                filters: {
                    search,
                    email,
                    phone,
                    gender,
                    referredBy,
                    hasReferral,
                    sortBy,
                },
            };
            yield this.redisService.set(cacheKey, JSON.stringify(result), 180);
            return result;
        });
    }
    deleteCustomers(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.profileModel.deleteMany({ _id: { $in: ids } });
            yield this.redisService.clearCustomerListCache();
            return { message: 'Customer deleted successfully' };
        });
    }
    editCustomer(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.profileModel.findById(id);
            if (!customer)
                throw new common_1.NotFoundException('Customer not found');
            yield this.profileModel.updateOne({ _id: id }, {
                $set: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    gender: dto.gender,
                    phone: dto.phone,
                    notes: dto.notes,
                    colorCode: dto.colorCode,
                },
            });
            yield this.redisService.clearCustomerListCache();
            return { message: 'Customer updated successfully' };
        });
    }
    changePassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, oldPassword, newPassword, }) {
            const user = yield this.userModel.findById(userId);
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const isMatch = yield bcrypt.compare(oldPassword, user.passwordHash);
            if (!isMatch)
                throw new Error('Old password is incorrect');
            const newPasswordHash = yield this.hashPassword(newPassword);
            user.passwordHash = newPasswordHash;
            yield user.save();
            return { message: 'Password changed successfully' };
        });
    }
    addCustomerByAdmin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(user.phone)) {
                throw new common_1.BadRequestException('Invalid phone number');
            }
            const isExist = yield this.profileModel.findOne({ phone: user.phone });
            if (isExist) {
                throw new common_1.BadRequestException('Customer already exist');
            }
            yield this.redisService.clearCustomerListCache();
            return this.profileModel.create({
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                notes: user === null || user === void 0 ? void 0 : user.notes,
                colorCode: user === null || user === void 0 ? void 0 : user.colorCode,
            });
        });
    }
    getTeamMembersByRole(targetRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleModel.findOne({ code: targetRole });
            if (!role) {
                throw new common_1.NotFoundException('Invalid role code');
            }
            const members = yield this.userModel
                .find({ role: role._id })
                .select('firstName lastName _id');
            return members;
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.User.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Appointment.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Order.token)),
    __param(3, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Payment.token)),
    __param(4, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Profile.token)),
    __param(5, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Role.token)),
    __param(6, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Permission.token)),
    __param(7, (0, common_1.Inject)(redis_service_1.RedisService)),
    __param(9, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Address.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        redis_service_1.RedisService,
        otp_service_1.OtpService,
        mongoose_1.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map