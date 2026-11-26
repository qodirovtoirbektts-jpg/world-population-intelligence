import { CountryListItem } from "@/types/comparison";
import { matchesLocalizedCountry } from "./country-names";

export const COMPARISON_PALETTE = [
  { hex: "#1d4ed8", name: "Cobalt", class: "text-blue-700 border-blue-600 bg-blue-50" },
  { hex: "#0284c7", name: "Ocean", class: "text-sky-700 border-sky-600 bg-sky-50" },
  { hex: "#0f766e", name: "Teal", class: "text-teal-700 border-teal-600 bg-teal-50" },
  { hex: "#4f46e5", name: "Indigo", class: "text-indigo-700 border-indigo-600 bg-indigo-50" },
  { hex: "#b45309", name: "Amber", class: "text-amber-700 border-amber-600 bg-amber-50" },
];

export const ALL_COUNTRIES: CountryListItem[] = [
  { iso3: "UZB", name: "Uzbekistan", region: "Central Asia", flag: "🇺🇿" },
  { iso3: "USA", name: "United States", region: "North America", flag: "🇺🇸" },
  { iso3: "CHN", name: "China", region: "East Asia", flag: "🇨🇳" },
  { iso3: "IND", name: "India", region: "South Asia", flag: "🇮🇳" },
  { iso3: "KAZ", name: "Kazakhstan", region: "Central Asia", flag: "🇰🇿" },
  { iso3: "BRA", name: "Brazil", region: "Latin America", flag: "🇧🇷" },
  { iso3: "DEU", name: "Germany", region: "Europe", flag: "🇩🇪" },
  { iso3: "GBR", name: "United Kingdom", region: "Europe", flag: "🇬🇧" },
  { iso3: "FRA", name: "France", region: "Europe", flag: "🇫🇷" },
  { iso3: "JPN", name: "Japan", region: "East Asia", flag: "🇯🇵" },
  { iso3: "TUR", name: "Turkey", region: "Europe & Central Asia", flag: "🇹🇷" },
  { iso3: "IDN", name: "Indonesia", region: "East Asia & Pacific", flag: "🇮🇩" },
  { iso3: "PAK", name: "Pakistan", region: "South Asia", flag: "🇵🇰" },
  { iso3: "NGA", name: "Nigeria", region: "Sub-Saharan Africa", flag: "🇳🇬" },
  { iso3: "BGD", name: "Bangladesh", region: "South Asia", flag: "🇧🇩" },
  { iso3: "RUS", name: "Russian Federation", region: "Europe & Central Asia", flag: "🇷🇺" },
  { iso3: "MEX", name: "Mexico", region: "Latin America", flag: "🇲🇽" },
  { iso3: "ETH", name: "Ethiopia", region: "Sub-Saharan Africa", flag: "🇪🇹" },
  { iso3: "EGY", name: "Egypt", region: "Middle East & North Africa", flag: "🇪🇬" },
  { iso3: "PHL", name: "Philippines", region: "East Asia & Pacific", flag: "🇵🇭" },
  { iso3: "VNM", name: "Vietnam", region: "East Asia & Pacific", flag: "🇻🇳" },
  { iso3: "COD", name: "Dem. Rep. Congo", region: "Sub-Saharan Africa", flag: "🇨🇩" },
  { iso3: "IRN", name: "Iran", region: "Middle East & North Africa", flag: "🇮🇷" },
  { iso3: "THA", name: "Thailand", region: "East Asia & Pacific", flag: "🇹🇭" },
  { iso3: "ITA", name: "Italy", region: "Europe", flag: "🇮🇹" },
  { iso3: "ZAF", name: "South Africa", region: "Sub-Saharan Africa", flag: "🇿🇦" },
  { iso3: "TKM", name: "Turkmenistan", region: "Central Asia", flag: "🇹🇲" },
  { iso3: "KGZ", name: "Kyrgyz Republic", region: "Central Asia", flag: "🇰🇬" },
  { iso3: "TJK", name: "Tajikistan", region: "Central Asia", flag: "🇹🇯" },
  { iso3: "AZE", name: "Azerbaijan", region: "Central Asia & Caucasus", flag: "🇦🇿" },
  { iso3: "AFG", name: "Afghanistan", region: "South Asia", flag: "🇦🇫" },
  { iso3: "ALB", name: "Albania", region: "Europe", flag: "🇦🇱" },
  { iso3: "DZA", name: "Algeria", region: "Middle East & North Africa", flag: "🇩🇿" },
  { iso3: "AGO", name: "Angola", region: "Sub-Saharan Africa", flag: "🇦🇴" },
  { iso3: "ARG", name: "Argentina", region: "Latin America", flag: "🇦🇷" },
  { iso3: "ARM", name: "Armenia", region: "Europe & Central Asia", flag: "🇦🇲" },
  { iso3: "AUS", name: "Australia", region: "East Asia & Pacific", flag: "🇦🇺" },
  { iso3: "AUT", name: "Austria", region: "Europe", flag: "🇦🇹" },
  { iso3: "BEL", name: "Belgium", region: "Europe", flag: "🇧🇪" },
  { iso3: "CAN", name: "Canada", region: "North America", flag: "🇨🇦" },
  { iso3: "CHL", name: "Chile", region: "Latin America", flag: "🇨🇱" },
  { iso3: "COL", name: "Colombia", region: "Latin America", flag: "🇨🇴" },
  { iso3: "CZE", name: "Czechia", region: "Europe", flag: "🇨🇿" },
  { iso3: "DNK", name: "Denmark", region: "Europe", flag: "🇩🇰" },
  { iso3: "FIN", name: "Finland", region: "Europe", flag: "🇫🇮" },
  { iso3: "GEO", name: "Georgia", region: "Europe & Central Asia", flag: "🇬🇪" },
  { iso3: "GRC", name: "Greece", region: "Europe", flag: "🇬🇷" },
  { iso3: "HUN", name: "Hungary", region: "Europe", flag: "🇭🇺" },
  { iso3: "IRL", name: "Ireland", region: "Europe", flag: "🇮🇪" },
  { iso3: "ISR", name: "Israel", region: "Middle East", flag: "🇮🇱" },
  { iso3: "KOR", name: "South Korea", region: "East Asia", flag: "🇰🇷" },
  { iso3: "LUX", name: "Luxembourg", region: "Europe", flag: "🇱🇺" },
  { iso3: "MYS", name: "Malaysia", region: "East Asia & Pacific", flag: "🇲🇾" },
  { iso3: "NLD", name: "Netherlands", region: "Europe", flag: "🇳🇱" },
  { iso3: "NZL", name: "New Zealand", region: "East Asia & Pacific", flag: "🇳🇿" },
  { iso3: "NOR", name: "Norway", region: "Europe", flag: "🇳🇴" },
  { iso3: "POL", name: "Poland", region: "Europe", flag: "🇵🇱" },
  { iso3: "PRT", name: "Portugal", region: "Europe", flag: "🇵🇹" },
  { iso3: "QAT", name: "Qatar", region: "Middle East", flag: "🇶🇦" },
  { iso3: "SAU", name: "Saudi Arabia", region: "Middle East", flag: "🇸🇦" },
  { iso3: "SGP", name: "Singapore", region: "East Asia & Pacific", flag: "🇸🇬" },
  { iso3: "ESP", name: "Spain", region: "Europe", flag: "🇪🇸" },
  { iso3: "SWE", name: "Sweden", region: "Europe", flag: "🇸🇪" },
  { iso3: "CHE", name: "Switzerland", region: "Europe", flag: "🇨🇭" },
  { iso3: "ARE", name: "United Arab Emirates", region: "Middle East", flag: "🇦🇪" },
  { iso3: "UKR", name: "Ukraine", region: "Europe", flag: "🇺🇦" },
];

export function findCountryByIso3(iso3: string): CountryListItem | undefined {
  return ALL_COUNTRIES.find((c) => c.iso3.toUpperCase() === iso3.toUpperCase());
}

export function searchCountries(query: string): CountryListItem[] {
  const clean = query.trim();
  if (!clean) return ALL_COUNTRIES.slice(0, 10);

  return ALL_COUNTRIES.filter((c) =>
    matchesLocalizedCountry(c.iso3, c.name, c.region, clean)
  );
}
