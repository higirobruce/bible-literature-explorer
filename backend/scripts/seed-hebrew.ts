import { connect, disconnect } from 'mongoose';
import { Passage, PassageSchema } from '../src/passages/schemas/passage.schema';
import * as fs from 'fs';
import * as path from 'path';
import { parseStringPromise } from 'xml2js';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/ble';
const MACULA_DIR = path.resolve(__dirname, '../../macula-hebrew/WLC/lowfat');

interface MaculaWord {
  hebrew: string;
  gloss: string;
  transliteration: string;
  strongs?: string;
  pos: string;
  morph: string;
  lemma: string;
  ref: string; // e.g. "GEN 1:1!1"
}

interface HebrewVerse {
  verseNum: number;
  words: MaculaWord[];
}

// Map Macula book codes to our book IDs
const BOOK_MAP: Record<string, string> = {
  'GEN': 'gen', 'EXO': 'exod', 'LEV': 'lev', 'NUM': 'num', 'DEU': 'deut',
  'JOS': 'josh', 'JDG': 'judg', 'RUT': 'ruth', '1SA': '1sam', '2SA': '2sam',
  '1KI': '1kgs', '2KI': '2kgs', '1CH': '1chr', '2CH': '2chr', 'EZR': 'ezra',
  'NEH': 'neh', 'EST': 'esth', 'JOB': 'job', 'PSA': 'ps', 'PRO': 'prov',
  'ECC': 'eccl', 'SNG': 'song', 'ISA': 'isa', 'JER': 'jer', 'LAM': 'lam',
  'EZK': 'ezek', 'DAN': 'dan', 'HOS': 'hos', 'JOL': 'joel', 'AMO': 'amos',
  'OBA': 'obad', 'JON': 'jonah', 'MIC': 'mic', 'NAM': 'nah', 'HAB': 'hab',
  'ZEP': 'zeph', 'HAG': 'hag', 'ZEC': 'zech', 'MAL': 'mal'
};

// Reverse map: our book ID -> Macula code
const REVERSE_BOOK_MAP = Object.fromEntries(
  Object.entries(BOOK_MAP).map(([k, v]) => [v, k])
);

// OT book numbers (01-39)
const OT_BOOKS = [
  'gen', 'exod', 'lev', 'num', 'deut', 'josh', 'judg', 'ruth', '1sam', '2sam',
  '1kgs', '2kgs', '1chr', '2chr', 'ezra', 'neh', 'esth', 'job', 'ps', 'prov',
  'eccl', 'song', 'isa', 'jer', 'lam', 'ezek', 'dan', 'hos', 'joel', 'amos',
  'obad', 'jonah', 'mic', 'nah', 'hab', 'zeph', 'hag', 'zech', 'mal'
];

async function parseMaculaChapter(filePath: string): Promise<{ book: string; chapter: number; verses: HebrewVerse[] }> {
  const xml = fs.readFileSync(filePath, 'utf-8');
  const parsed = await parseStringPromise(xml);
  
  const chapterNode = parsed.chapter;
  const chapterId = chapterNode.$.id; // e.g. "GEN 1"
  const [maculaBook, chapterStr] = chapterId.split(' ');
  const chapter = parseInt(chapterStr, 10);
  const book = BOOK_MAP[maculaBook];
  
  if (!book) {
    throw new Error(`Unknown Macula book code: ${maculaBook}`);
  }

  const verses: HebrewVerse[] = [];
  const sentences = chapterNode.sentence || [];

  for (const sentence of sentences) {
    const words = extractWords(sentence);
    
    // Group by verse number
    const verseMap = new Map<number, MaculaWord[]>();
    for (const word of words) {
      const verseNum = extractVerseNum(word.ref);
      if (!verseMap.has(verseNum)) {
        verseMap.set(verseNum, []);
      }
      verseMap.get(verseNum)!.push(word);
    }

    verseMap.forEach((verseWords, verseNum) => {
      const existing = verses.find(v => v.verseNum === verseNum);
      if (existing) {
        existing.words.push(...verseWords);
      } else {
        verses.push({ verseNum, words: verseWords });
      }
    });
  }

  return { book, chapter, verses: verses.sort((a, b) => a.verseNum - b.verseNum) };
}

function extractWords(node: any): MaculaWord[] {
  const words: MaculaWord[] = [];

  if (node.w) {
    for (const w of node.w) {
      const attrs = w.$;
      if (attrs) {
        words.push({
          hebrew: w._ || '',
          gloss: attrs.gloss || attrs.english || '',
          transliteration: attrs.transliteration || '',
          strongs: attrs.strongnumberx || attrs.strong || '',
          pos: attrs.pos || '',
          morph: attrs.morph || '',
          lemma: attrs.lemma || '',
          ref: attrs.ref || ''
        });
      }
    }
  }

  if (node.wg) {
    for (const wg of node.wg) {
      words.push(...extractWords(wg));
    }
  }

  return words;
}

function extractVerseNum(ref: string): number {
  // ref format: "GEN 1:1!1" -> extract verse number 1
  const match = ref.match(/:(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

async function seedHebrew() {
  console.log('Connecting to MongoDB...');
  await connect(MONGO_URI);
  console.log('Connected.');

  const mongoose = await import('mongoose');
  const PassageModel = mongoose.model('Passage', PassageSchema);

  // Get list of Macula XML files
  const files = fs.readdirSync(MACULA_DIR).filter(f => f.endsWith('-lowfat.xml'));
  console.log(`Found ${files.length} Macula Hebrew chapter files.`);

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      const filePath = path.join(MACULA_DIR, file);
      const { book, chapter, verses } = await parseMaculaChapter(filePath);

      // Find existing passage document for this book/chapter
      const existingPassages = await PassageModel.find({ book, chapter }).exec();

      if (existingPassages.length === 0) {
        console.log(`⚠️  No passage found for ${book} ${chapter}, skipping Hebrew data.`);
        skipped++;
        continue;
      }

      // Update each translation passage with Hebrew word data
      for (const passage of existingPassages) {
        // Match verses by number
        for (const hebrewVerse of verses) {
          const englishVerse = passage.verses.find(v => v.num === hebrewVerse.verseNum);
          if (englishVerse) {
            // Store Hebrew words alongside existing English text
            englishVerse.words = hebrewVerse.words.map((w, idx) => ({
              position: idx,
              hebrew: w.hebrew,
              gloss: w.gloss,
              transliteration: w.transliteration,
              strongs: w.strongs,
              pos: w.pos,
              morph: w.morph,
              lemma: w.lemma
            }));
          }
        }
        await passage.save();
      }

      processed++;
      if (processed % 10 === 0) {
        console.log(`Processed ${processed}/${files.length} chapters...`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log(`\n✅ Hebrew seed complete: ${processed} chapters updated, ${skipped} skipped.`);
  await disconnect();
}

seedHebrew().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
