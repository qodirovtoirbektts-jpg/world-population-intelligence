"use client";

import { Database, Calendar, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/components/language";

interface ApiStatusBannerProps {
  lastFetched?: string;
  sourcePartner?: string;
}

const MONTHS_BY_LOCALE = {
  uz: ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ru: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
};

function formatDeterministicDate(
  isoDate: string | undefined,
  lang: "uz" | "en" | "ru",
  fallback: string
): string {
  if (!isoDate) return fallback;
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return fallback;
  const day = d.getUTCDate();
  const month = MONTHS_BY_LOCALE[lang][d.getUTCMonth()];
  const year = d.getUTCFullYear();
  if (lang === "uz") return `${day}-${month}, ${year}`;
  if (lang === "ru") return `${day} ${month} ${year}`;
  return `${month} ${day}, ${year}`;
}

export function ApiStatusBanner({ lastFetched }: ApiStatusBannerProps) {
  const { t, language } = useTranslation();

  const formattedDate = formatDeterministicDate(
    lastFetched,
    language,
    t.telemetry.justNow
  );

  return (
    <div className="rounded-2xl border border-blue-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 py-3.5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
          <Database className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
            {t.telemetry.verifiedDataset}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {t.telemetry.sourcePartner} • {t.telemetry.cachingProtocol}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 shrink-0">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium border border-blue-100 dark:border-blue-800">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {t.telemetry.telemetryActive}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {t.telemetry.lastSynchronized}:{" "}
          <strong className="text-slate-800 dark:text-slate-200">{formattedDate}</strong>
        </span>
      </div>
    </div>
  );
}
