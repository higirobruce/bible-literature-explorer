import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Passage, PassageSchema } from '../passages/schemas/passage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Passage.name, schema: PassageSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
