import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configBootstrap from './config.bootstrap';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configBootstrap],
    }),
  ],
  providers: [
    {
      provide: 'AppConfig',
      useFactory: configBootstrap,
    },
  ],
  exports: ['AppConfig'],
})
export class ConfigProviderModule {}
