import { connect, disconnect } from 'mongoose';
import { Passage, PassageSchema } from '../src/passages/schemas/passage.schema';
import { Lexicon, LexiconSchema } from '../src/lexicon/schemas/lexicon.schema';
import { Entity, EntitySchema } from '../src/entities/schemas/entity.schema';
import { lexiconData } from '../src/lexicon/lexicon.data';
import { entityData } from '../src/entities/entities.data';
import { bibleChapters } from '../src/bible-data/genesis.data';
import { psalm23 } from '../src/bible-data/psalms.data';
import * as fs from 'fs';
import * as path from 'path';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/ble';
const DATA_DIR = path.resolve(__dirname, 'data');

interface StrongsEntry {
  strongs: string;
  lemma: string;
  hebrew?: string;
  greek?: string;
  transliteration: string;
  pronunciation: string;
  partOfSpeech: string;
  gloss: string;
  occurrences: number;
}

interface BibleVerse {
  num: number;
  text: string;
  translation?: string;
  words?: { position: number; hebrew?: string; greek?: string; strongs?: string }[];
}

interface BibleChapterFile {
  book: string;
  chapter: number;
  translation: string;
  verses: BibleVerse[];
  metadata?: { section: string; genre: string; dateRange: string };
}

// ——— Translation metadata ———
const TRANSLATIONS = [
  { id: 'web', name: 'World English Bible', url: 'https://github.com/openscriptures/BibleJson' },
  { id: 'kjv', name: 'King James Version', url: 'https://github.com/openscriptures/BibleJson' },
  { id: 'asv', name: 'American Standard Version', url: 'https://github.com/openscriptures/BibleJson' },
  { id: 'ylt', name: "Young's Literal Translation", url: 'https://github.com/openscriptures/BibleJson' },
  { id: 'esv', name: 'English Standard Version (placeholder — requires license)', url: '' },
];

const GENRE_MAP: Record<string, string> = {
  gen: 'Narrative', exo: 'Narrative', lev: 'Law', num: 'Narrative', deu: 'Law',
  jos: 'Narrative', jdg: 'Narrative', rut: 'Narrative',
  '1sa': 'Narrative', '2sa': 'Narrative',
  '1ki': 'Narrative', '2ki': 'Narrative',
  '1ch': 'Narrative', '2ch': 'Narrative',
  ezr: 'Narrative', neh: 'Narrative', est: 'Narrative',
  job: 'Wisdom', psa: 'Poetry', pro: 'Wisdom', ecc: 'Wisdom', sng: 'Poetry',
  isa: 'Prophecy', jer: 'Prophecy', lam: 'Poetry', ezk: 'Prophecy',
  dan: 'Apocalyptic',
  hos: 'Prophecy', jol: 'Prophecy', amo: 'Prophecy', oba: 'Prophecy',
  jon: 'Narrative', mic: 'Prophecy', nam: 'Prophecy', hab: 'Prophecy',
  zep: 'Prophecy', hag: 'Prophecy', zec: 'Prophecy', mal: 'Prophecy',
  mat: 'Gospel', mrk: 'Gospel', luk: 'Gospel', jhn: 'Gospel',
  act: 'Narrative',
  rom: 'Epistle', '1co': 'Epistle', '2co': 'Epistle', gal: 'Epistle',
  eph: 'Epistle', php: 'Epistle', col: 'Epistle',
  '1th': 'Epistle', '2th': 'Epistle',
  '1ti': 'Epistle', '2ti': 'Epistle', tit: 'Epistle', phm: 'Epistle',
  heb: 'Epistle', jam: 'Epistle',
  '1pe': 'Epistle', '2pe': 'Epistle',
  '1jn': 'Epistle', '2jn': 'Epistle', '3jn': 'Epistle', jud: 'Epistle',
  rev: 'Apocalyptic',
};

const SECTION_MAP: Record<string, string> = {
  gen: 'Pentateuch', exo: 'Pentateuch', lev: 'Pentateuch', num: 'Pentateuch', deu: 'Pentateuch',
  jos: 'Historical Books', jdg: 'Historical Books', rut: 'Historical Books',
  '1sa': 'Historical Books', '2sa': 'Historical Books',
  '1ki': 'Historical Books', '2ki': 'Historical Books',
  '1ch': 'Historical Books', '2ch': 'Historical Books',
  ezr: 'Historical Books', neh: 'Historical Books', est: 'Historical Books',
  job: 'Wisdom Literature', psa: 'Wisdom Literature', pro: 'Wisdom Literature',
  ecc: 'Wisdom Literature', sng: 'Wisdom Literature',
  isa: 'Major Prophets', jer: 'Major Prophets', lam: 'Major Prophets',
  ezk: 'Major Prophets', dan: 'Major Prophets',
  hos: 'Minor Prophets', jol: 'Minor Prophets', amo: 'Minor Prophets',
  oba: 'Minor Prophets', jon: 'Minor Prophets', mic: 'Minor Prophets',
  nam: 'Minor Prophets', hab: 'Minor Prophets', zep: 'Minor Prophets',
  hag: 'Minor Prophets', zec: 'Minor Prophets', mal: 'Minor Prophets',
  mat: 'Gospels', mrk: 'Gospels', luk: 'Gospels', jhn: 'Gospels',
  act: 'History',
  rom: 'Epistles',
};

// ——— Parse openscriptures/BibleJson format ———
function parseBibleJson(filePath: string, translation: string): BibleChapterFile[] | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    const book = path.basename(filePath, '.json').toLowerCase();

    if (Array.isArray(data)) {
      // Format: [{ chapter: 1, verses: [{ verse: 1, text: "..." }, ...] }, ...]
      return data.map((ch: any) => ({
        book,
        chapter: ch.chapter ?? ch.chapterNumber,
        translation,
        verses: (ch.verses ?? []).map((v: any) => ({
          num: v.verse ?? v.verseNumber,
          text: v.text ?? '',
          translation,
        })),
      }));
    }

    if (data.chapters) {
      return data.chapters.map((ch: any) => ({
        book,
        chapter: ch.chapter ?? ch.num ?? ch.number,
        translation,
        verses: (ch.verses ?? []).map((v: any) => ({
          num: v.verse ?? v.num ?? v.number,
          text: v.text ?? '',
          translation,
        })),
      }));
    }

    return null;
  } catch {
    return null;
  }
}

// ——— Load Bible from directory ———
function loadBibleTranslation(translation: string): BibleChapterFile[] {
  const dir = path.join(DATA_DIR, 'bible', translation);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const chapters: BibleChapterFile[] = [];

  for (const file of files) {
    const parsed = parseBibleJson(path.join(dir, file), translation);
    if (parsed) chapters.push(...parsed);
  }

  return chapters;
}

// ——— Load Strong's lexicon from JSON ———
function loadStrongsData(): StrongsEntry[] {
  const entries: StrongsEntry[] = [];
  const dir = path.join(DATA_DIR, 'strongs');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const data = JSON.parse(raw);
      const arr = Array.isArray(data) ? data : [data];
      for (const item of arr) {
        entries.push({
          strongs: item.strongs ?? item.id ?? item.number ?? '',
          lemma: item.lemma ?? item.word ?? item.lemma ?? '',
          hebrew: item.hebrew ?? item.Hebrew ?? '',
          greek: item.greek ?? item.Greek ?? '',
          transliteration: item.transliteration ?? item.translit ?? item.pronunciation ?? '',
          pronunciation: item.pronunciation ?? item.phonetic ?? item.transliteration ?? '',
          partOfSpeech: item.partOfSpeech ?? item.pos ?? item.ofSpeech ?? '',
          gloss: item.gloss ?? item.definition ?? item.meaning ?? '',
          occurrences: item.occurrences ?? item.count ?? 0,
        });
      }
    } catch { /* skip invalid files */ }
  }
  return entries;
}

// ——— Load Macula Hebrew word alignment ———
function loadMaculaAlignment(): Map<string, { position: number; hebrew: string; strongs: string }[]> {
  const alignmentMap = new Map<string, { position: number; hebrew: string; strongs: string }[]>();
  const dir = path.join(DATA_DIR, 'macula');
  if (!fs.existsSync(dir)) return alignmentMap;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const data = JSON.parse(raw);
      const entries = Array.isArray(data) ? data : [data];
      for (const entry of entries) {
        const key = `${entry.book}:${entry.chapter}:${entry.verse}`;
        if (!alignmentMap.has(key)) alignmentMap.set(key, []);
        alignmentMap.get(key)!.push({
          position: entry.position ?? entry.wordIndex ?? 0,
          hebrew: entry.hebrew ?? entry.text ?? '',
          strongs: entry.strongs ?? entry.strong ?? '',
        });
      }
    } catch { /* skip */ }
  }
  return alignmentMap;
}

// ——— Apply Macula alignment to a chapter's verses ———
function applyWordAlignment(
  verses: BibleVerse[],
  book: string,
  chapter: number,
  alignment: Map<string, { position: number; hebrew: string; strongs: string }[]>,
) {
  for (const verse of verses) {
    const key = `${book}:${chapter}:${verse.num}`;
    const words = alignment.get(key);
    if (words && words.length > 0) {
      verse.words = words.map(w => ({
        position: w.position,
        hebrew: w.hebrew,
        strongs: w.strongs,
      }));
    }
  }
}

// ——— Merge multiple translations into Passage documents ———
function mergeToPassages(chapters: BibleChapterFile[]): any[] {
  const merged = new Map<string, any>();

  for (const ch of chapters) {
    const key = `${ch.book}:${ch.chapter}`;
    if (!merged.has(key)) {
      const bookId = ch.book;
      merged.set(key, {
        book: ch.book,
        chapter: ch.chapter,
        verses: [],
        metadata: {
          section: SECTION_MAP[bookId] ?? 'General',
          genre: GENRE_MAP[bookId] ?? 'General',
          dateRange: '',
        },
      });
    }
    const passage = merged.get(key)!;
    for (const v of ch.verses) {
      passage.verses.push({
        num: v.num,
        text: v.text,
        translation: ch.translation,
        words: v.words ?? [],
      });
    }
  }

  return Array.from(merged.values());
}

// ============================================================
// MAIN SEED
// ============================================================
async function seed() {
  const connection = await connect(MONGO_URI);
  console.log(`Connected to MongoDB at ${MONGO_URI}`);

  // ——— 1. BIBLE PASSAGES ———
  let allChapters: BibleChapterFile[] = [];

  for (const t of TRANSLATIONS) {
    const chapters = loadBibleTranslation(t.id);
    if (chapters.length > 0) {
      console.log(`  Loaded ${chapters.length} chapters from ${t.id} (${t.name})`);
      allChapters.push(...chapters);
    }
  }

  // Fallback: use embedded sample data
  if (allChapters.length === 0) {
    console.log('  No external Bible files found. Using embedded sample data (Genesis 1 + Psalm 23).');
    console.log('  To seed the full Bible, download JSON files from:');
    console.log('    https://github.com/openscriptures/BibleJson');
    console.log(`  Place them in: ${path.join(DATA_DIR, 'bible', '<translation>')}/`);
    allChapters.push(...bibleChapters, ...psalm23);
  }

  // Apply Macula Hebrew word alignment if available
  console.log('  Loading Strong\'s alignment data...');
  const alignment = loadMaculaAlignment();
  if (alignment.size > 0) {
    console.log(`  Found ${alignment.size} verses with word-level alignment`);
    for (const ch of allChapters) {
      applyWordAlignment(ch.verses, ch.book, ch.chapter, alignment);
    }
  }

  const PassageModel = connection.model<Passage>('Passage', PassageSchema);
  await PassageModel.deleteMany({});
  console.log('  Cleared existing passages');

  const passages = mergeToPassages(allChapters);
  await PassageModel.insertMany(passages);
  console.log(`  Seeded ${passages.length} passages (${allChapters.length} chapter-translations)`);

  // ——— 2. LEXICON ———
  let strongsEntries = loadStrongsData();

  // Fallback: use embedded data
  if (strongsEntries.length === 0) {
    console.log('  No external Strong\'s data found. Using embedded 140-entry sample.');
    console.log('  To seed the full lexicon (8,674 Hebrew + 5,624 Greek), download:');
    console.log('    https://github.com/openscriptures/strongs');
    console.log(`  Place JSON files in: ${path.join(DATA_DIR, 'strongs')}/`);
    strongsEntries = lexiconData as unknown as StrongsEntry[];
  }

  const LexiconModel = connection.model<Lexicon>('Lexicon', LexiconSchema);
  await LexiconModel.deleteMany({});
  console.log('  Cleared existing lexicon');

  // Batch insert in chunks of 1000 to avoid memory issues
  const chunkSize = 1000;
  for (let i = 0; i < strongsEntries.length; i += chunkSize) {
    const chunk = strongsEntries.slice(i, i + chunkSize);
    await LexiconModel.insertMany(chunk);
  }
  console.log(`  Seeded ${strongsEntries.length} lexicon entries`);

  // ——— 3. ENTITIES ———
  const EntityModel = connection.model<Entity>('Entity', EntitySchema);
  await EntityModel.deleteMany({});
  console.log('  Cleared existing entities');

  await EntityModel.insertMany(entityData);
  console.log(`  Seeded ${entityData.length} entities`);

  await disconnect();
  console.log('✓ Seed complete');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
