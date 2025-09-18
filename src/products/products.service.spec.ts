import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ContentfulRepository } from './repositories/contentful.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProduct = {
    id: '1',
    sku: 'sku',
    brand: 'Samsung',
    category: 'Headphones',
    color: 'Blue',
    createdAt: new Date(),
    currency: 'USD',
    deleted: false,
    model: 'HD 450BT',
    name: 'Samsung HD 450BT',
    price: 1095.98,
    stock: 56,
    updatedAt: new Date(),
  };

  const mockProductModel = {
    new: jest.fn().mockResolvedValue(mockProduct),
    constructor: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn().mockResolvedValue([mockProduct]),
    findById: jest.fn().mockResolvedValue(mockProduct),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockProduct),
    countDocuments: jest.fn().mockResolvedValue(1),
  };

  const mockContentfulRepository = {
    retrieveProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
        { provide: ContentfulRepository, useValue: mockContentfulRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
