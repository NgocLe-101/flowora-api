import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );
  const config = app.get(ConfigService);
  const frontendUrl = config.get<string>('FRONTEND_URL') || '*';
  app.enableCors({
    origin: frontendUrl,
  });
  const port = config.get<string>('PORT') ?? 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
