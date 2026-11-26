"use client";

import { Database, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/components/language";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-14 py-7">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {t.nav.siteName}
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
          <span>{t.nav.siteSub}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
            <span>{t.common.officialFeed}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
            <span>{t.methodology.privacyBadge} • {t.methodology.wcagBadge}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
