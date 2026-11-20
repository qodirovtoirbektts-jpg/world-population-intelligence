"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  BarChart3,
  Map,
  GitCompare,
  TrendingUp,
  Layers,
  ChevronLeft,
  ChevronRight,
  Database,
  ListOrdered,
  Sparkles,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const navItems = [
    {
      id: "overview",
      label: "Global Dashboard",
      href: "#overview",
      icon: BarChart3,
      badge: "WLD",
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      id: "map-section",
      label: "3D Globe & World Map",
      href: "#map-section",
      icon: Globe,
      badge: "3D Live",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
    {
      id: "compare-section",
      label: "Country Comparison",
      href: "#compare-section",
      icon: GitCompare,
      badge: "2–5",
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    },
    {
      id: "historical-section",
      label: "Historical Trends",
      href: "#historical-section",
      icon: TrendingUp,
      badge: "1960–24",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
    {
      id: "ranking-section",
      label: "Demographic Rankings",
      href: "#ranking-section",
      icon: ListOrdered,
      badge: "Top 20",
      badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      id: "roadmap-section",
      label: "Platform Roadmap",
      href: "#roadmap-section",
      icon: Layers,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-border/80 bg-card/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[72px]" : "w-[260px]"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Main Navigation Sidebar"
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-3.5 border-b border-border/70">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            onClick={onCloseMobile}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-700 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Globe className="h-5 w-5 animate-pulse" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold tracking-tight text-sm text-foreground truncate">
                  WORLD POPULATION
                </span>
                <span className="text-[10px] font-mono tracking-wider text-primary font-semibold truncate">
                  INTELLIGENCE
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle Button */}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-lg"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Collapsed Rail Toggle Button */}
        {isCollapsed && (
          <div className="hidden lg:flex justify-center py-2 border-b border-border/50">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-lg"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Analytics & Modules
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
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />

                  {!isCollapsed && (
                    <span className="truncate flex-1">{item.label}</span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border font-medium ${
                        isActive
                          ? "bg-white/20 text-white border-white/30"
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Benchmark Focus Widget */}
          {!isCollapsed && (
            <div className="p-3 mx-1 rounded-xl border border-border/70 bg-secondary/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  Featured Country
                </span>
                <span className="text-xs">🇺🇿</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Uzbekistan (Central Asia) verified World Bank demographic baseline.
              </p>
              <a
                href="#map-section"
                className="inline-flex w-full items-center justify-center gap-1 text-[11px] font-medium text-primary hover:underline pt-1"
                onClick={onCloseMobile}
              >
                Inspect on World Map →
              </a>
            </div>
          )}
        </div>

        {/* Footer Telemetry */}
        <div className="p-3 border-t border-border/70 space-y-2">
          {!isCollapsed ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  World Bank Online
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">24h ISR</span>
              </div>
              <div className="text-[10px] text-muted-foreground/80 truncate">
                Zero Mock • WCAG 2.1 AA
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="World Bank Connected (24h ISR)">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
