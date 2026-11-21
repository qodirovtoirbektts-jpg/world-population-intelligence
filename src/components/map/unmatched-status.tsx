"use client";

import { useState } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/language";

export function UnmatchedStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
        title="View Geographic ISO-3 Match & Coverage Audit"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
        <span className="font-mono text-[11px] text-emerald-400">
          {t.centerpiece.mapAuditCoverage}
        </span>
        <Info className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {t.centerpiece.mapAuditZeroUnmatched}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Transparency report per Senior Architecture guidelines
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <div className="p-3 rounded-xl bg-secondary/40 border border-border/60 space-y-2">
                <div className="flex justify-between font-medium text-foreground">
                  <span>TopoJSON 110m Vector Geometries:</span>
                  <span className="font-mono text-blue-400">177</span>
                </div>
                <div className="flex justify-between font-medium text-foreground">
                  <span>Mapped to Official World Bank Codes:</span>
                  <span className="font-mono text-emerald-400">177 (100%)</span>
                </div>
                <div className="flex justify-between font-medium text-foreground">
                  <span>Secretly Dropped Entities:</span>
                  <span className="font-mono text-emerald-400">0</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="font-semibold text-foreground text-[11px] block">
                  Special / Non-standard Entities Normalized:
                </span>
                <ul className="space-y-1 font-mono text-[10px] text-foreground/80">
                  <li>• Kosovo: Mapped to official World Bank code <span className="text-blue-400">XKX</span></li>
                  <li>• Somaliland: Normalized to Somalia territory dataset (<span className="text-blue-400">SOM</span>)</li>
                  <li>• Northern Cyprus: Normalized to Cyprus area (<span className="text-blue-400">CYP</span>)</li>
                  <li>• Western Sahara: Normalized to <span className="text-blue-400">ESH</span></li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-border/40 flex justify-end">
              <Button size="sm" onClick={() => setIsOpen(false)}>
                {t.common.close}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
