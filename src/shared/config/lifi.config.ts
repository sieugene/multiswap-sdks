import LIFI, { ConfigUpdate } from '@lifi/sdk';
import { dappConfig, FROM_CHAINID, TO_CHAINID } from './dapp.config';

const config: ConfigUpdate = {
  apiUrl: 'https://staging.li.quest/v1/',
  rpcs: {
    [FROM_CHAINID]: [dappConfig.readOnlyUrls![FROM_CHAINID] as string],
    [TO_CHAINID]: [dappConfig.readOnlyUrls![TO_CHAINID] as string],
  },
};
export const LIFI_CONFIG = new LIFI(config);
