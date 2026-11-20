import { NextRequest, NextResponse } from "next/server";
import {
  getWorldDashboardMetrics,
  getHistoricalPopulation,
  fetchGlobalMapData,
  fetchCountryFullProfile,
  getComparisonDataset,
  WORLD_AGGREGATE_CODE,
} from "@/lib/world-bank";
import { MapMetricType } from "@/types/map";

export const dynamic = "force-dynamic";
export const revalidate = 86400; // 24 hours ISR caching

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get("country");
    const isHistorical = searchParams.get("historical") === "true";
    const isMap = searchParams.get("map") === "true";
    const isProfile = searchParams.get("profile") === "true";
    const isCompare = searchParams.get("compare") === "true";
    const countriesParam = searchParams.get("countries");
    const indicator = (searchParams.get("indicator") as MapMetricType) || "SP.POP.TOTL";
    const startYear = parseInt(searchParams.get("startYear") || "1960", 10);

    // 0. Multi-Country Comparison (Stage 4)
    if (isCompare) {
      const countryCodes = (countriesParam || "UZB,USA,CHN")
        .split(",")
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean)
        .slice(0, 5);

      const comparisonData = await getComparisonDataset(countryCodes);
      return NextResponse.json(
        {
          comparison: comparisonData,
          countries: countryCodes,
          cachedAt: new Date().toISOString(),
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        }
      );
    }

    // 1. Map Data across all countries
    if (isMap) {
      const validMetric: MapMetricType =
        indicator === "EN.POP.DNST" ||
        indicator === "SP.POP.GROW" ||
        indicator === "SP.URB.TOTL.IN.ZS"
          ? indicator
          : "SP.POP.TOTL";

      const mapDataset = await fetchGlobalMapData(validMetric);
      return NextResponse.json(
        {
          metric: validMetric,
          totalCountries: Object.keys(mapDataset).length,
          data: mapDataset,
          cachedAt: new Date().toISOString(),
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        }
      );
    }

    // 2. Full Country Profile
    if (isProfile && country) {
      const countryName = searchParams.get("name") || undefined;
      const profile = await fetchCountryFullProfile(country, countryName);
      return NextResponse.json(profile, {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      });
    }

    // 3. Historical series for a country
    if (isHistorical) {
      const targetCountry = country || WORLD_AGGREGATE_CODE;
      const historicalData = await getHistoricalPopulation(targetCountry, startYear);
      return NextResponse.json({
        country: targetCountry,
        indicator: "SP.POP.TOTL",
        startYear,
        totalPoints: historicalData.length,
        data: historicalData,
      });
    }

    // 4. Default: World dashboard metrics
    const metricsResult = await getWorldDashboardMetrics();

    return NextResponse.json(metricsResult, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("[API /api/demographics] Handler error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch demographic data from World Bank API",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
