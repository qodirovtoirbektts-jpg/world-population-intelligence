"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { ALL_COUNTRIES } from "@/lib/country-registry";
import { INDICATORS } from "@/lib/world-bank";
import { useTranslation } from "@/components/language";
import { getLocalizedCountryName, getLocalizedRegionName, matchesLocalizedCountry } from "@/lib/country-names";
import { useDashboard } from "@/components/dashboard/dashboard-context";

interface QuickSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickSearchDialog({ isOpen, onClose }: QuickSearchDialogProps) {
  const { t, language } = useTranslation();
  const { focusCountryOnGlobe } = useDashboard();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim();

  const filteredCountries = ALL_COUNTRIES.filter((c) =>
    matchesLocalizedCountry(c.iso3, c.name, c.region, normalized)
  ).slice(0, 8);

  const filteredIndicators = Object.entries(INDICATORS).filter(
    ([code, item]) =>
      item.name.toLowerCase().includes(normalized.toLowerCase()) ||
      code.toLowerCase().includes(normalized.toLowerCase())
  );

  const handleSelectCountry = (iso3: string, name: string) => {
    focusCountryOnGlobe(iso3, name);
    onClose();
    const el = document.getElementById("map-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200/80 dark:border-slate-800 gap-3">
          <Search className="h-5 w-5 text-blue-700 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchModal.placeholder}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              aria-label={t.common.close}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-500">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-3">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.searchModal.sectionCountries}
            </div>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const displayName = getLocalizedCountryName(c.iso3, c.name, language);
                const displayRegion = getLocalizedRegionName(c.region, language);
                return (
                  <button
                    key={c.iso3}
                    type="button"
                    onClick={() => handleSelectCountry(c.iso3, c.name)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{c.flag || "🌐"}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {displayName}
                      </span>
                      <span className="font-mono text-[10px] text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800">
                        {c.iso3}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 hidden sm:inline">
                        {displayRegion}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-700 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-2 text-xs text-slate-500">
                {t.searchModal.noResults}
              </div>
            )}
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.searchModal.sectionIndicators}
            </div>
            {filteredIndicators.map(([code, item]) => (
              <a
                key={code}
                href="#indicators-section"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-800">
                    {code}
                  </span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {code === "SP.POP.TOTL"
                      ? t.kpi.popTotal.title
                      : code === "SP.POP.GROW"
                      ? t.kpi.popGrow.title
                      : code === "EN.POP.DNST"
                      ? t.kpi.popDnst.title
                      : t.kpi.popUrb.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">{item.unit}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-[11px] text-slate-500">
          <span>{t.searchModal.footerDataset}</span>
          <span>{t.searchModal.footerTip}</span>
        </div>
      </div>
    </div>
  );
}
