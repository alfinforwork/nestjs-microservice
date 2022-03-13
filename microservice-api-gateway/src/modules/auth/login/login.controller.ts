import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { handleAsync, JsonSuccess } from 'src/helpers/main.helper';
import { LoginManualDTO } from './login.dto';
import { LoginService } from './login.service';

@Controller('auth/login')
export class LoginController {
  constructor(
    private readonly appService: LoginService,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.userClient.connect();
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  getHello() {
    return {
      message: 'Hello World!',
    };
  }

  @Post('manual')
  async manual(@Body() data: LoginManualDTO) {
    const response = await handleAsync(this.appService.manual(data));
    if (response.error) {
      throw new UnauthorizedException(response.error);
    }
    return JsonSuccess(true, 'Berhasil Login', response.data, {
      token: this.jwtService.sign({
        sub: response.data?.user_id,
        role: 'app',
      }),
    });
  }

  // @Get('sum')
  // async sum() {
  //   const pattern = 'sum';
  //   const payload = [1, 2, 3];
  //   return this.userClient.send<number>(pattern, payload).subscribe(
  //     (success) => {
  //       console.log(success);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //   );
  // }
  // @Get('publish')
  // async publish() {
  //   try {
  //     await this.userClient.connect();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   this.userClient.emit<number>('user_created', {
  //     date: new Date(),
  //     id_user: 1,
  //     id_produk: 2,
  //   });
  // }
}
