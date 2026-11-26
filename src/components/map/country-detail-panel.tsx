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
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="w-full lg:w-[350px] rounded-2xl border border-dashed border-blue-300 dark:border-slate-700 bg-blue-50/60 dark:bg-slate-900/60 p-6 flex flex-col items-center justify-center text-center min-h-[220px] lg:min-h-[630px] space-y-3">
        <div className="h-11 w-11 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 flex items-center justify-center text-blue-700 dark:text-blue-300 shadow-sm">
          <Compass className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {t.countryPanel.title}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
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

  const growthRaw = country.growthRate?.raw;
  const isNegativeGrowth = growthRaw !== null && growthRaw !== undefined && growthRaw < 0;

  const metrics = [
    {
      label: t.countryPanel.popLabel,
      code: "SP.POP.TOTL",
      icon: Users,
      value: country.population?.value,
      year: country.population?.year,
      cardStyle:
        "bg-blue-50/70 dark:bg-blue-950/35 border-blue-200 dark:border-blue-800/80 border-l-4 border-l-[#1D4ED8]",
      iconStyle: "bg-blue-100 dark:bg-blue-900/70 text-[#1D4ED8] dark:text-blue-300",
      codeStyle: "bg-white dark:bg-slate-900 text-[#1E40AF] dark:text-blue-300 border-blue-200 dark:border-blue-800",
      valueStyle: "text-[#0F295C] dark:text-white",
    },
    {
      label: t.countryPanel.dnstLabel,
      code: "EN.POP.DNST",
      icon: Compass,
      value: country.density?.value,
      year: country.density?.year,
      cardStyle:
        "bg-sky-50/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800/80 border-l-4 border-l-[#0284C7]",
      iconStyle: "bg-sky-100 dark:bg-sky-900/70 text-[#0369A1] dark:text-sky-300",
      codeStyle: "bg-white dark:bg-slate-900 text-[#0369A1] dark:text-sky-300 border-sky-200 dark:border-sky-800",
      valueStyle: "text-[#0C4A6E] dark:text-sky-100",
    },
    {
      label: t.countryPanel.growLabel,
      code: "SP.POP.GROW",
      icon: TrendingUp,
      value: country.growthRate?.value,
      year: country.growthRate?.year,
      cardStyle: isNegativeGrowth
        ? "bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-800/80 border-l-4 border-l-red-600"
        : "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 border-l-4 border-l-emerald-600",
      iconStyle: isNegativeGrowth
        ? "bg-red-100 dark:bg-red-900/70 text-red-700 dark:text-red-300"
        : "bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-300",
      codeStyle: isNegativeGrowth
        ? "bg-white dark:bg-slate-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
        : "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      valueStyle: isNegativeGrowth
        ? "text-red-700 dark:text-red-300"
        : "text-emerald-800 dark:text-emerald-200",
    },
    {
      label: t.countryPanel.urbLabel,
      code: "SP.URB.TOTL.IN.ZS",
      icon: Building2,
      value: country.urbanShare?.value,
      year: country.urbanShare?.year,
      cardStyle:
        "bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/80 border-l-4 border-l-indigo-600",
      iconStyle: "bg-indigo-100 dark:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300",
      codeStyle: "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      valueStyle: "text-indigo-950 dark:text-indigo-100",
    },
  ];

  return (
    <aside
      aria-label={t.countryPanel.title}
      className="w-full lg:w-[355px] shrink-0 rounded-2xl border border-blue-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Royal Blue Header Banner for High-Contrast Readability */}
        <div className="bg-gradient-to-r from-[#0F295C] to-[#1D4ED8] px-5 py-4 text-white flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <MapPin className="h-4 w-4 text-sky-300 shrink-0" />
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white truncate">
                {displayName}
              </h3>
              <span className="font-mono text-[11px] font-bold text-[#0F295C] bg-white px-2 py-0.5 rounded-md shadow-sm">
                {country.iso3}
              </span>
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-sky-200" />
              )}
            </div>
            <p className="text-xs text-blue-100 mt-1 font-medium">
              {t.countryPanel.verifiedProfile}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-white/15 text-white/85 hover:text-white shrink-0"
            aria-label={t.common.close}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Color-Coded Metric Cards */}
        <div className="p-4 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.code}
                  className={`p-3 rounded-xl border space-y-1.5 transition-colors ${m.cardStyle}`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-lg ${m.iconStyle}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span>{m.label}</span>
                    </span>
                    <span
                      className={`font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded border ${m.codeStyle}`}
                    >
                      {m.code}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2 pt-0.5 pl-8">
                    <span className={`text-xl font-extrabold tabular-nums ${m.valueStyle}`}>
                      {m.value || t.common.dataPending}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1 tabular-nums shrink-0">
                      <Calendar className="h-3 w-3 text-blue-700 dark:text-blue-400" />
                      {m.year || t.common.na}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA & Official Attribution */}
      <div className="px-4 pb-4 space-y-3">
        <Button
          type="button"
          onClick={handleAddAndScroll}
          variant={isAlreadyCompared ? "outline" : "default"}
          className={`w-full justify-between text-xs h-10 rounded-xl font-bold transition-all ${
            isAlreadyCompared
              ? "border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950/70 dark:text-blue-200"
              : "bg-[#1D4ED8] hover:bg-[#1E40AF] text-white shadow-sm"
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

        <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-blue-800 dark:text-blue-300 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
            <span>{t.countryPanel.sourceFooter}</span>
          </span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            {t.countryPanel.officialFeedFooter}
          </span>
        </div>
      </div>
    </aside>
  );
}
