import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types, Document } from 'mongoose';
import { User } from 'src/users/entities/users.entity';

export type AccountDocument = HydratedDocument<Account>;

@Schema({
  timestamps: true,
})
export class Account extends Document {
  @Prop()
  accountNumber: string;

  @Prop()
  type: string;

  @Prop()
  balance: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: Types.ObjectId;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
