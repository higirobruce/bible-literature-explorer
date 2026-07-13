import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passage } from '../passages/schemas/passage.schema';

interface SearchOptions {
  type?: string;
  translation?: string;
  book?: string;
}

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Passage.name) private passageModel: Model<Passage>,
  ) {}

  async search(query: string, options: SearchOptions) {
    const filter: Record<string, unknown> = {};

    if (options.book) {
      filter.book = options.book.toLowerCase();
    }

    if (options.translation) {
      filter['verses.translation'] = options.translation;
    }

    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter['verses.text'] = regex;

    const passages = await this.passageModel
      .find(filter)
      .select('book chapter verses.$')
      .limit(20);

    const results = passages.flatMap((p) =>
      p.verses
        .filter((v) => regex.test(v.text))
        .slice(0, 5)
        .map((v) => ({
          book: p.book,
          chapter: p.chapter,
          verse: v.num,
          text: v.text,
          translation: v.translation,
        })),
    );

    return { results, total: results.length };
  }
}
