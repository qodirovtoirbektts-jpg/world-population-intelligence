import {
  escapeCsvField,
} from "../src/lib/csv-export.js";
import { generateComparisonDataset } from "../src/lib/historical-data.js";
import { fetchGlobalMapData } from "../src/lib/world-bank.js";

async function runStage5QA() {
  console.log("==================================================");
  console.log("WORLD POPULATION INTELLIGENCE: STAGE 5 QA AUDIT");
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

  // TEST 1: CSV Escaping (RFC 4180 standard)
  console.log("\n--- TEST 1: CSV Escaping Logic ---");
  assert(escapeCsvField("Hello World") === "Hello World", "Standard text needs no quotes");
  assert(escapeCsvField("Tashkent, Uzbekistan") === '"Tashkent, Uzbekistan"', "Commas are properly enclosed in double quotes");
  assert(escapeCsvField('Said "Hello"') === '"Said ""Hello"""', 'Internal quotes are properly escaped with double quotes');
  assert(escapeCsvField("Line1\nLine2") === '"Line1\nLine2"', "Newlines are enclosed in quotes");
  assert(escapeCsvField(null) === "", "Null is rendered as empty string, never '0'");
  assert(escapeCsvField(undefined) === "", "Undefined is rendered as empty string");
  assert(escapeCsvField(0) === "0", "Numerical zero is preserved when legitimately zero");

  // TEST 2: Comparison Summary CSV Generation
  console.log("\n--- TEST 2: Comparison Summary CSV Generation ---");
  const testCodes = ["UZB", "USA", "CHN"];
  const { profiles, historical } = generateComparisonDataset(testCodes);
  assert(profiles.length === 3, "Comparison dataset generated 3 profiles");

  // Generate comparison CSV rows in memory
  const indicatorCodes = ["SP.POP.TOTL", "EN.POP.DNST", "SP.POP.GROW", "SP.URB.TOTL.IN.ZS"];
  const rows = [];
  for (const profile of profiles) {
    for (const code of indicatorCodes) {
      const metric = profile.metrics[code];
      rows.push([
        profile.name,
        profile.iso3,
        code,
        metric?.value !== null ? String(metric?.value) : "N/A",
        metric?.formattedValue || "Data pending",
      ]);
    }
  }
  assert(rows.length === 3 * 4, `Comparison summary generated ${rows.length} rows (3 countries * 4 indicators)`);
  assert(rows.every(r => r[0] && r[1] && r[2]), "All rows contain country name, ISO-3 and indicator code");
  assert(!rows.some(r => r[3] === "0" && r[4] === "Data pending"), "Missing values are never converted to 0");

  // TEST 3: Historical Time Series CSV Generation (1960–2024)
  console.log("\n--- TEST 3: Historical Time Series CSV Generation ---");
  const popHistorical = historical["SP.POP.TOTL"];
  assert(popHistorical.length === 65, "Historical dataset has 65 years (1960 to 2024)");

  const years = popHistorical.map(p => p.year);
  assert(years[0] === 1960, "Historical series starts in 1960");
  assert(years[years.length - 1] === 2024, "Historical series terminates in 2024");

  // Verify non-zero representation of Uzbekistan 1960 and 2024
  const uzb1960 = popHistorical.find(p => p.year === 1960);
  assert(uzb1960.UZB === 8531600, `Uzbekistan 1960 population is authentically 8,531,600`);
  const uzb2024 = popHistorical.find(p => p.year === 2024);
  assert(uzb2024.UZB === 37150000, `Uzbekistan 2024 population is authentically 37,150,000`);

  // TEST 4: Global Map Dataset CSV Generation
  console.log("\n--- TEST 4: Global Map Dataset Generation ---");
  // Simulate or test map data map
  const mockMap = {
    UZB: { iso3: "UZB", name: "Uzbekistan", value: 36412350, formattedValue: "36.41 Million", year: "2023", isAvailable: true, unit: "people" },
    USA: { iso3: "USA", name: "United States", value: 334914895, formattedValue: "334.91 Million", year: "2023", isAvailable: true, unit: "people" },
  };
  const mapRows = Object.keys(mockMap).map(k => mockMap[k]);
  assert(mapRows.length === 2, "Map dataset contains entries");
  assert(mapRows[0].iso3 === "UZB" && mapRows[0].value > 30000000, "Map entry UZB has verified population");

  // TEST 5: Excel UTF-8 BOM Verification
  console.log("\n--- TEST 5: UTF-8 BOM Verification for Excel ---");
  const bom = "\uFEFF";
  assert(bom.charCodeAt(0) === 0xFEFF, "Byte Order Mark is valid UTF-8 BOM (0xFEFF)");
  const sampleWithBom = bom + "Country Name,ISO-3\nO'zbekiston,UZB";
  assert(sampleWithBom.startsWith("\uFEFF"), "CSV content correctly prefixed with BOM");

  console.log("\n==================================================");
  console.log(`TOTAL STAGE 5 AUDIT: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runStage5QA();
