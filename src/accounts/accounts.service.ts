import { AccountType } from './interfaces/account.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  create(accountType: AccountType) {
    return this.accountModel.create({
      ...accountType,
    });
  }

  async findOneByAccountNumber(accountNumber: string): Promise<AccountType> {
    return this.accountModel.findOne({ accountNumber }).exec();
  }

  async deductMoney(accountNumber: string, amount: number) {
    return this.accountModel
      .updateOne({ accountNumber }, { $inc: { balance: amount * -1 } })
      .exec();
  }

  async receiveMoney(accountNumber: string, amount: number) {
    return this.accountModel
      .updateOne({ accountNumber }, { $inc: { balance: amount } })
      .exec();
  }
}
