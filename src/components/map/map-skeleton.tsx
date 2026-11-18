import { Loader2, Globe } from "lucide-react";

export function MapSkeleton() {
  return (
    <div id="map-section" className="relative w-full h-[540px] sm:h-[620px] rounded-3xl border border-border/80 bg-card/40 flex flex-col items-center justify-center p-8 backdrop-blur-md overflow-hidden scroll-mt-20">
      {/* Background glowing radar circles */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="h-96 w-96 rounded-full border border-blue-500 animate-ping" />
        <div className="absolute h-[500px] w-[500px] rounded-full border border-indigo-500" />
      </div>

      <div className="flex flex-col items-center text-center space-y-4 max-w-md z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-blue-500/10">
          <Globe className="h-8 w-8 animate-spin text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Loading Interactive World Map...
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Streaming TopoJSON 110m vectors and authentic World Bank demographic indicators.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400/80">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Synchronizing 200+ territories</span>
        </div>
      </div>
    </div>
  );
}
