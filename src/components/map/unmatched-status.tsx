"use client";

import { useState } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/language";

export function UnmatchedStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useTranslation();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-blue-700 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
        title={t.centerpiece.mapAuditZeroUnmatched}
      >
        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        <span className="font-medium text-[11px]">{t.centerpiece.mapAuditCoverage}</span>
        <Info className="h-3 w-3 text-slate-400" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  {t.centerpiece.mapAuditZeroUnmatched}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.common.officialFeed}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 text-slate-400 hover:text-slate-700"
                aria-label={t.common.close}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-2">
                <div className="flex justify-between font-medium text-slate-900 dark:text-slate-100">
                  <span>
                    {language === "uz"
                      ? "Xarita konturlari (110m):"
                      : language === "ru"
                      ? "Контуры карты (110m):"
                      : "Vector Geometries (110m):"}
                  </span>
                  <span className="font-mono text-blue-700 dark:text-blue-300">177</span>
                </div>
                <div className="flex justify-between font-medium text-slate-900 dark:text-slate-100">
                  <span>
                    {language === "uz"
                      ? "ISO-3 kodlariga bog‘langan:"
                      : language === "ru"
                      ? "Сопоставлено с ISO-3:"
                      : "Mapped to World Bank ISO-3:"}
                  </span>
                  <span className="font-mono text-blue-700 dark:text-blue-300">177 (100%)</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {language === "uz"
                  ? "Barcha suveren davlatlar va maxsus hududlar (XKX, TWN, ESH va boshqalar) Jahon bankining standart ISO-3 tasnifi bilan to‘liq moslashtirilgan."
                  : language === "ru"
                  ? "Все суверенные государства и территории сопоставлены со стандартными кодами ISO-3 Всемирного банка."
                  : "All sovereign nations and territories are mapped consistently to official World Bank ISO-3 codes."}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button size="sm" onClick={() => setIsOpen(false)}>
                {t.common.close}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
