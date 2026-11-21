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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
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
      } catch (err) {
        console.error("CSV Export failed:", err);
      } finally {
        setDownloadingType(null);
        setIsOpen(false);
      }
    }, 250);
  };

  const handleExportHistorical = () => {
    if (profiles.length === 0 || !historical) return;
    setDownloadingType("historical");
    setTimeout(() => {
      try {
        exportHistoricalTimeSeriesCsv(profiles, historical);
        setSuccessType("historical");
        setTimeout(() => setSuccessType(null), 2500);
      } catch (err) {
        console.error("CSV Export failed:", err);
      } finally {
        setDownloadingType(null);
        setIsOpen(false);
      }
    }, 350);
  };

  const handleExportMap = () => {
    if (!mapDataset || Object.keys(mapDataset).length === 0) return;
    setDownloadingType("map");
    setTimeout(() => {
      try {
        exportMapDatasetCsv(mapDataset, activeMapMetric);
        setSuccessType("map");
        setTimeout(() => setSuccessType(null), 2500);
      } catch (err) {
        console.error("CSV Export failed:", err);
      } finally {
        setDownloadingType(null);
        setIsOpen(false);
      }
    }, 350);
  };

  const hasComparisonData = profiles.length > 0;
  const hasHistoricalData = hasComparisonData && Boolean(historical);
  const hasMapData = Boolean(mapDataset && Object.keys(mapDataset).length > 0);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`} onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <Button
        ref={buttonRef}
        type="button"
        variant="outline"
        size="sm"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Export demographic data to CSV"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-9 px-3 gap-2 border-border/80 bg-secondary/40 hover:bg-secondary/80 text-foreground font-medium text-xs rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all"
      >
        <Download className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
        <span>{t.export.buttonLabel}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label="CSV Export Options"
          className="absolute right-0 z-50 mt-2 w-80 sm:w-96 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl p-2.5 space-y-1.5 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-border/60">
            <p className="text-xs font-semibold text-foreground">
              {t.export.buttonLabel}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {t.common.officialFeed}
            </p>
          </div>

          <div className="space-y-1 pt-1">
            {/* 1. Comparison Summary */}
            {(variant === "comparison" || variant === "all") && (
              <button
                type="button"
                role="menuitem"
                disabled={!hasComparisonData || downloadingType === "comparison"}
                onClick={handleExportComparison}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/60 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors shrink-0 mt-0.5">
                    <FileSpreadsheet className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">
                      {t.export.comparisonSummary}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {profiles.length} countries • 4 World Bank indicators
                    </div>
                  </div>
                </div>
                {successType === "comparison" && (
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
              </button>
            )}

            {/* 2. Historical Time Series */}
            {(variant === "comparison" || variant === "all") && (
              <button
                type="button"
                role="menuitem"
                disabled={!hasHistoricalData || downloadingType === "historical"}
                onClick={handleExportHistorical}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/60 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors shrink-0 mt-0.5">
                    <History className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">
                      {t.export.historicalSeries}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      1960–2024 time series • {profiles.length} countries
                    </div>
                  </div>
                </div>
                {successType === "historical" && (
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
              </button>
            )}

            {/* 3. Global Map Dataset */}
            {(variant === "map" || variant === "all") && (
              <button
                type="button"
                role="menuitem"
                disabled={!hasMapData || downloadingType === "map"}
                onClick={handleExportMap}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/60 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shrink-0 mt-0.5">
                    <Globe2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">
                      {t.export.mapDataset}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      {activeMapMetric} • 177 sovereign nations
                    </div>
                  </div>
                </div>
                {successType === "map" && (
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
