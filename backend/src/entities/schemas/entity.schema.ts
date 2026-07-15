import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class Connection {
  @Prop()
  id?: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  relationship: string;

  @Prop()
  slug?: string;
}

@Schema({ _id: false })
class Occurrence {
  @Prop()
  reference: string;

  @Prop()
  text: string;
}

@Schema({ _id: false })
class TimelineEvent {
  @Prop()
  date: string;

  @Prop()
  label: string;
}

@Schema({ collection: 'entities', timestamps: true })
export class Entity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, index: true })
  slug: string;

  @Prop({ required: true, index: true })
  type: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  background: string;

  @Prop({ type: [Occurrence], default: [] })
  occurrences: Occurrence[];

  @Prop({ type: [Connection], default: [] })
  connections: Connection[];

  @Prop({ type: [TimelineEvent], default: [] })
  timeline: TimelineEvent[];

  @Prop()
  dateRange?: string;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);

EntitySchema.index({ type: 1, slug: 1 }, { unique: true });
EntitySchema.index({ name: 'text', summary: 'text' });
