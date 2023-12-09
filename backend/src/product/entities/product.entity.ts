import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  img?: string;
}

@Schema({
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Product extends Document {
  id: string;

  @Prop({ index: true, required: true, unique: true })
  name: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  img?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
