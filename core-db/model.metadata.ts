// core-db/model.metadata.ts

import { Schema } from 'mongoose';

// Import all schemas
import { UserSchema } from 'core-db/schemas/user.schema';
import { ProfileSchema } from 'core-db/schemas/profile.schema';
import { AddressSchema } from 'core-db/schemas/address.schema';
import { AppointmentSchema } from 'core-db/schemas/appointment.schema';
import { AvailabilitySchema } from 'core-db/schemas/availability.schema';
import { CategorySchema } from 'core-db/schemas/category.schema';
import { SubCategorySchema } from 'core-db/schemas/subCategory.schema';
import { CustomizationSchema } from 'core-db/schemas/customizations.schema';
import { CustomizationOptionMappingSchema } from 'core-db/schemas/customization.options.mapping.schema';
import { MetaMasterSchema } from 'core-db/schemas/meta.master.schema';
import { MetricsSchema } from 'core-db/schemas/metrics.schema';
import { OrderSchema } from 'core-db/schemas/order.schema';
import { PageSectionSchema } from 'core-db/schemas/page.section.schema';
import { PaymentSchema } from 'core-db/schemas/payment.schema';
import { PaymentMethodSchema } from 'core-db/schemas/paymentMethod.schema';
import { QuerySchema } from 'core-db/schemas/query.schema';
import { RolesSchema } from 'core-db/schemas/role.schema';
import { PermissionsSchema } from 'core-db/schemas/permissions.schema';
import { ScheduleSchema } from './schemas/schedule.schema';
import { BlogSchema } from './schemas/blog.schema';
import { BlogReactionSchema } from './schemas/blogReactions.schema';
import { PhoneCallSchedulerSchema } from './schemas/phoneCall.scheduler.schema';
import { IdentityCountersSchema } from './schemas/identity.counters.schema';
import {
  FieldSchema,
  MeasurementCategorySchema,
} from './schemas/measurements-fields.schema';
import { OrdersEventsOptionsSchema } from './schemas/order-events-options.schema';
import { OrderMicroEventsSchema } from './schemas/order-micro-events.schema';
import { MaterialPickupSchema } from './schemas/pickup.schema';
import { LocationSchema } from './schemas/locations.schema';
import { LocationCategorySchema } from './schemas/locations.categories.schema';
import { CategoryLandingConfigSchema } from './schemas/category.landing.config.schema';

// ✅ Central place for schema, collection name, and model token
export const ModelMetadata = {
  User: {
    schema: UserSchema,
    collection: 'users',
    token: 'UserModel',
  },
  Profile: {
    schema: ProfileSchema,
    collection: 'profiles',
    token: 'ProfileModel',
  },
  Address: {
    schema: AddressSchema,
    collection: 'addresses',
    token: 'AddressModel',
  },
  Appointment: {
    schema: AppointmentSchema,
    collection: 'appointments',
    token: 'AppointmentModel',
  },
  Availability: {
    schema: AvailabilitySchema,
    collection: 'availabilities',
    token: 'AvailabilityModel',
  },
  Category: {
    schema: CategorySchema,
    collection: 'categories',
    token: 'CategoryModel',
  },
  SubCategory: {
    schema: SubCategorySchema,
    collection: 'sub_categories',
    token: 'SubCategoryModel',
  },
  Customization: {
    schema: CustomizationSchema,
    collection: 'customizations',
    token: 'CustomizationModel',
  },
  CustomizationOptionMapping: {
    schema: CustomizationOptionMappingSchema,
    collection: 'customization_options_mapping',
    token: 'CustomizationOptionMappingModel',
  },
  MetaMaster: {
    schema: MetaMasterSchema,
    collection: 'meta_master',
    token: 'MetaMasterModel',
  },
  Metrics: {
    schema: MetricsSchema,
    collection: 'metrics',
    token: 'MetricsModel',
  },
  Order: {
    schema: OrderSchema,
    collection: 'orders',
    token: 'OrderModel',
  },
  PageSection: {
    schema: PageSectionSchema,
    collection: 'page_sections',
    token: 'PageSectionModel',
  },
  Payment: {
    schema: PaymentSchema,
    collection: 'payments',
    token: 'PaymentModel',
  },
  PaymentMethod: {
    schema: PaymentMethodSchema,
    collection: 'payment_methods',
    token: 'PaymentMethodModel',
  },
  Query: {
    schema: QuerySchema,
    collection: 'queries',
    token: 'QueryModel',
  },
  Role: {
    schema: RolesSchema,
    collection: 'roles',
    token: 'RoleModel',
  },
  Permission: {
    schema: PermissionsSchema,
    collection: 'permissions',
    token: 'PermissionModel',
  },
  Schedule: {
    schema: ScheduleSchema,
    collection: 'schedule',
    token: 'ScheduleModel',
  },
  Blog: {
    schema: BlogSchema,
    collection: 'blogs',
    token: 'BlogModel',
  },
  BlogReaction: {
    schema: BlogReactionSchema,
    collection: 'blog_reactions',
    token: 'BlogReactionModel',
  },
  PhoneCallScheduler: {
    schema: PhoneCallSchedulerSchema,
    collection: 'scheduled_phone_calls',
    token: 'PhoneCallSchedulerModel',
  },
  IdentityCounters: {
    schema: IdentityCountersSchema,
    collection: 'identityCounters',
    token: 'IdentityCountersModel',
  },
  MeasurementCategory: {
    schema: MeasurementCategorySchema,
    collection: 'measurementCategory',
    token: 'MeasurementCategoryModel',
  },
  MeasurementField: {
    schema: FieldSchema,
    collection: 'measurementField',
    token: 'MeasurementFieldModel',
  },
  OrderEventsOptions: {
    schema: OrdersEventsOptionsSchema,
    collection: 'orderEvents',
    token: 'OrderEventsOptionsModel',
  },
  OrderMicroEvents: {
    schema: OrderMicroEventsSchema,
    collection: 'orderMicroEvents',
    token: 'OrderMicroEventsModel',
  },
  MaterialPickup: {
    schema: MaterialPickupSchema,
    collection: 'materialPickup',
    token: 'MaterialPickupModel',
  },
  Location: {
    schema: LocationSchema,
    collection: 'locations',
    token: 'LocationModel',
  },
  LocationCategory: {
    schema: LocationCategorySchema,
    collection: 'locations_x_categories',
    token: 'LocationCategoryModel',
  },
  CategoryLandingConfig: {
    schema: CategoryLandingConfigSchema,
    collection: 'category_landing_config',
    token: 'CategoryLandingConfigModel',
  },
};
