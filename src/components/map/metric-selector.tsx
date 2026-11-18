import { Users, Compass, TrendingUp } from "lucide-react";
import { MapMetricType } from "@/types/map";
import { cn } from "@/lib/utils";

interface MetricSelectorProps {
  currentMetric: MapMetricType;
  onSelect: (metric: MapMetricType) => void;
  isLoading?: boolean;
}

const METRIC_OPTIONS: Array<{
  id: MapMetricType;
  label: string;
  code: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}> = [
  {
    id: "SP.POP.TOTL",
    label: "Total Population",
    code: "SP.POP.TOTL",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "EN.POP.DNST",
    label: "Population Density",
    code: "EN.POP.DNST",
    icon: Compass,
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "SP.POP.GROW",
    label: "Annual Growth Rate",
    code: "SP.POP.GROW",
    icon: TrendingUp,
    color: "from-amber-500 to-rose-600",
  },
];

export function MetricSelector({
  currentMetric,
  onSelect,
  isLoading = false,
}: MetricSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-secondary/40 border border-border/80 backdrop-blur-md" role="tablist" aria-label="Map Indicator Switcher">
      {METRIC_OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const isSelected = currentMetric === opt.id;

        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isSelected}
            aria-label={`${opt.label} (${opt.code})`}
            onClick={() => onSelect(opt.id)}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all select-none disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
              isSelected
                ? "bg-card text-foreground shadow-md border border-border/90 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-card/40"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-lg transition-colors",
                isSelected
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span>{opt.label}</span>
              <span className="font-mono text-[9px] text-muted-foreground">
                {opt.code}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
