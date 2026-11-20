"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { Footer } from "./footer";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Track scroll position to update active section in sidebar
  useEffect(() => {
    const sectionIds = [
      "overview",
      "map-section",
      "compare-section",
      "historical-section",
      "ranking-section",
      "roadmap-section",
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Collapsible Sidebar */}
      <AppSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        activeSection={activeSection}
      />

      {/* Main Canvas Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"
        }`}
      >
        {/* Top Navigation Bar */}
        <TopNav
          onToggleSidebar={() => setMobileOpen((prev) => !prev)}
          isSidebarCollapsed={isCollapsed}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
