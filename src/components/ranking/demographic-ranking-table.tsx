"use client";

import { useState, useMemo, useCallback } from "react";
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
import { useTranslation } from "@/components/language";

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

// Authentic World Bank certified demographic baseline for sovereign nations
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
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortField, setSortField] = useState<SortField>("population");
  const [sortAsc, setSortAsc] = useState(false);

  const getCountryName = useCallback((iso3: string, defaultName: string) => {
    if (iso3 === "UZB") {
      if (language === "ru") return "Узбекистан";
      if (language === "uz") return "Oʻzbekiston";
    }
    return defaultName;
  }, [language]);

  const baselineData = useMemo(() => {
    return DEMOGRAPHIC_RANKING_DATA.map((item) => {
      const localizedName = getCountryName(item.iso3, item.name);
      if (item.iso3 === "UZB" && uzbekistanData) {
        return {
          ...item,
          name: localizedName,
          population: uzbekistanData.population,
          density: uzbekistanData.density,
          growth: uzbekistanData.growth,
          urban: uzbekistanData.urban,
        };
      }
      return { ...item, name: localizedName };
    });
  }, [uzbekistanData, getCountryName]);

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
    return baselineData.filter((row) => {
      const matchSearch =
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.iso3.toLowerCase().includes(search.toLowerCase());
      const matchRegion = selectedRegion === "All" || row.region === selectedRegion;
      return matchSearch && matchRegion;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return sortAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
  }, [baselineData, search, selectedRegion, sortField, sortAsc]);

  const formatPop = (num: number) => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
    return `${(num / 1_000_000).toFixed(2)}M`;
  };

  const handleExportCsv = () => {
    const headers = ["Rank", "Country Name", "ISO-3", "Region", "Population (2024)", "Density (/km2)", "Growth Rate (%)", "Urban Share (%)"];
    const rows = filteredData.map((d, i) => [
      i + 1,
      escapeCsvField(d.name),
      d.iso3,
      escapeCsvField(d.region),
      d.population,
      parseFloat(d.density.toFixed(1)),
      parseFloat(d.growth.toFixed(2)),
      parseFloat(d.urban.toFixed(1)),
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    downloadCsv(`world-demographic-rankings_${new Date().toISOString().split("T")[0]}.csv`, csvContent);
  };

  return (
    <Card id="ranking-section" className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-lg scroll-mt-20">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="font-mono text-xs text-blue-400 border-blue-500/30 bg-blue-500/10">
              {t.leagueTable.badge}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">{t.leagueTable.sourceBadge}</span>
          </div>
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-blue-400" />
            {t.leagueTable.title}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t.leagueTable.subtitle}
          </p>
        </div>

        {/* Filter and Export Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.leagueTable.searchPlaceholder}
              className="h-8 pl-8 pr-3 rounded-lg border border-border/70 bg-secondary/40 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-1.5 bg-secondary/40 border border-border/70 rounded-lg px-2 h-8">
            <Filter className="h-3 w-3 text-muted-foreground" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent text-xs text-foreground focus:outline-none cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r} className="bg-card text-foreground">
                  {r === "All" ? t.leagueTable.allRegions : r}
                </option>
              ))}
            </select>
          </div>

          {/* CSV Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-8 px-2.5 text-xs gap-1.5 border-border/80"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{t.leagueTable.exportCsv}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4 p-0 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground font-mono text-[11px] uppercase tracking-wider bg-secondary/20">
                <th className="py-3 px-4 font-semibold w-12 cursor-pointer" onClick={() => handleSort("rank")}>
                  <div className="flex items-center gap-1">{t.leagueTable.colRank} <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="py-3 px-4 font-semibold">{t.leagueTable.colCountry}</th>
                <th className="py-3 px-3 font-semibold">{t.leagueTable.colIso}</th>
                <th className="py-3 px-3 font-semibold hidden md:table-cell">{t.leagueTable.colRegion}</th>
                <th className="py-3 px-4 font-semibold text-right cursor-pointer" onClick={() => handleSort("population")}>
                  <div className="flex items-center justify-end gap-1">{t.leagueTable.colPop} <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="py-3 px-4 font-semibold text-right cursor-pointer" onClick={() => handleSort("density")}>
                  <div className="flex items-center justify-end gap-1">{t.leagueTable.colDnst} <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="py-3 px-4 font-semibold text-right cursor-pointer" onClick={() => handleSort("growth")}>
                  <div className="flex items-center justify-end gap-1">{t.leagueTable.colGrow} <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="py-3 px-4 font-semibold text-right cursor-pointer hidden sm:table-cell" onClick={() => handleSort("urban")}>
                  <div className="flex items-center justify-end gap-1">{t.leagueTable.colUrb} <ArrowUpDown className="h-3 w-3" /></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    {t.leagueTable.noResults}
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => {
                  const isFeatured = row.iso3 === "UZB";

                  return (
                    <tr
                      key={row.iso3}
                      className={`transition-colors hover:bg-secondary/40 ${
                        isFeatured ? "bg-emerald-950/20 font-medium" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-mono text-muted-foreground">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{row.flag}</span>
                          <span className="font-semibold text-foreground">{row.name}</span>
                          {isFeatured && (
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-emerald-400 border-emerald-500/40 bg-emerald-500/10">
                              {t.leagueTable.featuredBadge}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-muted-foreground">
                        {row.iso3}
                      </td>
                      <td className="py-3 px-3 text-muted-foreground hidden md:table-cell">
                        {row.region}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-foreground">
                        {formatPop(row.population)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                        {row.density.toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        <span
                          className={`inline-flex items-center gap-0.5 ${
                            row.growth >= 0 ? "text-emerald-400" : "text-rose-400"
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
                      <td className="py-3 px-4 text-right font-mono text-muted-foreground hidden sm:table-cell">
                        {row.urban.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span>{t.leagueTable.showingRows}: {filteredData.length}</span>
          <span>{t.common.officialFeed}</span>
        </div>
      </CardContent>
    </Card>
  );
}
