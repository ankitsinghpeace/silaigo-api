// src/modules/customer-application/controllers/home.page.controller.ts
import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { PageSectionService } from '../services/page.sections.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { uploadFileToS3 } from 'src/utils/aws';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { PermissionSubType, PermissionType } from 'core-db/enums';

interface FileInfo {
  resourceName: string;
  resourceId: number;
  subResourceName?: string;
  subResourceId?: number;
  fileType: string;
  fileSize: number;
}

const pageSectionsPermissions = [
  `${PermissionType.CONTENT}.${PermissionSubType.CREATE}`,
  `${PermissionType.CONTENT}.${PermissionSubType.EDIT}`,
  `${PermissionType.CONTENT}.${PermissionSubType.DELETE}`,
]

@Controller('page-sections')
export class PageSectionController {
  constructor(private readonly pageSectionService: PageSectionService) { }

  @Get('/homepage')
  async getHomepageData() {
    return this.pageSectionService.getCompleteHomePage();
  }

  @Get('/navbar')
  async getNavbarData() {
    return this.pageSectionService.getNavbarData();
  }

  @Get(':type')
  async getSectionByType(@Param('type') type: string) {
    return this.pageSectionService.findSectionByType(type);
  }

  @Put(':type')
  @UseGuards(PermissionsGuard(pageSectionsPermissions))
  async updateSectionByType(@Param('type') type: string, @Body() body: any) {
    return this.pageSectionService.updateSectionByType(type, body);
  }

  @Post('upload-url')
  async getSignedUrl(@Body() fileInfo: FileInfo) {
    return this.pageSectionService.uploadFileService(fileInfo);
  }

  @Post('upload-image')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'fileInfo', maxCount: 1 },
    ]),
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      file?: any;
      fileInfo?: any;
    },
  ) {
    const image = files.file[0];
    const fileInfoBuffer = files.fileInfo[0].buffer;
    const jsonString = fileInfoBuffer.toString('utf8');
    return uploadFileToS3(image, JSON.parse(JSON.stringify(jsonString)));
  }
}
