"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Plus, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  searchCountries,
  COMPARISON_PALETTE,
  findCountryByIso3,
} from "@/lib/country-registry";
import { getLocalizedCountryName, getLocalizedRegionName } from "@/lib/country-names";
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
    if (selectedCodes.length <= 2) return;
    onChange(selectedCodes.filter((c) => c !== iso3));
  };

  const isUzbekistanSelected = selectedCodes.includes("UZB");
  const isMaxReached = selectedCodes.length >= 5;
  const isMinReached = selectedCodes.length <= 2;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div ref={dropdownRef} className="relative flex-1">
          <label htmlFor="country-search-input" className="sr-only">
            {t.comparison.searchPlaceholder}
          </label>
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 pointer-events-none"
              aria-hidden="true"
            />
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
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {isOpen && !isMaxReached && (
            <div
              id="country-search-listbox"
              role="listbox"
              aria-label="Country suggestions"
              className="absolute z-50 left-0 right-0 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-1.5 space-y-0.5"
            >
              <div
                className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                aria-hidden="true"
              >
                {t.comparison.selectPrompt} ({filteredCountries.length})
              </div>
              {filteredCountries.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500" role="status">
                  {t.leagueTable.noResults}
                </div>
              ) : (
                filteredCountries.map((country) => {
                  const isAlreadySelected = selectedCodes.includes(country.iso3);
                  const displayName = getLocalizedCountryName(country.iso3, country.name, language);
                  const displayRegion = getLocalizedRegionName(country.region, language);
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
                          ? "opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-800"
                          : "hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base" aria-hidden="true">
                          {country.flag}
                        </span>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            {displayName}
                          </div>
                          <div className="text-[11px] text-slate-500">{displayRegion}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                          {country.iso3}
                        </span>
                        {isAlreadySelected && (
                          <Check className="h-4 w-4 text-blue-700" aria-label="Selected" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {!isUzbekistanSelected && !isMaxReached && (
          <Button
            type="button"
            variant="outline"
            onClick={() => handleAddCountry("UZB")}
            className="border-blue-200 dark:border-blue-800 bg-blue-50/70 hover:bg-blue-100 text-blue-700 dark:text-blue-300 gap-1.5 shrink-0 rounded-xl h-10"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{t.comparison.quickAddUzb}</span>
          </Button>
        )}
      </div>

      {/* Selected Countries Pills & Presets */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {t.comparison.selectedLabel} ({selectedCodes.length}/5):
        </span>

        {selectedCodes.map((iso3, index) => {
          const country = findCountryByIso3(iso3);
          const palette = COMPARISON_PALETTE[index % COMPARISON_PALETTE.length];
          const displayName = getLocalizedCountryName(iso3, country?.name || iso3, language);

          return (
            <div
              key={iso3}
              style={{ borderColor: palette.hex }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-white dark:bg-slate-900 shadow-sm text-xs"
            >
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: palette.hex }}
              />
              <span className="text-sm">{country?.flag || "🌐"}</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {displayName}
              </span>
              <span className="font-mono text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                {iso3}
              </span>

              <button
                type="button"
                onClick={() => handleRemoveCountry(iso3)}
                disabled={isMinReached}
                aria-label={`Remove ${displayName}`}
                className={`p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors ${
                  isMinReached ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          );
        })}

        <div className="flex flex-wrap items-center gap-1.5 ml-auto text-xs" role="group">
          <button
            type="button"
            onClick={() => onChange(["UZB", "KAZ", "KGZ", "TJK", "TKM"])}
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-700 transition-colors"
          >
            {t.comparison.presetCentralAsia}
          </button>
          <button
            type="button"
            onClick={() => onChange(["UZB", "USA", "CHN"])}
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-700 transition-colors"
          >
            {t.comparison.presetGlobal}
          </button>
          <button
            type="button"
            onClick={() => onChange(["DEU", "FRA", "GBR", "ITA"])}
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-700 transition-colors"
          >
            {t.comparison.presetEurope}
          </button>
        </div>
      </div>

      {isMaxReached && (
        <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{t.comparison.maxReached}</span>
        </div>
      )}
    </div>
  );
}
