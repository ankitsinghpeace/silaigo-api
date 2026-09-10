/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import {
  ICustomization,
  IOrder,
  ISubCategory,
  IProfile,
  ICategory,
  IPayment,
  IMetaMaster,
  IAppointment,
  IIdentityCounters,
  IAddress,
  IMaterialPickup,
} from 'core-db/interface';
import { ModelMetadata } from 'core-db/model.metadata';
import {
  CreateAdminOrderDto,
  CreateMaterialPickupDto,
  CreateOrderDto,
  GetAllOrdersDto,
  UpdatePickupDto,
  UpdateProcessingStateDto,
} from '../dto/order.dto';
import {
  OrderProcessingState,
  OrderProcessingStateToUserRole,
  OrderStatus,
  OrderStatusToTimelineMap,
  OrderTimeLine,
  RoleToProfileAttributesMap,
  TimelineToStatusMap,
} from 'core-db/enums/order.enums';
import { RoleCode } from 'core-db/enums/roles.enums';
import { PaymentService } from './payment.service';
import { VerifyPaymentRequest } from './payments/interfaces';
import { MetaMasterService } from './metamaster.service';
import * as moment from 'moment-timezone';
import { AppointmentsService } from './appointments.service';
import { OrderEventsOptionsService } from './order-events-options.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ModelMetadata.Order.token)
    private readonly orderModel: Model<IOrder>,
    @Inject(ModelMetadata.SubCategory.token)
    private readonly subCategoryModel: Model<ISubCategory>,
    @Inject(ModelMetadata.IdentityCounters.token)
    private readonly identityCountersModel: Model<IIdentityCounters>,
    @Inject(ModelMetadata.Customization.token)
    private readonly customizationModel: Model<ICustomization>,
    @Inject(ModelMetadata.Category.token)
    private readonly categoryModel: Model<ICategory>,
    private readonly paymentService: PaymentService,
    @Inject(ModelMetadata.Payment.token)
    private readonly paymentModel: Model<IPayment>,
    @Inject(ModelMetadata.MetaMaster.token)
    private readonly metaMasterModel: Model<IMetaMaster>,
    private readonly metaMasterService: MetaMasterService,
    @Inject(ModelMetadata.Appointment.token)
    private readonly appointmentModel: Model<IAppointment>,
    @Inject(ModelMetadata.Profile.token)
    private readonly profileModel: Model<IProfile>,
    @Inject(ModelMetadata.Address.token)
    private readonly addressModel: Model<IAddress>,
    @Inject(ModelMetadata.MaterialPickup.token)
    private readonly pickupModel: Model<IMaterialPickup>,
    private readonly appointmentsService: AppointmentsService,
    private readonly ordersEventsService: OrderEventsOptionsService,
  ) { }

  async getSubCategoryStyle(
    subCategoryId: mongoose.Types.ObjectId,
    subCategoryStyleId: number,
  ) {
    try {
      const subCategoryStyle: any = await this.subCategoryModel
        .findOne(
          {
            _id: subCategoryId,
            'SubCategories._id': subCategoryStyleId,
          },
          { 'SubCategories.$': 1 },
        )
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
    } catch (error) {
      throw new NotFoundException('SubCategory Style not found');
    }
  }

  async getTotalPrice(subCategory, customizations, options, order) {
    const priceBreakup: {
      basePrice: number;
      customizations: {
        title: string;
        price: number;
        image: string | undefined;
        type: 'customizations' | 'options';
        id: string;
      }[];
      total: number;
    } = {
      basePrice:
        subCategory.discountedPrice >= 0
          ? subCategory.discountedPrice
          : subCategory.price,
      customizations: [],
      total:
        subCategory.discountedPrice >= 0
          ? subCategory.discountedPrice
          : subCategory.price,
    };

    if (customizations) {
      for (let i = 0; i < customizations.length; i++) {
        const customization = await this.customizationModel
          .find(
            {
              type: customizations[i].type,
              'options._id': customizations[i].optionId,
            },
            { 'options.$': 1 },
          )
          .lean();
        if (customization && customization.length > 0) {
          const options = customization[0].options;
          for (let i = 0; i < options.length; i++) {
            const option = options[i];
            priceBreakup.customizations.push({
              title: option.title,
              price:
                option.discountedPrice >= 0
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
        const category = await this.categoryModel
          .findOne({ _id: options[i].categoryId.toString() })
          .select('options imageUrl')
          .lean();
        if (category && options[i].optionId) {
          const option = category.options.find((option: any) => {
            return option._id.toString() === options[i].optionId.toString();
          });
          if (option) {
            priceBreakup.customizations.push({
              title: option.title,
              price:
                Number(option.discountedPrice) >= 0
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
    priceBreakup.total = priceBreakup.customizations.reduce(
      (acc, curr) => acc + curr.price,
      0,
    );

    if (order.customPrice && order.customPrice > 0) {
      priceBreakup.total = order.customPrice;
      priceBreakup.basePrice = order.customPrice;
      priceBreakup.customizations = priceBreakup.customizations.map((elem) => {
        elem.price = 0;
        return elem;
      });
    } else {
      priceBreakup.total += priceBreakup.basePrice;
    }

    return priceBreakup;
  }

  formatTimeSlot(slotTime) {
    const [hours, minutes] = slotTime.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;

    return `${formattedTime}`;
  }

  // routes
  async createOrder(orderDto: CreateOrderDto, req: any) {
    return this.orderModel.create({
      items: orderDto.items ? { ...orderDto.items } : [],
      profile: req.user._id,
      status: OrderStatus.PENDING,
      imageUrls: orderDto.imageUrls ? orderDto.imageUrls : [],
      timeLine: [
        {
          status: OrderTimeLine.ORDER_CREATED,
          timeStamp: Date.now(),
          updatedBy: `${req.user.firstName} ${req.user.lastName}`,
          updatedByUserId: req.user._id,
        },
      ],
    });
  }

  async createAdminOrder(orderDto: CreateAdminOrderDto, req: any) {
    let customer = await this.profileModel.findOne({ phone: orderDto.phone });

    if (!customer) {
      if (!orderDto.phone && orderDto.name) {
        throw new BadRequestException('Customer phone and name required');
      }

      if (orderDto.phone.length != 10) {
        throw new BadRequestException('Invalid phone number');
      }

      customer = await this.profileModel.create({
        phone: orderDto.phone,
        firstName: orderDto.name,
        lastName: '',
      });
    }

    return this.orderModel.create({
      items: orderDto.items ? { ...orderDto.items } : [],
      profile: customer._id,
      status: OrderStatus.PENDING,
      imageUrls: orderDto.imageUrls ? orderDto.imageUrls : [],
      timeLine: [],
      customPrice:
        !isNaN(orderDto.customPrice) && orderDto.customPrice > 0
          ? orderDto.customPrice
          : null,
      measurements: orderDto?.measurements,
      scheduledPickupTime: orderDto?.scheduledPickupTime,
      scheduledPickupDate: orderDto?.scheduledPickupDate,
    });
  }

  async cart(orderData: any, req: any) {
    const { customerData, orderItems, pickupId } = orderData;
    let customer = await this.profileModel.findOne({
      phone: customerData.phone,
    });

    if (!customer) {
      if (!customerData.phone && customerData.name) {
        throw new BadRequestException('Customer phone and name required');
      }

      if (customerData.phone.length != 10) {
        throw new BadRequestException('Invalid phone number');
      }

      customer = await this.profileModel.create({
        phone: customerData.phone,
        firstName: customerData.name,
        lastName: '',
      });
    }

    // create address
    const address = await this.addressModel.create({
      profile: customer._id,
      addressLine1: customerData.addressLine1,
      addressLine2: customerData.addressLine2,
      city: customerData.city,
      state: customerData.state,
      pincode: customerData.pincode,
    });

    const firstOrderItem = orderItems[0];
    const firstOrderItemRes = await this.orderModel.create({
      profile: customer._id,
      addressId: address._id,
      pickupId: pickupId,
      items: firstOrderItem.items ? { ...firstOrderItem.items } : [],
      status: OrderStatus.PENDING,
      orderProcessingState:
        orderData.orderProcessingState ||
        firstOrderItem.orderProcessingState ||
        OrderProcessingState.ORDER_PLACED,
      imageUrls: firstOrderItem.imageUrls ? firstOrderItem.imageUrls : [],
      timeLine: [],
      customPrice:
        !isNaN(firstOrderItem.customPrice) && firstOrderItem.customPrice > 0
          ? firstOrderItem.customPrice
          : null,
      measurements: firstOrderItem.measurements
        ? firstOrderItem.measurements
        : {},
      scheduledPickupTime: customerData?.scheduledPickupTime,
      scheduledPickupDate: customerData?.scheduledPickupDate,
      notes: firstOrderItem?.notes,
    });

    let appointment;
    try {
      appointment = await this.appointmentsService.bookSlot(
        customerData.date,
        customerData.time,
        firstOrderItemRes._id,
        req,
        '',
        address._id,
        customer._id,
      );
    } catch (error) {
      await this.orderModel.deleteOne({ _id: firstOrderItemRes._id });
      await this.addressModel.deleteOne({ _id: address._id });
      throw error;
    }

    const remainingOrderItems = orderItems.slice(1).map((item) => {
      return {
        profile: customer._id,
        addressId: address._id,
        pickupId: pickupId,
        items: item.items ? { ...item.items } : [],
        status: OrderStatus.PAYMENT_PENDING,
        orderProcessingState:
          orderData.orderProcessingState ||
          item.orderProcessingState ||
          OrderProcessingState.ORDER_PLACED,
        imageUrls: item.imageUrls ? item.imageUrls : [],
        timeLine: [],
        customPrice:
          !isNaN(item.customPrice) && item.customPrice > 0
            ? item.customPrice
            : null,
        appointment: appointment._id,
        measurements: item.measurements ? item.measurements : {},
        scheduledPickupTime: customerData?.scheduledPickupTime,
        scheduledPickupDate: customerData?.scheduledPickupDate,
        notes: item?.notes,
      };
    });

    if (remainingOrderItems.length > 0) {
      await this.orderModel.insertMany(remainingOrderItems);
    }

    if (pickupId) {
      await this.pickupModel.findOneAndUpdate(
        { _id: pickupId },
        {
          isOrderCreated: true,
        },
      );
      const pickupOptions: { label: string; value: boolean }[] = [
        { label: 'Material Picked Up from Customer', value: true },
        { label: 'Material Delivered to Workshop', value: true },
        { label: 'Order fulfilled', value: true },
      ];
      await this.updatePickupOptions(pickupId, pickupOptions, req);
    }

    return { message: 'Orders created successfully' };
  }

  async getOrderDetails(orderId: string, req: any) {
    const details = await this.orderModel
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
      throw new NotFoundException('Order not found');
    }

    const isOwner =
      details.profile != null
        ? details.profile._id.toString() === req.user._id.toString()
        : false;
    const isCustomer = req.user.role === 'customer';
    const hasAdminRole = Object.values(RoleCode).includes(req.user.role);

    const isAuthorized = (isOwner && isCustomer) || hasAdminRole;

    if (!isAuthorized) {
      throw new ForbiddenException(
        'You are not authorized to access this order',
      );
    }

    const style = await this.getSubCategoryStyle(
      details!.items[0].subCategory,
      details!.items[0].subCategoryStyleId!,
    );
    const priceBreakup = await this.getTotalPrice(
      style,
      details!.items[0].customizations,
      details!.items[0].options,
      details,
    );

    // Organize data by categories
    const organizedDetails = {
      appointment: details.appointment || {},
      address:
        req.user.role === RoleCode.CUTTING ||
          req.user.role === RoleCode.STITCHING
          ? null
          : {
            ...details.addressId,
            phone: details.profile ? (details.profile as any).phone : '',
            name: details.profile
              ? `${(details?.profile as any).firstName} ${(details?.profile as any).lastName}`
              : '',
          },
      order: {
        _id: details._id,
        status: details.status,
        orderProcessingState: details.orderProcessingState,
        items: details.items || [],
        imageUrls: details.imageUrls,
        createdAt: details.createdAt,
        notes: details.notes || 'N/A',
        alterationNotes: details.alterationNotes || '',
        alterationPhotos: details.alterationPhotos || [],
      },
      alterationNotes: details.alterationNotes || '',
      alterationPhotos: details.alterationPhotos || [],
      payment: details.payment || {},
      style: {
        name: style.name,
        image: style.image,
        price: priceBreakup.basePrice,
      },
      priceBreakup: priceBreakup,
      measurements: req.user.role != 'customer' ? details?.measurements : {},
    };

    return organizedDetails;
  }

  async getNextOrderId(categoryId: string, subCategoryName: string) {
    // Define the filter for the counter increment
    const filter = {
      field: 'orderId',
      modelName: 'orders',
    };

    const update = { $inc: { count: 1 } };

    const options = {
      new: true,
      upsert: true,
    };

    // Increment the counter
    const result = await this.identityCountersModel.findOneAndUpdate(
      filter,
      update,
      options,
    );

    if (!result) {
      throw new Error('Failed to generate order ID: result is null.');
    }

    // Zero-pad the count to 4 digits
    const paddedCount = result.count.toString().padStart(4, '0');

    // Fetch category data from model by _id
    const category: any = await this.subCategoryModel.findOne({
      _id: categoryId,
    });
    if (!category) {
      throw new Error('Category not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const categoryIdFormatted = category?.categoryId.toString(); // assuming you want to use _id from model
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const paddedCategoryId = categoryIdFormatted.toString().padStart(2, '0');

    // Generate the 3-letter abbreviation for the subCategoryName
    const subCategoryAbbreviation = subCategoryName
      .split(' ') // split by space
      .map((word) => word.charAt(0).toUpperCase()) // take the first letter of each word
      .join('') // join to create the abbreviation
      .slice(0, 3); // ensure it's only 3 letters

    // Final formatted order ID
    const orderId = `${paddedCategoryId}${subCategoryAbbreviation}${paddedCount}`;

    return orderId;
  }

  async getOrderList(req: any, page: number, limit: number) {
    const pageLimit = Math.min(Number(limit), 20);
    const currentPage = Math.max(1, Number(page));
    const skip = (currentPage - 1) * pageLimit;
    let query: any = { profile: req.user._id };

    let total: number = await this.orderModel.countDocuments(query);

    const orders: any = await this.orderModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageLimit)
      .lean();

    const orderList = await Promise.all(
      orders.map(async (order) => {
        const style = await this.getSubCategoryStyle(
          order.items[0].subCategory,
          order.items[0].subCategoryStyleId!,
        );
        const priceBreakup = await this.getTotalPrice(
          style,
          order.items[0].customizations,
          order.items[0].options,
          order,
        );
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
      }),
    );

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
  }

  async getAllOrders(dto: GetAllOrdersDto, req: any) {
    const {
      orderId,
      customerPhone,
      customerName,
      orderStatus,
      orderDate,
      sortBy = 'newest',
      startDate,
      appointmentDate,
      couponCode,
      endDate,
      page = 1,
      limit = 20,
      productName,
      all_orders = '0',
      sortByDeliveryDate = '0',
      customerId = null,
    } = dto;

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

    if (
      startDateObj &&
      endDateObj &&
      startDateObj.getTime() > endDateObj.getTime()
    ) {
      throw new BadRequestException(
        'Start date cannot be greater than end date',
      );
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

    const isCustomerView =
      filters.customerPhone || filters.customerName || filters.customerId;

    let query: any = {};
    if (req.user.role !== RoleCode.ADMIN && all_orders === '0') {
      const allowedStates = OrderProcessingStateToUserRole[req.user.role];
      query['orderProcessingState'] = { $in: allowedStates };
    }

    if (req.user.role === RoleCode.STITCHING && all_orders === '0') {
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
      query.createdAt = {
        ...(query.createdAt ?? {}),
        $gte: new Date(startDateObj.setHours(0, 0, 0, 0)),
      };
    }
    if (endDate && endDateObj) {
      query.createdAt = {
        ...(query.createdAt ?? {}),
        $lte: new Date(endDateObj.setHours(23, 59, 59, 999)),
      };
    }

    const isNewest = sortBy === 'newest';
    const sortDirection = isNewest ? -1 : 1;
    let sort: { createdAt: 1 | -1 } = { createdAt: sortDirection as 1 | -1 };

    let total: number;
    total = await this.orderModel.countDocuments(query);

    const queryBuilder: any = this.orderModel
      .find(query)
      .populate({
        path: 'profile',
        select: RoleToProfileAttributesMap[req.user.role],
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

    const orders = await queryBuilder.lean();
    // Apply customer filters after population
    let filteredOrders = orders;

    if (customerPhone) {
      filteredOrders = filteredOrders.filter((order) => {
        return (
          order.profile &&
          order.profile.phone &&
          order.profile.phone === customerPhone
        );
      });
    }

    if (customerId) {
      filteredOrders = filteredOrders.filter((order) => {
        return (
          order.profile &&
          order.profile._id &&
          order.profile._id.toString() === customerId
        );
      });
    }

    if (customerName) {
      const escapedName = customerName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const nameRegex = new RegExp(escapedName.split(/\s+/).join('\\s*'), 'i');

      filteredOrders = filteredOrders.filter((order) => {
        if (!order.profile) return false;
        const fullName = `${order.profile.firstName || ''} ${order.profile.lastName || ''}`;
        return nameRegex.test(fullName);
      });
    }

    if (appointmentDate && appointmentDateObj) {
      appointmentDateObj.setHours(0, 0, 0, 0);
      filteredOrders = filteredOrders.filter((order) => {
        if (!order.appointment) return false;
        const appointmentBookedDateObj = new Date(order.appointment.date);
        appointmentBookedDateObj.setHours(0, 0, 0, 0);
        return (
          appointmentBookedDateObj.getTime() === appointmentDateObj.getTime()
        );
      });
    }

    let orderList = filteredOrders.map(async (order) => {
      if (!isCustomerView) {
        const style = await this.getSubCategoryStyle(
          order?.items[0]?.subCategory,
          order?.items[0]?.subCategoryStyleId!,
        );
        return {
          orderId: order?.items?.[0]?.orderId || 'NA',
          id: order._id,
          customerName: order.profile
            ? `${order.profile.firstName || ''} ${order.profile.lastName || ''}`.trim()
            : 'N/A',
          customerId: order.profile?._id || 'N/A',
          appointmentDate: order.appointment?.date
            ? order.appointment.date
            : 'N/A',
          appointmentTime: order.appointment?.time
            ? this.formatTimeSlot(order.appointment.time)
            : 'N/A',
          orderDate: order.createdAt,
          notes: order.notes || '-',
          orderProcessingState: order.orderProcessingState || 'Order Placed',
          alterationNotes: order?.alterationNotes || '',
          alterationPhotos: order?.alterationPhotos || [],
          cuttingStartedAt: order.timeLine?.find((t) => t.status === 'CUTTING_START')?.timeStamp || null,
          cuttingEndedAt: order.timeLine?.find((t) => t.status === 'CUTTING_END')?.timeStamp || null,
          productName: style.name,
          garmentName: style.name,
        };
      }

      const style = await this.getSubCategoryStyle(
        order?.items[0]?.subCategory,
        order?.items[0]?.subCategoryStyleId!,
      );
      let timeline: any = [];

      if (req.user.role === RoleCode.ADMIN) {
        timeline = await this.ordersEventsService.getAggregatedTimeLine(
          order._id,
        );
        console.log(timeline);
      }

      return {
        orderId: order?.items?.[0]?.orderId || 'NA',
        id: order._id,
        assignedToStitchingAgentId: order?.assignedToStitchingAgentId || 'none',
        orderDate: order.createdAt,
        orderStatus: order.status,
        customerName: order.profile
          ? `${order.profile.firstName || ''} ${order.profile.lastName || ''}`.trim()
          : 'N/A',
        customerPhone: order.profile?.phone || 'N/A',
        customerId: order.profile?._id || 'N/A',
        appointmentDate: order.appointment?.date
          ? order.appointment.date
          : 'N/A',
        appointmentTime: order.appointment?.time
          ? this.formatTimeSlot(order.appointment.time)
          : 'N/A',
        productName: style.name,
        garmentName: style.name,
        productPrice: order.payment?.discountedAmount || 'N/A',
        timeLine: timeline || [],
        customPrice: order.customPrice || 'N/A',
        measurements: order.measurements || {},
        orderProcessingState: order.orderProcessingState || 'Order Placed',
        alterationNotes: order?.alterationNotes || '',
        alterationPhotos: order?.alterationPhotos || [],
        scheduledPickupDate: order?.scheduledPickupDate || null,
        scheduledPickupTime: order?.scheduledPickupTime || null,
        isPinned: order?.isPinned,
        pinPosition: order?.pinPosition,
        paymentStatus: order?.paymentStatus,
        address:
          req.user.role === RoleCode.ADMIN ? order?.addressId || 'N/A' : 'N/A',
        cuttingStartedAt: order.timeLine?.find((t) => t.status === 'CUTTING_START')?.timeStamp || null,
        cuttingEndedAt: order.timeLine?.find((t) => t.status === 'CUTTING_END')?.timeStamp || null,
      };
    });

    orderList = await Promise.all(orderList);

    if (productName && isCustomerView) {
      const productNameRegex = new RegExp(
        productName.split(/\s+/).join('\\s*'),
        'i',
      );
      orderList = orderList.filter((order) => {
        return productNameRegex.test(order.productName);
      });
    }

    if (couponCode && isCustomerView) {
      const couponCodeRegex = new RegExp(
        couponCode.split(/\s+/).join('\\s*'),
        'i',
      );
      orderList = orderList.filter((order) => {
        return couponCodeRegex.test(order.couponCode);
      });
    }

    if (sortByDeliveryDate === '1' && isCustomerView) {
      orderList.sort((a, b) => {
        if (!a.appointmentDate) return 1; // push null to bottom
        if (!b.appointmentDate) return -1; // push null to bottom

        return (
          new Date(a.appointmentDate).getTime() -
          new Date(b.appointmentDate).getTime()
        );
      });
    }

    const totalPages = Math.ceil(total / pageLimit);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    const pinnedOrders: any = await this.orderModel
      .find({ isPinned: true })
      .populate({
        path: 'profile',
        select: RoleToProfileAttributesMap[req.user.role],
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

    let pinnedOrderList = pinnedOrders.map(async (order) => {
      const style = await this.getSubCategoryStyle(
        order?.items[0]?.subCategory,
        order?.items[0]?.subCategoryStyleId!,
      );
      let timeline: any = [];

      if (req.user.role === RoleCode.ADMIN) {
        timeline = await this.ordersEventsService.getAggregatedTimeLine(
          order._id,
        );
      }

      return {
        orderId: order?.items?.[0]?.orderId || 'NA',
        id: order._id,
        assignedToStitchingAgentId: order?.assignedToStitchingAgentId || 'none',
        orderDate: order.createdAt,
        orderStatus: order.status,
        customerName: order.profile
          ? `${order.profile.firstName || ''} ${order.profile.lastName || ''}`.trim()
          : 'N/A',
        customerPhone: order.profile?.phone || 'N/A',
        appointmentDate: order.appointment?.date
          ? order.appointment.date
          : 'N/A',
        appointmentTime: order.appointment?.time
          ? this.formatTimeSlot(order.appointment.time)
          : 'N/A',
        productName: style.name,
        garmentName: style.name,
        productPrice: order.payment?.discountedAmount || 'N/A',
        timeLine: timeline || [],
        customPrice: order.customPrice || 'N/A',
        measurements: order.measurements || {},
        orderProcessingState: order.orderProcessingState || 'Order Placed',
        alterationNotes: order?.alterationNotes || '',
        alterationPhotos: order?.alterationPhotos || [],
        scheduledPickupDate: order?.scheduledPickupDate || null,
        scheduledPickupTime: order?.scheduledPickupTime || null,
        isPinned: order?.isPinned,
        pinPosition: order?.pinPosition,
        cuttingStartedAt: order.timeLine?.find((t) => t.status === 'CUTTING_START')?.timeStamp || null,
        cuttingEndedAt: order.timeLine?.find((t) => t.status === 'CUTTING_END')?.timeStamp || null,
      };
    });

    pinnedOrderList = await Promise.all(pinnedOrderList);

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
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, req: any) {
    const timelineEvent = OrderStatusToTimelineMap[status];
    const updates: any = {
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

    const order = await this.orderModel.findByIdAndUpdate(orderId, updates, {
      new: true,
    });
    return order;
  }

  async addTimelineEvent(orderId: string, event: OrderTimeLine, req: any) {
    const status = TimelineToStatusMap[event];

    const updates: any = {
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

    const order = await this.orderModel.findByIdAndUpdate(orderId, updates, {
      new: true,
    });

    return order;
  }

  async cancelOrder(orderId, req) {
    const order: any = await this.orderModel
      .findOne({ _id: orderId })
      .populate('appointment', 'date time _id');
    console.log(order);
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    if (order?.profile.toString() != req.user._id.toString()) {
      throw new ForbiddenException(
        'You are no allowed to modify this order status',
      );
    }

    const date = new Date(order.appointment!.date);
    const [hh, mm] = order.appointment!.time.split(':');
    date.setHours(Number(hh), Number(mm));
    const appointmentDate = moment.tz(date.toISOString(), 'Asia/Kolkata');
    const now = moment.tz(new Date(), 'Asia/Kolkata');

    if (!now.isBefore(appointmentDate)) {
      throw new ForbiddenException(
        'You are no allowed to modify this order status now',
      );
    }

    order!.status = OrderStatus.CANCELLED;
    order.timeLine.push({
      status: OrderTimeLine.ORDER_CANCELLED,
      timeStamp: new Date(),
      updatedBy: `${req.user.firstName} ${req.user.lastName}`,
      updatedByUserId: req.user._id,
    });
    await order.save();
    await this.appointmentModel.findByIdAndDelete(order.appointment._id);

    return {
      order,
      message: 'order updated successfully',
    };
  }

  async createRazorpayOrder(orderId: string, couponCode: string, req: any) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const style = await this.getSubCategoryStyle(
      order.items[0].subCategory,
      order.items[0].subCategoryStyleId!,
    );

    const priceBreakup = await this.getTotalPrice(
      style,
      order.items[0].customizations,
      order.items[0].options,
      order,
    );

    let res = { discount: 0, code: '' };

    if (couponCode && couponCode !== '') {
      res = await this.metaMasterService.validateCoupon(
        {
          couponCode,
          amount: priceBreakup.total,
        },
        req,
      );
    }

    // Calculate payable amount after discount
    const payableAmount = Number(priceBreakup.total) - Number(res.discount);

    // Apply 20% charge on payable amount
    const amountToCharge = payableAmount * 0.2;

    // Create Razorpay order with amount in paise
    const payment = await this.paymentService.createOrder({
      amount: Math.round(amountToCharge), // Convert to paise
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
  }

  async verifyPayment(body: VerifyPaymentRequest, req) {
    const payment = await this.paymentService.verifyPayment(body);
    const isPaymentValid = payment.isValid;

    if (!isPaymentValid) {
      throw new BadRequestException('Invalid payment');
    }

    const paymentDetails = await this.paymentService.getPaymentDetails(
      body.paymentId,
    );

    if (!paymentDetails) {
      throw new NotFoundException('Payment not found');
    }

    const extractPaymentData =
      this.paymentService.extractPaymentData(paymentDetails);

    const existingPayment = await this.paymentModel.findOne({
      order: extractPaymentData.internalOrderId,
    });

    if (existingPayment) {
      throw new ConflictException('Payment for this order already done');
    }

    const order = await this.orderModel.findById(
      extractPaymentData.internalOrderId,
    );

    const paymentInfo = await this.paymentModel.create({
      profile: order?.profile,
      priceBreakup: order?.items,
      method: extractPaymentData.paymentMethod,
      razorpayPaymentId: extractPaymentData.paymentId,
      coupon: extractPaymentData.couponCode,
      discountedAmount:
        Number(extractPaymentData.originalAmount) -
        Number(extractPaymentData.discount),
      amount: Number(extractPaymentData.originalAmount),
      status: extractPaymentData.status,
      createdAt: extractPaymentData.createdAt,
      order: extractPaymentData.internalOrderId,
    });

    order!.payment = new mongoose.Types.ObjectId(paymentInfo._id);
    order!.status = OrderStatus.PAYMENT_DONE;
    order!.timeLine?.push({
      status: OrderTimeLine.PAYMENT_DONE,
      timeStamp: new Date(),
      updatedBy: `${req.user.firstName} ${req.user.lastName}`,
      updatedByUserId: req.user._id,
    });
    await order?.save();

    return paymentDetails;
  }

  async updateMeasurements(orderId: string, details: Record<string, string>) {
    const order = await this.orderModel.findOne({ _id: orderId });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    order.measurements = details;
    await order.save();

    return order;
  }

  async removeOrderCustomizationsAndOptions(data: any) {
    const field = `items.$[item].${data.type}`;
    const updateQuery: any = {
      $pull: {
        [field]: {
          optionId: new mongoose.Types.ObjectId(data.optionId),
        },
      },
    };

    if (data.customPrice !== undefined) {
      updateQuery.$set = {
        customPrice: data.customPrice,
      };
    }

    const result = await this.orderModel.updateOne(
      {
        _id: data.order_Id,
      },
      updateQuery,
      {
        arrayFilters: [{ 'item.orderId': data.orderId }],
      },
    );

    return result;
  }

  async updateOrderCustomizationsAndOptions(data: {
    orderId: string;
    customPrice?: number;
    customizations?: { type: string; optionId: string }[];
    options?: { categoryId?: string; optionId: string }[];
    subCategoryId: string;
    subCategoryStyleId: string;
  }) {
    const {
      orderId,
      customPrice,
      customizations,
      options,
      subCategoryId,
      subCategoryStyleId,
    } = data;

    const updateQuery: any = {};

    if (customizations && customizations.length > 0) {
      updateQuery.$push = {
        'items.$[item].customizations': {
          $each: customizations.map((c) => ({
            type: c.type,
            optionId: new mongoose.Types.ObjectId(c.optionId),
          })),
        },
      };
    }

    if (options && options.length > 0) {
      updateQuery.$push = {
        ...updateQuery.$push,
        'items.$[item].options': {
          $each: options.map((o) => ({
            ...(o.categoryId
              ? { categoryId: new mongoose.Types.ObjectId(o.categoryId) }
              : {}),
            optionId: new mongoose.Types.ObjectId(o.optionId),
          })),
        },
      };

      if (subCategoryId && subCategoryStyleId) {
        updateQuery.$set = {
          ...updateQuery.$set,
          'items.$[item].subCategory': subCategoryId,
          'items.$[item].subCategoryStyleId': subCategoryStyleId,
        };
      }
    }

    if (customPrice !== undefined) {
      updateQuery.$set = { ...updateQuery.$set, customPrice };
    }

    const result = await this.orderModel.updateOne(
      { _id: orderId },
      updateQuery,
      {
        arrayFilters: [{ 'item._id': { $exists: true } }], // targets items[0]
      },
    );

    return result;
  }

  async createPickup(data: CreateMaterialPickupDto) {
    console.log('called me');
    const res = await this.pickupModel.create(data);
    return res;
  }

  async getPickupList() {
    return this.pickupModel
      .find({
        'options.label': 'Order fulfilled',
        'options.value': false,
        isOrderCreated: { $ne: true },
      })
      .sort({ createdAt: -1 });
  }

  async updatePickupOptions(
    pickupId: string,
    options: { label: string; value: boolean }[],
    req: any,
  ) {
    const pickup = await this.pickupModel.findById(pickupId);

    if (!pickup) {
      throw new NotFoundException('Pickup not found');
    }

    for (const incoming of options) {
      const existing = pickup.options.find((o) => o.label === incoming.label);

      if (!existing) continue;

      if (existing.value !== incoming.value) {
        pickup.timeline?.push({
          status: `${incoming.label}`,
          updatedBy: `${req.user.firstName} ${req.user.lastName}`,
          updatedByUserId: req.user._id,
        });

        existing.value = incoming.value;
      }
    }

    await pickup.save();
    return pickup;
  }

  async getPickupById(id: string) {
    const pickup = await this.pickupModel.findById(id).lean();

    if (!pickup) {
      throw new NotFoundException('Pickup not found');
    }

    return pickup;
  }

  async duplicateOrder(orderId: string, req: any) {
    const existingOrder = await this.orderModel.findById(orderId).lean();

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    const { _id, createdAt, __v, ...orderData } = existingOrder;

    const newOrderId = await this.getNextOrderId(
      '6812ecb20458a0919d0cc551',
      'Straight Kurti',
    );
    const duplicatedItems = orderData.items.map((item: any) => ({
      ...item,
      orderId: newOrderId,
    }));

    console.log(duplicatedItems);

    const newOrder = await this.orderModel.create({
      ...orderData,
      items: duplicatedItems,
      timeLine: [],
    });

    return newOrder;
  }

  async updatePickupDetails(pickupId: string, payload: UpdatePickupDto) {
    return this.pickupModel.findByIdAndUpdate(
      pickupId,
      {
        $set: payload,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async updateOrderImages(
    orderId: string,
    dto: { add?: string[]; remove?: string[] },
  ) {
    let order = await this.orderModel.findById(orderId);
    if (!order) return null;

    // 1️Remove first
    if (dto.remove && dto.remove.length > 0) {
      order = await this.orderModel.findByIdAndUpdate(
        orderId,
        {
          $pull: {
            imageUrls: { $in: dto.remove },
          },
        },
        { new: true },
      );
    }

    // 2️ Add after
    if (dto.add && dto.add.length > 0) {
      order = await this.orderModel.findByIdAndUpdate(
        orderId,
        {
          $addToSet: {
            imageUrls: { $each: dto.add },
          },
        },
        { new: true },
      );
    }

    return order;
  }

  async updateOrderProcessingState(
    orderId: string,
    body: UpdateProcessingStateDto | {
      nextState: OrderProcessingState;
      notes?: string;
      alterationNotes?: string;
      alterationPhotos?: string[];
    },
    req: any,
  ) {
    const nextState = body.nextState;
    const updateFields: any = {
      orderProcessingState: nextState,
    };

    const notesValue =
      body.alterationNotes !== undefined && body.alterationNotes !== null
        ? body.alterationNotes
        : body.notes;
    if (notesValue !== undefined && notesValue !== null) {
      updateFields.alterationNotes = notesValue;
    }

    if (body.alterationPhotos !== undefined && body.alterationPhotos !== null) {
      updateFields.alterationPhotos = body.alterationPhotos;
    }

    return this.orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: updateFields,
        $push: {
          timeLine: {
            status: nextState,
            timeStamp: Date.now(),
            updatedBy: `${req.user.firstName} ${req.user.lastName}`,
            updatedByUserId: req.user._id,
          },
        },
      },
      { new: true },
    );
  }

  async updateBulkOrders(body: any, req: any) {
    const { selectedOrderIds, bulkStatus } = body;

    return this.orderModel.updateMany(
      {
        _id: { $in: selectedOrderIds },
      },
      {
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
      },
    );
  }

  async pinOrder(orderId: string, body: any) {
    const res = await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: {
          isPinned: body.isPinned,
          pinPosition: !body.isPinned ? null : body.pinPosition,
        },
      },
      { new: true },
    );
    return res;
  }

  async assignStitchingAgent(orderId: string, agentId: string) {
    const res = await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: {
          assignedToStitchingAgentId: agentId === 'none' ? null : agentId,
        },
      },
      { new: true },
    );
    return res;
  }

  async updateOrderPaymentStatus(
    orderId: string,
    status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID',
  ) {
    const order = await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: {
          paymentStatus: status,
        },
      },
      {
        new: true,
      },
    );
    return order;
  }
}
