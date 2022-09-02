import { BSC, Config, Goerli, Mumbai, Polygon } from '@usedapp/core';
import { BLOCKCHAIN_NAME } from 'rubic-sdk';

export const LIFI_SETTINGS = {
  from: Goerli.chainId,
  to: Mumbai.chainId,
  tokenFrom: '0x0000000000000000000000000000000000000000', //ETH,
  tokenTo: '0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa', // WETH,
};

export const RUBIC_SETTINGS = {
  from: {
    chainId: BSC.chainId,
    name: BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
  },
  to: {
    chainId: Polygon.chainId,
    name: BLOCKCHAIN_NAME.POLYGON,
  },
  tokenFrom: '0x0000000000000000000000000000000000000000', //ETH,
  tokenTo: '0x0000000000000000000000000000000000000000', // ETH,
};

export const dappConfig: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [LIFI_SETTINGS.from]:
      'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    [LIFI_SETTINGS.to]: 'https://polygon-testnet.public.blastapi.io',
    [BSC.chainId]: 'https://bsc-dataseed.binance.org/',
    [Polygon.chainId]: 'https://polygon-rpc.com',
  },
};
