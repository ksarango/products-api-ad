import { NestFactory } from '@nestjs/core';
import { ProductsService } from '../products.service';
import { AppModule } from 'src/app.module';

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productService = app.get(ProductsService);

  await productService.sync();

  await app.close();
};

void (async () => {
  await bootstrap();
})();
