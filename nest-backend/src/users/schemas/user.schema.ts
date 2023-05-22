import { AbstractDocument } from '../../database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
