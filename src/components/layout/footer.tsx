import { Database, ShieldCheck, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-card/30 mt-16 py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-8 text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span className="font-semibold text-foreground">WORLD POPULATION INTELLIGENCE</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>Demographic Intelligence Platform</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Database className="h-3.5 w-3.5 text-blue-400" />
            <span>Official Feed: The World Bank API</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Zero Fabricated Data Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span>Next.js App Router (RSC)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
