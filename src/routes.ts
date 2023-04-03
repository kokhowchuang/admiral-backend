import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { Routes } from 'nest-router';
import { UsersModule } from './users/users.module';

export const routes: Routes = [
  {
    path: '/users',
    module: UsersModule,
    children: [],
  },
  {
    path: '/accounts',
    module: AccountsModule,
    children: [
      {
        path: ':accountNumber/transactions',
        module: TransactionsModule,
      },
    ],
  },
];
