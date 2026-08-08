import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Post,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CustomizationsService } from '../services/customizations.service';
import { PermissionSubType, PermissionType } from 'core-db/enums';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';

export const inventoryPermissions = [
  `${PermissionType.INVENTORY}.${PermissionSubType.CREATE}`,
  `${PermissionType.INVENTORY}.${PermissionSubType.EDIT}`,
  `${PermissionType.INVENTORY}.${PermissionSubType.DELETE}`,
]

@Controller('customizations')
export class CustomizationsController {
  constructor(private readonly customizationsService: CustomizationsService) {}

  @Get()
  async getCustomizations() {
    return this.customizationsService.getCustomizations();
  }

  @Put('rank')
  async updateCustomizationRank(@Body() body:{type:string,rank:number}){
    return this.customizationsService.updateCustomizationRank(body)
  }

  @Post('options/:type')
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async addCustiomizationsOptions(
    @Param('type') type: string,
    @Body() customizations,
  ) {
    return this.customizationsService.addCustomizationsOptions(
      type,
      customizations,
    );
  }

  @Put('options/:type')
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async updateCustomizationsOptions(
    @Param('type') type: string,
    @Body() customizations,
  ) {
    return this.customizationsService.updateCustomizationsOptions(
      type,
      customizations,
    );
  }
  

  @Delete('options/:type')
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async removeCustomizationOptions(
    @Param('type') type: string,
    @Body() customizationIds,
  ) {
    return this.customizationsService.removeCustomizationsOptions(
      type,
      customizationIds,
    );
  }

  @Get("mapping")
  async getCustomizationsMapping(){
    return this.customizationsService.getCustomizationsMapping()
  }

  @Post("mapping")
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async addCustomizationsMapping(@Body() body:any){
    return this.customizationsService.addCustomizationsMapping(body.mapping)
  }

  @Put("mapping") 
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async editCustomizationsMapping(@Body() body:any){
    return this.customizationsService.editCustomizationsMapping(body.mapping,body.id)
  }

  @Delete("mapping")
  @UseGuards(PermissionsGuard(inventoryPermissions))
  async deleteCustomizationsMapping(@Body() body:{id:string}){
    return this.customizationsService.deleteCustomizationsMapping(body.id);
  }

  @Get('options-mapping')
  async getCustomizationOptionsMapping(@Query("subCategoryId") subCategoryId:string,@Query("categoryId") categoryId:string,@Query("customizationType") customizationType:string) {
    const data = {subCategoryId,categoryId,customizationType}
    return this.customizationsService.getCustomizationOptionsMapping(data);
  }

  @Get('types')
  async getCustomizationTypesList(){
    return this.customizationsService.getCustomizationTypesList();
  }


}
