import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  database: config.get('DB_NAME'),
  entities: ['dist/entity/*.js'],
  host: config.get('DB_HOST'),
  password: config.get('DB_PASSWORD'),
  port: config.get('DB_PORT'),
  type: 'mysql',
  username: config.get('DB_USERNAME'),
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
