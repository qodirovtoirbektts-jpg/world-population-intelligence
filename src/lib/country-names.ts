import { SupportedLocale } from "@/lib/i18n";

/**
 * Localized country names (Uzbek & Russian) for smooth editorial presentation.
 * Falls back cleanly to official English World Bank name for unmapped territories.
 */
export const COUNTRY_NAMES_LOCALIZED: Record<
  string,
  { uz: string; ru: string; en?: string }
> = {
  UZB: { uz: "Oʻzbekiston", ru: "Узбекистан", en: "Uzbekistan" },
  KAZ: { uz: "Qozogʻiston", ru: "Казахстан", en: "Kazakhstan" },
  KGZ: { uz: "Qirgʻiziston", ru: "Кыргызстан", en: "Kyrgyz Republic" },
  TJK: { uz: "Tojikiston", ru: "Таджикистан", en: "Tajikistan" },
  TKM: { uz: "Turkmaniston", ru: "Туркменистан", en: "Turkmenistan" },
  AZE: { uz: "Ozarbayjon", ru: "Азербайджан", en: "Azerbaijan" },
  ARM: { uz: "Armaniston", ru: "Армения", en: "Armenia" },
  GEO: { uz: "Gruziya", ru: "Грузия", en: "Georgia" },
  AFG: { uz: "Afgʻoniston", ru: "Афганистан", en: "Afghanistan" },
  USA: { uz: "AQSH", ru: "США", en: "United States" },
  CHN: { uz: "Xitoy", ru: "Китай", en: "China" },
  IND: { uz: "Hindiston", ru: "Индия", en: "India" },
  IDN: { uz: "Indoneziya", ru: "Индонезия", en: "Indonesia" },
  PAK: { uz: "Pokiston", ru: "Пакистан", en: "Pakistan" },
  NGA: { uz: "Nigeriya", ru: "Нигерия", en: "Nigeria" },
  BRA: { uz: "Braziliya", ru: "Бразилия", en: "Brazil" },
  BGD: { uz: "Bangladesh", ru: "Бангладеш", en: "Bangladesh" },
  RUS: { uz: "Rossiya", ru: "Россия", en: "Russian Federation" },
  MEX: { uz: "Meksika", ru: "Мексика", en: "Mexico" },
  JPN: { uz: "Yaponiya", ru: "Япония", en: "Japan" },
  ETH: { uz: "Efiopiya", ru: "Эфиопия", en: "Ethiopia" },
  EGY: { uz: "Misr", ru: "Египет", en: "Egypt" },
  PHL: { uz: "Filippin", ru: "Филиппины", en: "Philippines" },
  VNM: { uz: "Vyetnam", ru: "Вьетнам", en: "Vietnam" },
  COD: { uz: "Kongo DR", ru: "ДР Конго", en: "Dem. Rep. Congo" },
  IRN: { uz: "Eron", ru: "Иран", en: "Iran" },
  THA: { uz: "Tailand", ru: "Таиланд", en: "Thailand" },
  TUR: { uz: "Turkiya", ru: "Турция", en: "Turkey" },
  DEU: { uz: "Germaniya", ru: "Германия", en: "Germany" },
  GBR: { uz: "Buyuk Britaniya", ru: "Великобритания", en: "United Kingdom" },
  FRA: { uz: "Fransiya", ru: "Франция", en: "France" },
  ITA: { uz: "Italiya", ru: "Италия", en: "Italy" },
  ESP: { uz: "Ispaniya", ru: "Испания", en: "Spain" },
  POL: { uz: "Polsha", ru: "Польша", en: "Poland" },
  UKR: { uz: "Ukraina", ru: "Украина", en: "Ukraine" },
  NLD: { uz: "Niderlandiya", ru: "Нидерланды", en: "Netherlands" },
  BEL: { uz: "Belgiya", ru: "Бельгия", en: "Belgium" },
  CHE: { uz: "Shveytsariya", ru: "Швейцария", en: "Switzerland" },
  AUT: { uz: "Avstriya", ru: "Австрия", en: "Austria" },
  SWE: { uz: "Shvetsiya", ru: "Швеция", en: "Sweden" },
  NOR: { uz: "Norvegiya", ru: "Норвегия", en: "Norway" },
  DNK: { uz: "Daniya", ru: "Дания", en: "Denmark" },
  FIN: { uz: "Finlyandiya", ru: "Финляндия", en: "Finland" },
  PRT: { uz: "Portugaliya", ru: "Португалия", en: "Portugal" },
  GRC: { uz: "Gretsiya", ru: "Греция", en: "Greece" },
  CZE: { uz: "Chexiya", ru: "Чехия", en: "Czechia" },
  HUN: { uz: "Vengriya", ru: "Венгрия", en: "Hungary" },
  IRL: { uz: "Irlandiya", ru: "Ирландия", en: "Ireland" },
  LUX: { uz: "Lyuksemburg", ru: "Люксембург", en: "Luxembourg" },
  ROU: { uz: "Ruminiya", ru: "Румыния", en: "Romania" },
  BGR: { uz: "Bolgariya", ru: "Болгария", en: "Bulgaria" },
  BLR: { uz: "Belarus", ru: "Беларусь", en: "Belarus" },
  ALB: { uz: "Albaniya", ru: "Албания", en: "Albania" },
  LTU: { uz: "Litva", ru: "Литва", en: "Lithuania" },
  LVA: { uz: "Latviya", ru: "Латвия", en: "Latvia" },
  EST: { uz: "Estoniya", ru: "Эстония", en: "Estonia" },
  KOR: { uz: "Janubiy Koreya", ru: "Южная Корея", en: "South Korea" },
  PRK: { uz: "Shimoliy Koreya", ru: "КНДР", en: "North Korea" },
  MYS: { uz: "Malayziya", ru: "Малайзия", en: "Malaysia" },
  SGP: { uz: "Singapur", ru: "Сингапур", en: "Singapore" },
  SAU: { uz: "Saudiya Arabistoni", ru: "Саудовская Аравия", en: "Saudi Arabia" },
  ARE: { uz: "BAA", ru: "ОАЭ", en: "United Arab Emirates" },
  QAT: { uz: "Qatar", ru: "Катар", en: "Qatar" },
  ISR: { uz: "Isroil", ru: "Израиль", en: "Israel" },
  IRQ: { uz: "Iroq", ru: "Ирак", en: "Iraq" },
  SYR: { uz: "Suriya", ru: "Сирия", en: "Syria" },
  JOR: { uz: "Iordaniya", ru: "Иордания", en: "Jordan" },
  CAN: { uz: "Kanada", ru: "Канада", en: "Canada" },
  ARG: { uz: "Argentina", ru: "Аргентина", en: "Argentina" },
  COL: { uz: "Kolumbiya", ru: "Колумбия", en: "Colombia" },
  CHL: { uz: "Chili", ru: "Чили", en: "Chile" },
  PER: { uz: "Peru", ru: "Перу", en: "Peru" },
  AUS: { uz: "Avstraliya", ru: "Австралия", en: "Australia" },
  NZL: { uz: "Yangi Zelandiya", ru: "Новая Зеландия", en: "New Zealand" },
  ZAF: { uz: "Janubiy Afrika", ru: "ЮАР", en: "South Africa" },
  DZA: { uz: "Jazoir", ru: "Алжир", en: "Algeria" },
  MAR: { uz: "Marokash", ru: "Марокко", en: "Morocco" },
  TUN: { uz: "Tunis", ru: "Тунис", en: "Tunisia" },
  KEN: { uz: "Keniya", ru: "Кения", en: "Kenya" },
  AGO: { uz: "Angola", ru: "Ангола", en: "Angola" },
  MNG: { uz: "Moʻgʻuliston", ru: "Монголия", en: "Mongolia" },
};

export const REGION_NAMES_LOCALIZED: Record<
  string,
  { uz: string; ru: string; en: string }
> = {
  All: { uz: "Barcha mintaqalar", ru: "Все регионы", en: "All Regions" },
  "Central Asia": { uz: "Markaziy Osiyo", ru: "Центральная Азия", en: "Central Asia" },
  "Central Asia & Caucasus": {
    uz: "Markaziy Osiyo va Kavkaz",
    ru: "Центральная Азия и Кавказ",
    en: "Central Asia & Caucasus",
  },
  Europe: { uz: "Yevropa", ru: "Европа", en: "Europe" },
  "Europe & Central Asia": {
    uz: "Yevropa va Markaziy Osiyo",
    ru: "Европа и Центральная Азия",
    en: "Europe & Central Asia",
  },
  "East Asia": { uz: "Sharqiy Osiyo", ru: "Восточная Азия", en: "East Asia" },
  "East Asia & Pacific": {
    uz: "Sharqiy Osiyo va Tinch okeani",
    ru: "Восточная Азия и Тихий океан",
    en: "East Asia & Pacific",
  },
  "South Asia": { uz: "Janubiy Osiyo", ru: "Южная Азия", en: "South Asia" },
  "North America": { uz: "Shimoliy Amerika", ru: "Северная Америка", en: "North America" },
  "Latin America": { uz: "Lotin Amerikasi", ru: "Латинская Америка", en: "Latin America" },
  "Middle East & North Africa": {
    uz: "Yaqin Sharq va Shimoliy Afrika",
    ru: "Ближний Восток и Северная Африка",
    en: "Middle East & North Africa",
  },
  "Middle East": { uz: "Yaqin Sharq", ru: "Ближний Восток", en: "Middle East" },
  "Sub-Saharan Africa": {
    uz: "Sahroi Kabirdan janubiy Afrika",
    ru: "Африка южнее Сахары",
    en: "Sub-Saharan Africa",
  },
};

export function getLocalizedCountryName(
  iso3: string,
  fallbackName: string,
  lang: SupportedLocale
): string {
  const entry = COUNTRY_NAMES_LOCALIZED[iso3.toUpperCase()];
  if (entry) {
    if (lang === "uz") return entry.uz;
    if (lang === "ru") return entry.ru;
    return entry.en || fallbackName;
  }
  return fallbackName;
}

export function getLocalizedRegionName(
  region: string,
  lang: SupportedLocale
): string {
  const entry = REGION_NAMES_LOCALIZED[region];
  if (!entry) return region;
  return entry[lang] || entry.en;
}

export function matchesLocalizedCountry(
  iso3: string,
  englishName: string,
  region: string,
  query: string
): boolean {
  const clean = query.trim().toLowerCase();
  if (!clean) return true;
  const entry = COUNTRY_NAMES_LOCALIZED[iso3.toUpperCase()];
  return (
    iso3.toLowerCase().includes(clean) ||
    englishName.toLowerCase().includes(clean) ||
    region.toLowerCase().includes(clean) ||
    Boolean(entry?.uz.toLowerCase().includes(clean)) ||
    Boolean(entry?.ru.toLowerCase().includes(clean))
  );
}
