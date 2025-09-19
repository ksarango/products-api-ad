/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import {
  FilterProductDto,
  ListProductsResponse,
  ProductData,
} from './schemas/zod.schema';
import { ContentfulRepository } from './repositories/contentful.repository';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly contentulRepository: ContentfulRepository,
  ) {}

  private validateObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID format');
  }

  async sync(): Promise<void> {
    const productsResponse = await this.contentulRepository.retrieveProducts();
    this.logger.log('Start Sync Products');

    for (const item of productsResponse.items) {
      await this.createOrUpdate({
        ...item.fields,
        price: item.fields.price ?? 0,
      });
    }

    this.logger.log('End Sync Products');
  }

  async createOrUpdate(createProductDto: CreateProductDto): Promise<void> {
    const filter = { sku: createProductDto.sku };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    try {
      const product = await this.productModel.findOneAndUpdate(
        filter,
        createProductDto,
        options,
      );

      if (!product)
        throw new Error(`Product ${createProductDto.sku} not found or created`);
    } catch (error) {
      console.error('Error creating or updating Product', error);
    }
  }

  async findAll(filters: FilterProductDto): Promise<ListProductsResponse> {
    const { page = 1, limit = 5 } = filters;
    const query: Record<string, any> = { deleted: false };

    if (filters.sku) query.sku = filters.sku;
    if (filters.name) query.name = { $regex: filters.name, $options: 'i' };
    if (filters.brand) query.brand = filters.brand;
    if (filters.model) query.model = filters.model;
    if (filters.category) query.category = filters.category;
    if (filters.color) query.color = filters.color;
    if (filters.priceFrom) query.price = { $gte: filters.priceFrom }
    if (filters.priceTo) query.price = { $lte: filters.priceTo }
    if (filters.priceFrom && filters.priceTo) query.price = { $gte: filters.priceFrom, $lte: filters.priceTo }

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      this.productModel.find(query).skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(query),
    ]);

    const data: ProductData[] = products.map((product) => {
      return {
        ...product.toJSON(),
        id: product.id,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      };
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    this.validateObjectId(id);
    const product = await this.productModel.findById(id).exec();

    if (!product || product.deleted)
      throw new NotFoundException('Product not found');

    return product;
  }

  async remove(id: string) {
    this.validateObjectId(id);
    const deleteProduct = await this.productModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true },
    );

    if (!deleteProduct) throw new NotFoundException('Product not found');
  }

  async getCounter(deletedFlag?: boolean): Promise<number> {
    const filter = deletedFlag === undefined ? {} : { deleted: deletedFlag };

    return this.productModel.countDocuments(filter);
  }
}
