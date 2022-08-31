import { BSCTestnet, Config, Rinkeby, Ropsten } from '@usedapp/core';

export const dappConfig: Config = {
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [Ropsten.chainId]: 'https://rpc.ankr.com/eth_ropsten',
    [Rinkeby.chainId]: 'https://rpc.ankr.com/eth_rinkeby',
  },
};
