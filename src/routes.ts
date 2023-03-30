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
    path: '/transactions',
    module: TransactionsModule,
  },
];
