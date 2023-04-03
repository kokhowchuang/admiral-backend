import { AccountType } from './interfaces/account.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';

import * as randomstring from 'randomstring';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() accountType: AccountType) {
    accountType.accountNumber = randomstring
      .generate({
        length: 16,
        charset: 'numeric',
      })
      .toString();
    return this.accountsService.create(accountType);
  }
}
