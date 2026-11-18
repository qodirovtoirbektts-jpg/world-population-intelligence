"use client";

import { useState, useRef, useEffect } from "react";
import { Download, FileSpreadsheet, History, Globe2, Check, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountryComparisonProfile, HistoricalYearPoint } from "@/types/comparison";
import { DemographicIndicatorCode } from "@/types/world-bank";
import { CountryMapData } from "@/types/map";
import {
  exportComparisonSummaryCsv,
  exportHistoricalTimeSeriesCsv,
  exportMapDatasetCsv,
} from "@/lib/csv-export";

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
        <span>Export CSV</span>
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
          <div className="px-3 py-2 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>Official Demographic Datasets</span>
            </div>
            <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
              UTF-8 • BOM
            </Badge>
          </div>

          {/* Option 1: Comparison Summary */}
          {(variant === "all" || variant === "comparison") && (
            <button
              type="button"
              role="menuitem"
              disabled={!hasComparisonData || downloadingType === "comparison"}
              onClick={handleExportComparison}
              className={`w-full text-left p-3 rounded-xl transition-colors flex items-start gap-3 ${
                hasComparisonData
                  ? "hover:bg-primary/10 cursor-pointer focus-visible:bg-primary/10 focus-visible:outline-none"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5 shrink-0">
                {downloadingType === "comparison" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400" aria-hidden="true" />
                ) : successType === "comparison" ? (
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-foreground">
                    Comparison Summary ({profiles.length} countries)
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">.CSV</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  Latest indicators (Population, Density, Growth, Urban Share) with reference years and official sources.
                </p>
              </div>
            </button>
          )}

          {/* Option 2: Historical Time Series */}
          {(variant === "all" || variant === "comparison") && (
            <button
              type="button"
              role="menuitem"
              disabled={!hasHistoricalData || downloadingType === "historical"}
              onClick={handleExportHistorical}
              className={`w-full text-left p-3 rounded-xl transition-colors flex items-start gap-3 ${
                hasHistoricalData
                  ? "hover:bg-primary/10 cursor-pointer focus-visible:bg-primary/10 focus-visible:outline-none"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5 shrink-0">
                {downloadingType === "historical" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-400" aria-hidden="true" />
                ) : successType === "historical" ? (
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <History className="h-4 w-4" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-foreground">
                    Historical Time Series (1960–2024)
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">.CSV</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  65-year longitudinal trajectory for all selected countries across all four core indicators.
                </p>
              </div>
            </button>
          )}

          {/* Option 3: Global Map Dataset */}
          {(variant === "all" || variant === "map") && (
            <button
              type="button"
              role="menuitem"
              disabled={!hasMapData || downloadingType === "map"}
              onClick={handleExportMap}
              className={`w-full text-left p-3 rounded-xl transition-colors flex items-start gap-3 ${
                hasMapData
                  ? "hover:bg-primary/10 cursor-pointer focus-visible:bg-primary/10 focus-visible:outline-none"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                {downloadingType === "map" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-400" aria-hidden="true" />
                ) : successType === "map" ? (
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Globe2 className="h-4 w-4" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-foreground">
                    Global Map Dataset (200+ Territories)
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">.CSV</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  Worldwide sovereign territorial figures for current indicator with ISO-3 codes and values.
                </p>
              </div>
            </button>
          )}

          {/* Footer Note */}
          <div className="px-3 py-1.5 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground/80">
            <span>Direct browser download</span>
            <span>Excel & Sheets compatible</span>
          </div>
        </div>
      )}
    </div>
  );
}
