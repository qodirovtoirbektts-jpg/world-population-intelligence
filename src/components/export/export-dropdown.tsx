"use client";

import { useState, useRef, useEffect } from "react";
import { Download, FileSpreadsheet, History, Globe2, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountryComparisonProfile, HistoricalYearPoint } from "@/types/comparison";
import { DemographicIndicatorCode } from "@/types/world-bank";
import { CountryMapData } from "@/types/map";
import {
  exportComparisonSummaryCsv,
  exportHistoricalTimeSeriesCsv,
  exportMapDatasetCsv,
} from "@/lib/csv-export";
import { useTranslation } from "@/components/language";

interface ExportDropdownProps {
  profiles?: CountryComparisonProfile[];
  historical?: Record<DemographicIndicatorCode, HistoricalYearPoint[]>;
  mapDataset?: Record<string, CountryMapData>;
  activeMapMetric?: DemographicIndicatorCode;
  className?: string;
  variant?: "comparison" | "map" | "all";
}

export function ExportDropdown({
  profiles = [],
  historical,
  mapDataset,
  activeMapMetric = "SP.POP.TOTL",
  className = "",
  variant = "all",
}: ExportDropdownProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [downloadingType, setDownloadingType] = useState<string | null>(null);
  const [successType, setSuccessType] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleExportComparison = () => {
    if (profiles.length === 0) return;
    setDownloadingType("comparison");
    setTimeout(() => {
      try {
        exportComparisonSummaryCsv(profiles);
        setSuccessType("comparison");
        setTimeout(() => setSuccessType(null), 2500);
      } finally {
        setDownloadingType(null);
        setIsOpen(false);
      }
    }, 150);
  };

  const handleExportHistorical = () => {
    if (profiles.length === 0 || !historical) return;
    setDownloadingType("historical");
    setTimeout(() => {
      try {
        exportHistoricalTimeSeriesCsv(profiles, historical);
        setSuccessType("historical");
        setTimeout(() => setSuccessType(null), 2500);
      } finally {
        setDownloadingType(null);
        setIsOpen(false);
      }
    }, 150);
  };

  const handleExportMap = () => {
    if (!mapDataset || Object.keys(mapDataset).length === 0) return;
    setDownloadingType("map");
    setTimeout(() => {
      try {
        exportMapDatasetCsv(mapDataset, activeMapMetric);
        setSuccessType("map");
        setTimeout(() => setSuccessType(null), 2500);
      } finally {
        setDownloadingType(null);
        setIsOpen(false);
      }
    }, 150);
  };

  const hasComparisonData = profiles.length > 0;
  const hasHistoricalData = hasComparisonData && Boolean(historical);
  const hasMapData = Boolean(mapDataset && Object.keys(mapDataset).length > 0);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${className}`}
      onKeyDown={handleKeyDown}
    >
      <Button
        ref={buttonRef}
        type="button"
        variant="outline"
        size="sm"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t.export.buttonLabel}
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-9 px-3 gap-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium text-xs rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none transition-all"
      >
        <Download className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
        <span>{t.export.buttonLabel}</span>
        <ChevronDown
          className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </Button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label="CSV Export Options"
          className="absolute right-0 z-50 mt-2 w-72 sm:w-80 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-2 space-y-1 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              {t.export.buttonLabel}
            </p>
            <p className="text-[11px] text-slate-500">{t.common.officialFeed}</p>
          </div>

          <div className="space-y-1 pt-1">
            {(variant === "comparison" || variant === "all") && (
              <button
                type="button"
                role="menuitem"
                disabled={!hasComparisonData || downloadingType === "comparison"}
                onClick={handleExportComparison}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0">
                    <FileSpreadsheet className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                      {t.export.comparisonSummary}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {profiles.length} • 4 WDI
                    </div>
                  </div>
                </div>
                {successType === "comparison" && <Check className="h-4 w-4 text-blue-700 shrink-0" />}
              </button>
            )}

            {(variant === "comparison" || variant === "all") && (
              <button
                type="button"
                role="menuitem"
                disabled={!hasHistoricalData || downloadingType === "historical"}
                onClick={handleExportHistorical}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0">
                    <History className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                      {t.export.historicalSeries}
                    </div>
                    <div className="text-[11px] text-slate-500">1960–2024 • CSV</div>
                  </div>
                </div>
                {successType === "historical" && <Check className="h-4 w-4 text-blue-700 shrink-0" />}
              </button>
            )}

            {(variant === "map" || variant === "all") && (
              <button
                type="button"
                role="menuitem"
                disabled={!hasMapData || downloadingType === "map"}
                onClick={handleExportMap}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0">
                    <Globe2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                      {t.export.mapDataset}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {activeMapMetric}
                    </div>
                  </div>
                </div>
                {successType === "map" && <Check className="h-4 w-4 text-blue-700 shrink-0" />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
