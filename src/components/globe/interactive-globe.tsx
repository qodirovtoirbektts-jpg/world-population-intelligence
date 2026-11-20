"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { CountryMapData, MapMetricType, MapTooltipState } from "@/types/map";
import { resolveGeoToIso3 } from "@/lib/country-codes";
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Compass,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const GEO_URL = "/data/world-110m.json";

interface InteractiveGlobeProps {
  metric: MapMetricType;
  dataset: Record<string, CountryMapData>;
  selectedIso3: string | null;
  onSelectCountry: (iso3: string, countryName: string) => void;
  onHoverCountry: (tooltip: MapTooltipState | null) => void;
  onFocusUzbekistan?: () => void;
}

function getFillColor(metric: MapMetricType, val: number | null | undefined): string {
  if (val === null || val === undefined) {
    return "#1e293b"; // Dark slate for missing data
  }

  if (metric === "SP.POP.TOTL") {
    if (val < 5_000_000) return "#1e3a8a";
    if (val < 25_000_000) return "#2563eb";
    if (val < 100_000_000) return "#3b82f6";
    if (val < 500_000_000) return "#60a5fa";
    return "#93c5fd";
  }

  if (metric === "EN.POP.DNST") {
    if (val < 25) return "#042f2e";
    if (val < 75) return "#0f766e";
    if (val < 150) return "#14b8a6";
    if (val < 350) return "#2dd4bf";
    return "#5eead4";
  }

  if (metric === "SP.URB.TOTL.IN.ZS") {
    if (val < 30) return "#451a03";
    if (val < 50) return "#b45309";
    if (val < 70) return "#f59e0b";
    if (val < 85) return "#fbbf24";
    return "#fef08a";
  }

  // Growth Rate
  if (val < 0) return "#f43f5e";
  if (val < 1) return "#fdba74";
  if (val < 2) return "#86efac";
  if (val < 3) return "#22c55e";
  return "#15803d";
}

function getMetricTitle(metric: MapMetricType): string {
  switch (metric) {
    case "SP.POP.TOTL":
      return "Population";
    case "EN.POP.DNST":
      return "Density";
    case "SP.POP.GROW":
      return "Growth Rate";
    case "SP.URB.TOTL.IN.ZS":
      return "Urban Share";
  }
}

export const InteractiveGlobe = memo(function InteractiveGlobe({
  metric,
  dataset,
  selectedIso3,
  onSelectCountry,
  onHoverCountry,
}: InteractiveGlobeProps) {
  // Rotation: [longitude (yaw), latitude (pitch), roll]
  // Default centered roughly on Central Asia / Europe / Middle East
  const [rotation, setRotation] = useState<[number, number, number]>([-64.5, -35, 0]);
  const [scale, setScale] = useState<number>(240);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragStartRef = useRef<{ x: number; y: number; rot: [number, number, number] }>({
    x: 0,
    y: 0,
    rot: [-64.5, -35, 0],
  });
  const animFrameRef = useRef<number | null>(null);
  const metricTitle = getMetricTitle(metric);

  // Smooth cinematic auto-rotation
  useEffect(() => {
    if (!isAutoSpinning || isDragging) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      setRotation((prev) => {
        // Rotate longitude slowly (0.015 degrees per ms ~ 1 deg per 66ms)
        const newYaw = (prev[0] - delta * 0.012) % 360;
        return [newYaw, prev[1], 0];
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoSpinning, isDragging]);

  // Drag Interaction
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rot: [...rotation] as [number, number, number],
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [rotation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const sensitivity = 0.35;

    const newYaw = (dragStartRef.current.rot[0] + dx * sensitivity) % 360;
    // Clamp pitch between -80 and +80 to avoid flipping upside down
    const newPitch = Math.max(-80, Math.min(80, dragStartRef.current.rot[1] - dy * sensitivity));

    setRotation([newYaw, newPitch, 0]);
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  // Quick camera actions
  const focusUzbekistan = useCallback(() => {
    setIsAutoSpinning(false);
    // Center camera on Tashkent, Uzbekistan (64.5° E, 41.3° N)
    setRotation([-64.5, -41.3, 0]);
    setScale(280);
    const countryData = dataset["UZB"];
    onSelectCountry("UZB", countryData?.name || "Uzbekistan");
  }, [dataset, onSelectCountry]);

  const resetView = useCallback(() => {
    setRotation([-15, -15, 0]);
    setScale(240);
  }, []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(420, s * 1.25));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(160, s / 1.25));
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] flex items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#030712] via-[#050b1a] to-[#071026] rounded-3xl border border-blue-900/30 shadow-[inset_0_0_80px_rgba(30,58,138,0.25)]">
      {/* 1. Ambient Background Stars & Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Luminous outer corona behind the globe */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[640px] h-[520px] sm:h-[640px] rounded-full bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-indigo-500/15 blur-3xl pointer-events-none animate-pulse duration-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] rounded-full border border-cyan-500/20 shadow-[0_0_90px_rgba(56,189,248,0.2)] pointer-events-none" />
      </div>

      {/* 2. Floating Top-Left Telemetry Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        <Badge
          variant="outline"
          className="bg-slate-950/80 backdrop-blur-md border-cyan-500/40 text-cyan-400 font-mono text-[11px] px-3 py-1 shadow-lg flex items-center gap-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          Interactive 3D Earth Globe
        </Badge>
        <Badge
          variant="outline"
          className="bg-slate-950/70 backdrop-blur-md border-border/60 text-muted-foreground font-mono text-[10px] px-2.5 py-0.5 hidden sm:inline-flex"
        >
          Orthographic Vector Projection
        </Badge>
      </div>

      {/* 3. Floating Interactive Controls (Lepus Boketto Style) */}
      <div className="absolute bottom-5 left-5 z-20 flex flex-wrap items-center gap-2 bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 p-1.5 rounded-2xl shadow-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAutoSpinning((s) => !s)}
          className={`h-8 px-2.5 rounded-xl text-xs font-mono transition-all gap-1.5 ${
            isAutoSpinning
              ? "text-cyan-400 bg-cyan-950/50 border border-cyan-500/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title={isAutoSpinning ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
        >
          {isAutoSpinning ? (
            <>
              <Pause className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Spinning</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Auto-Spin</span>
            </>
          )}
        </Button>

        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

        <Button
          variant="ghost"
          size="icon"
          onClick={zoomIn}
          className="h-8 w-8 rounded-xl text-muted-foreground hover:text-cyan-400 hover:bg-slate-900"
          title="Zoom In"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={zoomOut}
          className="h-8 w-8 rounded-xl text-muted-foreground hover:text-cyan-400 hover:bg-slate-900"
          title="Zoom Out"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={resetView}
          className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-900"
          title="Reset Camera View"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>

        <div className="h-4 w-[1px] bg-slate-800" />

        <Button
          variant="default"
          size="sm"
          onClick={focusUzbekistan}
          className="h-8 px-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30 gap-1.5"
        >
          <MapPin className="h-3.5 w-3.5" />
          <span>Focus Uzbekistan</span>
        </Button>
      </div>

      {/* 4. Drag Instructions Hint */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden md:flex items-center gap-2 font-mono text-[11px] text-muted-foreground/80 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800/80">
        <Compass className="h-3.5 w-3.5 text-cyan-400 animate-spin duration-3000" />
        <span>Drag to rotate sphere in 3D</span>
      </div>

      {/* 5. Central 3D Globe Vector Map */}
      <div
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            rotate: rotation,
            scale: scale,
          }}
          width={800}
          height={640}
          className="w-full h-full max-h-[660px]"
        >
          <defs>
            {/* Atmospheric Specular Gradient for the 3D Sphere */}
            <radialGradient id="globeShading" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
              <stop offset="45%" stopColor="#0f172a" stopOpacity="0.8" />
              <stop offset="90%" stopColor="#020617" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </radialGradient>

            {/* Atmosphere Rim Light */}
            <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
              <stop offset="92%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="98%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
            </radialGradient>

            {/* Outer Halo Glow Filter */}
            <filter id="glowHalo" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Space Background Sphere (Ocean Base) */}
          <Sphere
            id="earth-ocean-base"
            fill="#060e24"
            stroke="#1e3a8a"
            strokeWidth={1.5}
          />

          {/* Planetary Lat / Long Graticules */}
          <Graticule
            stroke="rgba(56, 189, 248, 0.14)"
            strokeWidth={0.5}
          />

          {/* Sovereign Country Polygons */}
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                const geoName = geo.properties?.name || "Unknown";
                const iso3 = resolveGeoToIso3(geo.id, geoName);
                const countryData = iso3 ? dataset[iso3] : null;

                const isSelected = Boolean(selectedIso3 && iso3 === selectedIso3);
                const isUzbekistan = iso3 === "UZB";
                const fillColor = getFillColor(metric, countryData?.value);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isUzbekistan ? "#10b981" : fillColor}
                    stroke={
                      isSelected
                        ? "#38bdf8"
                        : isUzbekistan
                        ? "#34d399"
                        : "#0f172a"
                    }
                    strokeWidth={isSelected || isUzbekistan ? 1.75 : 0.4}
                    className="transition-colors duration-150 hover:opacity-90 hover:stroke-white hover:stroke-[1.5px] cursor-pointer outline-none focus:outline-none"
                    style={{ outline: "none" }}
                    onClick={() => {
                      if (iso3) {
                        onSelectCountry(iso3, countryData?.name || geoName);
                      }
                    }}
                    onMouseEnter={(evt: React.MouseEvent) => {
                      if (iso3) {
                        onHoverCountry({
                          countryName: countryData?.name || geoName,
                          iso3,
                          value: countryData?.formattedValue || "No data available",
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
                          countryName: countryData?.name || geoName,
                          iso3,
                          value: countryData?.formattedValue || "No data available",
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

          {/* 3D Atmospheric Shading Overlay (Lighting / Terminator) */}
          <Sphere
            id="earth-atmosphere-overlay"
            fill="url(#globeShading)"
            stroke="url(#globeAtmosphere)"
            strokeWidth={2}
            className="pointer-events-none"
          />
        </ComposableMap>
      </div>
    </div>
  );
});
