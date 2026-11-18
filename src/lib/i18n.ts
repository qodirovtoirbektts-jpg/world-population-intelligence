export type SupportedLocale = "en" | "uz" | "ru";

export interface Translations {
  siteName: string;
  tagline: string;
  stage1Badge: string;
  statusAwaitingApi: string;
  statusAwaitingApiDesc: string;
  nav: {
    dashboard: string;
    map: string;
    compare: string;
    analytics: string;
    docs: string;
  };
  stats: {
    worldPopulation: string;
    annualGrowthRate: string;
    totalCountriesTracked: string;
    urbanPopulationRate: string;
    awaitingConnection: string;
    willConnectStage2: string;
  };
  features: {
    interactiveMapTitle: string;
    interactiveMapDesc: string;
    comparisonEngineTitle: string;
    comparisonEngineDesc: string;
    dataExportTitle: string;
    dataExportDesc: string;
    verifiedDataTitle: string;
    verifiedDataDesc: string;
  };
  stageTracker: {
    title: string;
    stage1Title: string;
    stage1Desc: string;
    stage1Status: string;
    stage2Title: string;
    stage2Desc: string;
    stage2Status: string;
    stage3Title: string;
    stage3Desc: string;
    stage3Status: string;
    stage4Title: string;
    stage4Desc: string;
    stage4Status: string;
    stage5Title: string;
    stage5Desc: string;
    stage5Status: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    dataSource: string;
  };
}

export const dictionaries: Record<SupportedLocale, Translations> = {
  en: {
    siteName: "WORLD POPULATION INTELLIGENCE",
    tagline: "Global Demographic Analytics & Comparative Intelligence Platform",
    stage1Badge: "Stage 1: Architecture & Foundation Active",
    statusAwaitingApi: "Awaiting Live World Bank API Connection (Stage 2)",
    statusAwaitingApiDesc:
      "Per architectural design standards, fabricated numbers are strictly avoided. Authentic demographic indicators (SP.POP.TOTL, SP.POP.GROW, EN.POP.DNST) will be streamed in Stage 2 directly from the official World Bank API.",
    nav: {
      dashboard: "Overview",
      map: "Interactive Map",
      compare: "Country Comparison",
      analytics: "Growth Trends",
      docs: "API Documentation",
    },
    stats: {
      worldPopulation: "Global Population",
      annualGrowthRate: "Annual Growth Rate",
      totalCountriesTracked: "Monitored Countries & Territories",
      urbanPopulationRate: "Urban Share Ratio",
      awaitingConnection: "Awaiting API Feed",
      willConnectStage2: "Connecting in Stage 2",
    },
    features: {
      interactiveMapTitle: "Choropleth World Map",
      interactiveMapDesc:
        "High-performance TopoJSON 110m vector map with dynamic demographic color scales, tooltips, and region drill-downs.",
      comparisonEngineTitle: "Multi-Country Comparison",
      comparisonEngineDesc:
        "Side-by-side analysis of up to 4 countries comparing population growth, density, and life expectancy curves.",
      dataExportTitle: "Instant Data Export",
      dataExportDesc:
        "Download tailored analytical datasets in standard CSV format for academic research and executive reporting.",
      verifiedDataTitle: "100% Verified Indicators",
      verifiedDataDesc:
        "Direct integration with the World Bank Open Data API without mock or simulated statistics.",
    },
    stageTracker: {
      title: "Architecture & Implementation Roadmap",
      stage1Title: "Stage 1: Project Setup & Core Layout",
      stage1Desc: "Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui foundation & i18n architecture.",
      stage1Status: "Completed",
      stage2Title: "Stage 2: World Bank API & Caching",
      stage2Desc: "Type-safe client, Next.js ISR 24h caching, indicator normalizers & fallback logic.",
      stage2Status: "Next Step",
      stage3Title: "Stage 3: Interactive World Map",
      stage3Desc: "react-simple-maps integration, Choropleth density coloring, and country hover tooltips.",
      stage3Status: "Planned",
      stage4Title: "Stage 4: Comparison & Trend Charts",
      stage4Desc: "Recharts dynamic multi-country comparison and 1960-2023 historical population curves.",
      stage4Status: "Planned",
      stage5Title: "Stage 5: CSV Export & Production Deploy",
      stage5Desc: "Dataset export utility, Web Design Guidelines audit & verified Vercel deployment.",
      stage5Status: "Planned",
    },
    footer: {
      builtWith: "Engineered with Next.js, TypeScript & Tailwind CSS",
      rights: "All rights reserved. Professional demographic intelligence architecture.",
      dataSource: "Official data partner: The World Bank Open Data API",
    },
  },
  uz: {
    siteName: "WORLD POPULATION INTELLIGENCE",
    tagline: "Global demografik tahlil va mamlakatlarni qiyoslash platformasi",
    stage1Badge: "1-Bosqich: Arxitektura va asosiy poydevor faol",
    statusAwaitingApi: "Jahon Banki API ulanishi kutilmoqda (2-bosqich)",
    statusAwaitingApiDesc:
      "Arxitektura qoidalariga muvofiq, sun'iy yoki soxta raqamlar ishlatilmaydi. Haqiqiy ko'rsatkichlar (SP.POP.TOTL, SP.POP.GROW, EN.POP.DNST) 2-bosqichda to'g'ridan-to'g'ri rasmiy World Bank API'dan olinadi.",
    nav: {
      dashboard: "Umumiy ko'rinish",
      map: "Interaktiv Xarita",
      compare: "Taqqoslash",
      analytics: "O'sish dinamikasi",
      docs: "API Hujjati",
    },
    stats: {
      worldPopulation: "Dunyo Aholisi",
      annualGrowthRate: "Yillik O'sish Sur'ati",
      totalCountriesTracked: "Kuzatilayotgan Davlatlar",
      urbanPopulationRate: "Shahar Aholisi Ulushi",
      awaitingConnection: "API Ulanishi Kutilmoqda",
      willConnectStage2: "2-bosqichda ulanadi",
    },
    features: {
      interactiveMapTitle: "Dunyo Xaritasi (Choropleth)",
      interactiveMapDesc: "Yengil TopoJSON 110m vektor xaritasi, demografik ranglar shkalasi va qulay tooltip.",
      comparisonEngineTitle: "Mamlakatlarni Solishtirish",
      comparisonEngineDesc: "2 tadan 4 tagacha davlatni aholi o'sishi va umr ko'rish bo'yicha yonma-yon tahlil qilish.",
      dataExportTitle: "Tezkor CSV Eksport",
      dataExportDesc: "Tahliliy ma'lumotlarni xalqaro tadqiqotlar uchun toza CSV formatida yuklab olish.",
      verifiedDataTitle: "100% Rasmiy Ma'lumot",
      verifiedDataDesc: "Hech qanday soxta raqamlarsiz, Jahon Bankining tasdiqlangan ochiq ma'lumotlar bazasi.",
    },
    stageTracker: {
      title: "Loyihani Amalga Oshirish Bosqichlari",
      stage1Title: "1-Bosqich: Loyiha Asosi va Dizayn",
      stage1Desc: "Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui va i18n arxitekturasi.",
      stage1Status: "Bajarildi",
      stage2Title: "2-Bosqich: Jahon Banki API va Kesh",
      stage2Desc: "Type-safe mijoz, 24 soatlik ISR keshlash, indikatorlarni qayta ishlash qatlami.",
      stage2Status: "Keyingi qadam",
      stage3Title: "3-Bosqich: Interaktiv Dunyo Xaritasi",
      stage3Desc: "react-simple-maps, aholi zichligi bo'yicha ranglar va davlat ma'lumotlari.",
      stage3Status: "Rejalashtirilgan",
      stage4Title: "4-Bosqich: Taqqoslash va Grafiklar",
      stage4Desc: "Recharts orqali 1960-yildan hozirgacha bo'lgan o'sish dinamikasi grafiklari.",
      stage4Status: "Rejalashtirilgan",
      stage5Title: "5-Bosqich: CSV Eksport va Deploy",
      stage5Desc: "CSV generatsiya moduli, UI/UX auditi va Vercel'ga rasmiy chiqarish.",
      stage5Status: "Rejalashtirilgan",
    },
    footer: {
      builtWith: "Next.js, TypeScript va Tailwind CSS asosida yaratilgan",
      rights: "Barcha huquqlar himoyalangan. Professional demografik tahlil platformasi.",
      dataSource: "Rasmiy ma'lumotlar manbasi: Jahon Banki Ochiq API'si",
    },
  },
  ru: {
    siteName: "WORLD POPULATION INTELLIGENCE",
    tagline: "Глобальная демографическая аналитическая платформа",
    stage1Badge: "Этап 1: Архитектура и основа активны",
    statusAwaitingApi: "Ожидание подключения World Bank API (Этап 2)",
    statusAwaitingApiDesc:
      "Согласно архитектурным стандартам, поддельные данные не используются. Реальные демографические показатели будут подключены на Этапе 2 напрямую из официального API Всемирного банка.",
    nav: {
      dashboard: "Обзор",
      map: "Интерактивная карта",
      compare: "Сравнение стран",
      analytics: "Тренды роста",
      docs: "Документация API",
    },
    stats: {
      worldPopulation: "Население мира",
      annualGrowthRate: "Годовой темп роста",
      totalCountriesTracked: "Отслеживаемые страны",
      urbanPopulationRate: "Доля городского населения",
      awaitingConnection: "Ожидание API",
      willConnectStage2: "Подключение на этапе 2",
    },
    features: {
      interactiveMapTitle: "Карта мира (Choropleth)",
      interactiveMapDesc: "Оптимизированная векторная карта TopoJSON с цветовыми шкалами плотности и подсказками.",
      comparisonEngineTitle: "Сравнение стран",
      comparisonEngineDesc: "Параллельное сравнение до 4 стран по динамике численности, плотности и продолжительности жизни.",
      dataExportTitle: "Экспорт в CSV",
      dataExportDesc: "Мгновенное скачивание аналитических срезов в стандартном формате CSV.",
      verifiedDataTitle: "100% Верифицированные данные",
      verifiedDataDesc: "Прямая интеграция с официальной базой Open Data Всемирного банка.",
    },
    stageTracker: {
      title: "Дорожная карта реализации проекта",
      stage1Title: "Этап 1: Настройка проекта и дизайн",
      stage1Desc: "Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui и архитектура i18n.",
      stage1Status: "Завершено",
      stage2Title: "Этап 2: World Bank API и кэширование",
      stage2Desc: "Типизированный клиент, 24-часовой ISR кэш и нормализаторы данных.",
      stage2Status: "Следующий шаг",
      stage3Title: "Этап 3: Интерактивная карта мира",
      stage3Desc: "Интеграция react-simple-maps, цветовые шкалы плотности населения.",
      stage3Status: "Запланировано",
      stage4Title: "Этап 4: Сравнение и графики",
      stage4Desc: "Динамические графики Recharts с историей 1960–2023 гг.",
      stage4Status: "Запланировано",
      stage5Title: "Этап 5: Экспорт CSV и деплой",
      stage5Desc: "Утилита экспорта, аудит интерфейса и развертывание на Vercel.",
      stage5Status: "Запланировано",
    },
    footer: {
      builtWith: "Создано на Next.js, TypeScript и Tailwind CSS",
      rights: "Все права защищены. Профессиональная платформа демографической аналитики.",
      dataSource: "Официальный источник данных: World Bank Open Data API",
    },
  },
};

export const defaultLocale: SupportedLocale = "en";

export function getDictionary(locale: SupportedLocale = defaultLocale): Translations {
  return dictionaries[locale] || dictionaries.en;
}
