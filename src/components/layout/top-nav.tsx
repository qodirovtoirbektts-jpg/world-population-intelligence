"use client";

import { useState, useEffect } from "react";
import { Menu, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { useTranslation, SupportedLocale } from "@/components/language";
import { QuickSearchDialog } from "./quick-search-dialog";

interface TopNavProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export function TopNav({ onToggleSidebar }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const locales: Array<{ code: SupportedLocale; label: string }> = [
    { code: "uz", label: "O‘Z" },
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 gap-3">
          {/* Left: Mobile Menu + Editorial Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="h-9 w-9 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden rounded-xl shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
                {t.nav.siteName}
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
              <span className="hidden sm:inline-flex font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200/70 dark:border-blue-800 text-xs">
                {t.nav.globalOverview}
              </span>
            </div>
          </div>

          {/* Center: Quick Country Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-500 dark:text-slate-400 hover:border-blue-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 transition-all"
            >
              <span className="flex items-center gap-2 truncate">
                <Search className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{t.nav.searchPlaceholder}</span>
              </span>
              <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 font-mono text-[10px] text-slate-500 shrink-0">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Mobile Search, Direct Language Switcher, Theme */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="md:hidden h-8 w-8 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
              title={t.common.search}
              aria-label={t.common.search}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Clean Segmented Language Switcher (UZ primary) */}
            <div
              className="inline-flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              role="group"
              aria-label="Language switcher"
            >
              {locales.map((loc) => (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => setLanguage(loc.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    language === loc.code
                      ? "bg-blue-700 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 text-slate-600 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl"
              title={mounted && theme === "dark" ? "Yorug‘ rejim" : "Tungi rejim"}
              aria-label="Toggle visual theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-blue-700" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <QuickSearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
