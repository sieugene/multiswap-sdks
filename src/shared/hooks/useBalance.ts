import { useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core';

export const useBalance = (token: string) => {
  const { account } = useEthers();
  const fromBalance = useTokenBalance(token, account);
  const etherBalance = useEtherBalance(account);
  if (token === '0x0000000000000000000000000000000000000000')
    return etherBalance;
  return fromBalance;
};
