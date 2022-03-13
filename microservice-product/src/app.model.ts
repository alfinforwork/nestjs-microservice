import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Product {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: string;

  @Prop()
  product_name: string;

  @Prop()
  product_category: string;

  @Prop()
  product_price: number;

  @Prop()
  product_qty: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
