"use client";

import dynamic from "next/dynamic";
import { MapSkeleton } from "./map-skeleton";

/**
 * Lazy-loaded Interactive Map component complying with bundle-dynamic-imports
 * and vercel-react-best-practices rules (avoiding heavy SVG SSR hydration mismatches).
 */
export const InteractiveWorldMap = dynamic(
  () => import("./map-section").then((mod) => mod.MapSection),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
);
