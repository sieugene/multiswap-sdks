import { BSCTestnet, Config, Rinkeby } from '@usedapp/core';

export const dappConfig: Config = {
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [BSCTestnet.chainId]: 'https://data-seed-prebsc-2-s2.binance.org:8545',
    [Rinkeby.chainId]: 'https://rpc.ankr.com/eth_rinkeby',
  },
};
