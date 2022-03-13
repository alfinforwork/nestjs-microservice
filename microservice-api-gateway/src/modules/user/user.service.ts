import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { rjxHandler } from 'src/helpers/main.helper';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}
  async onApplicationBootstrap() {
    try {
      await this.userClient.connect();
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    const pattern = {
      role: 'user',
      cmd: 'list',
    };
    return rjxHandler(this.userClient, pattern, {});
  }

  findOne(user_id) {
    const pattern = {
      role: 'user',
      cmd: 'detail',
    };
    return rjxHandler(this.userClient, pattern, { user_id });
  }
}
