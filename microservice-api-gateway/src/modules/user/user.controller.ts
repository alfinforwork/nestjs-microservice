import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from 'src/core/decorators/user.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { handleAsync, JsonSuccess } from 'src/helpers/main.helper';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@ReqUser() user) {
    const { sub } = user;
    const data = await handleAsync(this.appService.findOne(sub));
    if (!data.data) {
      throw new BadRequestException("User doesn't exist");
    } else if (data.error) {
      throw new BadRequestException(data.error);
    }
    return JsonSuccess(true, '', { ...data.data, password: undefined });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listAllUser() {
    const data = await handleAsync(this.appService.findAll());
    if (data.error) {
      throw new BadRequestException(data.error);
    }
    return JsonSuccess(true, '', data.data);
  }

  @Get(':user_id')
  @UseGuards(JwtAuthGuard)
  async detailUser(@Param() param) {
    const { user_id } = param;
    const data = await handleAsync(this.appService.findOne(user_id));
    if (!data.data) {
      throw new BadRequestException("User doesn't exist");
    } else if (data.error) {
      throw new BadRequestException(data.error);
    }
    return JsonSuccess(true, '', data.data);
  }
}
