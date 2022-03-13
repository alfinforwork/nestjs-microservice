import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { handleAsync } from './helpers/main.helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ role: 'user', cmd: 'list' })
  listProduct() {
    return this.appService.findAll();
  }

  @MessagePattern({ role: 'user', cmd: 'detail' })
  async detailProduct(@Payload() data, @Ctx() context: RmqContext) {
    const product = await handleAsync(this.appService.findOne(data._id));
    if (product.error) {
      throw new RpcException(product.error);
    }
    if (!product.data) {
      throw new RpcException('Product not found');
    }

    return product.data;
  }

  @MessagePattern({ role: 'user', cmd: 'create' })
  async createProduct(@Payload() data, @Ctx() context: RmqContext) {
    const product = await handleAsync(this.appService.create(data));
    if (product.error) throw new RpcException(product.error);

    return this.appService.findAll();
  }

  @MessagePattern({ role: 'user', cmd: 'delete' })
  async deleteProduct(@Payload() data, @Ctx() context: RmqContext) {
    const product = await handleAsync(this.appService.findOne(data._id));
    if (product.error) {
      throw new RpcException(product.error);
    }
    if (!product.data) {
      throw new RpcException('Product not found');
    }

    return this.appService.delete({ _id: product.data._id });
  }
}
