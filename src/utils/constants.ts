import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const UNSUPPORTED_FILE = 'unsupportedfile';

export const uploadFileUrl =
  config.get('NODE_ENV') === 'production'
    ? 'https://shop-api-5sp7.onrender.com/'
    : 'http://localhost:3000';
