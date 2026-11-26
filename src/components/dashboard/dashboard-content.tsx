"use client";

import React from "react";
import {
  Users,
  TrendingUp,
  Compass,
  Building2,
  GitCompare,
  Globe2,
  ListOrdered,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { ApiStatusBanner } from "@/components/dashboard/api-status-banner";
import { MethodologyNotice } from "@/components/dashboard/methodology-notice";
import { ComparisonSection } from "@/components/comparison";
import { InteractiveWorldMap } from "@/components/map";
import { RegionalDistributionDonut } from "@/components/charts/regional-distribution-donut";
import { PopulationRankingBar } from "@/components/charts/population-ranking-bar";
import { DemographicRankingTable } from "@/components/ranking/demographic-ranking-table";
import { useTranslation } from "@/components/language";
import { useDashboard } from "@/components/dashboard/dashboard-context";
import { WorldBankRegionalItem } from "@/lib/world-bank";
import { DashboardMetricsResult } from "@/types/world-bank";

interface DashboardContentProps {
  dashboardData: DashboardMetricsResult;
  regionalData: WorldBankRegionalItem[];
  uzbekistanProfile: {
    population: number;
    formattedPopulation: string;
    year: string;
    density: number;
    growth: number;
    urban: number;
  };
}

export function DashboardContent({
  dashboardData,
  regionalData,
  uzbekistanProfile,
}: DashboardContentProps) {
  const { t, language } = useTranslation();
  const { focusCountryOnGlobe, focusRegionOnGlobe } = useDashboard();
  const { metrics, lastFetched, sourcePartner } = dashboardData;

  const totalPop = metrics["SP.POP.TOTL"] || {
    formattedValue: "8.14 Billion",
    year: "2024",
    source: "World Bank",
    isAvailable: true,
  };
  const popGrow = metrics["SP.POP.GROW"] || {
    formattedValue: "+0.96%",
    year: "2024",
    source: "World Bank",
    isAvailable: true,
  };
  const popDnst = metrics["EN.POP.DNST"] || {
    formattedValue: "62.14 / km²",
    year: "2023",
    source: "World Bank",
    isAvailable: true,
  };
  const urbShare = metrics["SP.URB.TOTL.IN.ZS"] || {
    formattedValue: "57.57%",
    year: "2024",
    source: "World Bank",
    isAvailable: true,
  };

  const handleUzbSpotlight = () => {
    focusCountryOnGlobe("UZB", "Uzbekistan");
    const el = document.getElementById("map-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const regionFocusQuickCards = [
    {
      code: "ECS",
      label: t.regional.regions.ECS,
      coords: [42, 48] as [number, number],
      scale: 420,
    },
    {
      code: "EAS",
      label: t.regional.regions.EAS,
      coords: [110, 30] as [number, number],
      scale: 360,
    },
    {
      code: "SAS",
      label: t.regional.regions.SAS,
      coords: [78, 22] as [number, number],
      scale: 480,
    },
    {
      code: "SSF",
      label: t.regional.regions.SSF,
      coords: [20, 0] as [number, number],
      scale: 340,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9 space-y-10">
      {/* 1. Editorial White–Blue Hero Header */}
      <section
        id="overview"
        className="relative overflow-hidden rounded-3xl border border-blue-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-[#f7faff] to-[#ebf2ff] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-10 shadow-sm scroll-mt-20"
      >
        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-700 text-white shadow-sm">
              {t.hero.suiteBadge}
            </span>
            <Badge
              variant="outline"
              className="border-blue-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300"
            >
              {t.hero.timeSeriesBadge}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.12]">
            {t.hero.titleLine1}{" "}
            <span className="text-blue-700 dark:text-blue-400">
              {t.hero.titleLine2}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <a href="#map-section">
              <Button className="gap-2 bg-blue-700 hover:bg-blue-800 text-white shadow-sm h-10 px-4 rounded-xl">
                <Globe2 className="h-4 w-4" />
                <span>{t.hero.ctaGlobe}</span>
              </Button>
            </a>
            <a href="#compare-section">
              <Button
                variant="outline"
                className="gap-2 h-10 px-4 rounded-xl border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-blue-50"
              >
                <GitCompare className="h-4 w-4 text-blue-700" />
                <span>{t.hero.ctaCompare}</span>
              </Button>
            </a>
            <a href="#ranking-section">
              <Button
                variant="ghost"
                className="gap-2 h-10 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50"
              >
                <ListOrdered className="h-4 w-4" />
                <span>{t.hero.ctaRanking}</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Official Feed Ribbon */}
      <ApiStatusBanner lastFetched={lastFetched} sourcePartner={sourcePartner} />

      {/* 2. Core World Demographic Indicators (4 Cards) */}
      <section id="indicators-section" className="space-y-4 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              {t.kpi.sectionBadge} • {t.kpi.officialReleaseBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-0.5">
              {t.kpi.sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t.kpi.sectionSubtitle}
            </p>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t.kpi.isrCacheBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t.kpi.popTotal.title}
            indicatorCode="SP.POP.TOTL"
            icon={<Users className="h-4 w-4" />}
            description={t.kpi.popTotal.description}
            value={totalPop.formattedValue}
            year={totalPop.year}
            source={totalPop.source}
            isAvailable={totalPop.isAvailable}
            trendText={t.kpi.popTotal.trendText}
            progressPercent={82}
          />

          <StatCard
            title={t.kpi.popGrow.title}
            indicatorCode="SP.POP.GROW"
            icon={<TrendingUp className="h-4 w-4" />}
            description={t.kpi.popGrow.description}
            value={popGrow.formattedValue}
            year={popGrow.year}
            source={popGrow.source}
            isAvailable={popGrow.isAvailable}
            trendText={t.kpi.popGrow.trendText}
            progressPercent={46}
          />

          <StatCard
            title={t.kpi.popDnst.title}
            indicatorCode="EN.POP.DNST"
            icon={<Compass className="h-4 w-4" />}
            description={t.kpi.popDnst.description}
            value={popDnst.formattedValue}
            year={popDnst.year}
            source={popDnst.source}
            isAvailable={popDnst.isAvailable}
            trendText={t.kpi.popDnst.trendText}
            progressPercent={62}
          />

          <StatCard
            title={t.kpi.popUrb.title}
            indicatorCode="SP.URB.TOTL.IN.ZS"
            icon={<Building2 className="h-4 w-4" />}
            description={t.kpi.popUrb.description}
            value={urbShare.formattedValue}
            year={urbShare.year}
            source={urbShare.source}
            isAvailable={urbShare.isAvailable}
            trendText={t.kpi.popUrb.trendText}
            progressPercent={58}
          />
        </div>
      </section>

      {/* 3. Interactive Rotating & Zoomable 3D Globe + Country Analytics Panel */}
      <InteractiveWorldMap />

      {/* 4. Multi-Country Comparison & 1960–2024 Historical Curve */}
      <ComparisonSection />

      {/* 5. Regional Analysis & Demographic Breakdown */}
      <section id="regional-section" className="space-y-5 scroll-mt-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <Badge
              variant="outline"
              className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-semibold"
            >
              {t.regional.badge}
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t.regional.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {t.regional.subtitle}
            </p>
          </div>

          {/* Regional Globe Quick-Focus Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {regionFocusQuickCards.map((rf) => (
              <Button
                key={rf.code}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  focusRegionOnGlobe(rf.coords, rf.scale, rf.label);
                  const el = document.getElementById("map-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-8 px-3 rounded-xl text-xs border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-blue-50 hover:text-blue-700"
              >
                {rf.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Uzbekistan Regional Spotlight Strip */}
        <div className="rounded-2xl border border-blue-200/80 dark:border-slate-800 bg-gradient-to-r from-blue-50/90 via-white to-blue-50/70 dark:from-slate-900 dark:to-slate-900 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇺🇿</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {t.regional.uzbSpotlightTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.regional.uzbSpotlightSub}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
              <div className="text-[11px] text-slate-500">{t.countryPanel.popLabel}</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                {uzbekistanProfile.formattedPopulation}
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
              <div className="text-[11px] text-slate-500">{t.countryPanel.growLabel}</div>
              <div className="font-bold text-blue-700 dark:text-blue-300 tabular-nums">
                +{uzbekistanProfile.growth}%
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
              <div className="text-[11px] text-slate-500">{t.countryPanel.dnstLabel}</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                {uzbekistanProfile.density} / km²
              </div>
            </div>
            <button
              type="button"
              onClick={handleUzbSpotlight}
              className="px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>{language === "uz" ? "Globusda ochish" : language === "ru" ? "На глобусе" : "Inspect"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegionalDistributionDonut data={regionalData} />
          <PopulationRankingBar
            uzbekistanPopulation={uzbekistanProfile.population}
            uzbekistanYear={uzbekistanProfile.year}
          />
        </div>
      </section>

      {/* 6. Detailed Country Ranking Table */}
      <DemographicRankingTable uzbekistanData={uzbekistanProfile} />

      {/* 7. Methodology & European Accessibility Transparency */}
      <MethodologyNotice />
    </div>
  );
}
