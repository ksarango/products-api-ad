import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';

import { AppConfig } from './config/config.interface';
import { ConfigProviderModule } from './config/config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigProviderModule,
    MongooseModule.forRootAsync({
      imports: [ConfigProviderModule],
      inject: ['AppConfig'],
      useFactory: (config: AppConfig) => ({
        uri: config.db.mongo.connectionUrl,
      }),
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    ProductsModule,
    ReportsModule,
    AuthModule,
  ],
})
export class AppModule {}
