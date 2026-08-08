import { Body, Controller, Get, Post, Req, Query, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BlogsService } from '../services/blogs.service';
import { CreateBlogDto, BlogQueryDto, BlogReactionDto } from '../dto/blog.dto';
import { PermissionSubType, PermissionType } from 'core-db/enums/permissions.enums';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) {}

    @Get()
    async getBlogs(@Query() query: BlogQueryDto) {
        return this.blogsService.getBlogs(query);
    }


    @Get('admin')
    @UseGuards(PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.VIEW}`]))
    async getBlogsAdmin(@Query() query: BlogQueryDto) {
        return this.blogsService.getBlogsAdmin(query);
    }

    @Get(':slug')
    async getBlogBySlug(@Param('slug') slug: string) {
        return this.blogsService.getBlogBySlug(slug);
    }

    @Post()
    @UseGuards(PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.CREATE}`]))
    async createBlog(@Body() blogDto: CreateBlogDto, @Req() req: any) {
        return this.blogsService.createBlog(blogDto, req);
    }

    @Put(':slug')
    @UseGuards(PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.EDIT}`]))
    async updateBlog(@Param('slug') slug: string, @Body() blogDto: CreateBlogDto, @Req() req: any) {
        return this.blogsService.updateBlog(slug, blogDto, req);
    }

    @Delete(':slug')
    @UseGuards(PermissionsGuard([`${PermissionType.CONTENT}.${PermissionSubType.DELETE}`]))
    async deleteBlog(@Param('slug') slug: string, @Req() req: any) {
        return this.blogsService.deleteBlog(slug, req);
    }

    @Post('reaction')
    async addReaction(@Body() reactionDto: BlogReactionDto, @Req() req: any) {
        return this.blogsService.addReaction(reactionDto, req);
    }




}