"use client";

import { CheckCircle2, Clock, CircleDot, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/components/language";

export function RoadmapTracker() {
  const { t } = useTranslation();

  return (
    <div id="roadmap-section" className="space-y-6 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            {t.roadmap.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.roadmap.subtitle}
          </p>
        </div>
        <Badge variant="outline" className="w-fit text-xs px-3 py-1 font-mono text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
          {t.roadmap.completedBadge}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.roadmap.stages.map((s) => {
          const isDone = s.status === "completed";
          const isCurrent = s.status === "current";

          return (
            <Card
              key={s.stage}
              className={`relative flex flex-col justify-between transition-all ${
                isDone
                  ? "border-emerald-500/40 bg-emerald-950/10 shadow-sm"
                  : isCurrent
                  ? "border-blue-500/50 bg-blue-950/20 shadow-md ring-1 ring-blue-500/30"
                  : "border-border/60 opacity-70"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Stage 0{s.stage}
                  </span>
                  {isDone && (
                    <Badge variant="success" className="gap-1 text-[11px] py-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </Badge>
                  )}
                  {isCurrent && (
                    <Badge variant="info" className="gap-1 text-[11px] py-0.5 animate-pulse">
                      <CircleDot className="h-3 w-3" />
                      Next Step
                    </Badge>
                  )}
                  {!isDone && !isCurrent && (
                    <Badge variant="outline" className="gap-1 text-[11px] py-0.5 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Planned
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base font-semibold mt-2">
                  {s.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {s.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="border-t border-border/50 pt-3 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                    Deliverables:
                  </span>
                  <ul className="space-y-1">
                    {s.deliverables.map((d, idx) => (
                      <li key={idx} className="text-xs text-foreground/80 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
