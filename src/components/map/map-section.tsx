"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MetricSelector } from "./metric-selector";
import { ColorLegend } from "./color-legend";
import { MapControls } from "./map-controls";
import { MapTooltip } from "./map-tooltip";
import { CountryDetailPanel } from "./country-detail-panel";
import { UnmatchedStatus } from "./unmatched-status";
import { WorldMapSvg } from "./world-map-svg";
import { MapSkeleton } from "./map-skeleton";
import { MapMetricType, CountryMapData, MapTooltipState, SelectedCountryProfile } from "@/types/map";
import { MapPin, AlertCircle, RefreshCw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportDropdown } from "@/components/export";

export function MapSection() {
  const [metric, setMetric] = useState<MapMetricType>("SP.POP.TOTL");
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
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Layers className="h-4 w-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Interactive Choropleth World Map
            </h2>
            <Badge variant="success" className="text-[10px] py-0.5 px-2">
              Stage 3 Live
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            200+ countries rendered via TopoJSON 110m vectors with live World Bank demographic metrics.
          </p>
        </div>

        {/* Quick Country Focus & Audit Pill & CSV Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <ExportDropdown
            mapDataset={datasetsByMetric[metric] || {}}
            activeMapMetric={metric}
            variant="map"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={handleFocusUzbekistan}
            className="gap-1.5 text-xs border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
          >
            <MapPin className="h-3.5 w-3.5 text-blue-400" />
            <span>Focus Uzbekistan (UZB)</span>
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

      {/* Main Map Canvas and Detail Panel */}
      <div className="relative flex flex-col lg:flex-row items-start gap-6 rounded-3xl border border-border/80 bg-card/40 p-4 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Map Viewport Area */}
        <div className="relative flex-1 w-full min-h-[460px] sm:min-h-[560px] rounded-2xl border border-border/60 bg-background/50 overflow-hidden flex flex-col justify-between">
          {/* Zoom & Pan Controls (Top-right) */}
          <div className="absolute top-4 right-4 z-20">
            <MapControls
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleReset}
            />
          </div>

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
                Retry
              </Button>
            </div>
          )}

          {/* Interactive SVG World Map */}
          {isLoading && !datasetsByMetric[metric] ? (
            <MapSkeleton />
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
