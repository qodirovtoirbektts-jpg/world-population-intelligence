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
import { formatIndicatorValue } from "@/lib/world-bank";
import { downloadCsv, escapeCsvField } from "@/lib/csv-export";
import { getLocalizedCountryName } from "@/lib/country-names";
import { useTranslation } from "@/components/language";

interface HistoricalChartProps {
  profiles: CountryComparisonProfile[];
  historical: Record<DemographicIndicatorCode, HistoricalYearPoint[]>;
}

type ChartVisualizationMode = "line" | "area" | "bar";

export function HistoricalChart({ profiles, historical }: HistoricalChartProps) {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<ComparisonTab>("SP.POP.TOTL");
  const [startYear, setStartYear] = useState<number>(1960);
  const [chartMode, setChartMode] = useState<ChartVisualizationMode>("area");
  const [hiddenCountries, setHiddenCountries] = useState<Record<string, boolean>>({});
  const [scaleType, setScaleType] = useState<"linear" | "log">("linear");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredData = useMemo(() => {
    const raw = historical[activeTab] || [];
    return raw.filter((d) => d.year >= startYear);
  }, [historical, activeTab, startYear]);

  const toggleCountryVisibility = (iso3: string) => {
    setHiddenCountries((prev) => ({
      ...prev,
      [iso3]: !prev[iso3],
    }));
  };

  const activeTabLabel =
    activeTab === "SP.POP.TOTL"
      ? t.centerpiece.tabPop
      : activeTab === "EN.POP.DNST"
      ? t.centerpiece.tabDnst
      : activeTab === "SP.POP.GROW"
      ? t.centerpiece.tabGrow
      : t.centerpiece.tabUrb;

  const formatYAxisTick = (val: number) => {
    if (activeTab === "SP.POP.TOTL") {
      if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)}B`;
      if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)}M`;
      if (val >= 1_000) return `${(val / 1_000).toFixed(0)}K`;
      return String(val);
    }
    if (activeTab === "SP.POP.GROW") return `${val.toFixed(1)}%`;
    if (activeTab === "SP.URB.TOTL.IN.ZS") return `${val.toFixed(0)}%`;
    if (activeTab === "EN.POP.DNST") return `${val.toFixed(0)}`;
    return String(val);
  };

  const handleExportSeriesCsv = () => {
    const headers = [
      "Year",
      ...profiles.map((p) => `${p.name} (${p.iso3})`),
    ];
    const rows = filteredData.map((pt) => [
      pt.year,
      ...profiles.map((p) => escapeCsvField(pt[p.iso3] ?? "")),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    downloadCsv(
      `world-population-historical_${startYear}-2024_${new Date().toISOString().split("T")[0]}.csv`,
      csv
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-xl border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3.5 shadow-xl text-xs space-y-2 min-w-[210px]">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
          <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {t.historical.yearLabel}: {label}
          </span>
          <span className="text-[11px] font-medium text-blue-700 dark:text-blue-300">
            {activeTabLabel}
          </span>
        </div>

        <div className="space-y-1.5">
          {payload.map((entry: any) => {
            const iso3 = entry.dataKey;
            const profile = profiles.find((p) => p.iso3 === iso3);
            const val = entry.value;
            const displayName = getLocalizedCountryName(
              iso3,
              profile?.name || iso3,
              language
            );

            return (
              <div key={iso3} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {displayName}
                  </span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
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
    <Card
      id="historical-section"
      className="editorial-card bg-white dark:bg-slate-900 overflow-hidden scroll-mt-20"
    >
      <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-semibold"
              >
                {t.historical.badge}
              </Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {t.historical.authenticatedBadge}
              </span>
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              {t.historical.title}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.historical.subtitle}
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Chart Mode */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setChartMode("area")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "area"
                    ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title={t.historical.modeArea}
                aria-label={t.historical.modeArea}
              >
                <AreaIcon className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setChartMode("line")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "line"
                    ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title={t.historical.modeLine}
                aria-label={t.historical.modeLine}
              >
                <LineIcon className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setChartMode("bar")}
                className={`p-1.5 rounded-lg transition-all ${
                  chartMode === "bar"
                    ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title={t.historical.modeBar}
                aria-label={t.historical.modeBar}
              >
                <BarIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Linear / Log Scale */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setScaleType("linear")}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  scaleType === "linear"
                    ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {t.historical.scaleLinear}
              </button>
              <button
                type="button"
                onClick={() => setScaleType("log")}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  scaleType === "log"
                    ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {t.historical.scaleLog}
              </button>
            </div>

            {/* Time Span */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              {[
                { yr: 1960, label: t.historical.filterAll },
                { yr: 1990, label: t.historical.filterModern },
                { yr: 2010, label: t.historical.filterRecent },
              ].map((item) => (
                <button
                  key={item.yr}
                  type="button"
                  onClick={() => setStartYear(item.yr)}
                  className={`px-2.5 py-1 rounded-lg transition-all text-[11px] tabular-nums ${
                    startYear === item.yr
                      ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm font-semibold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportSeriesCsv}
              className="h-8 px-2.5 rounded-xl border-slate-200 dark:border-slate-700 text-xs gap-1.5 text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-blue-700" />
              <span className="hidden sm:inline">{t.historical.exportCsv}</span>
            </Button>
          </div>
        </div>

        {/* Indicator Tabs */}
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
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-700 text-white font-semibold shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-[340px] sm:h-[420px] w-full">
          {!isMounted ? (
            <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">
              {t.common.loading}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === "area" ? (
                <AreaChart
                  data={filteredData}
                  margin={{ top: 10, right: 16, left: 10, bottom: 16 }}
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
                        <stop offset="5%" stopColor={p.color} stopOpacity={0.22} />
                        <stop offset="95%" stopColor={p.color} stopOpacity={0.01} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={{ stroke: "#cbd5e1" }}
                  />
                  <YAxis
                    scale={scaleType}
                    domain={scaleType === "log" ? ["auto", "auto"] : [0, "auto"]}
                    tickFormatter={formatYAxisTick}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={{ stroke: "#cbd5e1" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {profiles.map((p) =>
                    hiddenCountries[p.iso3] ? null : (
                      <Area
                        key={p.iso3}
                        type="monotone"
                        dataKey={p.iso3}
                        stroke={p.color}
                        strokeWidth={2.25}
                        fill={`url(#grad-${p.iso3})`}
                        dot={false}
                        activeDot={{ r: 5, fill: p.color, stroke: "#ffffff", strokeWidth: 2 }}
                      />
                    )
                  )}
                </AreaChart>
              ) : chartMode === "line" ? (
                <LineChart
                  data={filteredData}
                  margin={{ top: 10, right: 16, left: 10, bottom: 16 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={{ stroke: "#cbd5e1" }}
                  />
                  <YAxis
                    scale={scaleType}
                    domain={scaleType === "log" ? ["auto", "auto"] : [0, "auto"]}
                    tickFormatter={formatYAxisTick}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={{ stroke: "#cbd5e1" }}
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
                        activeDot={{ r: 5, fill: p.color, stroke: "#ffffff", strokeWidth: 2 }}
                      />
                    )
                  )}
                </LineChart>
              ) : (
                <BarChart
                  data={filteredData.filter(
                    (_, idx) => idx % 5 === 0 || idx === filteredData.length - 1
                  )}
                  margin={{ top: 10, right: 16, left: 10, bottom: 16 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={{ stroke: "#cbd5e1" }}
                  />
                  <YAxis
                    tickFormatter={formatYAxisTick}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={{ stroke: "#cbd5e1" }}
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

        {/* Custom Interactive Legend */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {t.historical.toggleVisibility}
          </span>
          {profiles.map((p) => {
            const isHidden = hiddenCountries[p.iso3];
            const displayName = getLocalizedCountryName(p.iso3, p.name, language);
            return (
              <button
                key={p.iso3}
                type="button"
                onClick={() => toggleCountryVisibility(p.iso3)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border transition-all ${
                  isHidden
                    ? "opacity-45 border-dashed border-slate-300 bg-slate-50 line-through"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 font-medium"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-slate-900 dark:text-slate-100">
                  {p.flag} {displayName}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{p.iso3}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
