import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  product_name: string;

  @ApiProperty()
  @IsNotEmpty()
  product_category: string;

  @ApiProperty()
  @IsNotEmpty()
  product_price: string;

  @ApiProperty()
  @IsNotEmpty()
  product_qty: string;
}
