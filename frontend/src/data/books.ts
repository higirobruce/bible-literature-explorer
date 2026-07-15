export interface BibleBook {
  id: string;
  name: string;
  testament: "OT" | "NT";
  section: string;
  chapters: number;
}

export const BOOKS: BibleBook[] = [
  // ——— Old Testament ———
  { id: "gen", name: "Genesis", testament: "OT", section: "Pentateuch", chapters: 50 },
  { id: "exod", name: "Exodus", testament: "OT", section: "Pentateuch", chapters: 40 },
  { id: "lev", name: "Leviticus", testament: "OT", section: "Pentateuch", chapters: 27 },
  { id: "num", name: "Numbers", testament: "OT", section: "Pentateuch", chapters: 36 },
  { id: "deut", name: "Deuteronomy", testament: "OT", section: "Pentateuch", chapters: 34 },
  { id: "josh", name: "Joshua", testament: "OT", section: "Historical Books", chapters: 24 },
  { id: "judg", name: "Judges", testament: "OT", section: "Historical Books", chapters: 21 },
  { id: "ruth", name: "Ruth", testament: "OT", section: "Historical Books", chapters: 4 },
  { id: "1sam", name: "1 Samuel", testament: "OT", section: "Historical Books", chapters: 31 },
  { id: "2sam", name: "2 Samuel", testament: "OT", section: "Historical Books", chapters: 24 },
  { id: "1kgs", name: "1 Kings", testament: "OT", section: "Historical Books", chapters: 22 },
  { id: "2kgs", name: "2 Kings", testament: "OT", section: "Historical Books", chapters: 25 },
  { id: "1chr", name: "1 Chronicles", testament: "OT", section: "Historical Books", chapters: 29 },
  { id: "2chr", name: "2 Chronicles", testament: "OT", section: "Historical Books", chapters: 36 },
  { id: "ezra", name: "Ezra", testament: "OT", section: "Historical Books", chapters: 10 },
  { id: "neh", name: "Nehemiah", testament: "OT", section: "Historical Books", chapters: 13 },
  { id: "esth", name: "Esther", testament: "OT", section: "Historical Books", chapters: 10 },
  { id: "job", name: "Job", testament: "OT", section: "Wisdom Literature", chapters: 42 },
  { id: "ps", name: "Psalms", testament: "OT", section: "Wisdom Literature", chapters: 150 },
  { id: "prov", name: "Proverbs", testament: "OT", section: "Wisdom Literature", chapters: 31 },
  { id: "eccl", name: "Ecclesiastes", testament: "OT", section: "Wisdom Literature", chapters: 12 },
  { id: "song", name: "Song of Solomon", testament: "OT", section: "Wisdom Literature", chapters: 8 },
  { id: "isa", name: "Isaiah", testament: "OT", section: "Major Prophets", chapters: 66 },
  { id: "jer", name: "Jeremiah", testament: "OT", section: "Major Prophets", chapters: 52 },
  { id: "lam", name: "Lamentations", testament: "OT", section: "Major Prophets", chapters: 5 },
  { id: "ezek", name: "Ezekiel", testament: "OT", section: "Major Prophets", chapters: 48 },
  { id: "dan", name: "Daniel", testament: "OT", section: "Major Prophets", chapters: 12 },
  { id: "hos", name: "Hosea", testament: "OT", section: "Minor Prophets", chapters: 14 },
  { id: "joel", name: "Joel", testament: "OT", section: "Minor Prophets", chapters: 3 },
  { id: "amos", name: "Amos", testament: "OT", section: "Minor Prophets", chapters: 9 },
  { id: "obad", name: "Obadiah", testament: "OT", section: "Minor Prophets", chapters: 1 },
  { id: "jonah", name: "Jonah", testament: "OT", section: "Minor Prophets", chapters: 4 },
  { id: "mic", name: "Micah", testament: "OT", section: "Minor Prophets", chapters: 7 },
  { id: "nah", name: "Nahum", testament: "OT", section: "Minor Prophets", chapters: 3 },
  { id: "hab", name: "Habakkuk", testament: "OT", section: "Minor Prophets", chapters: 3 },
  { id: "zeph", name: "Zephaniah", testament: "OT", section: "Minor Prophets", chapters: 3 },
  { id: "hag", name: "Haggai", testament: "OT", section: "Minor Prophets", chapters: 2 },
  { id: "zech", name: "Zechariah", testament: "OT", section: "Minor Prophets", chapters: 14 },
  { id: "mal", name: "Malachi", testament: "OT", section: "Minor Prophets", chapters: 4 },
  // ——— New Testament ———
  { id: "matt", name: "Matthew", testament: "NT", section: "Gospels", chapters: 28 },
  { id: "mark", name: "Mark", testament: "NT", section: "Gospels", chapters: 16 },
  { id: "luke", name: "Luke", testament: "NT", section: "Gospels", chapters: 24 },
  { id: "john", name: "John", testament: "NT", section: "Gospels", chapters: 21 },
  { id: "acts", name: "Acts", testament: "NT", section: "History", chapters: 28 },
  { id: "rom", name: "Romans", testament: "NT", section: "Epistles", chapters: 16 },
  { id: "1cor", name: "1 Corinthians", testament: "NT", section: "Epistles", chapters: 16 },
  { id: "2cor", name: "2 Corinthians", testament: "NT", section: "Epistles", chapters: 13 },
  { id: "gal", name: "Galatians", testament: "NT", section: "Epistles", chapters: 6 },
  { id: "eph", name: "Ephesians", testament: "NT", section: "Epistles", chapters: 6 },
  { id: "phil", name: "Philippians", testament: "NT", section: "Epistles", chapters: 4 },
  { id: "col", name: "Colossians", testament: "NT", section: "Epistles", chapters: 4 },
  { id: "1thess", name: "1 Thessalonians", testament: "NT", section: "Epistles", chapters: 5 },
  { id: "2thess", name: "2 Thessalonians", testament: "NT", section: "Epistles", chapters: 3 },
  { id: "1tim", name: "1 Timothy", testament: "NT", section: "Epistles", chapters: 6 },
  { id: "2tim", name: "2 Timothy", testament: "NT", section: "Epistles", chapters: 4 },
  { id: "titus", name: "Titus", testament: "NT", section: "Epistles", chapters: 3 },
  { id: "phlm", name: "Philemon", testament: "NT", section: "Epistles", chapters: 1 },
  { id: "heb", name: "Hebrews", testament: "NT", section: "Epistles", chapters: 13 },
  { id: "jas", name: "James", testament: "NT", section: "Epistles", chapters: 5 },
  { id: "1pet", name: "1 Peter", testament: "NT", section: "Epistles", chapters: 5 },
  { id: "2pet", name: "2 Peter", testament: "NT", section: "Epistles", chapters: 3 },
  { id: "1john", name: "1 John", testament: "NT", section: "Epistles", chapters: 5 },
  { id: "2john", name: "2 John", testament: "NT", section: "Epistles", chapters: 1 },
  { id: "3john", name: "3 John", testament: "NT", section: "Epistles", chapters: 1 },
  { id: "jude", name: "Jude", testament: "NT", section: "Epistles", chapters: 1 },
  { id: "rev", name: "Revelation", testament: "NT", section: "Apocalyptic", chapters: 22 },
];

export const BOOK_SECTIONS = [
  "Pentateuch",
  "Historical Books",
  "Wisdom Literature",
  "Major Prophets",
  "Minor Prophets",
  "Gospels",
  "History",
  "Epistles",
  "Apocalyptic",
];

export function bookName(id: string): string {
  return BOOKS.find((b) => b.id === id)?.name ?? id;
}
