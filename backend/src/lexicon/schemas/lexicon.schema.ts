import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'lexicon', timestamps: true })
export class Lexicon extends Document {
  @Prop({ required: true })
  strongs: string;

  @Prop({ required: true })
  lemma: string;

  @Prop()
  hebrew?: string;

  @Prop()
  greek?: string;

  @Prop({ required: true })
  transliteration: string;

  @Prop({ required: true })
  pronunciation: string;

  @Prop({ required: true })
  partOfSpeech: string;

  @Prop({ required: true })
  gloss: string;

  @Prop({ required: true })
  occurrences: number;
}

export const LexiconSchema = SchemaFactory.createForClass(Lexicon);

LexiconSchema.index({ strongs: 1 }, { unique: true });
LexiconSchema.index({ lemma: 1 });
