import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  FilterProductSchema,
  FilterProductDto,
  ListProductsResponseDto,
  ProductResponseDto,
} from './schemas/zod.schema';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiQuery({ type: FilterProductDto })
  @ApiResponse({ status: HttpStatus.OK, type: ListProductsResponseDto })
  findAll(@Query() query: any) {
    const filters = FilterProductSchema.safeParse(query);

    if (!filters.success)
      throw new BadRequestException(filters.error.flatten().fieldErrors);

    return this.productService.findAll(filters.data);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Product deleted success.',
  })
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);

    return '';
  }
}
