import { DemographicIndicatorCode } from "./world-bank";

export interface CountryListItem {
  iso3: string;
  name: string;
  region: string;
  flag?: string;
}

export interface MetricComparisonItem {
  code: DemographicIndicatorCode;
  label: string;
  value: number | null;
  formattedValue: string;
  year: string | null;
  unit: string;
  source: string;
  isAvailable: boolean;
}

export interface CountryComparisonProfile {
  iso3: string;
  name: string;
  flag?: string;
  color: string;
  metrics: Record<DemographicIndicatorCode, MetricComparisonItem>;
  isVerified: boolean;
}

export interface HistoricalYearPoint {
  year: number;
  [iso3: string]: number | null;
}

export type ComparisonTab = "SP.POP.TOTL" | "EN.POP.DNST" | "SP.POP.GROW" | "SP.URB.TOTL.IN.ZS";

export interface ComparisonDataset {
  countries: CountryComparisonProfile[];
  historical: Record<DemographicIndicatorCode, HistoricalYearPoint[]>;
  latestUpdated: string;
}
