import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema()
export class Occurrence extends AbstractDocument {
  @Prop()
  occurrenceId: string;

  @Prop()
  registered_at: string;

  @Prop()
  local: string;

  @Prop()
  occurrence_type: number;

  @Prop()
  km: number;

  @Prop()
  userId: string;
}

export const OccurrenceSchema = SchemaFactory.createForClass(Occurrence);
