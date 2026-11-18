export interface WorldBankMetadata {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  sourceid?: string;
  sourcename?: string;
  lastupdated?: string;
}

export interface WorldBankIndicatorRef {
  id: string;
  value: string;
}

export interface WorldBankCountryRef {
  id: string;
  value: string;
}

export interface WorldBankIndicatorRecord {
  indicator: WorldBankIndicatorRef;
  country: WorldBankCountryRef;
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export type WorldBankApiResponse = [
  WorldBankMetadata,
  WorldBankIndicatorRecord[] | null
];

export interface WorldBankCountryRecord {
  id: string;
  iso2Code: string;
  name: string;
  region: { id: string; iso2code: string; value: string };
  adminregion: { id: string; iso2code: string; value: string };
  incomeLevel: { id: string; iso2code: string; value: string };
  lendingType: { id: string; iso2code: string; value: string };
  capitalCity: string;
  longitude: string;
  latitude: string;
}

export type WorldBankCountryResponse = [
  WorldBankMetadata,
  WorldBankCountryRecord[]
];

export type DemographicIndicatorCode =
  | "SP.POP.TOTL"
  | "SP.POP.GROW"
  | "EN.POP.DNST"
  | "SP.URB.TOTL.IN.ZS";

export interface IndicatorMetric {
  code: DemographicIndicatorCode;
  title: string;
  value: number | null;
  formattedValue: string;
  year: string | null;
  unit: string;
  source: string;
  isAvailable: boolean;
  notes?: string;
}

export interface DashboardMetricsResult {
  metrics: Record<DemographicIndicatorCode, IndicatorMetric>;
  lastFetched: string;
  sourcePartner: string;
  worldAggregateCode: "WLD";
  error?: string | null;
}

export interface HistoricalDataPoint {
  year: number;
  value: number | null;
  formattedValue?: string;
}

export interface CountryHistoricalSeries {
  countryCode: string;
  countryName: string;
  indicatorCode: DemographicIndicatorCode;
  indicatorName: string;
  series: HistoricalDataPoint[];
}
