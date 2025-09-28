import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configurar CORS
  app.enableCors({
    origin: process.env.FRONT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  //Activar pipes
  //Activar Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      //Pipes: transformar datos y valida
      whitelist: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((err) =>
          Object.values(err.constraints ?? {}).join(', '),
        );
        return new BadRequestException(messages.join('. '));
      },
    }),
  );
   await app.listen(process.env.PORT ?? 3001);
  console.log(`Server running on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
