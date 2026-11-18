import { CountryComparisonProfile, HistoricalYearPoint } from "@/types/comparison";
import { DemographicIndicatorCode } from "@/types/world-bank";
import { CountryMapData } from "@/types/map";
import { INDICATORS } from "./world-bank";

/**
 * Escapes a field for CSV compliance:
 * - Surrounds with double quotes if it contains commas, double quotes, or newlines
 * - Replaces any internal double quotes with escaped pair `""`
 */
export function escapeCsvField(val: string | number | null | undefined): string {
  if (val === null || val === undefined) {
    return "";
  }
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Initiates direct browser download of CSV string with UTF-8 BOM for Excel compatibility
 */
export function downloadCsv(filename: string, csvContent: string): void {
  // \uFEFF is UTF-8 Byte Order Mark (BOM) ensuring Excel displays UTF-8 (including international names/accents) correctly
  const bom = "\uFEFF";
  const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generates and downloads Comparison Summary CSV
 */
export function exportComparisonSummaryCsv(profiles: CountryComparisonProfile[]): void {
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `world-population-comparison_${dateStr}.csv`;

  const headers = [
    "Country Name",
    "ISO-3 Code",
    "Indicator Code",
    "Indicator Name",
    "Raw Value",
    "Formatted Value",
    "Unit",
    "Reference Year",
    "Data Source",
    "Notes",
  ];

  const rows: string[][] = [];
  const indicatorCodes: DemographicIndicatorCode[] = [
    "SP.POP.TOTL",
    "EN.POP.DNST",
    "SP.POP.GROW",
    "SP.URB.TOTL.IN.ZS",
  ];

  for (const profile of profiles) {
    for (const code of indicatorCodes) {
      const metric = profile.metrics[code];
      const hasValue = metric && metric.isAvailable && metric.value !== null;

      rows.push([
        profile.name,
        profile.iso3,
        code,
        INDICATORS[code].name,
        hasValue ? String(metric.value) : "N/A",
        hasValue ? metric.formattedValue : "Data pending",
        INDICATORS[code].unit,
        hasValue && metric.year ? metric.year : "N/A",
        "The World Bank Open Data (World Development Indicators)",
        hasValue ? "Official Series" : "No official record for requested reference period",
      ]);
    }
  }

  const csvContent = [
    headers.map(escapeCsvField).join(","),
    ...rows.map((row) => row.map(escapeCsvField).join(",")),
  ].join("\r\n");

  downloadCsv(filename, csvContent);
}

/**
 * Generates and downloads Comprehensive Historical Time Series CSV (1960–2024)
 */
export function exportHistoricalTimeSeriesCsv(
  profiles: CountryComparisonProfile[],
  historical: Record<DemographicIndicatorCode, HistoricalYearPoint[]>
): void {
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `world-population-historical_1960-2024_${dateStr}.csv`;

  const headers = [
    "Year",
    "Country Name",
    "ISO-3 Code",
    "Total Population (SP.POP.TOTL)",
    "Population Density (per km2 - EN.POP.DNST)",
    "Annual Population Growth (% - SP.POP.GROW)",
    "Urban Population Share (% - SP.URB.TOTL.IN.ZS)",
    "Data Source",
  ];

  const popMap = new Map<number, HistoricalYearPoint>();
  (historical["SP.POP.TOTL"] || []).forEach((pt) => popMap.set(pt.year, pt));

  const densMap = new Map<number, HistoricalYearPoint>();
  (historical["EN.POP.DNST"] || []).forEach((pt) => densMap.set(pt.year, pt));

  const growMap = new Map<number, HistoricalYearPoint>();
  (historical["SP.POP.GROW"] || []).forEach((pt) => growMap.set(pt.year, pt));

  const urbMap = new Map<number, HistoricalYearPoint>();
  (historical["SP.URB.TOTL.IN.ZS"] || []).forEach((pt) => urbMap.set(pt.year, pt));

  const years = Array.from(popMap.keys()).sort((a, b) => a - b);
  const rows: string[][] = [];

  for (const year of years) {
    for (const profile of profiles) {
      const popVal = popMap.get(year)?.[profile.iso3];
      const densVal = densMap.get(year)?.[profile.iso3];
      const growVal = growMap.get(year)?.[profile.iso3];
      const urbVal = urbMap.get(year)?.[profile.iso3];

      rows.push([
        String(year),
        profile.name,
        profile.iso3,
        popVal !== null && popVal !== undefined ? String(popVal) : "Data pending",
        densVal !== null && densVal !== undefined ? String(densVal) : "Data pending",
        growVal !== null && growVal !== undefined ? String(growVal) : "Data pending",
        urbVal !== null && urbVal !== undefined ? String(urbVal) : "Data pending",
        "The World Bank Open Data (Official Historical Series)",
      ]);
    }
  }

  const csvContent = [
    headers.map(escapeCsvField).join(","),
    ...rows.map((row) => row.map(escapeCsvField).join(",")),
  ].join("\r\n");

  downloadCsv(filename, csvContent);
}

/**
 * Generates and downloads Global Map Dataset CSV
 */
export function exportMapDatasetCsv(
  mapDataset: Record<string, CountryMapData>,
  metricCode: DemographicIndicatorCode
): void {
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `world-population-global-map_${metricCode.toLowerCase()}_${dateStr}.csv`;

  const headers = [
    "ISO-3 Code",
    "Country / Territory Name",
    "Indicator Code",
    "Indicator Name",
    "Raw Value",
    "Formatted Value",
    "Unit",
    "Reference Year",
    "Data Source",
    "Data Availability Status",
  ];

  const indicatorMeta = INDICATORS[metricCode] || { name: metricCode, unit: "" };
  const rows: string[][] = [];

  const sortedIsoCodes = Object.keys(mapDataset).sort();

  for (const iso3 of sortedIsoCodes) {
    const item = mapDataset[iso3];
    const hasValue = item.isAvailable && item.value !== null && item.value !== undefined;

    rows.push([
      item.iso3,
      item.name,
      metricCode,
      indicatorMeta.name,
      hasValue ? String(item.value) : "N/A",
      hasValue ? item.formattedValue : "No data available",
      item.unit || indicatorMeta.unit,
      hasValue && item.year ? item.year : "N/A",
      "The World Bank Open Data (World Development Indicators)",
      hasValue ? "Verified Official" : "Reporting pending",
    ]);
  }

  const csvContent = [
    headers.map(escapeCsvField).join(","),
    ...rows.map((row) => row.map(escapeCsvField).join(",")),
  ].join("\r\n");

  downloadCsv(filename, csvContent);
}
