import { Inject, Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import type { AppConfig } from 'src/config/config.interface';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject('AppConfig') private readonly config: AppConfig,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly productService: ProductsService,
  ) {
    this.syncProductsCron();
  }

  private syncProductsCron() {
    const cronExpression = this.config.crons.syncProducts;

    const job = new CronJob(cronExpression, async () => {
      this.logger.log('Running cron job Sync Products');
      await this.productService.sync();
    });

    this.schedulerRegistry.addCronJob('syncProducts', job);
    job.start();
  }
}
