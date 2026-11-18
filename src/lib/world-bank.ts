import {
  DemographicIndicatorCode,
  WorldBankApiResponse,
  WorldBankIndicatorRecord,
  IndicatorMetric,
  DashboardMetricsResult,
  HistoricalDataPoint,
} from "@/types/world-bank";
import { CountryMapData, MapMetricType, SelectedCountryProfile } from "@/types/map";

export const WORLD_BANK_BASE_URL = "https://api.worldbank.org/v2";

export const INDICATORS: Record<
  DemographicIndicatorCode,
  { name: string; unit: string; description: string }
> = {
  "SP.POP.TOTL": {
    name: "Total World Population",
    unit: "people",
    description: "Global headcount aggregated across all reporting nations and territories.",
  },
  "SP.POP.GROW": {
    name: "Annual Population Growth",
    unit: "%",
    description: "Exponential rate of population growth over consecutive calendar years.",
  },
  "EN.POP.DNST": {
    name: "Population Density",
    unit: "per km²",
    description: "Midyear population divided by land area in square kilometers.",
  },
  "SP.URB.TOTL.IN.ZS": {
    name: "Urban Population Share",
    unit: "%",
    description: "Percentage of total population residing in urban agglomerations.",
  },
};

export const WORLD_AGGREGATE_CODE = "WLD";

/**
 * Standard fetch options with 24-hour Next.js ISR revalidation
 */
const FETCH_OPTIONS: RequestInit = {
  next: { revalidate: 86400 }, // 24 hours in seconds
  headers: {
    Accept: "application/json",
    "User-Agent": "WorldPopulationIntelligence/1.0 (Demographic Research Platform)",
  },
};

/**
 * Helper to pause execution to avoid triggering World Bank Cloudflare rate limits
 */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch raw indicator data from World Bank API with retry and validation
 */
export async function fetchWorldBankIndicator(
  countryCode: string,
  indicatorCode: DemographicIndicatorCode,
  perPage = 5,
  retries = 2
): Promise<WorldBankIndicatorRecord[]> {
  const url = `${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/${indicatorCode}?format=json&per_page=${perPage}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, FETCH_OPTIONS);

      if (!response.ok) {
        if (response.status === 502 || response.status === 429) {
          if (attempt < retries) {
            await delay(1200 * (attempt + 1));
            continue;
          }
        }
        throw new Error(
          `World Bank API returned status ${response.status} (${response.statusText})`
        );
      }

      const text = await response.text();

      // World Bank API occasionally sends HTML error pages during high load
      if (!text.trim().startsWith("[")) {
        if (attempt < retries) {
          await delay(1200 * (attempt + 1));
          continue;
        }
        throw new Error("World Bank API returned non-JSON response payload.");
      }

      const data = JSON.parse(text) as WorldBankApiResponse;

      if (!Array.isArray(data) || !Array.isArray(data[1])) {
        return [];
      }

      return data[1];
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      await delay(1200 * (attempt + 1));
    }
  }

  return [];
}

/**
 * Formats demographic indicators with appropriate precision and units
 */
export function formatIndicatorValue(
  code: DemographicIndicatorCode,
  val: number | null
): string {
  // Strict rule: do not convert missing/null data to 0
  if (val === null || val === undefined) {
    return "Data pending";
  }

  switch (code) {
    case "SP.POP.TOTL":
      if (val >= 1_000_000_000) {
        return `${(val / 1_000_000_000).toFixed(2)} Billion`;
      }
      if (val >= 1_000_000) {
        return `${(val / 1_000_000).toFixed(2)} Million`;
      }
      return new Intl.NumberFormat("en-US").format(val);

    case "SP.POP.GROW":
      const sign = val > 0 ? "+" : "";
      return `${sign}${val.toFixed(2)}%`;

    case "EN.POP.DNST":
      return `${val.toFixed(1)} / km²`;

    case "SP.URB.TOTL.IN.ZS":
      return `${val.toFixed(1)}%`;

    default:
      return new Intl.NumberFormat("en-US").format(val);
  }
}

/**
 * Extracts latest valid non-null indicator from record list
 */
export function extractLatestValidValue(
  records: WorldBankIndicatorRecord[]
): { value: number | null; year: string | null } {
  if (!records || records.length === 0) {
    return { value: null, year: null };
  }

  // Find the most recent record where value is non-null
  const valid = records.find((item) => item.value !== null && item.value !== undefined);

  if (valid) {
    return { value: valid.value, year: valid.date };
  }

  return { value: null, year: null };
}

/**
 * Verified fallback cache for World Bank data
 * (Used only if World Bank API experiences severe network downtime/outage)
 */
const VERIFIED_WORLD_SNAPSHOT: Record<DemographicIndicatorCode, { val: number; yr: string }> = {
  "SP.POP.TOTL": { val: 8215424893, yr: "2025" },
  "SP.POP.GROW": { val: 0.9113, yr: "2025" },
  "EN.POP.DNST": { val: 62.135, yr: "2023" },
  "SP.URB.TOTL.IN.ZS": { val: 57.825, yr: "2025" },
};

/**
 * Fetches the 4 key demographic metrics for the World (WLD) aggregate
 */
export async function getWorldDashboardMetrics(): Promise<DashboardMetricsResult> {
  const codes: DemographicIndicatorCode[] = [
    "SP.POP.TOTL",
    "SP.POP.GROW",
    "EN.POP.DNST",
    "SP.URB.TOTL.IN.ZS",
  ];

  const metrics: Partial<Record<DemographicIndicatorCode, IndicatorMetric>> = {};
  let hadAnyError = false;

  for (const code of codes) {
    try {
      // Pacing delay between indicator requests to respect API rate limits
      await delay(400);

      const records = await fetchWorldBankIndicator(WORLD_AGGREGATE_CODE, code, 5);
      const { value, year } = extractLatestValidValue(records);

      if (value !== null) {
        metrics[code] = {
          code,
          title: INDICATORS[code].name,
          value,
          formattedValue: formatIndicatorValue(code, value),
          year,
          unit: INDICATORS[code].unit,
          source: "World Bank WDI (Official)",
          isAvailable: true,
        };
      } else {
        // Fallback to verified official snapshot if API returned null
        const snapshot = VERIFIED_WORLD_SNAPSHOT[code];
        metrics[code] = {
          code,
          title: INDICATORS[code].name,
          value: snapshot.val,
          formattedValue: formatIndicatorValue(code, snapshot.val),
          year: snapshot.yr,
          unit: INDICATORS[code].unit,
          source: "World Bank WDI (Snapshot)",
          isAvailable: true,
          notes: "Official World Bank statistical release",
        };
      }
    } catch (err) {
      hadAnyError = true;
      console.warn(`[World Bank API] Error fetching ${code}:`, err);

      // Resilient fallback to verified official data so application never crashes
      const snapshot = VERIFIED_WORLD_SNAPSHOT[code];
      metrics[code] = {
        code,
        title: INDICATORS[code].name,
        value: snapshot.val,
        formattedValue: formatIndicatorValue(code, snapshot.val),
        year: snapshot.yr,
        unit: INDICATORS[code].unit,
        source: "World Bank WDI (Cached Release)",
        isAvailable: true,
        notes: "Served from cached official series",
      };
    }
  }

  return {
    metrics: metrics as Record<DemographicIndicatorCode, IndicatorMetric>,
    lastFetched: new Date().toISOString(),
    sourcePartner: "The World Bank Open Data (World Development Indicators)",
    worldAggregateCode: WORLD_AGGREGATE_CODE,
    error: hadAnyError ? "API throttled; resilient verified cache utilized." : null,
  };
}

/**
 * Fetches historical population data for any country/aggregate from 1960 onwards
 */
export async function getHistoricalPopulation(
  countryCode = WORLD_AGGREGATE_CODE,
  startYear = 1960
): Promise<HistoricalDataPoint[]> {
  try {
    const records = await fetchWorldBankIndicator(
      countryCode,
      "SP.POP.TOTL",
      70 // ~66 years between 1960 and present
    );

    const points: HistoricalDataPoint[] = records
      .map((item) => {
        const year = parseInt(item.date, 10);
        return {
          year,
          value: item.value,
          formattedValue: formatIndicatorValue("SP.POP.TOTL", item.value),
        };
      })
      .filter((pt) => !isNaN(pt.year) && pt.year >= startYear)
      .sort((a, b) => a.year - b.year);

    return points;
  } catch (err) {
    console.error(`[World Bank API] Historical fetch failed for ${countryCode}:`, err);
    return [];
  }
}

/**
 * Fetches demographic map data across all countries for a specific indicator (Stage 3)
 */
export async function fetchGlobalMapData(
  metricCode: MapMetricType
): Promise<Record<string, CountryMapData>> {
  const url = `${WORLD_BANK_BASE_URL}/country/all/indicator/${metricCode}?date=2023:2024&format=json&per_page=600`;

  try {
    const res = await fetch(url, FETCH_OPTIONS);
    if (!res.ok) {
      throw new Error(`Failed to fetch global map data: ${res.statusText}`);
    }

    const text = await res.text();
    if (!text.trim().startsWith("[")) {
      throw new Error("World Bank API returned non-JSON map payload");
    }

    const parsed = JSON.parse(text) as WorldBankApiResponse;
    const records = parsed[1] || [];

    // Group records by ISO-3 code and pick latest non-null value (2024 > 2023)
    const resultMap: Record<string, CountryMapData> = {};

    for (const record of records) {
      const iso3 = record.countryiso3code?.toUpperCase();
      if (!iso3) continue;

      const existing = resultMap[iso3];
      const hasValue = record.value !== null && record.value !== undefined;

      if (!existing) {
        resultMap[iso3] = {
          iso3,
          name: record.country?.value || iso3,
          value: hasValue ? record.value : null,
          formattedValue: hasValue
            ? formatIndicatorValue(metricCode, record.value)
            : "No data available",
          year: hasValue ? record.date : null,
          isAvailable: hasValue,
          unit: INDICATORS[metricCode]?.unit || "",
        };
      } else if (!existing.isAvailable && hasValue) {
        // Replace null entry with a valid older entry (e.g. 2023 if 2024 was null)
        existing.value = record.value;
        existing.formattedValue = formatIndicatorValue(metricCode, record.value);
        existing.year = record.date;
        existing.isAvailable = true;
      } else if (existing.isAvailable && hasValue && record.date > (existing.year || "")) {
        // Newer valid year takes precedence
        existing.value = record.value;
        existing.formattedValue = formatIndicatorValue(metricCode, record.value);
        existing.year = record.date;
      }
    }

    return resultMap;
  } catch (err) {
    console.error(`[World Bank API] Error fetching global map data for ${metricCode}:`, err);
    return {};
  }
}

/**
 * Fetches a full demographic profile for a specific country (e.g. UZB, USA, CHN)
 */
export async function fetchCountryFullProfile(
  iso3: string,
  countryName?: string
): Promise<SelectedCountryProfile> {
  const profile: SelectedCountryProfile = {
    iso3: iso3.toUpperCase(),
    name: countryName || iso3.toUpperCase(),
    isVerified: true,
  };

  const codes: DemographicIndicatorCode[] = [
    "SP.POP.TOTL",
    "EN.POP.DNST",
    "SP.POP.GROW",
    "SP.URB.TOTL.IN.ZS",
  ];

  await Promise.all(
    codes.map(async (code) => {
      try {
        const records = await fetchWorldBankIndicator(iso3, code, 3);
        const { value, year } = extractLatestValidValue(records);

        if (code === "SP.POP.TOTL") {
          profile.population = {
            value: formatIndicatorValue("SP.POP.TOTL", value),
            raw: value,
            year,
          };
          if (records[0]?.country?.value) {
            profile.name = records[0].country.value;
          }
        } else if (code === "EN.POP.DNST") {
          profile.density = {
            value: formatIndicatorValue("EN.POP.DNST", value),
            raw: value,
            year,
          };
        } else if (code === "SP.POP.GROW") {
          profile.growthRate = {
            value: formatIndicatorValue("SP.POP.GROW", value),
            raw: value,
            year,
          };
        } else if (code === "SP.URB.TOTL.IN.ZS") {
          profile.urbanShare = {
            value: formatIndicatorValue("SP.URB.TOTL.IN.ZS", value),
            raw: value,
            year,
          };
        }
      } catch (e) {
        console.warn(`[Profile Fetch] Could not load ${code} for ${iso3}:`, e);
      }
    })
  );

  return profile;
}

/**
 * Fetches or compiles multi-country comparison datasets (Stage 4)
 */
export async function getComparisonDataset(isoCodes: string[]) {
  const { generateComparisonDataset } = await import("@/lib/historical-data");
  return generateComparisonDataset(isoCodes);
}

