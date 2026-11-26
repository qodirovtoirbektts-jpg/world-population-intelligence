"use client";

import { ShieldCheck, Eye, Database, Info } from "lucide-react";
import { useTranslation } from "@/components/language";

export function MethodologyNotice() {
  const { t } = useTranslation();

  return (
    <section
      id="methodology-section"
      aria-labelledby="methodology-heading"
      className="editorial-card p-6 sm:p-7 bg-white dark:bg-slate-900 scroll-mt-20"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-2.5 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t.methodology.badge}
          </span>
          <h2
            id="methodology-heading"
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
          >
            {t.methodology.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.methodology.body}
          </p>
          <p className="inline-flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 px-3 py-2 rounded-xl">
            <Info className="h-4 w-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>{t.methodology.euNotice}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 shrink-0 lg:w-64">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/70 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200">
            <Database className="h-4 w-4 text-blue-700 dark:text-blue-400 shrink-0" />
            <span>{t.methodology.sourceBadge}</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/70 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200">
            <Eye className="h-4 w-4 text-blue-700 dark:text-blue-400 shrink-0" />
            <span>{t.methodology.wcagBadge}</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/70 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200">
            <ShieldCheck className="h-4 w-4 text-blue-700 dark:text-blue-400 shrink-0" />
            <span>{t.methodology.privacyBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
