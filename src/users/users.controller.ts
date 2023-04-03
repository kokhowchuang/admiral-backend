import { UserType } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { UserDTO } from './dto/users.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: UserType): Promise<UserDTO> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    const createUserDTO = { ...body, password: hashedPassword };
    const user: User = await this.usersService.create(createUserDTO);

    return UserDTO.fromModel(user);
  }
}
