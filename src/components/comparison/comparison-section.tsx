"use client";

import { useMemo } from "react";
import { GitCompare, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CountrySelector } from "./country-selector";
import { MetricComparisonCards } from "./metric-comparison-cards";
import { HistoricalChart } from "./historical-chart";
import { ExportDropdown } from "@/components/export";
import { generateComparisonDataset } from "@/lib/historical-data";
import { useTranslation } from "@/components/language";
import { useDashboard } from "@/components/dashboard/dashboard-context";

export function ComparisonSection() {
  const { t } = useTranslation();
  const { comparisonCodes, setComparisonCodes } = useDashboard();

  const comparisonData = useMemo(() => {
    return generateComparisonDataset(comparisonCodes);
  }, [comparisonCodes]);

  const { profiles, historical } = comparisonData;

  return (
    <section id="compare-section" className="space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-semibold gap-1.5"
            >
              <GitCompare className="h-3 w-3" />
              {t.comparison.badge}
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t.comparison.subBadge}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.comparison.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {t.comparison.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-end">
          <ExportDropdown
            profiles={profiles}
            historical={historical}
            variant="comparison"
          />
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
            <span className="hidden sm:inline font-medium">{t.comparison.zeroFabricated}</span>
          </div>
        </div>
      </div>

      <div className="editorial-card p-4 sm:p-5 bg-white dark:bg-slate-900">
        <CountrySelector
          selectedCodes={comparisonCodes}
          onChange={setComparisonCodes}
        />
      </div>

      <MetricComparisonCards profiles={profiles} />

      <HistoricalChart profiles={profiles} historical={historical} />
    </section>
  );
}
