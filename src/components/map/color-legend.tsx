"use client";

import { MapMetricType } from "@/types/map";
import { useTranslation } from "@/components/language";

interface ColorLegendProps {
  metric: MapMetricType;
}

export function ColorLegend({ metric }: ColorLegendProps) {
  const { t } = useTranslation();

  if (metric === "SP.POP.TOTL") {
    return (
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground bg-card/60 border border-border/80 px-4 py-2.5 rounded-xl backdrop-blur-md">
        <span className="font-semibold text-foreground">Population Scale:</span>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#dbeafe] border border-black/20" />
          <span>&lt; 5M</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#93c5fd] border border-black/20" />
          <span>5M - 25M</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#3b82f6] border border-black/20" />
          <span>25M - 100M</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#1d4ed8] border border-black/20" />
          <span>100M - 500M</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#1e1b4b] border border-black/20" />
          <span>500M+</span>
        </div>
        <div className="flex items-center gap-1.5 pl-2 border-l border-border/60">
          <span className="h-3.5 w-4 rounded-sm bg-[#334155]" />
          <span>{t.centerpiece.legendNoData}</span>
        </div>
      </div>
    );
  }

  if (metric === "EN.POP.DNST") {
    return (
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground bg-card/60 border border-border/80 px-4 py-2.5 rounded-xl backdrop-blur-md">
        <span className="font-semibold text-foreground">Density (/ km²):</span>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#ccfbf1]" />
          <span>&lt; 25</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#5eead4]" />
          <span>25 - 75</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#14b8a6]" />
          <span>75 - 150</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#0f766e]" />
          <span>150 - 350</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#042f2e]" />
          <span>350+</span>
        </div>
        <div className="flex items-center gap-1.5 pl-2 border-l border-border/60">
          <span className="h-3.5 w-4 rounded-sm bg-[#334155]" />
          <span>{t.centerpiece.legendNoData}</span>
        </div>
      </div>
    );
  }

  if (metric === "SP.URB.TOTL.IN.ZS") {
    return (
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground bg-card/60 border border-border/80 px-4 py-2.5 rounded-xl backdrop-blur-md">
        <span className="font-semibold text-foreground">Urban Share (%):</span>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#fef3c7]" />
          <span>&lt; 30%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#fde047]" />
          <span>30% - 50%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#f59e0b]" />
          <span>50% - 70%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#d97706]" />
          <span>70% - 85%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-6 rounded-sm bg-[#78350f]" />
          <span>85%+</span>
        </div>
        <div className="flex items-center gap-1.5 pl-2 border-l border-border/60">
          <span className="h-3.5 w-4 rounded-sm bg-[#334155]" />
          <span>{t.centerpiece.legendNoData}</span>
        </div>
      </div>
    );
  }

  // Growth Rate
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground bg-card/60 border border-border/80 px-4 py-2.5 rounded-xl backdrop-blur-md">
      <span className="font-semibold text-foreground">Growth Rate (%):</span>
      <div className="flex items-center gap-1.5">
        <span className="h-3.5 w-6 rounded-sm bg-[#f43f5e]" />
        <span>&lt; 0%</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-3.5 w-6 rounded-sm bg-[#fdba74]" />
        <span>0% - 1%</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-3.5 w-6 rounded-sm bg-[#86efac]" />
        <span>1% - 2%</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-3.5 w-6 rounded-sm bg-[#22c55e]" />
        <span>2% - 3%</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-3.5 w-6 rounded-sm bg-[#15803d]" />
        <span>3%+</span>
      </div>
      <div className="flex items-center gap-1.5 pl-2 border-l border-border/60">
        <span className="h-3.5 w-4 rounded-sm bg-[#334155]" />
        <span>{t.centerpiece.legendNoData}</span>
      </div>
    </div>
  );
}
