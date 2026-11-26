"use client";

import { Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/language";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onReset }: MapControlsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 p-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-blue-200 dark:border-slate-700 shadow-md backdrop-blur-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        className="h-8 w-8 rounded-lg hover:bg-blue-50 text-slate-700 dark:text-slate-200 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
        title={t.centerpiece.globeZoomIn}
        aria-label={t.centerpiece.globeZoomIn}
      >
        <Plus className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        className="h-8 w-8 rounded-lg hover:bg-blue-50 text-slate-700 dark:text-slate-200 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
        title={t.centerpiece.globeZoomOut}
        aria-label={t.centerpiece.globeZoomOut}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="h-8 w-8 rounded-lg hover:bg-blue-50 text-slate-700 dark:text-slate-200 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
        title={t.centerpiece.globeReset}
        aria-label={t.centerpiece.globeReset}
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
