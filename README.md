# WORLD POPULATION INTELLIGENCE

A high-performance demographic intelligence platform engineered for in-depth global demographic analysis, multi-country comparison, and historical trajectory modeling powered exclusively by official **The World Bank Open Data (World Development Indicators)**.

---

## 🌟 Key Features

### 1. Global Demographic Intelligence Dashboard
- Streams official live data for the World Aggregate (`WLD`).
- Four core demographic indicators:
  - **Total Population** (`SP.POP.TOTL`): Global headcount.
  - **Population Density** (`EN.POP.DNST`): Midyear population per km² of land area.
  - **Annual Population Growth** (`SP.POP.GROW`): Exponential growth rate.
  - **Urban Population Share** (`SP.URB.TOTL.IN.ZS`): Percentage of population residing in urban centers.
- Transparent reporting of reference year, official source, and live connection status.
- Next.js ISR (Incremental Static Regeneration) with 24-hour server caching (`next: { revalidate: 86400 }`).

### 2. Interactive Choropleth World Map
- High-fidelity vector choropleth map powered by `react-simple-maps` and local TopoJSON 110m vectors (`public/data/world-110m.json`).
- Covers 200+ sovereign nations and reporting territories.
- Seamless metric switching between Population, Density, and Growth Rate with dynamic interpolated color scales.
- Interactive hover tooltips, zoom/pan navigation controls, and quick "Focus Uzbekistan (UZB)" shortcut.
- Country profile drawer displaying comprehensive indicators, capitals, and income classifications.
- Full ISO-3 matching audit ensuring 100% geometry detection without dropping territories.

### 3. Multi-Country Comparison Engine (Stage 4)
- Side-by-side demographic evaluation for **2 to 5 countries simultaneously**.
- Searchable country selector supporting country names and ISO-3 codes (e.g. `UZB`, `USA`, `CHN`).
- Quick-add button for Uzbekistan and one-click comparative presets (e.g. *Central Asia*, *Global Giants*).
- Strict duplicate prevention and cohort size constraints (min 2, max 5).
- Side-by-side indicator KPI cards with relative percentage bars and demographic contraction flags (`decline` badge for negative growth).

### 4. Dynamic Historical Trajectory Curves (1960–2024)
- 65-year longitudinal time series powered by Recharts SVG engine.
- Distinct vibrant color palettes per country with interactive legend toggles (click to show/hide lines).
- Metric tab switcher across all four indicators.
- Time range filters: `1960–2024` (full history), `1990–2024` (post-Soviet era), `2000–2024` (21st century).
- Linear and Logarithmic scale switcher (`Scale: LOG`) for comparing diverse demographic scales (e.g. Uzbekistan with China or India).

### 5. Multi-Format CSV Export Engine (Stage 5)
- **Direct browser download** via client-side Blob generation with zero external dependencies.
- **Excel & Sheets Compatibility**: UTF-8 Byte Order Mark (`\uFEFF`) ensures international names, accents, and symbols display flawlessly.
- **Three export formats**:
  - `world-population-comparison_YYYY-MM-DD.csv`: Snapshot of selected countries across all indicators with reference years and official sources.
  - `world-population-historical_1960-2024_YYYY-MM-DD.csv`: Complete longitudinal dataset from 1960 to 2024.
  - `world-population-global-map_YYYY-MM-DD.csv`: Comprehensive global dataset for 200+ territories.
- Proper CSV escaping (RFC 4180 standard) and clean missing value representation (`Data pending` / `N/A`, never zero).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14.2 (App Router, Server Components & Route Handlers) |
| **Language** | TypeScript 5.6 (Strict Type Safety) |
| **Styling** | Tailwind CSS 3.4 (Dark Mode Theme, Custom Palette) |
| **Components** | Radix UI Primitives, Lucide React Icons |
| **Vector Mapping** | React Simple Maps 5.0, TopoJSON Client, D3 Scale & Interpolate |
| **Charting Engine** | Recharts 2.15 (SVG Line Curves, Log Scale, Dynamic Tooltips) |
| **Data Source** | The World Bank Open Data API (v2 REST Endpoints) |
| **Caching** | 24-Hour Next.js ISR (`s-maxage=86400`), Stale-While-Revalidate |

---

## 📁 Project Structure

```
WORLD POPULATION INTELLIGENCE/
├── public/
│   └── data/
│       └── world-110m.json       # Local TopoJSON 110m geometries
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── demographics/
│   │   │       └── route.ts      # Multi-country & map demographic API route
│   │   ├── globals.css           # Tailwind custom styles & tokens
│   │   ├── layout.tsx            # Root layout with Header & Footer
│   │   └── page.tsx              # Main dashboard orchestrator
│   ├── components/
│   │   ├── comparison/           # Stage 4: Multi-country comparison components
│   │   │   ├── comparison-section.tsx
│   │   │   ├── country-selector.tsx
│   │   │   ├── historical-chart.tsx
│   │   │   └── metric-comparison-cards.tsx
│   │   ├── dashboard/            # Stage 1-2: Stat cards, banners & roadmap
│   │   ├── export/               # Stage 5: CSV Export dropdown & triggers
│   │   │   └── export-dropdown.tsx
│   │   ├── layout/               # Header & Footer navigation
│   │   ├── map/                  # Stage 3: Choropleth world map components
│   │   └── ui/                   # Button, Card, Badge primitives
│   ├── lib/
│   │   ├── country-codes.ts      # ISO-3 numeric & name mapping
│   │   ├── country-registry.ts   # Sovereign nations registry & color palette
│   │   ├── csv-export.ts         # CSV generation & UTF-8 BOM download engine
│   │   ├── historical-data.ts    # 1960-2024 authentic time series builder
│   │   └── world-bank.ts         # World Bank API client & resilient cache
│   └── types/                    # TypeScript interfaces & types
└── tests/
    └── qa-stage4.mjs             # Automated regression & integration test suite
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm 9+ or npm 10+

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/world-population-intelligence.git
cd world-population-intelligence

# Install dependencies
npm install
```

### Running Locally
```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build & Local Preview
```bash
# Compile and optimize production build
npm run build

# Start production server
npm run start -p 3000
```

---

## 🧪 Testing & Verification

Run the automated test suite covering search, country constraints, indicator fidelity, Recharts time-series slicing, and API endpoints:

```bash
# TypeScript verification
npx tsc --noEmit

# Automated Stage 4 & 5 integration tests
npx tsx tests/qa-stage4.mjs

# Production Next.js build
npm run build
```

---

## 🌐 Vercel Deployment Instructions

The application is fully prepared for one-click deployment to [Vercel](https://vercel.com):

1. **Push to GitHub**:
   Ensure your local repository branch is committed and pushed to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Stages 1-5 with CSV export and a11y audit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Log in to your Vercel Dashboard.
   - Click **Add New Project** -> **Import Git Repository**.
   - Select the `world-population-intelligence` repository.

3. **Build & Output Settings**:
   - Framework Preset: **Next.js** (Automatically detected)
   - Root Directory: `./` (Default)
   - Build Command: `next build` (Default)
   - Output Directory: `.next` (Default)
   - Environment Variables: None required (The World Bank API is free and public).

4. **Deploy**:
   - Click **Deploy**. Vercel will build the serverless functions, optimize static assets, and assign a production URL.

---

## ♿ Accessibility & Standards Compliance

- **WCAG 2.1 AA Compliant**: All interactive elements have focus indicators, accessible ARIA attributes (`role="tablist"`, `role="combobox"`, `role="listbox"`, `role="menu"`), and minimum 44px touch targets.
- **Screen Reader Support**: Visually hidden demographic summaries (`.sr-only`) provide screen readers with tabular access to historical charts.
- **High-Contrast Palette**: Color combinations tested to exceed contrast ratio of 7.5:1 against the dark background.
- **Zero Mock Data Policy**: Only verified, authentic figures from The World Bank Open Data platform are presented.

---

## 📄 License
This project is licensed under the MIT License. Demographic data is sourced from [The World Bank Open Data](https://data.worldbank.org/) under the Creative Commons Attribution 4.0 International (CC-BY 4.0) license.
