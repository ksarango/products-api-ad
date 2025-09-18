import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { ProductsService } from 'src/products/products.service';
import { SchedulerRegistry } from '@nestjs/schedule';

jest.mock('cron', () => {
  return {
    CronJob: jest.fn().mockImplementation(() => ({
      start: jest.fn(),
      stop: jest.fn(),
    })),
  };
});

describe('TasksService', () => {
  let service: TasksService;

  const mockAppConfig = {
    crons: {
      syncProducts: '*/10 * * * * *',
    },
  };

  const mockSchedulerRegistry = {
    addCronJob: jest.fn(),
  };

  const mockProductService = {
    sync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: 'AppConfig', useValue: mockAppConfig },
        { provide: SchedulerRegistry, useValue: mockSchedulerRegistry },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
