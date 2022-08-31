import { LiFiWidgetDrawer, WidgetConfig } from '@lifi/widget';
import { useMemo } from 'react';
import { SwapWidget } from '../widgets/SwapWidget/ui';

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
    }),
    []
  );

  return (
    <>
      <SwapWidget />
      <LiFiWidgetDrawer config={widgetConfig} />
    </>
  );
};
