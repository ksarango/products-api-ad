import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { PercentageDeletedResponse } from './schemas/zod.schema';

@Injectable()
export class ReportsService {
  constructor(private readonly productService: ProductsService) {}

  async getPerecentageDeleted(): Promise<PercentageDeletedResponse> {
    const total = await this.productService.getCounter();
    const deleted = await this.productService.getCounter(true);
    const res = (deleted * 100) / total;

    return {
      total,
      deleted,
      percentage: +res.toFixed(2),
    };
  }
}
