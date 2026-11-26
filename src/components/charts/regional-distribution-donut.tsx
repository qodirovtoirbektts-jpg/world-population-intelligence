"use client";

import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorldBankRegionalItem, VERIFIED_REGIONAL_SNAPSHOT } from "@/lib/world-bank";
import { useTranslation } from "@/components/language";
import { useDashboard } from "@/components/dashboard/dashboard-context";

const REGION_COORDS: Record<string, { coords: [number, number]; scale: number }> = {
  EAS: { coords: [110, 30], scale: 360 },
  SAS: { coords: [78, 22], scale: 480 },
  SSF: { coords: [20, 0], scale: 340 },
  ECS: { coords: [40, 48], scale: 420 },
  MEA: { coords: [35, 27], scale: 440 },
  LCN: { coords: [-65, -14], scale: 330 },
  NAC: { coords: [-98, 42], scale: 340 },
};

interface RegionalDistributionDonutProps {
  data?: WorldBankRegionalItem[];
}

export function RegionalDistributionDonut({ data }: RegionalDistributionDonutProps) {
  const { t } = useTranslation();
  const { focusRegionOnGlobe } = useDashboard();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const regionalData = data && data.length > 0 ? data : VERIFIED_REGIONAL_SNAPSHOT;
  const totalPopulation = regionalData.reduce((acc, curr) => acc + curr.population, 0);

  const formatPop = (val: number) => {
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(2)}B`;
    return `${(val / 1_000_000).toFixed(0)}M`;
  };

  const getRegionName = (item: WorldBankRegionalItem) => {
    const key = item.code as keyof typeof t.regional.regions;
    if (t.regional.regions && t.regional.regions[key]) {
      return t.regional.regions[key];
    }
    return item.region;
  };

  const handleFocusRegion = (item: WorldBankRegionalItem) => {
    const target = REGION_COORDS[item.code];
    if (target) {
      focusRegionOnGlobe(target.coords, target.scale, getRegionName(item));
      const el = document.getElementById("map-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0].payload;
    const regionName = getRegionName(item);

    return (
      <div className="rounded-xl border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-xl text-xs space-y-1.5 min-w-[190px]">
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
          <span>{regionName}</span>
        </div>
        <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span>{t.regional.headcountLabel}:</span>
          <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {formatPop(item.population)}
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-500">
          <span>{t.regional.shareLabel}:</span>
          <span className="font-bold text-blue-700 dark:text-blue-400 tabular-nums">
            {item.share}%
          </span>
        </div>
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
              {t.regional.donutSubtitle}
            </span>
          </div>
          <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            {t.regional.donutTitle}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 space-y-4">
        <div className="h-[220px] w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={regionalData}
                dataKey="population"
                nameKey="region"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={95}
                paddingAngle={2}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={(_, index) => {
                  const target = regionalData[index];
                  if (target) handleFocusRegion(target);
                }}
              >
                {regionalData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.45}
                    stroke="#ffffff"
                    strokeWidth={1.5}
                    className="transition-opacity duration-200 cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">
              {t.regional.donutCenterTitle}
            </span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
              {formatPop(totalPopulation)}
            </span>
            <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-400">
              100% WLD
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          {regionalData.map((item, idx) => {
            const regionName = getRegionName(item);
            return (
              <button
                key={item.region}
                type="button"
                onClick={() => handleFocusRegion(item)}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer text-left ${
                  activeIndex === idx
                    ? "bg-blue-50 dark:bg-blue-950/60 font-semibold"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-slate-800 dark:text-slate-200 text-[11px]">
                    {regionName}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold text-blue-700 dark:text-blue-300 shrink-0 tabular-nums pl-2">
                  {item.share}%
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
