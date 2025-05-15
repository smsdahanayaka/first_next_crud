// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  // app.enableCors({
  //   origin: 'http://localhost:3001', // frontend URL
  //   credentials: true,               // if you're using cookies or auth headers
  // });

  // ✅ Enable CORS for all
  app.enableCors({
    origin: true, // reflects the request origin
    credentials: true, // allows cookies or authorization headers
  });

  // Optional: enable validation
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application listening on http://localhost:${port}`);
}
bootstrap();
