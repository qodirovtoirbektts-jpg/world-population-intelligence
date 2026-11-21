export type SupportedLocale = "en" | "uz" | "ru";

export interface Translations {
  common: {
    loading: string;
    error: string;
    retry: string;
    na: string;
    dataPending: string;
    officialFeed: string;
    verifiedSnapshot: string;
    exportCsv: string;
    search: string;
    close: string;
    featured: string;
    all: string;
    tip: string;
    source: string;
    referenceYear: string;
    zeroMockBadge: string;
    worldBankWdi: string;
  };
  nav: {
    siteName: string;
    overview: string;
    globeMap: string;
    compare: string;
    historical: string;
    ranking: string;
    roadmap: string;
    globalOverview: string;
    liveBadge: string;
    searchPlaceholder: string;
  };
  hero: {
    suiteBadge: string;
    timeSeriesBadge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaCompare: string;
    ctaGlobe: string;
    ctaRanking: string;
  };
  telemetry: {
    dataFeed: string;
    sourcePartner: string;
    telemetryActive: string;
    cachingProtocol: string;
    officialRelease: string;
    lastSynchronized: string;
    justNow: string;
    verifiedDataset: string;
    liveFeed: string;
  };
  kpi: {
    sectionBadge: string;
    officialReleaseBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    isrCacheBadge: string;
    popTotal: {
      title: string;
      description: string;
      unit: string;
      trendText: string;
    };
    popGrow: {
      title: string;
      description: string;
      unit: string;
      trendText: string;
    };
    popDnst: {
      title: string;
      description: string;
      unit: string;
      trendText: string;
    };
    popUrb: {
      title: string;
      description: string;
      unit: string;
      trendText: string;
    };
  };
  centerpiece: {
    title: string;
    subtitle: string;
    engineBadge: string;
    viewGlobe: string;
    viewMap: string;
    tabPop: string;
    tabDnst: string;
    tabGrow: string;
    tabUrb: string;
    globeHintDrag: string;
    globeBadge3d: string;
    globeBadgeProjection: string;
    globeAutoSpin: string;
    globeSpinning: string;
    globeZoomIn: string;
    globeZoomOut: string;
    globeReset: string;
    focusUzbekistan: string;
    mapAuditCoverage: string;
    mapAuditZeroUnmatched: string;
    legendNoData: string;
  };
  countryPanel: {
    title: string;
    verifiedProfile: string;
    popLabel: string;
    dnstLabel: string;
    growLabel: string;
    urbLabel: string;
    benchmarkCta: string;
    sourceFooter: string;
    officialFeedFooter: string;
  };
  comparison: {
    badge: string;
    subBadge: string;
    title: string;
    subtitle: string;
    zeroFabricated: string;
    selectPrompt: string;
    searchPlaceholder: string;
    quickAddUzb: string;
    uzbAdded: string;
    selectedLabel: string;
    maxReached: string;
    leadNation: string;
    diffLead: string;
    cardsTitle: string;
    cardsSubtitle: string;
    metricPop: string;
    metricDnst: string;
    metricGrow: string;
    metricUrb: string;
  };
  historical: {
    badge: string;
    authenticatedBadge: string;
    title: string;
    subtitle: string;
    modeArea: string;
    modeLine: string;
    modeBar: string;
    scaleLinear: string;
    scaleLog: string;
    filterAll: string;
    filterModern: string;
    filterRecent: string;
    exportCsv: string;
    yearLabel: string;
    toggleVisibility: string;
  };
  regional: {
    badge: string;
    bokettoStyle: string;
    title: string;
    donutTitle: string;
    donutSubtitle: string;
    donutCenterTitle: string;
    barTitle: string;
    barSubtitle: string;
    barFootnote: string;
    shareLabel: string;
    regions: {
      EAS: string;
      SAS: string;
      SSF: string;
      ECS: string;
      MEA: string;
      LCN: string;
      NAC: string;
    };
  };
  leagueTable: {
    badge: string;
    sourceBadge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allRegions: string;
    exportCsv: string;
    colRank: string;
    colCountry: string;
    colIso: string;
    colRegion: string;
    colPop: string;
    colDnst: string;
    colGrow: string;
    colUrb: string;
    colVisual: string;
    featuredBadge: string;
    showingRows: string;
    noResults: string;
  };
  roadmap: {
    title: string;
    subtitle: string;
    completedBadge: string;
    stages: Array<{
      stage: number;
      title: string;
      description: string;
      deliverables: string[];
      status: "completed" | "current" | "upcoming";
    }>;
  };
  searchModal: {
    placeholder: string;
    sectionCountries: string;
    sectionIndicators: string;
    noResults: string;
    footerTip: string;
    footerDataset: string;
  };
  export: {
    buttonLabel: string;
    comparisonSummary: string;
    historicalSeries: string;
    mapDataset: string;
    downloadSuccess: string;
  };
}

export const dictionaries: Record<SupportedLocale, Translations> = {
  en: {
    common: {
      loading: "Loading demographic stream...",
      error: "Error loading demographic data",
      retry: "Retry Connection",
      na: "N/A",
      dataPending: "Data pending",
      officialFeed: "World Bank WDI • 100% Official Feed",
      verifiedSnapshot: "World Bank WDI (Official)",
      exportCsv: "Export CSV",
      search: "Search",
      close: "Close",
      featured: "Featured",
      all: "All",
      tip: "Tip: Press ⌘K anywhere to search",
      source: "Source",
      referenceYear: "Reference Year",
      zeroMockBadge: "Zero Mock Data",
      worldBankWdi: "World Bank WDI Metrics",
    },
    nav: {
      siteName: "WORLD POPULATION INTELLIGENCE",
      overview: "Global Dashboard",
      globeMap: "3D Globe & World Map",
      compare: "Country Comparison",
      historical: "Historical Trends",
      ranking: "Demographic Rankings",
      roadmap: "Platform Roadmap",
      globalOverview: "Global Overview",
      liveBadge: "World Bank Live",
      searchPlaceholder: "Search countries, ISO-3 codes, or indicators... (⌘K)",
    },
    hero: {
      suiteBadge: "Lepus Demographic Intelligence Suite",
      timeSeriesBadge: "World Bank Open Data • 1960–2024 Time Series",
      titleLine1: "GLOBAL DEMOGRAPHIC",
      titleLine2: "INTELLIGENCE PLATFORM",
      subtitle:
        "High-density demographic intelligence engine engineered for comparative demographic analysis, planetary population trajectories, and sovereign country benchmarking streamed directly from official World Bank Development Indicators.",
      ctaCompare: "Multi-Country Benchmark (2–5)",
      ctaGlobe: "Interactive 3D Globe",
      ctaRanking: "League Table",
    },
    telemetry: {
      dataFeed: "World Bank Open Data Platform",
      sourcePartner: "World Bank Open Data API",
      telemetryActive: "Live Telemetry Active",
      cachingProtocol: "Next.js 24h ISR Caching Protocol",
      officialRelease: "Official Statistical Release",
      lastSynchronized: "Last Synchronized",
      justNow: "Synchronized",
      verifiedDataset: "100% Certified Sovereign Indicators",
      liveFeed: "Live Stream Active",
    },
    kpi: {
      sectionBadge: "World Aggregate: WLD",
      officialReleaseBadge: "Official Statistical Release",
      sectionTitle: "Core Demographic Indicators",
      sectionSubtitle: "Live global headcounts and macro metrics streamed from the World Bank Open Data platform.",
      isrCacheBadge: "Next.js 24h ISR Cache",
      popTotal: {
        title: "Total World Population",
        description: "Total midyear count of all planetary inhabitants across 200+ sovereign nations and territories.",
        unit: "Inhabitants",
        trendText: "+0.96% YoY (2023→2024)",
      },
      popGrow: {
        title: "Annual Population Growth",
        description: "Exponential rate of planetary population growth calculated between consecutive official years.",
        unit: "Annual %",
        trendText: "-0.01% YoY Deceleration",
      },
      popDnst: {
        title: "Population Density",
        description: "Midyear population divided by total planetary land area excluding inland water bodies.",
        unit: "People / km²",
        trendText: "+0.57 / km² YoY (2023 Release)",
      },
      popUrb: {
        title: "Urban Population Share",
        description: "Percentage of total world population residing in designated urban agglomerations.",
        unit: "% of Total",
        trendText: "+0.25% YoY Urban Shift",
      },
    },
    centerpiece: {
      title: "Planetary Intelligence Centerpiece",
      subtitle:
        "Interactive 3D Earth Globe and Equal-Earth vector projections streaming authentic World Bank development indicators.",
      engineBadge: "Lepus 3D Engine",
      viewGlobe: "3D Globe",
      viewMap: "2D Map",
      tabPop: "Total Population",
      tabDnst: "Population Density",
      tabGrow: "Annual Growth Rate",
      tabUrb: "Urban Population Share",
      globeHintDrag: "Drag to rotate sphere in 3D",
      globeBadge3d: "Interactive 3D Earth Globe",
      globeBadgeProjection: "Orthographic Vector Projection",
      globeAutoSpin: "Auto-Spin",
      globeSpinning: "Spinning",
      globeZoomIn: "Zoom In",
      globeZoomOut: "Zoom Out",
      globeReset: "Reset Camera View",
      focusUzbekistan: "Focus Uzbekistan",
      mapAuditCoverage: "100% Geometry Coverage",
      mapAuditZeroUnmatched: "0 Unmatched",
      legendNoData: "No Data",
    },
    countryPanel: {
      title: "Verified Demographic Profile",
      verifiedProfile: "World Bank Authenticated",
      popLabel: "Total Population",
      dnstLabel: "Population Density",
      growLabel: "Annual Growth Rate",
      urbLabel: "Urban Population Share",
      benchmarkCta: "Benchmark in Comparison Engine",
      sourceFooter: "World Bank WDI",
      officialFeedFooter: "100% Official Feed",
    },
    comparison: {
      badge: "Stage 4: Multi-Country Comparison Engine",
      subBadge: "2 to 5 Countries • 1960–2024 Trends",
      title: "Cross-National Demographic Intelligence",
      subtitle:
        "Perform in-depth side-by-side demographic evaluation across multiple sovereign nations. Cross-compare population headcount, urban expansion, and growth trajectories powered by official World Bank time series.",
      zeroFabricated: "Zero Fabricated Data",
      selectPrompt: "Select benchmark countries (2–5)",
      searchPlaceholder: "Search country by name or ISO-3 code (e.g. Uzbekistan, USA, DEU)...",
      quickAddUzb: "Quick Add Uzbekistan",
      uzbAdded: "Uzbekistan Active",
      selectedLabel: "Selected Nations",
      maxReached: "Maximum 5 countries selected",
      leadNation: "Highest Lead",
      diffLead: "Difference from Lead",
      cardsTitle: "Cross-Country Indicator Evaluation",
      cardsSubtitle: "Side-by-side comparison across 4 core demographic indicators.",
      metricPop: "Population Headcount",
      metricDnst: "Density Index",
      metricGrow: "Annual Expansion Rate",
      metricUrb: "Urbanization Ratio",
    },
    historical: {
      badge: "Historical Series: 1960 – 2024",
      authenticatedBadge: "World Bank Authenticated",
      title: "Dynamic Demographic Trajectories & Curves",
      subtitle:
        "Multi-decade demographic shifts, urban expansion, and growth dynamics across selected sovereign nations.",
      modeArea: "Area Chart",
      modeLine: "Line Chart",
      modeBar: "Bar Chart",
      scaleLinear: "Linear Scale",
      scaleLog: "Logarithmic Scale",
      filterAll: "1960–2024 (Full Series)",
      filterModern: "1990–2024 (Modern Era)",
      filterRecent: "2000–2024 (21st Century)",
      exportCsv: "Export Series CSV",
      yearLabel: "Year",
      toggleVisibility: "Toggle visibility",
    },
    regional: {
      badge: "Visual Analytics",
      bokettoStyle: "Boketto Lepus Library Style",
      title: "Planetary Demographic Distribution & Rankings",
      donutTitle: "Planetary Population by Region",
      donutSubtitle: "Official World Bank 7-region aggregate classification totaling 8.14 Billion.",
      donutCenterTitle: "Global Population",
      barTitle: "Top Global Powers & Uzbekistan",
      barSubtitle: "Comparative headcount benchmarking top global sovereign nations against Uzbekistan.",
      barFootnote: "Uzbekistan: Ranked #43 globally (~36.36M in 2024)",
      shareLabel: "Share of Global Total",
      regions: {
        EAS: "East Asia & Pacific",
        SAS: "South Asia",
        SSF: "Sub-Saharan Africa",
        ECS: "Europe & Central Asia",
        MEA: "Middle East & North Africa",
        LCN: "Latin America & Caribbean",
        NAC: "North America",
      },
    },
    leagueTable: {
      badge: "Data Intelligence",
      sourceBadge: "World Bank WDI Metrics",
      title: "Global Demographic League Table",
      subtitle:
        "Multi-metric demographic rankings across global sovereign powers and regional benchmarks.",
      searchPlaceholder: "Search sovereign nation by name or ISO-3 code...",
      allRegions: "All Regions",
      exportCsv: "Export League Table (CSV)",
      colRank: "Rank",
      colCountry: "Country / Sovereign State",
      colIso: "ISO-3",
      colRegion: "Region",
      colPop: "Population (2024)",
      colDnst: "Density (/km²)",
      colGrow: "Growth Rate",
      colUrb: "Urban Share",
      colVisual: "Relative Share",
      featuredBadge: "Featured",
      showingRows: "Showing sovereign nations sorted by metric.",
      noResults: "No matching sovereign nations found.",
    },
    roadmap: {
      title: "Engineering Roadmap & Progression",
      subtitle: "Strict step-by-step implementation plan for WORLD POPULATION INTELLIGENCE",
      completedBadge: "Stages 1–5 Completed • Phase 10 Production Ready",
      stages: [
        {
          stage: 1,
          title: "Foundation & Architecture",
          description: "Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui and i18n structure setup.",
          deliverables: ["Project scaffold & clean structure", "Design system & UI tokens", "Zero-mock data compliance"],
          status: "completed",
        },
        {
          stage: 2,
          title: "World Bank API & Caching",
          description: "Integration with official World Bank Open Data endpoints with resilient ISR caching.",
          deliverables: ["World Bank TypeScript client", "4 core indicators & WLD aggregate", "24h Next.js ISR revalidation", "Null-value handling & 1960+ history"],
          status: "completed",
        },
        {
          stage: 3,
          title: "Interactive 3D Globe & Map",
          description: "Interactive 3D Earth Globe and TopoJSON 110m vector choropleth map.",
          deliverables: ["Vector choropleth map (177 geometries)", "Interactive 3D Earth Globe with auto-spin", "Country profile drill-down panel", "ISO-3 matching audit (100% coverage)"],
          status: "completed",
        },
        {
          stage: 4,
          title: "Comparison Engine & Trends",
          description: "Multi-country side-by-side comparison with Recharts dynamic historical curve rendering.",
          deliverables: [
            "Multi-country selector (2–5 nations)",
            "4 World Bank indicators side-by-side",
            "1960–2024 dynamic historical curves",
            "Recharts with tooltips, legend toggle & log scale",
          ],
          status: "completed",
        },
        {
          stage: 5,
          title: "CSV Export & Production Deploy",
          description: "Data export pipeline, Accessibility audit, and Vercel release readiness.",
          deliverables: [
            "UTF-8 BOM compliant CSV export engine",
            "Accessibility audit (WCAG 2.1 AA tokens)",
            "Dual-theme dark/light persistence",
            "Vercel production deploy readiness",
          ],
          status: "completed",
        },
      ],
    },
    searchModal: {
      placeholder: "Search countries, ISO-3 codes, or indicators... (e.g. Uzbekistan, USA, Density)",
      sectionCountries: "Sovereign Nations & Territories",
      sectionIndicators: "World Bank Core Indicators",
      noResults: "No matching results found.",
      footerTip: "Tip: Press ⌘K anywhere to search",
      footerDataset: "Official World Bank WDI Dataset",
    },
    export: {
      buttonLabel: "Export Data",
      comparisonSummary: "Export Comparison Summary (CSV)",
      historicalSeries: "Export Historical Time Series (CSV)",
      mapDataset: "Export Global Map Dataset (CSV)",
      downloadSuccess: "CSV dataset downloaded successfully.",
    },
  },

  uz: {
    common: {
      loading: "Demografik ma'lumotlar yuklanmoqda...",
      error: "Demografik ma'lumotlarni yuklashda xatolik yuz berdi",
      retry: "Qayta ulanish",
      na: "Mavjud emas",
      dataPending: "Ma'lumot kutilmoqda",
      officialFeed: "Jahon Banki WDI • 100% Rasmiy Ma'lumot",
      verifiedSnapshot: "Jahon Banki WDI (Rasmiy)",
      exportCsv: "CSV Eksport",
      search: "Qidirish",
      close: "Yopish",
      featured: "Tanlangan",
      all: "Barchasi",
      tip: "Maslahat: Istalgan joyda ⌘K tugmasini bosing",
      source: "Manba",
      referenceYear: "Hisobot yili",
      zeroMockBadge: "100% Rasmiy Ma'lumot",
      worldBankWdi: "Jahon Banki WDI Ko'rsatkichlari",
    },
    nav: {
      siteName: "WORLD POPULATION INTELLIGENCE",
      overview: "Global Boshqaruv Paneli",
      globeMap: "3D Globus va Dunyo Xaritasi",
      compare: "Davlatlarni Taqqoslash",
      historical: "Tarixiy Dinamika",
      ranking: "Demografik Reyting",
      roadmap: "Platforma Rejasi",
      globalOverview: "Global Umumiy Ko'rinish",
      liveBadge: "Jahon Banki Jonli",
      searchPlaceholder: "Davlatlar, ISO-3 kodlari yoki ko'rsatkichlarni qidiring... (⌘K)",
    },
    hero: {
      suiteBadge: "Lepus Demografik Tahlil Tizimi",
      timeSeriesBadge: "Jahon Banki Ochiq Ma'lumotlari • 1960–2024 Yillik Qatorlar",
      titleLine1: "GLOBAL DEMOGRAFIK",
      titleLine2: "TAHLIL PLATFORMASI",
      subtitle:
        "Mamlakatlar demografiyasini qiyosiy tahlil qilish, sayyora aholisi o'sish traektoriyasini kuzatish va suveren davlatlarni Jahon Banki Rivojlanish Ko'rsatkichlari asosida baholash uchun yaratilgan yuqori aniqlikdagi tahliliy platforma.",
      ctaCompare: "Mamlakatlarni Solishtirish (2–5)",
      ctaGlobe: "Interaktiv 3D Globus",
      ctaRanking: "Reyting Jadvali",
    },
    telemetry: {
      dataFeed: "Jahon Banki Ochiq Ma'lumotlar Platformasi",
      sourcePartner: "World Bank Open Data API",
      telemetryActive: "Jonli Telemetriya Faol",
      cachingProtocol: "Next.js 24 soatlik ISR Keshlash Protokoli",
      officialRelease: "Rasmiy Statistik Hisobot",
      lastSynchronized: "Oxirgi Yangilanish",
      justNow: "Yangilangan",
      verifiedDataset: "100% Tasdiqlangan Suveren Ko'rsatkichlar",
      liveFeed: "Jonli Oqim Faol",
    },
    kpi: {
      sectionBadge: "Dunyo Jamlanmasi: WLD",
      officialReleaseBadge: "Rasmiy Statistik Hisobot",
      sectionTitle: "Asosiy Demografik Ko'rsatkichlar",
      sectionSubtitle: "Jahon Banki ochiq ma'lumotlar platformasidan to'g'ridan-to'g'ri olingan global aholi soni va makro ko'rsatkichlar.",
      isrCacheBadge: "Next.js 24s ISR Kesh",
      popTotal: {
        title: "Dunyo Aholisining Umumiy Soni",
        description: "200 dan ortiq suveren davlat va hududlardagi jami sayyora aholisining rasmiy yillik soni.",
        unit: "Kishi",
        trendText: "+0.96% Yillik O'sish (2023→2024)",
      },
      popGrow: {
        title: "Aholining Yillik O'sish Sur'ati",
        description: "Ketma-ket kelgan rasmiy yillar orasidagi sayyora aholisining eksponentsial o'sish sur'ati.",
        unit: "Yillik %",
        trendText: "-0.01% Yillik Sekinlashuv",
      },
      popDnst: {
        title: "Aholi Zichligi",
        description: "Ichki suv havzalaridan tashqari yer maydonining har bir kvadrat kilometriga to'g'ri keladigan aholi soni.",
        unit: "Kishi / km²",
        trendText: "+0.57 / km² Yillik (2023 Rasmiy)",
      },
      popUrb: {
        title: "Shahar Aholisi Ulushi",
        description: "Rasmiy shahar aglomeratsiyalarida istiqomat qiluvchi aholining umumiy aholidagi ulushi.",
        unit: "% Jami Aholiga Nisbatan",
        trendText: "+0.25% Shaharlashuv Siljishi",
      },
    },
    centerpiece: {
      title: "Sayyora Tahliliy Markazi",
      subtitle:
        "Jahon Bankining haqiqiy rivojlanish ko'rsatkichlarini aks ettiruvchi interaktiv 3D Yer Globusi va 2D xarita proyeksiyalari.",
      engineBadge: "Lepus 3D Dvigateli",
      viewGlobe: "3D Globus",
      viewMap: "2D Xarita",
      tabPop: "Umumiy Aholi Soni",
      tabDnst: "Aholi Zichligi",
      tabGrow: "Yillik O'sish Sur'ati",
      tabUrb: "Shahar Aholisi Ulushi",
      globeHintDrag: "3D fazoda aylantirish uchun sichqoncha bilan torting",
      globeBadge3d: "Interaktiv 3D Yer Globusi",
      globeBadgeProjection: "Ortografik Vektor Proyeksiyasi",
      globeAutoSpin: "Avto-Aylanish",
      globeSpinning: "Aylanmoqda",
      globeZoomIn: "Yaqinlashtirish",
      globeZoomOut: "Uzoqlashtirish",
      globeReset: "Kamerani Tiklash",
      focusUzbekistan: "O'zbekistonga Qaratish",
      mapAuditCoverage: "100% Geometrik Qamrov",
      mapAuditZeroUnmatched: "0 Mos Kelmagan",
      legendNoData: "Ma'lumot yo'q",
    },
    countryPanel: {
      title: "Tasdiqlangan Demografik Profil",
      verifiedProfile: "Jahon Banki Tasdiqlagan",
      popLabel: "Umumiy Aholi Soni",
      dnstLabel: "Aholi Zichligi",
      growLabel: "Yillik O'sish Sur'ati",
      urbLabel: "Shahar Aholisi Ulushi",
      benchmarkCta: "Taqqoslash Tizimida Ko'rish",
      sourceFooter: "Jahon Banki WDI",
      officialFeedFooter: "100% Rasmiy Ma'lumot",
    },
    comparison: {
      badge: "4-Bosqich: Ko'p Davlatli Taqqoslash Tizimi",
      subBadge: "2 tadan 5 tagacha Davlat • 1960–2024 Dinamikasi",
      title: "Davlatlararo Demografik Tahlil",
      subtitle:
        "Bir nechta suveren davlatlar bo'yicha chuqur yonma-yon demografik baholashni amalga oshiring. Aholi soni, shahar o'sishi va dinamikani Jahon Banki qatorlari asosida qiyoslang.",
      zeroFabricated: "Soxta Ma'lumotsiz",
      selectPrompt: "Taqqoslash uchun davlatlarni tanlang (2–5)",
      searchPlaceholder: "Davlat nomi yoki ISO-3 kodi bo'yicha qidiring (masalan, Uzbekistan, USA, DEU)...",
      quickAddUzb: "O'zbekistonni Tez Qo'shish",
      uzbAdded: "O'zbekiston Tanlangan",
      selectedLabel: "Tanlangan Davlatlar",
      maxReached: "Maksimal 5 ta davlat tanlandi",
      leadNation: "Yetakchi Davlat",
      diffLead: "Yetakchidan Farqi",
      cardsTitle: "Ko'rsatkichlar Bo'yicha Qiyoslash",
      cardsSubtitle: "4 ta asosiy demografik ko'rsatkich bo'yicha yonma-yon tahlil.",
      metricPop: "Aholi Bosh Soni",
      metricDnst: "Zichlik Indeksi",
      metricGrow: "Yillik O'sish Ko'rsatkichi",
      metricUrb: "Shaharlashuv Nisbati",
    },
    historical: {
      badge: "Tarixiy Qator: 1960 – 2024",
      authenticatedBadge: "Jahon Banki Tasdiqlagan",
      title: "Dinamik Demografik Traektoriyalar va Chiziqlar",
      subtitle:
        "Tanlangan suveren davlatlar bo'yicha ko'p o'n yillik demografik siljishlar, shahar o'sishi va dinamikasi.",
      modeArea: "Soha Grafigi",
      modeLine: "Chiziqli Grafik",
      modeBar: "Ustunli Grafik",
      scaleLinear: "Chiziqli Masshtab",
      scaleLog: "Logarifmik Masshtab",
      filterAll: "1960–2024 (To'liq Qator)",
      filterModern: "1990–2024 (Zamonaviy Davr)",
      filterRecent: "2000–2024 (XXI Asr)",
      exportCsv: "Qatorni CSV Yuklash",
      yearLabel: "Yil",
      toggleVisibility: "Ko'rinishni o'zgartirish",
    },
    regional: {
      badge: "Vizual Analitika",
      bokettoStyle: "Boketto Lepus Standarti",
      title: "Sayyora Demografik Taqsimoti va Reytingi",
      donutTitle: "Mintaqalar Bo'yicha Sayyora Aholisi",
      donutSubtitle: "Jahon Bankining 7 ta rasmiy mintaqaviy tasnifi, jami 8.14 Milliard kishi.",
      donutCenterTitle: "Global Aholi",
      barTitle: "Yetakchi Global Kuchlar va O'zbekiston",
      barSubtitle: "Dunyoning eng yirik davlatlari va O'zbekiston aholisi sonini qiyosiy tahlil qilish.",
      barFootnote: "O'zbekiston: Jahon bo'yicha 43-o'rin (~36.36M kishi, 2024)",
      shareLabel: "Global Jamidagi Ulushi",
      regions: {
        EAS: "Sharqiy Osiyo va Tinch Okeani",
        SAS: "Janubiy Osiyo",
        SSF: "Saxaradan Janubiy Afrika",
        ECS: "Yevropa va Markaziy Osiyo",
        MEA: "Yaqin Sharq va Shimoliy Afrika",
        LCN: "Lotin Amerikasi va Karib",
        NAC: "Shimoliy Amerika",
      },
    },
    leagueTable: {
      badge: "Ma'lumotlar Tahlili",
      sourceBadge: "Jahon Banki WDI Ko'rsatkichlari",
      title: "Global Demografik Reyting Jadvali",
      subtitle:
        "Dunyo suveren davlatlari va mintaqaviy ko'rsatkichlar bo'yicha ko'p parametrli demografik reyting.",
      searchPlaceholder: "Davlat nomi yoki ISO-3 kodi bo'yicha qidiring...",
      allRegions: "Barcha Mintaqalar",
      exportCsv: "Reyting Jadvalini Yuklash (CSV)",
      colRank: "O'rin",
      colCountry: "Davlat / Suveren Hudud",
      colIso: "ISO-3",
      colRegion: "Mintaqa",
      colPop: "Aholi Soni (2024)",
      colDnst: "Zichlik (/km²)",
      colGrow: "O'sish Sur'ati",
      colUrb: "Shahar Ulushi",
      colVisual: "Nisbiy Ulush",
      featuredBadge: "Tanlangan",
      showingRows: "Ko'rsatkich bo'yicha saralangan suveren davlatlar ko'rsatilmoqda.",
      noResults: "Mos keluvchi suveren davlatlar topilmadi.",
    },
    roadmap: {
      title: "Muhandislik Yo'l Xaritasi va Rivojlanish",
      subtitle: "WORLD POPULATION INTELLIGENCE loyihasini bosqichma-bosqich amalga oshirish rejasi",
      completedBadge: "1–5 Bosqichlar Bajarildi • 10-Faza Ishlab Chiqarishga Tayyor",
      stages: [
        {
          stage: 1,
          title: "Arxitektura va Asosiy Poydevor",
          description: "Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui va i18n arxitekturasi o'rnatildi.",
          deliverables: ["Loyiha skeleti va toza tuzilma", "Dizayn tizimi va UI tokenlari", "Soxta ma'lumotsizlik talabi"],
          status: "completed",
        },
        {
          stage: 2,
          title: "Jahon Banki API va Keshlash",
          description: "Jahon Banki rasmiy Open Data manzillari bilan mustahkam ISR keshlash integratsiyasi.",
          deliverables: ["Jahon Banki TypeScript mijozi", "4 ta asosiy ko'rsatkich va WLD jamlanmasi", "24 soatlik Next.js ISR qayta tiklash", "Null qiymatlarni to'g'ri ishlash va 1960+ tarixi"],
          status: "completed",
        },
        {
          stage: 3,
          title: "Interaktiv 3D Globus va Xarita",
          description: "Interaktiv 3D Yer Globusi va TopoJSON 110m vektorli koroplet xaritasi.",
          deliverables: ["Vektorli koroplet xarita (177 geometriya)", "Avto-aylanuvchi 3D Yer Globusi", "Davlat profili tafsilotlari paneli", "ISO-3 kodlarini 100% moslashtirish auditi"],
          status: "completed",
        },
        {
          stage: 4,
          title: "Taqqoslash Dvigateli va Dinamika",
          description: "Recharts dinamik tarixiy egri chiziqlari bilan ko'p davlatli yonma-yon tahlil.",
          deliverables: [
            "Ko'p davlatli tanlovchi (2–5 davlat)",
            "4 ta Jahon Banki ko'rsatkichi yonma-yon",
            "1960–2024 dinamik tarixiy chiziqlari",
            "Tooltiplar, legend tugmasi va log masshtabli Recharts",
          ],
          status: "completed",
        },
        {
          stage: 5,
          title: "CSV Eksport va Ishlab Chiqarishga Chiqarish",
          description: "Ma'lumotlar eksporti, Qulaylik auditi va Vercel platformasiga tayyorgarlik.",
          deliverables: [
            "UTF-8 BOM standartidagi professional CSV eksport dvigateli",
            "Foydalanish qulayligi auditi (WCAG 2.1 AA tokenlari)",
            "Qorong'i/yorug' rejimni saqlash",
            "Vercel ishlab chiqarish platformasiga to'liq tayyorgarlik",
          ],
          status: "completed",
        },
      ],
    },
    searchModal: {
      placeholder: "Davlatlar, ISO-3 kodlari yoki ko'rsatkichlarni qidiring... (masalan, O'zbekiston, AQSh, Zichlik)",
      sectionCountries: "Suveren Davlatlar va Hududlar",
      sectionIndicators: "Jahon Banki Asosiy Ko'rsatkichlari",
      noResults: "Mos keluvchi natijalar topilmadi.",
      footerTip: "Maslahat: Istalgan joyda ⌘K tugmasini bosing",
      footerDataset: "Jahon Banki WDI Rasmiy Ma'lumotlar Bazasi",
    },
    export: {
      buttonLabel: "Ma'lumotlarni Yuklash",
      comparisonSummary: "Taqqoslash Hisobotini Yuklash (CSV)",
      historicalSeries: "Tarixiy Vaqt Qatorlarini Yuklash (CSV)",
      mapDataset: "Global Xarita Ma'lumotlarini Yuklash (CSV)",
      downloadSuccess: "CSV fayl muvaffaqiyatli yuklab olindi.",
    },
  },

  ru: {
    common: {
      loading: "Загрузка демографических данных...",
      error: "Ошибка загрузки демографических данных",
      retry: "Повторить соединение",
      na: "Н/Д",
      dataPending: "Данные ожидаются",
      officialFeed: "World Bank WDI • 100% Официальный поток",
      verifiedSnapshot: "World Bank WDI (Официальный)",
      exportCsv: "Экспорт в CSV",
      search: "Поиск",
      close: "Закрыть",
      featured: "Избранное",
      all: "Все",
      tip: "Подсказка: Нажмите ⌘K в любом месте для поиска",
      source: "Источник",
      referenceYear: "Отчетный год",
      zeroMockBadge: "100% Реальные Данные",
      worldBankWdi: "Показатели World Bank WDI",
    },
    nav: {
      siteName: "WORLD POPULATION INTELLIGENCE",
      overview: "Панель управления",
      globeMap: "3D Глобус и Карта мира",
      compare: "Сравнение стран",
      historical: "Исторические тренды",
      ranking: "Демографический рейтинг",
      roadmap: "План развития",
      globalOverview: "Глобальный обзор",
      liveBadge: "Всемирный банк Live",
      searchPlaceholder: "Поиск стран, кодов ISO-3 или показателей... (⌘K)",
    },
    hero: {
      suiteBadge: "Комплекс демографической аналитики Lepus",
      timeSeriesBadge: "Open Data Всемирного банка • Временные ряды 1960–2024",
      titleLine1: "ГЛОБАЛЬНАЯ ДЕМОГРАФИЧЕСКАЯ",
      titleLine2: "АНАЛИТИЧЕСКАЯ ПЛАТФОРМА",
      subtitle:
        "Высокоточная аналитическая платформа, разработанная для сравнительного демографического анализа, отслеживания планетарных траекторий численности населения и оценки суверенных государств на основе официальных показателей Всемирного банка.",
      ctaCompare: "Сравнение стран (2–5)",
      ctaGlobe: "Интерактивный 3D Глобус",
      ctaRanking: "Таблица рейтинга",
    },
    telemetry: {
      dataFeed: "Платформа открытых данных Всемирного банка",
      sourcePartner: "World Bank Open Data API",
      telemetryActive: "Телеметрия активна",
      cachingProtocol: "Протокол кэширования Next.js 24h ISR",
      officialRelease: "Официальный статистический релиз",
      lastSynchronized: "Последняя синхронизация",
      justNow: "Синхронизировано",
      verifiedDataset: "100% Сертифицированные показатели",
      liveFeed: "Прямой поток активен",
    },
    kpi: {
      sectionBadge: "Мировой итог: WLD",
      officialReleaseBadge: "Официальный статистический релиз",
      sectionTitle: "Ключевые демографические показатели",
      sectionSubtitle: "Актуальные данные о численности населения и макропоказателях из открытой базы Всемирного банка.",
      isrCacheBadge: "Кэш Next.js 24ч ISR",
      popTotal: {
        title: "Общая численность населения мира",
        description: "Общее число жителей планеты более чем в 200 суверенных государствах и территориях.",
        unit: "Человек",
        trendText: "+0.96% за год (2023→2024)",
      },
      popGrow: {
        title: "Годовой темп прироста населения",
        description: "Экспоненциальный темп прироста населения Земли между последовательными официальными годами.",
        unit: "% в год",
        trendText: "-0.01% за год (замедление)",
      },
      popDnst: {
        title: "Плотность населения",
        description: "Численность населения, деленная на общую площадь суши за исключением внутренних водоемов.",
        unit: "Чел. / км²",
        trendText: "+0.57 / км² за год (релиз 2023)",
      },
      popUrb: {
        title: "Доля городского населения",
        description: "Процент мирового населения, проживающего в официально признанных городских агломерациях.",
        unit: "% от общего числа",
        trendText: "+0.25% урбанизационный сдвиг",
      },
    },
    centerpiece: {
      title: "Центр глобального анализа",
      subtitle:
        "Интерактивный 3D Глобус Земли и картографические проекции Equal-Earth на базе официальных индикаторов Всемирного банка.",
      engineBadge: "3D Движок Lepus",
      viewGlobe: "3D Глобус",
      viewMap: "2D Карта",
      tabPop: "Общая численность",
      tabDnst: "Плотность населения",
      tabGrow: "Годовой темп роста",
      tabUrb: "Доля городского населения",
      globeHintDrag: "Потяните для вращения сферы в 3D",
      globeBadge3d: "Интерактивный 3D Глобус Земли",
      globeBadgeProjection: "Ортографическая векторная проекция",
      globeAutoSpin: "Авто-вращение",
      globeSpinning: "Вращается",
      globeZoomIn: "Приблизить",
      globeZoomOut: "Отдалить",
      globeReset: "Сбросить камеру",
      focusUzbekistan: "Фокус на Узбекистан",
      mapAuditCoverage: "100% Геометрический охват",
      mapAuditZeroUnmatched: "0 Несоответствий",
      legendNoData: "Нет данных",
    },
    countryPanel: {
      title: "Верифицированный профиль страны",
      verifiedProfile: "Подтверждено Всемирным банком",
      popLabel: "Численность населения",
      dnstLabel: "Плотность населения",
      growLabel: "Годовой темп прироста",
      urbLabel: "Доля городского населения",
      benchmarkCta: "Сравнить в модуле аналитики",
      sourceFooter: "World Bank WDI",
      officialFeedFooter: "100% Официальный поток",
    },
    comparison: {
      badge: "Этап 4: Модуль многостороннего сравнения",
      subBadge: "От 2 до 5 стран • Тренды 1960–2024",
      title: "Межгосударственный сравнительный анализ",
      subtitle:
        "Глубокий параллельный демографический анализ суверенных государств. Сравнивайте численность, плотность и динамику урбанизации на основе официальных временных рядов Всемирного банка.",
      zeroFabricated: "Без искусственных данных",
      selectPrompt: "Выберите страны для сравнения (2–5)",
      searchPlaceholder: "Поиск страны по названию или коду ISO-3 (например, Узбекистан, USA, DEU)...",
      quickAddUzb: "Быстро добавить Узбекистан",
      uzbAdded: "Узбекистан добавлен",
      selectedLabel: "Выбранные государства",
      maxReached: "Выбрано максимум 5 стран",
      leadNation: "Лидирующая страна",
      diffLead: "Отрыв от лидера",
      cardsTitle: "Сравнение ключевых индикаторов",
      cardsSubtitle: "Параллельный анализ по 4 основным демографическим метрикам.",
      metricPop: "Численность населения",
      metricDnst: "Индекс плотности",
      metricGrow: "Темп годового прироста",
      metricUrb: "Уровень урбанизации",
    },
    historical: {
      badge: "Исторические ряды: 1960 – 2024",
      authenticatedBadge: "Подтверждено Всемирным банком",
      title: "Динамические демографические траектории",
      subtitle:
        "Многолетние демографические сдвиги, урбанизация и динамика роста выбранных суверенных государств.",
      modeArea: "С областями",
      modeLine: "Линейный",
      modeBar: "Столбчатый",
      scaleLinear: "Линейная шкала",
      scaleLog: "Логарифмическая шкала",
      filterAll: "1960–2024 (Полный ряд)",
      filterModern: "1990–2024 (Новейшее время)",
      filterRecent: "2000–2024 (XXI Век)",
      exportCsv: "Экспорт ряда в CSV",
      yearLabel: "Год",
      toggleVisibility: "Переключить отображение",
    },
    regional: {
      badge: "Визуальная аналитика",
      bokettoStyle: "Стандарт Boketto Lepus",
      title: "Планетарное демографическое распределение",
      donutTitle: "Население Земли по регионам",
      donutSubtitle: "Официальная 7-региональная классификация Всемирного банка (всего 8.14 млрд человек).",
      donutCenterTitle: "Население Земли",
      barTitle: "Мировые державы и Узбекистан",
      barSubtitle: "Сравнительный бенчмаркинг численности населения ведущих мировых держав и Узбекистана.",
      barFootnote: "Узбекистан: 43-е место в мире (~36.36 млн чел. в 2024 г.)",
      shareLabel: "Доля от мирового итога",
      regions: {
        EAS: "Восточная Азия и Тихий океан",
        SAS: "Южная Азия",
        SSF: "Африка к югу от Сахары",
        ECS: "Европа и Центральная Азия",
        MEA: "Ближний Восток и Северная Африка",
        LCN: "Латинская Америка и Карибы",
        NAC: "Северная Америка",
      },
    },
    leagueTable: {
      badge: "Интеллектуальный анализ",
      sourceBadge: "Метрики World Bank WDI",
      title: "Глобальная лига демографического рейтинга",
      subtitle:
        "Многопараметрический демографический рейтинг суверенных государств и региональных бенчмарков.",
      searchPlaceholder: "Поиск суверенного государства по названию или коду ISO-3...",
      allRegions: "Все регионы",
      exportCsv: "Экспорт таблицы рейтинга (CSV)",
      colRank: "Место",
      colCountry: "Государство / Территория",
      colIso: "ISO-3",
      colRegion: "Регион",
      colPop: "Население (2024)",
      colDnst: "Плотность (/км²)",
      colGrow: "Темп прироста",
      colUrb: "Доля городов",
      colVisual: "Относительная доля",
      featuredBadge: "В фокусе",
      showingRows: "Показаны суверенные государства, отсортированные по метрике.",
      noResults: "Совпадающих суверенных государств не найдено.",
    },
    roadmap: {
      title: "Инженерная дорожная карта и прогресс",
      subtitle: "Пошаговый план реализации проекта WORLD POPULATION INTELLIGENCE",
      completedBadge: "Этапы 1–5 Завершены • Фаза 10 Готова к выпуску",
      stages: [
        {
          stage: 1,
          title: "Архитектура и фундамент",
          description: "Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui и настройка структуры i18n.",
          deliverables: ["Каркас проекта и чистая структура", "Система дизайна и UI-токены", "Требование нулевых фиктивных данных"],
          status: "completed",
        },
        {
          stage: 2,
          title: "World Bank API и кэширование",
          description: "Интеграция с официальными эндпоинтами Open Data Всемирного банка с надежным ISR кэшем.",
          deliverables: ["TypeScript-клиент Всемирного банка", "4 ключевых индикатора и агрегат WLD", "24-часовая ревалидация Next.js ISR", "Корректная обработка null-значений и история 1960+"],
          status: "completed",
        },
        {
          stage: 3,
          title: "Интерактивный 3D Глобус и Карта",
          description: "Интерактивный 3D Глобус Земли и векторная фоновая картограмма TopoJSON 110m.",
          deliverables: ["Векторная карта-хороплет (177 геометрий)", "Интерактивный 3D Глобус с авто-вращением", "Панель детализации профиля страны", "Аудит соответствия кодов ISO-3 (100% охват)"],
          status: "completed",
        },
        {
          stage: 4,
          title: "Модуль сравнения и динамика",
          description: "Параллельное сравнение стран с динамическими историческими кривыми Recharts.",
          deliverables: [
            "Селектор стран (2–5 государств)",
            "4 индикатора Всемирного банка бок о бок",
            "Динамические исторические ряды 1960–2024 гг.",
            "Recharts с подсказками, переключением легенды и лог-шкалой",
          ],
          status: "completed",
        },
        {
          stage: 5,
          title: "Экспорт в CSV и подготовка к релизу",
          description: "Конвейер экспорта данных, аудит доступности и готовность к развертыванию на Vercel.",
          deliverables: [
            "Движок экспорта в CSV с поддержкой UTF-8 BOM",
            "Аудит доступности (токены WCAG 2.1 AA)",
            "Сохранение темной и светлой темы",
            "Готовность к промышленному релизу на Vercel",
          ],
          status: "completed",
        },
      ],
    },
    searchModal: {
      placeholder: "Поиск стран, кодов ISO-3 или показателей... (например, Узбекистан, США, Плотность)",
      sectionCountries: "Суверенные государства и территории",
      sectionIndicators: "Основные показатели Всемирного банка",
      noResults: "Результатов не найдено.",
      footerTip: "Подсказка: Нажмите ⌘K в любом месте для поиска",
      footerDataset: "Официальная база данных World Bank WDI",
    },
    export: {
      buttonLabel: "Экспорт данных",
      comparisonSummary: "Экспорт сводки сравнения (CSV)",
      historicalSeries: "Экспорт исторических рядов (CSV)",
      mapDataset: "Экспорт данных карты (CSV)",
      downloadSuccess: "Файл CSV успешно сформирован и скачан.",
    },
  },
};

export const defaultLocale: SupportedLocale = "en";

export function getDictionary(locale: SupportedLocale = defaultLocale): Translations {
  return dictionaries[locale] || dictionaries.en;
}
