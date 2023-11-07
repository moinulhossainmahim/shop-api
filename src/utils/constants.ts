import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const UNSUPPORTED_FILE = 'unsupportedfile';

export const uploadFileUrl =
  config.get('NODE_ENV') === 'production'
    ? 'https://shop-api-production-ce05.up.railway.app'
    : 'http://localhost:3000';
