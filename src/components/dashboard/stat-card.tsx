import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Database, CheckCircle2, AlertTriangle, TrendingUp, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/components/language";

interface StatCardProps {
  title: string;
  indicatorCode: string;
  icon: React.ReactNode;
  description: string;
  value: string;
  year?: string | null;
  source?: string;
  isAvailable?: boolean;
  notes?: string;
  trendText?: string;
  progressPercent?: number;
  className?: string;
}

export function StatCard({
  title,
  indicatorCode,
  icon,
  description,
  value,
  year,
  source = "World Bank WDI",
  isAvailable = true,
  notes,
  trendText,
  progressPercent,
  className,
}: StatCardProps) {
  const { t } = useTranslation();

  // Derive default Lepus trend badge if not provided
  const derivedTrend = trendText || (
    indicatorCode === "SP.POP.GROW"
      ? t.kpi.popGrow.trendText
      : indicatorCode === "SP.URB.TOTL.IN.ZS"
      ? t.kpi.popUrb.trendText
      : indicatorCode === "EN.POP.DNST"
      ? t.kpi.popDnst.trendText
      : t.kpi.popTotal.trendText
  );

  return (
    <Card
      className={cn(
        "relative overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg bg-card/80 backdrop-blur-xl border border-border/80 rounded-2xl flex flex-col justify-between",
        className
      )}
    >
      {/* Top ambient color streak */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 sm:px-5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground font-medium">
              {indicatorCode}
            </span>
            <CardTitle className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1">
              {title}
            </CardTitle>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/70 text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0 shadow-sm">
            {icon}
          </div>
        </CardHeader>

        <CardContent className="space-y-3 px-4 sm:px-5 pb-4">
          {/* Main KPI Display */}
          <div className="space-y-1">
            <div className="flex items-baseline justify-between gap-2">
              {isAvailable ? (
                <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-foreground font-sans tabular-nums">
                  {value}
                </span>
              ) : (
                <div className="flex items-center gap-1.5 text-amber-500 text-sm font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{t.common.dataPending}</span>
                </div>
              )}

              <Badge
                variant="outline"
                className="font-mono text-[10px] text-muted-foreground border-border/80 bg-muted/40 shrink-0"
              >
                {indicatorCode}
              </Badge>
            </div>

            {/* Lepus Trend Pill */}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <ArrowUpRight className="h-3 w-3" />
                <span>{derivedTrend}</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Micro Visual Progress / Scale Meter */}
          {progressPercent !== undefined && (
            <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(progressPercent, 5), 100)}%` }}
              />
            </div>
          )}
        </CardContent>
      </div>

      {/* Card Footer: Reference Year, Source & Live Verification */}
      <div className="px-4 sm:px-5 py-3 border-t border-border/60 bg-muted/20 flex items-center justify-between text-[11px] text-muted-foreground rounded-b-2xl">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-primary" />
          <span>{t.common.referenceYear}:</span>
          <span className="font-semibold text-foreground font-mono">
            {year || t.common.na}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px]">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span className="font-medium text-muted-foreground truncate max-w-[110px]" title={source}>
            {source}
          </span>
        </div>
      </div>
    </Card>
  );
}
