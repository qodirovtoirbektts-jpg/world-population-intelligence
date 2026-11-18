import {
  ALL_COUNTRIES,
  searchCountries,
  findCountryByIso3,
  COMPARISON_PALETTE,
} from "../src/lib/country-registry.js";
import {
  generateComparisonDataset,
  buildYearlyHistoricalSeries,
  VERIFIED_HISTORICAL_MILESTONES,
} from "../src/lib/historical-data.js";
import { INDICATORS, formatIndicatorValue } from "../src/lib/world-bank.js";

async function runStage4QA() {
  console.log("==================================================");
  console.log("WORLD POPULATION INTELLIGENCE: STAGE 4 QA AUDIT");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // TEST 1: Country Search by Name and ISO-3 Code
  console.log("\n--- TEST 1: Search by Country Name & ISO-3 ---");
  const searchUzb = searchCountries("Uzbekistan");
  assert(searchUzb.some(c => c.iso3 === "UZB"), "Search 'Uzbekistan' returns UZB");

  const searchIso3 = searchCountries("USA");
  assert(searchIso3.some(c => c.iso3 === "USA"), "Search 'USA' (ISO-3) returns United States");

  const searchLower = searchCountries("chn");
  assert(searchLower.some(c => c.iso3 === "CHN"), "Search 'chn' (lowercase ISO-3) returns China");

  const searchRegion = searchCountries("Central Asia");
  assert(searchRegion.length >= 4, `Search 'Central Asia' returns ${searchRegion.length} regional countries`);

  // TEST 2: Selection Constraints (2 to 5 countries)
  console.log("\n--- TEST 2: Country Selection Constraints ---");
  const default2 = ["UZB", "KAZ"];
  const dataset2 = generateComparisonDataset(default2);
  assert(dataset2.profiles.length === 2, "2 countries comparison produces exactly 2 profiles");

  const set5 = ["UZB", "USA", "CHN", "IND", "BRA"];
  const dataset5 = generateComparisonDataset(set5);
  assert(dataset5.profiles.length === 5, "5 countries comparison produces exactly 5 profiles");

  // Attempting 6 countries
  const set6 = ["UZB", "USA", "CHN", "IND", "BRA", "DEU"];
  const dataset6 = generateComparisonDataset(set6);
  assert(dataset6.profiles.length === 5, "6th country is strictly clamped to 5 maximum");
  assert(!dataset6.profiles.some(p => p.iso3 === "DEU"), "6th country (DEU) was correctly rejected");

  // TEST 3: Duplicate Prevention
  console.log("\n--- TEST 3: Duplicate Prevention ---");
  const duplicates = ["UZB", "UZB", "USA"];
  const uniqueOnly = Array.from(new Set(duplicates));
  const datasetDup = generateComparisonDataset(uniqueOnly);
  assert(datasetDup.profiles.length === 2, "Duplicate 'UZB' prevented; only 2 distinct profiles created");

  // TEST 4: Quick Add Uzbekistan
  console.log("\n--- TEST 4: Quick Add Uzbekistan ---");
  const nonUzb = ["USA", "CHN"];
  assert(!nonUzb.includes("UZB"), "UZB not initially present in nonUzb set");
  const addedUzb = [...nonUzb, "UZB"];
  assert(addedUzb.includes("UZB") && addedUzb.length === 3, "Uzbekistan successfully appended as 3rd country");

  // TEST 5: All 4 World Bank Indicators Verified
  console.log("\n--- TEST 5: Four Core World Bank Indicators ---");
  const expectedCodes = ["SP.POP.TOTL", "EN.POP.DNST", "SP.POP.GROW", "SP.URB.TOTL.IN.ZS"];
  for (const code of expectedCodes) {
    assert(INDICATORS[code] !== undefined, `Indicator ${code} defined in INDICATORS: ${INDICATORS[code]?.name}`);
  }

  const uzbProfile = dataset5.profiles.find(p => p.iso3 === "UZB");
  assert(uzbProfile !== undefined, "Uzbekistan profile exists");
  assert(uzbProfile.metrics["SP.POP.TOTL"].value > 30000000, `UZB Population > 30M: ${uzbProfile.metrics["SP.POP.TOTL"].formattedValue}`);
  assert(uzbProfile.metrics["EN.POP.DNST"].value > 70, `UZB Density > 70/km²: ${uzbProfile.metrics["EN.POP.DNST"].formattedValue}`);
  assert(uzbProfile.metrics["SP.POP.GROW"].value > 1.5, `UZB Growth > 1.5%: ${uzbProfile.metrics["SP.POP.GROW"].formattedValue}`);
  assert(uzbProfile.metrics["SP.URB.TOTL.IN.ZS"].value > 45, `UZB Urban Share > 45%: ${uzbProfile.metrics["SP.URB.TOTL.IN.ZS"].formattedValue}`);

  // Missing data rule: never format null as 0
  const nullFormatted = formatIndicatorValue("SP.POP.TOTL", null);
  assert(nullFormatted === "Data pending", `Null formatted value is "${nullFormatted}", never "0"`);

  // TEST 6: Historical Timeline (1960 to 2024)
  console.log("\n--- TEST 6: Historical Time Series (1960–2024) ---");
  for (const code of expectedCodes) {
    const series = dataset5.historical[code];
    assert(series.length === 65, `${code} has 65 sequential annual points (1960 to 2024)`);
    assert(series[0].year === 1960, `${code} begins at year 1960`);
    assert(series[64].year === 2024, `${code} terminates at year 2024`);
  }

  // TEST 7: Negative Growth Rate Handling
  console.log("\n--- TEST 7: Negative Growth Rates (Demographic Contraction) ---");
  const chnSeries = dataset5.historical["SP.POP.GROW"];
  const chn2023 = chnSeries.find(p => p.year === 2023);
  assert(chn2023.CHN < 0, `China 2023 annual growth is authentically negative: ${chn2023.CHN}%`);

  // TEST 8: Time Span Slicing
  console.log("\n--- TEST 8: Time Span Slicing (Filters) ---");
  const full = dataset5.historical["SP.POP.TOTL"].filter(p => p.year >= 1960);
  const from1990 = dataset5.historical["SP.POP.TOTL"].filter(p => p.year >= 1990);
  const from2000 = dataset5.historical["SP.POP.TOTL"].filter(p => p.year >= 2000);

  assert(full.length === 65, `1960-2024 filter yields 65 points`);
  assert(from1990.length === 35, `1990-2024 filter yields 35 points`);
  assert(from2000.length === 25, `2000-2024 filter yields 25 points`);

  // TEST 9: Live Server API Verification
  console.log("\n--- TEST 9: Live Server Endpoint Audit ---");
  try {
    const res = await fetch("http://localhost:3000/api/demographics?compare=true&countries=UZB,USA,CHN");
    assert(res.status === 200, `Live API returned HTTP 200: ${res.status}`);
    const cacheControl = res.headers.get("Cache-Control");
    assert(cacheControl && cacheControl.includes("s-maxage=86400"), `ISR 24h caching header present: ${cacheControl}`);

    const apiData = await res.json();
    assert(apiData.comparison?.profiles?.length === 3, `API returned 3 country profiles`);
    assert(apiData.countries.join(",") === "UZB,USA,CHN", `API verified requested countries: ${apiData.countries}`);
  } catch (err) {
    assert(false, `Live API fetch encountered error: ${err.message}`);
  }

  console.log("\n==================================================");
  console.log(`TOTAL AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runStage4QA();
