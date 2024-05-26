import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv';

const SERVER_HOST = 'localhost';
const SERVER_PORT = 3000;
const SERVER_SITE = `http://${SERVER_HOST}:${SERVER_PORT}`;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true})); // чтобы валидация работала через class-validation до обработчиков

  await app.listen(SERVER_PORT, () => console.log(`Server run ${SERVER_SITE}`));
}
bootstrap();
