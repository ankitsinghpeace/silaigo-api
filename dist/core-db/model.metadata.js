"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelMetadata = void 0;
const user_schema_1 = require("./schemas/user.schema");
const profile_schema_1 = require("./schemas/profile.schema");
const address_schema_1 = require("./schemas/address.schema");
const appointment_schema_1 = require("./schemas/appointment.schema");
const availability_schema_1 = require("./schemas/availability.schema");
const category_schema_1 = require("./schemas/category.schema");
const subCategory_schema_1 = require("./schemas/subCategory.schema");
const customizations_schema_1 = require("./schemas/customizations.schema");
const customization_options_mapping_schema_1 = require("./schemas/customization.options.mapping.schema");
const meta_master_schema_1 = require("./schemas/meta.master.schema");
const metrics_schema_1 = require("./schemas/metrics.schema");
const order_schema_1 = require("./schemas/order.schema");
const page_section_schema_1 = require("./schemas/page.section.schema");
const payment_schema_1 = require("./schemas/payment.schema");
const paymentMethod_schema_1 = require("./schemas/paymentMethod.schema");
const query_schema_1 = require("./schemas/query.schema");
const role_schema_1 = require("./schemas/role.schema");
const permissions_schema_1 = require("./schemas/permissions.schema");
const schedule_schema_1 = require("./schemas/schedule.schema");
const blog_schema_1 = require("./schemas/blog.schema");
const blogReactions_schema_1 = require("./schemas/blogReactions.schema");
const phoneCall_scheduler_schema_1 = require("./schemas/phoneCall.scheduler.schema");
const identity_counters_schema_1 = require("./schemas/identity.counters.schema");
const measurements_fields_schema_1 = require("./schemas/measurements-fields.schema");
const order_events_options_schema_1 = require("./schemas/order-events-options.schema");
const order_micro_events_schema_1 = require("./schemas/order-micro-events.schema");
const pickup_schema_1 = require("./schemas/pickup.schema");
const locations_schema_1 = require("./schemas/locations.schema");
const locations_categories_schema_1 = require("./schemas/locations.categories.schema");
const category_landing_config_schema_1 = require("./schemas/category.landing.config.schema");
exports.ModelMetadata = {
    User: {
        schema: user_schema_1.UserSchema,
        collection: 'users',
        token: 'UserModel',
    },
    Profile: {
        schema: profile_schema_1.ProfileSchema,
        collection: 'profiles',
        token: 'ProfileModel',
    },
    Address: {
        schema: address_schema_1.AddressSchema,
        collection: 'addresses',
        token: 'AddressModel',
    },
    Appointment: {
        schema: appointment_schema_1.AppointmentSchema,
        collection: 'appointments',
        token: 'AppointmentModel',
    },
    Availability: {
        schema: availability_schema_1.AvailabilitySchema,
        collection: 'availabilities',
        token: 'AvailabilityModel',
    },
    Category: {
        schema: category_schema_1.CategorySchema,
        collection: 'categories',
        token: 'CategoryModel',
    },
    SubCategory: {
        schema: subCategory_schema_1.SubCategorySchema,
        collection: 'sub_categories',
        token: 'SubCategoryModel',
    },
    Customization: {
        schema: customizations_schema_1.CustomizationSchema,
        collection: 'customizations',
        token: 'CustomizationModel',
    },
    CustomizationOptionMapping: {
        schema: customization_options_mapping_schema_1.CustomizationOptionMappingSchema,
        collection: 'customization_options_mapping',
        token: 'CustomizationOptionMappingModel',
    },
    MetaMaster: {
        schema: meta_master_schema_1.MetaMasterSchema,
        collection: 'meta_master',
        token: 'MetaMasterModel',
    },
    Metrics: {
        schema: metrics_schema_1.MetricsSchema,
        collection: 'metrics',
        token: 'MetricsModel',
    },
    Order: {
        schema: order_schema_1.OrderSchema,
        collection: 'orders',
        token: 'OrderModel',
    },
    PageSection: {
        schema: page_section_schema_1.PageSectionSchema,
        collection: 'page_sections',
        token: 'PageSectionModel',
    },
    Payment: {
        schema: payment_schema_1.PaymentSchema,
        collection: 'payments',
        token: 'PaymentModel',
    },
    PaymentMethod: {
        schema: paymentMethod_schema_1.PaymentMethodSchema,
        collection: 'payment_methods',
        token: 'PaymentMethodModel',
    },
    Query: {
        schema: query_schema_1.QuerySchema,
        collection: 'queries',
        token: 'QueryModel',
    },
    Role: {
        schema: role_schema_1.RolesSchema,
        collection: 'roles',
        token: 'RoleModel',
    },
    Permission: {
        schema: permissions_schema_1.PermissionsSchema,
        collection: 'permissions',
        token: 'PermissionModel',
    },
    Schedule: {
        schema: schedule_schema_1.ScheduleSchema,
        collection: 'schedule',
        token: 'ScheduleModel',
    },
    Blog: {
        schema: blog_schema_1.BlogSchema,
        collection: 'blogs',
        token: 'BlogModel',
    },
    BlogReaction: {
        schema: blogReactions_schema_1.BlogReactionSchema,
        collection: 'blog_reactions',
        token: 'BlogReactionModel',
    },
    PhoneCallScheduler: {
        schema: phoneCall_scheduler_schema_1.PhoneCallSchedulerSchema,
        collection: 'scheduled_phone_calls',
        token: 'PhoneCallSchedulerModel',
    },
    IdentityCounters: {
        schema: identity_counters_schema_1.IdentityCountersSchema,
        collection: 'identityCounters',
        token: 'IdentityCountersModel',
    },
    MeasurementCategory: {
        schema: measurements_fields_schema_1.MeasurementCategorySchema,
        collection: 'measurementCategory',
        token: 'MeasurementCategoryModel',
    },
    MeasurementField: {
        schema: measurements_fields_schema_1.FieldSchema,
        collection: 'measurementField',
        token: 'MeasurementFieldModel',
    },
    OrderEventsOptions: {
        schema: order_events_options_schema_1.OrdersEventsOptionsSchema,
        collection: 'orderEvents',
        token: 'OrderEventsOptionsModel',
    },
    OrderMicroEvents: {
        schema: order_micro_events_schema_1.OrderMicroEventsSchema,
        collection: 'orderMicroEvents',
        token: 'OrderMicroEventsModel',
    },
    MaterialPickup: {
        schema: pickup_schema_1.MaterialPickupSchema,
        collection: 'materialPickup',
        token: 'MaterialPickupModel',
    },
    Location: {
        schema: locations_schema_1.LocationSchema,
        collection: 'locations',
        token: 'LocationModel',
    },
    LocationCategory: {
        schema: locations_categories_schema_1.LocationCategorySchema,
        collection: 'locations_x_categories',
        token: 'LocationCategoryModel',
    },
    CategoryLandingConfig: {
        schema: category_landing_config_schema_1.CategoryLandingConfigSchema,
        collection: 'category_landing_config',
        token: 'CategoryLandingConfigModel',
    },
};
//# sourceMappingURL=model.metadata.js.map