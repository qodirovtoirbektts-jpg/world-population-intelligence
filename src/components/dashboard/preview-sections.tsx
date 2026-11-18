import { GitCompare, Download, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PreviewSections() {
  return (
    <div id="compare-section" className="space-y-4">
      {/* Comparison Engine Preview Card */}
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
          <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 text-xs">
            Scheduled for Stage 4
          </Badge>
        </div>
        <CardHeader>
          <div className="flex items-center gap-2.5 text-indigo-400 mb-1">
            <GitCompare className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-wider">Comparative Analytics</span>
          </div>
          <CardTitle className="text-lg">Multi-Country Comparison Engine</CardTitle>
          <CardDescription>
            Side-by-side demographic evaluation engine allowing users to cross-analyze up to 4 countries simultaneously with Recharts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-44 w-full rounded-xl border border-dashed border-border/80 bg-secondary/30 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
              <GitCompare className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                Historical Trend & Growth Trajectory Curves
              </p>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                Historical timeline (1960–2025) comparing population acceleration, fertility rate, and urban migration.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[11px] font-mono">
                Recharts SVG Engine
              </Badge>
              <Badge variant="secondary" className="text-[11px] font-mono">
                Multi-Country Selector
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
