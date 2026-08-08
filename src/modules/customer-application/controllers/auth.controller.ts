// Finalized auth.controller.ts aligned with updated auth.service.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Put,
  Delete,
  Param,
  UseGuards,
  ValidationPipe,
  Res,
  Query,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  ChangePasswordDto,
  CreateProfileDto,
  InternalLoginDto,
  TeamMemberRegisterDto,
  UpdateProfileDto,
} from '../dto/auth.dto';
import { Request, Response } from 'express';
import { Gender, PermissionSubType, PermissionType } from 'core-db/enums';
import { GetCustomersQueryListDto } from '../dto/get-cutomers-list-query.dto';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // customer login/signup flow
  @Post('generate-otp')
  async generateOtp(@Body(new ValidationPipe()) body: { phone: string }) {
    return this.authService.generateOtp(body.phone);
  }

  @Post('generate-master-otp')
  async generateMasterOtp(
    @Body(new ValidationPipe()) body: { phone: string; adminPassword: string },
  ) {
    return this.authService.generateMasterOtp(body.phone);
  }

  @Post('customer-login')
  async customerLogin(
    @Body(new ValidationPipe()) body: { otpId: string; otpCode: string },
    @Res() res: Response,
  ) {
    return this.authService.verifyOtp(body.otpId, body.otpCode, res as any);
  }

  @Post('create-profile')
  async createProfile(
    @Body(new ValidationPipe()) profile: CreateProfileDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.createProfile(profile, res as any);
  }

  @Post('change-password')
  async changePassword(
    @Body(new ValidationPipe()) payload: ChangePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.changePassword(payload);
  }

  @Put('profile')
  async updateProfile(
    @Req() req: Request,
    @Body(new ValidationPipe()) profile: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(req, profile);
  }

  @Get('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(req, res as any);
  }

  @Post('internal-login')
  async internalLoginHandler(
    @Req() req,
    @Body() body: InternalLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.internalLogin(body, res as any);
  }

  @Get('me')
  async me(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.me(req, res as any);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res as any);
  }

  @Get('team-members')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ROLES}.${PermissionSubType.VIEW}`]),
  )
  async getTeamMembers() {
    return this.authService.getTeamMembers();
  }

  @Get('roles')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ROLES}.${PermissionSubType.VIEW}`]),
  )
  async getRoles() {
    return this.authService.getRoles();
  }

  @Post('team-members')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ROLES}.${PermissionSubType.CREATE}`]),
  )
  async registerTeamMember(
    @Body(new ValidationPipe()) teamMemebr: TeamMemberRegisterDto,
  ) {
    return this.authService.registerTeamMember(teamMemebr);
  }

  @Put('team-members/:userId')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ROLES}.${PermissionSubType.EDIT}`]),
  )
  async updateTeamMember(
    @Body(new ValidationPipe()) teamMemebr: any,
    @Param('userId') userId: string,
  ) {
    return this.authService.updateTeamMember(userId, teamMemebr);
  }

  @Delete('team-members/:userId')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ROLES}.${PermissionSubType.DELETE}`]),
  )
  async removeTeamMember(@Param('userId') userId: string) {
    return this.authService.removeTeamMember(userId);
  }

  @Get('team-members-via-role/:roleCode')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.VIEW}`]),
  )
  async getTeamMemberViaRoleCode(@Param('roleCode') roleCode: string) {
    return this.authService.getTeamMembersByRole(roleCode);
  }

  @Post('customers')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.CUSTOMERS}.${PermissionSubType.CREATE}`,
    ]),
  )
  async createCustomerByAdmin(
    @Body(new ValidationPipe())
    {
      phone,
      firstName,
      lastName,
      gender,
      notes,
      colorCode
    }: {
      phone: string;
      firstName: string;
      lastName: string;
      gender?: Gender;
      notes?: string;
      colorCode?: string;
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.addCustomerByAdmin({
      phone,
      firstName,
      lastName,
      gender,
      notes,
      colorCode,
    });
  }

  @Get('customers')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CUSTOMERS}.${PermissionSubType.VIEW}`]),
  )
  async getCustomersList(
    @Query(new ValidationPipe()) query: GetCustomersQueryListDto,
  ) {
    return this.authService.getCustomersList(query);
  }

  @Delete('customers')
  @UseGuards(
    PermissionsGuard([
      `${PermissionType.CUSTOMERS}.${PermissionSubType.DELETE}`,
    ]),
  )
  async deleteCustomers(
    @Body(new ValidationPipe()) body: { customerIds: string[] },
  ) {
    return this.authService.deleteCustomers(body.customerIds);
  }

  @Delete('orders')
  @UseGuards(
    PermissionsGuard([`${PermissionType.ORDER}.${PermissionSubType.DELETE}`]),
  )
  async deleteOrder(@Body(new ValidationPipe()) body: { orderId: string }) {
    return this.authService.deleteOrder(body.orderId);
  }

  @Put('customers/:id')
  @UseGuards(
    PermissionsGuard([`${PermissionType.CUSTOMERS}.${PermissionSubType.EDIT}`]),
  )
  async editCustomer(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: UpdateProfileDto,
  ) {
    return this.authService.editCustomer(id, body);
  }
}
