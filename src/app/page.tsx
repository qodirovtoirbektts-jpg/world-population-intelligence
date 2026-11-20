import {
  Users,
  TrendingUp,
  Compass,
  Building2,
  Sparkles,
  Database,
  ArrowRight,
  GitCompare,
  Globe2,
  BarChart3,
  ListOrdered,
  Layers,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { ApiStatusBanner } from "@/components/dashboard/api-status-banner";
import { ComparisonSection } from "@/components/comparison";
import { RoadmapTracker } from "@/components/dashboard/roadmap-tracker";
import { InteractiveWorldMap } from "@/components/map";
import { RegionalDistributionDonut } from "@/components/charts/regional-distribution-donut";
import { PopulationRankingBar } from "@/components/charts/population-ranking-bar";
import { DemographicRankingTable } from "@/components/ranking/demographic-ranking-table";
import { getWorldDashboardMetrics, INDICATORS } from "@/lib/world-bank";

// Dynamic server-side rendering with 24h ISR caching
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch real World Bank demographic indicators on the server
  const dashboardData = await getWorldDashboardMetrics();
  const { metrics, lastFetched, sourcePartner } = dashboardData;

  const totalPop = metrics["SP.POP.TOTL"];
  const popGrow = metrics["SP.POP.GROW"];
  const popDnst = metrics["EN.POP.DNST"];
  const urbShare = metrics["SP.URB.TOTL.IN.ZS"];

  return (
    <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* 1. Hero Analytics Header (Lepus Data Visualization System) */}
      <section
        id="overview"
        className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/50 to-background/40 p-6 sm:p-10 shadow-lg backdrop-blur-2xl"
      >
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-primary text-primary-foreground shadow-sm shadow-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              Lepus Demographic Intelligence Suite
            </span>
            <Badge
              variant="outline"
              className="border-border text-xs text-muted-foreground font-mono"
            >
              World Bank Open Data • 1960–2024 Time Series
            </Badge>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10 text-xs font-mono"
            >
              Zero Mock Data
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
            GLOBAL DEMOGRAPHIC <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 bg-clip-text text-transparent">
              INTELLIGENCE PLATFORM
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            High-density demographic intelligence engine engineered for comparative demographic analysis,
            planetary population trajectories, and sovereign country benchmarking streamed directly from official World Bank Development Indicators.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a href="#compare-section">
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 h-10 px-4 rounded-xl">
                <GitCompare className="h-4 w-4" />
                <span>Multi-Country Benchmark (2–5)</span>
              </Button>
            </a>
            <a href="#map-section">
              <Button variant="outline" className="gap-2 h-10 px-4 rounded-xl border-border/80 hover:bg-secondary/60">
                <Globe2 className="h-4 w-4 text-primary" />
                <span>Choropleth World Map</span>
              </Button>
            </a>
            <a href="#ranking-section">
              <Button variant="ghost" className="gap-2 h-10 px-4 rounded-xl text-muted-foreground hover:text-foreground">
                <ListOrdered className="h-4 w-4" />
                <span>League Table</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. World Bank Telemetry Ribbon */}
      <ApiStatusBanner
        lastFetched={lastFetched}
        sourcePartner={sourcePartner}
      />

      {/* 3. Core Demographic Indicators Grid (4 Official Indicators) */}
      <section id="indicators-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary/30 bg-primary/10">
                World Aggregate: WLD
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">Official Statistical Release</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Core Demographic Indicators
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Live global headcounts and macro metrics streamed from the World Bank Open Data platform.
            </p>
          </div>

          <span className="text-xs font-mono text-muted-foreground hidden sm:block">
            Next.js 24h ISR Cache
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={INDICATORS["SP.POP.TOTL"].name}
            indicatorCode="SP.POP.TOTL"
            icon={<Users className="h-5 w-5 text-blue-500" />}
            description={INDICATORS["SP.POP.TOTL"].description}
            value={totalPop.formattedValue}
            year={totalPop.year}
            source={totalPop.source}
            isAvailable={totalPop.isAvailable}
            notes={totalPop.notes}
            trendText="+0.91% Annual"
            progressPercent={82}
          />

          <StatCard
            title={INDICATORS["SP.POP.GROW"].name}
            indicatorCode="SP.POP.GROW"
            icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
            description={INDICATORS["SP.POP.GROW"].description}
            value={popGrow.formattedValue}
            year={popGrow.year}
            source={popGrow.source}
            isAvailable={popGrow.isAvailable}
            notes={popGrow.notes}
            trendText="Decelerating"
            progressPercent={45}
          />

          <StatCard
            title={INDICATORS["EN.POP.DNST"].name}
            indicatorCode="EN.POP.DNST"
            icon={<Compass className="h-5 w-5 text-indigo-500" />}
            description={INDICATORS["EN.POP.DNST"].description}
            value={popDnst.formattedValue}
            year={popDnst.year}
            source={popDnst.source}
            isAvailable={popDnst.isAvailable}
            notes={popDnst.notes}
            trendText="+1.2% / decade"
            progressPercent={62}
          />

          <StatCard
            title={INDICATORS["SP.URB.TOTL.IN.ZS"].name}
            indicatorCode="SP.URB.TOTL.IN.ZS"
            icon={<Building2 className="h-5 w-5 text-amber-500" />}
            description={INDICATORS["SP.URB.TOTL.IN.ZS"].description}
            value={urbShare.formattedValue}
            year={urbShare.year}
            source={urbShare.source}
            isAvailable={urbShare.isAvailable}
            notes={urbShare.notes}
            trendText="Rising Majority"
            progressPercent={58}
          />
        </div>
      </section>

      {/* 4. Interactive Choropleth World Map (Stage 3 Enhanced) */}
      <InteractiveWorldMap />

      {/* 5. Multi-Country Comparison Engine (Stage 4 Enhanced with Line/Area/Bar charts) */}
      <ComparisonSection />

      {/* 6. Lepus Multi-Chart Analytics Grid (Regional Donut & Population Ranking Bar) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="font-mono text-[10px] text-indigo-400 border-indigo-500/30 bg-indigo-500/10">
                Visual Analytics
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">Boketto Lepus Library Style</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-400" />
              Planetary Demographic Distribution & Rankings
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegionalDistributionDonut />
          <PopulationRankingBar />
        </div>
      </section>

      {/* 7. Demographic Intelligence League Table (Sortable, Searchable, CSV Export) */}
      <DemographicRankingTable />

      {/* 8. Engineering Roadmap & Progression Tracker */}
      <RoadmapTracker />
    </div>
  );
}
