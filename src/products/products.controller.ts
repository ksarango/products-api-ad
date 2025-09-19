import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  FilterProductSchema,
  FilterProductDto,
  ListProductsResponseDto,
} from './schemas/zod.schema';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiQuery({ type: FilterProductDto })
  @ApiResponse({ type: ListProductsResponseDto })
  findAll(@Query() query: any) {
    const filters = FilterProductSchema.safeParse(query);

    if (!filters.success)
      throw new BadRequestException(filters.error.flatten().fieldErrors);

    return this.productService.findAll(filters.data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);

    return '';
  }
}
