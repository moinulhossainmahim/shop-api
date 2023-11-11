import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  entities: ['dist/entity/*.js'],
  database: config.get('DB_NAME'),
  host: config.get('DB_HOST'),
  password: config.get('DB_PASSWORD'),
  port: config.get('DB_PORT'),
  username: config.get('DB_USERNAME'),
  // url: 'mysql://root:f6GG65hae4Ehad1H5A44ChGE1B3cFbHb@roundhouse.proxy.rlwy.net:46860/railway',
  migrations: ['dist/migration/*.js'],
  type: 'mysql',
  synchronize: false,
  migrationsRun: Boolean(config.get('MIGRATION_RUN')),
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
