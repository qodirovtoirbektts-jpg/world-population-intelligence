"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { CountryMapData, MapMetricType, MapTooltipState } from "@/types/map";
import { resolveGeoToIso3 } from "@/lib/country-codes";
import { buildCountryGeoTargets, CountryGeoTarget } from "@/lib/geo-centroids";
import { getLocalizedCountryName, matchesLocalizedCountry } from "@/lib/country-names";
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  MapPin,
  Search,
  X,
  MousePointerClick,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/language";

const GEO_URL = "/data/world-110m.json";
const BASE_SCALE = 220;
const MIN_SCALE = 210;
const MAX_SCALE = 1760; // 8.0x zoom so even micro-states can be clicked effortlessly

export interface GlobeExternalFocus {
  rotation: [number, number, number];
  scale: number;
  seq: number;
}

interface InteractiveGlobeProps {
  metric: MapMetricType;
  dataset: Record<string, CountryMapData>;
  selectedIso3: string | null;
  onSelectCountry: (iso3: string, countryName: string) => void;
  onHoverCountry: (tooltip: MapTooltipState | null) => void;
  externalFocus?: GlobeExternalFocus | null;
  focusCountryIso3?: { iso3: string; seq: number } | null;
}

export function getCartographicFillColor(
  metric: MapMetricType,
  val: number | null | undefined
): string {
  if (val === null || val === undefined) {
    return "#e2e8f0"; // Clean porcelain slate for missing data
  }

  if (metric === "SP.POP.TOTL") {
    if (val < 5_000_000) return "#dbeafe";
    if (val < 25_000_000) return "#93c5fd";
    if (val < 100_000_000) return "#3b82f6";
    if (val < 500_000_000) return "#1d4ed8";
    return "#1e3a8a";
  }

  if (metric === "EN.POP.DNST") {
    if (val < 25) return "#e0f2fe";
    if (val < 75) return "#7dd3fc";
    if (val < 150) return "#0ea5e9";
    if (val < 350) return "#0369a1";
    return "#0c4a6e";
  }

  if (metric === "SP.URB.TOTL.IN.ZS") {
    if (val < 30) return "#e0e7ff";
    if (val < 50) return "#a5b4fc";
    if (val < 70) return "#6366f1";
    if (val < 85) return "#4338ca";
    return "#312e81";
  }

  // Growth Rate (coherent blue ramp + soft coral for negative demographic contraction)
  if (val < 0) return "#fca5a5";
  if (val < 1) return "#dbeafe";
  if (val < 2) return "#93c5fd";
  if (val < 3) return "#2563eb";
  return "#1e3a8a";
}

function shortestLonDelta(fromLon: number, toLon: number): number {
  let diff = ((toLon - fromLon + 540) % 360) - 180;
  return diff;
}

export const InteractiveGlobe = memo(function InteractiveGlobe({
  metric,
  dataset,
  selectedIso3,
  onSelectCountry,
  onHoverCountry,
  externalFocus,
  focusCountryIso3,
}: InteractiveGlobeProps) {
  const { t, language } = useTranslation();

  // Default centered toward Eurasia & Central Asia
  const [rotation, setRotation] = useState<[number, number, number]>([-64.5, -36, 0]);
  const [scale, setScale] = useState<number>(240);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [wheelZoomEnabled, setWheelZoomEnabled] = useState<boolean>(true);

  // TopoJSON country centroids for instant fly-to on any of 177+ territories
  const [geoTargets, setGeoTargets] = useState<Record<string, CountryGeoTarget>>({});
  const [jumpQuery, setJumpQuery] = useState<string>("");
  const [jumpOpen, setJumpOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartRef = useRef<{ dist: number; scale: number } | null>(null);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    rot: [number, number, number];
  }>({
    x: 0,
    y: 0,
    rot: [-64.5, -36, 0],
  });
  const wasDraggedRef = useRef<boolean>(false);
  const spinFrameRef = useRef<number | null>(null);
  const flyFrameRef = useRef<number | null>(null);
  const rotationRef = useRef<[number, number, number]>(rotation);
  const scaleRef = useRef<number>(scale);

  rotationRef.current = rotation;
  scaleRef.current = scale;

  const metricTitle =
    metric === "SP.POP.TOTL"
      ? t.centerpiece.tabPop
      : metric === "EN.POP.DNST"
      ? t.centerpiece.tabDnst
      : metric === "SP.POP.GROW"
      ? t.centerpiece.tabGrow
      : t.centerpiece.tabUrb;

  // Load TopoJSON once to compute exact centroids & ideal zoom for all 177+ territories
  useEffect(() => {
    let active = true;
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topo) => {
        if (!active) return;
        setGeoTargets(buildCountryGeoTargets(topo));
      })
      .catch((err) => console.warn("[InteractiveGlobe] Centroid preload warning:", err));
    return () => {
      active = false;
    };
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setJumpOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Smooth camera animation helper
  const flyTo = useCallback((targetRot: [number, number, number], targetScale: number) => {
    if (flyFrameRef.current) cancelAnimationFrame(flyFrameRef.current);
    setIsAutoSpinning(false);

    const startRot = [...rotationRef.current] as [number, number, number];
    const startScale = scaleRef.current;
    const dLon = shortestLonDelta(startRot[0], targetRot[0]);
    const dLat = targetRot[1] - startRot[1];
    const dScale = targetScale - startScale;

    const duration = 560;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min(1, (now - startTime) / duration);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - elapsed, 3);
      const nextLon = startRot[0] + dLon * ease;
      const nextLat = Math.max(-80, Math.min(80, startRot[1] + dLat * ease));
      const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, startScale + dScale * ease));

      setRotation([nextLon, nextLat, 0]);
      setScale(nextScale);

      if (elapsed < 1) {
        flyFrameRef.current = requestAnimationFrame(step);
      } else {
        flyFrameRef.current = null;
      }
    };

    flyFrameRef.current = requestAnimationFrame(step);
  }, []);

  // React to external regional camera focus requests
  useEffect(() => {
    if (!externalFocus) return;
    flyTo(externalFocus.rotation, externalFocus.scale);
  }, [externalFocus, flyTo]);

  // React to external country focus requests (e.g. from search dialog or ranking table)
  useEffect(() => {
    if (!focusCountryIso3) return;
    const iso = focusCountryIso3.iso3.toUpperCase();
    const target = geoTargets[iso];
    if (target) {
      flyTo([-target.coordinates[0], -target.coordinates[1], 0], target.recommendedScale);
      const countryData = dataset[iso];
      onSelectCountry(iso, countryData?.name || target.name);
    } else if (iso === "UZB") {
      flyTo([-64.5, -41.3, 0], 680);
      onSelectCountry("UZB", dataset["UZB"]?.name || "Uzbekistan");
    }
  }, [focusCountryIso3, geoTargets, dataset, flyTo, onSelectCountry]);

  // Smooth auto-rotation when idle
  useEffect(() => {
    if (!isAutoSpinning || isDragging) {
      if (spinFrameRef.current) cancelAnimationFrame(spinFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = Math.min(50, time - lastTime);
      lastTime = time;

      setRotation((prev) => {
        const newYaw = (prev[0] - delta * 0.008) % 360;
        return [newYaw, prev[1], 0];
      });

      spinFrameRef.current = requestAnimationFrame(animate);
    };

    spinFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (spinFrameRef.current) cancelAnimationFrame(spinFrameRef.current);
    };
  }, [isAutoSpinning, isDragging]);

  // Non-passive wheel zoom so users can zoom directly from 1x to 8x on the globe
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !wheelZoomEnabled) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (flyFrameRef.current) {
        cancelAnimationFrame(flyFrameRef.current);
        flyFrameRef.current = null;
      }
      setIsAutoSpinning(false);
      const zoomFactor = Math.exp(-e.deltaY * 0.0014);
      setScale((prev) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev * zoomFactor)));
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [wheelZoomEnabled]);

  // Pointer drag + two-finger pinch-to-zoom handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Ignore pointer down inside overlay controls/inputs
    if ((e.target as HTMLElement).closest("[data-globe-ui]")) return;

    if (flyFrameRef.current) {
      cancelAnimationFrame(flyFrameRef.current);
      flyFrameRef.current = null;
    }

    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointersRef.current.size === 2) {
      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      pinchStartRef.current = { dist, scale: scaleRef.current };
      wasDraggedRef.current = true;
      return;
    }

    setIsDragging(true);
    wasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rot: [...rotationRef.current] as [number, number, number],
    };
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (activePointersRef.current.has(e.pointerId)) {
        activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }

      // Two-finger pinch zoom
      if (activePointersRef.current.size === 2 && pinchStartRef.current) {
        const pts = Array.from(activePointersRef.current.values());
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        if (pinchStartRef.current.dist > 0) {
          const factor = dist / pinchStartRef.current.dist;
          setScale(
            Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinchStartRef.current.scale * factor))
          );
          setIsAutoSpinning(false);
        }
        return;
      }

      if (!isDragging) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      if (Math.hypot(dx, dy) > 5) {
        wasDraggedRef.current = true;
        setIsAutoSpinning(false);
      }

      // Scale-normalized drag sensitivity so zoomed-in movement stays smooth and precise
      const sensitivity = 0.34 * (240 / Math.max(scaleRef.current, MIN_SCALE));
      const newYaw = (dragStartRef.current.rot[0] + dx * sensitivity) % 360;
      const newPitch = Math.max(
        -80,
        Math.min(80, dragStartRef.current.rot[1] - dy * sensitivity)
      );

      setRotation([newYaw, newPitch, 0]);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) {
      pinchStartRef.current = null;
    }
    if (activePointersRef.current.size === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDoubleClick = useCallback(() => {
    setIsAutoSpinning(false);
    setScale((s) => Math.min(MAX_SCALE, s * 1.55));
  }, []);

  // Quick camera actions
  const focusUzbekistan = useCallback(() => {
    const target = geoTargets["UZB"];
    const coords = target?.coordinates || [64.5, 41.3];
    flyTo([-coords[0], -coords[1], 0], 680);
    const countryData = dataset["UZB"];
    onSelectCountry("UZB", countryData?.name || "Uzbekistan");
  }, [geoTargets, dataset, flyTo, onSelectCountry]);

  const resetView = useCallback(() => {
    flyTo([-40, -24, 0], 240);
  }, [flyTo]);

  const zoomIn = useCallback(() => {
    setIsAutoSpinning(false);
    setScale((s) => Math.min(MAX_SCALE, s * 1.4));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(MIN_SCALE, s / 1.4));
  }, []);

  const handleCountryJump = useCallback(
    (iso3: string) => {
      const target = geoTargets[iso3];
      const countryData = dataset[iso3];
      if (target) {
        flyTo([-target.coordinates[0], -target.coordinates[1], 0], target.recommendedScale);
      }
      onSelectCountry(iso3, countryData?.name || target?.name || iso3);
      setJumpQuery("");
      setJumpOpen(false);
    },
    [geoTargets, dataset, flyTo, onSelectCountry]
  );

  // Build searchable list of ALL 177+ territories in TopoJSON enriched with dataset names
  const searchableCountries = useMemo(() => {
    const targets = Object.values(geoTargets);
    return targets
      .map((item) => {
        const englishName = dataset[item.iso3]?.name || item.name;
        const displayName = getLocalizedCountryName(item.iso3, englishName, language);
        return {
          iso3: item.iso3,
          englishName,
          displayName,
        };
      })
      .filter((item) =>
        matchesLocalizedCountry(item.iso3, item.englishName, "", jumpQuery) ||
        item.displayName.toLowerCase().includes(jumpQuery.trim().toLowerCase())
      )
      .sort((a, b) => {
        if (a.iso3 === "UZB") return -1;
        if (b.iso3 === "UZB") return 1;
        return a.displayName.localeCompare(b.displayName);
      })
      .slice(0, 12);
  }, [geoTargets, dataset, language, jumpQuery]);

  const zoomMultiplier = (scale / BASE_SCALE).toFixed(1);

  const regionalPills = useMemo(
    () => [
      {
        label: language === "uz" ? "Markaziy Osiyo" : language === "ru" ? "Центр. Азия" : "Central Asia",
        coords: [-65, -42, 0] as [number, number, number],
        scale: 560,
      },
      {
        label: language === "uz" ? "Yevropa" : language === "ru" ? "Европа" : "Europe",
        coords: [-14, -49, 0] as [number, number, number],
        scale: 580,
      },
      {
        label: language === "uz" ? "Sharqiy Osiyo" : language === "ru" ? "Вост. Азия" : "East Asia",
        coords: [-110, -34, 0] as [number, number, number],
        scale: 420,
      },
      {
        label: language === "uz" ? "Yaqin Sharq" : language === "ru" ? "Бл. Восток" : "Middle East",
        coords: [-45, -27, 0] as [number, number, number],
        scale: 520,
      },
      {
        label: language === "uz" ? "Amerika" : language === "ru" ? "Америка" : "Americas",
        coords: [82, -22, 0] as [number, number, number],
        scale: 300,
      },
    ],
    [language]
  );

  return (
    <div
      ref={containerRef}
      onDoubleClick={handleDoubleClick}
      className="relative w-full h-[460px] sm:h-[580px] lg:h-[630px] flex items-center justify-center overflow-hidden select-none rounded-2xl border border-blue-200/80 dark:border-blue-900/40 bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#eef5ff_62%,#e0ecff_100%)] dark:bg-[radial-gradient(circle_at_50%_45%,#0f172a_0%,#091124_70%,#050a18_100%)]"
    >
      {/* Top Toolbar Overlay: Country Jump Search + Zoom Badge */}
      <div
        data-globe-ui="true"
        className="absolute top-3.5 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none"
      >
        {/* Inline Country Jump Search */}
        <div ref={searchBoxRef} className="relative w-full sm:w-72 pointer-events-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-600 dark:text-blue-400 pointer-events-none" />
            <input
              type="text"
              value={jumpQuery}
              onChange={(e) => {
                setJumpQuery(e.target.value);
                setJumpOpen(true);
                setIsAutoSpinning(false);
              }}
              onFocus={() => {
                setJumpOpen(true);
                setIsAutoSpinning(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchableCountries.length > 0) {
                  e.preventDefault();
                  handleCountryJump(searchableCountries[0].iso3);
                } else if (e.key === "Escape") {
                  setJumpOpen(false);
                }
              }}
              placeholder={t.centerpiece.searchCountryPlaceholder}
              aria-label={t.centerpiece.searchCountryPlaceholder}
              className="w-full h-9 pl-8 pr-8 rounded-xl border border-blue-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
            />
            {jumpQuery && (
              <button
                type="button"
                onClick={() => setJumpQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label={t.common.close}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {jumpOpen && searchableCountries.length > 0 && (
            <div className="absolute left-0 right-0 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-blue-100 dark:border-slate-700 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl shadow-xl p-1 space-y-0.5 z-40">
              {searchableCountries.map((c) => {
                const metricVal = dataset[c.iso3]?.formattedValue;
                return (
                  <button
                    key={c.iso3}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleCountryJump(c.iso3)}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 shrink-0">
                        {c.iso3}
                      </span>
                      <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                        {c.displayName}
                      </span>
                    </div>
                    {metricVal && (
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 shrink-0 pl-2">
                        {metricVal}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Hints & Quick Region Pills (Desktop) */}
        <div className="hidden md:flex items-center gap-1.5 pointer-events-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-blue-100 dark:border-slate-700 px-2.5 py-1.5 rounded-xl shadow-sm">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 pr-1">
            {t.centerpiece.regionJumpLabel}
          </span>
          {regionalPills.map((reg) => (
            <button
              key={reg.label}
              type="button"
              onClick={() => flyTo(reg.coords, reg.scale)}
              className="px-2 py-0.5 rounded-lg text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 transition-colors"
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Interactive Control Bar */}
      <div
        data-globe-ui="true"
        className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none"
      >
        <div className="flex flex-wrap items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-blue-200/80 dark:border-slate-700 p-1.5 rounded-2xl shadow-lg pointer-events-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAutoSpinning((s) => !s)}
            className={`h-8 px-2.5 rounded-xl text-xs font-medium transition-all gap-1.5 ${
              isAutoSpinning
                ? "text-blue-700 bg-blue-50 border border-blue-200 dark:text-blue-300 dark:bg-blue-950/60 dark:border-blue-800"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100"
            }`}
            title={isAutoSpinning ? t.centerpiece.globeSpinning : t.centerpiece.globeAutoSpin}
          >
            {isAutoSpinning ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t.centerpiece.globeSpinning}</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t.centerpiece.globeAutoSpin}</span>
              </>
            )}
          </Button>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700" />

          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="h-8 w-8 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50"
            title={t.centerpiece.globeZoomOut}
            aria-label={t.centerpiece.globeZoomOut}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>

          {/* Direct Range Slider for Smooth 1x-8x Zoom */}
          <div className="hidden sm:flex items-center gap-2 px-1">
            <input
              type="range"
              min={MIN_SCALE}
              max={MAX_SCALE}
              step={20}
              value={scale}
              onChange={(e) => {
                setIsAutoSpinning(false);
                setScale(Number(e.target.value));
              }}
              aria-label={t.centerpiece.zoomLevel}
              className="w-20 lg:w-28 accent-blue-700 cursor-pointer h-1.5"
            />
          </div>

          <span className="font-mono text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2 py-0.5 rounded-lg tabular-nums">
            {zoomMultiplier}×
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="h-8 w-8 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50"
            title={t.centerpiece.globeZoomIn}
            aria-label={t.centerpiece.globeZoomIn}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={resetView}
            className="h-8 w-8 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100"
            title={t.centerpiece.globeReset}
            aria-label={t.centerpiece.globeReset}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700" />

          <Button
            variant="default"
            size="sm"
            onClick={focusUzbekistan}
            className="h-8 px-3 rounded-xl text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-sm gap-1.5"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>{t.centerpiece.focusUzbekistan}</span>
          </Button>
        </div>

        {/* Hint / Wheel Zoom Toggle Pill */}
        <button
          type="button"
          onClick={() => setWheelZoomEnabled((v) => !v)}
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-blue-100 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-blue-700 shadow-sm pointer-events-auto transition-colors"
        >
          <MousePointerClick className="h-3.5 w-3.5 text-blue-600" />
          <span>{wheelZoomEnabled ? t.centerpiece.scrollZoomOn : t.centerpiece.scrollZoomOff}</span>
        </button>
      </div>

      {/* Central 3D Globe SVG Viewport */}
      <div
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            rotate: rotation,
            scale: scale,
          }}
          width={800}
          height={640}
          className="w-full h-full max-h-[630px]"
        >
          <defs>
            {/* Clean White-Blue Ocean Sphere Gradient */}
            <radialGradient id="oceanLightBlue" cx="38%" cy="34%" r="68%">
              <stop offset="0%" stopColor="#eff6ff" />
              <stop offset="55%" stopColor="#cfe3ff" />
              <stop offset="88%" stopColor="#a5c8fb" />
              <stop offset="100%" stopColor="#82b2f8" />
            </radialGradient>

            {/* Subtle 3D Spherical Limb Shading Overlay */}
            <radialGradient id="globeLimbShading" cx="34%" cy="28%" r="68%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="68%" stopColor="#1e3a8a" stopOpacity="0.02" />
              <stop offset="92%" stopColor="#1e3a8a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0f295c" stopOpacity="0.22" />
            </radialGradient>
          </defs>

          {/* Ocean Sphere Base */}
          <Sphere
            id="earth-ocean-base"
            fill="url(#oceanLightBlue)"
            stroke="#93c5fd"
            strokeWidth={1.2}
          />

          {/* Subtle Cartographic Graticule */}
          <Graticule stroke="rgba(37, 99, 235, 0.14)" strokeWidth={0.5} />

          {/* Sovereign Countries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                const geoName = geo.properties?.name || "Unknown";
                const iso3 = resolveGeoToIso3(geo.id, geoName);
                const countryData = iso3 ? dataset[iso3] : null;

                const isSelected = Boolean(selectedIso3 && iso3 === selectedIso3);
                const isUzbekistan = iso3 === "UZB";
                const localizedName = iso3
                  ? getLocalizedCountryName(iso3, countryData?.name || geoName, language)
                  : geoName;

                const baseFill = getCartographicFillColor(metric, countryData?.value);
                const finalFill = isSelected ? "#0f295c" : baseFill;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={finalFill}
                    stroke={
                      isSelected
                        ? "#ffffff"
                        : isUzbekistan
                        ? "#1d4ed8"
                        : "#ffffff"
                    }
                    strokeWidth={
                      isSelected
                        ? Math.max(1.2, 2.2 / Math.sqrt(scale / BASE_SCALE))
                        : isUzbekistan
                        ? Math.max(0.9, 1.4 / Math.sqrt(scale / BASE_SCALE))
                        : Math.max(0.35, 0.65 / Math.sqrt(scale / BASE_SCALE))
                    }
                    className={`transition-colors duration-150 cursor-pointer outline-none focus:outline-none ${
                      isSelected ? "" : "hover:[fill:#1d4ed8]"
                    }`}
                    style={{ outline: "none" }}
                    onClick={() => {
                      if (wasDraggedRef.current || !iso3) return;
                      // Smoothly bring clicked country closer to center if off-axis
                      const target = geoTargets[iso3];
                      if (target) {
                        flyTo(
                          [-target.coordinates[0], -target.coordinates[1], 0],
                          Math.max(scaleRef.current, Math.min(target.recommendedScale, 760))
                        );
                      }
                      onSelectCountry(iso3, countryData?.name || geoName);
                    }}
                    onMouseEnter={(evt: React.MouseEvent) => {
                      if (iso3) {
                        onHoverCountry({
                          countryName: localizedName,
                          iso3,
                          value: countryData?.formattedValue || t.common.na,
                          year: countryData?.year || null,
                          metricTitle,
                          unit: countryData?.unit || "",
                          x: evt.clientX,
                          y: evt.clientY,
                        });
                      }
                    }}
                    onMouseMove={(evt: React.MouseEvent) => {
                      if (iso3) {
                        onHoverCountry({
                          countryName: localizedName,
                          iso3,
                          value: countryData?.formattedValue || t.common.na,
                          year: countryData?.year || null,
                          metricTitle,
                          unit: countryData?.unit || "",
                          x: evt.clientX,
                          y: evt.clientY,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      onHoverCountry(null);
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Subtle 3D Spherical Lighting Rim */}
          <Sphere
            id="earth-atmosphere-overlay"
            fill="url(#globeLimbShading)"
            stroke="#60a5fa"
            strokeWidth={1.5}
            className="pointer-events-none"
          />
        </ComposableMap>
      </div>
    </div>
  );
});
