"use client";

import {
  Users,
  Compass,
  TrendingUp,
  Building2,
  X,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SelectedCountryProfile } from "@/types/map";
import { useTranslation } from "@/components/language";
import { getLocalizedCountryName } from "@/lib/country-names";
import { useDashboard } from "@/components/dashboard/dashboard-context";

interface CountryDetailPanelProps {
  country: SelectedCountryProfile | null;
  onClose: () => void;
  isLoading?: boolean;
}

export function CountryDetailPanel({
  country,
  onClose,
  isLoading = false,
}: CountryDetailPanelProps) {
  const { t, language } = useTranslation();
  const { comparisonCodes, addCountryToComparison } = useDashboard();

  if (!country) {
    return (
      <div className="w-full lg:w-[340px] rounded-2xl border border-dashed border-blue-200 dark:border-slate-700 bg-blue-50/40 dark:bg-slate-900/50 p-6 flex flex-col items-center justify-center text-center min-h-[220px] lg:min-h-[630px] space-y-3">
        <div className="h-11 w-11 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center text-blue-700 dark:text-blue-300 shadow-sm">
          <Compass className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {t.countryPanel.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.countryPanel.selectHint}
          </p>
        </div>
      </div>
    );
  }

  const displayName = getLocalizedCountryName(country.iso3, country.name, language);
  const isAlreadyCompared = comparisonCodes.includes(country.iso3.toUpperCase());

  const handleAddAndScroll = () => {
    addCountryToComparison(country.iso3);
    const el = document.getElementById("compare-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const metrics = [
    {
      label: t.countryPanel.popLabel,
      code: "SP.POP.TOTL",
      icon: Users,
      value: country.population?.value,
      year: country.population?.year,
    },
    {
      label: t.countryPanel.dnstLabel,
      code: "EN.POP.DNST",
      icon: Compass,
      value: country.density?.value,
      year: country.density?.year,
    },
    {
      label: t.countryPanel.growLabel,
      code: "SP.POP.GROW",
      icon: TrendingUp,
      value: country.growthRate?.value,
      year: country.growthRate?.year,
    },
    {
      label: t.countryPanel.urbLabel,
      code: "SP.URB.TOTL.IN.ZS",
      icon: Building2,
      value: country.urbanShare?.value,
      year: country.urbanShare?.year,
    },
  ];

  return (
    <aside
      aria-label={t.countryPanel.title}
      className="w-full lg:w-[350px] shrink-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
              {displayName}
            </h3>
            <Badge
              variant="outline"
              className="font-mono text-[11px] font-semibold text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/60"
            >
              {country.iso3}
            </Badge>
            {isLoading && (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.countryPanel.verifiedProfile}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 shrink-0"
          aria-label={t.common.close}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Responsive 2x2 grid on mobile, vertical stack on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.code}
              className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Icon className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                  <span>{m.label}</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">{m.code}</span>
              </div>
              <div className="flex items-baseline justify-between gap-2 pt-0.5">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  {m.value || t.common.dataPending}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 tabular-nums shrink-0">
                  <Calendar className="h-3 w-3 text-blue-600/70" />
                  {m.year || t.common.na}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add to Comparison Action */}
      <div className="pt-1">
        <Button
          type="button"
          onClick={handleAddAndScroll}
          variant={isAlreadyCompared ? "outline" : "default"}
          className={`w-full justify-between text-xs h-10 rounded-xl font-semibold transition-all ${
            isAlreadyCompared
              ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
              : "bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
          }`}
        >
          <span className="flex items-center gap-1.5">
            {isAlreadyCompared && <Check className="h-3.5 w-3.5" />}
            <span>
              {isAlreadyCompared
                ? t.countryPanel.addedToCompare
                : t.countryPanel.benchmarkCta}
            </span>
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Verification footer */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1 text-blue-700 dark:text-blue-400 font-medium">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{t.countryPanel.sourceFooter}</span>
        </span>
        <span>{t.countryPanel.officialFeedFooter}</span>
      </div>
    </aside>
  );
}
