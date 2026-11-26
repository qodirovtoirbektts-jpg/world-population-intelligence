"use client";

import { Loader2, Globe } from "lucide-react";
import { useTranslation } from "@/components/language";

export function MapSkeleton() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-[460px] sm:h-[580px] lg:h-[630px] rounded-2xl border border-blue-200/80 dark:border-blue-900/40 bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#eef5ff_62%,#e0ecff_100%)] dark:bg-slate-950 flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="flex flex-col items-center text-center space-y-4 max-w-md z-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm">
          <Globe className="h-7 w-7 animate-spin" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            {t.centerpiece.loadingMap}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.centerpiece.loadingMapSub}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-blue-700 dark:text-blue-300">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>{t.centerpiece.syncTerritories}</span>
        </div>
      </div>
    </div>
  );
}
