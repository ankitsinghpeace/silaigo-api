import { AuthService } from '../services/auth.service';
import { ChangePasswordDto, CreateProfileDto, InternalLoginDto, TeamMemberRegisterDto, UpdateProfileDto } from '../dto/auth.dto';
import { Request, Response } from 'express';
import { Gender } from 'core-db/enums';
import { GetCustomersQueryListDto } from '../dto/get-cutomers-list-query.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    generateOtp(body: {
        phone: string;
    }): Promise<{
        message: string;
        status: boolean;
        otpId: string;
    }>;
    generateMasterOtp(body: {
        phone: string;
        adminPassword: string;
    }): Promise<{
        message: string;
        status: boolean;
        otpId: string;
    }>;
    customerLogin(body: {
        otpId: string;
        otpCode: string;
    }, res: Response): Promise<any>;
    createProfile(profile: CreateProfileDto, res: Response): Promise<{
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
    changePassword(payload: ChangePasswordDto, res: Response): Promise<{
        message: string;
    }>;
    updateProfile(req: Request, profile: UpdateProfileDto): Promise<{
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
    refreshToken(req: Request, res: Response): Promise<void>;
    internalLoginHandler(req: any, body: InternalLoginDto, res: Response): Promise<{
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
    me(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Promise<{
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
    registerTeamMember(teamMemebr: TeamMemberRegisterDto): Promise<{
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
    updateTeamMember(teamMemebr: any, userId: string): Promise<{
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
    getTeamMemberViaRoleCode(roleCode: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IUser, {}, {}> & import("../../../../core-db/interface").IUser & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    createCustomerByAdmin({ phone, firstName, lastName, gender, notes, colorCode }: {
        phone: string;
        firstName: string;
        lastName: string;
        gender?: Gender;
        notes?: string;
        colorCode?: string;
    }, res: Response): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db").IProfile, {}, {}> & import("../../../../core-db").IProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getCustomersList(query: GetCustomersQueryListDto): Promise<any>;
    deleteCustomers(body: {
        customerIds: string[];
    }): Promise<{
        message: string;
    }>;
    deleteOrder(body: {
        orderId: string;
    }): Promise<{
        message: string;
    }>;
    editCustomer(id: string, body: UpdateProfileDto): Promise<{
        message: string;
    }>;
}
