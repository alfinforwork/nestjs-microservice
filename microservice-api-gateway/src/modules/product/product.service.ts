import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { rjxHandler } from 'src/helpers/main.helper';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private productClient: ClientProxy) {}
  async onApplicationBootstrap() {
    try {
      await this.productClient.connect();
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    const pattern = {
      role: 'user',
      cmd: 'list',
    };
    return rjxHandler(this.productClient, pattern, {});
  }

  findOne(_id) {
    const pattern = {
      role: 'user',
      cmd: 'detail',
    };
    return rjxHandler(this.productClient, pattern, { _id });
  }

  create(data) {
    const pattern = {
      role: 'user',
      cmd: 'create',
    };
    return rjxHandler(this.productClient, pattern, data);
  }

  delete(_id) {
    const pattern = {
      role: 'user',
      cmd: 'delete',
    };
    return rjxHandler(this.productClient, pattern, { _id: _id });
  }
}
