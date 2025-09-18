/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, versionKey: false, transform },
})
export class Product {
  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop()
  category: string;

  @Prop()
  color: string;

  @Prop()
  price: number;

  @Prop()
  currency: string;

  @Prop()
  stock: number;

  @Prop({ default: false })
  deleted: boolean;
}

function transform(doc: any, ret: any) {
  ret.id = ret._id;
  delete ret._id;
  return ret;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
