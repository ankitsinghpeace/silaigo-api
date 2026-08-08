export declare class RegisterUserDto {
    email: string;
    phone: string;
    password: string;
    otpId: string;
}
export declare class InternalLoginDto {
    email: string;
    password: string;
}
export declare class ChangePasswordDto {
    userId: string;
    oldPassword: string;
    newPassword: string;
}
export declare class CreateProfileDto {
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    registrationToken: string;
    referralCode: string;
    referredBy: string;
}
export declare class UpdateProfileDto {
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    notes: string;
    colorCode: string;
}
export declare class TeamMemberRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    joiningDate: string;
    designation: string;
}
