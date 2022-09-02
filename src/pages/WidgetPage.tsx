import { useMemo, useState } from 'react';
import { LifiCustomWidget, RubicWidget } from '../widgets/SwapWidget/ui';

enum WidgetType {
  NONE = 'NONE',
  LIFI = 'LIFI',
  RUBIC = 'RUBIC',
}
export const WidgetPage = () => {
  const [widget, setWidget] = useState<WidgetType>(WidgetType.NONE);
  const ChosedWidget = useMemo(() => {
    switch (widget) {
      case WidgetType.NONE:
        return <div>widget not selected</div>;
      case WidgetType.LIFI:
        return <LifiCustomWidget />;
      case WidgetType.RUBIC:
        return <RubicWidget />;
    }
  }, [widget]);
  return (
    <>
      <select
        value={widget}
        onChange={({ target }) => setWidget(target.value as WidgetType)}
      >
        {Object.values(WidgetType).map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
      {ChosedWidget}
    </>
  );
};
