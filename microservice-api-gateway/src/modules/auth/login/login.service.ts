import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { rjxHandler } from 'src/helpers/main.helper';

@Injectable()
export class LoginService {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}
  async onApplicationBootstrap() {
    try {
      await this.userClient.connect();
    } catch (error) {
      console.log(error);
    }
  }

  manual(data) {
    const pattern = {
      role: 'user',
      cmd: 'login/manual',
    };
    const payload = data;
    return rjxHandler(this.userClient, pattern, payload);
  }
}
