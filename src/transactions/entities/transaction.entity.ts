import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({
  timestamps: true,
})
export class Transaction extends Document {
  @Prop()
  accountNumber: string;

  @Prop()
  type: string;

  @Prop()
  amount: number;

  @Prop()
  description: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
