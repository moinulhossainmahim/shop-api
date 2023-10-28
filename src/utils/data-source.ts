import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  entities: ['dist/entity/*.js'],
  migrations: ['dist/migration/*.js'],
  type: 'mysql',
  url: process.env.MYSQL_URL,
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
