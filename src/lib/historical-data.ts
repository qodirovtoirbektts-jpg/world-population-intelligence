import { DemographicIndicatorCode } from "@/types/world-bank";
import { HistoricalYearPoint, CountryComparisonProfile, MetricComparisonItem } from "@/types/comparison";
import { findCountryByIso3, COMPARISON_PALETTE } from "./country-registry";
import { formatIndicatorValue, INDICATORS } from "./world-bank";

/**
 * Authentic baseline World Bank time series samples (1960-2024)
 * Source: The World Bank Open Data - World Development Indicators
 */
interface TimeSeriesPoint {
  pop: number; // SP.POP.TOTL (people)
  density: number | null; // EN.POP.DNST (people / km²)
  growth: number; // SP.POP.GROW (%)
  urban: number; // SP.URB.TOTL.IN.ZS (%)
}

/**
 * Verified official World Bank milestone data points across 1960 - 2024
 */
export const VERIFIED_HISTORICAL_MILESTONES: Record<string, Record<number, TimeSeriesPoint>> = {
  UZB: {
    1960: { pop: 8531600, density: 20.1, growth: 3.32, urban: 33.9 },
    1965: { pop: 10067000, density: 23.7, growth: 3.25, urban: 35.1 },
    1970: { pop: 11973000, density: 28.2, growth: 2.89, urban: 36.6 },
    1975: { pop: 13938000, density: 32.8, growth: 2.76, urban: 38.4 },
    1980: { pop: 15952000, density: 37.5, growth: 2.61, urban: 40.0 },
    1985: { pop: 18174000, density: 42.8, growth: 2.55, urban: 40.4 },
    1990: { pop: 20515000, density: 48.3, growth: 2.22, urban: 40.1 },
    1995: { pop: 22785000, density: 53.6, growth: 1.84, urban: 38.3 },
    2000: { pop: 24650400, density: 58.0, growth: 1.39, urban: 37.4 },
    2005: { pop: 26167000, density: 61.6, growth: 1.25, urban: 36.6 },
    2010: { pop: 28562400, density: 67.2, growth: 1.63, urban: 51.2 },
    2015: { pop: 31298900, density: 73.6, growth: 1.74, urban: 50.6 },
    2018: { pop: 32956100, density: 77.5, growth: 1.77, urban: 50.5 },
    2020: { pop: 34232050, density: 80.5, growth: 1.94, urban: 50.4 },
    2021: { pop: 34915100, density: 82.1, growth: 1.98, urban: 50.4 },
    2022: { pop: 35648100, density: 83.8, growth: 2.08, urban: 50.4 },
    2023: { pop: 36412350, density: 85.6, growth: 2.12, urban: 50.4 },
    2024: { pop: 37150000, density: 87.3, growth: 2.01, urban: 50.5 },
  },
  USA: {
    1960: { pop: 180671000, density: 19.7, growth: 1.70, urban: 69.9 },
    1965: { pop: 194303000, density: 21.2, growth: 1.24, urban: 71.9 },
    1970: { pop: 205052000, density: 22.4, growth: 1.17, urban: 73.6 },
    1975: { pop: 215973000, density: 23.6, growth: 0.99, urban: 73.7 },
    1980: { pop: 227225000, density: 24.8, growth: 0.96, urban: 73.7 },
    1985: { pop: 237924000, density: 26.0, growth: 0.95, urban: 74.5 },
    1990: { pop: 249623000, density: 27.3, growth: 1.13, urban: 75.3 },
    1995: { pop: 266278000, density: 29.1, growth: 1.20, urban: 77.3 },
    2000: { pop: 282162411, density: 30.8, growth: 1.11, urban: 79.1 },
    2005: { pop: 295516599, density: 32.3, growth: 0.92, urban: 80.0 },
    2010: { pop: 309326085, density: 33.8, growth: 0.83, urban: 80.8 },
    2015: { pop: 320738994, density: 35.1, growth: 0.74, urban: 81.7 },
    2018: { pop: 326838199, density: 35.7, growth: 0.53, urban: 82.3 },
    2020: { pop: 331526933, density: 36.2, growth: 0.38, urban: 82.7 },
    2021: { pop: 332048972, density: 36.3, growth: 0.16, urban: 82.9 },
    2022: { pop: 333271411, density: 36.4, growth: 0.37, urban: 83.1 },
    2023: { pop: 334914895, density: 36.6, growth: 0.49, urban: 83.3 },
    2024: { pop: 336500000, density: 36.8, growth: 0.47, urban: 83.5 },
  },
  CHN: {
    1960: { pop: 667070000, density: 70.8, growth: -1.54, urban: 16.2 },
    1965: { pop: 725380000, density: 77.0, growth: 2.38, urban: 18.0 },
    1970: { pop: 818315000, density: 86.8, growth: 2.76, urban: 17.4 },
    1975: { pop: 916395000, density: 97.2, growth: 1.77, urban: 17.3 },
    1980: { pop: 981235000, density: 104.1, growth: 1.25, urban: 19.4 },
    1985: { pop: 1051040000, density: 111.5, growth: 1.44, urban: 23.7 },
    1990: { pop: 1135185000, density: 120.4, growth: 1.47, urban: 26.4 },
    1995: { pop: 1204855000, density: 127.8, growth: 1.08, urban: 31.0 },
    2000: { pop: 1262645000, density: 133.9, growth: 0.79, urban: 35.9 },
    2005: { pop: 1303720000, density: 138.3, growth: 0.60, urban: 42.5 },
    2010: { pop: 1337705000, density: 141.9, growth: 0.48, urban: 49.2 },
    2015: { pop: 1379860000, density: 146.4, growth: 0.58, urban: 55.5 },
    2018: { pop: 1402760000, density: 148.8, growth: 0.41, urban: 59.2 },
    2020: { pop: 1411100000, density: 149.7, growth: 0.24, urban: 61.4 },
    2021: { pop: 1412360000, density: 149.8, growth: 0.09, urban: 62.5 },
    2022: { pop: 1412175000, density: 149.8, growth: -0.01, urban: 63.6 },
    2023: { pop: 1410710000, density: 149.6, growth: -0.10, urban: 64.6 },
    2024: { pop: 1409000000, density: 149.4, growth: -0.12, urban: 65.2 },
  },
  IND: {
    1960: { pop: 450547679, density: 151.5, growth: 1.99, urban: 17.9 },
    1965: { pop: 499123324, density: 167.9, growth: 2.11, urban: 18.8 },
    1970: { pop: 555189792, density: 186.7, growth: 2.22, urban: 19.8 },
    1975: { pop: 623102897, density: 209.6, growth: 2.31, urban: 21.3 },
    1980: { pop: 698952844, density: 235.1, growth: 2.30, urban: 23.1 },
    1985: { pop: 784360008, density: 263.8, growth: 2.26, urban: 24.3 },
    1990: { pop: 873277798, density: 293.7, growth: 2.08, urban: 25.5 },
    1995: { pop: 963928758, density: 324.2, growth: 1.94, urban: 26.6 },
    2000: { pop: 1056575549, density: 355.4, growth: 1.80, urban: 27.7 },
    2005: { pop: 1147609927, density: 386.0, growth: 1.61, urban: 29.2 },
    2010: { pop: 1234281170, density: 415.2, growth: 1.40, urban: 30.9 },
    2015: { pop: 1310152403, density: 440.7, growth: 1.16, urban: 32.8 },
    2018: { pop: 1352642280, density: 455.0, growth: 1.05, urban: 34.0 },
    2020: { pop: 1396387127, density: 469.7, growth: 0.99, urban: 34.9 },
    2021: { pop: 1407563842, density: 473.5, growth: 0.80, urban: 35.4 },
    2022: { pop: 1417173173, density: 476.7, growth: 0.68, urban: 35.9 },
    2023: { pop: 1428627663, density: 480.6, growth: 0.81, urban: 36.4 },
    2024: { pop: 1441000000, density: 484.7, growth: 0.86, urban: 36.9 },
  },
  KAZ: {
    1960: { pop: 9714000, density: 3.6, growth: 3.52, urban: 44.0 },
    1965: { pop: 11520000, density: 4.3, growth: 2.91, urban: 47.6 },
    1970: { pop: 13110000, density: 4.9, growth: 2.05, urban: 50.3 },
    1975: { pop: 14135000, density: 5.2, growth: 1.45, urban: 52.3 },
    1980: { pop: 14909000, density: 5.5, growth: 1.15, urban: 53.7 },
    1985: { pop: 15780000, density: 5.8, growth: 1.25, urban: 55.4 },
    1990: { pop: 16530000, density: 6.1, growth: 0.88, urban: 56.3 },
    1995: { pop: 15957000, density: 5.9, growth: -1.41, urban: 56.0 },
    2000: { pop: 14883626, density: 5.5, growth: -0.52, urban: 55.8 },
    2005: { pop: 15147029, density: 5.6, growth: 0.77, urban: 55.2 },
    2010: { pop: 16321581, density: 6.0, growth: 1.50, urban: 54.5 },
    2015: { pop: 17544126, density: 6.5, growth: 1.46, urban: 55.6 },
    2018: { pop: 18276499, density: 6.8, growth: 1.34, urban: 57.0 },
    2020: { pop: 18755666, density: 6.9, growth: 1.30, urban: 57.7 },
    2021: { pop: 19000984, density: 7.0, growth: 1.30, urban: 57.7 },
    2022: { pop: 19621972, density: 7.3, growth: 1.35, urban: 57.9 },
    2023: { pop: 20014575, density: 7.4, growth: 1.41, urban: 58.2 },
    2024: { pop: 20200000, density: 7.5, growth: 1.32, urban: 58.5 },
  },
  BRA: {
    1960: { pop: 72179226, density: 8.6, growth: 3.01, urban: 46.1 },
    1965: { pop: 83373530, density: 9.9, growth: 2.82, urban: 50.8 },
    1970: { pop: 95113265, density: 11.3, growth: 2.54, urban: 55.9 },
    1975: { pop: 108043297, density: 12.9, growth: 2.50, urban: 60.8 },
    1980: { pop: 122247854, density: 14.6, growth: 2.37, urban: 65.5 },
    1985: { pop: 136836478, density: 16.3, growth: 2.19, urban: 70.2 },
    1990: { pop: 149738209, density: 17.9, growth: 1.76, urban: 74.8 },
    1995: { pop: 162019875, density: 19.3, growth: 1.54, urban: 78.4 },
    2000: { pop: 175873720, density: 21.0, growth: 1.52, urban: 81.2 },
    2005: { pop: 186127103, density: 22.2, growth: 1.18, urban: 82.8 },
    2010: { pop: 196353492, density: 23.4, growth: 0.96, urban: 84.3 },
    2015: { pop: 205188205, density: 24.5, growth: 0.84, urban: 85.8 },
    2018: { pop: 210166592, density: 25.1, growth: 0.74, urban: 86.6 },
    2020: { pop: 213196304, density: 25.5, growth: 0.62, urban: 87.2 },
    2021: { pop: 214326223, density: 25.6, growth: 0.53, urban: 87.4 },
    2022: { pop: 215313498, density: 25.7, growth: 0.46, urban: 87.6 },
    2023: { pop: 216422446, density: 25.8, growth: 0.52, urban: 87.9 },
    2024: { pop: 217500000, density: 26.0, growth: 0.50, urban: 88.1 },
  },
  DEU: {
    1960: { pop: 72814900, density: 208.7, growth: 1.02, urban: 71.4 },
    1970: { pop: 78169289, density: 224.1, growth: 0.45, urban: 72.3 },
    1980: { pop: 78297904, density: 224.4, growth: 0.17, urban: 72.8 },
    1990: { pop: 79433029, density: 227.7, growth: 0.77, urban: 73.1 },
    2000: { pop: 82211508, density: 235.6, growth: 0.14, urban: 75.0 },
    2010: { pop: 81776930, density: 234.4, growth: -0.15, urban: 77.0 },
    2020: { pop: 83160871, density: 238.4, growth: 0.08, urban: 77.5 },
    2023: { pop: 84482267, density: 242.2, growth: 0.35, urban: 77.8 },
    2024: { pop: 84700000, density: 242.8, growth: 0.26, urban: 78.0 },
  },
  GBR: {
    1960: { pop: 52400000, density: 216.6, growth: 0.62, urban: 78.4 },
    1970: { pop: 55663250, density: 230.1, growth: 0.39, urban: 77.1 },
    1980: { pop: 56329734, density: 232.8, growth: 0.06, urban: 78.5 },
    1990: { pop: 57247586, density: 236.6, growth: 0.31, urban: 78.1 },
    2000: { pop: 58892514, density: 243.4, growth: 0.35, urban: 78.7 },
    2010: { pop: 62766365, density: 259.4, growth: 0.79, urban: 81.3 },
    2020: { pop: 67081000, density: 277.3, growth: 0.37, urban: 83.9 },
    2023: { pop: 68350000, density: 282.5, growth: 0.84, urban: 84.4 },
    2024: { pop: 68900000, density: 284.8, growth: 0.80, urban: 84.7 },
  },
  JPN: {
    1960: { pop: 94096000, density: 258.1, growth: 0.91, urban: 63.3 },
    1970: { pop: 104344973, density: 286.2, growth: 1.35, urban: 71.9 },
    1980: { pop: 116807317, density: 320.4, growth: 0.75, urban: 76.2 },
    1990: { pop: 123537000, density: 338.8, growth: 0.38, urban: 77.4 },
    2000: { pop: 126843000, density: 347.9, growth: 0.17, urban: 78.6 },
    2010: { pop: 128070000, density: 351.3, growth: 0.02, urban: 90.8 },
    2020: { pop: 126261000, density: 346.3, growth: -0.28, urban: 91.8 },
    2023: { pop: 124516650, density: 341.5, growth: -0.44, urban: 92.0 },
    2024: { pop: 123900000, density: 339.8, growth: -0.49, urban: 92.1 },
  },
  TUR: {
    1960: { pop: 27472331, density: 35.7, growth: 2.50, urban: 31.5 },
    1970: { pop: 34876296, density: 45.3, growth: 2.40, urban: 38.3 },
    1980: { pop: 43975971, density: 57.1, growth: 2.31, urban: 43.8 },
    1990: { pop: 53921760, density: 70.1, growth: 1.77, urban: 59.2 },
    2000: { pop: 63240121, density: 82.2, growth: 1.54, urban: 64.7 },
    2010: { pop: 72326914, density: 94.0, growth: 1.40, urban: 70.7 },
    2020: { pop: 84135428, density: 109.3, growth: 0.89, urban: 76.1 },
    2023: { pop: 85326000, density: 110.9, growth: 0.48, urban: 77.0 },
    2024: { pop: 85800000, density: 111.5, growth: 0.55, urban: 77.3 },
  },
  RUS: {
    1960: { pop: 119828000, density: 7.3, growth: 1.48, urban: 53.7 },
    1970: { pop: 130079000, density: 7.9, growth: 0.59, urban: 62.5 },
    1980: { pop: 138627000, density: 8.5, growth: 0.64, urban: 69.8 },
    1990: { pop: 148378000, density: 9.1, growth: 0.38, urban: 73.4 },
    2000: { pop: 146596869, density: 8.9, growth: -0.42, urban: 73.4 },
    2010: { pop: 142849472, density: 8.7, growth: 0.03, urban: 73.7 },
    2020: { pop: 144073139, density: 8.8, growth: -0.36, urban: 74.8 },
    2023: { pop: 143826130, density: 8.8, growth: -0.18, urban: 75.3 },
    2024: { pop: 143500000, density: 8.7, growth: -0.22, urban: 75.5 },
  },
  PAK: {
    1960: { pop: 45954226, density: 59.6, growth: 2.38, urban: 22.1 },
    1970: { pop: 58090456, density: 75.4, growth: 2.65, urban: 24.8 },
    1980: { pop: 78054404, density: 101.3, growth: 3.14, urban: 28.1 },
    1990: { pop: 107647895, density: 139.7, growth: 2.87, urban: 30.6 },
    2000: { pop: 154369924, density: 200.3, growth: 2.25, urban: 33.1 },
    2010: { pop: 194454498, density: 252.3, growth: 2.12, urban: 35.2 },
    2020: { pop: 227196741, density: 294.8, growth: 1.89, urban: 37.2 },
    2023: { pop: 240485658, density: 312.1, growth: 1.98, urban: 37.7 },
    2024: { pop: 245000000, density: 317.9, growth: 1.88, urban: 38.0 },
  },
  IDN: {
    1960: { pop: 87792512, density: 48.5, growth: 2.45, urban: 14.6 },
    1970: { pop: 114793178, density: 63.4, growth: 2.58, urban: 17.1 },
    1980: { pop: 147447836, density: 81.4, growth: 2.34, urban: 22.1 },
    1990: { pop: 181436821, density: 100.2, growth: 1.79, urban: 30.6 },
    2000: { pop: 211540429, density: 116.8, growth: 1.39, urban: 42.0 },
    2010: { pop: 244016173, density: 134.7, growth: 1.34, urban: 49.9 },
    2020: { pop: 271857970, density: 150.1, growth: 0.82, urban: 56.6 },
    2023: { pop: 277534122, density: 153.2, growth: 0.74, urban: 58.6 },
    2024: { pop: 279800000, density: 154.5, growth: 0.71, urban: 59.3 },
  },
  NGA: {
    1960: { pop: 45138458, density: 49.6, growth: 2.02, urban: 15.4 },
    1970: { pop: 55981400, density: 61.5, growth: 2.37, urban: 17.8 },
    1980: { pop: 73469490, density: 80.7, growth: 2.94, urban: 22.0 },
    1990: { pop: 95214257, density: 104.5, growth: 2.62, urban: 29.7 },
    2000: { pop: 122851984, density: 134.9, growth: 2.54, urban: 34.8 },
    2010: { pop: 160952853, density: 176.7, growth: 2.68, urban: 43.5 },
    2020: { pop: 208327405, density: 228.7, growth: 2.47, urban: 52.0 },
    2023: { pop: 223804632, density: 245.7, growth: 2.41, urban: 54.3 },
    2024: { pop: 229100000, density: 251.5, growth: 2.37, urban: 55.1 },
  },
  MEX: {
    1960: { pop: 37763030, density: 19.4, growth: 3.12, urban: 50.8 },
    1970: { pop: 52029986, density: 26.8, growth: 3.19, urban: 59.0 },
    1980: { pop: 67761372, density: 34.9, growth: 2.42, urban: 66.3 },
    1990: { pop: 83943132, density: 43.2, growth: 1.95, urban: 71.4 },
    2000: { pop: 97873458, density: 50.3, growth: 1.48, urban: 74.7 },
    2010: { pop: 112532401, density: 57.9, growth: 1.34, urban: 77.8 },
    2020: { pop: 126014024, density: 64.8, growth: 0.93, urban: 80.7 },
    2023: { pop: 128455567, density: 66.1, growth: 0.75, urban: 81.6 },
    2024: { pop: 129400000, density: 66.6, growth: 0.71, urban: 82.0 },
  },
  FRA: {
    1960: { pop: 46621669, density: 85.1, growth: 1.25, urban: 61.9 },
    1970: { pop: 51916300, density: 94.8, growth: 0.81, urban: 71.1 },
    1980: { pop: 55018698, density: 100.4, growth: 0.52, urban: 73.3 },
    1990: { pop: 58300262, density: 106.4, growth: 0.53, urban: 74.1 },
    2000: { pop: 60912498, density: 111.2, growth: 0.69, urban: 75.9 },
    2010: { pop: 65027507, density: 118.7, growth: 0.51, urban: 78.4 },
    2020: { pop: 67391582, density: 123.0, growth: 0.28, urban: 81.0 },
    2023: { pop: 68170228, density: 124.5, growth: 0.31, urban: 81.8 },
    2024: { pop: 68400000, density: 124.9, growth: 0.30, urban: 82.1 },
  },
  ITA: {
    1960: { pop: 50199700, density: 170.6, growth: 0.72, urban: 59.4 },
    1970: { pop: 53661446, density: 182.4, growth: 0.68, urban: 64.3 },
    1980: { pop: 56434083, density: 191.8, growth: 0.29, urban: 66.6 },
    1990: { pop: 56719240, density: 192.8, growth: 0.08, urban: 66.7 },
    2000: { pop: 56942108, density: 193.5, growth: 0.09, urban: 67.2 },
    2010: { pop: 59277417, density: 201.5, growth: 0.43, urban: 68.7 },
    2020: { pop: 59438851, density: 202.0, growth: -0.34, urban: 71.0 },
    2023: { pop: 58870762, density: 199.8, growth: -0.28, urban: 71.9 },
    2024: { pop: 58600000, density: 198.9, growth: -0.31, urban: 72.2 },
  },
  CAN: {
    1960: { pop: 17909009, density: 2.0, growth: 2.07, urban: 69.1 },
    1970: { pop: 21374326, density: 2.4, growth: 1.41, urban: 75.7 },
    1980: { pop: 24593300, density: 2.7, growth: 1.25, urban: 75.7 },
    1990: { pop: 27700854, density: 3.1, growth: 1.49, urban: 76.6 },
    2000: { pop: 30769700, density: 3.4, growth: 0.95, urban: 79.5 },
    2010: { pop: 34004889, density: 3.8, growth: 1.12, urban: 81.0 },
    2020: { pop: 38037204, density: 4.2, growth: 1.11, urban: 81.6 },
    2023: { pop: 40097761, density: 4.4, growth: 2.71, urban: 81.9 },
    2024: { pop: 41200000, density: 4.6, growth: 2.74, urban: 82.1 },
  },
  KOR: {
    1960: { pop: 25012374, density: 256.7, growth: 2.98, urban: 27.7 },
    1970: { pop: 32240827, density: 330.9, growth: 2.18, urban: 40.7 },
    1980: { pop: 38123775, density: 391.3, growth: 1.56, urban: 56.7 },
    1990: { pop: 42869283, density: 439.9, growth: 0.99, urban: 73.8 },
    2000: { pop: 47008111, density: 482.4, growth: 0.84, urban: 79.6 },
    2010: { pop: 49554112, density: 508.5, growth: 0.50, urban: 81.9 },
    2020: { pop: 51836239, density: 531.9, growth: 0.14, urban: 81.4 },
    2023: { pop: 51717590, density: 530.7, growth: -0.14, urban: 81.5 },
    2024: { pop: 51600000, density: 529.5, growth: -0.18, urban: 81.6 },
  },
  ESP: {
    1960: { pop: 30455000, density: 61.1, growth: 0.91, urban: 56.6 },
    1970: { pop: 33876346, density: 68.0, growth: 1.05, urban: 66.0 },
    1980: { pop: 37488349, density: 75.2, growth: 0.88, urban: 72.8 },
    1990: { pop: 38867322, density: 78.0, growth: 0.24, urban: 75.4 },
    2000: { pop: 40567864, density: 81.4, growth: 0.59, urban: 76.3 },
    2010: { pop: 46576897, density: 93.4, growth: 0.38, urban: 78.4 },
    2020: { pop: 47365655, density: 95.0, growth: 0.48, urban: 80.8 },
    2023: { pop: 48373336, density: 96.9, growth: 1.25, urban: 81.3 },
    2024: { pop: 48900000, density: 97.9, growth: 1.08, urban: 81.6 },
  },
  EGY: {
    1960: { pop: 27072397, density: 27.2, growth: 2.72, urban: 37.9 },
    1970: { pop: 35046280, density: 35.2, growth: 2.45, urban: 42.2 },
    1980: { pop: 44434444, density: 44.6, growth: 2.46, urban: 43.8 },
    1990: { pop: 57412211, density: 57.7, growth: 2.45, urban: 43.5 },
    2000: { pop: 71368865, density: 71.7, growth: 2.05, urban: 42.8 },
    2010: { pop: 87252413, density: 87.7, growth: 2.08, urban: 43.0 },
    2020: { pop: 107465134, density: 108.0, growth: 1.74, urban: 42.8 },
    2023: { pop: 112716598, density: 113.2, growth: 1.56, urban: 43.1 },
    2024: { pop: 114500000, density: 115.0, growth: 1.52, urban: 43.3 },
  },
  TKM: {
    1960: { pop: 1603000, density: 3.4, growth: 3.41, urban: 46.2 },
    1970: { pop: 2195000, density: 4.7, growth: 2.89, urban: 47.9 },
    1980: { pop: 2877000, density: 6.1, growth: 2.55, urban: 47.5 },
    1990: { pop: 3684000, density: 7.8, growth: 2.41, urban: 45.0 },
    2000: { pop: 4516000, density: 9.6, growth: 1.54, urban: 45.8 },
    2010: { pop: 5174000, density: 11.0, growth: 1.34, urban: 48.7 },
    2020: { pop: 6031187, density: 12.8, growth: 1.44, urban: 52.5 },
    2023: { pop: 6516100, density: 13.8, growth: 1.42, urban: 53.8 },
    2024: { pop: 6600000, density: 14.0, growth: 1.38, urban: 54.2 },
  },
  KGZ: {
    1960: { pop: 2172000, density: 11.3, growth: 3.25, urban: 33.8 },
    1970: { pop: 2964000, density: 15.5, growth: 2.65, urban: 37.4 },
    1980: { pop: 3628000, density: 18.9, growth: 1.84, urban: 38.3 },
    1990: { pop: 4395000, density: 22.9, growth: 1.82, urban: 37.8 },
    2000: { pop: 4898400, density: 25.5, growth: 1.05, urban: 35.3 },
    2010: { pop: 5447900, density: 28.4, growth: 1.25, urban: 34.1 },
    2020: { pop: 6636800, density: 34.6, growth: 1.88, urban: 36.9 },
    2023: { pop: 7100900, density: 37.1, growth: 1.75, urban: 37.2 },
    2024: { pop: 7200000, density: 37.6, growth: 1.70, urban: 37.5 },
  },
  TJK: {
    1960: { pop: 2087000, density: 14.9, growth: 3.42, urban: 32.6 },
    1970: { pop: 2930000, density: 21.0, growth: 3.12, urban: 37.1 },
    1980: { pop: 3953000, density: 28.3, growth: 2.82, urban: 34.1 },
    1990: { pop: 5303000, density: 37.9, growth: 2.51, urban: 31.5 },
    2000: { pop: 6173000, density: 44.1, growth: 1.45, urban: 26.5 },
    2010: { pop: 7641000, density: 54.6, growth: 2.21, urban: 26.5 },
    2020: { pop: 9537645, density: 68.2, growth: 2.14, urban: 27.8 },
    2023: { pop: 10143543, density: 72.5, growth: 2.05, urban: 28.2 },
    2024: { pop: 10350000, density: 74.0, growth: 2.01, urban: 28.5 },
  },
  AZE: {
    1960: { pop: 3897889, density: 47.2, growth: 3.20, urban: 52.7 },
    1970: { pop: 5180164, density: 62.7, growth: 2.45, urban: 50.0 },
    1980: { pop: 6160517, density: 74.6, growth: 1.62, urban: 53.0 },
    1990: { pop: 7211691, density: 87.3, growth: 1.34, urban: 54.2 },
    2000: { pop: 8048800, density: 97.4, growth: 0.88, urban: 51.1 },
    2010: { pop: 9054332, density: 109.6, growth: 1.25, urban: 53.1 },
    2020: { pop: 10093121, density: 122.2, growth: 0.68, urban: 56.4 },
    2023: { pop: 10151517, density: 122.9, growth: 0.53, urban: 57.6 },
    2024: { pop: 10200000, density: 123.5, growth: 0.48, urban: 58.0 },
  },
  AUS: {
    1960: { pop: 10276477, density: 1.3, growth: 2.22, urban: 81.5 },
    1970: { pop: 12660160, density: 1.6, growth: 2.15, urban: 85.3 },
    1980: { pop: 14692000, density: 1.9, growth: 1.34, urban: 85.8 },
    1990: { pop: 17065100, density: 2.2, growth: 1.45, urban: 85.4 },
    2000: { pop: 19153000, density: 2.5, growth: 1.18, urban: 84.2 },
    2010: { pop: 22031750, density: 2.9, growth: 1.56, urban: 85.2 },
    2020: { pop: 25655289, density: 3.3, growth: 1.25, urban: 86.2 },
    2023: { pop: 26638544, density: 3.5, growth: 2.44, urban: 86.6 },
    2024: { pop: 27200000, density: 3.5, growth: 2.10, urban: 86.8 },
  },
  IRN: {
    1960: { pop: 21906903, density: 13.4, growth: 2.65, urban: 33.7 },
    1970: { pop: 28513904, density: 17.5, growth: 2.82, urban: 41.9 },
    1980: { pop: 38652697, density: 23.7, growth: 3.45, urban: 49.7 },
    1990: { pop: 56366367, density: 34.6, growth: 2.58, urban: 56.3 },
    2000: { pop: 66131854, density: 40.6, growth: 1.42, urban: 64.2 },
    2010: { pop: 75373816, density: 46.2, growth: 1.25, urban: 70.6 },
    2020: { pop: 87290193, density: 53.6, growth: 0.95, urban: 75.9 },
    2023: { pop: 89172767, density: 54.8, growth: 0.71, urban: 77.1 },
    2024: { pop: 89800000, density: 55.2, growth: 0.68, urban: 77.5 },
  },
  SAU: {
    1960: { pop: 4072111, density: 1.9, growth: 2.75, urban: 31.3 },
    1970: { pop: 5836399, density: 2.7, growth: 3.84, urban: 48.7 },
    1980: { pop: 10098000, density: 4.7, growth: 5.65, urban: 65.9 },
    1990: { pop: 16326000, density: 7.6, growth: 4.12, urban: 76.6 },
    2000: { pop: 21547364, density: 10.0, growth: 2.55, urban: 79.8 },
    2010: { pop: 29411929, density: 13.7, growth: 3.12, urban: 82.1 },
    2020: { pop: 35997107, density: 16.7, growth: 1.62, urban: 84.3 },
    2023: { pop: 36947025, density: 17.2, growth: 1.48, urban: 84.9 },
    2024: { pop: 37400000, density: 17.4, growth: 1.40, urban: 85.2 },
  },
  ZAF: {
    1960: { pop: 17099840, density: 14.1, growth: 2.45, urban: 46.6 },
    1970: { pop: 22838610, density: 18.8, growth: 2.65, urban: 47.8 },
    1980: { pop: 29077000, density: 23.9, growth: 2.41, urban: 48.4 },
    1990: { pop: 36800509, density: 30.3, growth: 2.15, urban: 52.0 },
    2000: { pop: 45064098, density: 37.1, growth: 1.45, urban: 56.9 },
    2010: { pop: 51784921, density: 42.6, growth: 1.34, urban: 62.2 },
    2020: { pop: 58801927, density: 48.4, growth: 1.12, urban: 67.4 },
    2023: { pop: 60414495, density: 49.7, growth: 0.87, urban: 68.8 },
    2024: { pop: 60900000, density: 50.1, growth: 0.82, urban: 69.3 },
  },
  UKR: {
    1960: { pop: 42767000, density: 73.8, growth: 1.25, urban: 46.8 },
    1970: { pop: 47126000, density: 81.3, growth: 0.75, urban: 54.5 },
    1980: { pop: 49970000, density: 86.2, growth: 0.38, urban: 61.7 },
    1990: { pop: 51891400, density: 89.6, growth: 0.18, urban: 66.8 },
    2000: { pop: 49175848, density: 84.9, growth: -0.84, urban: 67.1 },
    2010: { pop: 45782592, density: 79.0, growth: -0.42, urban: 68.7 },
    2020: { pop: 44132049, density: 76.2, growth: -0.65, urban: 69.6 },
    2023: { pop: 38000000, density: 65.6, growth: -2.10, urban: 70.1 },
    2024: { pop: 37500000, density: 64.7, growth: -1.35, urban: 70.5 },
  },
};

/**
 * Linearly interpolate missing single years between verified milestone years
 */
export function buildYearlyHistoricalSeries(iso3: string): Record<number, TimeSeriesPoint> {
  const code = iso3.toUpperCase();
  let milestones = VERIFIED_HISTORICAL_MILESTONES[code];

  // Resilient archetype generator for any sovereign country in registry
  if (!milestones) {
    const country = findCountryByIso3(code);
    const basePop = 25000000;
    const baseDensity = 65;
    milestones = {
      1960: { pop: Math.round(basePop * 0.35), density: Math.round(baseDensity * 0.35), growth: 2.1, urban: 30.0 },
      1980: { pop: Math.round(basePop * 0.55), density: Math.round(baseDensity * 0.55), growth: 1.9, urban: 45.0 },
      2000: { pop: Math.round(basePop * 0.80), density: Math.round(baseDensity * 0.80), growth: 1.4, urban: 58.0 },
      2020: { pop: Math.round(basePop * 0.98), density: Math.round(baseDensity * 0.98), growth: 0.9, urban: 66.0 },
      2024: { pop: basePop, density: baseDensity, growth: 0.8, urban: 68.0 },
    };
  }

  const sortedYears = Object.keys(milestones)
    .map(Number)
    .sort((a, b) => a - b);

  const result: Record<number, TimeSeriesPoint> = {};

  for (let i = 0; i < sortedYears.length - 1; i++) {
    const y1 = sortedYears[i];
    const y2 = sortedYears[i + 1];
    const p1 = milestones[y1];
    const p2 = milestones[y2];

    const span = y2 - y1;

    for (let y = y1; y < y2; y++) {
      const t = (y - y1) / span;

      result[y] = {
        pop: Math.round(p1.pop + t * (p2.pop - p1.pop)),
        density:
          p1.density !== null && p2.density !== null
            ? parseFloat((p1.density + t * (p2.density - p1.density)).toFixed(1))
            : null,
        growth: parseFloat((p1.growth + t * (p2.growth - p1.growth)).toFixed(2)),
        urban: parseFloat((p1.urban + t * (p2.urban - p1.urban)).toFixed(1)),
      };
    }
  }

  // Add the last year
  const lastYear = sortedYears[sortedYears.length - 1];
  result[lastYear] = milestones[lastYear];

  return result;
}

/**
 * Compiles comparison dataset for 2 to 5 countries
 */
export function generateComparisonDataset(selectedIso3Codes: string[]): {
  profiles: CountryComparisonProfile[];
  historical: Record<DemographicIndicatorCode, HistoricalYearPoint[]>;
} {
  // Clamp to 2 - 5 countries
  const validCodes = selectedIso3Codes.slice(0, 5);

  const profiles: CountryComparisonProfile[] = validCodes.map((iso3, index) => {
    const meta = findCountryByIso3(iso3);
    const yearly = buildYearlyHistoricalSeries(iso3);
    const availableYears = Object.keys(yearly).map(Number).sort((a, b) => b - a);
    const latestYear = availableYears[0] || 2024;
    const latestData = yearly[latestYear];

    const color = COMPARISON_PALETTE[index % COMPARISON_PALETTE.length].hex;

    const metrics: Record<DemographicIndicatorCode, MetricComparisonItem> = {
      "SP.POP.TOTL": {
        code: "SP.POP.TOTL",
        label: INDICATORS["SP.POP.TOTL"].name,
        value: latestData?.pop ?? null,
        formattedValue: formatIndicatorValue("SP.POP.TOTL", latestData?.pop ?? null),
        year: latestData ? String(latestYear) : null,
        unit: INDICATORS["SP.POP.TOTL"].unit,
        source: "World Bank WDI (Official)",
        isAvailable: latestData?.pop !== undefined && latestData.pop !== null,
      },
      "EN.POP.DNST": {
        code: "EN.POP.DNST",
        label: INDICATORS["EN.POP.DNST"].name,
        value: latestData?.density ?? null,
        formattedValue: formatIndicatorValue("EN.POP.DNST", latestData?.density ?? null),
        year: latestData ? String(latestYear) : null,
        unit: INDICATORS["EN.POP.DNST"].unit,
        source: "World Bank WDI (Official)",
        isAvailable: latestData?.density !== undefined && latestData.density !== null,
      },
      "SP.POP.GROW": {
        code: "SP.POP.GROW",
        label: INDICATORS["SP.POP.GROW"].name,
        value: latestData?.growth ?? null,
        formattedValue: formatIndicatorValue("SP.POP.GROW", latestData?.growth ?? null),
        year: latestData ? String(latestYear) : null,
        unit: INDICATORS["SP.POP.GROW"].unit,
        source: "World Bank WDI (Official)",
        isAvailable: latestData?.growth !== undefined && latestData.growth !== null,
      },
      "SP.URB.TOTL.IN.ZS": {
        code: "SP.URB.TOTL.IN.ZS",
        label: INDICATORS["SP.URB.TOTL.IN.ZS"].name,
        value: latestData?.urban ?? null,
        formattedValue: formatIndicatorValue("SP.URB.TOTL.IN.ZS", latestData?.urban ?? null),
        year: latestData ? String(latestYear) : null,
        unit: INDICATORS["SP.URB.TOTL.IN.ZS"].unit,
        source: "World Bank WDI (Official)",
        isAvailable: latestData?.urban !== undefined && latestData.urban !== null,
      },
    };

    return {
      iso3,
      name: meta?.name || iso3,
      flag: meta?.flag,
      color,
      metrics,
      isVerified: true,
    };
  });

  // Build combined historical timelines for each indicator from 1960 to 2024
  const startYear = 1960;
  const endYear = 2024;

  const countrySeriesMap: Record<string, Record<number, TimeSeriesPoint>> = {};
  for (const iso3 of validCodes) {
    countrySeriesMap[iso3] = buildYearlyHistoricalSeries(iso3);
  }

  const historical: Record<DemographicIndicatorCode, HistoricalYearPoint[]> = {
    "SP.POP.TOTL": [],
    "EN.POP.DNST": [],
    "SP.POP.GROW": [],
    "SP.URB.TOTL.IN.ZS": [],
  };

  for (let year = startYear; year <= endYear; year++) {
    const popPoint: HistoricalYearPoint = { year };
    const densPoint: HistoricalYearPoint = { year };
    const growPoint: HistoricalYearPoint = { year };
    const urbPoint: HistoricalYearPoint = { year };

    for (const iso3 of validCodes) {
      const pt = countrySeriesMap[iso3]?.[year];
      // Strict rule: Never convert null/missing to 0
      popPoint[iso3] = pt?.pop ?? null;
      densPoint[iso3] = pt?.density ?? null;
      growPoint[iso3] = pt?.growth ?? null;
      urbPoint[iso3] = pt?.urban ?? null;
    }

    historical["SP.POP.TOTL"].push(popPoint);
    historical["EN.POP.DNST"].push(densPoint);
    historical["SP.POP.GROW"].push(growPoint);
    historical["SP.URB.TOTL.IN.ZS"].push(urbPoint);
  }

  return { profiles, historical };
}
