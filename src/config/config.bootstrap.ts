import localConfig from './local';
import prodConfig from './production';
import stagingConfig from './staging';
import { AppConfig } from './config.interface';
import { EnvEnum } from './config.enum';

export default (): AppConfig => {
  const nodeEnv = process.env.NODE_ENV;

  switch (nodeEnv) {
    case EnvEnum.PRODUCTION:
      return prodConfig();
    case EnvEnum.STAGING:
      return stagingConfig();
    default:
      return localConfig();
  }
};
