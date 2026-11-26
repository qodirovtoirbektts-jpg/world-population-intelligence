"use client";

import { Users, Compass, TrendingUp, Building2 } from "lucide-react";
import { MapMetricType } from "@/types/map";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/components/language";

interface MetricSelectorProps {
  currentMetric: MapMetricType;
  onSelect: (metric: MapMetricType) => void;
  isLoading?: boolean;
}

export function MetricSelector({
  currentMetric,
  onSelect,
  isLoading = false,
}: MetricSelectorProps) {
  const { t } = useTranslation();

  const metricOptions: Array<{
    id: MapMetricType;
    label: string;
    code: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: "SP.POP.TOTL",
      label: t.centerpiece.tabPop,
      code: "SP.POP.TOTL",
      icon: Users,
    },
    {
      id: "EN.POP.DNST",
      label: t.centerpiece.tabDnst,
      code: "EN.POP.DNST",
      icon: Compass,
    },
    {
      id: "SP.POP.GROW",
      label: t.centerpiece.tabGrow,
      code: "SP.POP.GROW",
      icon: TrendingUp,
    },
    {
      id: "SP.URB.TOTL.IN.ZS",
      label: t.centerpiece.tabUrb,
      code: "SP.URB.TOTL.IN.ZS",
      icon: Building2,
    },
  ];

  return (
    <div
      className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
      role="tablist"
      aria-label={t.centerpiece.title}
    >
      {metricOptions.map((opt) => {
        const Icon = opt.icon;
        const isSelected = currentMetric === opt.id;

        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isSelected}
            aria-label={`${opt.label} (${opt.code})`}
            onClick={() => onSelect(opt.id)}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all select-none disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none",
              isSelected
                ? "bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200/80 dark:border-blue-800 font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/50"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-400"
              )}
            />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
