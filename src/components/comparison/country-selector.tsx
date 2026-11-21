"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Sparkles, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  searchCountries,
  COMPARISON_PALETTE,
  findCountryByIso3,
} from "@/lib/country-registry";
import { useTranslation } from "@/components/language";

interface CountrySelectorProps {
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
}

export function CountrySelector({ selectedCodes, onChange }: CountrySelectorProps) {
  const { t, language } = useTranslation();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = searchCountries(query);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddCountry = (iso3: string) => {
    if (selectedCodes.includes(iso3)) return;
    if (selectedCodes.length >= 5) return;

    onChange([...selectedCodes, iso3]);
    setQuery("");
    setIsOpen(false);
  };

  const handleRemoveCountry = (iso3: string) => {
    if (selectedCodes.length <= 2) return; // Enforce minimum 2 countries
    onChange(selectedCodes.filter((c) => c !== iso3));
  };

  const isUzbekistanSelected = selectedCodes.includes("UZB");
  const isMaxReached = selectedCodes.length >= 5;
  const isMinReached = selectedCodes.length <= 2;

  const getCountryDisplayName = (iso3: string, defaultName: string) => {
    if (iso3 === "UZB") {
      if (language === "ru") return "Узбекистан";
      if (language === "uz") return "Oʻzbekiston";
    }
    return defaultName;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar & Action Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input Container */}
        <div ref={dropdownRef} className="relative flex-1">
          <label htmlFor="country-search-input" className="sr-only">
            {t.comparison.searchPlaceholder}
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <input
              id="country-search-input"
              ref={inputRef}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={isOpen && !isMaxReached}
              aria-controls="country-search-listbox"
              aria-label={t.comparison.searchPlaceholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsOpen(false);
              }}
              placeholder={
                isMaxReached
                  ? t.comparison.maxReached
                  : t.comparison.searchPlaceholder
              }
              disabled={isMaxReached}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/80 bg-background/60 backdrop-blur-md text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isOpen && !isMaxReached && (
            <div
              id="country-search-listbox"
              role="listbox"
              aria-label="Country suggestions"
              className="absolute z-50 left-0 right-0 mt-2 max-h-72 overflow-y-auto rounded-xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl p-1.5 space-y-1"
            >
              <div className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground" aria-hidden="true">
                {t.comparison.selectPrompt} ({filteredCountries.length})
              </div>
              {filteredCountries.length === 0 ? (
                <div className="py-6 text-center text-xs text-muted-foreground" role="status">
                  {t.leagueTable.noResults}
                </div>
              ) : (
                filteredCountries.map((country) => {
                  const isAlreadySelected = selectedCodes.includes(country.iso3);
                  const displayName = getCountryDisplayName(country.iso3, country.name);
                  return (
                    <button
                      key={country.iso3}
                      type="button"
                      role="option"
                      aria-selected={isAlreadySelected}
                      disabled={isAlreadySelected}
                      onClick={() => handleAddCountry(country.iso3)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                        isAlreadySelected
                          ? "opacity-40 cursor-not-allowed bg-secondary/20"
                          : "hover:bg-primary/10 text-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base" aria-hidden="true">{country.flag}</span>
                        <div>
                          <div className="font-medium text-foreground">{displayName}</div>
                          <div className="text-[11px] text-muted-foreground">{country.region}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                          {country.iso3}
                        </span>
                        {isAlreadySelected && <Check className="h-4 w-4 text-emerald-400" aria-label="Already selected" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Quick Add Uzbekistan Button */}
        {!isUzbekistanSelected && !isMaxReached && (
          <Button
            type="button"
            variant="outline"
            onClick={() => handleAddCountry("UZB")}
            className="border-emerald-500/40 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 gap-1.5 shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.comparison.quickAddUzb}</span>
          </Button>
        )}
      </div>

      {/* Selected Countries Badges Bar */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <span className="text-xs font-medium text-muted-foreground">
          {t.comparison.selectedLabel} ({selectedCodes.length}/5):
        </span>

        {selectedCodes.map((iso3, index) => {
          const country = findCountryByIso3(iso3);
          const palette = COMPARISON_PALETTE[index % COMPARISON_PALETTE.length];
          const displayName = getCountryDisplayName(iso3, country?.name || iso3);

          return (
            <div
              key={iso3}
              style={{ borderColor: palette.hex }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-card/60 backdrop-blur-md shadow-sm text-xs transition-all hover:shadow-md"
            >
              <div
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: palette.hex }}
              />
              <span className="text-sm">{country?.flag}</span>
              <span className="font-semibold text-foreground">
                {displayName}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-secondary/60">
                {iso3}
              </span>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveCountry(iso3)}
                disabled={isMinReached}
                aria-label={
                  isMinReached
                    ? `Cannot remove ${displayName}. Minimum 2 countries required`
                    : `Remove ${displayName} from comparison`
                }
                title={
                  isMinReached
                    ? "Minimum 2 countries required"
                    : `Remove ${displayName}`
                }
                className={`p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                  isMinReached ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          );
        })}

        {/* Preset Comparison Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 ml-auto text-xs" role="group" aria-label="Quick preset comparisons">
          <span className="text-muted-foreground text-[11px] hidden md:inline">Presets:</span>
          <button
            type="button"
            onClick={() => onChange(["UZB", "KAZ"])}
            className="px-2 py-1 rounded-lg border border-border hover:border-blue-500/40 bg-secondary/30 hover:bg-secondary/60 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            UZB vs KAZ
          </button>
          <button
            type="button"
            onClick={() => onChange(["UZB", "USA", "CHN"])}
            className="px-2 py-1 rounded-lg border border-border hover:border-blue-500/40 bg-secondary/30 hover:bg-secondary/60 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            UZB • USA • CHN
          </button>
          <button
            type="button"
            onClick={() => onChange(["IND", "CHN", "USA", "BRA"])}
            className="px-2 py-1 rounded-lg border border-border hover:border-blue-500/40 bg-secondary/30 hover:bg-secondary/60 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            Top Giants
          </button>
        </div>
      </div>

      {/* Constraints Notices */}
      {isMinReached && (
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/80">
          <AlertCircle className="h-3.5 w-3.5 text-blue-400" />
          <span>Minimum 2 countries required for side-by-side evaluation.</span>
        </div>
      )}
      {isMaxReached && (
        <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{t.comparison.maxReached}</span>
        </div>
      )}
    </div>
  );
}
