import { connect, disconnect, Model } from 'mongoose';
import { Passage, PassageSchema } from '../src/passages/schemas/passage.schema';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/ble';

const genesis1 = {
  book: 'genesis',
  chapter: 1,
  verses: [
    { num: 1, text: 'In the beginning, God created the heavens and the earth.', translation: 'esv', words: [] },
    { num: 2, text: 'The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.', translation: 'esv', words: [] },
    { num: 3, text: 'And God said, "Let there be light," and there was light.', translation: 'esv', words: [] },
    { num: 4, text: 'And God saw that the light was good. And God separated the light from the darkness.', translation: 'esv', words: [] },
    { num: 5, text: 'God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.', translation: 'esv', words: [] },
    { num: 6, text: 'And God said, "Let there be an expanse in the midst of the waters, and let it separate the waters from the waters."', translation: 'esv', words: [] },
    { num: 7, text: 'And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so.', translation: 'esv', words: [] },
    { num: 8, text: 'And God called the expanse Heaven. And there was evening and there was morning, the second day.', translation: 'esv', words: [] },
    { num: 9, text: 'And God said, "Let the waters under the heavens be gathered together into one place, and let the dry land appear." And it was so.', translation: 'esv', words: [] },
    { num: 10, text: 'God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good.', translation: 'esv', words: [] },
    { num: 11, text: 'And God said, "Let the earth sprout vegetation, plants yielding seed, and fruit trees bearing fruit in which is their seed, each according to its kind, on the earth." And it was so.', translation: 'esv', words: [] },
    { num: 12, text: 'The earth brought forth vegetation, plants yielding seed according to their own kinds, and trees bearing fruit in which is their seed, each according to its kind. And God saw that it was good.', translation: 'esv', words: [] },
    { num: 13, text: 'And there was evening and there was morning, the third day.', translation: 'esv', words: [] },
    { num: 14, text: 'And God said, "Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years,"', translation: 'esv', words: [] },
    { num: 15, text: 'and let them be lights in the expanse of the heavens to give light upon the earth." And it was so.', translation: 'esv', words: [] },
    { num: 16, text: 'And God made the two great lights—the greater light to rule the day and the lesser light to rule the night—and the stars.', translation: 'esv', words: [] },
    { num: 17, text: 'And God set them in the expanse of the heavens to give light on the earth,', translation: 'esv', words: [] },
    { num: 18, text: 'to rule over the day and over the night, and to separate the light from the darkness. And God saw that it was good.', translation: 'esv', words: [] },
    { num: 19, text: 'And there was evening and there was morning, the fourth day.', translation: 'esv', words: [] },
    { num: 20, text: 'And God said, "Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens."', translation: 'esv', words: [] },
    { num: 21, text: 'So God created the great sea creatures and every living creature that moves, with which the waters swarm, according to their kinds, and every winged bird according to its kind. And God saw that it was good.', translation: 'esv', words: [] },
    { num: 22, text: 'And God blessed them, saying, "Be fruitful and multiply and fill the waters in the seas, and let birds multiply on the earth."', translation: 'esv', words: [] },
    { num: 23, text: 'And there was evening and there was morning, the fifth day.', translation: 'esv', words: [] },
    { num: 24, text: 'And God said, "Let the earth bring forth living creatures according to their kinds—livestock and creeping things and beasts of the earth according to their kinds." And it was so.', translation: 'esv', words: [] },
    { num: 25, text: 'And God made the beasts of the earth according to their kinds and the livestock according to their kinds, and everything that creeps on the ground according to its kind. And God saw that it was good.', translation: 'esv', words: [] },
    { num: 26, text: 'Then God said, "Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth."', translation: 'esv', words: [] },
    { num: 27, text: 'So God created man in his own image, in the image of God he created him; male and female he created them.', translation: 'esv', words: [] },
    { num: 28, text: 'And God blessed them. And God said to them, "Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and over the birds of the heavens and over every living thing that moves on the earth."', translation: 'esv', words: [] },
    { num: 29, text: 'And God said, "Behold, I have given you every plant yielding seed that is on the face of all the earth, and every tree with seed in its fruit. You shall have them for food."', translation: 'esv', words: [] },
    { num: 30, text: 'And to every beast of the earth and to every bird of the heavens and to everything that creeps on the earth, everything that has the breath of life, I have given every green plant for food." And it was so.', translation: 'esv', words: [] },
    { num: 31, text: 'And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day.', translation: 'esv', words: [] },
  ],
  metadata: {
    section: 'Pentateuch',
    genre: 'Narrative',
    dateRange: '~1440-1400 BC',
  },
};

async function seed() {
  const connection = await connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const PassageModel = connection.model<Passage>('Passage', PassageSchema);

  await PassageModel.deleteMany({});
  console.log('Cleared existing passages');

  await PassageModel.create(genesis1);
  console.log('Seeded Genesis 1 (ESV)');

  await disconnect();
  console.log('Done');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
