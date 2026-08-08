import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LandingPagesService } from '../services/landing.pages.service';

@Controller('landing-pages')
export class LandingPagesController {
  constructor(private readonly landingPagesService: LandingPagesService) {}

  @Get('location/:location')
  async getLocationData(@Param('location') location: string) {
    return this.landingPagesService.getLocationData(location);
  }

  @Get('category/:category')
  async getCategoryData(@Param('category') category: string) {
    return this.landingPagesService.getCategoryData(category);
  }

  @Get('data/:location/:category')
  async getLocationCategoryData(
    @Param('location') location: string,
    @Param('category') category: string,
  ) {
    return this.landingPagesService.getLocationCategoryData(location, category);
  }

  @Get('routes')
  async getRoutes() {
    return this.landingPagesService.getRoutes();
  }
}
