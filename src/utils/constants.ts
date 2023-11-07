import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const UNSUPPORTED_FILE = 'unsupportedfile';

export const uploadFileUrl =
  config.get('NODE_ENV') === 'production'
    ? 'mysql://root:f6GG65hae4Ehad1H5A44ChGE1B3cFbHb@roundhouse.proxy.rlwy.net:46860/railway'
    : 'http://localhost:3000';
