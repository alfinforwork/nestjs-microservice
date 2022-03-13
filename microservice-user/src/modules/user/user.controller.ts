import { Controller } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { Compare, handleAsync } from 'src/helpers/main.helper';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'list' })
  listUser() {
    return this.appService.findAll();
  }

  @MessagePattern({ role: 'user', cmd: 'detail' })
  detailUser(@Payload() data, @Ctx() context: RmqContext) {
    const { user_id } = data;
    return this.appService.findOne({ user_id });
  }

  @MessagePattern({ role: 'user', cmd: 'detail_with_password' })
  detailUserWithPassword(@Payload() data, @Ctx() context: RmqContext) {
    const { user_id } = data;
    return this.appService.findOneWithPassword(user_id);
  }

  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    // business logic
    console.log({
      hello: 'world',
      data,
    });
  }

  @MessagePattern({ role: 'user', cmd: 'login/manual' })
  async findUser(@Payload() data, @Ctx() context: RmqContext) {
    const user = await this.appService.findOne({ email: data.email });

    if (!user) {
      throw new RpcException('User not found');
    }
    const isValid = await handleAsync(Compare(data.password, user.password));
    if (isValid.error || !isValid.data) {
      throw new RpcException('Wrong password');
    }
    user.setDataValue('password', undefined);
    return user;
  }
}
