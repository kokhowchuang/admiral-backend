import { Types } from 'mongoose';

export class CreateAccountDto {
  accountNumber: string;
  type: string;
  userId: Types.ObjectId;
}
