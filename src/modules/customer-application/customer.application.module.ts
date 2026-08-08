import { Module } from '@nestjs/common';
import { PageSectionService } from './services/page.sections.service';
import { PageSectionController } from './controllers/page.sections.controller';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { SubCategoryController } from './controllers/subcategory.controller';
import { SubCategoryService } from './services/subcategory.service';
import { MetaMasterController } from './controllers/metamaster.controller';
import { MetaMasterService } from './services/metamaster.service';
import { CustomizationsController } from './controllers/customizations.controller';
import { CustomizationsService } from './services/customizations.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtMiddleware } from 'src/core/middlewares/jwt.middleware';
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { PaymentMethodController } from './controllers/payment-methods.controller';
import { PaymentMethodsService } from './services/payment-methods.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { AppointmentsController } from './controllers/appointments.controller';
import { AppointmentsService } from './services/appointments.service';
import { BlogsController } from './controllers/blogs.controller';
import { BlogsService } from './services/blogs.service';
import { PaymentService } from './services/payment.service';
import { RazorpayGateway } from './services/payments/razorpay';
import { CreatePhoneCallService } from './services/phone-calls-scheduler.service';
import { CreatePhoneCallsController } from './controllers/create-phone-calls.controller';
import { MeasurementsCategoryController } from './controllers/measurement-category.controller';
import { MeasurementsService } from './services/measurements.service';
import { OrderEventsOptionsService } from './services/order-events-options.service';
import { OrderEventsOptionsController } from './controllers/order-events-options.controller';
import { LandingPagesController } from './controllers/landing.pages.controller';
import { LandingPagesService } from './services/landing.pages.service';

@Module({
  imports: [],
  controllers: [
    PageSectionController,
    CategoryController,
    CustomizationsController,
    AuthController,
    SubCategoryController,
    MetaMasterController,
    AddressController,
    PaymentMethodController,
    OrdersController,
    AppointmentsController,
    BlogsController,
    CreatePhoneCallsController,
    MeasurementsCategoryController,
    OrderEventsOptionsController,
    LandingPagesController,
  ],
  providers: [
    PageSectionService,
    CategoryService,
    CustomizationsService,
    AuthService,
    SubCategoryService,
    MetaMasterService,
    OtpService,
    AddressService,
    PaymentMethodsService,
    OrdersService,
    AppointmentsService,
    BlogsService,
    PaymentService,
    RazorpayGateway,
    CreatePhoneCallService,
    MeasurementsService,
    OrderEventsOptionsService,
    LandingPagesService,
  ],
  exports: [],
})
export class CustomerApplication implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: 'auth/register',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/refresh-token',
          method: RequestMethod.GET,
        },
        {
          path: 'auth/generate-otp',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/generate-master-otp',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/verify-otp',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/resend-otp',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/customer-login',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/create-profile',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/internal-login',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(AuthController);

    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: 'category/{*splat}',
          method: RequestMethod.GET,
        },
        {
          path: 'category',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CategoryController);

    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: 'customizations/{*splat}',
          method: RequestMethod.GET,
        },
        {
          path: 'customizations',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomizationsController);

    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: 'page-sections/{*splat}',
          method: RequestMethod.GET,
        },
        {
          path: 'page-sections/upload-image',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(PageSectionController);

    consumer.apply(JwtMiddleware).forRoutes(AddressController);

    consumer.apply(JwtMiddleware).forRoutes(PaymentMethodController);

    consumer.apply(JwtMiddleware).forRoutes(OrdersController);

    consumer.apply(JwtMiddleware).forRoutes(AppointmentsController);

    consumer.apply(JwtMiddleware).forRoutes(CreatePhoneCallsController);

    consumer.apply(JwtMiddleware).forRoutes(MeasurementsCategoryController);

    consumer.apply(JwtMiddleware).forRoutes(OrderEventsOptionsController);

    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: 'blogs/{*splat}',
          method: RequestMethod.GET,
        },
        {
          path: 'blogs',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(BlogsController);

    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: 'blogs/admin', method: RequestMethod.ALL });

    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: 'meta-master/types',
          method: RequestMethod.GET,
        },
        {
          path: 'meta-master',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(MetaMasterController);
  }
  // configure(consumer: MiddlewareConsumer) {}
}
