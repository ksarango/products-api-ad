import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { ProductsService } from 'src/products/products.service';

describe('ReportsService', () => {
  let service: ReportsService;

  const mockProductService = {
    getCounter: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
