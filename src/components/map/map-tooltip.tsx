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
      style={{ left: `${tooltip.x}px`, top: `${tooltip.y - 14}px` }}
    >
      <div className="rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-xs min-w-[220px]">
        {/* High-contrast Royal Navy Header */}
        <div className="flex items-center justify-between gap-2 bg-[#0F295C] px-3 py-2 text-white">
          <span className="font-bold tracking-tight truncate max-w-[155px]">
            {tooltip.countryName}
          </span>
          <span className="font-mono text-[10px] font-bold text-[#0F295C] bg-white px-1.5 py-0.5 rounded">
            {tooltip.iso3}
          </span>
        </div>

        {/* Vivid Metric Readout */}
        <div className="p-3 space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">
              {tooltip.metricTitle}:
            </span>
            <span className="font-extrabold text-[#1D4ED8] dark:text-blue-400 text-sm tabular-nums">
              {tooltip.value}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 dark:text-slate-400">
              {t.common.referenceYear}:
            </span>
            <span className="font-mono text-slate-900 dark:text-slate-100 font-semibold bg-blue-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-blue-100 dark:border-slate-700">
              {tooltip.year || t.common.na}
            </span>
          </div>

          <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            {t.centerpiece.clickToInspect} →
          </div>
        </div>
      </div>
    </div>
  );
}
