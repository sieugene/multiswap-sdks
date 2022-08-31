import { ethers } from 'ethers';

export const switchChainHook = async (requiredChainId: number) => {
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
