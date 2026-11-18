import { MapMetricType } from "@/types/map";

interface ColorLegendProps {
  metric: MapMetricType;
}

export function ColorLegend({ metric }: ColorLegendProps) {
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
          <span>No Data</span>
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
          <span>No Data</span>
        </div>
      </div>
    );
  }

  // Annual Growth Rate
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground bg-card/60 border border-border/80 px-4 py-2.5 rounded-xl backdrop-blur-md">
      <span className="font-semibold text-foreground">Annual Growth:</span>
      <div className="flex items-center gap-1.5">
        <span className="h-3.5 w-6 rounded-sm bg-[#ef4444]" />
        <span>&lt; 0% (Decline)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-3.5 w-6 rounded-sm bg-[#fed7aa]" />
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
        <span className="h-3.5 w-6 rounded-sm bg-[#14532d]" />
        <span>3%+</span>
      </div>
      <div className="flex items-center gap-1.5 pl-2 border-l border-border/60">
        <span className="h-3.5 w-4 rounded-sm bg-[#334155]" />
        <span>No Data</span>
      </div>
    </div>
  );
}
