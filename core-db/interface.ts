// This file contains TypeScript interfaces for all input schemas.

import { Types } from 'mongoose';
import { BlogReactionType } from './schemas/blogReactions.schema';
import {
  OrderInitiationStatus,
  PhoneCallStatus,
} from './enums/phoneCall.scheduler.status';
import { OrderProcessingState, OrderStatus, OrderTimeLine } from './enums';

// ------------------- Address -------------------
export interface IAddress {
  _id?: string;
  profile: Types.ObjectId;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isDefault?: boolean;
}

// ------------------- Appointment -------------------
export interface IAppointment {
  _id?: string;
  profile: Types.ObjectId;
  order?: Types.ObjectId;
  date: Date;
  time: string;
  status?: 'BOOKED' | 'CANCELLED';
  notes?: string;
}

// ------------------- Availability Override -------------------
export interface IAvailabilityOverride {
  _id?: string;
  date: Date;
  type: 'HOLIDAY' | 'CUSTOM';
  workingHours?: {
    startTime: string;
    endTime: string;
  };
  slots?: Record<
    string,
    {
      isBlocked?: boolean;
      maxAppointments?: number;
    }
  >;
  reason?: string;
}

// ------------------- Category -------------------
export interface ICategoryLabel {
  _id?: string;
  title: string;
  name: string;
  color?: string;
}

export interface ICategoryOption {
  title: string;
  discountedPrice: string;
  price: string;
}

export interface ICategory {
  _id?: string;
  name: string;
  isActive: boolean;
  isVisibleOnHomePage: boolean;
  imageUrl: string;
  description: string;
  label?: ICategoryLabel;
  rank: number;
  options: ICategoryOption[];
}

// ------------------- Customization Option Mapping -------------------
export interface ICustomizationOptionMapping {
  _id?: string;
  customizationType: string;
  optionIds: number[];
  subCategoryIds: Types.ObjectId[];
  categoryId: Types.ObjectId;
}

// ------------------- Customization -------------------
export interface ICustomizationOption {
  _id?: string;
  title: string;
  imageUrl?: string;
  complexity: string;
  price: number;
  discountedPrice: number;
}

export interface ICustomization {
  _id?: string;
  type: string;
  options: ICustomizationOption[];
  rank: number;
}

// ------------------- Meta Master -------------------
export interface IMetaMaster {
  _id?: string;
  type: string; // 'discount', 'complexity', 'banner', etc.
  subType: string; // e.g., 'flat', 'basic', 'top-carousel'
  label: string; // UI display label
  value?: any; // JSON | number | string | boolean
  isActive?: boolean;
  color?: string;
}

// ------------------- Metrics -------------------
export interface IMetrics {
  _id?: string;
  profile?: Types.ObjectId;
  actionType: string;
  page: string;
  targetType?: string;
  targetId?: Types.ObjectId;
  targetTitle?: string;
  additionalData?: any;
  timestamp?: Date;
}

// ------------------- Order -------------------
export interface IOrderItem {
  _id?: string;
  orderId?: string;
  subCategory: Types.ObjectId;
  subCategoryStyleId?: number;
  customizations?: {
    optionId: Types.ObjectId;
    type: string;
  };
  notes?: string;
  options?: {
    categoryId: Types.ObjectId;
    optionId: Types.ObjectId;
  }[];
}

export interface IOrder {
  _id?: string;
  profile: Types.ObjectId;
  items: IOrderItem[];
  status?: OrderStatus;
  payment?: Types.ObjectId;
  appointment?: Types.ObjectId;
  imageUrls?: string[];
  createdAt?: Date;
  addressId?: Types.ObjectId;
  orderId: string;
  customPrice?: number;
  timeLine?: {
    status: OrderTimeLine | OrderProcessingState | string;
    timeStamp: Date;
    updatedBy: string;
    updatedByUserId: Types.ObjectId;
  }[];
  measurements: Object;
  orderProcessingState: OrderProcessingState;
  scheduledPickupDate?: string;
  scheduledPickupTime?: string;
  notes?: string;
  pinPosition?: number;
  isPinned?: boolean;
  assignedToStitchingAgentId?: string;
  paymentStatus?: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID';
  alterationNotes?: string;
  alterationPhotos?: string[];
}

// ------------------- Page Section -------------------
export interface IPageSection {
  _id?: string;
  type: string;
  data: any;
}

// ------------------- Payment -------------------
export interface IPriceBreakupCustomization {
  _id?: string;
  customizationId: Types.ObjectId;
  optionId?: Types.ObjectId;
  type: string;
  price: number;
}

export interface IPriceBreakupItem {
  _id?: string;
  subCategoryId: Types.ObjectId;
  customizations: IPriceBreakupCustomization[];
}

export interface IPayment {
  _id?: string;
  profile: Types.ObjectId;
  order: Types.ObjectId;
  razorpayPaymentId?: string;
  paymentMethod: Types.ObjectId;
  method: string;
  amount: number;
  discountedAmount?: number;
  coupon?: string;
  priceBreakup: IOrderItem[];
  status?: string;
}

// ------------------- Payment Method -------------------
export interface IPaymentMethod {
  _id?: string;
  profile: Types.ObjectId;
  methodType: string;
  token: string;
  cardType?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

// ------------------- Permission -------------------
export interface IPermission {
  _id?: string;
  type: string;
  subType: string;
  description?: string;
}

// ------------------- Profile -------------------
export interface IProfile {
  _id?: string;
  firstName: string;
  lastName?: string;
  gender: string;
  birthDate?: Date;
  phone?: string;
  email?: string;
  referralCode?: string;
  referredBy?: string;
  notes?: string;
}

// ------------------- Query -------------------
export interface IQuery {
  _id?: string;
  id: number;
  user: Types.ObjectId;
  message: string;
  status?: string;
}

// ------------------- Role -------------------
export interface IRole {
  _id?: string;
  title: string;
  code: string;
  permissions: Types.ObjectId[];
}

// ------------------- Schedule -------------------
export interface IScheduleConfig {
  _id?: string;
  name?: string;
  workingDays: string[];
  dailyHours: {
    startTime: string;
    endTime: string;
  };
  slotIntervalMinutes?: number;
  maxAppointmentsPerSlot?: number;
  isActive?: boolean;
}

// ------------------- SubCategory -------------------
export interface ISubCategoryItem {
  _id?: string;
  name: string;
  image: string;
  description?: string;
  keyAttributes?: string[];
  price?: number;
  discountedPrice?: number;
  label?: any;
  rank: number;
}

export interface ISubCategory {
  _id?: string;
  category: Types.ObjectId;
  subCategories: ISubCategoryItem[];
}

export interface IIdentityCounters {
  _id?: Types.ObjectId;
  field: string;
  modelName: string;
  count: string;
}

// ------------------- User -------------------
export interface IUser {
  _id?: string;
  email: string;
  passwordHash: string;
  empId: string;
  firstName: string;
  lastName?: string;
  gender: string;
  joiningDate: Date;
  designation: string;
  role: IRole;
}

export interface IBlog {
  _id?: string;
  title: string;
  content: string;
  category: string;
  featuredImage: string;
  author: Types.ObjectId;
  reactions: Types.ObjectId[];
  isPublished: boolean;
}

export interface IBlogReaction {
  _id?: string;
  blog: Types.ObjectId;
  user: Types.ObjectId;
  type: BlogReactionType;
}

export interface IPhoneCalls {
  profile: Types.ObjectId;
  category: Types.ObjectId;
  appointmentDate: Date;
  callStatus: PhoneCallStatus;
  orderInitiationStatus: OrderInitiationStatus;
  notes?: string;
}

export interface IMeasurementField {
  id: string;
  name: string;
}

export interface IMeasurementCategory extends Document {
  name: string;
  label: string;
  fields: IMeasurementField[];
}

export interface IEventOptionItem {
  label: string;
  type: 'checkbox' | 'action' | 'input' | 'dropdown';
  inputRequired?: boolean;
  inputType?: 'text' | 'textarea' | 'select' | null;
  dataSource?: string | null;
  repeatable?: boolean;
}

export interface OrdersEventsOptions {
  roleId: Types.ObjectId;
  options: IEventOptionItem[];
}

export interface MicroEventEntry {
  status: string;
  key: string;
  value?: boolean | string | number | Record<string, any> | null;
  timeStamp: Date;
  updatedBy: string;
  updatedByUserId: Types.ObjectId;
}

export interface MicroEventsTimeline {
  _id?: Types.ObjectId;
  orderId: Types.ObjectId;
  roleId: Types.ObjectId;
  events: MicroEventEntry[];
}

export interface IMaterialPickup {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isDefault?: boolean;
  pickupFor?: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  scheduledPickupTime: string;
  scheduledPickupDate: string;
  options: { label: string; type: string; value: boolean }[];
  timeline?: {
    status?: string;
    timeStamp?: Date;
    updatedBy?: string;
    updatedByUserId?: Types.ObjectId;
  }[];
}

export interface ILocation {
  _id?: string;
  name: string;
  sublocations: Types.ObjectId[];

  pricingCardSubCategoryIds: Types.ObjectId[];
  mainCardSubCategoryIds: Types.ObjectId[];

  longDescription?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICustomizationOption {
  enabled: boolean;
  optionIds?: string[];
}

export interface ICustomizationOptions {
  neck: ICustomizationOption;
  sleeve: ICustomizationOption;
  backNeck: ICustomizationOption;
  addOns: ICustomizationOption;
  accessories: ICustomizationOption;
  options: ICustomizationOption;
}

export interface ICategoryLandingConfig {
  _id?: string;

  categoryId: Types.ObjectId;
  categoryName: string;

  pricingCardSubCategoryIds: Types.ObjectId[];
  mainCardSubCategoryIds: Types.ObjectId[];

  customizationOptions: ICustomizationOptions;

  longDescription?: string;
}

export interface ILocationCategory extends Document {
  locationId: Types.ObjectId;
  locationName: string;

  categoryId: Types.ObjectId;
  categoryName: string;

  longDescription?: string;
}
