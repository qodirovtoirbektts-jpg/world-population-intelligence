"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface GlobeFocusRequest {
  iso3: string;
  name?: string;
  seq: number;
}

export interface RegionFocusRequest {
  coordinates: [number, number]; // [lon, lat]
  zoomScale: number;
  label: string;
  seq: number;
}

interface DashboardContextType {
  comparisonCodes: string[];
  setComparisonCodes: (codes: string[]) => void;
  addCountryToComparison: (iso3: string) => void;
  globeFocusRequest: GlobeFocusRequest | null;
  focusCountryOnGlobe: (iso3: string, name?: string) => void;
  regionFocusRequest: RegionFocusRequest | null;
  focusRegionOnGlobe: (coordinates: [number, number], zoomScale: number, label: string) => void;
  selectedRegionFilter: string;
  setSelectedRegionFilter: (region: string) => void;
}

const DashboardContext = createContext<DashboardContextType>({
  comparisonCodes: ["UZB", "USA", "CHN"],
  setComparisonCodes: () => {},
  addCountryToComparison: () => {},
  globeFocusRequest: null,
  focusCountryOnGlobe: () => {},
  regionFocusRequest: null,
  focusRegionOnGlobe: () => {},
  selectedRegionFilter: "All",
  setSelectedRegionFilter: () => {},
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [comparisonCodes, setComparisonCodes] = useState<string[]>(["UZB", "USA", "CHN"]);
  const [globeFocusRequest, setGlobeFocusRequest] = useState<GlobeFocusRequest | null>(null);
  const [regionFocusRequest, setRegionFocusRequest] = useState<RegionFocusRequest | null>(null);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>("All");

  const addCountryToComparison = useCallback((iso3: string) => {
    const clean = iso3.toUpperCase();
    setComparisonCodes((prev) => {
      if (prev.includes(clean)) return prev;
      if (prev.length >= 5) {
        // Keep Uzbekistan if present, otherwise replace last entry
        return [...prev.slice(0, 4), clean];
      }
      return [...prev, clean];
    });
  }, []);

  const focusCountryOnGlobe = useCallback((iso3: string, name?: string) => {
    setGlobeFocusRequest({
      iso3: iso3.toUpperCase(),
      name,
      seq: Date.now() + Math.random(),
    });
  }, []);

  const focusRegionOnGlobe = useCallback(
    (coordinates: [number, number], zoomScale: number, label: string) => {
      setRegionFocusRequest({
        coordinates,
        zoomScale,
        label,
        seq: Date.now() + Math.random(),
      });
    },
    []
  );

  return (
    <DashboardContext.Provider
      value={{
        comparisonCodes,
        setComparisonCodes,
        addCountryToComparison,
        globeFocusRequest,
        focusCountryOnGlobe,
        regionFocusRequest,
        focusRegionOnGlobe,
        selectedRegionFilter,
        setSelectedRegionFilter,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
