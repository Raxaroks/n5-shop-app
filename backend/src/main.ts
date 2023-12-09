import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfig, globalOptions } from './config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes( new ValidationPipe(globalOptions) );
  app.enableCors();

  const port = AppConfig().port;
  await app.listen(port);
  logger.log(`Server running and listening on port: ${port}`);
}
bootstrap();
