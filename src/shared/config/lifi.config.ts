import LIFI, { ConfigUpdate } from '@lifi/sdk';
import { dappConfig, LIFI_SETTINGS } from './dapp.config';

const config: ConfigUpdate = {
  apiUrl: 'https://staging.li.quest/v1/',
  rpcs: {
    [LIFI_SETTINGS.from]: [
      dappConfig.readOnlyUrls![LIFI_SETTINGS.from] as string,
    ],
    [LIFI_SETTINGS.to]: [dappConfig.readOnlyUrls![LIFI_SETTINGS.to] as string],
  },
};
export const LIFI_CONFIG = new LIFI(config);
