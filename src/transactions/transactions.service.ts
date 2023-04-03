import { InsufficientAmountException } from './../exceptions/insufficient-amount.exception';
import { AccountsService } from './../accounts/accounts.service';
import { UsersService } from './../users/users.service';
import { TransactionType } from './interfaces/transactions.interface';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TransactionsService {
  constructor(
    // @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly userService: UsersService,
    private readonly accountService: AccountsService,
  ) {}

  async create(dto: TransactionType) {
    return this.transactionModel.create({
      ...dto,
    });
  }

  async sendMoney(
    receiverTransactionDto: TransactionType,
    senderTransactionDTO: TransactionType,
  ) {
    const senderAccount = await this.accountService.findOneByAccountNumber(
      senderTransactionDTO.accountNumber,
    );
    const isBalanceSufficient =
      senderAccount.balance > receiverTransactionDto.amount ? true : false;

    if (isBalanceSufficient) {
      await this.create(receiverTransactionDto);
      await this.create(senderTransactionDTO);

      const result = await this.accountService.deductMoney(
        senderTransactionDTO.accountNumber,
        receiverTransactionDto.amount,
      );

      if (result.modifiedCount > 0) {
        await this.accountService.receiveMoney(
          receiverTransactionDto.accountNumber,
          receiverTransactionDto.amount,
        );
      }
    } else {
      throw new InsufficientAmountException();
    }
  }

  async topUpMoney(receiverTransactionDto: TransactionType) {
    const receiverAccount = await this.accountService.findOneByAccountNumber(
      receiverTransactionDto.accountNumber,
    );

    await this.create(receiverTransactionDto);

    await this.accountService.receiveMoney(
      receiverTransactionDto.accountNumber,
      receiverTransactionDto.amount,
    );
  }
}
