import { User, UserDocument } from './entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './interfaces/users.interface';

export type UserDTO = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByUsername(username: string): Promise<UserDTO | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(dto: UserType): Promise<User> {
    return this.userModel.create({
      ...dto,
    });
  }

  async updateAmount(accountNumber: string, amount: number): Promise<void> {
    return this.userModel.findOneAndUpdate(
      { accountNumber },
      { $inc: { balance: amount } },
      {
        new: true,
      },
    );
  }
}
