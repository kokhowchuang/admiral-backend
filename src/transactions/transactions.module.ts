import { Account, AccountSchema } from './../accounts/entities/account.entity';
import { AccountsService } from './../accounts/accounts.service';
import { User, UserSchema } from './../users/entities/users.entity';
import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema },
      { name: Account.name, schema: AccountSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, UsersService, AccountsService],
})
export class TransactionsModule {}
