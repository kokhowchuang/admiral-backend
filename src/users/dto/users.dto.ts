import { ObjectId } from 'mongoose';
import { User } from '../entities/users.entity';

export class UserDTO {
  id: ObjectId;

  name: string;

  username: string;

  password: string;

  static fromModel(obj: User): UserDTO {
    const dto = new UserDTO();

    dto.id = obj.id;
    dto.name = obj.name;
    dto.username = obj.username;

    return dto;
  }
}
