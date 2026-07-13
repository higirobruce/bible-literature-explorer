import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';
import { Entity, EntitySchema } from './schemas/entity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Entity.name, schema: EntitySchema }]),
  ],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
