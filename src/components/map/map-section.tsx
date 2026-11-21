"use client";

import { useState, useEffect, useCallback } from "react";
import { MetricSelector } from "./metric-selector";
import { ColorLegend } from "./color-legend";
import { MapControls } from "./map-controls";
import { MapTooltip } from "./map-tooltip";
import { CountryDetailPanel } from "./country-detail-panel";
import { UnmatchedStatus } from "./unmatched-status";
import { WorldMapSvg } from "./world-map-svg";
import { InteractiveGlobe } from "@/components/globe";
import { MapSkeleton } from "./map-skeleton";
import { MapMetricType, CountryMapData, MapTooltipState, SelectedCountryProfile } from "@/types/map";
import { AlertCircle, Globe, Map as MapIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportDropdown } from "@/components/export";
import { useTranslation } from "@/components/language";

export function MapSection() {
  const { t } = useTranslation();
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

  const [tooltip, setTooltip] = useState<MapTooltipState | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [15, 20],
    zoom: 1,
  });

  // Fetch map dataset for active metric
  const loadMetricData = useCallback(async (targetMetric: MapMetricType) => {
    // Return early if cached in memory
    if (datasetsByMetric[targetMetric]) {
      return;
    }

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
      setError("Failed to stream demographic data. Please retry.");
    } finally {
      setIsLoading(false);
    }
  }, [datasetsByMetric]);

  // Load initial metric on mount
  useEffect(() => {
    loadMetricData(metric);
  }, [metric, loadMetricData]);

  // Fetch full profile for selected country
  const loadCountryProfile = useCallback(async (iso3: string, countryName?: string) => {
    setSelectedIso3(iso3);
    setIsProfileLoading(true);

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

  // Preload Uzbekistan profile on first render
  useEffect(() => {
    loadCountryProfile("UZB", "Uzbekistan");
  }, [loadCountryProfile]);

  // Map Navigation Handlers
  const handleZoomIn = () => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.min(pos.zoom * 1.5, 8),
    }));
  };

  const handleZoomOut = () => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.max(pos.zoom / 1.5, 1),
    }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [15, 20], zoom: 1 });
  };

  const handleFocusUzbekistan = () => {
    setPosition({ coordinates: [64.5, 41.3], zoom: 3.5 });
    loadCountryProfile("UZB", "Uzbekistan");
  };

  const currentDataset = datasetsByMetric[metric] || {};

  return (
    <section id="map-section" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <Globe className="h-4 w-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <span>{t.centerpiece.title}</span>
            </h2>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 text-[10px] py-0.5 px-2 font-mono">
              {t.centerpiece.engineBadge}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {t.centerpiece.subtitle}
          </p>
        </div>

        {/* View Mode Toggle & Quick Country Focus & CSV Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Dual Projection Toggle (3D Globe vs 2D Flat Map) */}
          <div className="flex items-center p-1 rounded-xl bg-secondary/50 border border-border/70 text-xs font-mono shadow-sm">
            <button
              onClick={() => setViewMode("globe")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "globe"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{t.centerpiece.viewGlobe}</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "map"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MapIcon className="h-3.5 w-3.5" />
              <span>{t.centerpiece.viewMap}</span>
            </button>
          </div>

          <ExportDropdown
            mapDataset={datasetsByMetric[metric] || {}}
            activeMapMetric={metric}
            variant="map"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={handleFocusUzbekistan}
            className="gap-1.5 text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
          >
            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t.centerpiece.focusUzbekistan}</span>
          </Button>

          <UnmatchedStatus />
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <MetricSelector
        currentMetric={metric}
        onSelect={(m) => setMetric(m)}
        isLoading={isLoading}
      />

      {/* Main Map / Globe Canvas and Detail Panel */}
      <div className="relative flex flex-col lg:flex-row items-start gap-6 rounded-3xl border border-border/80 bg-card/40 p-4 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Visual Viewport Area */}
        <div className="relative flex-1 w-full min-h-[480px] sm:min-h-[580px] rounded-2xl border border-border/60 bg-background/50 overflow-hidden flex flex-col justify-between">
          {/* Zoom & Pan Controls (Only active for 2D Map mode) */}
          {viewMode === "map" && (
            <div className="absolute top-4 right-4 z-20">
              <MapControls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
              />
            </div>
          )}

          {/* Error notice if API fails */}
          {error && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 p-2.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => loadMetricData(metric)}
                className="h-6 px-2 text-[11px]"
              >
                {t.common.retry}
              </Button>
            </div>
          )}

          {/* Render 3D Earth Globe OR 2D Choropleth Map */}
          {isLoading && !datasetsByMetric[metric] ? (
            <MapSkeleton />
          ) : viewMode === "globe" ? (
            <InteractiveGlobe
              metric={metric}
              dataset={currentDataset}
              selectedIso3={selectedIso3}
              onSelectCountry={(iso3, name) => loadCountryProfile(iso3, name)}
              onHoverCountry={(tt) => setTooltip(tt)}
              onFocusUzbekistan={handleFocusUzbekistan}
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

          {/* Color Legend (Bottom Left) */}
          <div className="relative z-10 p-3 sm:p-4">
            <ColorLegend metric={metric} />
          </div>
        </div>

        {/* Selected Country Profile Panel */}
        <CountryDetailPanel
          country={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          isLoading={isProfileLoading}
        />
      </div>

      {/* Mouse hover tooltip */}
      <MapTooltip tooltip={tooltip} />
    </section>
  );
}
