import { User, UserDocument } from './entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './interfaces/users.interface';

export type UserDTO = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserDTO | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(dto: UserType): Promise<User> {
    return this.userModel.create({
      ...dto,
    });
  }

  async updateOne(id: string, dto: UserType): Promise<User | null> {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...dto,
        },
      },
      {
        new: true,
      },
    );
  }
}
