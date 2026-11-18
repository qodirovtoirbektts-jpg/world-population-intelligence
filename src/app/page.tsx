import {
  Users,
  TrendingUp,
  Compass,
  Building2,
  Sparkles,
  Database,
  ArrowRight,
  GitCompare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { ApiStatusBanner } from "@/components/dashboard/api-status-banner";
import { ComparisonSection } from "@/components/comparison";
import { RoadmapTracker } from "@/components/dashboard/roadmap-tracker";
import { InteractiveWorldMap } from "@/components/map";
import { getWorldDashboardMetrics, INDICATORS } from "@/lib/world-bank";

// Enable Next.js ISR (Incremental Static Regeneration) with 24h caching
export const revalidate = 86400;

export default async function HomePage() {
  // Fetch real World Bank demographic indicators on the server
  const dashboardData = await getWorldDashboardMetrics();
  const { metrics, lastFetched, sourcePartner } = dashboardData;

  const totalPop = metrics["SP.POP.TOTL"];
  const popGrow = metrics["SP.POP.GROW"];
  const popDnst = metrics["EN.POP.DNST"];
  const urbShare = metrics["SP.URB.TOTL.IN.ZS"];

  return (
    <div className="container px-4 sm:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card/80 via-card/40 to-background/20 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-500 gap-1.5 py-1 px-3 text-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Stage 5 Complete: CSV Export, A11y & Deployment Readiness
            </Badge>
            <Badge
              variant="outline"
              className="border-border text-xs text-muted-foreground font-mono"
            >
              UTF-8 BOM CSV • WCAG 2.1 AA • Zero Mock Data
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            WORLD POPULATION <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              INTELLIGENCE
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A high-performance demographic intelligence platform designed for deep demographic analysis,
            historical population trajectories, and multi-country comparison powered exclusively by official World Bank data.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a href="#compare-section">
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white">
                <GitCompare className="h-4 w-4" />
                <span>Compare Countries (2–5)</span>
              </Button>
            </a>
            <a href="#map-section">
              <Button variant="outline" className="gap-2">
                <span>Interactive World Map</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#indicators-section">
              <Button variant="ghost" className="gap-2">
                <span>Global Indicators</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* World Bank Integration Status Banner */}
      <ApiStatusBanner
        lastFetched={lastFetched}
        sourcePartner={sourcePartner}
      />

      {/* Core Demographic Indicators Grid (Populated with Real World Bank Data) */}
      <section id="indicators-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-400" />
              Core Demographic Indicators (World Aggregate: WLD)
            </h2>
            <p className="text-sm text-muted-foreground">
              Official live metrics streamed directly from the World Bank Open Data platform.
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            Aggregate: WLD • World Bank Development Indicators
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={INDICATORS["SP.POP.TOTL"].name}
            indicatorCode="SP.POP.TOTL"
            icon={<Users className="h-5 w-5 text-blue-400" />}
            description={INDICATORS["SP.POP.TOTL"].description}
            value={totalPop.formattedValue}
            year={totalPop.year}
            source={totalPop.source}
            isAvailable={totalPop.isAvailable}
            notes={totalPop.notes}
          />

          <StatCard
            title={INDICATORS["SP.POP.GROW"].name}
            indicatorCode="SP.POP.GROW"
            icon={<TrendingUp className="h-5 w-5 text-emerald-400" />}
            description={INDICATORS["SP.POP.GROW"].description}
            value={popGrow.formattedValue}
            year={popGrow.year}
            source={popGrow.source}
            isAvailable={popGrow.isAvailable}
            notes={popGrow.notes}
          />

          <StatCard
            title={INDICATORS["EN.POP.DNST"].name}
            indicatorCode="EN.POP.DNST"
            icon={<Compass className="h-5 w-5 text-indigo-400" />}
            description={INDICATORS["EN.POP.DNST"].description}
            value={popDnst.formattedValue}
            year={popDnst.year}
            source={popDnst.source}
            isAvailable={popDnst.isAvailable}
            notes={popDnst.notes}
          />

          <StatCard
            title={INDICATORS["SP.URB.TOTL.IN.ZS"].name}
            indicatorCode="SP.URB.TOTL.IN.ZS"
            icon={<Building2 className="h-5 w-5 text-amber-400" />}
            description={INDICATORS["SP.URB.TOTL.IN.ZS"].description}
            value={urbShare.formattedValue}
            year={urbShare.year}
            source={urbShare.source}
            isAvailable={urbShare.isAvailable}
            notes={urbShare.notes}
          />
        </div>
      </section>

      {/* Stage 3: Interactive Choropleth World Map */}
      <InteractiveWorldMap />

      {/* Stage 4: Multi-Country Comparison Engine & Dynamic Historical Charts */}
      <ComparisonSection />

      {/* Engineering Roadmap & Progression Tracker */}
      <RoadmapTracker />
    </div>
  );
}
