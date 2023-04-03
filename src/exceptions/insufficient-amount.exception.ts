import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientAmountException extends HttpException {
  constructor() {
    super(
      'Insufficient balance in the selected account.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
