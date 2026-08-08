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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const order_enums_1 = require("../../../../core-db/enums/order.enums");
const roles_enums_1 = require("../../../../core-db/enums/roles.enums");
const payment_service_1 = require("./payment.service");
const metamaster_service_1 = require("./metamaster.service");
const moment = require("moment-timezone");
const appointments_service_1 = require("./appointments.service");
const order_events_options_service_1 = require("./order-events-options.service");
let OrdersService = class OrdersService {
    constructor(orderModel, subCategoryModel, identityCountersModel, customizationModel, categoryModel, paymentService, paymentModel, metaMasterModel, metaMasterService, appointmentModel, profileModel, addressModel, pickupModel, appointmentsService, ordersEventsService) {
        this.orderModel = orderModel;
        this.subCategoryModel = subCategoryModel;
        this.identityCountersModel = identityCountersModel;
        this.customizationModel = customizationModel;
        this.categoryModel = categoryModel;
        this.paymentService = paymentService;
        this.paymentModel = paymentModel;
        this.metaMasterModel = metaMasterModel;
        this.metaMasterService = metaMasterService;
        this.appointmentModel = appointmentModel;
        this.profileModel = profileModel;
        this.addressModel = addressModel;
        this.pickupModel = pickupModel;
        this.appointmentsService = appointmentsService;
        this.ordersEventsService = ordersEventsService;
    }
    getSubCategoryStyle(subCategoryId, subCategoryStyleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategoryStyle = yield this.subCategoryModel
                    .findOne({
                    _id: subCategoryId,
                    'SubCategories._id': subCategoryStyleId,
                }, { 'SubCategories.$': 1 })
                    .lean();
                if (!subCategoryStyle) {
                    return {
                        name: 'N/A',
                        image: '',
                        price: 0,
                    };
                }
                const style = subCategoryStyle.SubCategories[0];
                return style;
            }
            catch (error) {
                throw new common_1.NotFoundException('SubCategory Style not found');
            }
        });
    }
    getTotalPrice(subCategory, customizations, options, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const priceBreakup = {
                basePrice: subCategory.discountedPrice >= 0
                    ? subCategory.discountedPrice
                    : subCategory.price,
                customizations: [],
                total: subCategory.discountedPrice >= 0
                    ? subCategory.discountedPrice
                    : subCategory.price,
            };
            if (customizations) {
                for (let i = 0; i < customizations.length; i++) {
                    const customization = yield this.customizationModel
                        .find({
                        type: customizations[i].type,
                        'options._id': customizations[i].optionId,
                    }, { 'options.$': 1 })
                        .lean();
                    if (customization && customization.length > 0) {
                        const options = customization[0].options;
                        for (let i = 0; i < options.length; i++) {
                            const option = options[i];
                            priceBreakup.customizations.push({
                                title: option.title,
                                price: option.discountedPrice >= 0
                                    ? option.discountedPrice
                                    : option.price || 0,
                                image: option.imageUrl,
                                type: 'customizations',
                                id: option._id || '',
                            });
                        }
                    }
                }
            }
            if (options) {
                for (let i = 0; i < options.length; i++) {
                    const category = yield this.categoryModel
                        .findOne({ _id: options[i].categoryId.toString() })
                        .select('options imageUrl')
                        .lean();
                    if (category && options[i].optionId) {
                        const option = category.options.find((option) => {
                            return option._id.toString() === options[i].optionId.toString();
                        });
                        if (option) {
                            priceBreakup.customizations.push({
                                title: option.title,
                                price: Number(option.discountedPrice) >= 0
                                    ? Number(option.discountedPrice)
                                    : Number(option.price),
                                image: category.imageUrl,
                                type: 'options',
                                id: options[i].optionId,
                            });
                        }
                    }
                }
            }
            priceBreakup.total = priceBreakup.customizations.reduce((acc, curr) => acc + curr.price, 0);
            if (order.customPrice && order.customPrice > 0) {
                priceBreakup.total = order.customPrice;
                priceBreakup.basePrice = order.customPrice;
                priceBreakup.customizations = priceBreakup.customizations.map((elem) => {
                    elem.price = 0;
                    return elem;
                });
            }
            else {
                priceBreakup.total += priceBreakup.basePrice;
            }
            return priceBreakup;
        });
    }
    formatTimeSlot(slotTime) {
        const [hours, minutes] = slotTime.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
        return `${formattedTime}`;
    }
    createOrder(orderDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderModel.create({
                items: orderDto.items ? Object.assign({}, orderDto.items) : [],
                profile: req.user._id,
                status: order_enums_1.OrderStatus.PENDING,
                imageUrls: orderDto.imageUrls ? orderDto.imageUrls : [],
                timeLine: [
                    {
                        status: order_enums_1.OrderTimeLine.ORDER_CREATED,
                        timeStamp: Date.now(),
                        updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                        updatedByUserId: req.user._id,
                    },
                ],
            });
        });
    }
    createAdminOrder(orderDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer = yield this.profileModel.findOne({ phone: orderDto.phone });
            if (!customer) {
                if (!orderDto.phone && orderDto.name) {
                    throw new common_1.BadRequestException('Customer phone and name required');
                }
                if (orderDto.phone.length != 10) {
                    throw new common_1.BadRequestException('Invalid phone number');
                }
                customer = yield this.profileModel.create({
                    phone: orderDto.phone,
                    firstName: orderDto.name,
                    lastName: '',
                });
            }
            return this.orderModel.create({
                items: orderDto.items ? Object.assign({}, orderDto.items) : [],
                profile: customer._id,
                status: order_enums_1.OrderStatus.PENDING,
                imageUrls: orderDto.imageUrls ? orderDto.imageUrls : [],
                timeLine: [],
                customPrice: !isNaN(orderDto.customPrice) && orderDto.customPrice > 0
                    ? orderDto.customPrice
                    : null,
                measurements: orderDto === null || orderDto === void 0 ? void 0 : orderDto.measurements,
                scheduledPickupTime: orderDto === null || orderDto === void 0 ? void 0 : orderDto.scheduledPickupTime,
                scheduledPickupDate: orderDto === null || orderDto === void 0 ? void 0 : orderDto.scheduledPickupDate,
            });
        });
    }
    cart(orderData, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerData, orderItems, pickupId } = orderData;
            let customer = yield this.profileModel.findOne({
                phone: customerData.phone,
            });
            if (!customer) {
                if (!customerData.phone && customerData.name) {
                    throw new common_1.BadRequestException('Customer phone and name required');
                }
                if (customerData.phone.length != 10) {
                    throw new common_1.BadRequestException('Invalid phone number');
                }
                customer = yield this.profileModel.create({
                    phone: customerData.phone,
                    firstName: customerData.name,
                    lastName: '',
                });
            }
            const address = yield this.addressModel.create({
                profile: customer._id,
                addressLine1: customerData.addressLine1,
                addressLine2: customerData.addressLine2,
                city: customerData.city,
                state: customerData.state,
                pincode: customerData.pincode,
            });
            const firstOrderItem = orderItems[0];
            const firstOrderItemRes = yield this.orderModel.create({
                profile: customer._id,
                addressId: address._id,
                items: firstOrderItem.items ? Object.assign({}, firstOrderItem.items) : [],
                status: order_enums_1.OrderStatus.PENDING,
                imageUrls: firstOrderItem.imageUrls ? firstOrderItem.imageUrls : [],
                timeLine: [],
                customPrice: !isNaN(firstOrderItem.customPrice) && firstOrderItem.customPrice > 0
                    ? firstOrderItem.customPrice
                    : null,
                measurements: firstOrderItem.measurements
                    ? firstOrderItem.measurements
                    : {},
                scheduledPickupTime: customerData === null || customerData === void 0 ? void 0 : customerData.scheduledPickupTime,
                scheduledPickupDate: customerData === null || customerData === void 0 ? void 0 : customerData.scheduledPickupDate,
                notes: firstOrderItem === null || firstOrderItem === void 0 ? void 0 : firstOrderItem.notes,
            });
            let appointment;
            try {
                appointment = yield this.appointmentsService.bookSlot(customerData.date, customerData.time, firstOrderItemRes._id, req, '', address._id, customer._id);
            }
            catch (error) {
                yield this.orderModel.deleteOne({ _id: firstOrderItemRes._id });
                yield this.addressModel.deleteOne({ _id: address._id });
                throw error;
            }
            const remainingOrderItems = orderItems.slice(1).map((item) => {
                return {
                    profile: customer._id,
                    addressId: address._id,
                    items: item.items ? Object.assign({}, item.items) : [],
                    status: order_enums_1.OrderStatus.PAYMENT_PENDING,
                    imageUrls: item.imageUrls ? item.imageUrls : [],
                    timeLine: [],
                    customPrice: !isNaN(item.customPrice) && item.customPrice > 0
                        ? item.customPrice
                        : null,
                    appointment: appointment._id,
                    measurements: item.measurements ? item.measurements : {},
                    scheduledPickupTime: customerData === null || customerData === void 0 ? void 0 : customerData.scheduledPickupTime,
                    scheduledPickupDate: customerData === null || customerData === void 0 ? void 0 : customerData.scheduledPickupDate,
                    notes: item === null || item === void 0 ? void 0 : item.notes,
                };
            });
            yield this.orderModel.insertMany(remainingOrderItems);
            if (pickupId) {
                const pickupOptions = [
                    { label: 'Material Picked Up from Customer', value: true },
                    { label: 'Material Delivered to Workshop', value: true },
                    { label: 'Order fulfilled', value: true },
                ];
                yield this.updatePickupOptions(pickupId, pickupOptions, req);
            }
            return { message: 'Orders created successfully' };
        });
    }
    getOrderDetails(orderId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.orderModel
                .findById(orderId)
                .populate({
                path: 'payment',
                select: 'amount discountedAmount status method coupon createdAt',
                populate: {
                    path: 'paymentMethod',
                    select: 'name type',
                },
            })
                .populate({
                path: 'appointment',
                select: 'date time status notes',
            })
                .populate({
                path: 'addressId',
                select: 'addressLine1 addressLine2 city state pincode',
            })
                .populate({
                path: 'profile',
                select: 'firstName lastName phone email _id',
            })
                .lean();
            if (!details) {
                throw new common_1.NotFoundException('Order not found');
            }
            const isOwner = details.profile != null
                ? details.profile._id.toString() === req.user._id.toString()
                : false;
            const isCustomer = req.user.role === 'customer';
            const hasAdminRole = Object.values(roles_enums_1.RoleCode).includes(req.user.role);
            const isAuthorized = (isOwner && isCustomer) || hasAdminRole;
            if (!isAuthorized) {
                throw new common_1.ForbiddenException('You are not authorized to access this order');
            }
            const style = yield this.getSubCategoryStyle(details.items[0].subCategory, details.items[0].subCategoryStyleId);
            const priceBreakup = yield this.getTotalPrice(style, details.items[0].customizations, details.items[0].options, details);
            const organizedDetails = {
                appointment: details.appointment || {},
                address: req.user.role === roles_enums_1.RoleCode.CUTTING ||
                    req.user.role === roles_enums_1.RoleCode.STITCHING
                    ? null
                    : Object.assign(Object.assign({}, details.addressId), { phone: details.profile ? details.profile.phone : '', name: details.profile
                            ? `${(details === null || details === void 0 ? void 0 : details.profile).firstName} ${(details === null || details === void 0 ? void 0 : details.profile).lastName}`
                            : '' }),
                order: {
                    _id: details._id,
                    status: details.status,
                    items: details.items || [],
                    imageUrls: details.imageUrls,
                    createdAt: details.createdAt,
                    notes: details.notes || 'N/A',
                },
                payment: details.payment || {},
                style: {
                    name: style.name,
                    image: style.image,
                    price: priceBreakup.basePrice,
                },
                priceBreakup: priceBreakup,
                measurements: req.user.role != 'customer' ? details === null || details === void 0 ? void 0 : details.measurements : {},
            };
            return organizedDetails;
        });
    }
    getNextOrderId(categoryId, subCategoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {
                field: 'orderId',
                modelName: 'orders',
            };
            const update = { $inc: { count: 1 } };
            const options = {
                new: true,
                upsert: true,
            };
            const result = yield this.identityCountersModel.findOneAndUpdate(filter, update, options);
            if (!result) {
                throw new Error('Failed to generate order ID: result is null.');
            }
            const paddedCount = result.count.toString().padStart(4, '0');
            const category = yield this.subCategoryModel.findOne({
                _id: categoryId,
            });
            if (!category) {
                throw new Error('Category not found');
            }
            const categoryIdFormatted = category === null || category === void 0 ? void 0 : category.categoryId.toString();
            const paddedCategoryId = categoryIdFormatted.toString().padStart(2, '0');
            const subCategoryAbbreviation = subCategoryName
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase())
                .join('')
                .slice(0, 3);
            const orderId = `${paddedCategoryId}${subCategoryAbbreviation}${paddedCount}`;
            return orderId;
        });
    }
    getOrderList(req, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageLimit = Math.min(Number(limit), 20);
            const currentPage = Math.max(1, Number(page));
            const skip = (currentPage - 1) * pageLimit;
            let query = { profile: req.user._id };
            let total = yield this.orderModel.countDocuments(query);
            const orders = yield this.orderModel
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageLimit)
                .lean();
            const orderList = yield Promise.all(orders.map((order) => __awaiter(this, void 0, void 0, function* () {
                const style = yield this.getSubCategoryStyle(order.items[0].subCategory, order.items[0].subCategoryStyleId);
                const priceBreakup = yield this.getTotalPrice(style, order.items[0].customizations, order.items[0].options, order);
                return {
                    orderId: order._id,
                    orderDate: order.createdAt,
                    orderStatus: order.status,
                    appointment: order.appointment,
                    style: {
                        name: style.name,
                        price: priceBreakup.total,
                    },
                };
            })));
            const totalPages = Math.ceil(total / pageLimit);
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            const result = {
                orders: orderList,
                pagination: {
                    currentPage,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    total,
                    count: orderList.length,
                    limit: pageLimit,
                    nextPage: hasNextPage ? currentPage + 1 : null,
                    prevPage: hasPrevPage ? currentPage - 1 : null,
                },
                filters: {
                    limit,
                    page,
                },
            };
            return result;
        });
    }
    getAllOrders(dto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { orderId, customerPhone, customerName, orderStatus, orderDate, sortBy = 'newest', startDate, appointmentDate, couponCode, endDate, page = 1, limit = 20, productName, all_orders = '0', sortByDeliveryDate = '0', customerId = null, } = dto;
            const pageLimit = Math.min(Number(limit), 50);
            const currentPage = Math.max(1, Number(page));
            const skip = (currentPage - 1) * pageLimit;
            const startDateObj = startDate ? new Date(startDate) : null;
            const endDateObj = endDate ? new Date(endDate) : null;
            const appointmentDateObj = appointmentDate
                ? new Date(appointmentDate)
                : null;
            if (startDateObj) {
                startDateObj.setHours(0, 0, 0, 0);
            }
            if (endDateObj) {
                endDateObj.setHours(23, 59, 59, 999);
            }
            if (startDateObj &&
                endDateObj &&
                startDateObj.getTime() > endDateObj.getTime()) {
                throw new common_1.BadRequestException('Start date cannot be greater than end date');
            }
            const filters = {
                orderId: orderId || null,
                customerPhone: customerPhone || null,
                customerName: customerName || null,
                orderStatus: orderStatus || null,
                orderDate: orderDate || null,
                sortBy,
                startDate: startDateObj || null,
                endDate: endDateObj || null,
                couponCode: couponCode || null,
                productName: productName || null,
                customerId: customerId || null,
            };
            const isCustomerView = filters.customerPhone || filters.customerName || filters.customerId;
            let query = {};
            if (req.user.role !== roles_enums_1.RoleCode.ADMIN && all_orders === '0') {
                const allowedStates = order_enums_1.OrderProcessingStateToUserRole[req.user.role];
                query['orderProcessingState'] = { $in: allowedStates };
            }
            if (req.user.role === roles_enums_1.RoleCode.STITCHING && all_orders === '0') {
                query['assignedToStitchingAgentId'] = req.user._id;
            }
            if (orderId) {
                query['items.orderId'] = {
                    $regex: `^${orderId}$`,
                    $options: 'i',
                };
            }
            if (orderStatus) {
                query.status = orderStatus;
            }
            if (orderDate) {
                const orderDateObj = new Date(orderDate);
                orderDateObj.setHours(0, 0, 0, 0);
                const nextDay = new Date(orderDateObj);
                nextDay.setDate(nextDay.getDate() + 1);
                query.createdAt = {
                    $gte: orderDateObj,
                    $lt: nextDay,
                };
            }
            if (startDate && startDateObj) {
                query.createdAt = Object.assign(Object.assign({}, ((_a = query.createdAt) !== null && _a !== void 0 ? _a : {})), { $gte: new Date(startDateObj.setHours(0, 0, 0, 0)) });
            }
            if (endDate && endDateObj) {
                query.createdAt = Object.assign(Object.assign({}, ((_b = query.createdAt) !== null && _b !== void 0 ? _b : {})), { $lte: new Date(endDateObj.setHours(23, 59, 59, 999)) });
            }
            const isNewest = sortBy === 'newest';
            const sortDirection = isNewest ? -1 : 1;
            let sort = { createdAt: sortDirection };
            let total;
            total = yield this.orderModel.countDocuments(query);
            const queryBuilder = this.orderModel
                .find(query)
                .populate({
                path: 'profile',
                select: order_enums_1.RoleToProfileAttributesMap[req.user.role],
            })
                .populate({
                path: 'payment',
                select: 'amount',
            })
                .populate({
                path: 'appointment',
                select: 'date time status notes',
            })
                .populate({
                path: 'addressId',
            })
                .sort(sort);
            if (!isCustomerView) {
                queryBuilder.skip(skip).limit(pageLimit);
            }
            const orders = yield queryBuilder.lean();
            let filteredOrders = orders;
            if (customerPhone) {
                filteredOrders = filteredOrders.filter((order) => {
                    return (order.profile &&
                        order.profile.phone &&
                        order.profile.phone === customerPhone);
                });
            }
            if (customerId) {
                filteredOrders = filteredOrders.filter((order) => {
                    return (order.profile &&
                        order.profile._id &&
                        order.profile._id.toString() === customerId);
                });
            }
            if (customerName) {
                const escapedName = customerName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const nameRegex = new RegExp(escapedName.split(/\s+/).join('\\s*'), 'i');
                filteredOrders = filteredOrders.filter((order) => {
                    if (!order.profile)
                        return false;
                    const fullName = `${order.profile.firstName || ''} ${order.profile.lastName || ''}`;
                    return nameRegex.test(fullName);
                });
            }
            if (appointmentDate && appointmentDateObj) {
                appointmentDateObj.setHours(0, 0, 0, 0);
                filteredOrders = filteredOrders.filter((order) => {
                    if (!order.appointment)
                        return false;
                    const appointmentBookedDateObj = new Date(order.appointment.date);
                    appointmentBookedDateObj.setHours(0, 0, 0, 0);
                    return (appointmentBookedDateObj.getTime() === appointmentDateObj.getTime());
                });
            }
            let orderList = filteredOrders.map((order) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                if (!isCustomerView) {
                    return {
                        orderId: ((_b = (_a = order === null || order === void 0 ? void 0 : order.items) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.orderId) || 'NA',
                        id: order._id,
                        customerName: order.profile
                            ? `${order.profile.firstName || ''} ${order.profile.lastName || ''}`.trim()
                            : 'N/A',
                        customerId: ((_c = order.profile) === null || _c === void 0 ? void 0 : _c._id) || 'N/A',
                        appointmentDate: ((_d = order.appointment) === null || _d === void 0 ? void 0 : _d.date)
                            ? order.appointment.date
                            : 'N/A',
                        appointmentTime: ((_e = order.appointment) === null || _e === void 0 ? void 0 : _e.time)
                            ? this.formatTimeSlot(order.appointment.time)
                            : 'N/A',
                        orderDate: order.createdAt,
                        notes: order.notes || '-',
                        orderProcessingState: order.orderProcessingState || 'Order Placed',
                    };
                }
                const style = yield this.getSubCategoryStyle((_f = order === null || order === void 0 ? void 0 : order.items[0]) === null || _f === void 0 ? void 0 : _f.subCategory, (_g = order === null || order === void 0 ? void 0 : order.items[0]) === null || _g === void 0 ? void 0 : _g.subCategoryStyleId);
                let timeline = [];
                if (req.user.role === roles_enums_1.RoleCode.ADMIN) {
                    timeline = yield this.ordersEventsService.getAggregatedTimeLine(order._id);
                    console.log(timeline);
                }
                return {
                    orderId: ((_j = (_h = order === null || order === void 0 ? void 0 : order.items) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.orderId) || 'NA',
                    id: order._id,
                    assignedToStitchingAgentId: (order === null || order === void 0 ? void 0 : order.assignedToStitchingAgentId) || 'none',
                    orderDate: order.createdAt,
                    orderStatus: order.status,
                    customerName: order.profile
                        ? `${order.profile.firstName || ''} ${order.profile.lastName || ''}`.trim()
                        : 'N/A',
                    customerPhone: ((_k = order.profile) === null || _k === void 0 ? void 0 : _k.phone) || 'N/A',
                    customerId: ((_l = order.profile) === null || _l === void 0 ? void 0 : _l._id) || 'N/A',
                    appointmentDate: ((_m = order.appointment) === null || _m === void 0 ? void 0 : _m.date)
                        ? order.appointment.date
                        : 'N/A',
                    appointmentTime: ((_o = order.appointment) === null || _o === void 0 ? void 0 : _o.time)
                        ? this.formatTimeSlot(order.appointment.time)
                        : 'N/A',
                    productName: style.name,
                    productPrice: ((_p = order.payment) === null || _p === void 0 ? void 0 : _p.discountedAmount) || 'N/A',
                    timeLine: timeline || [],
                    customPrice: order.customPrice || 'N/A',
                    measurements: order.measurements || {},
                    orderProcessingState: order.orderProcessingState || 'Order Placed',
                    scheduledPickupDate: (order === null || order === void 0 ? void 0 : order.scheduledPickupDate) || null,
                    scheduledPickupTime: (order === null || order === void 0 ? void 0 : order.scheduledPickupTime) || null,
                    isPinned: order === null || order === void 0 ? void 0 : order.isPinned,
                    pinPosition: order === null || order === void 0 ? void 0 : order.pinPosition,
                    paymentStatus: order === null || order === void 0 ? void 0 : order.paymentStatus,
                    address: req.user.role === roles_enums_1.RoleCode.ADMIN ? (order === null || order === void 0 ? void 0 : order.addressId) || 'N/A' : 'N/A',
                };
            }));
            orderList = yield Promise.all(orderList);
            if (productName && isCustomerView) {
                const productNameRegex = new RegExp(productName.split(/\s+/).join('\\s*'), 'i');
                orderList = orderList.filter((order) => {
                    return productNameRegex.test(order.productName);
                });
            }
            if (couponCode && isCustomerView) {
                const couponCodeRegex = new RegExp(couponCode.split(/\s+/).join('\\s*'), 'i');
                orderList = orderList.filter((order) => {
                    return couponCodeRegex.test(order.couponCode);
                });
            }
            if (sortByDeliveryDate === '1' && isCustomerView) {
                orderList.sort((a, b) => {
                    if (!a.appointmentDate)
                        return 1;
                    if (!b.appointmentDate)
                        return -1;
                    return (new Date(a.appointmentDate).getTime() -
                        new Date(b.appointmentDate).getTime());
                });
            }
            const totalPages = Math.ceil(total / pageLimit);
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            const pinnedOrders = yield this.orderModel
                .find({ isPinned: true })
                .populate({
                path: 'profile',
                select: order_enums_1.RoleToProfileAttributesMap[req.user.role],
            })
                .populate({
                path: 'payment',
                select: 'amount',
            })
                .populate({
                path: 'appointment',
                select: 'date time status notes',
            })
                .sort({ pinPosition: 'asc' });
            let pinnedOrderList = pinnedOrders.map((order) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const style = yield this.getSubCategoryStyle((_a = order === null || order === void 0 ? void 0 : order.items[0]) === null || _a === void 0 ? void 0 : _a.subCategory, (_b = order === null || order === void 0 ? void 0 : order.items[0]) === null || _b === void 0 ? void 0 : _b.subCategoryStyleId);
                let timeline = [];
                if (req.user.role === roles_enums_1.RoleCode.ADMIN) {
                    timeline = yield this.ordersEventsService.getAggregatedTimeLine(order._id);
                }
                return {
                    orderId: ((_d = (_c = order === null || order === void 0 ? void 0 : order.items) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.orderId) || 'NA',
                    id: order._id,
                    assignedToStitchingAgentId: (order === null || order === void 0 ? void 0 : order.assignedToStitchingAgentId) || 'none',
                    orderDate: order.createdAt,
                    orderStatus: order.status,
                    customerName: order.profile
                        ? `${order.profile.firstName || ''} ${order.profile.lastName || ''}`.trim()
                        : 'N/A',
                    customerPhone: ((_e = order.profile) === null || _e === void 0 ? void 0 : _e.phone) || 'N/A',
                    appointmentDate: ((_f = order.appointment) === null || _f === void 0 ? void 0 : _f.date)
                        ? order.appointment.date
                        : 'N/A',
                    appointmentTime: ((_g = order.appointment) === null || _g === void 0 ? void 0 : _g.time)
                        ? this.formatTimeSlot(order.appointment.time)
                        : 'N/A',
                    productName: style.name,
                    productPrice: ((_h = order.payment) === null || _h === void 0 ? void 0 : _h.discountedAmount) || 'N/A',
                    timeLine: timeline || [],
                    customPrice: order.customPrice || 'N/A',
                    measurements: order.measurements || {},
                    orderProcessingState: order.orderProcessingState || 'Order Placed',
                    scheduledPickupDate: (order === null || order === void 0 ? void 0 : order.scheduledPickupDate) || null,
                    scheduledPickupTime: (order === null || order === void 0 ? void 0 : order.scheduledPickupTime) || null,
                    isPinned: order === null || order === void 0 ? void 0 : order.isPinned,
                    pinPosition: order === null || order === void 0 ? void 0 : order.pinPosition,
                };
            }));
            pinnedOrderList = yield Promise.all(pinnedOrderList);
            const result = {
                orders: orderList,
                pagination: {
                    currentPage,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    total,
                    count: orderList.length,
                    limit: pageLimit,
                    nextPage: hasNextPage ? currentPage + 1 : null,
                    prevPage: hasPrevPage ? currentPage - 1 : null,
                },
                filters: {
                    orderId,
                    customerPhone,
                    customerName,
                    orderStatus,
                    orderDate,
                    sortBy,
                },
                pinnedOrderList,
            };
            return result;
        });
    }
    updateOrderStatus(orderId, status, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const timelineEvent = order_enums_1.OrderStatusToTimelineMap[status];
            const updates = {
                $set: { status },
            };
            if (timelineEvent) {
                updates.$push = {
                    timeLine: {
                        status: timelineEvent,
                        timeStamp: new Date(),
                        updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                        updatedByUserId: req.user._id,
                    },
                };
            }
            const order = yield this.orderModel.findByIdAndUpdate(orderId, updates, {
                new: true,
            });
            return order;
        });
    }
    addTimelineEvent(orderId, event, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = order_enums_1.TimelineToStatusMap[event];
            const updates = {
                $push: {
                    timeLine: {
                        status: event,
                        timeStamp: new Date(),
                        updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                        updatedByUserId: req.user._id,
                    },
                },
            };
            if (status) {
                updates.$set = { status };
            }
            const order = yield this.orderModel.findByIdAndUpdate(orderId, updates, {
                new: true,
            });
            return order;
        });
    }
    cancelOrder(orderId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel
                .findOne({ _id: orderId })
                .populate('appointment', 'date time _id');
            console.log(order);
            if (!order) {
                throw new common_1.BadRequestException('Order not found');
            }
            if ((order === null || order === void 0 ? void 0 : order.profile.toString()) != req.user._id.toString()) {
                throw new common_1.ForbiddenException('You are no allowed to modify this order status');
            }
            const date = new Date(order.appointment.date);
            const [hh, mm] = order.appointment.time.split(':');
            date.setHours(Number(hh), Number(mm));
            const appointmentDate = moment.tz(date.toISOString(), 'Asia/Kolkata');
            const now = moment.tz(new Date(), 'Asia/Kolkata');
            if (!now.isBefore(appointmentDate)) {
                throw new common_1.ForbiddenException('You are no allowed to modify this order status now');
            }
            order.status = order_enums_1.OrderStatus.CANCELLED;
            order.timeLine.push({
                status: order_enums_1.OrderTimeLine.ORDER_CANCELLED,
                timeStamp: new Date(),
                updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                updatedByUserId: req.user._id,
            });
            yield order.save();
            yield this.appointmentModel.findByIdAndDelete(order.appointment._id);
            return {
                order,
                message: 'order updated successfully',
            };
        });
    }
    createRazorpayOrder(orderId, couponCode, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel.findById(orderId);
            if (!order) {
                throw new common_1.NotFoundException('Order not found');
            }
            const style = yield this.getSubCategoryStyle(order.items[0].subCategory, order.items[0].subCategoryStyleId);
            const priceBreakup = yield this.getTotalPrice(style, order.items[0].customizations, order.items[0].options, order);
            let res = { discount: 0, code: '' };
            if (couponCode && couponCode !== '') {
                res = yield this.metaMasterService.validateCoupon({
                    couponCode,
                    amount: priceBreakup.total,
                }, req);
            }
            const payableAmount = Number(priceBreakup.total) - Number(res.discount);
            const amountToCharge = payableAmount * 0.2;
            const payment = yield this.paymentService.createOrder({
                amount: Math.round(amountToCharge),
                currency: 'INR',
                receipt: `${order._id.toString()}`,
                notes: {
                    couponCode: res.code,
                    discount: res.discount,
                    internalOrderId: orderId,
                    originalAmount: priceBreakup.total,
                },
            });
            return payment;
        });
    }
    verifyPayment(body, req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const payment = yield this.paymentService.verifyPayment(body);
            const isPaymentValid = payment.isValid;
            if (!isPaymentValid) {
                throw new common_1.BadRequestException('Invalid payment');
            }
            const paymentDetails = yield this.paymentService.getPaymentDetails(body.paymentId);
            if (!paymentDetails) {
                throw new common_1.NotFoundException('Payment not found');
            }
            const extractPaymentData = this.paymentService.extractPaymentData(paymentDetails);
            const existingPayment = yield this.paymentModel.findOne({
                order: extractPaymentData.internalOrderId,
            });
            if (existingPayment) {
                throw new common_1.ConflictException('Payment for this order already done');
            }
            const order = yield this.orderModel.findById(extractPaymentData.internalOrderId);
            const paymentInfo = yield this.paymentModel.create({
                profile: order === null || order === void 0 ? void 0 : order.profile,
                priceBreakup: order === null || order === void 0 ? void 0 : order.items,
                method: extractPaymentData.paymentMethod,
                razorpayPaymentId: extractPaymentData.paymentId,
                coupon: extractPaymentData.couponCode,
                discountedAmount: Number(extractPaymentData.originalAmount) -
                    Number(extractPaymentData.discount),
                amount: Number(extractPaymentData.originalAmount),
                status: extractPaymentData.status,
                createdAt: extractPaymentData.createdAt,
                order: extractPaymentData.internalOrderId,
            });
            order.payment = new mongoose_1.default.Types.ObjectId(paymentInfo._id);
            order.status = order_enums_1.OrderStatus.PAYMENT_DONE;
            (_a = order.timeLine) === null || _a === void 0 ? void 0 : _a.push({
                status: order_enums_1.OrderTimeLine.PAYMENT_DONE,
                timeStamp: new Date(),
                updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                updatedByUserId: req.user._id,
            });
            yield (order === null || order === void 0 ? void 0 : order.save());
            return paymentDetails;
        });
    }
    updateMeasurements(orderId, details) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel.findOne({ _id: orderId });
            if (!order) {
                throw new common_1.NotFoundException('order not found');
            }
            order.measurements = details;
            yield order.save();
            return order;
        });
    }
    removeOrderCustomizationsAndOptions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = `items.$[item].${data.type}`;
            const updateQuery = {
                $pull: {
                    [field]: {
                        optionId: new mongoose_1.default.Types.ObjectId(data.optionId),
                    },
                },
            };
            if (data.customPrice !== undefined) {
                updateQuery.$set = {
                    customPrice: data.customPrice,
                };
            }
            const result = yield this.orderModel.updateOne({
                _id: data.order_Id,
            }, updateQuery, {
                arrayFilters: [{ 'item.orderId': data.orderId }],
            });
            return result;
        });
    }
    updateOrderCustomizationsAndOptions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId, customPrice, customizations, options, subCategoryId, subCategoryStyleId, } = data;
            const updateQuery = {};
            if (customizations && customizations.length > 0) {
                updateQuery.$push = {
                    'items.$[item].customizations': {
                        $each: customizations.map((c) => ({
                            type: c.type,
                            optionId: new mongoose_1.default.Types.ObjectId(c.optionId),
                        })),
                    },
                };
            }
            if (options && options.length > 0) {
                updateQuery.$push = Object.assign(Object.assign({}, updateQuery.$push), { 'items.$[item].options': {
                        $each: options.map((o) => (Object.assign(Object.assign({}, (o.categoryId
                            ? { categoryId: new mongoose_1.default.Types.ObjectId(o.categoryId) }
                            : {})), { optionId: new mongoose_1.default.Types.ObjectId(o.optionId) }))),
                    } });
                if (subCategoryId && subCategoryStyleId) {
                    updateQuery.$set = Object.assign(Object.assign({}, updateQuery.$set), { 'items.$[item].subCategory': subCategoryId, 'items.$[item].subCategoryStyleId': subCategoryStyleId });
                }
            }
            if (customPrice !== undefined) {
                updateQuery.$set = Object.assign(Object.assign({}, updateQuery.$set), { customPrice });
            }
            const result = yield this.orderModel.updateOne({ _id: orderId }, updateQuery, {
                arrayFilters: [{ 'item._id': { $exists: true } }],
            });
            return result;
        });
    }
    createPickup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('called me');
            const res = yield this.pickupModel.create(data);
            return res;
        });
    }
    getPickupList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pickupModel
                .find({
                'options.label': 'Order fulfilled',
                'options.value': false,
            })
                .sort({ createdAt: -1 });
        });
    }
    updatePickupOptions(pickupId, options, req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const pickup = yield this.pickupModel.findById(pickupId);
            if (!pickup) {
                throw new common_1.NotFoundException('Pickup not found');
            }
            for (const incoming of options) {
                const existing = pickup.options.find((o) => o.label === incoming.label);
                if (!existing)
                    continue;
                if (existing.value !== incoming.value) {
                    (_a = pickup.timeline) === null || _a === void 0 ? void 0 : _a.push({
                        status: `${incoming.label}`,
                        updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                        updatedByUserId: req.user._id,
                    });
                    existing.value = incoming.value;
                }
            }
            yield pickup.save();
            return pickup;
        });
    }
    getPickupById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pickup = yield this.pickupModel.findById(id).lean();
            if (!pickup) {
                throw new common_1.NotFoundException('Pickup not found');
            }
            return pickup;
        });
    }
    duplicateOrder(orderId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingOrder = yield this.orderModel.findById(orderId).lean();
            if (!existingOrder) {
                throw new common_1.NotFoundException('Order not found');
            }
            const { _id, createdAt, __v } = existingOrder, orderData = __rest(existingOrder, ["_id", "createdAt", "__v"]);
            const newOrderId = yield this.getNextOrderId('6812ecb20458a0919d0cc551', 'Straight Kurti');
            const duplicatedItems = orderData.items.map((item) => (Object.assign(Object.assign({}, item), { orderId: newOrderId })));
            console.log(duplicatedItems);
            const newOrder = yield this.orderModel.create(Object.assign(Object.assign({}, orderData), { items: duplicatedItems, timeLine: [] }));
            return newOrder;
        });
    }
    updatePickupDetails(pickupId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pickupModel.findByIdAndUpdate(pickupId, {
                $set: payload,
            }, {
                new: true,
                runValidators: true,
            });
        });
    }
    updateOrderImages(orderId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            let order = yield this.orderModel.findById(orderId);
            if (!order)
                return null;
            if (dto.remove && dto.remove.length > 0) {
                order = yield this.orderModel.findByIdAndUpdate(orderId, {
                    $pull: {
                        imageUrls: { $in: dto.remove },
                    },
                }, { new: true });
            }
            if (dto.add && dto.add.length > 0) {
                order = yield this.orderModel.findByIdAndUpdate(orderId, {
                    $addToSet: {
                        imageUrls: { $each: dto.add },
                    },
                }, { new: true });
            }
            return order;
        });
    }
    updateOrderProcessingState(orderId, nextState, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderModel.findByIdAndUpdate(orderId, {
                $set: {
                    orderProcessingState: nextState,
                },
                $push: {
                    timeLine: {
                        status: nextState,
                        timeStamp: Date.now(),
                        updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                        updatedByUserId: req.user._id,
                    },
                },
            }, { new: true });
        });
    }
    updateBulkOrders(body, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { selectedOrderIds, bulkStatus } = body;
            return this.orderModel.updateMany({
                _id: { $in: selectedOrderIds },
            }, {
                $set: {
                    orderProcessingState: bulkStatus,
                },
                $push: {
                    timeLine: {
                        status: bulkStatus,
                        timeStamp: Date.now(),
                        updatedBy: `${req.user.firstName} ${req.user.lastName}`,
                        updatedByUserId: req.user._id,
                    },
                },
            });
        });
    }
    pinOrder(orderId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.orderModel.findByIdAndUpdate(orderId, {
                $set: {
                    isPinned: body.isPinned,
                    pinPosition: !body.isPinned ? null : body.pinPosition,
                },
            }, { new: true });
            return res;
        });
    }
    assignStitchingAgent(orderId, agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.orderModel.findByIdAndUpdate(orderId, {
                $set: {
                    assignedToStitchingAgentId: agentId === 'none' ? null : agentId,
                },
            }, { new: true });
            return res;
        });
    }
    updateOrderPaymentStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel.findByIdAndUpdate(orderId, {
                $set: {
                    paymentStatus: status,
                },
            }, {
                new: true,
            });
            return order;
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Order.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.SubCategory.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.IdentityCounters.token)),
    __param(3, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Customization.token)),
    __param(4, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Category.token)),
    __param(6, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Payment.token)),
    __param(7, (0, common_1.Inject)(model_metadata_1.ModelMetadata.MetaMaster.token)),
    __param(9, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Appointment.token)),
    __param(10, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Profile.token)),
    __param(11, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Address.token)),
    __param(12, (0, common_1.Inject)(model_metadata_1.ModelMetadata.MaterialPickup.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        payment_service_1.PaymentService,
        mongoose_1.Model,
        mongoose_1.Model,
        metamaster_service_1.MetaMasterService,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        appointments_service_1.AppointmentsService,
        order_events_options_service_1.OrderEventsOptionsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map