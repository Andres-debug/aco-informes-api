import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Dominios permitidos (puedes usar una lista o '*')
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS', // Métodos HTTP permitidos
    credentials: true, // Permitir cookies (si aplica)
  });
  await app.listen(3000);
}
bootstrap();
//Prueba