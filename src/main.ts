import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Configurar CORS
  app.enableCors({
    origin: process.env.FRONT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  //Activar pipes
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
  console.log(`Server running on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
