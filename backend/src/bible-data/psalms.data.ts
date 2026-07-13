export interface BibleChapter {
  book: string;
  chapter: number;
  translation: string;
  verses: { num: number; text: string; words?: { position: number; hebrew?: string; greek?: string; strongs?: string }[] }[];
  metadata?: { section: string; genre: string; dateRange: string };
}

export const psalm23: BibleChapter[] = [
  {
    book: 'psalms', chapter: 23, translation: 'web',
    verses: [
      { num: 1, text: 'Yahweh is my shepherd: I shall lack nothing.' },
      { num: 2, text: 'He makes me lie down in green pastures. He leads me beside still waters.' },
      { num: 3, text: 'He restores my soul. He guides me in the paths of righteousness for his name\'s sake.' },
      { num: 4, text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.' },
      { num: 5, text: 'You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over.' },
      { num: 6, text: 'Surely goodness and loving kindness will follow me all the days of my life, and I will dwell in Yahweh\'s house forever.' },
    ],
    metadata: { section: 'Writings', genre: 'Poetry', dateRange: '~1000 BC' },
  },
  {
    book: 'psalms', chapter: 23, translation: 'kjv',
    verses: [
      { num: 1, text: 'The LORD is my shepherd; I shall not want.' },
      { num: 2, text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
      { num: 3, text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.' },
      { num: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
      { num: 5, text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.' },
      { num: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.' },
    ],
    metadata: { section: 'Writings', genre: 'Poetry', dateRange: '~1000 BC' },
  },
  {
    book: 'psalms', chapter: 23, translation: 'asv',
    verses: [
      { num: 1, text: 'Jehovah is my shepherd; I shall not want.' },
      { num: 2, text: 'He maketh me to lie down in green pastures; He leadeth me beside still waters.' },
      { num: 3, text: 'He restoreth my soul: He guideth me in the paths of righteousness for his name\'s sake.' },
      { num: 4, text: 'Yea, thou I walk through the valley of the shadow of death, I will fear no evil; for thou art with me; Thy rod and thy staff, they comfort me.' },
      { num: 5, text: 'Thou preparest a table before me in the presence of mine enemies: Thou hast anointed my head with oil; My cup runneth over.' },
      { num: 6, text: 'Surely goodness and lovingkindness shall follow me all the days of my life; And I shall dwell in the house of Jehovah for ever.' },
    ],
    metadata: { section: 'Writings', genre: 'Poetry', dateRange: '~1000 BC' },
  },
];
