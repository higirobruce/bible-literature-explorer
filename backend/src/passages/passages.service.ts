import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passage } from './schemas/passage.schema';

@Injectable()
export class PassagesService {
  constructor(
    @InjectModel(Passage.name) private passageModel: Model<Passage>,
  ) {}

  async findOne(book: string, chapter: number, translation?: string) {
    const normalizedBook = book.toLowerCase();
    const passage = await this.passageModel.findOne({
      book: normalizedBook,
      chapter,
    });

    if (!passage) {
      return null;
    }

    if (translation) {
      return {
        book: passage.book,
        chapter: passage.chapter,
        verses: passage.verses.filter((v) => v.translation === translation),
        metadata: passage.metadata,
      };
    }

    return passage;
  }
}
