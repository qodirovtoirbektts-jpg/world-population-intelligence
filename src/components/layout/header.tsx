import Link from "next/link";
import { Globe, BarChart3, Map, GitCompare, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label="WORLD POPULATION INTELLIGENCE Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20">
            <Globe className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-foreground text-sm sm:text-base">
              WORLD POPULATION INTELLIGENCE
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline-block">
              Global Demographic Analytics Platform
            </span>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium" aria-label="Main Navigation">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-primary bg-primary/10 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="#map-section"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <Map className="h-4 w-4" aria-hidden="true" />
            <span>World Map</span>
          </Link>
          <Link
            href="#compare-section"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <GitCompare className="h-4 w-4" aria-hidden="true" />
            <span>Compare</span>
          </Link>
          <Link
            href="#roadmap-section"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <Layers className="h-4 w-4" aria-hidden="true" />
            <span>Roadmap</span>
          </Link>
        </nav>

        {/* Right side status / Language badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border/80 bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-medium text-emerald-400">Next.js 14 Active</span>
          </div>

          <Badge variant="secondary" className="font-mono text-[11px] px-2 py-0.5">
            EN <span className="opacity-40 mx-1">|</span> UZ <span className="opacity-40 mx-1">|</span> RU
          </Badge>
        </div>
      </div>
    </header>
  );
}
