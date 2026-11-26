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
    siteSub: string;
    overview: string;
    globeMap: string;
    compare: string;
    historical: string;
    regional: string;
    ranking: string;
    roadmap: string;
    globalOverview: string;
    liveBadge: string;
    searchPlaceholder: string;
    mobileGlobe: string;
    mobileCompare: string;
    mobileRegions: string;
    mobileTable: string;
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
    zoomLevel: string;
    searchCountryPlaceholder: string;
    scrollZoomOn: string;
    scrollZoomOff: string;
    clickToInspect: string;
    scalePop: string;
    scaleDnst: string;
    scaleGrow: string;
    scaleUrb: string;
    loadingMap: string;
    loadingMapSub: string;
    syncTerritories: string;
    regionJumpLabel: string;
  };
  countryPanel: {
    title: string;
    verifiedProfile: string;
    popLabel: string;
    dnstLabel: string;
    growLabel: string;
    urbLabel: string;
    benchmarkCta: string;
    addedToCompare: string;
    sourceFooter: string;
    officialFeedFooter: string;
    mobileTitle: string;
    openFullPanel: string;
    selectHint: string;
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
    declineBadge: string;
    presetCentralAsia: string;
    presetGlobal: string;
    presetEurope: string;
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
    subtitle: string;
    donutTitle: string;
    donutSubtitle: string;
    donutCenterTitle: string;
    barTitle: string;
    barSubtitle: string;
    barFootnote: string;
    shareLabel: string;
    headcountLabel: string;
    popLabel: string;
    uzbSpotlightTitle: string;
    uzbSpotlightSub: string;
    focusRegionMap: string;
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
    inspectOnGlobe: string;
  };
  methodology: {
    badge: string;
    title: string;
    body: string;
    euNotice: string;
    wcagBadge: string;
    privacyBadge: string;
    sourceBadge: string;
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
  uz: {
    common: {
      loading: "Demografik ma’lumotlar yuklanmoqda...",
      error: "Ma’lumotlarni yuklashda xatolik yuz berdi",
      retry: "Qayta urinish",
      na: "Ma’lumot yo‘q",
      dataPending: "Kutilmoqda",
      officialFeed: "Jahon banki (WDI) rasmiy ma’lumotlari",
      verifiedSnapshot: "Jahon banki rasmiy bazasi",
      exportCsv: "CSV yuklash",
      search: "Qidirish",
      close: "Yopish",
      featured: "O‘zbekiston",
      all: "Barchasi",
      tip: "Qidirish uchun ⌘K tugmasini bosing",
      source: "Manba",
      referenceYear: "Hisobot yili",
      zeroMockBadge: "Rasmiy WDI manbasi",
      worldBankWdi: "Jahon banki (WDI)",
    },
    nav: {
      siteName: "Jahon Aholisi",
      siteSub: "Demografik tahlil portali",
      overview: "Umumiy ko‘rinish",
      globeMap: "3D Globus va xarita",
      compare: "Davlatlarni taqqoslash",
      historical: "Tarixiy dinamika",
      regional: "Mintaqaviy tahlil",
      ranking: "Batafsil jadval",
      roadmap: "Metodologiya",
      globalOverview: "Global tahlil",
      liveBadge: "Jahon banki ulangan",
      searchPlaceholder: "Davlat nomi yoki ISO-3 kodini qidiring (O‘zbekiston, DEU)...",
      mobileGlobe: "Globus",
      mobileCompare: "Taqqoslash",
      mobileRegions: "Mintaqalar",
      mobileTable: "Jadval",
    },
    hero: {
      suiteBadge: "Jahon banki ochiq ma’lumotlari",
      timeSeriesBadge: "1960–2024 yillik statistika",
      titleLine1: "Jahon aholisi va",
      titleLine2: "demografik tahlil",
      subtitle:
        "200 dan ortiq davlatning aholi soni, zichligi, yillik o‘sishi va shaharlashuv ko‘rsatkichlarini aylanuvchi 3D globusda yaqinlashtirib kuzating, solishtiring va rasmiy tarixiy dinamikani tahlil qiling.",
      ctaCompare: "Davlatlarni taqqoslash",
      ctaGlobe: "3D Globusda ko‘rish",
      ctaRanking: "Batafsil jadval",
    },
    telemetry: {
      dataFeed: "Ma’lumot manbasi",
      sourcePartner: "The World Bank Open Data",
      telemetryActive: "Rasmiy ma’lumotlar faol",
      cachingProtocol: "Kunlik yangilanish (24 soat)",
      officialRelease: "Rasmiy statistik nashr",
      lastSynchronized: "Yangilangan sana",
      justNow: "Bugun yangilangan",
      verifiedDataset: "Jahon banki rivojlanish ko‘rsatkichlari (WDI)",
      liveFeed: "Ulanish holati",
    },
    kpi: {
      sectionBadge: "Dunyo ko‘rsatkichlari",
      officialReleaseBadge: "WLD jamlanmasi",
      sectionTitle: "Asosiy demografik ko‘rsatkichlar",
      sectionSubtitle:
        "Jahon bankining rasmiy ochiq ma’lumotlar bazasidan olingan umumjahon ko‘rsatkichlari.",
      isrCacheBadge: "Yangilanish: 24 soat",
      popTotal: {
        title: "Dunyo aholisi",
        description: "Yer yuzidagi barcha suveren davlat va hududlardagi jami aholi soni.",
        unit: "kishi",
        trendText: "+0.96% yillik o‘sish",
      },
      popGrow: {
        title: "Yillik o‘sish sur’ati",
        description: "Ketma-ket yillar orasidagi aholi sonining o‘rtacha yillik o‘zgarish sur’ati.",
        unit: "% yillik",
        trendText: "O‘rtacha global sur’at",
      },
      popDnst: {
        title: "Aholi zichligi",
        description: "Quruqlik maydonining har bir kvadrat kilometriga to‘g‘ri keladigan o‘rtacha aholi soni.",
        unit: "kishi / km²",
        trendText: "Har 1 km² maydonga",
      },
      popUrb: {
        title: "Shahar aholisi ulushi",
        description: "Shahar va shaharchalarda istiqomat qiluvchi aholining umumiy aholidagi ulushi.",
        unit: "% ulush",
        trendText: "+0.25% shaharlashuv",
      },
    },
    centerpiece: {
      title: "Interaktiv 3D Globus va Jahon Xaritasi",
      subtitle:
        "Globusni aylantiring, yaqinlashtiring va istalgan davlat ustiga bosib uning rasmiy demografik ko‘rsatkichlarini oching.",
      engineBadge: "3D Ortografik ko‘rinish",
      viewGlobe: "3D Globus",
      viewMap: "2D Xarita",
      tabPop: "Aholi soni",
      tabDnst: "Zichlik",
      tabGrow: "O‘sish sur’ati",
      tabUrb: "Shaharlashuv",
      globeHintDrag: "Aylantirish uchun torting • Yaqinlashtirish uchun g‘ildirak yoki +/− dan foydalaning",
      globeBadge3d: "Jonli 3D Globus",
      globeBadgeProjection: "Yaqinlashtirish: 1× – 8×",
      globeAutoSpin: "Aylantirish",
      globeSpinning: "To‘xtatish",
      globeZoomIn: "Yaqinlashtirish",
      globeZoomOut: "Uzoqlashtirish",
      globeReset: "Dastlabki holat",
      focusUzbekistan: "O‘zbekiston",
      mapAuditCoverage: "177 hudud xaritada",
      mapAuditZeroUnmatched: "Hududlar qamrovi",
      legendNoData: "Ma’lumot yo‘q",
      zoomLevel: "Yaqinlashtirish",
      searchCountryPlaceholder: "Globusda davlatga o‘tish (masalan, Fransiya, O‘zbekiston)...",
      scrollZoomOn: "Sichqoncha g‘ildiragi: Yoqilgan",
      scrollZoomOff: "Sichqoncha g‘ildiragi: O‘chirilgan",
      clickToInspect: "Tafsilotlarni ko‘rish uchun bosing",
      scalePop: "Aholi soni shkalasi:",
      scaleDnst: "Zichlik (kishi/km²):",
      scaleGrow: "Yillik o‘sish (%):",
      scaleUrb: "Shahar aholisi (%):",
      loadingMap: "Jahon globusi yuklanmoqda...",
      loadingMapSub: "Xarita konturlari va Jahon banki ko‘rsatkichlari tayyorlanmoqda.",
      syncTerritories: "200+ hudud ma’lumotlari yuklanmoqda",
      regionJumpLabel: "Tezkor hudud:",
    },
    countryPanel: {
      title: "Davlat demografik profili",
      verifiedProfile: "Jahon banki rasmiy ko‘rsatkichlari",
      popLabel: "Aholi soni",
      dnstLabel: "Aholi zichligi",
      growLabel: "Yillik o‘sish",
      urbLabel: "Shahar aholisi",
      benchmarkCta: "Taqqoslashga qo‘shish",
      addedToCompare: "Taqqoslashda mavjud",
      sourceFooter: "Jahon banki WDI",
      officialFeedFooter: "Rasmiy hisobot",
      mobileTitle: "Tanlangan davlat tahlili",
      openFullPanel: "Batafsil profil",
      selectHint: "Globusdagi istalgan davlatni bosing",
    },
    comparison: {
      badge: "Ko‘p davlatli taqqoslash",
      subBadge: "2 dan 5 tagacha davlat",
      title: "Davlatlararo ko‘rsatkichlar va tarixiy grafik",
      subtitle:
        "Tanlangan davlatlarning aholi soni, zichligi, o‘sish sur’ati va 1960–2024 yillar oralig‘idagi o‘zgarish egri chiziqlarini solishtiring.",
      zeroFabricated: "Faqat rasmiy statistika",
      selectPrompt: "Taqqoslash uchun davlat tanlang (2–5)",
      searchPlaceholder: "Davlat nomi yoki ISO-3 kodi bo‘yicha qidiring...",
      quickAddUzb: "O‘zbekistonni qo‘shish",
      uzbAdded: "O‘zbekiston tanlangan",
      selectedLabel: "Tanlangan davlatlar",
      maxReached: "Eng ko‘pi bilan 5 ta davlat tanlanadi",
      leadNation: "Eng yuqori ko‘rsatkich",
      diffLead: "Farq",
      cardsTitle: "Ko‘rsatkichlar kesimidagi taqqoslash",
      cardsSubtitle: "To‘rtta asosiy mezon bo‘yicha yonma-yon tahlil.",
      metricPop: "Aholi soni",
      metricDnst: "Zichlik",
      metricGrow: "Yillik o‘sish",
      metricUrb: "Shaharlashuv",
      declineBadge: "kamayish",
      presetCentralAsia: "Markaziy Osiyo",
      presetGlobal: "Yirik davlatlar",
      presetEurope: "Yevropa",
    },
    historical: {
      badge: "Tarixiy qatorlar: 1960 – 2024",
      authenticatedBadge: "Rasmiy WDI ma’lumotlari",
      title: "Tarixiy o‘zgarishlar grafigi (1960–2024)",
      subtitle:
        "65 yillik demografik o‘sish, shaharlashuv va zichlik dinamikasini chiziqli yoki logarifmik masshtabda ko‘ring.",
      modeArea: "Maydonli grafik",
      modeLine: "Chiziqli grafik",
      modeBar: "Ustunli grafik",
      scaleLinear: "Chiziqli",
      scaleLog: "Logarifmik",
      filterAll: "1960–2024",
      filterModern: "1990–2024",
      filterRecent: "2010–2024",
      exportCsv: "Grafik CSV",
      yearLabel: "Yil",
      toggleVisibility: "Davlat chizig‘ini yoqish/o‘chirish:",
    },
    regional: {
      badge: "Mintaqaviy tahlil",
      bokettoStyle: "Jahon banki mintaqalari",
      title: "Mintaqaviy xarita va demografik taqsimot",
      subtitle:
        "Yetti yirik jahon mintaqasining aholi ulushi hamda O‘zbekistonning Markaziy Osiyo va global reytingdagi o‘rni.",
      donutTitle: "Mintaqalar bo‘yicha aholi ulushi",
      donutSubtitle: "Jahon bankining 7 ta rasmiy mintaqaviy tasnifi bo‘yicha taqsimot.",
      donutCenterTitle: "Jami aholi",
      barTitle: "Eng yirik davlatlar va O‘zbekiston",
      barSubtitle: "Aholi soni bo‘yicha yetakchi davlatlar bilan qiyosiy ko‘rinish.",
      barFootnote: "O‘zbekiston • Markaziy Osiyodagi eng yirik davlat",
      shareLabel: "Global ulush",
      headcountLabel: "Aholi soni",
      popLabel: "Aholi soni",
      uzbSpotlightTitle: "O‘zbekiston va Markaziy Osiyo",
      uzbSpotlightSub: "Mintaqadagi eng tez o‘sayotgan demografik markaz ko‘rsatkichlari.",
      focusRegionMap: "Globusda mintaqani ko‘rish",
      regions: {
        EAS: "Sharqiy Osiyo va Tinch okeani",
        SAS: "Janubiy Osiyo",
        SSF: "Sahroi Kabirdan janubiy Afrika",
        ECS: "Yevropa va Markaziy Osiyo",
        MEA: "Yaqin Sharq va Shimoliy Afrika",
        LCN: "Lotin Amerikasi va Karib",
        NAC: "Shimoliy Amerika",
      },
    },
    leagueTable: {
      badge: "Batafsil jadval",
      sourceBadge: "Jahon banki WDI",
      title: "Davlatlar bo‘yicha batafsil demografik jadval",
      subtitle:
        "Aholi soni, zichlik, yillik o‘sish va shaharlashuv bo‘yicha saralash hamda globusda tezkor ko‘rish.",
      searchPlaceholder: "Davlat nomi yoki ISO-3 kodi bo‘yicha qidirish...",
      allRegions: "Barcha mintaqalar",
      exportCsv: "Jadvalni yuklash (CSV)",
      colRank: "№",
      colCountry: "Davlat",
      colIso: "Kod",
      colRegion: "Mintaqa",
      colPop: "Aholi (2024)",
      colDnst: "Zichlik (/km²)",
      colGrow: "Yillik o‘sish",
      colUrb: "Shahar (%)",
      colVisual: "Ulush",
      featuredBadge: "O‘zbekiston",
      showingRows: "Ko‘rsatilayotgan davlatlar soni",
      noResults: "So‘rovga mos davlat topilmadi.",
      inspectOnGlobe: "Globusda ko‘rish",
    },
    methodology: {
      badge: "Ma’lumot aniqligi va maxfiylik",
      title: "Metodologiya va Yevropa qulaylik standartlari",
      body:
        "Barcha ko‘rsatkichlar Jahon bankining (World Development Indicators: SP.POP.TOTL, EN.POP.DNST, SP.POP.GROW, SP.URB.TOTL.IN.ZS) ochiq ma’lumotlaridan olinadi. Platforma kuzatuv cookie-fayllarisiz ishlaydi va klaviatura hamda ekran o‘quvchilar uchun yuqori kontrastli (WCAG 2.1 AA) qulaylik tamoyillariga moslashtirilgan.",
      euNotice:
        "Eslatma: Yevropa Ittifoqi talablariga rasmiy huquqiy muvofiqlik alohida mustaqil audit va baholashni talab qiladi.",
      wcagBadge: "WCAG 2.1 AA Kontrast",
      privacyBadge: "Cookie-siz tizim",
      sourceBadge: "World Bank Open Data",
    },
    roadmap: {
      title: "Metodologiya",
      subtitle: "",
      completedBadge: "",
      stages: [],
    },
    searchModal: {
      placeholder: "Davlat nomi, ISO-3 kodi yoki ko‘rsatkichni kiriting...",
      sectionCountries: "Davlatlar (globusda ochish)",
      sectionIndicators: "Asosiy ko‘rsatkichlar",
      noResults: "Natija topilmadi.",
      footerTip: "Tezkor qidiruv: ⌘K",
      footerDataset: "Jahon banki rasmiy WDI bazasi",
    },
    export: {
      buttonLabel: "Ma’lumotni yuklash",
      comparisonSummary: "Taqqoslash jadvali (CSV)",
      historicalSeries: "Tarixiy dinamika 1960–2024 (CSV)",
      mapDataset: "Xarita ma’lumotlari (CSV)",
      downloadSuccess: "CSV fayl yuklab olindi.",
    },
  },

  en: {
    common: {
      loading: "Loading demographic data...",
      error: "Error loading demographic data",
      retry: "Retry",
      na: "N/A",
      dataPending: "Data pending",
      officialFeed: "World Bank WDI • Official Dataset",
      verifiedSnapshot: "World Bank WDI (Official)",
      exportCsv: "Export CSV",
      search: "Search",
      close: "Close",
      featured: "Featured",
      all: "All",
      tip: "Tip: Press ⌘K anywhere to search",
      source: "Source",
      referenceYear: "Reference Year",
      zeroMockBadge: "Official WDI Source",
      worldBankWdi: "World Bank WDI",
    },
    nav: {
      siteName: "World Population",
      siteSub: "Demographic Analytics",
      overview: "Overview & Globe",
      globeMap: "3D Globe & Map",
      compare: "Country Comparison",
      historical: "Historical Curves",
      regional: "Regional Analysis",
      ranking: "Detailed Table",
      roadmap: "Methodology",
      globalOverview: "Global Overview",
      liveBadge: "World Bank Connected",
      searchPlaceholder: "Search countries or ISO-3 codes (Uzbekistan, DEU)...",
      mobileGlobe: "Globe",
      mobileCompare: "Compare",
      mobileRegions: "Regions",
      mobileTable: "Table",
    },
    hero: {
      suiteBadge: "World Bank Open Data",
      timeSeriesBadge: "1960–2024 Annual Series",
      titleLine1: "World Population &",
      titleLine2: "Demographic Analytics",
      subtitle:
        "Spin and zoom the 3D globe to inspect any sovereign nation, compare demographic indicators side by side, and explore 65-year World Bank time series.",
      ctaCompare: "Compare Countries",
      ctaGlobe: "Explore 3D Globe",
      ctaRanking: "Detailed Table",
    },
    telemetry: {
      dataFeed: "Data Provider",
      sourcePartner: "The World Bank Open Data",
      telemetryActive: "Official Feed Active",
      cachingProtocol: "Daily Revalidation (24h)",
      officialRelease: "Official Statistical Release",
      lastSynchronized: "Last Updated",
      justNow: "Updated today",
      verifiedDataset: "World Bank Development Indicators (WDI)",
      liveFeed: "Connection",
    },
    kpi: {
      sectionBadge: "Global Totals",
      officialReleaseBadge: "World Aggregate (WLD)",
      sectionTitle: "Core Demographic Indicators",
      sectionSubtitle:
        "Official global headcounts and macro demographic indicators from World Bank Open Data.",
      isrCacheBadge: "Updated every 24h",
      popTotal: {
        title: "World Population",
        description: "Total midyear count of inhabitants across 200+ countries and territories.",
        unit: "Inhabitants",
        trendText: "+0.96% YoY growth",
      },
      popGrow: {
        title: "Annual Growth Rate",
        description: "Exponential annual population growth rate between consecutive reporting years.",
        unit: "Annual %",
        trendText: "Global annual rate",
      },
      popDnst: {
        title: "Population Density",
        description: "Midyear population per square kilometer of total land area.",
        unit: "People / km²",
        trendText: "Per 1 km² land area",
      },
      popUrb: {
        title: "Urban Population Share",
        description: "Share of total population residing in designated urban areas.",
        unit: "% of Total",
        trendText: "+0.25% urban shift",
      },
    },
    centerpiece: {
      title: "Interactive 3D Globe & World Map",
      subtitle:
        "Rotate and zoom the globe up to 8× to click any country and inspect its official World Bank profile.",
      engineBadge: "3D Orthographic View",
      viewGlobe: "3D Globe",
      viewMap: "2D Map",
      tabPop: "Population",
      tabDnst: "Density",
      tabGrow: "Growth Rate",
      tabUrb: "Urban Share",
      globeHintDrag: "Drag to rotate • Scroll or use +/− to zoom in and pick any country",
      globeBadge3d: "Interactive 3D Globe",
      globeBadgeProjection: "Zoom: 1× – 8×",
      globeAutoSpin: "Auto-spin",
      globeSpinning: "Pause",
      globeZoomIn: "Zoom In",
      globeZoomOut: "Zoom Out",
      globeReset: "Reset View",
      focusUzbekistan: "Uzbekistan",
      mapAuditCoverage: "177 geometries mapped",
      mapAuditZeroUnmatched: "Geographic Coverage",
      legendNoData: "No Data",
      zoomLevel: "Zoom",
      searchCountryPlaceholder: "Jump to country on globe (e.g. France, Uzbekistan)...",
      scrollZoomOn: "Scroll Zoom: On",
      scrollZoomOff: "Scroll Zoom: Off",
      clickToInspect: "Click to inspect profile",
      scalePop: "Population Scale:",
      scaleDnst: "Density (/ km²):",
      scaleGrow: "Growth Rate (%):",
      scaleUrb: "Urban Share (%):",
      loadingMap: "Loading interactive world globe...",
      loadingMapSub: "Preparing vector contours and World Bank demographic data.",
      syncTerritories: "Loading 200+ territories",
      regionJumpLabel: "Quick region:",
    },
    countryPanel: {
      title: "Country Demographic Profile",
      verifiedProfile: "World Bank Official Indicators",
      popLabel: "Total Population",
      dnstLabel: "Population Density",
      growLabel: "Annual Growth Rate",
      urbLabel: "Urban Population Share",
      benchmarkCta: "Add to Comparison",
      addedToCompare: "In Comparison",
      sourceFooter: "World Bank WDI",
      officialFeedFooter: "Official Feed",
      mobileTitle: "Selected Country Analytics",
      openFullPanel: "Full Profile",
      selectHint: "Tap any country on the globe",
    },
    comparison: {
      badge: "Multi-Country Comparison",
      subBadge: "2 to 5 Countries",
      title: "Cross-National Indicators & Historical Curve",
      subtitle:
        "Compare population size, density, growth rate, and 1960–2024 historical trajectories across selected nations.",
      zeroFabricated: "Official Data Only",
      selectPrompt: "Select countries to compare (2–5)",
      searchPlaceholder: "Search by country name or ISO-3 code...",
      quickAddUzb: "Add Uzbekistan",
      uzbAdded: "Uzbekistan Active",
      selectedLabel: "Selected Countries",
      maxReached: "Maximum 5 countries selected",
      leadNation: "Highest Lead",
      diffLead: "Difference",
      cardsTitle: "Indicator Comparison",
      cardsSubtitle: "Side-by-side breakdown across 4 core metrics.",
      metricPop: "Population",
      metricDnst: "Density",
      metricGrow: "Growth Rate",
      metricUrb: "Urban Share",
      declineBadge: "decline",
      presetCentralAsia: "Central Asia",
      presetGlobal: "Global Leaders",
      presetEurope: "Europe",
    },
    historical: {
      badge: "Historical Series: 1960 – 2024",
      authenticatedBadge: "World Bank WDI",
      title: "Historical Demographic Trajectories (1960–2024)",
      subtitle:
        "Explore 65 years of population change, urbanization, and density on linear or logarithmic scales.",
      modeArea: "Area Chart",
      modeLine: "Line Chart",
      modeBar: "Bar Chart",
      scaleLinear: "Linear",
      scaleLog: "Logarithmic",
      filterAll: "1960–2024",
      filterModern: "1990–2024",
      filterRecent: "2010–2024",
      exportCsv: "Export CSV",
      yearLabel: "Year",
      toggleVisibility: "Toggle country lines:",
    },
    regional: {
      badge: "Regional Analysis",
      bokettoStyle: "World Bank Regions",
      title: "Regional Map & Demographic Distribution",
      subtitle:
        "Population shares across 7 World Bank regions alongside Uzbekistan's Central Asian and global position.",
      donutTitle: "Population Share by Region",
      donutSubtitle: "Distribution across 7 official World Bank geographic aggregates.",
      donutCenterTitle: "World Total",
      barTitle: "Top Nations & Uzbekistan",
      barSubtitle: "Comparative population scale across leading global nations and Uzbekistan.",
      barFootnote: "Uzbekistan • Central Asia's most populous nation",
      shareLabel: "Global Share",
      headcountLabel: "Population",
      popLabel: "Population",
      uzbSpotlightTitle: "Uzbekistan & Central Asia",
      uzbSpotlightSub: "Demographic indicators for Central Asia's largest population center.",
      focusRegionMap: "Focus Region on Globe",
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
      badge: "Detailed Table",
      sourceBadge: "World Bank WDI",
      title: "Detailed Demographic Ranking Table",
      subtitle:
        "Sort and filter countries by population, density, annual growth, and urbanization, or jump directly to any row on the globe.",
      searchPlaceholder: "Search country or ISO-3 code...",
      allRegions: "All Regions",
      exportCsv: "Export Table (CSV)",
      colRank: "#",
      colCountry: "Country",
      colIso: "ISO-3",
      colRegion: "Region",
      colPop: "Population (2024)",
      colDnst: "Density (/km²)",
      colGrow: "Growth Rate",
      colUrb: "Urban (%)",
      colVisual: "Share",
      featuredBadge: "Uzbekistan",
      showingRows: "Countries shown",
      noResults: "No matching countries found.",
      inspectOnGlobe: "Inspect on globe",
    },
    methodology: {
      badge: "Data Integrity & Accessibility",
      title: "Methodology & European Accessibility Posture",
      body:
        "All indicators originate directly from World Bank Open Data (SP.POP.TOTL, EN.POP.DNST, SP.POP.GROW, SP.URB.TOTL.IN.ZS). The interface operates without tracking cookies and targets WCAG 2.1 AA contrast and keyboard accessibility.",
      euNotice:
        "Note: Formal compliance with European Union regulatory requirements requires a separate dedicated legal evaluation.",
      wcagBadge: "WCAG 2.1 AA Contrast",
      privacyBadge: "Cookie-Free Design",
      sourceBadge: "World Bank Open Data",
    },
    roadmap: {
      title: "Methodology",
      subtitle: "",
      completedBadge: "",
      stages: [],
    },
    searchModal: {
      placeholder: "Search country name, ISO-3 code, or indicator...",
      sectionCountries: "Countries (Focus on Globe)",
      sectionIndicators: "Core Indicators",
      noResults: "No matching results.",
      footerTip: "Quick search: ⌘K",
      footerDataset: "Official World Bank WDI Dataset",
    },
    export: {
      buttonLabel: "Export Data",
      comparisonSummary: "Comparison Summary (CSV)",
      historicalSeries: "Historical Series 1960–2024 (CSV)",
      mapDataset: "Global Map Dataset (CSV)",
      downloadSuccess: "CSV file downloaded.",
    },
  },

  ru: {
    common: {
      loading: "Загрузка демографических данных...",
      error: "Ошибка загрузки данных",
      retry: "Повторить",
      na: "Нет данных",
      dataPending: "Ожидается",
      officialFeed: "Всемирный банк (WDI) • Официальные данные",
      verifiedSnapshot: "Официальная база WDI",
      exportCsv: "Скачать CSV",
      search: "Поиск",
      close: "Закрыть",
      featured: "Узбекистан",
      all: "Все",
      tip: "Подсказка: нажмите ⌘K для поиска",
      source: "Источник",
      referenceYear: "Отчётный год",
      zeroMockBadge: "Официальные данные WDI",
      worldBankWdi: "Всемирный банк (WDI)",
    },
    nav: {
      siteName: "Население Мира",
      siteSub: "Демографический портал",
      overview: "Обзор и глобус",
      globeMap: "3D Глобус и карта",
      compare: "Сравнение стран",
      historical: "Исторический график",
      regional: "Региональный анализ",
      ranking: "Подробная таблица",
      roadmap: "Методология",
      globalOverview: "Глобальный обзор",
      liveBadge: "Всемирный банк онлайн",
      searchPlaceholder: "Поиск страны или кода ISO-3 (Узбекистан, DEU)...",
      mobileGlobe: "Глобус",
      mobileCompare: "Сравнение",
      mobileRegions: "Регионы",
      mobileTable: "Таблица",
    },
    hero: {
      suiteBadge: "Открытые данные Всемирного банка",
      timeSeriesBadge: "Ряды 1960–2024 гг.",
      titleLine1: "Население мира и",
      titleLine2: "демографический анализ",
      subtitle:
        "Вращайте и приближайте 3D-глобус, чтобы выбрать любую страну, сравнивайте ключевые показатели и анализируйте 65-летнюю историю по данным Всемирного банка.",
      ctaCompare: "Сравнить страны",
      ctaGlobe: "Открыть 3D-глобус",
      ctaRanking: "Подробная таблица",
    },
    telemetry: {
      dataFeed: "Источник данных",
      sourcePartner: "The World Bank Open Data",
      telemetryActive: "Официальный поток активен",
      cachingProtocol: "Ежедневное обновление (24 ч)",
      officialRelease: "Официальный статистический выпуск",
      lastSynchronized: "Дата обновления",
      justNow: "Обновлено сегодня",
      verifiedDataset: "Показатели Всемирного банка (WDI)",
      liveFeed: "Соединение",
    },
    kpi: {
      sectionBadge: "Мировые показатели",
      officialReleaseBadge: "Агрегат WLD",
      sectionTitle: "Ключевые демографические показатели",
      sectionSubtitle:
        "Официальные глобальные показатели из открытой базы данных Всемирного банка.",
      isrCacheBadge: "Обновление: 24 ч",
      popTotal: {
        title: "Население мира",
        description: "Общая численность населения планеты по более чем 200 странам и территориям.",
        unit: "человек",
        trendText: "+0.96% за год",
      },
      popGrow: {
        title: "Годовой прирост",
        description: "Экспоненциальный годовой темп роста численности населения планеты.",
        unit: "% в год",
        trendText: "Среднемировой темп",
      },
      popDnst: {
        title: "Плотность населения",
        description: "Среднее число жителей на квадратный километр площади суши.",
        unit: "чел. / км²",
        trendText: "На 1 км² суши",
      },
      popUrb: {
        title: "Доля городского населения",
        description: "Доля населения, проживающего в городских поселениях.",
        unit: "% от общего",
        trendText: "+0.25% урбанизация",
      },
    },
    centerpiece: {
      title: "Интерактивный 3D-глобус и карта мира",
      subtitle:
        "Вращайте и приближайте глобус до 8×, чтобы выбрать любую страну и открыть её демографический профиль.",
      engineBadge: "3D Ортографическая проекция",
      viewGlobe: "3D Глобус",
      viewMap: "2D Карта",
      tabPop: "Население",
      tabDnst: "Плотность",
      tabGrow: "Прирост",
      tabUrb: "Урбанизация",
      globeHintDrag: "Тяните для вращения • Приближайте колёсиком или кнопками +/−",
      globeBadge3d: "Интерактивный 3D-глобус",
      globeBadgeProjection: "Масштаб: 1× – 8×",
      globeAutoSpin: "Вращать",
      globeSpinning: "Пауза",
      globeZoomIn: "Приблизить",
      globeZoomOut: "Отдалить",
      globeReset: "Сбросить вид",
      focusUzbekistan: "Узбекистан",
      mapAuditCoverage: "177 территорий на карте",
      mapAuditZeroUnmatched: "Географический охват",
      legendNoData: "Нет данных",
      zoomLevel: "Масштаб",
      searchCountryPlaceholder: "Перейти к стране на глобусе (напр., Франция, Узбекистан)...",
      scrollZoomOn: "Зум колёсиком: Вкл",
      scrollZoomOff: "Зум колёсиком: Выкл",
      clickToInspect: "Нажмите для просмотра профиля",
      scalePop: "Шкала населения:",
      scaleDnst: "Плотность (/ км²):",
      scaleGrow: "Темп прироста (%):",
      scaleUrb: "Доля городов (%):",
      loadingMap: "Загрузка интерактивного глобуса...",
      loadingMapSub: "Подготовка векторных границ и показателей Всемирного банка.",
      syncTerritories: "Загрузка 200+ территорий",
      regionJumpLabel: "Регион:",
    },
    countryPanel: {
      title: "Демографический профиль страны",
      verifiedProfile: "Официальные показатели Всемирного банка",
      popLabel: "Население",
      dnstLabel: "Плотность населения",
      growLabel: "Годовой прирост",
      urbLabel: "Городское население",
      benchmarkCta: "Добавить в сравнение",
      addedToCompare: "В сравнении",
      sourceFooter: "World Bank WDI",
      officialFeedFooter: "Официальный отчёт",
      mobileTitle: "Выбранная страна",
      openFullPanel: "Полный профиль",
      selectHint: "Нажмите на любую страну на глобусе",
    },
    comparison: {
      badge: "Сравнение стран",
      subBadge: "От 2 до 5 стран",
      title: "Сравнение показателей и исторический график",
      subtitle:
        "Сравните численность, плотность, прирост и динамику изменений за 1960–2024 гг. между выбранными странами.",
      zeroFabricated: "Только официальная статистика",
      selectPrompt: "Выберите страны для сравнения (2–5)",
      searchPlaceholder: "Поиск по названию страны или коду ISO-3...",
      quickAddUzb: "Добавить Узбекистан",
      uzbAdded: "Узбекистан добавлен",
      selectedLabel: "Выбранные страны",
      maxReached: "Выбрано максимум 5 стран",
      leadNation: "Лидер",
      diffLead: "Разница",
      cardsTitle: "Сравнение по показателям",
      cardsSubtitle: "Сопоставление по четырём основным метрикам.",
      metricPop: "Население",
      metricDnst: "Плотность",
      metricGrow: "Годовой прирост",
      metricUrb: "Урбанизация",
      declineBadge: "снижение",
      presetCentralAsia: "Центральная Азия",
      presetGlobal: "Крупные державы",
      presetEurope: "Европа",
    },
    historical: {
      badge: "Исторические ряды: 1960 – 2024",
      authenticatedBadge: "World Bank WDI",
      title: "Историческая динамика (1960–2024)",
      subtitle:
        "Изучите 65-летние демографические тренды на линейной или логарифмической шкале.",
      modeArea: "Область",
      modeLine: "Линии",
      modeBar: "Столбцы",
      scaleLinear: "Линейная",
      scaleLog: "Логарифм",
      filterAll: "1960–2024",
      filterModern: "1990–2024",
      filterRecent: "2010–2024",
      exportCsv: "Экспорт CSV",
      yearLabel: "Год",
      toggleVisibility: "Показать/скрыть страны:",
    },
    regional: {
      badge: "Региональный анализ",
      bokettoStyle: "Регионы Всемирного банка",
      title: "Региональная карта и распределение населения",
      subtitle:
        "Доля 7 мировых регионов в населении планеты и показатели Узбекистана в Центральной Азии.",
      donutTitle: "Население по регионам мира",
      donutSubtitle: "Распределение по 7 официальным регионам Всемирного банка.",
      donutCenterTitle: "Всё население",
      barTitle: "Крупнейшие страны и Узбекистан",
      barSubtitle: "Сравнение численности населения ведущих стран и Узбекистана.",
      barFootnote: "Узбекистан • Крупнейшая страна Центральной Азии",
      shareLabel: "Доля в мире",
      headcountLabel: "Население",
      popLabel: "Население",
      uzbSpotlightTitle: "Узбекистан и Центральная Азия",
      uzbSpotlightSub: "Демографический профиль крупнейшего центра региона.",
      focusRegionMap: "Показать регион на глобусе",
      regions: {
        EAS: "Восточная Азия и Тихий океан",
        SAS: "Южная Азия",
        SSF: "Африка южнее Сахары",
        ECS: "Европа и Центральная Азия",
        MEA: "Ближний Восток и Сев. Африка",
        LCN: "Латинская Америка и Карибы",
        NAC: "Северная Америка",
      },
    },
    leagueTable: {
      badge: "Подробная таблица",
      sourceBadge: "World Bank WDI",
      title: "Подробная демографическая таблица стран",
      subtitle:
        "Сортировка по численности, плотности, приросту и урбанизации, а также переход к стране на глобусе.",
      searchPlaceholder: "Поиск страны или кода ISO-3...",
      allRegions: "Все регионы",
      exportCsv: "Скачать таблицу (CSV)",
      colRank: "№",
      colCountry: "Страна",
      colIso: "Код",
      colRegion: "Регион",
      colPop: "Население (2024)",
      colDnst: "Плотность (/км²)",
      colGrow: "Прирост",
      colUrb: "Город (%)",
      colVisual: "Доля",
      featuredBadge: "Узбекистан",
      showingRows: "Показано стран",
      noResults: "Совпадений не найдено.",
      inspectOnGlobe: "Показать на глобусе",
    },
    methodology: {
      badge: "Достоверность и доступность",
      title: "Методология и стандарты доступности",
      body:
        "Все показатели поступают напрямую из открытой базы Всемирного банка (SP.POP.TOTL, EN.POP.DNST, SP.POP.GROW, SP.URB.TOTL.IN.ZS). Платформа работает без рекламных и отслеживающих cookie-файлов и ориентирована на стандарты доступности WCAG 2.1 AA.",
      euNotice:
        "Примечание: официальная оценка соответствия нормативным требованиям ЕС требует отдельного юридического аудита.",
      wcagBadge: "Контраст WCAG 2.1 AA",
      privacyBadge: "Без tracking-cookie",
      sourceBadge: "World Bank Open Data",
    },
    roadmap: {
      title: "Методология",
      subtitle: "",
      completedBadge: "",
      stages: [],
    },
    searchModal: {
      placeholder: "Введите название страны, код ISO-3 или показатель...",
      sectionCountries: "Страны (показать на глобусе)",
      sectionIndicators: "Основные показатели",
      noResults: "Ничего не найдено.",
      footerTip: "Быстрый поиск: ⌘K",
      footerDataset: "Официальная база World Bank WDI",
    },
    export: {
      buttonLabel: "Экспорт данных",
      comparisonSummary: "Сводка сравнения (CSV)",
      historicalSeries: "Исторические ряды 1960–2024 (CSV)",
      mapDataset: "Данные карты мира (CSV)",
      downloadSuccess: "Файл CSV успешно скачан.",
    },
  },
};

export const defaultLocale: SupportedLocale = "uz";

export function getDictionary(locale: SupportedLocale = defaultLocale): Translations {
  return dictionaries[locale] || dictionaries.uz;
}
