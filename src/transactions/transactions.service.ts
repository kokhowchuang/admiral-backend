import { TransactionType } from './interfaces/transactions.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private userModel: Model<TransactionDocument>,
  ) {}

  create(dto: TransactionType) {
    return this.userModel.create({
      ...dto,
    });
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
