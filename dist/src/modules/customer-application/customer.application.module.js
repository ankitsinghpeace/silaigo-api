"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerApplication = void 0;
const common_1 = require("@nestjs/common");
const page_sections_service_1 = require("./services/page.sections.service");
const page_sections_controller_1 = require("./controllers/page.sections.controller");
const category_service_1 = require("./services/category.service");
const category_controller_1 = require("./controllers/category.controller");
const subcategory_controller_1 = require("./controllers/subcategory.controller");
const subcategory_service_1 = require("./services/subcategory.service");
const metamaster_controller_1 = require("./controllers/metamaster.controller");
const metamaster_service_1 = require("./services/metamaster.service");
const customizations_controller_1 = require("./controllers/customizations.controller");
const customizations_service_1 = require("./services/customizations.service");
const auth_service_1 = require("./services/auth.service");
const auth_controller_1 = require("./controllers/auth.controller");
const jwt_middleware_1 = require("../../core/middlewares/jwt.middleware");
const common_2 = require("@nestjs/common");
const otp_service_1 = require("./services/otp.service");
const address_controller_1 = require("./controllers/address.controller");
const address_service_1 = require("./services/address.service");
const payment_methods_controller_1 = require("./controllers/payment-methods.controller");
const payment_methods_service_1 = require("./services/payment-methods.service");
const orders_controller_1 = require("./controllers/orders.controller");
const orders_service_1 = require("./services/orders.service");
const appointments_controller_1 = require("./controllers/appointments.controller");
const appointments_service_1 = require("./services/appointments.service");
const blogs_controller_1 = require("./controllers/blogs.controller");
const blogs_service_1 = require("./services/blogs.service");
const payment_service_1 = require("./services/payment.service");
const razorpay_1 = require("./services/payments/razorpay");
const phone_calls_scheduler_service_1 = require("./services/phone-calls-scheduler.service");
const create_phone_calls_controller_1 = require("./controllers/create-phone-calls.controller");
const measurement_category_controller_1 = require("./controllers/measurement-category.controller");
const measurements_service_1 = require("./services/measurements.service");
const order_events_options_service_1 = require("./services/order-events-options.service");
const order_events_options_controller_1 = require("./controllers/order-events-options.controller");
const landing_pages_controller_1 = require("./controllers/landing.pages.controller");
const landing_pages_service_1 = require("./services/landing.pages.service");
let CustomerApplication = class CustomerApplication {
    configure(consumer) {
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: 'auth/register',
            method: common_2.RequestMethod.POST,
        }, {
            path: 'auth/refresh-token',
            method: common_2.RequestMethod.GET,
        }, {
            path: 'auth/generate-otp',
            method: common_2.RequestMethod.POST,
        }, {
            path: 'auth/generate-master-otp',
            method: common_2.RequestMethod.POST,
        }, {
            path: 'auth/verify-otp',
            method: common_2.RequestMethod.POST,
        }, {
            path: 'auth/resend-otp',
            method: common_2.RequestMethod.POST,
        }, {
            path: 'auth/customer-login',
            method: common_2.RequestMethod.POST,
        }, {
            path: 'auth/create-profile',
            method: common_2.RequestMethod.POST,
        }, {
            path: 'auth/internal-login',
            method: common_2.RequestMethod.POST,
        })
            .forRoutes(auth_controller_1.AuthController);
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: 'category/{*splat}',
            method: common_2.RequestMethod.GET,
        }, {
            path: 'category',
            method: common_2.RequestMethod.GET,
        })
            .forRoutes(category_controller_1.CategoryController);
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: 'customizations/{*splat}',
            method: common_2.RequestMethod.GET,
        }, {
            path: 'customizations',
            method: common_2.RequestMethod.GET,
        })
            .forRoutes(customizations_controller_1.CustomizationsController);
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: 'page-sections/{*splat}',
            method: common_2.RequestMethod.GET,
        }, {
            path: 'page-sections/upload-image',
            method: common_2.RequestMethod.POST,
        })
            .forRoutes(page_sections_controller_1.PageSectionController);
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes(address_controller_1.AddressController);
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes(payment_methods_controller_1.PaymentMethodController);
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes(orders_controller_1.OrdersController);
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes(appointments_controller_1.AppointmentsController);
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes(create_phone_calls_controller_1.CreatePhoneCallsController);
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes(measurement_category_controller_1.MeasurementsCategoryController);
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes(order_events_options_controller_1.OrderEventsOptionsController);
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: 'blogs/{*splat}',
            method: common_2.RequestMethod.GET,
        }, {
            path: 'blogs',
            method: common_2.RequestMethod.GET,
        })
            .forRoutes(blogs_controller_1.BlogsController);
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .forRoutes({ path: 'blogs/admin', method: common_2.RequestMethod.ALL });
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude({
            path: 'meta-master/types',
            method: common_2.RequestMethod.GET,
        }, {
            path: 'meta-master',
            method: common_2.RequestMethod.GET,
        })
            .forRoutes(metamaster_controller_1.MetaMasterController);
    }
};
exports.CustomerApplication = CustomerApplication;
exports.CustomerApplication = CustomerApplication = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            page_sections_controller_1.PageSectionController,
            category_controller_1.CategoryController,
            customizations_controller_1.CustomizationsController,
            auth_controller_1.AuthController,
            subcategory_controller_1.SubCategoryController,
            metamaster_controller_1.MetaMasterController,
            address_controller_1.AddressController,
            payment_methods_controller_1.PaymentMethodController,
            orders_controller_1.OrdersController,
            appointments_controller_1.AppointmentsController,
            blogs_controller_1.BlogsController,
            create_phone_calls_controller_1.CreatePhoneCallsController,
            measurement_category_controller_1.MeasurementsCategoryController,
            order_events_options_controller_1.OrderEventsOptionsController,
            landing_pages_controller_1.LandingPagesController,
        ],
        providers: [
            page_sections_service_1.PageSectionService,
            category_service_1.CategoryService,
            customizations_service_1.CustomizationsService,
            auth_service_1.AuthService,
            subcategory_service_1.SubCategoryService,
            metamaster_service_1.MetaMasterService,
            otp_service_1.OtpService,
            address_service_1.AddressService,
            payment_methods_service_1.PaymentMethodsService,
            orders_service_1.OrdersService,
            appointments_service_1.AppointmentsService,
            blogs_service_1.BlogsService,
            payment_service_1.PaymentService,
            razorpay_1.RazorpayGateway,
            phone_calls_scheduler_service_1.CreatePhoneCallService,
            measurements_service_1.MeasurementsService,
            order_events_options_service_1.OrderEventsOptionsService,
            landing_pages_service_1.LandingPagesService,
        ],
        exports: [],
    })
], CustomerApplication);
//# sourceMappingURL=customer.application.module.js.map