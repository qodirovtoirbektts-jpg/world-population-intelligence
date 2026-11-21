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

// Real World Bank 2024 population totals for top benchmark nations + Uzbekistan
const TOP_NATIONS_POPULATION = [
  { name: "India", iso3: "IND", pop: 1441000000, flag: "🇮🇳", isFeatured: false },
  { name: "China", iso3: "CHN", pop: 1409000000, flag: "🇨🇳", isFeatured: false },
  { name: "United States", iso3: "USA", pop: 336500000, flag: "🇺🇸", isFeatured: false },
  { name: "Indonesia", iso3: "IDN", pop: 281600000, flag: "🇮🇩", isFeatured: false },
  { name: "Pakistan", iso3: "PAK", pop: 245200000, flag: "🇵🇰", isFeatured: false },
  { name: "Nigeria", iso3: "NGA", pop: 229100000, flag: "🇳🇬", isFeatured: false },
  { name: "Brazil", iso3: "BRA", pop: 217600000, flag: "🇧🇷", isFeatured: false },
  { name: "Bangladesh", iso3: "BGD", pop: 174700000, flag: "🇧🇩", isFeatured: false },
  { name: "Russian Fed.", iso3: "RUS", pop: 144200000, flag: "🇷🇺", isFeatured: false },
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
  const [activeIso, setActiveIso] = useState<string | null>(null);

  const getCountryName = (iso3: string, defaultName: string) => {
    if (iso3 === "UZB") {
      if (language === "ru") return "Узбекистан";
      if (language === "uz") return "Oʻzbekiston";
    }
    return defaultName;
  };

  const chartData = TOP_NATIONS_POPULATION.map((nation) => {
    const updated = { ...nation, name: getCountryName(nation.iso3, nation.name) };
    if (nation.iso3 === "UZB" && uzbekistanPopulation) {
      return { ...updated, pop: uzbekistanPopulation };
    }
    return updated;
  });

  const uzbCurrent = chartData.find((n) => n.iso3 === "UZB")?.pop || 36361859;

  const formatPop = (val: number) => {
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(2)}B`;
    return `${(val / 1_000_000).toFixed(1)}M`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0].payload;

    return (
      <div className="rounded-xl border border-border/90 bg-card/95 backdrop-blur-xl p-3 shadow-xl text-xs space-y-1 min-w-[160px]">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span>{item.flag}</span>
          <span>{item.name}</span>
          <span className="font-mono text-[10px] text-muted-foreground">({item.iso3})</span>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-border/50 text-muted-foreground">
          <span>Population:</span>
          <span className="font-mono font-bold text-primary">{formatPop(item.pop)}</span>
        </div>
        {item.isFeatured && (
          <div className="text-[10px] font-mono text-emerald-500 font-semibold pt-0.5">
            ★ {t.leagueTable.featuredBadge}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-sm flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px] text-emerald-500 border-emerald-500/30 bg-emerald-500/10">
              {t.regional.badge}
            </Badge>
            <span className="text-[10px] text-muted-foreground font-mono">{t.regional.barSubtitle}</span>
          </div>
          <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-emerald-500" />
            {t.regional.barTitle}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                type="number"
                tickFormatter={formatPop}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="iso3"
                tick={{ fontSize: 11, fill: "hsl(var(--foreground))", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="pop"
                radius={[0, 6, 6, 0]}
                onMouseEnter={(data: any) => setActiveIso(data?.iso3 || data?.payload?.iso3)}
                onMouseLeave={() => setActiveIso(null)}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.iso3}
                    fill={entry.isFeatured ? "#10b981" : activeIso === entry.iso3 ? "#6366f1" : "#3b82f6"}
                    opacity={activeIso === null || activeIso === entry.iso3 ? 1 : 0.6}
                    className="transition-all duration-200 cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footnote displaying Uzbekistan live verification */}
        <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-foreground">
              {getCountryName("UZB", "Uzbekistan")} ({uzbekistanYear}):
            </span>
            <span className="font-mono text-emerald-500 font-bold">
              {formatPop(uzbCurrent)}
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            {t.regional.barFootnote}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
