import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private repository: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.findAll({ attributes: { exclude: ['password'] } });
  }

  findOne(data): Promise<User> {
    return this.repository.findOne({
      attributes: { exclude: ['password'] },
      where: {
        ...data,
      },
    });
  }

  findOneWithPassword(user_id): Promise<User> {
    return this.repository.findOne({
      where: {
        user_id,
      },
    });
  }
}
