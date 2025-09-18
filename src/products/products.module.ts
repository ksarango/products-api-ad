import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { ContentfulRepository } from './repositories/contentful.repository';
import { ConfigProviderModule } from 'src/config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ConfigProviderModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ContentfulRepository],
  exports: [ProductsService], // Product service is public
})
export class ProductsModule {}
