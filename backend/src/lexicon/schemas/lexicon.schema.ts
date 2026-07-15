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

  @Prop({ default: '' })
  transliteration: string;

  @Prop({ default: '' })
  pronunciation: string;

  @Prop({ default: 'Unknown' })
  partOfSpeech: string;

  @Prop({ default: '' })
  gloss: string;

  @Prop({ default: 0 })
  occurrences: number;
}

export const LexiconSchema = SchemaFactory.createForClass(Lexicon);

LexiconSchema.index({ strongs: 1 }, { unique: true });
LexiconSchema.index({ lemma: 1 });
