"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Globe2,
  FileSpreadsheet,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { downloadCsv, escapeCsvField } from "@/lib/csv-export";
import { getLocalizedCountryName, getLocalizedRegionName } from "@/lib/country-names";
import { useTranslation } from "@/components/language";
import { useDashboard } from "@/components/dashboard/dashboard-context";

interface RankingRow {
  rank: number;
  name: string;
  iso3: string;
  flag: string;
  region: string;
  population: number;
  density: number;
  growth: number;
  urban: number;
}

const DEMOGRAPHIC_RANKING_DATA: RankingRow[] = [
  { rank: 1, name: "India", iso3: "IND", flag: "🇮🇳", region: "South Asia", population: 1441000000, density: 484.7, growth: 0.86, urban: 36.9 },
  { rank: 2, name: "China", iso3: "CHN", flag: "🇨🇳", region: "East Asia", population: 1409000000, density: 149.4, growth: -0.12, urban: 65.2 },
  { rank: 3, name: "United States", iso3: "USA", flag: "🇺🇸", region: "North America", population: 336500000, density: 36.8, growth: 0.47, urban: 83.5 },
  { rank: 4, name: "Indonesia", iso3: "IDN", flag: "🇮🇩", region: "East Asia & Pacific", population: 281600000, density: 153.2, growth: 0.82, urban: 58.6 },
  { rank: 5, name: "Pakistan", iso3: "PAK", flag: "🇵🇰", region: "South Asia", population: 245200000, density: 312.4, growth: 1.98, urban: 37.7 },
  { rank: 6, name: "Nigeria", iso3: "NGA", flag: "🇳🇬", region: "Sub-Saharan Africa", population: 229100000, density: 250.3, growth: 2.39, urban: 54.3 },
  { rank: 7, name: "Brazil", iso3: "BRA", flag: "🇧🇷", region: "Latin America", population: 217600000, density: 25.8, growth: 0.52, urban: 87.8 },
  { rank: 8, name: "Bangladesh", iso3: "BGD", flag: "🇧🇩", region: "South Asia", population: 174700000, density: 1324.0, growth: 1.03, urban: 40.5 },
  { rank: 9, name: "Russian Federation", iso3: "RUS", flag: "🇷🇺", region: "Europe & Central Asia", population: 144200000, density: 8.8, growth: -0.22, urban: 75.3 },
  { rank: 10, name: "Mexico", iso3: "MEX", flag: "🇲🇽", region: "Latin America", population: 130800000, density: 67.2, growth: 0.75, urban: 81.6 },
  { rank: 11, name: "Japan", iso3: "JPN", flag: "🇯🇵", region: "East Asia", population: 124500000, density: 341.2, growth: -0.45, urban: 92.0 },
  { rank: 12, name: "Ethiopia", iso3: "ETH", flag: "🇪🇹", region: "Sub-Saharan Africa", population: 126500000, density: 126.5, growth: 2.55, urban: 23.2 },
  { rank: 13, name: "Egypt", iso3: "EGY", flag: "🇪🇬", region: "Middle East & North Africa", population: 112700000, density: 113.1, growth: 1.56, urban: 43.1 },
  { rank: 14, name: "Philippines", iso3: "PHL", flag: "🇵🇭", region: "East Asia & Pacific", population: 117300000, density: 393.5, growth: 1.48, urban: 48.3 },
  { rank: 15, name: "Vietnam", iso3: "VNM", flag: "🇻🇳", region: "East Asia & Pacific", population: 100300000, density: 322.0, growth: 0.68, urban: 39.5 },
  { rank: 16, name: "Germany", iso3: "DEU", flag: "🇩🇪", region: "Europe", population: 84400000, density: 242.0, growth: 0.35, urban: 77.8 },
  { rank: 17, name: "Turkey", iso3: "TUR", flag: "🇹🇷", region: "Europe & Central Asia", population: 85800000, density: 111.5, growth: 0.58, urban: 77.5 },
  { rank: 18, name: "United Kingdom", iso3: "GBR", flag: "🇬🇧", region: "Europe", population: 68300000, density: 282.0, growth: 0.78, urban: 84.6 },
  { rank: 19, name: "France", iso3: "FRA", flag: "🇫🇷", region: "Europe", population: 68100000, density: 124.5, growth: 0.28, urban: 81.8 },
  { rank: 20, name: "Uzbekistan", iso3: "UZB", flag: "🇺🇿", region: "Central Asia", population: 36361859, density: 82.9, growth: 1.97, urban: 51.0 },
];

type SortField = "rank" | "population" | "density" | "growth" | "urban";

interface DemographicRankingTableProps {
  uzbekistanData?: {
    population: number;
    density: number;
    growth: number;
    urban: number;
    year: string;
  };
}

export function DemographicRankingTable({ uzbekistanData }: DemographicRankingTableProps = {}) {
  const { t, language } = useTranslation();
  const { focusCountryOnGlobe, selectedRegionFilter, setSelectedRegionFilter } = useDashboard();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("population");
  const [sortAsc, setSortAsc] = useState(false);

  const baselineData = useMemo(() => {
    return DEMOGRAPHIC_RANKING_DATA.map((item) => {
      const localizedName = getLocalizedCountryName(item.iso3, item.name, language);
      const localizedRegion = getLocalizedRegionName(item.region, language);
      if (item.iso3 === "UZB" && uzbekistanData) {
        return {
          ...item,
          englishName: item.name,
          name: localizedName,
          localizedRegion,
          population: uzbekistanData.population,
          density: uzbekistanData.density,
          growth: uzbekistanData.growth,
          urban: uzbekistanData.urban,
        };
      }
      return {
        ...item,
        englishName: item.name,
        name: localizedName,
        localizedRegion,
      };
    });
  }, [uzbekistanData, language]);

  const regions = useMemo(() => {
    const list = Array.from(new Set(baselineData.map((d) => d.region)));
    return ["All", ...list];
  }, [baselineData]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    return baselineData
      .filter((row) => {
        const matchSearch =
          !q ||
          row.name.toLowerCase().includes(q) ||
          row.englishName.toLowerCase().includes(q) ||
          row.iso3.toLowerCase().includes(q);
        const matchRegion =
          selectedRegionFilter === "All" || row.region === selectedRegionFilter;
        return matchSearch && matchRegion;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        return sortAsc ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      });
  }, [baselineData, search, selectedRegionFilter, sortField, sortAsc]);

  const formatPop = (num: number) => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
    return `${(num / 1_000_000).toFixed(2)}M`;
  };

  const handleRowInspect = (iso3: string, name: string) => {
    focusCountryOnGlobe(iso3, name);
    const el = document.getElementById("map-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleExportCsv = () => {
    const headers = [
      "Rank",
      "Country Name",
      "ISO-3",
      "Region",
      "Population (2024)",
      "Density (/km2)",
      "Growth Rate (%)",
      "Urban Share (%)",
    ];
    const rows = filteredData.map((d, i) => [
      i + 1,
      escapeCsvField(d.name),
      d.iso3,
      escapeCsvField(d.localizedRegion),
      d.population,
      parseFloat(d.density.toFixed(1)),
      parseFloat(d.growth.toFixed(2)),
      parseFloat(d.urban.toFixed(1)),
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    downloadCsv(
      `world-demographic-rankings_${new Date().toISOString().split("T")[0]}.csv`,
      csvContent
    );
  };

  return (
    <Card
      id="ranking-section"
      className="editorial-card bg-white dark:bg-slate-900 scroll-mt-20 overflow-hidden"
    >
      <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant="outline"
              className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950"
            >
              {t.leagueTable.badge}
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t.leagueTable.sourceBadge}
            </span>
          </div>
          <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-blue-700 dark:text-blue-400" />
            {t.leagueTable.title}
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.leagueTable.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-600 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.leagueTable.searchPlaceholder}
              className="h-9 w-full sm:w-56 pl-8 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50/70 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 h-9">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value)}
              aria-label={t.leagueTable.colRegion}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {r === "All"
                    ? t.leagueTable.allRegions
                    : getLocalizedRegionName(r, language)}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-9 px-3 text-xs gap-1.5 rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-blue-700" />
            <span className="hidden sm:inline">{t.leagueTable.exportCsv}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider bg-slate-50/80 dark:bg-slate-800/50">
                <th
                  className="py-3 px-4 font-semibold w-12 cursor-pointer"
                  onClick={() => handleSort("rank")}
                >
                  <div className="flex items-center gap-1">
                    {t.leagueTable.colRank} <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">{t.leagueTable.colCountry}</th>
                <th className="py-3 px-3 font-semibold">{t.leagueTable.colIso}</th>
                <th className="py-3 px-3 font-semibold hidden md:table-cell">
                  {t.leagueTable.colRegion}
                </th>
                <th
                  className="py-3 px-4 font-semibold text-right cursor-pointer"
                  onClick={() => handleSort("population")}
                >
                  <div className="flex items-center justify-end gap-1">
                    {t.leagueTable.colPop} <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 font-semibold text-right cursor-pointer"
                  onClick={() => handleSort("density")}
                >
                  <div className="flex items-center justify-end gap-1">
                    {t.leagueTable.colDnst} <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 font-semibold text-right cursor-pointer"
                  onClick={() => handleSort("growth")}
                >
                  <div className="flex items-center justify-end gap-1">
                    {t.leagueTable.colGrow} <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 font-semibold text-right cursor-pointer hidden sm:table-cell"
                  onClick={() => handleSort("urban")}
                >
                  <div className="flex items-center justify-end gap-1">
                    {t.leagueTable.colUrb} <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    {t.leagueTable.noResults}
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => {
                  const isFeatured = row.iso3 === "UZB";

                  return (
                    <tr
                      key={row.iso3}
                      onClick={() => handleRowInspect(row.iso3, row.englishName)}
                      title={t.leagueTable.inspectOnGlobe}
                      className={`transition-colors cursor-pointer ${
                        isFeatured
                          ? "bg-blue-50/70 dark:bg-blue-950/30 hover:bg-blue-100/70 font-medium"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <td className="py-3 px-4 font-mono text-slate-400 tabular-nums">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{row.flag}</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {row.name}
                          </span>
                          {isFeatured && (
                            <Badge
                              variant="outline"
                              className="text-[10px] py-0 px-1.5 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900"
                            >
                              {t.leagueTable.featuredBadge}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                        {row.iso3}
                      </td>
                      <td className="py-3 px-3 text-slate-500 hidden md:table-cell">
                        {row.localizedRegion}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                        {formatPop(row.population)}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-300 tabular-nums">
                        {row.density.toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums">
                        <span
                          className={`inline-flex items-center gap-1 font-medium ${
                            row.growth >= 0
                              ? "text-blue-700 dark:text-blue-300"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {row.growth >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {row.growth.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-300 hidden sm:table-cell tabular-nums">
                        {row.urban.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            {t.leagueTable.showingRows}: <strong className="text-slate-800 dark:text-slate-200">{filteredData.length}</strong>
          </span>
          <span>{t.common.officialFeed}</span>
        </div>
      </CardContent>
    </Card>
  );
}
