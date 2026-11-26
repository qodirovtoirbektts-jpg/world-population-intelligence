"use client";

import { Users, TrendingUp, Compass, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountryComparisonProfile } from "@/types/comparison";
import { DemographicIndicatorCode } from "@/types/world-bank";
import { getLocalizedCountryName } from "@/lib/country-names";
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
      icon: <Users className="h-4 w-4 text-blue-700 dark:text-blue-400" />,
      description: t.kpi.popTotal.description,
    },
    {
      code: "EN.POP.DNST" as DemographicIndicatorCode,
      title: t.kpi.popDnst.title,
      icon: <Compass className="h-4 w-4 text-blue-700 dark:text-blue-400" />,
      description: t.kpi.popDnst.description,
    },
    {
      code: "SP.POP.GROW" as DemographicIndicatorCode,
      title: t.kpi.popGrow.title,
      icon: <TrendingUp className="h-4 w-4 text-blue-700 dark:text-blue-400" />,
      description: t.kpi.popGrow.description,
    },
    {
      code: "SP.URB.TOTL.IN.ZS" as DemographicIndicatorCode,
      title: t.kpi.popUrb.title,
      icon: <Building2 className="h-4 w-4 text-blue-700 dark:text-blue-400" />,
      description: t.kpi.popUrb.description,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {metricsConfig.map((metric) => {
        const validValues = profiles
          .map((p) => p.metrics[metric.code]?.value)
          .filter((v): v is number => v !== null && v !== undefined && v > 0);
        const maxValue = validValues.length > 0 ? Math.max(...validValues) : 1;

        return (
          <Card
            key={metric.code}
            className="editorial-card bg-white dark:bg-slate-900 flex flex-col justify-between overflow-hidden"
          >
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 shrink-0">
                    {metric.icon}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {metric.title}
                    </CardTitle>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {metric.description}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] text-slate-500 border-slate-200 dark:border-slate-700 shrink-0"
                >
                  {metric.code}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {profiles.map((profile) => {
                  const item = profile.metrics[metric.code];
                  const hasValue = item && item.isAvailable && item.value !== null;
                  const ratio =
                    hasValue && item.value && item.value > 0
                      ? Math.min(100, Math.max(8, (item.value / maxValue) * 100))
                      : 0;
                  const displayName = getLocalizedCountryName(
                    profile.iso3,
                    profile.name,
                    language
                  );

                  return (
                    <div key={profile.iso3} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: profile.color }}
                          />
                          <span className="text-sm shrink-0">{profile.flag}</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                            {displayName}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 shrink-0">
                            {profile.iso3}
                          </span>
                        </div>

                        <div className="text-right shrink-0 tabular-nums">
                          <span
                            className={`font-semibold text-sm ${
                              !hasValue
                                ? "text-amber-600 text-xs"
                                : item.value !== null && item.value < 0
                                ? "text-red-600 dark:text-red-400"
                                : "text-slate-900 dark:text-slate-100"
                            }`}
                          >
                            {hasValue ? item.formattedValue : t.common.dataPending}
                          </span>
                          {hasValue && item.year && (
                            <span className="ml-1.5 text-[10px] text-slate-400 font-mono">
                              ({item.year})
                            </span>
                          )}
                          {hasValue && item.value !== null && item.value < 0 && (
                            <span className="ml-1 text-[10px] text-red-600 font-medium">
                              ({t.comparison.declineBadge})
                            </span>
                          )}
                        </div>
                      </div>

                      {hasValue && (
                        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
