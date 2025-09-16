import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import '../init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173', 'http://frontend:5173'],
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
      credentials: true,
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
