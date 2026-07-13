import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LexiconController } from './lexicon.controller';
import { LexiconService } from './lexicon.service';
import { Lexicon, LexiconSchema } from './schemas/lexicon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lexicon.name, schema: LexiconSchema }]),
  ],
  controllers: [LexiconController],
  providers: [LexiconService],
  exports: [LexiconService],
})
export class LexiconModule {}
