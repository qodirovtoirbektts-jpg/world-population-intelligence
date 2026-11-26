"use client";

import { MapMetricType } from "@/types/map";
import { useTranslation } from "@/components/language";

interface ColorLegendProps {
  metric: MapMetricType;
}

export function ColorLegend({ metric }: ColorLegendProps) {
  const { t } = useTranslation();

  const legendItems =
    metric === "SP.POP.TOTL"
      ? {
          title: t.centerpiece.scalePop,
          bins: [
            { color: "#dbeafe", label: "< 5M" },
            { color: "#93c5fd", label: "5M–25M" },
            { color: "#3b82f6", label: "25M–100M" },
            { color: "#1d4ed8", label: "100M–500M" },
            { color: "#1e3a8a", label: "500M+" },
          ],
        }
      : metric === "EN.POP.DNST"
      ? {
          title: t.centerpiece.scaleDnst,
          bins: [
            { color: "#e0f2fe", label: "< 25" },
            { color: "#7dd3fc", label: "25–75" },
            { color: "#0ea5e9", label: "75–150" },
            { color: "#0369a1", label: "150–350" },
            { color: "#0c4a6e", label: "350+" },
          ],
        }
      : metric === "SP.URB.TOTL.IN.ZS"
      ? {
          title: t.centerpiece.scaleUrb,
          bins: [
            { color: "#e0e7ff", label: "< 30%" },
            { color: "#a5b4fc", label: "30%–50%" },
            { color: "#6366f1", label: "50%–70%" },
            { color: "#4338ca", label: "70%–85%" },
            { color: "#312e81", label: "85%+" },
          ],
        }
      : {
          title: t.centerpiece.scaleGrow,
          bins: [
            { color: "#fca5a5", label: "< 0%" },
            { color: "#dbeafe", label: "0%–1%" },
            { color: "#93c5fd", label: "1%–2%" },
            { color: "#2563eb", label: "2%–3%" },
            { color: "#1e3a8a", label: "3%+" },
          ],
        };

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-slate-600 dark:text-slate-300 bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl shadow-sm">
      <span className="font-semibold text-slate-900 dark:text-slate-100">
        {legendItems.title}
      </span>
      {legendItems.bins.map((bin) => (
        <div key={bin.label} className="flex items-center gap-1.5">
          <span
            className="h-3 w-5 rounded-sm border border-slate-300/60"
            style={{ backgroundColor: bin.color }}
          />
          <span className="tabular-nums">{bin.label}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-700">
        <span className="h-3 w-4 rounded-sm bg-[#e2e8f0] border border-slate-300/70" />
        <span>{t.centerpiece.legendNoData}</span>
      </div>
    </div>
  );
}
