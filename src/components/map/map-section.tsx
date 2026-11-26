"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { MetricSelector } from "./metric-selector";
import { ColorLegend } from "./color-legend";
import { MapControls } from "./map-controls";
import { MapTooltip } from "./map-tooltip";
import { CountryDetailPanel } from "./country-detail-panel";
import { UnmatchedStatus } from "./unmatched-status";
import { WorldMapSvg } from "./world-map-svg";
import { InteractiveGlobe, GlobeExternalFocus } from "@/components/globe";
import { MapSkeleton } from "./map-skeleton";
import { MapMetricType, CountryMapData, MapTooltipState, SelectedCountryProfile } from "@/types/map";
import { AlertCircle, Globe, Map as MapIcon, MapPin, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportDropdown } from "@/components/export";
import { useTranslation } from "@/components/language";
import { useDashboard } from "@/components/dashboard/dashboard-context";
import { getLocalizedCountryName } from "@/lib/country-names";

export function MapSection() {
  const { t, language } = useTranslation();
  const { globeFocusRequest, regionFocusRequest } = useDashboard();

  const [metric, setMetric] = useState<MapMetricType>("SP.POP.TOTL");
  const [viewMode, setViewMode] = useState<"globe" | "map">("globe");
  const [datasetsByMetric, setDatasetsByMetric] = useState<
    Partial<Record<MapMetricType, Record<string, CountryMapData>>>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedIso3, setSelectedIso3] = useState<string | null>("UZB");
  const [selectedProfile, setSelectedProfile] = useState<SelectedCountryProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [mobilePanelExpanded, setMobilePanelExpanded] = useState<boolean>(true);

  const [tooltip, setTooltip] = useState<MapTooltipState | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [15, 20],
    zoom: 1,
  });

  const loadMetricData = useCallback(
    async (targetMetric: MapMetricType) => {
      if (datasetsByMetric[targetMetric]) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/demographics?map=true&indicator=${targetMetric}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const json = await res.json();
        setDatasetsByMetric((prev) => ({
          ...prev,
          [targetMetric]: json.data || {},
        }));
      } catch (err) {
        console.error("[MapSection] Failed to load map metric:", err);
        setError(t.common.error);
      } finally {
        setIsLoading(false);
      }
    },
    [datasetsByMetric, t.common.error]
  );

  useEffect(() => {
    loadMetricData(metric);
  }, [metric, loadMetricData]);

  const loadCountryProfile = useCallback(async (iso3: string, countryName?: string) => {
    setSelectedIso3(iso3);
    setIsProfileLoading(true);
    setMobilePanelExpanded(true);

    try {
      const url = `/api/demographics?country=${iso3}&profile=true${
        countryName ? `&name=${encodeURIComponent(countryName)}` : ""
      }`;
      const res = await fetch(url);
      if (res.ok) {
        const profile = await res.json();
        setSelectedProfile(profile);
      }
    } catch (e) {
      console.warn("[MapSection] Could not load country profile:", e);
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCountryProfile("UZB", "Uzbekistan");
  }, [loadCountryProfile]);

  // Convert global region focus request into globe rotation/scale
  const externalGlobeFocus = useMemo<GlobeExternalFocus | null>(() => {
    if (!regionFocusRequest) return null;
    return {
      rotation: [-regionFocusRequest.coordinates[0], -regionFocusRequest.coordinates[1], 0],
      scale: regionFocusRequest.zoomScale,
      seq: regionFocusRequest.seq,
    };
  }, [regionFocusRequest]);

  const focusCountryTrigger = useMemo(() => {
    if (!globeFocusRequest) return null;
    return { iso3: globeFocusRequest.iso3, seq: globeFocusRequest.seq };
  }, [globeFocusRequest]);

  // Also switch 2D map center if user triggers region focus while in 2D mode
  useEffect(() => {
    if (regionFocusRequest && viewMode === "map") {
      setPosition({
        coordinates: regionFocusRequest.coordinates,
        zoom: Math.min(5, Math.max(1.5, regionFocusRequest.zoomScale / 180)),
      });
    }
  }, [regionFocusRequest, viewMode]);

  const handleZoomIn = () => {
    setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 8) }));
  };

  const handleZoomOut = () => {
    setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 1) }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [15, 20], zoom: 1 });
  };

  const handleFocusUzbekistan = () => {
    setPosition({ coordinates: [64.5, 41.3], zoom: 3.5 });
    loadCountryProfile("UZB", "Uzbekistan");
  };

  const currentDataset = datasetsByMetric[metric] || {};
  const mobileDisplayName = selectedProfile
    ? getLocalizedCountryName(selectedProfile.iso3, selectedProfile.name, language)
    : t.countryPanel.mobileTitle;

  return (
    <section id="map-section" className="space-y-5 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
              <Globe className="h-3 w-3" />
              {t.centerpiece.engineBadge}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t.centerpiece.globeBadgeProjection}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.centerpiece.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {t.centerpiece.subtitle}
          </p>
        </div>

        {/* View Switcher & Export */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("globe")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${
                viewMode === "globe"
                  ? "bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{t.centerpiece.viewGlobe}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${
                viewMode === "map"
                  ? "bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <MapIcon className="h-3.5 w-3.5" />
              <span>{t.centerpiece.viewMap}</span>
            </button>
          </div>

          <ExportDropdown
            mapDataset={currentDataset}
            activeMapMetric={metric}
            variant="map"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={handleFocusUzbekistan}
            className="gap-1.5 text-xs h-9 rounded-xl border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/50 hover:bg-blue-100"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>{t.centerpiece.focusUzbekistan}</span>
          </Button>

          <UnmatchedStatus />
        </div>
      </div>

      {/* Metric Tabs */}
      <MetricSelector
        currentMetric={metric}
        onSelect={(m) => setMetric(m)}
        isLoading={isLoading}
      />

      {/* Main Container: Globe/Map + Desktop Detail Panel */}
      <div className="editorial-card p-3 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-5">
          {/* Map / Globe Area */}
          <div className="relative flex-1 min-w-0 flex flex-col gap-3">
            {viewMode === "map" && (
              <div className="absolute top-3.5 right-3.5 z-20">
                <MapControls
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onReset={handleReset}
                />
              </div>
            )}

            {error && (
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                <span className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => loadMetricData(metric)}
                  className="h-7 px-2.5 text-xs hover:bg-red-100"
                >
                  {t.common.retry}
                </Button>
              </div>
            )}

            {isLoading && !datasetsByMetric[metric] ? (
              <MapSkeleton />
            ) : viewMode === "globe" ? (
              <InteractiveGlobe
                metric={metric}
                dataset={currentDataset}
                selectedIso3={selectedIso3}
                onSelectCountry={(iso3, name) => loadCountryProfile(iso3, name)}
                onHoverCountry={(tt) => setTooltip(tt)}
                externalFocus={externalGlobeFocus}
                focusCountryIso3={focusCountryTrigger}
              />
            ) : (
              <WorldMapSvg
                metric={metric}
                dataset={currentDataset}
                selectedIso3={selectedIso3}
                onSelectCountry={(iso3, name) => loadCountryProfile(iso3, name)}
                onHoverCountry={(tt) => setTooltip(tt)}
                position={position}
                onMoveEnd={(pos) => setPosition(pos)}
              />
            )}

            {/* Legend & Drag Hint */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <ColorLegend metric={metric} />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 px-1">
                {t.centerpiece.globeHintDrag}
              </span>
            </div>
          </div>

          {/* Desktop Side Panel + Mobile Collapsible Analytics Panel */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobilePanelExpanded((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-blue-50/80 dark:bg-slate-800 border border-blue-200/80 dark:border-slate-700 text-left mb-3"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-700" />
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {t.countryPanel.mobileTitle}: {mobileDisplayName}
                </span>
              </div>
              {mobilePanelExpanded ? (
                <ChevronUp className="h-4 w-4 text-blue-700" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-700" />
              )}
            </button>
            {mobilePanelExpanded && (
              <CountryDetailPanel
                country={selectedProfile}
                onClose={() => setMobilePanelExpanded(false)}
                isLoading={isProfileLoading}
              />
            )}
          </div>

          <div className="hidden lg:block">
            <CountryDetailPanel
              country={selectedProfile}
              onClose={() => setSelectedProfile(null)}
              isLoading={isProfileLoading}
            />
          </div>
        </div>
      </div>

      <MapTooltip tooltip={tooltip} />
    </section>
  );
}
