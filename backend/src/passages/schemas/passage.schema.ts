import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class WordData {
  position: number;
  hebrew?: string;
  greek?: string;
  strongs?: string;
  stepbible?: string;
  etcbc?: string;
}

class Verse {
  num: number;
  text: string;
  translation: string;
  words: WordData[];
}

class PassageMetadata {
  section: string;
  genre: string;
  dateRange: string;
}

@Schema({ collection: 'passages', timestamps: true })
export class Passage extends Document {
  @Prop({ required: true, index: true })
  book: string;

  @Prop({ required: true, index: true })
  chapter: number;

  @Prop({ type: [{ num: Number, text: String, translation: String, words: [{ position: Number, hebrew: String, greek: String, strongs: String, stepbible: String, etcbc: String }] }] })
  verses: Verse[];

  @Prop({ type: { section: String, genre: String, dateRange: String } })
  metadata: PassageMetadata;
}

export const PassageSchema = SchemaFactory.createForClass(Passage);

PassageSchema.index({ book: 1, chapter: 1, 'verses.translation': 1 });
PassageSchema.index({ 'verses.text': 'text' });
