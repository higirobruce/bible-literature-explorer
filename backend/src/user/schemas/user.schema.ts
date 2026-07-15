import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
class Account {
  @Prop()
  provider: string;

  @Prop()
  providerId: string;
}

  @Schema({ _id: false })
class UserPreferences {
  @Prop({ default: 'web' })
  defaultTranslation: string;

  @Prop({ default: 16 })
  fontSize: number;

  @Prop({ default: 'light' })
  theme: string;
}

@Schema({ _id: true })
export class Highlight {
  @Prop()
  passageId: string;

  @Prop()
  verseRange: string;

  @Prop()
  color: string;

  @Prop()
  note?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Schema({ _id: true })
export class Note {
  @Prop()
  passageId: string;

  @Prop()
  text: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ type: [{ provider: String, providerId: String }], default: [] })
  accounts: Account[];

  @Prop({ type: { defaultTranslation: String, fontSize: Number, theme: String }, default: { defaultTranslation: 'web', fontSize: 16, theme: 'light' } })
  preferences: UserPreferences;

  @Prop({ type: [{ passageId: String, verseRange: String, color: String, note: String, createdAt: Date }], default: [] })
  highlights: Types.DocumentArray<Highlight>;

  @Prop({ type: [String], default: [] })
  bookmarks: string[];

  @Prop({ type: [{ passageId: String, text: String, createdAt: Date, updatedAt: Date }], default: [] })
  notes: Types.DocumentArray<Note>;
}

export const UserSchema = SchemaFactory.createForClass(User);
