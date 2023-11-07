import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  database: config.get('DB_NAME'),
  entities: ['dist/entity/*.js'],
  host: config.get('DB_HOST'),
  password: config.get('DB_PASSWORD'),
  port: config.get('DB_PORT'),
  migrations: ['dist/migration/*.js'],
  type: 'mysql',
  synchronize: false,
  username: config.get('DB_USERNAME'),
  migrationsRun: config.get('MIGRATION_RUN'),
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
