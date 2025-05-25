// main.ts (in your NestJS app)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  app.setGlobalPrefix(process.env.API_PREFIX || 'api');

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
