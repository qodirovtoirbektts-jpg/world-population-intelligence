"use client";

import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { CountryMapData, MapMetricType, MapTooltipState } from "@/types/map";
import { resolveGeoToIso3 } from "@/lib/country-codes";

const GEO_URL = "/data/world-110m.json";

interface WorldMapSvgProps {
  metric: MapMetricType;
  dataset: Record<string, CountryMapData>;
  selectedIso3: string | null;
  onSelectCountry: (iso3: string, countryName: string) => void;
  onHoverCountry: (tooltip: MapTooltipState | null) => void;
  position: { coordinates: [number, number]; zoom: number };
  onMoveEnd: (position: { coordinates: [number, number]; zoom: number }) => void;
}

function getFillColor(metric: MapMetricType, val: number | null | undefined): string {
  if (val === null || val === undefined) {
    return "#334155"; // Slate 700 for no data
  }

  if (metric === "SP.POP.TOTL") {
    if (val < 5_000_000) return "#dbeafe";
    if (val < 25_000_000) return "#93c5fd";
    if (val < 100_000_000) return "#3b82f6";
    if (val < 500_000_000) return "#1d4ed8";
    return "#1e1b4b";
  }

  if (metric === "EN.POP.DNST") {
    if (val < 25) return "#ccfbf1";
    if (val < 75) return "#5eead4";
    if (val < 150) return "#14b8a6";
    if (val < 350) return "#0f766e";
    return "#042f2e";
  }

  if (metric === "SP.URB.TOTL.IN.ZS") {
    if (val < 30) return "#fef3c7";
    if (val < 50) return "#fde047";
    if (val < 70) return "#f59e0b";
    if (val < 85) return "#d97706";
    return "#78350f";
  }

  // Growth Rate
  if (val < 0) return "#ef4444";
  if (val < 1) return "#fed7aa";
  if (val < 2) return "#86efac";
  if (val < 3) return "#22c55e";
  return "#14532d";
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

export const WorldMapSvg = memo(function WorldMapSvg({
  metric,
  dataset,
  selectedIso3,
  onSelectCountry,
  onHoverCountry,
  position,
  onMoveEnd,
}: WorldMapSvgProps) {
  const metricTitle = getMetricTitle(metric);

  return (
    <div className="w-full h-full min-h-[460px] sm:min-h-[560px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        width={980}
        height={540}
        className="w-full h-auto max-h-[620px]"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={(props) => {
            if (props.coordinates) {
              onMoveEnd({
                coordinates: props.coordinates,
                zoom: props.zoom ?? position.zoom,
              });
            }
          }}
          minZoom={1}
          maxZoom={8}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                const geoName = geo.properties?.name || "Unknown";
                const iso3 = resolveGeoToIso3(geo.id, geoName);
                const countryData = iso3 ? dataset[iso3] : null;

                const isSelected = Boolean(selectedIso3 && iso3 === selectedIso3);
                const fillColor = getFillColor(metric, countryData?.value);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke={isSelected ? "#38bdf8" : "#1e293b"}
                    strokeWidth={isSelected ? 2 : 0.5}
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});
