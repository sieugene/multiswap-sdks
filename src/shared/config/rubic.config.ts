import { ChainId } from '@usedapp/core';
import SDK, { Configuration } from 'rubic-sdk';
import { WrappedCrossChainTrade } from 'rubic-sdk/lib/features/cross-chain/providers/common/models/wrapped-cross-chain-trade';
import Web3 from 'web3';
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

export class RubicSdk {
  public sdk: SDK | null = null;
  public async init(provider: Web3, account: string, chainId: ChainId) {
    const sdk = await SDK.createSDK(defaultConfig);
    await sdk.updateConfiguration({
      ...defaultConfig,
      walletProvider: {
        core: provider,
        address: account,
        chainId,
      },
    });
    this.sdk = sdk;
  }

  public async findTrade(amount: string) {
    try {
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
      return trades[0];
    } catch (error) {
      console.error(error);
    }
  }

  public async swap(trade: WrappedCrossChainTrade | undefined) {
    try {
      const transactionHash = await trade?.trade?.swap();
    } catch (error) {
      console.log(error);
    }
  }

  private validate() {
    if (!this.sdk) {
      throw new Error('Sdk not inited!');
    }
  }
}
