"use client";

import { useState, useEffect } from "react";
import { Globe, GitCompare, PieChart, ListOrdered } from "lucide-react";
import { AppSidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { Footer } from "./footer";
import { useTranslation } from "@/components/language";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const sectionIds = [
      "overview",
      "map-section",
      "compare-section",
      "historical-section",
      "regional-section",
      "ranking-section",
      "methodology-section",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileTabs = [
    { id: "map-section", label: t.nav.mobileGlobe, href: "#map-section", icon: Globe },
    { id: "compare-section", label: t.nav.mobileCompare, href: "#compare-section", icon: GitCompare },
    { id: "regional-section", label: t.nav.mobileRegions, href: "#regional-section", icon: PieChart },
    { id: "ranking-section", label: t.nav.mobileTable, href: "#ranking-section", icon: ListOrdered },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AppSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        activeSection={activeSection}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:pl-[72px]" : "lg:pl-[256px]"
        }`}
      >
        <TopNav
          onToggleSidebar={() => setMobileOpen((prev) => !prev)}
          isSidebarCollapsed={isCollapsed}
        />

        <main id="main-content" className="flex-1 overflow-x-hidden pb-20 lg:pb-0">
          {children}
        </main>

        <Footer />
      </div>

      {/* Mobile Bottom Analytics Quick-Navigation Bar */}
      <nav
        aria-label="Mobile Section Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-2 py-1.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]"
      >
        <div className="grid grid-cols-4 gap-1">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <a
                key={tab.id}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl text-[11px] font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate max-w-full">{tab.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
