import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './utils/typeorm.config';
import { Products } from './entity/Products';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Products]),
    TypeOrmConfig,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
