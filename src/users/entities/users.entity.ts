import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  accountNumber: string;

  @Prop()
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
