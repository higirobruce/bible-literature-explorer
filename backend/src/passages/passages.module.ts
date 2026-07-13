import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassagesController } from './passages.controller';
import { PassagesService } from './passages.service';
import { Passage, PassageSchema } from './schemas/passage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Passage.name, schema: PassageSchema }]),
  ],
  controllers: [PassagesController],
  providers: [PassagesService],
})
export class PassagesModule {}
