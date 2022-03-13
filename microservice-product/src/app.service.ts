import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './app.model';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name)
    private model: SoftDeleteModel<ProductDocument>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.model.find().exec();
  }

  findOne(id): Promise<Product> {
    return this.model.findById(new mongoose.Types.ObjectId(id)).exec();
  }

  create(data) {
    return this.model.create({ ...data, _id: new mongoose.Types.ObjectId() });
  }

  delete(data) {
    return this.model.delete({ ...data }).exec();
  }
}
