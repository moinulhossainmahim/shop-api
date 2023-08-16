import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  database: config.get('DB_NAME') || 'shop',
  entities: ['dist/entity/*.js'],
  host: config.get('DB_HOST') || 'localhost',
  migrations: ['dist/migration/*.js'],
  password: process.env.DB_PASSWORD || 'Mahimmysql123',
  port: config.get('DB_PORT') || 3306,
  type: 'mysql',
  synchronize: false,
  username: config.get('DB_USERNAME') || 'root',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
