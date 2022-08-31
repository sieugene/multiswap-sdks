import { Execution, RoutesRequest } from '@lifi/sdk';
import { LiFiWidgetDrawer, WidgetConfig } from '@lifi/widget';
import { useEthers } from '@usedapp/core';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useMemo, useState } from 'react';
import { FROM_CHAINID, TO_CHAINID } from '../../../shared/config/dapp.config';
import { LIFI_CONFIG } from '../../../shared/config/lifi.config';
import { useBalance } from '../../../shared/hooks/useBalance';
import { switchChainHook } from '../lib/switchChainHook';

export const SwapWidget = () => {
  const { library, account } = useEthers();
  const [amount, setAmount] = useState('0');
  const [tokens] = useState({
    from: '0x0000000000000000000000000000000000000000', // ETH
    to: '0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa', // WETH
  });
  const fromBalance = useBalance(tokens.from);
  const toBalance = useBalance(tokens.to);

  const fromChain = FROM_CHAINID;
  const toChain = TO_CHAINID;

  const make = async () => {
    const parsedAmount = parseEther(amount)?.toString();
    const signer = library?.getSigner(account);
    if (!signer || !account) return;

    const routesRequest: RoutesRequest = {
      fromChainId: fromChain,
      fromAmount: parsedAmount,
      fromTokenAddress: tokens.from,
      toChainId: toChain,
      toTokenAddress: tokens.to,
    };
    const routesResponse = await LIFI_CONFIG.getRoutes(routesRequest);
    const routes = routesResponse.routes;
    const quote = await LIFI_CONFIG.getQuote({
      fromAddress: account,
      fromAmount: parsedAmount,
      fromChain,
      toChain,
      fromToken: tokens.from,
      toToken: tokens.to,
    });

    await LIFI_CONFIG.executeRoute(signer, routes[0], {
      updateCallback: (updatedRoute) => {
        let lastExecution: Execution | undefined = undefined;
        for (const step of updatedRoute.steps) {
          if (step.execution) {
            lastExecution = step.execution;
          }
        }
        console.log(lastExecution);
      },
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
      <LiFiWidgetDrawer config={widgetConfig} />
    </>
  );
};
