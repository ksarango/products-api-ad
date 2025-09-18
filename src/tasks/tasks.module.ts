import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { TasksService } from './tasks.service';
import { ConfigProviderModule } from 'src/config/config.module';

@Module({
  imports: [ProductsModule, ConfigProviderModule],
  providers: [TasksService],
})
export class TasksModule {}
