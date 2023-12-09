import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;

          // interceptors
          schema.pre('save', function () {
            this.name = this.name.toLowerCase();
          });          
          return schema;
        },
      }
    ])
  ],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
