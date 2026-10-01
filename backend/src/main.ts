import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Frontend (Next.js) genelde 3000 portunda çalışır, backend'i 3001'e alalım.
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
