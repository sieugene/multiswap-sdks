import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from 'ethers/lib/utils';
import React, { FC } from 'react';
import { dappConfig } from '../../config/dapp.config';

export const Account: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { account, deactivate, chainId, activateBrowserWallet } = useEthers();
  const etherBalance = useEtherBalance(account);
  const notAvailable = !chainId || !dappConfig.readOnlyUrls?.[chainId];

  return (
    <>
      <div style={{ border: '1px solid black' }}>
        {notAvailable && (
          <p>
            You chain not available, Available chains:{' '}
            {Object.keys(dappConfig.readOnlyUrls!).map(
              (value, index, array) =>
                `${value} ${array.length - 1 !== index ? ',' : ''}`
            )}
          </p>
        )}
        {!account && (
          <div>
            <button onClick={() => activateBrowserWallet()}>Connect</button>
          </div>
        )}
        {account && <button onClick={() => deactivate()}>Disconnect</button>}
        {etherBalance && (
          <div className="balance">
            <br />
            Balance (ETH):
            <p className="bold">{formatEther(etherBalance)}</p>
          </div>
        )}
      </div>
      <div>{account && !notAvailable && children}</div>
    </>
  );
};
