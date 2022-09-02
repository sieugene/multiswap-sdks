import { JsonRpcSigner } from '@ethersproject/providers';
import { BSC, ChainId, Polygon } from '@usedapp/core';
import SDK, { BLOCKCHAIN_NAME, Configuration } from 'rubic-sdk';
import { dappConfig, RUBIC_SETTINGS } from './dapp.config';

const defaultConfig: Configuration = {
  rpcProviders: {
    [RUBIC_SETTINGS.from.name]: {
      mainRpc: dappConfig.readOnlyUrls![RUBIC_SETTINGS.from.chainId] as string, // BSC RPC
    },
    [RUBIC_SETTINGS.to.name]: {
      mainRpc: dappConfig.readOnlyUrls![RUBIC_SETTINGS.to.chainId] as string, // Polygon RPC
    },
  },
};

class RubicSdk {
  public sdk: SDK | null = null;
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
    this.sdk = sdk;
  }

  public async swap(amount: string) {
    this.validate();
    const fromToken = {
      blockchain: RUBIC_SETTINGS.from.name,
      address: RUBIC_SETTINGS.tokenFrom,
    };
    const toToken = {
      blockchain: RUBIC_SETTINGS.to.name,
      address: RUBIC_SETTINGS.tokenTo,
    };
    // calculated trades
    const trades = await this.sdk!.crossChain.calculateTrade(
      fromToken,
      amount,
      toToken
    );
    const bestTrade = trades[0];
  }

  private validate() {
    if (!this.sdk) {
      throw new Error('Sdk not inited!');
    }
  }
}
