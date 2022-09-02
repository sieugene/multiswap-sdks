import { useEthers } from '@usedapp/core';
import { formatEther } from 'ethers/lib/utils';
import { useState } from 'react';
import { RUBIC_SETTINGS } from '../../../../shared/config/dapp.config';
import { RubicSdk } from '../../../../shared/config/rubic.config';
import { useBalance } from '../../../../shared/hooks/useBalance';

const RubicWidget = () => {
  const [input, setInput] = useState('0');
  const { library, chainId, account } = useEthers();
  const balance = useBalance(RUBIC_SETTINGS.tokenFrom);
  const calculate = async () => {
    const rubic = new RubicSdk();
    const provider = library?.getSigner();

    if (!provider || !chainId || !account) {
      throw new Error('miss deps');
    }
    await rubic.init((window as any).ethereum, account!, chainId!);
    const trade = await rubic.findTrade(input);
    await rubic.swap(trade);
  };
  return (
    <div>
      use this network: {RUBIC_SETTINGS.from.name}
      token from balance: {balance && formatEther(balance)}
      <br />
      <input onChange={({ target }) => setInput(target.value)} value={input} />
      <button onClick={calculate}>calc</button>
    </div>
  );
};

export default RubicWidget;
