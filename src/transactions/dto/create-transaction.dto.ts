export class CreateTransactionDto {
  accountNumber: string;
  type: string;
  amount: number;
  description?: string;
}
