import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  // Create a logger instance
  const logger: Logger = new Logger('Airis API bootstrap');

  // Create the Nest application instance
  const app: INestApplication = await NestFactory.create(AppModule);

  // Load ConfigService
  const configService: ConfigService = app.get(ConfigService);

  // Set the port
  const port: number = configService.get<number>('APP_PORT');

  // Enable CORS
  app.enableCors();

  // Set global prefix
  app.setGlobalPrefix('api');

  // Set validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port, () => {
    logger.log(`Listening at http://localhost:${port}`);
  });
}
bootstrap();
