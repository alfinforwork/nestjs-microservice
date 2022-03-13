import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './core/exceptions/BadRequest.exception';
import { HttpExceptionFilter } from './core/exceptions/HttpException.exception';
import { InternalServerErrorExceptionFilter } from './core/exceptions/internalserver.exception';
import { NotFoundExceptionFilter } from './core/exceptions/notfound.exception';
import { UnauthorizedExceptionFilter } from './core/exceptions/unauthorized.exception';
import { ValidationPipe } from './core/pipes/class-validator.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.useGlobalFilters(new InternalServerErrorExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
