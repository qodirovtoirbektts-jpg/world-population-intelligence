import { Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onReset }: MapControlsProps) {
  return (
    <div className="flex flex-col gap-1.5 p-1.5 rounded-xl bg-card/80 border border-border/80 shadow-lg backdrop-blur-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        className="h-8 w-8 hover:bg-muted text-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        title="Zoom In (+)"
        aria-label="Zoom In"
      >
        <Plus className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        className="h-8 w-8 hover:bg-muted text-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        title="Zoom Out (-)"
        aria-label="Zoom Out"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="h-8 w-8 hover:bg-muted text-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        title="Reset Map Position"
        aria-label="Reset Map"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
