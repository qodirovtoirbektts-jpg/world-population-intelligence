import { DemographicIndicatorCode } from "./world-bank";

export type MapMetricType = "SP.POP.TOTL" | "EN.POP.DNST" | "SP.POP.GROW" | "SP.URB.TOTL.IN.ZS";

export interface CountryMapData {
  iso3: string;
  name: string;
  value: number | null;
  formattedValue: string;
  year: string | null;
  isAvailable: boolean;
  unit: string;
}

export type MapDataSet = Record<string, CountryMapData>;

export interface MapTooltipState {
  countryName: string;
  iso3: string;
  value: string;
  year: string | null;
  metricTitle: string;
  unit: string;
  x: number;
  y: number;
}

export interface SelectedCountryProfile {
  iso3: string;
  name: string;
  numericId?: string;
  population?: { value: string; raw: number | null; year: string | null };
  density?: { value: string; raw: number | null; year: string | null };
  growthRate?: { value: string; raw: number | null; year: string | null };
  urbanShare?: { value: string; raw: number | null; year: string | null };
  capital?: string;
  region?: string;
  incomeLevel?: string;
  isVerified: boolean;
}

export interface UnmatchedCountryReport {
  totalGeometries: number;
  matchedCount: number;
  unmatchedList: Array<{ id: string | undefined; name: string; reason: string }>;
  matchingCoveragePercentage: number;
}
