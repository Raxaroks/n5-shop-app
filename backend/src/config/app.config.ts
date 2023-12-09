import { ConfigModuleOptions } from '@nestjs/config';
import { JoiValidationSchema } from './';
import { ValidationPipeOptions } from '@nestjs/common';

export const AppConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT,
  mongoDb: {
    products: {
      hostUrl: process.env.MONGODB_URL,
      name: process.env.MONGODB_PRODUCTS_COLLECTION
    }
  }
});

export const configOptions: ConfigModuleOptions = {
  load: [AppConfig],
  validationSchema: JoiValidationSchema
};

export const globalOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: { enableImplicitConversion: true }
};
