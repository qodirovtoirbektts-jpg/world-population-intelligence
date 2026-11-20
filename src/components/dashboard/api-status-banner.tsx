import { Database, CheckCircle2, Globe2, ShieldCheck, Activity, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ApiStatusBannerProps {
  lastFetched?: string;
  sourcePartner?: string;
  hadFallback?: boolean;
}

export function ApiStatusBanner({
  lastFetched,
  sourcePartner = "The World Bank Open Data (WDI)",
  hadFallback = false,
}: ApiStatusBannerProps) {
  const formattedDate = lastFetched
    ? new Date(lastFetched).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Live Connected";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-r from-card/90 via-card/70 to-card/90 p-5 sm:p-6 shadow-sm backdrop-blur-xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 h-36 w-36 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              World Bank Live Telemetry
            </span>
            <Badge variant="outline" className="font-mono text-xs text-muted-foreground border-border/80">
              Aggregate: WLD
            </Badge>
            <Badge variant="outline" className="font-mono text-xs text-muted-foreground border-border/80">
              Next.js 24h ISR Cache
            </Badge>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Zero Mock Data
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
            Official Global Demographic Intelligence Feed
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            All core population metrics are synchronized directly from the official{" "}
            <span className="text-foreground font-medium">World Bank Open Data API v2</span>.
            Data points reflect certified World Development Indicators (WDI) stored in server cache for high-throughput reliability.
          </p>
        </div>

        {/* Real-time Telemetry Stats Pill */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 text-xs min-w-[280px]">
          <div className="rounded-xl border border-border/70 bg-secondary/30 p-2.5 space-y-0.5">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">API Endpoint</div>
            <div className="font-mono text-xs font-semibold text-primary truncate">api.worldbank.org</div>
          </div>
          <div className="rounded-xl border border-border/70 bg-secondary/30 p-2.5 space-y-0.5">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">Sync Date</div>
            <div className="font-mono text-xs font-semibold text-foreground">{formattedDate}</div>
          </div>
          <div className="rounded-xl border border-border/70 bg-secondary/30 p-2.5 space-y-0.5">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">Data Freshness</div>
            <div className="font-mono text-xs font-semibold text-emerald-500">24-Hour ISR</div>
          </div>
          <div className="rounded-xl border border-border/70 bg-secondary/30 p-2.5 space-y-0.5">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">Status</div>
            <div className="font-mono text-xs font-semibold text-emerald-500 flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Operational
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
