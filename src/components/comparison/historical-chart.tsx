"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Users,
  TrendingUp,
  Compass,
  Building2,
  Eye,
  EyeOff,
  Layers,
  LineChart as LineIcon,
  AreaChart as AreaIcon,
  BarChart3 as BarIcon,
  FileSpreadsheet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountryComparisonProfile, HistoricalYearPoint, ComparisonTab } from "@/types/comparison";
import { DemographicIndicatorCode } from "@/types/world-bank";
import { INDICATORS, formatIndicatorValue } from "@/lib/world-bank";
import { downloadCsv, escapeCsvField } from "@/lib/csv-export";

interface HistoricalChartProps {
  profiles: CountryComparisonProfile[];
  historical: Record<DemographicIndicatorCode, HistoricalYearPoint[]>;
}

type ChartVisualizationMode = "line" | "area" | "bar";

export function HistoricalChart({ profiles, historical }: HistoricalChartProps) {
  const [activeTab, setActiveTab] = useState<ComparisonTab>("SP.POP.TOTL");
  const [startYear, setStartYear] = useState<number>(1960);
  const [chartMode, setChartMode] = useState<ChartVisualizationMode>("area");
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

  // Direct CSV Export of active series
  const handleExportSeriesCsv = () => {
    const headers = ["Year", ...profiles.map((p) => `${escapeCsvField(p.name)} (${p.iso3})`)];
    const rows = filteredData.map((pt) => [
      pt.year,
      ...profiles.map((p) => (pt[p.iso3] !== null && pt[p.iso3] !== undefined ? pt[p.iso3] : "")),
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    downloadCsv(`historical_${activeTab}_${startYear}-2024.csv`, csvContent);
  };

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-xl border border-border/90 bg-card/95 backdrop-blur-xl p-3.5 shadow-2xl text-xs space-y-2 min-w-[210px]">
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
    <Card id="historical-section" className="rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-sm overflow-hidden scroll-mt-20">
      <CardHeader className="border-b border-border/60 pb-4 p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs font-mono">
                Historical Series: 1960 – 2024
              </Badge>
              <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground border-border/80">
                World Bank Authenticated
              </Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Dynamic Demographic Trajectories & Curves
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Multi-decade demographic shifts, urban expansion, and growth dynamics across selected sovereign nations.
            </CardDescription>
          </div>

          {/* Controls Bar: Chart Mode, Timeline Filter, Scale, Export */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Chart Mode Switcher (Line / Area / Bar) */}
            <div className="flex items-center rounded-xl border border-border/80 bg-secondary/30 p-1 text-xs" role="group" aria-label="Chart mode">
              <button
                type="button"
                onClick={() => setChartMode("area")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "area"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
                title="Area Chart (Gradient Fill)"
                aria-label="Area Chart"
              >
                <AreaIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setChartMode("line")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "line"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
                title="Line Chart"
                aria-label="Line Chart"
              >
                <LineIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setChartMode("bar")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "bar"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
                title="Bar Chart"
                aria-label="Bar Chart"
              >
                <BarIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Timeline Filter */}
            <div className="flex items-center rounded-xl border border-border/80 bg-secondary/30 p-1 text-xs" role="group" aria-label="Select timeline period">
              {[1960, 1990, 2000].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setStartYear(yr)}
                  aria-pressed={startYear === yr}
                  className={`px-2.5 py-1 rounded-lg transition-all font-mono text-[11px] ${
                    startYear === yr
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {yr}–2024
                </button>
              ))}
            </div>

            {/* Linear vs Log Scale Toggle for Population */}
            {activeTab === "SP.POP.TOTL" && (
              <Button
                variant={scaleType === "log" ? "default" : "outline"}
                size="sm"
                aria-pressed={scaleType === "log"}
                aria-label={`Toggle Y-axis scale. Currently: ${scaleType.toUpperCase()}`}
                onClick={() => setScaleType((prev) => (prev === "linear" ? "log" : "linear"))}
                className={`h-8 text-[11px] gap-1.5 px-2.5 font-mono rounded-xl transition-all ${
                  scaleType === "log"
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="h-3 w-3" aria-hidden="true" />
                <span>{scaleType.toUpperCase()}</span>
              </Button>
            )}

            {/* Direct CSV Export Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportSeriesCsv}
              className="h-8 gap-1.5 px-2.5 text-xs font-mono rounded-xl"
              title="Export this indicator's historical series as CSV"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
              <span>CSV</span>
            </Button>
          </div>
        </div>

        {/* Metric Tabs Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-4" role="tablist" aria-label="Demographic Indicator Tabs">
          <Button
            size="sm"
            role="tab"
            aria-selected={activeTab === "SP.POP.TOTL"}
            variant={activeTab === "SP.POP.TOTL" ? "default" : "outline"}
            onClick={() => setActiveTab("SP.POP.TOTL")}
            className="h-8 gap-1.5 text-xs rounded-xl"
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
            className="h-8 gap-1.5 text-xs rounded-xl"
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
            className="h-8 gap-1.5 text-xs rounded-xl"
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
            className="h-8 gap-1.5 text-xs rounded-xl"
          >
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Urban Share (%)</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        {/* Screen Reader Accessible Data Summary */}
        <div className="sr-only">
          <h4>{INDICATORS[activeTab].name} Historical Comparison Summary ({startYear} to 2024)</h4>
          <p>
            Comparing {profiles.map((p) => p.name).join(", ")}. Data points available from {startYear} through 2024.
          </p>
        </div>

        {/* Interactive Country Visibility Legend */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-5" role="group" aria-label="Toggle country line visibility">
          <span className="text-[11px] text-muted-foreground">Legend:</span>
          {profiles.map((profile) => {
            const isHidden = hiddenCountries[profile.iso3];
            return (
              <button
                key={profile.iso3}
                type="button"
                aria-pressed={!isHidden}
                aria-label={`Toggle ${profile.name} in chart, currently ${isHidden ? "hidden" : "visible"}`}
                onClick={() => toggleCountryVisibility(profile.iso3)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-medium transition-all ${
                  isHidden
                    ? "opacity-35 border-border bg-secondary/20 line-through text-muted-foreground"
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
        <div className="h-[360px] sm:h-[420px] w-full">
          {!isMounted ? (
            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
              Initializing Recharts Engine...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === "area" ? (
                <AreaChart
                  key={`${activeTab}-${scaleType}-area`}
                  data={filteredData}
                  margin={{ top: 10, right: 20, left: 15, bottom: 20 }}
                >
                  <defs>
                    {profiles.map((profile) => (
                      <linearGradient
                        key={`gradient-${profile.iso3}`}
                        id={`gradient-${profile.iso3}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={profile.color} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={profile.color} stopOpacity={0.0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} vertical={false} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} dy={10} />
                  <YAxis
                    scale={activeTab === "SP.POP.TOTL" && scaleType === "log" ? "log" : "auto"}
                    domain={
                      activeTab === "SP.POP.TOTL" && scaleType === "log"
                        ? ["dataMin", "dataMax"]
                        : activeTab === "SP.URB.TOTL.IN.ZS"
                        ? [0, 100]
                        : ["auto", "auto"]
                    }
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={formatYAxisTick}
                    dx={-5}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {profiles.map((profile) => (
                    <Area
                      key={profile.iso3}
                      type="monotone"
                      dataKey={profile.iso3}
                      name={profile.name}
                      stroke={profile.color}
                      strokeWidth={2.5}
                      fill={`url(#gradient-${profile.iso3})`}
                      hide={hiddenCountries[profile.iso3]}
                      connectNulls={false}
                    />
                  ))}
                </AreaChart>
              ) : chartMode === "bar" ? (
                <BarChart
                  key={`${activeTab}-${scaleType}-bar`}
                  data={filteredData.filter((_, idx, arr) => idx % Math.max(Math.floor(arr.length / 10), 1) === 0)}
                  margin={{ top: 10, right: 20, left: 15, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} vertical={false} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} dy={10} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={formatYAxisTick}
                    dx={-5}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {profiles.map((profile) => (
                    <Bar
                      key={profile.iso3}
                      dataKey={profile.iso3}
                      name={profile.name}
                      fill={profile.color}
                      radius={[4, 4, 0, 0]}
                      hide={hiddenCountries[profile.iso3]}
                    />
                  ))}
                </BarChart>
              ) : (
                <LineChart
                  key={`${activeTab}-${scaleType}-line`}
                  data={filteredData}
                  margin={{ top: 10, right: 20, left: 15, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} vertical={false} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} dy={10} />
                  <YAxis
                    scale={activeTab === "SP.POP.TOTL" && scaleType === "log" ? "log" : "auto"}
                    domain={
                      activeTab === "SP.POP.TOTL" && scaleType === "log"
                        ? ["dataMin", "dataMax"]
                        : activeTab === "SP.URB.TOTL.IN.ZS"
                        ? [0, 100]
                        : ["auto", "auto"]
                    }
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={formatYAxisTick}
                    dx={-5}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {profiles.map((profile) => (
                    <Line
                      key={profile.iso3}
                      type="monotone"
                      dataKey={profile.iso3}
                      name={profile.name}
                      stroke={profile.color}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6, stroke: profile.color, strokeWidth: 2 }}
                      hide={hiddenCountries[profile.iso3]}
                      connectNulls={false}
                    />
                  ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          )}
        </div>

        {/* Footnote on Zero Mock Compliance & Indicator Definitions */}
        <div className="mt-5 pt-3 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-muted-foreground gap-2">
          <span>
            Metric: <strong className="text-foreground">{INDICATORS[activeTab].name}</strong> ({activeTab})
          </span>
          <span className="font-mono text-[10px]">
            Data: The World Bank Open Data (World Development Indicators)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
