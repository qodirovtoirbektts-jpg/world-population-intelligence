"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  Globe2,
  FileSpreadsheet,
  Download,
  Share2,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme/theme-provider";
import { QuickSearchDialog } from "./quick-search-dialog";

interface TopNavProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export function TopNav({ onToggleSidebar, isSidebarCollapsed }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"EN" | "UZ" | "RU">("EN");

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border/80 bg-card/80 backdrop-blur-xl transition-all">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 gap-3">
          {/* Left section: Hamburger / Breadcrumb */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="h-9 w-9 text-muted-foreground hover:text-foreground lg:hidden rounded-xl"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Breadcrumb / Page Title */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="font-semibold text-foreground tracking-tight hidden sm:inline">
                WORLD POPULATION INTELLIGENCE
              </span>
              <span className="text-muted-foreground hidden sm:inline">/</span>
              <span className="font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20 text-xs">
                Global Overview
              </span>
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-xs text-muted-foreground hover:border-border hover:bg-secondary/60 hover:text-foreground transition-all shadow-sm"
            >
              <span className="flex items-center gap-2 truncate">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Search nations, indicators, ISO codes...</span>
              </span>
              <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted/60 px-1.5 font-mono text-[10px] text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>

          {/* Right section: Telemetry, Theme Switcher, Language, User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="md:hidden h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
              title="Search"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Live Data Connection Pill */}
            <div className="hidden xl:flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/30 px-2.5 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-muted-foreground">World Bank Live</span>
            </div>

            {/* Theme Toggle (Dark / Light) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-xl transition-all"
              title={mounted && theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400 rotate-0 transition-transform" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-400 rotate-0 transition-transform" />
              )}
            </Button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-1 text-[11px] font-mono font-medium border border-border/80 bg-secondary/30 hover:bg-secondary/60 px-2 py-1 rounded-lg text-foreground transition-all"
                aria-label="Select language"
              >
                <Globe2 className="h-3 w-3 text-muted-foreground" />
                <span>{currentLang}</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-24 rounded-xl border border-border/80 bg-card/95 backdrop-blur-xl p-1 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setLangMenuOpen(false)}
                >
                  {(["EN", "UZ", "RU"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCurrentLang(lang)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                        currentLang === lang
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-xl"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </Button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-1 border-l border-border/60">
              <div
                className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-indigo-500/20"
                title="Demographic Researcher"
              >
                DR
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Dialog */}
      <QuickSearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
