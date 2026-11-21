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
import { useTranslation } from "@/components/language";

interface HistoricalChartProps {
  profiles: CountryComparisonProfile[];
  historical: Record<DemographicIndicatorCode, HistoricalYearPoint[]>;
}

type ChartVisualizationMode = "line" | "area" | "bar";

export function HistoricalChart({ profiles, historical }: HistoricalChartProps) {
  const { t } = useTranslation();
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
          <span className="font-semibold text-foreground">{t.historical.yearLabel} {label}</span>
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
                    : t.common.na}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-border/80 bg-card/50 backdrop-blur-xl shadow-xl">
      <CardHeader className="border-b border-border/40 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 text-xs font-mono">
                {t.historical.badge}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                {t.historical.authenticatedBadge}
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
              {t.historical.title}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              {t.historical.subtitle}
            </CardDescription>
          </div>

          {/* Interactive Mode & Timeline Switchers */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Chart Mode */}
            <div className="flex items-center p-0.5 rounded-xl bg-secondary/50 border border-border/60 text-xs">
              <button
                onClick={() => setChartMode("area")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "area"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={t.historical.modeArea}
              >
                <AreaIcon className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setChartMode("line")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "line"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={t.historical.modeLine}
              >
                <LineIcon className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setChartMode("bar")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "bar"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={t.historical.modeBar}
              >
                <BarIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Scale toggle (Linear / Logarithmic) */}
            <div className="flex items-center p-0.5 rounded-xl bg-secondary/50 border border-border/60 text-xs font-mono">
              <button
                onClick={() => setScaleType("linear")}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                  scaleType === "linear"
                    ? "bg-card text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.historical.scaleLinear}
              </button>
              <button
                onClick={() => setScaleType("log")}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                  scaleType === "log"
                    ? "bg-card text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.historical.scaleLog}
              </button>
            </div>

            {/* Timeline Filter Pills */}
            <div className="flex items-center p-0.5 rounded-xl bg-secondary/50 border border-border/60 text-xs font-mono">
              <button
                onClick={() => setStartYear(1960)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  startYear === 1960
                    ? "bg-card text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.historical.filterAll}
              </button>
              <button
                onClick={() => setStartYear(1990)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  startYear === 1990
                    ? "bg-card text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.historical.filterModern}
              </button>
              <button
                onClick={() => setStartYear(2010)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  startYear === 2010
                    ? "bg-card text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.historical.filterRecent}
              </button>
            </div>

            {/* Quick CSV Export */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportSeriesCsv}
              className="h-8 px-2.5 rounded-xl border-border/80 text-xs gap-1.5"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{t.historical.exportCsv}</span>
            </Button>
          </div>
        </div>

        {/* Tab Pills for 4 Core Indicators */}
        <div className="flex flex-wrap gap-2 pt-3">
          {(
            [
              { id: "SP.POP.TOTL", label: t.centerpiece.tabPop },
              { id: "EN.POP.DNST", label: t.centerpiece.tabDnst },
              { id: "SP.POP.GROW", label: t.centerpiece.tabGrow },
              { id: "SP.URB.TOTL.IN.ZS", label: t.centerpiece.tabUrb },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20"
                  : "bg-secondary/40 text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Interactive Chart Container */}
        <div className="h-[380px] sm:h-[440px] w-full">
          {!isMounted ? (
            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
              {t.common.loading}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === "area" ? (
                <AreaChart
                  data={filteredData}
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                >
                  <defs>
                    {profiles.map((p) => (
                      <linearGradient
                        key={p.iso3}
                        id={`grad-${p.iso3}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={p.color} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={p.color} stopOpacity={0.0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    scale={scaleType}
                    domain={scaleType === "log" ? ["auto", "auto"] : [0, "auto"]}
                    tickFormatter={formatYAxisTick}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {profiles.map((p) =>
                    hiddenCountries[p.iso3] ? null : (
                      <Area
                        key={p.iso3}
                        type="monotone"
                        dataKey={p.iso3}
                        stroke={p.color}
                        strokeWidth={2}
                        fill={`url(#grad-${p.iso3})`}
                        dot={false}
                        activeDot={{ r: 5, fill: p.color, stroke: "#ffffff", strokeWidth: 1.5 }}
                      />
                    )
                  )}
                </AreaChart>
              ) : chartMode === "line" ? (
                <LineChart
                  data={filteredData}
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    scale={scaleType}
                    domain={scaleType === "log" ? ["auto", "auto"] : [0, "auto"]}
                    tickFormatter={formatYAxisTick}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {profiles.map((p) =>
                    hiddenCountries[p.iso3] ? null : (
                      <Line
                        key={p.iso3}
                        type="monotone"
                        dataKey={p.iso3}
                        stroke={p.color}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5, fill: p.color, stroke: "#ffffff", strokeWidth: 1.5 }}
                      />
                    )
                  )}
                </LineChart>
              ) : (
                <BarChart
                  data={filteredData.filter((_, idx) => idx % 5 === 0 || idx === filteredData.length - 1)}
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tickFormatter={formatYAxisTick}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {profiles.map((p) =>
                    hiddenCountries[p.iso3] ? null : (
                      <Bar
                        key={p.iso3}
                        dataKey={p.iso3}
                        fill={p.color}
                        radius={[4, 4, 0, 0]}
                      />
                    )
                  )}
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>

        {/* Interactive Custom Legend (Click to Hide/Show Country Series) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-border/40">
          <span className="text-[11px] text-muted-foreground font-mono">
            {t.historical.toggleVisibility}
          </span>
          {profiles.map((p) => {
            const isHidden = hiddenCountries[p.iso3];
            return (
              <button
                key={p.iso3}
                onClick={() => toggleCountryVisibility(p.iso3)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                  isHidden
                    ? "opacity-40 border-dashed border-border/80 bg-secondary/20 line-through"
                    : "border-border/80 bg-secondary/40 hover:bg-secondary/80 font-medium"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-foreground">{p.flag} {p.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">({p.iso3})</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
