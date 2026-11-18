"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Users, TrendingUp, Compass, Building2, Eye, EyeOff, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountryComparisonProfile, HistoricalYearPoint, ComparisonTab } from "@/types/comparison";
import { DemographicIndicatorCode } from "@/types/world-bank";
import { INDICATORS, formatIndicatorValue } from "@/lib/world-bank";

interface HistoricalChartProps {
  profiles: CountryComparisonProfile[];
  historical: Record<DemographicIndicatorCode, HistoricalYearPoint[]>;
}

export function HistoricalChart({ profiles, historical }: HistoricalChartProps) {
  const [activeTab, setActiveTab] = useState<ComparisonTab>("SP.POP.TOTL");
  const [startYear, setStartYear] = useState<number>(1960);
  const [hiddenCountries, setHiddenCountries] = useState<Record<string, boolean>>({});
  const [scaleType, setScaleType] = useState<"linear" | "log">("linear");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter historical points by startYear
  const filteredData = useMemo(() => {
    const raw = historical[activeTab] || [];
    return raw.filter((d) => d.year >= startYear);
  }, [historical, activeTab, startYear]);

  // Toggle country visibility on legend click
  const toggleCountryVisibility = (iso3: string) => {
    setHiddenCountries((prev) => ({
      ...prev,
      [iso3]: !prev[iso3],
    }));
  };

  // Format axis ticks
  const formatYAxisTick = (val: number) => {
    if (activeTab === "SP.POP.TOTL") {
      if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)}B`;
      if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)}M`;
      if (val >= 1_000) return `${(val / 1_000).toFixed(0)}K`;
      return String(val);
    }
    if (activeTab === "SP.POP.GROW") {
      return `${val.toFixed(1)}%`;
    }
    if (activeTab === "SP.URB.TOTL.IN.ZS") {
      return `${val.toFixed(0)}%`;
    }
    if (activeTab === "EN.POP.DNST") {
      return `${val.toFixed(0)}`;
    }
    return String(val);
  };

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-xl border border-border/90 bg-card/95 backdrop-blur-xl p-3.5 shadow-2xl text-xs space-y-2 min-w-[200px]">
        <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
          <span className="font-semibold text-foreground">Year {label}</span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {INDICATORS[activeTab].name}
          </span>
        </div>

        <div className="space-y-1.5">
          {payload.map((entry: any) => {
            const iso3 = entry.dataKey;
            const profile = profiles.find((p) => p.iso3 === iso3);
            const val = entry.value;

            return (
              <div key={iso3} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="font-medium text-foreground">
                    {profile?.name || iso3}
                  </span>
                </div>
                <span className="font-mono font-semibold text-foreground">
                  {val !== null && val !== undefined
                    ? formatIndicatorValue(activeTab, val)
                    : "No data"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xl shadow-xl overflow-hidden">
      <CardHeader className="border-b border-border/40 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                Historical Series: 1960 – 2024
              </Badge>
              <Badge variant="secondary" className="text-[11px] font-mono">
                Recharts SVG Engine
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Dynamic Demographic Trajectories & Comparative Curves
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Analyze multi-decade population growth, urban transitions, and densities based on official World Bank historical data.
            </CardDescription>
          </div>

          {/* Time Span & Scale Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Timeline Filter */}
            <div className="flex items-center rounded-lg border border-border bg-secondary/30 p-0.5 text-xs" role="group" aria-label="Select timeline period">
              <button
                type="button"
                onClick={() => setStartYear(1960)}
                aria-pressed={startYear === 1960}
                className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                  startYear === 1960
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                1960–2024
              </button>
              <button
                type="button"
                onClick={() => setStartYear(1990)}
                aria-pressed={startYear === 1990}
                className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                  startYear === 1990
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                1990–2024
              </button>
              <button
                type="button"
                onClick={() => setStartYear(2000)}
                aria-pressed={startYear === 2000}
                className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                  startYear === 2000
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                2000–2024
              </button>
            </div>

            {/* Linear vs Log Scale Toggle for Population */}
            {activeTab === "SP.POP.TOTL" && (
              <Button
                variant={scaleType === "log" ? "default" : "outline"}
                size="sm"
                aria-pressed={scaleType === "log"}
                aria-label={`Toggle Y-axis scale. Currently: ${scaleType.toUpperCase()}`}
                onClick={() => setScaleType((prev) => (prev === "linear" ? "log" : "linear"))}
                className={`h-7 text-[11px] gap-1.5 px-2.5 font-mono transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                  scaleType === "log"
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="h-3 w-3" aria-hidden="true" />
                <span>Scale: {scaleType.toUpperCase()}</span>
              </Button>
            )}
          </div>
        </div>

        {/* Metric Tabs Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-3" role="tablist" aria-label="Demographic Indicator Tabs">
          <Button
            size="sm"
            role="tab"
            aria-selected={activeTab === "SP.POP.TOTL"}
            variant={activeTab === "SP.POP.TOTL" ? "default" : "outline"}
            onClick={() => setActiveTab("SP.POP.TOTL")}
            className="h-8 gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Total Population</span>
          </Button>

          <Button
            size="sm"
            role="tab"
            aria-selected={activeTab === "EN.POP.DNST"}
            variant={activeTab === "EN.POP.DNST" ? "default" : "outline"}
            onClick={() => setActiveTab("EN.POP.DNST")}
            className="h-8 gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Population Density</span>
          </Button>

          <Button
            size="sm"
            role="tab"
            aria-selected={activeTab === "SP.POP.GROW"}
            variant={activeTab === "SP.POP.GROW" ? "default" : "outline"}
            onClick={() => setActiveTab("SP.POP.GROW")}
            className="h-8 gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Growth Rate (%)</span>
          </Button>

          <Button
            size="sm"
            role="tab"
            aria-selected={activeTab === "SP.URB.TOTL.IN.ZS"}
            variant={activeTab === "SP.URB.TOTL.IN.ZS" ? "default" : "outline"}
            onClick={() => setActiveTab("SP.URB.TOTL.IN.ZS")}
            className="h-8 gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Urban Share (%)</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Screen Reader Accessible Data Summary */}
        <div className="sr-only">
          <h4>{INDICATORS[activeTab].name} Historical Comparison Summary ({startYear} to 2024)</h4>
          <p>
            Comparing {profiles.map((p) => p.name).join(", ")}. Data points available from {startYear} through 2024.
            Download CSV via Export button for complete tabulations.
          </p>
        </div>

        {/* Interactive Country Visibility Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 pb-4" role="group" aria-label="Toggle country line visibility">
          <span className="text-[11px] text-muted-foreground" aria-hidden="true">Click country to show/hide:</span>
          {profiles.map((profile) => {
            const isHidden = hiddenCountries[profile.iso3];
            return (
              <button
                key={profile.iso3}
                type="button"
                aria-pressed={!isHidden}
                aria-label={`Toggle ${profile.name} line in chart, currently ${isHidden ? "hidden" : "visible"}`}
                onClick={() => toggleCountryVisibility(profile.iso3)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                  isHidden
                    ? "opacity-40 border-border bg-secondary/20 line-through text-muted-foreground"
                    : "border-border/80 bg-secondary/50 text-foreground shadow-sm"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: profile.color }}
                  aria-hidden="true"
                />
                <span aria-hidden="true">{profile.flag}</span>
                <span>{profile.name}</span>
                {isHidden ? (
                  <EyeOff className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <Eye className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Chart Viewport */}
        <div className="h-[340px] sm:h-[400px] w-full">
          {!isMounted ? (
            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
              Initializing Recharts Engine...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                key={`${activeTab}-${scaleType}`}
                data={filteredData}
                margin={{ top: 10, right: 20, left: 15, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                  opacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  scale={activeTab === "SP.POP.TOTL" && scaleType === "log" ? "log" : "auto"}
                  domain={
                    activeTab === "SP.POP.TOTL" && scaleType === "log"
                      ? ["dataMin", "dataMax"]
                      : activeTab === "SP.URB.TOTL.IN.ZS"
                      ? [0, 100]
                      : ["auto", "auto"]
                  }
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={formatYAxisTick}
                  dx={-5}
                />
                <Tooltip content={<CustomTooltip />} />
                {profiles.map((profile) => {
                  const isHidden = hiddenCountries[profile.iso3];
                  return (
                    <Line
                      key={profile.iso3}
                      type="monotone"
                      dataKey={profile.iso3}
                      name={profile.name}
                      stroke={profile.color}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6, stroke: profile.color, strokeWidth: 2 }}
                      hide={isHidden}
                      connectNulls={false}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Footnote on Zero Mock Compliance & Indicator Definitions */}
        <div className="mt-4 pt-3 border-t border-border/30 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-muted-foreground gap-1">
          <span>
            Indicator: <strong className="text-foreground">{INDICATORS[activeTab].name}</strong> ({activeTab})
          </span>
          <span className="font-mono">
            Source: World Bank Development Indicators (Official Series)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
