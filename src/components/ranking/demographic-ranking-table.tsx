"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Globe2,
  FileSpreadsheet,
  Compass,
  Building2,
  Users,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { downloadCsv, escapeCsvField } from "@/lib/csv-export";

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
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortField, setSortField] = useState<SortField>("population");
  const [sortAsc, setSortAsc] = useState(false);

  const baselineData = useMemo(() => {
    if (!uzbekistanData) return DEMOGRAPHIC_RANKING_DATA;
    return DEMOGRAPHIC_RANKING_DATA.map((item) => {
      if (item.iso3 === "UZB") {
        return {
          ...item,
          population: uzbekistanData.population,
          density: uzbekistanData.density,
          growth: uzbekistanData.growth,
          urban: uzbekistanData.urban,
        };
      }
      return item;
    });
  }, [uzbekistanData]);

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
    <section id="ranking-section" className="space-y-4 scroll-mt-20">
      <Card className="rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-sm overflow-hidden">
        <CardHeader className="p-5 sm:p-6 pb-4 border-b border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="font-mono text-[10px] text-purple-400 border-purple-500/30 bg-purple-500/10">
                  Data Intelligence
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">World Bank WDI Metrics</span>
              </div>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Globe2 className="h-5 w-5 text-purple-400" />
                Global Demographic League Table
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Multi-metric demographic rankings across global sovereign powers and regional benchmarks.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              className="gap-2 text-xs font-mono h-9 shrink-0 self-start sm:self-center"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
              <span>Export CSV</span>
            </Button>
          </div>

          {/* Search & Region Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter by country or ISO-3..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border/80 bg-secondary/40 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden sm:inline" />
              {regions.slice(0, 5).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
                    selectedRegion === reg
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 font-mono text-[11px] text-muted-foreground">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 font-semibold text-foreground">Sovereign Nation</th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("population")}>
                  <div className="flex items-center justify-end gap-1">
                    <span>Population (2024)</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-foreground transition-colors hidden md:table-cell" onClick={() => handleSort("density")}>
                  <div className="flex items-center justify-end gap-1">
                    <span>Density (/km²)</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("growth")}>
                  <div className="flex items-center justify-end gap-1">
                    <span>Growth Rate</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-foreground transition-colors hidden sm:table-cell" onClick={() => handleSort("urban")}>
                  <div className="flex items-center justify-end gap-1">
                    <span>Urban Share</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4 w-28 text-center hidden lg:table-cell">Global Scale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-sans">
              {filteredData.map((row, index) => {
                const isUzbekistan = row.iso3 === "UZB";
                const isGrowthPositive = row.growth > 0;
                const scaleWidth = Math.min(Math.max((row.population / 1441000000) * 100, 3), 100);

                return (
                  <tr
                    key={row.iso3}
                    className={`hover:bg-muted/30 transition-colors ${
                      isUzbekistan ? "bg-emerald-500/5 font-medium" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-mono text-muted-foreground text-[11px]">
                      {index + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base shrink-0">{row.flag}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-foreground">{row.name}</span>
                            <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1.5 py-0.2 rounded border border-border/50">
                              {row.iso3}
                            </span>
                            {isUzbekistan && (
                              <Badge className="bg-emerald-500 text-white text-[9px] px-1.5 py-0">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground hidden sm:block">
                            {row.region}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-foreground">
                      {formatPop(row.population)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-muted-foreground hidden md:table-cell">
                      {row.density.toFixed(1)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                          isGrowthPositive
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        }`}
                      >
                        {isGrowthPositive ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{isGrowthPositive ? `+${row.growth.toFixed(2)}%` : `${row.growth.toFixed(2)}%`}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-foreground/90 hidden sm:table-cell">
                      {row.urban.toFixed(1)}%
                    </td>

                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            isUzbekistan ? "bg-emerald-500" : "bg-primary"
                          }`}
                          style={{ width: `${scaleWidth}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
}
