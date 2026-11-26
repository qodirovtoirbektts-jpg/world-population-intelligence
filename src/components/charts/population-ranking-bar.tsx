"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";
import { BarChart2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/components/language";
import { getLocalizedCountryName } from "@/lib/country-names";
import { useDashboard } from "@/components/dashboard/dashboard-context";

const TOP_NATIONS_POPULATION = [
  { name: "India", iso3: "IND", pop: 1441000000, flag: "🇮🇳", isFeatured: false },
  { name: "China", iso3: "CHN", pop: 1409000000, flag: "🇨🇳", isFeatured: false },
  { name: "United States", iso3: "USA", pop: 336500000, flag: "🇺🇸", isFeatured: false },
  { name: "Indonesia", iso3: "IDN", pop: 281600000, flag: "🇮🇩", isFeatured: false },
  { name: "Pakistan", iso3: "PAK", pop: 245200000, flag: "🇵🇰", isFeatured: false },
  { name: "Nigeria", iso3: "NGA", pop: 229100000, flag: "🇳🇬", isFeatured: false },
  { name: "Brazil", iso3: "BRA", pop: 217600000, flag: "🇧🇷", isFeatured: false },
  { name: "Bangladesh", iso3: "BGD", pop: 174700000, flag: "🇧🇩", isFeatured: false },
  { name: "Russian Federation", iso3: "RUS", pop: 144200000, flag: "🇷🇺", isFeatured: false },
  { name: "Uzbekistan", iso3: "UZB", pop: 36361859, flag: "🇺🇿", isFeatured: true },
];

interface PopulationRankingBarProps {
  uzbekistanPopulation?: number;
  uzbekistanYear?: string;
}

export function PopulationRankingBar({
  uzbekistanPopulation,
  uzbekistanYear = "2024",
}: PopulationRankingBarProps) {
  const { t, language } = useTranslation();
  const { focusCountryOnGlobe } = useDashboard();
  const [activeIso, setActiveIso] = useState<string | null>(null);

  const chartData = TOP_NATIONS_POPULATION.map((nation) => {
    const localized = getLocalizedCountryName(nation.iso3, nation.name, language);
    if (nation.iso3 === "UZB" && uzbekistanPopulation) {
      return { ...nation, name: localized, pop: uzbekistanPopulation };
    }
    return { ...nation, name: localized };
  });

  const uzbCurrent = chartData.find((n) => n.iso3 === "UZB")?.pop || 36361859;

  const formatPop = (val: number) => {
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(2)}B`;
    return `${(val / 1_000_000).toFixed(1)}M`;
  };

  const handleBarClick = (entry: any) => {
    const iso = entry?.iso3 || entry?.payload?.iso3;
    const name = entry?.name || entry?.payload?.name;
    if (iso) {
      focusCountryOnGlobe(iso, name);
      const el = document.getElementById("map-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0].payload;

    return (
      <div className="rounded-xl border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-xl text-xs space-y-1 min-w-[175px]">
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
          <span>{item.flag}</span>
          <span>{item.name}</span>
          <span className="font-mono text-[10px] text-slate-400">({item.iso3})</span>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-slate-500">
          <span>{t.regional.popLabel}:</span>
          <span className="font-bold text-blue-700 dark:text-blue-400 tabular-nums">
            {formatPop(item.pop)}
          </span>
        </div>
        {item.isFeatured && (
          <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 pt-0.5">
            ★ {t.leagueTable.featuredBadge}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="editorial-card bg-white dark:bg-slate-900 flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950"
            >
              {t.regional.badge}
            </Badge>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {t.regional.barSubtitle}
            </span>
          </div>
          <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            {t.regional.barTitle}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 space-y-3">
        <div className="h-[290px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 24, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis
                type="number"
                tickFormatter={formatPop}
                tick={{ fontSize: 10, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="iso3"
                tick={{ fontSize: 11, fill: "#334155", fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                width={42}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="pop"
                radius={[0, 6, 6, 0]}
                onMouseEnter={(data: any) => setActiveIso(data?.iso3 || data?.payload?.iso3)}
                onMouseLeave={() => setActiveIso(null)}
                onClick={handleBarClick}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.iso3}
                    fill={
                      entry.isFeatured
                        ? "#0f295c"
                        : activeIso === entry.iso3
                        ? "#1d4ed8"
                        : "#60a5fa"
                    }
                    opacity={activeIso === null || activeIso === entry.iso3 ? 1 : 0.6}
                    className="transition-all duration-200 cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0f295c]" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {getLocalizedCountryName("UZB", "Uzbekistan", language)} ({uzbekistanYear}):
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300 tabular-nums">
              {formatPop(uzbCurrent)}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">{t.regional.barFootnote}</span>
        </div>
      </CardContent>
    </Card>
  );
}
