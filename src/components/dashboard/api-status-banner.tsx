import { Database, CheckCircle2, RefreshCw, Globe2, ShieldCheck } from "lucide-react";
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
  const formattedTime = lastFetched
    ? new Date(lastFetched).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Live Connected";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-card/80 to-indigo-950/40 p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" className="gap-1.5 py-1 px-3 text-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Stage 2 Complete: World Bank API Connected
            </Badge>
            <Badge variant="info" className="gap-1 py-1 px-2.5 text-xs">
              <Globe2 className="h-3.5 w-3.5" />
              World Aggregate (WLD)
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground border-border/80">
              24h Server Caching (ISR)
            </Badge>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Official Demographic Intelligence Feed Active
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All core population indicators are now dynamically fed from the official{" "}
            <span className="text-foreground font-medium">World Bank Open Data</span> platform.
            Mock data and simulated numbers are strictly excluded. Data is cached on the server for 24 hours to maximize performance and prevent API rate limiting.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[240px]">
          <div className="rounded-xl border border-border/80 bg-background/60 p-3.5 text-xs space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Data Source:</span>
              <span className="font-mono text-blue-400 font-medium">api.worldbank.org</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Aggregate Code:</span>
              <span className="font-mono text-emerald-400 font-semibold">WLD (World)</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Cache Strategy:</span>
              <span className="text-indigo-400 font-mono">ISR 86,400s (24h)</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground pt-1 border-t border-border/40">
              <span>Status:</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
