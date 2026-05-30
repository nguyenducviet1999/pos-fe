import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import {
  bottom,
  cloneLayout,
  horizontalCompactor,
  verticalCompactor,
} from "react-grid-layout/core";
import {
  WidthProvider,
  Responsive,
  type LayoutItem,
} from "react-grid-layout/legacy";

import {
  EnumDashboardScreen,
  EnumDashboardWidgetId,
} from "@src/enums/dashboard.enum";
import { cn } from "@src/lib/utils";
import {
  dashboardConfig,
  DASHBOARD_WIDGET_MAX_HEIGHT,
  dashboardWidgetEntries,
  getDashboardWidgetDefault,
} from "@src/pages/dashboard/dashboard.constants";
import type {
  DashboardLayouts,
  DashboardWidgetEditProps,
  LayoutCustom,
} from "@src/pages/dashboard/dashboard.types";

export type { LayoutCustom } from "@src/pages/dashboard/dashboard.types";

const GridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  layouts: DashboardLayouts;
  onLayoutsChange: (layouts: DashboardLayouts) => void;
  isCustomizing: boolean;
  periodLabel: string;
}

function getWidgetBounds(item: LayoutItem, cols: number) {
  const minW = item.minW ?? 1;
  const minH = item.minH ?? 1;
  const maxW = item.maxW ?? cols;
  const maxH = item.maxH ?? DASHBOARD_WIDGET_MAX_HEIGHT;

  return { minW, minH, maxW, maxH };
}

function resizeLayout(
  layout: LayoutCustom,
  widgetId: string,
  deltaW: number,
  deltaH: number,
  cols: number,
): LayoutCustom {
  return layout.map((item) => {
    if (item.i !== widgetId) {
      return item;
    }

    const { minW, minH, maxW, maxH } = getWidgetBounds(item, cols);

    return {
      ...item,
      w: Math.min(maxW, Math.max(minW, item.w + deltaW)),
      h: Math.min(maxH, Math.max(minH, item.h + deltaH)),
    };
  });
}

function resizeLayouts(
  layouts: DashboardLayouts,
  widgetId: string,
  deltaW: number,
  deltaH: number,
): DashboardLayouts {
  return Object.fromEntries(
    Object.entries(layouts).map(([screen, layout]) => {
      const cols = dashboardConfig.cols[screen as EnumDashboardScreen];

      return [
        screen,
        compactDashboardLayout(
          resizeLayout(layout, widgetId, deltaW, deltaH, cols),
          cols,
        ),
      ];
    }),
  ) as DashboardLayouts;
}

const MAX_COMPACT_PASSES = 4;

function getLayoutSignature(layout: LayoutCustom) {
  return layout
    .map((item) => `${item.i}:${item.x},${item.y},${item.w},${item.h}`)
    .join("|");
}

function mergeLayoutMetadata(
  compacted: LayoutCustom,
  original: LayoutCustom,
): LayoutCustom {
  const originalById = new Map(original.map((item) => [item.i, item]));

  return compacted.map((item) => {
    const source = originalById.get(item.i);

    if (!source) {
      return item;
    }

    return {
      ...source,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
    };
  });
}

function compactDashboardLayout(
  layout: LayoutCustom,
  cols: number,
): LayoutCustom {
  if (layout.length === 0) {
    return layout;
  }

  const hiddenItems = layout.filter((item) => item.hidden);
  const activeItems = layout.filter((item) => !item.hidden);

  if (activeItems.length === 0) {
    return layout;
  }

  let compacted = cloneLayout(activeItems) as LayoutCustom;
  let previousSignature = getLayoutSignature(compacted);

  for (let pass = 0; pass < MAX_COMPACT_PASSES; pass++) {
    compacted = verticalCompactor.compact(
      horizontalCompactor.compact(compacted, cols),
      cols,
    ) as LayoutCustom;

    const signature = getLayoutSignature(compacted);
    if (signature === previousSignature) {
      break;
    }

    previousSignature = signature;
  }

  const mergedActive = mergeLayoutMetadata(compacted, activeItems);

  if (hiddenItems.length === 0) {
    return mergedActive;
  }

  const nextY = bottom(mergedActive);
  const parkedHiddenItems = hiddenItems.map((item, index) => ({
    ...item,
    x: 0,
    y: nextY + index,
    w: 1,
    h: 1,
  }));

  return [...mergedActive, ...parkedHiddenItems];
}

function removeWidgetFromLayout(
  layout: LayoutCustom,
  widgetId: string,
): LayoutCustom {
  return layout.filter((item) => item.i !== widgetId);
}

function removeWidget(
  layouts: DashboardLayouts,
  widgetId: string,
): DashboardLayouts {
  return Object.fromEntries(
    Object.entries(layouts).map(([screen, layout]) => [
      screen,
      removeWidgetFromLayout(layout, widgetId),
    ]),
  ) as DashboardLayouts;
}

function mergeHiddenState(
  previous: DashboardLayouts,
  next: DashboardLayouts,
): DashboardLayouts {
  return Object.fromEntries(
    Object.entries(next).map(([screen, layout]) => {
      const hiddenById = new Map(
        (previous[screen as EnumDashboardScreen] ?? [])
          .filter((item) => item.hidden)
          .map((item) => [item.i, true]),
      );

      return [
        screen,
        layout.map((item) => ({
          ...item,
          hidden: hiddenById.get(item.i) ?? item.hidden,
        })),
      ];
    }),
  ) as DashboardLayouts;
}

export function addWidget(
  layouts: DashboardLayouts,
  widgetId: EnumDashboardWidgetId,
): DashboardLayouts {
  const screens = Object.values(EnumDashboardScreen);

  if (
    screens.some((screen) =>
      layouts[screen].some((item) => item.i === widgetId),
    )
  ) {
    return layouts;
  }

  return Object.fromEntries(
    screens.map((screen) => {
      const template = getDashboardWidgetDefault(widgetId, screen);

      if (!template) {
        return [screen, layouts[screen]];
      }

      const layout = layouts[screen];
      const newItem: LayoutCustom[number] = {
        ...template,
        x: 0,
        y: bottom(layout.filter((item) => !item.hidden)),
      };

      return [
        screen,
        compactDashboardLayout(
          [...layout, newItem],
          dashboardConfig.cols[screen],
        ),
      ];
    }),
  ) as DashboardLayouts;
}

export function DashboardGrid({
  layouts,
  onLayoutsChange,
  isCustomizing,
  periodLabel,
}: DashboardGridProps) {
  // const skipLayoutSyncRef = useRef(false);
  const { t } = useTranslation();

  const applyLayoutsChange = useCallback(
    (nextLayouts: DashboardLayouts) => {
      // skipLayoutSyncRef.current = true;
      onLayoutsChange(nextLayouts);
    },
    [onLayoutsChange],
  );
  const paymentMethodLabels = useMemo(
    () => ({
      cash: t("dashboard.PAYMENT_CASH"),
      card: t("dashboard.PAYMENT_CARD"),
      other: t("dashboard.PAYMENT_OTHER"),
    }),
    [t],
  );

  const primaryLayout = layouts[EnumDashboardScreen.MD];

  const layoutById = useMemo(
    () => new Map(primaryLayout.map((item) => [item.i, item])),
    [primaryLayout],
  );

  const getWidgetEditProps = useCallback(
    (widgetId: string): DashboardWidgetEditProps => {
      const item = layoutById.get(widgetId);
      const cols = dashboardConfig.cols[EnumDashboardScreen.MD];
      const bounds = item ? getWidgetBounds(item, cols) : null;

      return {
        isCustomizing,
        canIncreaseWidth: bounds ? item!.w < bounds.maxW : false,
        canDecreaseWidth: bounds ? item!.w > bounds.minW : false,
        canIncreaseHeight: bounds ? item!.h < bounds.maxH : false,
        canDecreaseHeight: bounds ? item!.h > bounds.minH : false,
        onIncreaseWidth: () =>
          applyLayoutsChange(resizeLayouts(layouts, widgetId, 1, 0)),
        onDecreaseWidth: () =>
          applyLayoutsChange(resizeLayouts(layouts, widgetId, -1, 0)),
        onIncreaseHeight: () =>
          applyLayoutsChange(resizeLayouts(layouts, widgetId, 0, 1)),
        onDecreaseHeight: () =>
          applyLayoutsChange(resizeLayouts(layouts, widgetId, 0, -1)),
        onRemove: () => applyLayoutsChange(removeWidget(layouts, widgetId)),
      };
    },
    [applyLayoutsChange, isCustomizing, layouts, layoutById],
  );

  const visibleLayouts = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(layouts).map(([screen, layout]) => [
          screen,
          layout.filter((item) => !item.hidden),
        ]),
      ) as DashboardLayouts,
    [layouts],
  );

  const visibleWidgetIds = useMemo(
    () =>
      new Set(
        primaryLayout
          .filter((item) => !item.hidden)
          .map((item) => item.i as EnumDashboardWidgetId),
      ),
    [primaryLayout],
  );

  const widgetRenderContext = useMemo(
    () => ({
      t,
      periodLabel,
      paymentMethodLabels,
    }),
    [paymentMethodLabels, periodLabel, t],
  );

  return (
    <div
      className={cn(
        "dashboard-grid",
        isCustomizing && "dashboard-grid--editing",
      )}
    >
      <GridLayout
        className="layout"
        layouts={visibleLayouts}
        breakpoints={dashboardConfig.breakpoints}
        cols={dashboardConfig.cols}
        rowHeight={dashboardConfig.rowHeight}
        margin={dashboardConfig.margin}
        isDraggable={isCustomizing}
        isResizable={false}
        onLayoutChange={(_layout, allLayouts) => {
          if (!allLayouts) {
            return;
          }

          // if (skipLayoutSyncRef.current) {
          //   skipLayoutSyncRef.current = false;
          //   return;
          // }

          onLayoutsChange(
            mergeHiddenState(layouts, allLayouts as DashboardLayouts),
          );
        }}
        compactType="vertical"
      >
        {dashboardWidgetEntries.map(({ key, render }) => {
          if (!visibleWidgetIds.has(key)) {
            return null;
          }

          return (
            <div key={key}>
              {render({
                ...widgetRenderContext,
                editProps: getWidgetEditProps(key),
              })}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
}
