import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity } from './schemas/entity.schema';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectModel(Entity.name) private entityModel: Model<Entity>,
  ) {}

  async findByTypeAndSlug(type: string, slug: string) {
    const entity = await this.entityModel.findOne({ type: type.toLowerCase(), slug: slug.toLowerCase() });
    if (!entity) {
      throw new NotFoundException(`Entity not found: ${type}/${slug}`);
    }
    return entity;
  }

  async search(query: string) {
    const q = query.toLowerCase();
    return this.entityModel.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { summary: { $regex: q, $options: 'i' } },
      ],
    }).limit(10).select('id name type slug').lean();
  }
}
