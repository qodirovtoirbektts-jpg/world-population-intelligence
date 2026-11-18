import { UnmatchedCountryReport } from "@/types/map";

/**
 * Standard ISO 3166-1 Numeric (3-digit) to ISO 3166-1 Alpha-3 (World Bank ISO-3) code mapping
 */
export const ISO_NUMERIC_TO_ISO3: Record<string, string> = {
  "004": "AFG", "008": "ALB", "010": "ATA", "012": "DZA", "016": "ASM",
  "020": "AND", "024": "AGO", "028": "ATG", "031": "AZE", "032": "ARG",
  "036": "AUS", "040": "AUT", "044": "BHS", "048": "BHR", "050": "BGD",
  "051": "ARM", "052": "BRB", "056": "BEL", "060": "BMU", "064": "BTN",
  "068": "BOL", "070": "BIH", "072": "BWA", "074": "BVT", "076": "BRA",
  "084": "BLZ", "086": "IOT", "090": "SLB", "092": "VGB", "096": "BRN",
  "100": "BGR", "104": "MMR", "108": "BDI", "112": "BLR", "116": "KHM",
  "120": "CMR", "124": "CAN", "132": "CPV", "136": "CYM", "140": "CAF",
  "144": "LKA", "148": "TCD", "152": "CHL", "156": "CHN", "158": "TWN",
  "162": "CXR", "166": "CCK", "170": "COL", "174": "COM", "175": "MYT",
  "178": "COG", "180": "COD", "184": "COK", "188": "CRI", "191": "HRV",
  "192": "CUB", "196": "CYP", "203": "CZE", "204": "BEN", "208": "DNK",
  "212": "DMA", "214": "DOM", "218": "ECU", "222": "SLV", "226": "GNQ",
  "231": "ETH", "232": "ERI", "233": "EST", "234": "FRO", "238": "FLK",
  "239": "SGS", "242": "FJI", "246": "FIN", "248": "ALA", "250": "FRA",
  "254": "GUF", "258": "PYF", "260": "ATF", "262": "DJI", "266": "GAB",
  "268": "GEO", "270": "GMB", "275": "PSE", "276": "DEU", "288": "GHA",
  "292": "GIB", "296": "KIR", "300": "GRC", "304": "GRL", "308": "GRD",
  "312": "GLP", "316": "GUM", "320": "GTM", "324": "GIN", "328": "GUY",
  "332": "HTI", "334": "HMD", "336": "VAT", "340": "HND", "344": "HKG",
  "348": "HUN", "352": "ISL", "356": "IND", "360": "IDN", "364": "IRN",
  "368": "IRQ", "372": "IRL", "376": "ISR", "380": "ITA", "384": "CIV",
  "388": "JAM", "392": "JPN", "398": "KAZ", "400": "JOR", "404": "KEN",
  "408": "PRK", "410": "KOR", "414": "KWT", "417": "KGZ", "418": "LAO",
  "422": "LBN", "426": "LSO", "428": "LVA", "430": "LBR", "434": "LBY",
  "438": "LIE", "440": "LTU", "442": "LUX", "446": "MAC", "450": "MDG",
  "454": "MWI", "458": "MYS", "462": "MDV", "466": "MLI", "470": "MLT",
  "474": "MTQ", "478": "MRT", "480": "MUS", "484": "MEX", "492": "MCO",
  "496": "MNG", "498": "MDA", "499": "MNE", "500": "MSR", "504": "MAR",
  "508": "MOZ", "512": "OMN", "516": "NAM", "520": "NRU", "524": "NPL",
  "528": "NLD", "531": "CUW", "533": "ABW", "534": "SXM", "535": "BES",
  "540": "NCL", "548": "VUT", "554": "NZL", "558": "NIC", "562": "NER",
  "566": "NGA", "570": "NIU", "574": "NFK", "578": "NOR", "580": "MNP",
  "581": "UMI", "583": "FSM", "584": "MHL", "585": "PLW", "586": "PAK",
  "591": "PAN", "598": "PNG", "600": "PRY", "604": "PER", "608": "PHL",
  "612": "PCN", "616": "POL", "620": "PRT", "624": "GNB", "626": "TLS",
  "630": "PRI", "634": "QAT", "638": "REU", "642": "ROU", "643": "RUS",
  "646": "RWA", "652": "BLM", "654": "SHN", "659": "KNA", "660": "AIA",
  "662": "LCA", "663": "MAF", "666": "SPM", "670": "VCT", "674": "SMR",
  "678": "STP", "682": "SAU", "686": "SEN", "688": "SRB", "690": "SYC",
  "694": "SLE", "702": "SGP", "703": "SVK", "704": "VNM", "705": "SVN",
  "706": "SOM", "710": "ZAF", "716": "ZWE", "724": "ESP", "728": "SSD",
  "729": "SDN", "732": "ESH", "740": "SUR", "744": "SJM", "748": "SWZ",
  "752": "SWE", "756": "CHE", "760": "SYR", "762": "TJK", "764": "THA",
  "768": "TGO", "772": "TKL", "776": "TON", "780": "TTO", "784": "ARE",
  "788": "TUN", "792": "TUR", "795": "TKM", "796": "TCA", "798": "TUV",
  "800": "UGA", "804": "UKR", "807": "MKD", "818": "EGY", "826": "GBR",
  "831": "GGY", "832": "JEY", "833": "IMN", "834": "TZA", "840": "USA",
  "850": "VIR", "854": "BFA", "858": "URY", "860": "UZB", "862": "VEN",
  "876": "WLF", "882": "WSM", "887": "YEM", "894": "ZMB"
};

/**
 * TopoJSON names to ISO-3 overrides for special entities without numeric ISO
 */
export const NAME_OVERRIDES_TO_ISO3: Record<string, string> = {
  "Kosovo": "XKX", // World Bank official code for Kosovo
  "Somaliland": "SOM", // Administered under Somalia in World Bank datasets
  "N. Cyprus": "CYP", // Listed under Cyprus area in standard UN/WB definitions
  "W. Sahara": "ESH", // Western Sahara
  "Taiwan": "TWN",
  "Dem. Rep. Congo": "COD",
  "Central African Rep.": "CAF",
  "Eq. Guinea": "GNQ",
  "S. Sudan": "SSD",
  "Bosnia and Herz.": "BIH",
  "Dominican Rep.": "DOM",
};

/**
 * Resolves a TopoJSON geometry identifier to an official World Bank ISO-3 code
 */
export function resolveGeoToIso3(
  geoId: string | number | undefined,
  geoName?: string
): string | null {
  if (geoId !== undefined && geoId !== null && geoId !== "-99") {
    const padded = String(geoId).padStart(3, "0");
    if (ISO_NUMERIC_TO_ISO3[padded]) {
      return ISO_NUMERIC_TO_ISO3[padded];
    }
  }

  if (geoName && NAME_OVERRIDES_TO_ISO3[geoName]) {
    return NAME_OVERRIDES_TO_ISO3[geoName];
  }

  return null;
}

/**
 * Audit and detection mechanism for unmatched countries (Per Requirement 2)
 * Ensures no country is secretly dropped without transparent reporting
 */
export function auditGeometryMatches(
  geometries: Array<{ id?: string | number; properties?: { name?: string } }>
): UnmatchedCountryReport {
  let matched = 0;
  const unmatchedList: Array<{ id: string | undefined; name: string; reason: string }> = [];

  for (const g of geometries) {
    const name = g.properties?.name || "Unknown";
    const iso3 = resolveGeoToIso3(g.id, name);

    if (iso3) {
      matched++;
    } else {
      unmatchedList.push({
        id: g.id !== undefined ? String(g.id) : undefined,
        name,
        reason: "No standardized ISO-3166-1 or World Bank indicator mapping found",
      });
    }
  }

  const coverage = geometries.length > 0 ? (matched / geometries.length) * 100 : 0;

  return {
    totalGeometries: geometries.length,
    matchedCount: matched,
    unmatchedList,
    matchingCoveragePercentage: parseFloat(coverage.toFixed(1)),
  };
}
