import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lexicon } from './schemas/lexicon.schema';

@Injectable()
export class LexiconService {
  constructor(
    @InjectModel(Lexicon.name) private lexiconModel: Model<Lexicon>,
  ) {}

  async findByStrongs(strongs: string) {
    const entry = await this.lexiconModel.findOne({ strongs });
    if (!entry) {
      throw new NotFoundException(`Lexicon entry not found: ${strongs}`);
    }
    return entry;
  }

  async search(query: string) {
    const q = query.toLowerCase();
    return this.lexiconModel.find({
      $or: [
        { strongs: { $regex: q, $options: 'i' } },
        { lemma: { $regex: q, $options: 'i' } },
        { gloss: { $regex: q, $options: 'i' } },
        { transliteration: { $regex: q, $options: 'i' } },
        { pronunciation: { $regex: q, $options: 'i' } },
      ],
    }).limit(20).lean();
  }
}
