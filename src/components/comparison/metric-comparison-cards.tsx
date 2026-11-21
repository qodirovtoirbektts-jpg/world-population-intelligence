"use client";

import { Users, TrendingUp, Compass, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountryComparisonProfile } from "@/types/comparison";
import { DemographicIndicatorCode } from "@/types/world-bank";
import { useTranslation } from "@/components/language";

interface MetricComparisonCardsProps {
  profiles: CountryComparisonProfile[];
}

export function MetricComparisonCards({ profiles }: MetricComparisonCardsProps) {
  const { t, language } = useTranslation();

  const metricsConfig = [
    {
      code: "SP.POP.TOTL" as DemographicIndicatorCode,
      title: t.kpi.popTotal.title,
      icon: <Users className="h-4 w-4 text-blue-400" />,
      unit: "people",
      description: t.kpi.popTotal.description,
    },
    {
      code: "EN.POP.DNST" as DemographicIndicatorCode,
      title: t.kpi.popDnst.title,
      icon: <Compass className="h-4 w-4 text-indigo-400" />,
      unit: "per km²",
      description: t.kpi.popDnst.description,
    },
    {
      code: "SP.POP.GROW" as DemographicIndicatorCode,
      title: t.kpi.popGrow.title,
      icon: <TrendingUp className="h-4 w-4 text-emerald-400" />,
      unit: "%",
      description: t.kpi.popGrow.description,
    },
    {
      code: "SP.URB.TOTL.IN.ZS" as DemographicIndicatorCode,
      title: t.kpi.popUrb.title,
      icon: <Building2 className="h-4 w-4 text-amber-400" />,
      unit: "%",
      description: t.kpi.popUrb.description,
    },
  ];

  const getProfileDisplayName = (profile: CountryComparisonProfile) => {
    if (profile.iso3 === "UZB") {
      if (language === "ru") return "Узбекистан";
      if (language === "uz") return "Oʻzbekiston";
    }
    return profile.name;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {metricsConfig.map((metric) => {
        // Find highest value among valid numbers to compute relative progress bars
        const validValues = profiles
          .map((p) => p.metrics[metric.code]?.value)
          .filter((v): v is number => v !== null && v !== undefined && v > 0);
        const maxValue = validValues.length > 0 ? Math.max(...validValues) : 1;

        return (
          <Card
            key={metric.code}
            className="border-border/80 bg-card/60 backdrop-blur-xl shadow-lg relative overflow-hidden flex flex-col justify-between"
          >
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-secondary/80">{metric.icon}</div>
                  <div>
                    <CardTitle className="text-sm font-semibold text-foreground">
                      {metric.title}
                    </CardTitle>
                    <p className="text-[11px] text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                  {metric.code}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3.5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {profiles.map((profile) => {
                  const item = profile.metrics[metric.code];
                  const hasValue = item && item.isAvailable && item.value !== null;
                  const ratio = hasValue && item.value && item.value > 0
                    ? Math.min(100, Math.max(8, (item.value / maxValue) * 100))
                    : 0;
                  const displayName = getProfileDisplayName(profile);

                  return (
                    <div key={profile.iso3} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: profile.color }}
                          />
                          <span className="text-sm">{profile.flag}</span>
                          <span className="font-medium text-foreground">
                            {displayName}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            ({profile.iso3})
                          </span>
                        </div>

                        <div className="text-right">
                          <span
                            className={`font-semibold font-mono text-sm ${
                              !hasValue
                                ? "text-amber-400/90 text-xs italic"
                                : item.value !== null && item.value < 0
                                ? "text-rose-400"
                                : "text-foreground"
                            }`}
                          >
                            {hasValue ? item.formattedValue : t.common.dataPending}
                          </span>
                          {hasValue && item.year && (
                            <span className="ml-1.5 text-[10px] text-muted-foreground font-mono">
                              ({item.year})
                            </span>
                          )}
                          {hasValue && item.value !== null && item.value < 0 && (
                            <span className="ml-1 text-[10px] text-rose-400/80 font-mono">
                              (decline)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Visual Relative Comparison Bar */}
                      {hasValue && (
                        <div className="h-1.5 w-full rounded-full bg-secondary/40 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${ratio}%`,
                              backgroundColor: profile.color,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
