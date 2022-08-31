import { Config, Goerli, Mumbai } from '@usedapp/core';

export const dappConfig: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]:
      'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    [Mumbai.chainId]: 'https://polygon-testnet.public.blastapi.io',
  },
};
