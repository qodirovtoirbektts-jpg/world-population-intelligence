"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Globe, ArrowRight, TrendingUp, Compass, Users } from "lucide-react";
import { ALL_COUNTRIES } from "@/lib/country-registry";
import { INDICATORS } from "@/lib/world-bank";
import { DemographicIndicatorCode } from "@/types/world-bank";
import { useTranslation } from "@/components/language";

interface QuickSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry?: (iso3: string) => void;
}

export function QuickSearchDialog({
  isOpen,
  onClose,
  onSelectCountry,
}: QuickSearchDialogProps) {
  const { t } = useTranslation();
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
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from outside
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  const filteredCountries = ALL_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(normalized) ||
      c.iso3.toLowerCase().includes(normalized) ||
      c.region.toLowerCase().includes(normalized)
  ).slice(0, 8);

  const filteredIndicators = Object.entries(INDICATORS).filter(([code, item]) =>
    item.name.toLowerCase().includes(normalized) || code.toLowerCase().includes(normalized)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl rounded-2xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border/70 gap-3">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchModal.placeholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-3">
          {/* Countries Section */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              {t.searchModal.sectionCountries}
            </div>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <a
                  key={c.iso3}
                  href="#compare-section"
                  onClick={() => {
                    onSelectCountry?.(c.iso3);
                    onClose();
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-secondary/70 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{c.flag || "🌐"}</span>
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border/50">
                      {c.iso3}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">
                      {c.region}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              ))
            ) : (
              <div className="px-3 py-2 text-xs text-muted-foreground">
                {t.searchModal.noResults}
              </div>
            )}
          </div>

          {/* Indicators Section */}
          <div className="space-y-1 pt-1 border-t border-border/50">
            <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              {t.searchModal.sectionIndicators}
            </div>
            {filteredIndicators.map(([code, item]) => (
              <a
                key={code}
                href="#indicators-section"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-secondary/70 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                    {code}
                  </span>
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{item.unit}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border/60 bg-muted/30 text-[11px] text-muted-foreground">
          <span>{t.searchModal.footerDataset}</span>
          <span>{t.searchModal.footerTip}</span>
        </div>
      </div>
    </div>
  );
}
