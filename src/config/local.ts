import { EnvEnum } from './config.enum';
import { AppConfig } from './config.interface';

export default (): AppConfig => ({
  port: 3000,
  nodeEnv: EnvEnum.LOCAL,
  db: {
    mongo: {
      connectionUrl: process.env.MONGODB_CONNECTION_URL ?? '',
    },
  },
  externalEndpoints: {
    contentful: {
      host: 'https://cdn.contentful.com',
      apiKey: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
      spaceId: '9xs1613l9f7v',
      env: 'master',
      contentType: 'product',
    },
  },
  crons: {
    syncProducts:  '0 0 * * * *', // every hour
  },
});
