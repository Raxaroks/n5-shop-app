import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, configOptions } from './config';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { SeedModule } from './seed/seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: (AppConfig().environment === 'dev') 
      ? join(__dirname, '..', 'public') 
      : join(__dirname, '.', 'public')
    }),
    ProductModule,
    SharedModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
