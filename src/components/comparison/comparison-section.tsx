"use client";

import { useState, useMemo } from "react";
import { GitCompare, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CountrySelector } from "./country-selector";
import { MetricComparisonCards } from "./metric-comparison-cards";
import { HistoricalChart } from "./historical-chart";
import { ExportDropdown } from "@/components/export";
import { generateComparisonDataset } from "@/lib/historical-data";
import { useTranslation } from "@/components/language";

export function ComparisonSection() {
  const { t } = useTranslation();
  // Default benchmark: Uzbekistan vs United States vs China
  const [selectedCodes, setSelectedCodes] = useState<string[]>(["UZB", "USA", "CHN"]);

  // Compile comparison profiles and historical series dynamically
  const comparisonData = useMemo(() => {
    return generateComparisonDataset(selectedCodes);
  }, [selectedCodes]);

  const { profiles, historical } = comparisonData;

  return (
    <section id="compare-section" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-500 gap-1.5 py-0.5 px-2.5 text-xs"
            >
              <GitCompare className="h-3.5 w-3.5" />
              {t.comparison.badge}
            </Badge>
            <Badge
              variant="outline"
              className="border-border text-xs text-muted-foreground font-mono"
            >
              {t.comparison.subBadge}
            </Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <GitCompare className="h-6 w-6 text-indigo-400" />
            {t.comparison.title}
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mt-1">
            {t.comparison.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
          <ExportDropdown
            profiles={profiles}
            historical={historical}
            variant="comparison"
          />
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-xl border border-border/60">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">{t.comparison.zeroFabricated}</span>
          </div>
        </div>
      </div>

      {/* 1. Country Selection Interface */}
      <div className="rounded-2xl border border-border/80 bg-card/40 backdrop-blur-xl p-5 shadow-lg space-y-4">
        <CountrySelector
          selectedCodes={selectedCodes}
          onChange={setSelectedCodes}
        />
      </div>

      {/* 2. Side-by-Side KPI Comparison Cards (4 Indicators) */}
      <MetricComparisonCards profiles={profiles} />

      {/* 3. Dynamic Historical Trends & Multi-Line Curves (1960 - 2024) */}
      <HistoricalChart profiles={profiles} historical={historical} />
    </section>
  );
}
