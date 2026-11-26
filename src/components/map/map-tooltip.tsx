"use client";

import { MapTooltipState } from "@/types/map";
import { useTranslation } from "@/components/language";

interface MapTooltipProps {
  tooltip: MapTooltipState | null;
}

export function MapTooltip({ tooltip }: MapTooltipProps) {
  const { t } = useTranslation();

  if (!tooltip) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-2 transition-all duration-75"
      style={{ left: `${tooltip.x}px`, top: `${tooltip.y - 12}px` }}
    >
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-white/98 dark:bg-slate-900/95 p-3 shadow-xl text-xs space-y-1.5 min-w-[200px]">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-1.5">
          <span className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[145px]">
            {tooltip.countryName}
          </span>
          <span className="font-mono text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">
            {tooltip.iso3}
          </span>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center justify-between gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
            <span>{tooltip.metricTitle}:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
              {tooltip.value}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[10px]">
            <span>{t.common.referenceYear}:</span>
            <span className="font-mono text-slate-700 dark:text-slate-200 font-medium">
              {tooltip.year || t.common.na}
            </span>
          </div>
        </div>

        <div className="text-[10px] text-blue-600 dark:text-blue-400 pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span>{t.centerpiece.clickToInspect}</span>
        </div>
      </div>
    </div>
  );
}
