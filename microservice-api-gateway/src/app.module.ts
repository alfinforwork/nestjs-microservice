import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/auth/login/login.module';
import { RegisterModule } from './modules/auth/register/register.module';
import { ForgotPasswordModule } from './modules/auth/forgot-password/forgot-password.module';
import { UserModule } from './modules/user/user.module';
import { JwtStrategy } from './core/strategies/jwt.strategy';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    LoginModule,
    RegisterModule,
    ForgotPasswordModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
