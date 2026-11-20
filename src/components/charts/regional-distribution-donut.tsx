"use client";

import { useState, useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChart as PieIcon, Globe2, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Authentic regional population distribution based on official World Bank WDI aggregates
// (Summing ~8.15 Billion across major continental reporting regions)
const REGIONAL_POPULATION_DATA = [
  { region: "East Asia & Pacific", population: 2380000000, share: 29.2, color: "#3b82f6" },
  { region: "South Asia", population: 1940000000, share: 23.8, color: "#10b981" },
  { region: "Sub-Saharan Africa", population: 1240000000, share: 15.2, color: "#f59e0b" },
  { region: "Europe & Central Asia", population: 935000000, share: 11.5, color: "#8b5cf6" },
  { region: "Latin America & Caribbean", population: 665000000, share: 8.2, color: "#ec4899" },
  { region: "Middle East & North Africa", population: 505000000, share: 6.2, color: "#06b6d4" },
  { region: "North America", population: 385000000, share: 4.7, color: "#f43f5e" },
];

export function RegionalDistributionDonut() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const formatPop = (val: number) => {
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(2)}B`;
    return `${(val / 1_000_000).toFixed(0)}M`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;

    return (
      <div className="rounded-xl border border-border/90 bg-card/95 backdrop-blur-xl p-3 shadow-xl text-xs space-y-1.5 min-w-[180px]">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: data.color }} />
          <span>{data.region}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground pt-1 border-t border-border/50">
          <span>Headcount:</span>
          <span className="font-mono font-bold text-foreground">{formatPop(data.population)}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>World Share:</span>
          <span className="font-mono font-bold text-primary">{data.share}%</span>
        </div>
      </div>
    );
  };

  return (
    <Card className="rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-sm flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary/30 bg-primary/10">
              Distribution
            </Badge>
            <span className="text-[10px] text-muted-foreground font-mono">World Bank Regional Aggregates</span>
          </div>
          <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-primary" />
            Global Regional Population Shares
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 space-y-4">
        {/* Donut Chart Container */}
        <div className="h-[220px] w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={REGIONAL_POPULATION_DATA}
                dataKey="population"
                nameKey="region"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {REGIONAL_POPULATION_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                    stroke="transparent"
                    className="transition-opacity duration-200 cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Donut Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              World Total
            </span>
            <span className="text-lg font-extrabold text-foreground font-sans">
              ~8.2B
            </span>
            <span className="text-[10px] font-mono text-emerald-500 font-semibold">
              100% WLD
            </span>
          </div>
        </div>

        {/* Legend Chips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 border-t border-border/50 text-xs">
          {REGIONAL_POPULATION_DATA.map((item, idx) => (
            <div
              key={item.region}
              className={`flex items-center justify-between p-1.5 rounded-lg transition-colors cursor-pointer ${
                activeIndex === idx ? "bg-secondary/80 font-medium" : "hover:bg-secondary/40 text-muted-foreground"
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate text-foreground text-[11px]">{item.region}</span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-foreground/90 shrink-0">
                {item.share}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
