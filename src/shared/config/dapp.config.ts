import { BSC, Config, Goerli, Mumbai, Polygon } from '@usedapp/core';

export const FROM_CHAINID = Goerli.chainId;
export const TO_CHAINID = Mumbai.chainId;

export const dappConfig: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [FROM_CHAINID]:
      'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    [TO_CHAINID]: 'https://polygon-testnet.public.blastapi.io',
    [BSC.chainId]: 'https://bsc-dataseed.binance.org/',
    [Polygon.chainId]: 'https://polygon-rpc.com',
  },
};
