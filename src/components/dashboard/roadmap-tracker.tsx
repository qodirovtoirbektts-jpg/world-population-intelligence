import { CheckCircle2, Clock, CircleDot, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoadmapStage {
  stage: number;
  title: string;
  description: string;
  deliverables: string[];
  status: "completed" | "current" | "upcoming";
}

const stages: RoadmapStage[] = [
  {
    stage: 1,
    title: "Foundation & Architecture",
    description: "Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui and i18n structure setup.",
    deliverables: ["Project scaffold & clean structure", "Design system & UI tokens", "Zero-mock data compliance"],
    status: "completed",
  },
  {
    stage: 2,
    title: "World Bank API & Caching",
    description: "Integration with official World Bank Open Data endpoints with resilient ISR caching.",
    deliverables: ["World Bank TypeScript client", "4 core indicators & WLD aggregate", "24h Next.js ISR revalidation", "Null-value handling & 1960+ history"],
    status: "completed",
  },
  {
    stage: 3,
    title: "Interactive World Map",
    description: "Choropleth demographic world map powered by react-simple-maps and TopoJSON 110m.",
    deliverables: ["Vector choropleth map (177 geometries)", "Dynamic hover tooltips & metric switches", "Country profile drill-down panel", "ISO-3 matching audit (100% coverage)"],
    status: "completed",
  },
  {
    stage: 4,
    title: "Comparison Engine & Trends",
    description: "Multi-country side-by-side comparison with Recharts dynamic historical curve rendering.",
    deliverables: [
      "Multi-country selector (2–5 nations)",
      "4 World Bank indicators side-by-side",
      "1960–2024 dynamic historical curves",
      "Recharts with tooltips, legend toggle & log scale",
    ],
    status: "completed",
  },
  {
    stage: 5,
    title: "CSV Export & Production Deploy",
    description: "Data export pipeline, Accessibility audit, and Vercel release readiness.",
    deliverables: [
      "Direct browser CSV download (BOM UTF-8)",
      "Comparison, Historical & Map datasets",
      "Web Accessibility & Contrast Compliance",
      "Vercel production deploy readiness",
    ],
    status: "completed",
  },
];

export function RoadmapTracker() {
  return (
    <div id="roadmap-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            Engineering Roadmap & Progression
          </h3>
          <p className="text-sm text-muted-foreground">
            Strict step-by-step implementation plan for WORLD POPULATION INTELLIGENCE
          </p>
        </div>
        <Badge variant="outline" className="w-fit text-xs px-3 py-1 font-mono">
          Stage 3 of 5 Completed
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map((s) => {
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
                <CardDescription className="text-xs">
                  {s.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="border-t border-border/40 pt-3 space-y-1.5">
                  <span className="text-[11px] font-medium text-muted-foreground block">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1 text-xs text-foreground/80">
                    {s.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-mono text-[10px] mt-0.5">•</span>
                        <span>{item}</span>
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
