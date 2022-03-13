import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from 'src/core/decorators/user.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { handleAsync, JsonSuccess } from 'src/helpers/main.helper';
import { CreateProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async listAllProduct() {
    const data = await handleAsync(this.service.findAll());
    if (data.error) {
      throw new BadRequestException(data.error);
    }
    return JsonSuccess(true, '', data.data);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() body: CreateProductDTO) {
    const payload = {
      product_name: body.product_name,
      product_category: body.product_category,
      product_price: body.product_price,
      product_qty: body.product_qty,
    };
    const data = await handleAsync(this.service.create(payload));
    if (data.error) {
      throw new BadRequestException(data.error);
    }
    return JsonSuccess(true, '', data.data);
  }

  @Get(':_id')
  @UseGuards(JwtAuthGuard)
  async detailProduct(@Param() param) {
    const { _id } = param;
    const data = await handleAsync(this.service.findOne(_id));
    if (data.error) {
      throw new BadRequestException(data.error);
    }
    return JsonSuccess(true, '', data.data);
  }

  @Delete(':_id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param() param) {
    const { _id } = param;
    const data = await handleAsync(this.service.delete(_id));
    if (data.error) {
      throw new BadRequestException(data.error);
    }
    return JsonSuccess(true, 'Success delete data');
  }
}
