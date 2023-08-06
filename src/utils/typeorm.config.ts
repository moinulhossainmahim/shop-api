import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

export const TypeOrmConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    if (configService.get('NODE_ENV') === 'test') {
      // define typeorm config to use in unit tests
      return {};
    }

    return {
      ...dataSourceOptions,
    } as TypeOrmModuleOptions;
  },
});
