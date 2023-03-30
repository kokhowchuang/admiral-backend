import { UserType } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './dto/users.dto';
import { User } from './entities/users.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: UserType): Promise<UserDTO> {
    const user: User = await this.usersService.create(body);

    return UserDTO.fromModel(user);
  }
}
