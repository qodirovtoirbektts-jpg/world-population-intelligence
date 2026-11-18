import { MapTooltipState } from "@/types/map";

interface MapTooltipProps {
  tooltip: MapTooltipState | null;
}

export function MapTooltip({ tooltip }: MapTooltipProps) {
  if (!tooltip) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-2 transition-all duration-75"
      style={{ left: `${tooltip.x}px`, top: `${tooltip.y - 12}px` }}
    >
      <div className="rounded-xl border border-blue-500/40 bg-card/95 p-3 shadow-2xl backdrop-blur-xl text-xs space-y-1.5 min-w-[190px]">
        <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-1.5">
          <span className="font-bold text-foreground truncate max-w-[140px]">
            {tooltip.countryName}
          </span>
          <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
            {tooltip.iso3}
          </span>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-muted-foreground text-[11px]">
            <span>{tooltip.metricTitle}:</span>
            <span className="font-bold text-foreground">
              {tooltip.value}
            </span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground text-[10px]">
            <span>Reference Year:</span>
            <span className="font-mono text-foreground font-medium">
              {tooltip.year || "N/A"}
            </span>
          </div>
        </div>

        <div className="text-[9px] text-muted-foreground/70 pt-1 border-t border-border/30 flex items-center justify-between">
          <span>Click to inspect profile</span>
          <span>World Bank WDI</span>
        </div>
      </div>
    </div>
  );
}
