// home.page.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPageSection } from 'core-db/interface';
import { generateUploadUrl } from 'src/utils/aws';
import { ModelMetadata } from 'core-db/model.metadata';
import { appCache } from 'src/utils/appCache';

@Injectable()
export class PageSectionService {
  constructor(
    @Inject(ModelMetadata.PageSection.token) private readonly pageSectionModel: Model<IPageSection>,
  ) { }

  async findSectionByType(type: string) {
    const doc: any = await this.pageSectionModel
      .findOne({ type }, { _id: 0 })
      .lean();

    return doc?.data;
  }

  async getNavbarData() {
    return this.pageSectionModel.findOne({ type: 'navbar' }, { _id: 0 });
  }

  async getCompleteHomePage() {
    const cached = appCache.get('homepage');

    if (cached) {
      console.log('CACHE HIT');
      return cached;
    }

    console.log('CACHE MISS');

    const sectionTypes = [
      'navbar',
      'hero',
      'journey',
      'achievements',
      'videos',
      'partners',
      'testimonials',
      'fnq',
    ];

    const sections = await this.pageSectionModel
      .find(
        { type: { $in: sectionTypes } },
        { _id: 0, type: 1, data: 1 },
      )
      .lean();

    const homepage = {};

    sections.forEach((section: any) => {
      homepage[section.type] = section.data;
    });

    appCache.set('homepage', homepage);

    return homepage;
  }


  async updateSectionByType(type: string, updateData: Partial<IPageSection>) {
    appCache.del('homepage');
    return this.pageSectionModel.findOneAndUpdate(
      { type },
      { $set: updateData },
      { new: true }, // return updated document
    );
  }


  async uploadFileService(fileInfo) {
    const { resourceName, resourceId, fileType } = fileInfo;

    if (!resourceName || !resourceId || !fileType) {
      throw new Error('Missing required fields: resourceName, resourceId, or fileType');
    }

    // return "ok"
    const { url, key } = await generateUploadUrl(fileInfo);
    return { url, key };
  }
}
