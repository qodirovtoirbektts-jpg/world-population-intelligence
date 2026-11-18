import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Database, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  indicatorCode: string;
  icon: React.ReactNode;
  description: string;
  value: string;
  year?: string | null;
  source?: string;
  isAvailable?: boolean;
  notes?: string;
  className?: string;
}

export function StatCard({
  title,
  indicatorCode,
  icon,
  description,
  value,
  year,
  source = "World Bank WDI",
  isAvailable = true,
  notes,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden group hover:border-primary/50 transition-all shadow-md bg-card/70",
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/80 text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          {icon}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Real Metric Value from World Bank API */}
        <div className="flex items-baseline justify-between gap-2">
          {isAvailable ? (
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-foreground">
                {value}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-amber-400 text-sm font-medium">
              <AlertTriangle className="h-4 w-4" />
              <span>Data pending</span>
            </div>
          )}

          <Badge
            variant="outline"
            className="font-mono text-[10px] text-muted-foreground border-border/80"
          >
            {indicatorCode}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Year, Source & Live Indicator Footer */}
        <div className="pt-3 border-t border-border/40 flex flex-col gap-1.5 text-[11px]">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-blue-400" />
              <span>Reference Year:</span>
            </span>
            <span className="font-semibold text-foreground">
              {year || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1">
              <Database className="h-3 w-3 text-indigo-400" />
              <span>Source:</span>
            </span>
            <span className="text-[10px] text-muted-foreground/90 truncate max-w-[130px]">
              {source}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
              <CheckCircle2 className="h-3 w-3" />
              <span>Verified Official API</span>
            </span>
            {notes && (
              <span className="text-[9px] text-muted-foreground/60 italic">
                {notes}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
