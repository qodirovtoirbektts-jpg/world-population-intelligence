"use client";

import { Users, Compass, TrendingUp, Building2, X, CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SelectedCountryProfile } from "@/types/map";
import { useTranslation } from "@/components/language";

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

  if (!country) return null;

  // Localize Uzbekistan name if active
  const displayName = country.iso3 === "UZB"
    ? (language === "ru" ? "Узбекистан" : language === "uz" ? "Oʻzbekiston" : country.name)
    : country.name;

  return (
    <div className="w-full lg:w-96 rounded-2xl border border-border/90 bg-card/90 shadow-2xl backdrop-blur-xl p-5 space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border/50 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold tracking-tight text-foreground">
              {displayName}
            </h3>
            <Badge variant="outline" className="font-mono text-xs text-blue-400 border-blue-500/30">
              {country.iso3}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t.countryPanel.verifiedProfile}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground"
          aria-label={t.common.close}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Metrics List */}
      <div className="space-y-3">
        {/* Total Population */}
        <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-blue-400" />
              <span>{t.countryPanel.popLabel}</span>
            </span>
            <span className="font-mono text-[10px]">SP.POP.TOTL</span>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-xl font-bold text-foreground">
              {country.population?.value || t.common.dataPending}
            </span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {country.population?.year || t.common.na}
            </span>
          </div>
        </div>

        {/* Population Density */}
        <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-teal-400" />
              <span>{t.countryPanel.dnstLabel}</span>
            </span>
            <span className="font-mono text-[10px]">EN.POP.DNST</span>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-xl font-bold text-foreground">
              {country.density?.value || t.common.dataPending}
            </span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {country.density?.year || t.common.na}
            </span>
          </div>
        </div>

        {/* Annual Growth Rate */}
        <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t.countryPanel.growLabel}</span>
            </span>
            <span className="font-mono text-[10px]">SP.POP.GROW</span>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-xl font-bold text-foreground">
              {country.growthRate?.value || t.common.dataPending}
            </span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {country.growthRate?.year || t.common.na}
            </span>
          </div>
        </div>

        {/* Urban Population Share */}
        <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-amber-400" />
              <span>{t.countryPanel.urbLabel}</span>
            </span>
            <span className="font-mono text-[10px]">SP.URB.TOTL.IN.ZS</span>
          </div>
          <div className="flex items-baseline justify-between pt-0.5">
            <span className="text-xl font-bold text-foreground">
              {country.urbanShare?.value || t.common.dataPending}
            </span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {country.urbanShare?.year || t.common.na}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Comparison Action */}
      <div className="pt-1">
        <a href="#compare-section" className="block">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between text-xs h-9 rounded-xl border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400 group"
          >
            <span>{t.countryPanel.benchmarkCta}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </a>
      </div>

      {/* Verification footer */}
      <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{t.countryPanel.sourceFooter}</span>
        </span>
        <span>{t.countryPanel.officialFeedFooter}</span>
      </div>
    </div>
  );
}
