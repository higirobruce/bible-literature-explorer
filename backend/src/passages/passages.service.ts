import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passage } from './schemas/passage.schema';

const BOOK_ALIASES: Record<string, string> = {
  genesis: 'gen', exodus: 'exod', leviticus: 'lev', numbers: 'num', deuteronomy: 'deut',
  joshua: 'josh', judges: 'judg', ruth: 'ruth',
  '1samuel': '1sam', '2samuel': '2sam',
  '1kings': '1kgs', '2kings': '2kgs',
  '1chronicles': '1chr', '2chronicles': '2chr',
  ezra: 'ezra', nehemiah: 'neh', esther: 'esth',
  job: 'job', psalms: 'ps', psalm: 'ps', proverbs: 'prov', ecclesiastes: 'eccl',
  songofsolomon: 'song', song: 'song', 'song of songs': 'song', 'song of solomon': 'song',
  isaiah: 'isa', jeremiah: 'jer', lamentations: 'lam', ezekiel: 'ezek',
  daniel: 'dan',
  hosea: 'hos', joel: 'joel', amos: 'amos', obadiah: 'obad',
  jonah: 'jonah', micah: 'mic', nahum: 'nah', habakkuk: 'hab',
  zephaniah: 'zeph', haggai: 'hag', zechariah: 'zech', malachi: 'mal',
  matthew: 'matt', mark: 'mark', luke: 'luke', john: 'john',
  acts: 'acts',
  romans: 'rom',
  '1corinthians': '1cor', '2corinthians': '2cor',
  galatians: 'gal', ephesians: 'eph', philippians: 'phil', colossians: 'col',
  '1thessalonians': '1thess', '2thessalonians': '2thess',
  '1timothy': '1tim', '2timothy': '2tim',
  titus: 'titus', philemon: 'phlm',
  hebrews: 'heb', james: 'jas',
  '1peter': '1pet', '2peter': '2pet',
  '1john': '1john', '2john': '2john', '3john': '3john',
  jude: 'jude', revelation: 'rev',
};

@Injectable()
export class PassagesService {
  constructor(
    @InjectModel(Passage.name) private passageModel: Model<Passage>,
  ) {}

  async findOne(book: string, chapter: number, translation?: string) {
    const raw = book.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedBook = BOOK_ALIASES[raw] ?? raw;
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
