import { CountryListItem } from "@/types/comparison";

export const COMPARISON_PALETTE = [
  { hex: "#3b82f6", name: "Blue", class: "text-blue-400 border-blue-500 bg-blue-500/10" },
  { hex: "#10b981", name: "Emerald", class: "text-emerald-400 border-emerald-500 bg-emerald-500/10" },
  { hex: "#f59e0b", name: "Amber", class: "text-amber-400 border-amber-500 bg-amber-500/10" },
  { hex: "#a855f7", name: "Purple", class: "text-purple-400 border-purple-500 bg-purple-500/10" },
  { hex: "#f43f5e", name: "Rose", class: "text-rose-400 border-rose-500 bg-rose-500/10" },
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
  const clean = query.trim().toLowerCase();
  if (!clean) return ALL_COUNTRIES.slice(0, 10);

  return ALL_COUNTRIES.filter(
    (c) =>
      c.iso3.toLowerCase().includes(clean) ||
      c.name.toLowerCase().includes(clean) ||
      c.region.toLowerCase().includes(clean)
  );
}
