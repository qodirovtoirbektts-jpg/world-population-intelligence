"use client";

import { AlertTriangle, Calendar, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  isAvailable = true,
  trendText,
  progressPercent,
  className,
}: StatCardProps) {
  const { t } = useTranslation();

  const derivedTrend =
    trendText ||
    (indicatorCode === "SP.POP.GROW"
      ? t.kpi.popGrow.trendText
      : indicatorCode === "SP.URB.TOTL.IN.ZS"
      ? t.kpi.popUrb.trendText
      : indicatorCode === "EN.POP.DNST"
      ? t.kpi.popDnst.trendText
      : t.kpi.popTotal.trendText);

  return (
    <Card
      className={cn(
        "editorial-card relative overflow-hidden flex flex-col justify-between bg-white dark:bg-slate-900",
        className
      )}
    >
      <div>
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2 pt-5 px-5">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] font-mono tracking-wide uppercase text-slate-400 font-medium block">
              {indicatorCode}
            </span>
            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
              {title}
            </CardTitle>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 shrink-0">
            {icon}
          </div>
        </CardHeader>

        <CardContent className="space-y-3 px-5 pb-4">
          <div className="space-y-1.5">
            {isAvailable ? (
              <div className="font-extrabold text-2xl sm:text-[28px] tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
                {value}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
                <AlertTriangle className="h-4 w-4" />
                <span>{t.common.dataPending}</span>
              </div>
            )}

            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-800">
              <ArrowUpRight className="h-3 w-3" />
              <span>{derivedTrend}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {description}
          </p>

          {progressPercent !== undefined && (
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-700 dark:bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(progressPercent, 8), 100)}%` }}
              />
            </div>
          )}
        </CardContent>
      </div>

      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-blue-700 dark:text-blue-400" />
          <span>{t.common.referenceYear}:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
            {year || t.common.na}
          </span>
        </div>

        <span className="font-medium text-blue-700 dark:text-blue-400 truncate max-w-[125px]">
          {t.common.worldBankWdi}
        </span>
      </div>
    </Card>
  );
}
