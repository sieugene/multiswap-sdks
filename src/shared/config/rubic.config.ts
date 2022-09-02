import { JsonRpcSigner } from '@ethersproject/providers';
import { BSC, ChainId, Polygon } from '@usedapp/core';
import SDK, { BLOCKCHAIN_NAME, Configuration } from 'rubic-sdk';
import { dappConfig } from './dapp.config';

const defaultConfig: Configuration = {
  rpcProviders: {
    [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
      mainRpc: dappConfig.readOnlyUrls![BSC.chainId] as string, // BSC RPC
    },
    [BLOCKCHAIN_NAME.POLYGON]: {
      mainRpc: dappConfig.readOnlyUrls![Polygon.chainId] as string, // Polygon RPC
    },
  },
};

class RubicSdk {
  public async init(
    provider: JsonRpcSigner,
    account: string,
    chainId: ChainId
  ) {
    const sdk = await SDK.createSDK(defaultConfig);
    await sdk.updateConfiguration({
      ...defaultConfig,
      walletProvider: {
        // @ts-ignore
        core: provider,
        address: account,
        chainId,
      },
    });
  }
}
