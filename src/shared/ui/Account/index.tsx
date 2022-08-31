import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from 'ethers/lib/utils';
import React, { FC } from 'react';
import { dappConfig } from '../../config/dapp.config';

export const Account: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { account, deactivate, chainId, activateBrowserWallet } = useEthers();
  const etherBalance = useEtherBalance(account);
  if (!chainId || !dappConfig.readOnlyUrls?.[chainId]) {
    return <p>Please use either BscTestnet or Rinkeby testnet.</p>;
  }
  return (
    <>
      <div style={{ border: '1px solid black' }}>
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
        {account && <button onClick={() => deactivate()}>Disconnect</button>}
        {etherBalance && (
          <div className="balance">
            <br />
            Balance (ETH):
            <p className="bold">{formatEther(etherBalance)}</p>
          </div>
        )}
      </div>
      <div>{account && children}</div>
    </>
  );
};
