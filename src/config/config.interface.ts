import { EnvEnum } from './config.enum';

interface Db {
  connectionUrl: string;
}

interface ExternalApi {
  host: string;
  apiKey: string;
  spaceId?: string;
  env?: string;
  contentType?: string;
}

export interface AppConfig {
  nodeEnv: EnvEnum;
  port: number;
  db: {
    mongo: Db;
  };
  externalEndpoints: {
    contentful: ExternalApi;
  };
  crons: {
    syncProducts: string;
  };
}
