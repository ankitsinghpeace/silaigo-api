import { Model } from 'mongoose';
import { IProfile } from 'core-db';
import { CreateProfileDto, InternalLoginDto, TeamMemberRegisterDto, UpdateProfileDto } from '../dto/auth.dto';
import { RedisService } from 'src/core/redis/redis.service';
import { OtpService } from './otp.service';
import { IAddress, IAppointment, IOrder, IPayment, IRole, IUser } from 'core-db/interface';
import { IPermission } from 'core-db/interface';
export declare class AuthService {
    private readonly userModel;
    private readonly appointmentModel;
    private readonly orderModel;
    private readonly paymentModel;
    private readonly profileModel;
    private readonly roleModel;
    private readonly permissionModel;
    private readonly redisService;
    private readonly otpService;
    private readonly addressModel;
    constructor(userModel: Model<IUser>, appointmentModel: Model<IAppointment>, orderModel: Model<IOrder>, paymentModel: Model<IPayment>, profileModel: Model<IProfile>, roleModel: Model<IRole>, permissionModel: Model<IPermission>, redisService: RedisService, otpService: OtpService, addressModel: Model<IAddress>);
    private hashPassword;
    comparePassword(password: string, hash: string): Promise<boolean>;
    private getTokens;
    private storeRefreshToken;
    private formatCustomer;
    private formatTeamMember;
    generateOtp(phone: string): Promise<{
        message: string;
        status: boolean;
        otpId: string;
    }>;
    generateMasterOtp(phone: string): Promise<{
        message: string;
        status: boolean;
        otpId: string;
    }>;
    verifyOtp(otpId: string, otpCode: string, res: any): Promise<any>;
    createProfile(dto: CreateProfileDto, res: any): Promise<{
        user: {
            userId: any;
            phone: any;
            firstName: any;
            lastName: any;
            gender: any;
            email: any;
            role: string;
            permissions: never[];
            birthDate: any;
            referralCode: any;
            referredBy: any;
            createdAt: any;
            notes: any;
            address: any;
            colorCode: any;
        };
        status: boolean;
    }>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        message: string;
        user: {
            userId: any;
            phone: any;
            firstName: any;
            lastName: any;
            gender: any;
            email: any;
            role: string;
            permissions: never[];
            birthDate: any;
            referralCode: any;
            referredBy: any;
            createdAt: any;
            notes: any;
            address: any;
            colorCode: any;
        };
    }>;
    refreshToken(req: any, res: any): Promise<void>;
    me(req: any, res: any): Promise<any>;
    internalLogin(data: InternalLoginDto, res: any): Promise<{
        user: {
            permissions: string[];
            userId: any;
            email: any;
            phone: any;
            role: any;
            firstName: any;
            lastName: any;
            joiningDate: any;
            designation: any;
            empId: any;
        };
    }>;
    logout(req: any, res: any): Promise<{
        message: string;
    }>;
    getTeamMembers(): Promise<{
        userId: any;
        email: any;
        phone: any;
        role: any;
        firstName: any;
        lastName: any;
        joiningDate: any;
        designation: any;
        empId: any;
    }[]>;
    getRoles(): Promise<(import("mongoose").FlattenMaps<{
        _id?: string | undefined;
        title: string;
        code: string;
        permissions: import("mongoose").Types.ObjectId[];
    }> & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    registerTeamMember(data: TeamMemberRegisterDto): Promise<{
        message: string;
        user: {
            userId: any;
            email: any;
            phone: any;
            role: any;
            firstName: any;
            lastName: any;
            joiningDate: any;
            designation: any;
            empId: any;
        };
    }>;
    updateTeamMember(id: string, data: any): Promise<{
        message: string;
        user: {
            userId: any;
            email: any;
            phone: any;
            role: any;
            firstName: any;
            lastName: any;
            joiningDate: any;
            designation: any;
            empId: any;
        };
    }>;
    removeTeamMember(userId: string): Promise<{
        message: string;
    }>;
    deleteOrder(orderId: string): Promise<{
        message: string;
    }>;
    getCustomersList(options: {
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
    }): Promise<any>;
    deleteCustomers(ids: string[]): Promise<{
        message: string;
    }>;
    editCustomer(id: string, dto: UpdateProfileDto): Promise<{
        message: string;
    }>;
    changePassword({ userId, oldPassword, newPassword, }: {
        userId: string;
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    addCustomerByAdmin(user: any): Promise<import("mongoose").Document<unknown, {}, IProfile, {}, {}> & IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getTeamMembersByRole(targetRole: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
}
