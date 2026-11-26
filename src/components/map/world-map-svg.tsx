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
import { getCartographicFillColor } from "@/components/globe/interactive-globe";
import { getLocalizedCountryName } from "@/lib/country-names";
import { useTranslation } from "@/components/language";

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

export const WorldMapSvg = memo(function WorldMapSvg({
  metric,
  dataset,
  selectedIso3,
  onSelectCountry,
  onHoverCountry,
  position,
  onMoveEnd,
}: WorldMapSvgProps) {
  const { t, language } = useTranslation();

  const metricTitle =
    metric === "SP.POP.TOTL"
      ? t.centerpiece.tabPop
      : metric === "EN.POP.DNST"
      ? t.centerpiece.tabDnst
      : metric === "SP.POP.GROW"
      ? t.centerpiece.tabGrow
      : t.centerpiece.tabUrb;

  return (
    <div className="w-full h-[460px] sm:h-[580px] lg:h-[630px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none rounded-2xl border border-blue-200/80 dark:border-blue-900/40 bg-[#eff6ff] dark:bg-slate-950">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 152,
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
                const localizedName = iso3
                  ? getLocalizedCountryName(iso3, countryData?.name || geoName, language)
                  : geoName;

                const isSelected = Boolean(selectedIso3 && iso3 === selectedIso3);
                const fillColor = isSelected
                  ? "#0f295c"
                  : getCartographicFillColor(metric, countryData?.value);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke={isSelected ? "#ffffff" : "#ffffff"}
                    strokeWidth={isSelected ? 1.5 / Math.sqrt(position.zoom) : 0.6 / Math.sqrt(position.zoom)}
                    className={`transition-colors duration-150 cursor-pointer outline-none focus:outline-none ${
                      isSelected ? "" : "hover:[fill:#1d4ed8]"
                    }`}
                    style={{ outline: "none" }}
                    onClick={() => {
                      if (iso3) {
                        onSelectCountry(iso3, countryData?.name || geoName);
                      }
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
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});
