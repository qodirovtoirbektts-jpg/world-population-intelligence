"use client";

import Link from "next/link";
import {
  Globe,
  BarChart3,
  GitCompare,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ListOrdered,
  PieChart,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/language";
import { useDashboard } from "@/components/dashboard/dashboard-context";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  activeSection: string;
}

export function AppSidebar({
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  activeSection,
}: SidebarProps) {
  const { t, language } = useTranslation();
  const { focusCountryOnGlobe } = useDashboard();

  const navItems = [
    {
      id: "overview",
      label: t.nav.overview,
      href: "#overview",
      icon: BarChart3,
    },
    {
      id: "map-section",
      label: t.nav.globeMap,
      href: "#map-section",
      icon: Globe,
    },
    {
      id: "compare-section",
      label: t.nav.compare,
      href: "#compare-section",
      icon: GitCompare,
    },
    {
      id: "historical-section",
      label: t.nav.historical,
      href: "#historical-section",
      icon: TrendingUp,
    },
    {
      id: "regional-section",
      label: t.nav.regional,
      href: "#regional-section",
      icon: PieChart,
    },
    {
      id: "ranking-section",
      label: t.nav.ranking,
      href: "#ranking-section",
      icon: ListOrdered,
    },
    {
      id: "methodology-section",
      label: t.nav.roadmap,
      href: "#methodology-section",
      icon: ShieldCheck,
    },
  ];

  const handleUzbekistanJump = () => {
    focusCountryOnGlobe("UZB", "Uzbekistan");
    onCloseMobile();
    const el = document.getElementById("map-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[72px]" : "w-[256px]"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Main Navigation Sidebar"
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-3.5 border-b border-slate-200/80 dark:border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
            onClick={onCloseMobile}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm">
              <Globe className="h-5 w-5" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold tracking-tight text-sm text-slate-900 dark:text-slate-100 truncate">
                  {t.nav.siteName}
                </span>
                <span className="text-[11px] text-blue-700 dark:text-blue-400 font-medium truncate">
                  {t.nav.siteSub}
                </span>
              </div>
            )}
          </Link>

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hidden lg:flex h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isCollapsed && (
          <div className="hidden lg:flex justify-center py-2 border-b border-slate-200/80 dark:border-slate-800">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-6">
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                {language === "uz"
                  ? "Bo‘limlar"
                  : language === "ru"
                  ? "Разделы"
                  : "Sections"}
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200/80 dark:border-blue-800"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-900"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Uzbekistan Quick Focus Widget */}
          {!isCollapsed && (
            <div className="p-3.5 mx-0.5 rounded-2xl border border-blue-100 dark:border-slate-800 bg-blue-50/60 dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                  {t.common.featured}
                </span>
                <span className="text-[11px] font-mono text-blue-700 dark:text-blue-300">UZB</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === "uz"
                  ? "O‘zbekistonning aholi soni, zichligi va tarixiy dinamikasini globusda ochish."
                  : language === "ru"
                  ? "Открыть демографический профиль Узбекистана на 3D-глобусе."
                  : "Focus Uzbekistan's live World Bank profile directly on the 3D globe."}
              </p>
              <button
                type="button"
                onClick={handleUzbekistanJump}
                className="w-full py-1.5 px-2.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-[11px] font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-700 hover:text-white transition-colors"
              >
                {t.centerpiece.focusUzbekistan} →
              </button>
            </div>
          )}
        </div>

        {/* Footer Data Status */}
        <div className="p-3.5 border-t border-slate-200/80 dark:border-slate-800">
          {!isCollapsed ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span>{t.nav.liveBadge}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {t.common.worldBankWdi}
              </p>
            </div>
          ) : (
            <div className="flex justify-center" title={t.nav.liveBadge}>
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
