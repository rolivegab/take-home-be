import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreateInput } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) { }

  findOne(username: string) {
    return this.userModel.findOne({
      where: {
        username
      }
    })
  }

  createOne(userCreateInput: UserCreateInput) {
    return this.userModel.create(userCreateInput)
  }

  findAll() {
    return this.userModel.findAll({
      limit: 50
    })
  }
}