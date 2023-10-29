import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  entities: ['dist/entity/*.js'],
  migrations: ['dist/migration/*.js'],
  type: 'mysql',
  synchronize: false,
  url: 'mysql://root:f6GG65hae4Ehad1H5A44ChGE1B3cFbHb@roundhouse.proxy.rlwy.net:46860/railway',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
