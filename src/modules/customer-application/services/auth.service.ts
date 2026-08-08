// Final and complete auth.service.ts with all required methods
import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { IProfile } from 'core-db';
import {
  CreateProfileDto,
  InternalLoginDto,
  TeamMemberRegisterDto,
  UpdateProfileDto,
} from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { signJwt, verifyJwt } from 'src/utils/jwtService';
import { ModelMetadata } from 'core-db/model.metadata';
import { RedisService } from 'src/core/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { RoleCode as ROLES } from 'core-db/enums';
import { OtpService } from './otp.service';
import {
  IAddress,
  IAppointment,
  IOrder,
  IPayment,
  IRole,
  IUser,
} from 'core-db/interface';
import { IPermission } from 'core-db/interface';
import { DeleteResult } from 'mongodb';
import { use } from 'dd-trace';
import { sendMail } from 'src/utils/sendEmail';

const REFRESH_TOKEN_EXPIRY_TIME = 7 * 86400;

@Injectable()
export class AuthService {
  constructor(
    @Inject(ModelMetadata.User.token) private readonly userModel: Model<IUser>,
    @Inject(ModelMetadata.Appointment.token)
    private readonly appointmentModel: Model<IAppointment>,
    @Inject(ModelMetadata.Order.token)
    private readonly orderModel: Model<IOrder>,
    @Inject(ModelMetadata.Payment.token)
    private readonly paymentModel: Model<IPayment>,
    @Inject(ModelMetadata.Profile.token)
    private readonly profileModel: Model<IProfile>,
    @Inject(ModelMetadata.Role.token)
    private readonly roleModel: Model<IRole>,
    @Inject(ModelMetadata.Permission.token)
    private readonly permissionModel: Model<IPermission>,
    @Inject(RedisService) private readonly redisService: RedisService,
    private readonly otpService: OtpService,
    @Inject(ModelMetadata.Address.token)
    private readonly addressModel: Model<IAddress>,
  ) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  private getTokens(userId: string, role?: string) {
    const accessToken = role
      ? signJwt({ userId, role }, '10d')
      : signJwt({ userId }, '10d');
    const refreshToken = role
      ? signJwt({ userId, role }, '10d', process.env.REFRESH_TOKEN_SECRET)
      : signJwt({ userId }, '10d', process.env.REFRESH_TOKEN_SECRET);
    return {
      accessToken,
      refreshToken,
      atExpiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      rtExpiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    };
  }

  private async storeRefreshToken(userId: string, token: string) {
    await this.redisService.set(
      `refresh_token_${userId}`,
      token,
      REFRESH_TOKEN_EXPIRY_TIME,
    );
  }

  private formatCustomer(user: any) {
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

  private formatTeamMember(user: any) {
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

  async generateOtp(phone: string) {
    const canSend = await this.otpService.canSendOtp(phone);

    if (!canSend) {
      throw new BadRequestException(
        'Please wait before requesting another OTP',
      );
    }

    const { code, otpKey } = await this.otpService.generateOtp({
      phone,
      isMasterLogin: false,
    });

    return {
      message: 'OTP generated',
      status: true,
      otpId: otpKey,
    };
  }

  async generateMasterOtp(phone: string) {
    const canSend = await this.otpService.canSendOtp(phone);

    if (!canSend) {
      throw new BadRequestException(
        'Please wait before requesting another OTP',
      );
    }

    const { code, otpKey } = await this.otpService.generateOtp({
      phone,
      isMasterLogin: true,
    });

    return {
      message: 'OTP generated',
      status: true,
      otpId: otpKey,
    };
  }

  async verifyOtp(otpId: string, otpCode: string, res: any) {
    const isValid = await this.otpService.verifyOtp(otpId, otpCode);

    if (!isValid) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    const phone = otpId.replace('otp:', '');
    const user = await this.profileModel.findOne({ phone }).lean();

    if (user) {
      const tokens = this.getTokens(user._id.toString());
      await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
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

    const registrationToken = uuidv4();
    await this.redisService.set(
      `registration_token:${phone}`,
      registrationToken,
      1 * 60 * 60,
    );
    return res.json({
      data: {
        registrationToken,
        status: true,
        newUser: true,
        user: null,
      },
    });
  }

  async createProfile(dto: CreateProfileDto, res: any) {
    const storedRegistrationToken = await this.redisService.get(
      `registration_token:${dto.phone}`,
    );

    if (
      !storedRegistrationToken ||
      storedRegistrationToken !== dto.registrationToken
    )
      throw new BadRequestException('Invalid or expired registration token');

    const user = await this.profileModel.findOne({ phone: dto.phone });

    if (user) throw new NotFoundException('Profile already exists');

    const profile = await this.profileModel.create({
      phone: dto.phone,
      firstName: dto.firstName,
      lastName: dto.lastName,
      gender: dto.gender,
      referralCode: dto.referralCode || '',
      referredBy: dto.referredBy || '',
    });
    const tokens = this.getTokens(profile._id.toString());
    await this.storeRefreshToken(profile._id.toString(), tokens.refreshToken);
    await this.redisService.del(`registration_token:${dto.phone}`);
    await this.redisService.clearCustomerListCache();

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

    void sendMail({
      to: process.env.ADMIN_EMAIL!,
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
  }

  async updateProfile(req: any, dto: UpdateProfileDto) {
    if (req.user.role) {
      throw new BadRequestException('Please request admin to update profile');
    }

    const user = await this.profileModel.findById(req.user._id);
    if (!user) throw new NotFoundException('User not found');

    // Filter out undefined and null values
    const updateData = Object.entries(dto).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No valid fields to update');
    }

    const updated = await this.profileModel
      .findOneAndUpdate({ _id: user._id }, { $set: updateData }, { new: true })
      .lean();

    if (!updated) throw new NotFoundException('Profile not found');
    await this.redisService.clearCustomerListCache();
    return { message: 'Profile updated', user: this.formatCustomer(updated) };
  }

  async refreshToken(req: any, res: any) {
    const rt = req.cookies.refreshToken;
    if (!rt) throw new UnauthorizedException();

    const decoded = verifyJwt(rt, process.env.REFRESH_TOKEN_SECRET);
    const stored = await this.redisService.get(
      `refresh_token_${decoded.userId}`,
    );

    let tokens;
    if (decoded.role) {
      const user = await this.userModel.findById(decoded.userId).lean();
      if (!user) throw new UnauthorizedException('User not found');

      const role = await this.roleModel.findOne({ _id: user.role }).lean();
      if (!role) throw new UnauthorizedException('Invalid credentials');

      tokens = this.getTokens(user._id, role.code);
      await this.storeRefreshToken(user._id, tokens.refreshToken);
    } else {
      if (!stored || stored !== rt)
        throw new UnauthorizedException('Invalid refresh token');

      const user = await this.profileModel.findById(decoded.userId).lean();
      if (!user) throw new UnauthorizedException('User not found');

      tokens = this.getTokens(user._id);
      await this.storeRefreshToken(user._id, tokens.refreshToken);
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
  }

  async me(req: any, res: any) {
    if (req.user.role != 'customer') {
      const user = await this.userModel
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
        throw new UnauthorizedException('Invalid credentials');
      }

      const transformedPermissions = (user.role.permissions || [])
        .filter(
          (perm: any) =>
            typeof perm === 'object' && perm?.type && perm?.subType,
        )
        .map((perm: any) => `${perm.type}.${perm.subType}`);

      const tokens = this.getTokens(user._id, user.role.code);
      await this.storeRefreshToken(user._id, tokens.refreshToken);
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
        user: {
          ...this.formatTeamMember(user),
          permissions: transformedPermissions,
        },
      };
    } else {
      const user = await this.profileModel.findById(req.user._id).lean();
      if (!user) throw new UnauthorizedException('User not found');
      const tokens = this.getTokens(user._id.toString());
      await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
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
  }

  async internalLogin(data: InternalLoginDto, res: any) {
    const user = await this.userModel
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
      throw new UnauthorizedException('Invalid credentials');
    }

    const transformedPermissions = (user.role.permissions || [])
      .filter(
        (perm: any) => typeof perm === 'object' && perm?.type && perm?.subType,
      )
      .map((perm: any) => `${perm.type}.${perm.subType}`);
    if (
      !user ||
      !(await this.comparePassword(data.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.getTokens(user._id, user.role.code);
    await this.storeRefreshToken(user._id, tokens.refreshToken);
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
      user: {
        ...this.formatTeamMember(user),
        permissions: transformedPermissions,
      },
    };
  }

  async logout(req: any, res: any) {
    await this.redisService.del(`refresh_token_${req.user._id}`);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return {
      message: 'Logged out successfully',
    };
  }

  async getTeamMembers() {
    const teamMembers = await this.userModel
      .find()
      .select({ passwordHash: 0 })
      .populate('role', 'code')
      .lean();
    return teamMembers.map(this.formatTeamMember);
  }

  async getRoles() {
    return this.roleModel.find().lean();
  }

  async registerTeamMember(data: TeamMemberRegisterDto) {
    const existing = await this.userModel.findOne({
      email: data.email,
    });

    if (existing) throw new ConflictException('User already exists');

    const role = await this.roleModel.findById(data.role);

    if (!role) throw new NotFoundException('Role not found');

    const passwordHash = await this.hashPassword(data.password);
    const empId = `EMP-${data.email.split('@')[0]}`;

    const newUser = await this.userModel.create({
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
      user: this.formatTeamMember({ ...newUser, role: role }),
    };
  }

  async updateTeamMember(id: string, data: any) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    if (data.email && data.email !== user.email) {
      const existing = await this.userModel.findOne({ email: data.email });
      if (existing) throw new ConflictException('Email already in use');
    }

    if (data.role) {
      const role = await this.roleModel.findOne({ code: data.role });
      if (!role) throw new NotFoundException('Role not found');
      (user as any).role = role._id;
    }

    if (data.password !== undefined) {
      user.passwordHash = await this.hashPassword(data.password);
    }

    if (data.firstName !== undefined) user.firstName = data.firstName;
    if (data.lastName !== undefined) user.lastName = data.lastName;
    if (data.joiningDate !== undefined)
      (user as any).joiningDate = data.joiningDate;
    if (data.designation !== undefined) user.designation = data.designation;

    if (data.email) {
      user.email = data.email;
      user.empId = `EMP-${data.email.split('@')[0]}`;
    }

    const updatedUser = await user.save();

    const roleDetails = await this.roleModel.findById(updatedUser.role);

    return {
      message: 'Team member updated',
      user: this.formatTeamMember({ ...updatedUser, role: roleDetails }),
    };
  }

  async removeTeamMember(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    await this.userModel.deleteOne({ _id: userId });
    return { message: 'User removed successfully' };
  }

  async deleteOrder(orderId: string) {
    // Check if order exists first
    const order = await this.orderModel.findOne({ _id: orderId }).lean().exec();
    if (!order) throw new NotFoundException('Order not found');

    const deletes: Promise<any>[] = [];

    // Delete payments where orderId matches
    deletes.push(this.paymentModel.deleteMany({ orderId }).exec());

    // Delete appointments where orderId matches
    deletes.push(this.appointmentModel.deleteMany({ orderId }).exec());

    // Delete order itself
    deletes.push(this.orderModel.deleteOne({ _id: orderId }).exec());

    await Promise.all(deletes);

    return { message: 'Order and related records deleted successfully' };
  }

  async getCustomersList(options: {
    page?: number;
    limit?: number;
    search?: string;
    email?: string;
    phone?: string;
    gender?: string;
    referredBy?: string;
    hasReferral?: boolean;
    sortBy?: 'newest' | 'oldest';
    startDate?: string;
    endDate?: string;
    colorCode?: string;
  }) {
    const {
      page = 1,
      limit = 20,
      search,
      email,
      phone,
      gender,
      referredBy,
      hasReferral,
      sortBy = 'newest',
      startDate,
      endDate,
      colorCode,
    } = options;

    const pageLimit = Math.min(limit, 100);
    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * pageLimit;
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

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

    const cacheKey = `customers_list_${JSON.stringify({
      page: currentPage,
      limit: pageLimit,
      ...filters,
    })}`;

    const countCacheKey = `customers_count_${JSON.stringify(filters)}`;
    const cachedResult = await this.redisService.get(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }

    let query: any = {};

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
      } else {
        query.$or = [
          { referredBy: { $exists: false } },
          { referredBy: null },
          { referredBy: '' },
        ];
      }
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

    if (colorCode) {
      query.colorCode = colorCode;
    }

    const isNewest = sortBy === 'newest';
    const sortDirection = isNewest ? -1 : 1;
    const sort: { _id: 1 | -1 } = { _id: sortDirection as 1 | -1 };

    let total: number;
    try {
      const cachedCount = await this.redisService.get(countCacheKey);
      if (cachedCount) {
        total = parseInt(cachedCount, 10);
      } else {
        total = await this.profileModel.countDocuments(query);
        await this.redisService.set(countCacheKey, total.toString(), 300);
      }
    } catch (error) {
      total = await this.profileModel.countDocuments(query);
    }

    const customers = await this.profileModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(pageLimit)
      .lean();

    const customersWithAddress = await Promise.all(
      customers.map(async (customer) => {
        const existingAddress = await this.addressModel
          .findOne({
            profile: customer._id,
          })
          .lean();

        const address: any = existingAddress
          ? {
              addressLine1: existingAddress.addressLine1,
              addressLine2: existingAddress.addressLine2,
              city: existingAddress.city,
              state: existingAddress.state,
              pincode: existingAddress.pincode,
            }
          : null;

        return {
          ...customer,
          address: address,
        };
      }),
    );

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

    await this.redisService.set(cacheKey, JSON.stringify(result), 180);

    return result;
  }

  async deleteCustomers(ids: string[]) {
    await this.profileModel.deleteMany({ _id: { $in: ids } });
    await this.redisService.clearCustomerListCache();
    return { message: 'Customer deleted successfully' };
  }

  async editCustomer(id: string, dto: UpdateProfileDto) {
    const customer = await this.profileModel.findById(id);
    if (!customer) throw new NotFoundException('Customer not found');
    await this.profileModel.updateOne(
      { _id: id },
      {
        $set: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          gender: dto.gender,
          phone: dto.phone,
          notes: dto.notes,
          colorCode: dto.colorCode,
        },
      },
    );
    await this.redisService.clearCustomerListCache();
    return { message: 'Customer updated successfully' };
  }

  async changePassword({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    // Compare oldPassword with stored hash
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) throw new Error('Old password is incorrect');

    // Hash new password and save
    const newPasswordHash = await this.hashPassword(newPassword);
    user.passwordHash = newPasswordHash;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  async addCustomerByAdmin(user) {
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(user.phone)) {
      throw new BadRequestException('Invalid phone number');
    }

    const isExist = await this.profileModel.findOne({ phone: user.phone });

    if (isExist) {
      throw new BadRequestException('Customer already exist');
    }
    await this.redisService.clearCustomerListCache();
    return this.profileModel.create({
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      notes: user?.notes,
      colorCode: user?.colorCode,
    });
  }

  async getTeamMembersByRole(targetRole: string) {
    const role = await this.roleModel.findOne({ code: targetRole });

    if (!role) {
      throw new NotFoundException('Invalid role code');
    }

    const members = await this.userModel
      .find({ role: role._id })
      .select('firstName lastName _id');

    return members;
  }
}
