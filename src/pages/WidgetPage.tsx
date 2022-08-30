import { LiFiWidget, WidgetConfig } from '@lifi/widget';
import { useMemo } from 'react';

export const WidgetPage = () => {
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
      fromChainId: 3, // Ropsten
      fromAmount: '10000000000000000000', // 10
      fromTokenAddress: '0xe71678794fff8846bff855f716b0ce9d9a78e844', // TEST Token
      toChainId: 4, // Rinkeby
      toTokenAddress: '0x9ac2c46d7acc21c881154d57c0dc1c55a3139198',
    }),
    []
  );

  return (
    <>
      <LiFiWidget config={widgetConfig} />
    </>
  );
};
