import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Param() param: { accountNumber: string },
  ) {
    if (createTransactionDto.type === 'debit') {
      const senderTransactionDTO = {
        ...createTransactionDto,
        accountNumber: param.accountNumber,
        type: 'debit',
      };
      await this.transactionsService.sendMoney(
        createTransactionDto,
        senderTransactionDTO,
      );
    } else if (createTransactionDto.type === 'credit') {
      await this.transactionsService.topUpMoney(createTransactionDto);
    }
  }
}
