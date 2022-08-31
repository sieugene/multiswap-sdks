import LIFI, {
  ConfigUpdate,
  QuoteRequest,
  Route,
  RoutesRequest,
  ChainId,
} from '@lifi/sdk';
import { LiFiWidget, LiFiWidgetDrawer, WidgetConfig } from '@lifi/widget';
import { BSCTestnet, Rinkeby, useEthers, useTokenBalance } from '@usedapp/core';
import axios from 'axios';
import { ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useMemo, useState } from 'react';

export const WidgetPage = () => {
  const { library, account } = useEthers();
  const [amount, setAmount] = useState('0');
  const [tokens, setTokens] = useState({
    from: '0x110a13fc3efe6a245b50102d2d79b3e76125ae83', // USDT
    to: '0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02', // USDT
  });
  const fromBalance = useTokenBalance(tokens.from, account);
  const toBalance = useTokenBalance(tokens.to, account);

  const fromChain = ChainId.ROP;
  const toChain = ChainId.RIN;

  const make = async () => {
    const parsedAmount = parseEther(amount)?.toString();
    const signer = library?.getSigner(account);
    if (!signer || !account) return;
    const config: ConfigUpdate = {
      apiUrl: 'https://staging.li.quest/v1/',
    };
    const Lifi = new LIFI(config);
    const routesRequest: RoutesRequest = {
      fromChainId: fromChain, // Ropsten
      fromAmount: parsedAmount,
      fromTokenAddress: tokens.from, // USDT
      toChainId: toChain, // Rinkeby
      toTokenAddress: tokens.to, // USDT
    };
    const routesResponse = await Lifi.getRoutes(routesRequest);
    const routes = routesResponse.routes;
    debugger;
    const quote = await getQuote(
      fromChain,
      toChain,
      tokens.from,
      tokens.to,
      parsedAmount,
      account
    );
    debugger;

    const updateCallback = (updatedRoute: Route) => {
      debugger;
      console.log('Ping! Everytime a status update is made!');
    };

    const result = await Lifi.executeRoute(signer, routes[0], {
      updateCallback,
      switchChainHook,
    });
  };

  const widgetConfig: WidgetConfig = useMemo(
    () => ({
      integrator: 'Your dApp/company name',
      containerStyle: {
        border: `1px solid ${
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'rgb(66, 66, 66)'
            : 'rgb(234, 234, 234)'
        }`,
        borderRadius: '16px',
        display: 'flex',
      },
      fromChain,
      toChain,
      toToken: tokens.to,
      fromToken: tokens.from,
    }),
    []
  );

  return (
    <>
      <p>
        Balance from {`(${tokens.from})`} :{' '}
        {fromBalance && formatEther(fromBalance)}
      </p>
      <p>
        Balance to {`(${tokens.to})`} : {toBalance && formatEther(toBalance)}
      </p>
      <input
        placeholder="amount"
        value={amount}
        onChange={({ target }) => {
          setAmount(target.value);
        }}
      />
      <button onClick={make}>swap</button>
      <LiFiWidgetDrawer config={widgetConfig} />;
    </>
  );
};
// https://www.youtube.com/watch?v=JzfS1_N2juM
const switchChainHook = async (requiredChainId: number) => {
  // this is where MetaMask lives
  const ethereum = (window as any).ethereum;

  // check if MetaMask is available
  if (typeof ethereum === 'undefined') return;

  // use the MetaMask RPC API to switch chains automatically
  await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: requiredChainId }],
  });

  // build a new provider for the new chain
  const newProvider = new ethers.providers.Web3Provider(
    (window as any).ethereum
  );

  // return the associated Signer
  return newProvider.getSigner();
};

const getQuote = async (
  fromChain: ChainId,
  toChain: ChainId,
  fromToken: string,
  toToken: string,
  fromAmount: string,
  fromAddress: string
) => {
  const result = await axios.get('https://staging.li.quest/v1/quote', {
    params: {
      fromChain,
      toChain,
      fromToken,
      toToken,
      fromAmount,
      fromAddress,
    },
  });
  return result.data;
};
