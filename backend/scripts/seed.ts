import { connect, disconnect, Model } from 'mongoose';
import { Passage, PassageSchema } from '../src/passages/schemas/passage.schema';
import { Lexicon, LexiconSchema } from '../src/lexicon/schemas/lexicon.schema';
import { Entity, EntitySchema } from '../src/entities/schemas/entity.schema';
import { lexiconData } from '../src/lexicon/lexicon.data';
import { entityData } from '../src/entities/entities.data';
import { bibleChapters } from '../src/bible-data/genesis.data';
import { psalm23 } from '../src/bible-data/psalms.data';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/ble';

async function seed() {
  const connection = await connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // ——— 1. Seed Bible passages (multiple translations) ———
  const PassageModel = connection.model<Passage>('Passage', PassageSchema);
  await PassageModel.deleteMany({});
  console.log('Cleared existing passages');

  const allChapters = [...bibleChapters, ...psalm23];
  const chaptersMap = new Map<string, Passage>();

  for (const ch of allChapters) {
    const key = `${ch.book}-${ch.chapter}`;
    const existing = chaptersMap.get(key);
    if (existing) {
      existing.verses.push(...ch.verses.map(v => ({
        num: v.num,
        text: v.text,
        translation: ch.translation,
        words: v.words ?? [],
      })));
    } else {
      chaptersMap.set(key, {
        book: ch.book,
        chapter: ch.chapter,
        verses: ch.verses.map(v => ({
          num: v.num,
          text: v.text,
          translation: ch.translation,
          words: v.words ?? [],
        })),
        metadata: ch.metadata ?? { section: '', genre: '', dateRange: '' },
      } as unknown as Passage);
    }
  }

  await PassageModel.insertMany(Array.from(chaptersMap.values()));
  console.log(`Seeded ${allChapters.length} passage entries (${chaptersMap.size} chapters)`);

  // ——— 2. Seed Lexicon ———
  const LexiconModel = connection.model<Lexicon>('Lexicon', LexiconSchema);
  await LexiconModel.deleteMany({});
  console.log('Cleared existing lexicon');

  await LexiconModel.insertMany(lexiconData.flat());
  console.log(`Seeded ${lexiconData.length} lexicon entries`);

  // ——— 3. Seed Entities ———
  const EntityModel = connection.model<Entity>('Entity', EntitySchema);
  await EntityModel.deleteMany({});
  console.log('Cleared existing entities');

  await EntityModel.insertMany(entityData);
  console.log(`Seeded ${entityData.length} entities`);

  await disconnect();
  console.log('Done — all data seeded');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
