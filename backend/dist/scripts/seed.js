"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passage_schema_1 = require("../src/passages/schemas/passage.schema");
const lexicon_schema_1 = require("../src/lexicon/schemas/lexicon.schema");
const entity_schema_1 = require("../src/entities/schemas/entity.schema");
const lexicon_data_1 = require("../src/lexicon/lexicon.data");
const entities_data_1 = require("../src/entities/entities.data");
const genesis_data_1 = require("../src/bible-data/genesis.data");
const psalms_data_1 = require("../src/bible-data/psalms.data");
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/ble';
async function seed() {
    const connection = await (0, mongoose_1.connect)(MONGO_URI);
    console.log('Connected to MongoDB');
    const PassageModel = connection.model('Passage', passage_schema_1.PassageSchema);
    await PassageModel.deleteMany({});
    console.log('Cleared existing passages');
    const allChapters = [...genesis_data_1.bibleChapters, ...psalms_data_1.psalm23];
    const chaptersMap = new Map();
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
        }
        else {
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
            });
        }
    }
    await PassageModel.insertMany(Array.from(chaptersMap.values()));
    console.log(`Seeded ${allChapters.length} passage entries (${chaptersMap.size} chapters)`);
    const LexiconModel = connection.model('Lexicon', lexicon_schema_1.LexiconSchema);
    await LexiconModel.deleteMany({});
    console.log('Cleared existing lexicon');
    await LexiconModel.insertMany(lexicon_data_1.lexiconData.flat());
    console.log(`Seeded ${lexicon_data_1.lexiconData.length} lexicon entries`);
    const EntityModel = connection.model('Entity', entity_schema_1.EntitySchema);
    await EntityModel.deleteMany({});
    console.log('Cleared existing entities');
    await EntityModel.insertMany(entities_data_1.entityData);
    console.log(`Seeded ${entities_data_1.entityData.length} entities`);
    await (0, mongoose_1.disconnect)();
    console.log('Done — all data seeded');
}
seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map