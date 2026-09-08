import {
  IOrder,
  IMaterialPickup,
  MicroEventsTimeline,
  OrdersEventsOptions,
  IUser,
} from './../../../../core-db/interface';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ModelMetadata } from 'core-db/model.metadata';
import { boolean } from 'joi';
import { OrderProcessingStateTimeLineMap, OrderProcessingState } from 'core-db/enums/order.enums';
import { RoleCode } from 'core-db/enums/roles.enums';

@Injectable()
export class OrderEventsOptionsService {
  constructor(
    @Inject(ModelMetadata.OrderEventsOptions.token)
    private readonly orderEventsOptionsModel: Model<OrdersEventsOptions>,
    @Inject(ModelMetadata.OrderMicroEvents.token)
    private readonly orderMicroEventsModel: Model<MicroEventsTimeline>,
    @Inject(ModelMetadata.Order.token)
    private readonly orderModel: Model<IOrder>,
    @Inject(ModelMetadata.MaterialPickup.token)
    private readonly pickupModel: Model<IMaterialPickup>,
    @Inject(ModelMetadata.User.token)
    private readonly userModel: Model<IUser>,
  ) { }

  async getEventsOptions(req: any, orderId) {
    const res: any = await this.orderEventsOptionsModel.findOne({
      roleId: req.user.roleId,
    });

    const filter: any = { orderId: orderId, roleId: req.user.roleId };
    const alreadyAddedEventsInTimeLine = await this.orderMicroEventsModel
      .findOne(filter, { events: 1 })
      .lean();

    if (!res.options) {
      return { aggregatedState: {}, options: [] };
    }
    const aggregatedState = {};

    res.options.map((el) => {
      aggregatedState[el.label] = el.type === 'checkbox' ? false : '';
    });

    alreadyAddedEventsInTimeLine?.events?.map((el) => {
      aggregatedState[el.key] = el.value;
    });

    return { aggregatedState, options: res.options };
  }

  async addMicroEventInTimeLine(req: any, body: any) {
    const { orderId, events } = body;

    if (!Array.isArray(events) || events.length === 0) {
      throw new BadRequestException('events must be a non-empty array');
    }

    const session = await this.orderModel.db.startSession();

    try {
      let res;

      await session.withTransaction(async () => {
        const order = await this.orderModel
          .findOne({ _id: orderId })
          .session(session);
        if (!order) {
          throw new NotFoundException('order not found');
        }

        const deselected = events.filter(({ value }) => {
          return value === false;
        });

        console.log(events);
        for (const evt of events) {
          const { status, key, value } = evt;

          if (!status || !key) {
            continue;
          }

          if (key === 'Cutting End' && value === true) {
            order.isPinned = false;
            order.pinPosition = undefined;
          }

          if (deselected.length === events.length) {
            order.orderProcessingState = OrderProcessingStateTimeLineMap[key];
            console.log('updated order state to ', order.orderProcessingState);
            break;
          }

          if (OrderProcessingStateTimeLineMap[key]) {
            order.orderProcessingState = OrderProcessingStateTimeLineMap[key];
            console.log('updated order state to ', order.orderProcessingState);
          }
        }

        // // save order update inside the session
        await order.save({ session });

        // prepare the batch push
        const pushEvents = events.map((evt) => ({
          status: evt.status,
          key: evt.key,
          value: evt.value,
          timeStamp: new Date(),
          updatedBy: `${req.user.firstName} ${req.user.lastName}`,
          updatedByUserId: req.user._id,
        }));

        // update micro events inside the transaction
        res = await this.orderMicroEventsModel.updateOne(
          { orderId, roleId: req.user.roleId },
          {
            $setOnInsert: { orderId, roleId: req.user.roleId },
            $push: { events: { $each: pushEvents } },
          },
          { upsert: true, session },
        );
      });

      return res;
    } finally {
      console.log('here');
      session.endSession();
    }
  }

  async getAggregatedTimeLine(orderId: string) {
    // 1. Fetch all event documents for the order (all roles)
    const data = await this.orderMicroEventsModel
      .find({ orderId }, { events: 1 })
      .lean();

    if (!data || data.length === 0) {
      return [];
    }

    // 2. Flatten events from all roles
    const mergedEvents = data
      .flatMap((doc) => doc.events || [])
      .map((event) => ({
        key: event.key,
        value: event.value,
        status: `${event.status} : ${typeof event.value === 'boolean'
          ? event.value
            ? '✔️'
            : '❌'
          : event.value
          }`,
        timeStamp: event.timeStamp,
        updatedBy: event.updatedBy,
        updatedByUserId: event.updatedByUserId?.toString(),
      }))
      // 3. Sort by timestamp (oldest → newest)
      .sort(
        (a, b) =>
          new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime(),
      );

    return mergedEvents;
  }

  async getTimeLine(orderId: string, req: any) {
    const filter: any = { orderId, roleId: req.user.roleId };

    const data = await this.orderMicroEventsModel
      .findOne(filter, { events: 1 })
      .lean();

    if (!data || !data.events || data.events.length === 0) {
      return [];
    }

    return data.events.map((event) => ({
      key: event.key,
      value: event.value,
      status: `${event.status} : ${event.value === true && typeof event.value === 'boolean'
        ? '✔️'
        : event.value === false && typeof event.value === 'boolean'
          ? '❌'
          : event.value
        }
`,
      timeStamp: event.timeStamp,
      updatedBy: event.updatedBy,
      updatedByUserId: event.updatedByUserId?.toString(),
    }));
  }

  async getUserAnalytics(
    userId: string,
    startDate?: string,
    endDate?: string,
  ) {
    const user = await this.userModel.findOne({ _id: userId }).populate("role");
    const role = user?.role.code;
    console.log(role)
    const userObjectId = new Types.ObjectId(userId);

    const dateFilter: Record<string, any> = {};
    if (startDate) {
      const s = new Date(startDate);
      s.setHours(0, 0, 0, 0);
      dateFilter.$gte = s;
    }
    if (endDate) {
      const e = new Date(endDate);
      e.setHours(23, 59, 59, 999);
      dateFilter.$lte = e;
    }
    const hasDateFilter = Object.keys(dateFilter).length > 0;

    if (role === RoleCode.PICKUP_COORDINATOR || role === RoleCode.ADMIN) {
      const pickupDateMatch: Record<string, any> = {};
      if (hasDateFilter) {
        pickupDateMatch['createdAt'] = dateFilter;
      }

      const [completedRes, pendingRes] = await Promise.all([
        // completed = 'Order fulfilled' option value === true AND user in timeline
        this.pickupModel.countDocuments({
          ...pickupDateMatch,
          'options.label': 'Order fulfilled',
          'options.value': true,
          'timeline.updatedByUserId': userObjectId,
        }),
        // pending = 'Order fulfilled' option value === false AND user in timeline
        this.pickupModel.countDocuments({
          ...pickupDateMatch,
          'options.label': 'Order fulfilled',
          'options.value': false,
          'timeline.updatedByUserId': userObjectId,
        }),
      ]);

      const assigned = completedRes + pendingRes;
      return {
        userId,
        role,
        analytics: {
          assigned,
          completed: completedRes,
          pending: pendingRes,
        },
        dateRange: { startDate: startDate ?? null, endDate: endDate ?? null },
      };
    }

    if (role === RoleCode.CUTTING) {
      // The pool of orders visible to the cutting dept
      // (ORDER_FULFILLED and all states that come after it in the chain)
      const cuttingStates = [
        OrderProcessingState.ORDER_FULFILLED,
        OrderProcessingState.CUTTING_END,
        OrderProcessingState.STITCHING_END,
        OrderProcessingState.PRODUCT_VERIFIED_OR_RECTIFIED,
        OrderProcessingState.MATERIAL_PACKED,
        OrderProcessingState.READY_FOR_DISPATCH,
        OrderProcessingState.ORDER_COMPLETE,
      ];

      const orderDateQuery: Record<string, any> = {
        orderProcessingState: { $in: cuttingStates },
      };
      if (hasDateFilter) {
        orderDateQuery['createdAt'] = dateFilter;
      }

      // Micro-event match: latest 'Cutting End' = true by this user per order
      const microEventMatch: Record<string, any> = {
        'events.key': 'Cutting End',
        'events.value': true,
        'events.updatedByUserId': userObjectId,
        ...(hasDateFilter ? { 'events.timeStamp': dateFilter } : {}),
      };

      const [assigned, completedAgg] = await Promise.all([
        this.orderModel.countDocuments(orderDateQuery),
        this.orderMicroEventsModel.aggregate([
          { $unwind: '$events' },
          { $match: microEventMatch },
          { $group: { _id: '$orderId' } },
          { $count: 'total' },
        ]),
      ]);

      const completed: number = completedAgg[0]?.total ?? 0;
      return {
        userId,
        role,
        analytics: {
          assigned,
          completed,
          pending: Math.max(0, assigned - completed),
        },
        dateRange: { startDate: startDate ?? null, endDate: endDate ?? null },
      };
    }

    if (role === RoleCode.STITCHING) {
      const stitchingOrderQuery: Record<string, any> = {
        assignedToStitchingAgentId: userObjectId,
      };
      if (hasDateFilter) {
        stitchingOrderQuery['createdAt'] = dateFilter;
      }

      const microEventMatch: Record<string, any> = {
        'events.key': 'Stitching End',
        'events.value': true,
        'events.updatedByUserId': userObjectId,
        ...(hasDateFilter ? { 'events.timeStamp': dateFilter } : {}),
      };

      const [assigned, completedAgg] = await Promise.all([
        this.orderModel.countDocuments(stitchingOrderQuery),
        this.orderMicroEventsModel.aggregate([
          { $unwind: '$events' },
          { $match: microEventMatch },
          { $group: { _id: '$orderId' } },
          { $count: 'total' },
        ]),
      ]);

      const completed: number = completedAgg[0]?.total ?? 0;
      return {
        userId,
        role,
        analytics: {
          assigned,
          completed,
          pending: Math.max(0, assigned - completed),
        },
        dateRange: { startDate: startDate ?? null, endDate: endDate ?? null },
      };
    }

    if (role === RoleCode.SUPPORT) {
      const supportOrderQuery: Record<string, any> = {
        orderProcessingState: OrderProcessingState.STITCHING_END,
      };
      if (hasDateFilter) {
        supportOrderQuery['createdAt'] = dateFilter;
      }

      const assigned = await this.orderModel.countDocuments(supportOrderQuery);
      return {
        userId,
        role,
        analytics: {
          assigned,
          completed: 0,
          pending: assigned,
        },
        dateRange: { startDate: startDate ?? null, endDate: endDate ?? null },
      };
    }

    throw new BadRequestException(
      `Analytics not supported for role: ${role}`,
    );
  }
}
