import { resolveGeoToIso3 } from "./country-codes";

export interface CountryGeoTarget {
  iso3: string;
  name: string;
  coordinates: [number, number]; // [lon, lat]
  recommendedScale: number; // Globe projection scale (220 - 1500)
}

interface TopoGeometry {
  type: string;
  id?: string | number;
  properties?: { name?: string };
  arcs?: unknown;
}

interface TopoJsonDoc {
  transform?: {
    scale: [number, number];
    translate: [number, number];
  };
  arcs?: number[][][];
  objects?: {
    countries?: {
      geometries?: TopoGeometry[];
    };
  };
}

function decodeArc(
  arc: number[][],
  scale: [number, number],
  translate: [number, number]
): Array<[number, number]> {
  let x = 0;
  let y = 0;
  const pts: Array<[number, number]> = [];
  for (const pt of arc) {
    x += pt[0];
    y += pt[1];
    pts.push([x * scale[0] + translate[0], y * scale[1] + translate[1]]);
  }
  return pts;
}

function decodeRing(
  ringIndices: number[],
  decodedArcs: Array<Array<[number, number]>>
): Array<[number, number]> {
  const coords: Array<[number, number]> = [];
  for (const idx of ringIndices) {
    const arc = idx < 0 ? [...(decodedArcs[~idx] || [])].reverse() : decodedArcs[idx] || [];
    for (let i = 0; i < arc.length; i++) {
      if (i > 0 || coords.length === 0) {
        coords.push(arc[i]);
      }
    }
  }
  return coords;
}

function ringMetrics(ring: Array<[number, number]>): {
  center: [number, number];
  areaScore: number;
  span: number;
} {
  if (ring.length === 0) {
    return { center: [0, 0], areaScore: 0, span: 0 };
  }
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  let sumLon = 0;
  let sumLat = 0;

  for (const [lon, lat] of ring) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    sumLon += lon;
    sumLat += lat;
  }

  const lonSpan = maxLon - minLon;
  const latSpan = maxLat - minLat;

  // Penalize antimeridian-crossing rings (e.g. > 180 deg span)
  if (lonSpan > 170) {
    return {
      center: [sumLon / ring.length, sumLat / ring.length],
      areaScore: 0.01,
      span: 10,
    };
  }

  // Shoelace area approx for picking mainland polygon over tiny islands/overseas territories
  let area = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    area += x1 * y2 - x2 * y1;
  }
  const absArea = Math.abs(area) * 0.5;
  const center: [number, number] = [(minLon + maxLon) / 2, (minLat + maxLat) / 2];

  return {
    center,
    areaScore: absArea,
    span: Math.max(lonSpan, latSpan),
  };
}

/**
 * Extracts accurate [lon, lat] center coordinates and recommended globe zoom scale
 * for all 177+ countries directly from TopoJSON 110m data.
 */
export function buildCountryGeoTargets(topo: TopoJsonDoc): Record<string, CountryGeoTarget> {
  const result: Record<string, CountryGeoTarget> = {};
  const geometries = topo?.objects?.countries?.geometries || [];
  const rawArcs = topo?.arcs || [];
  const scale = topo?.transform?.scale || [1, 1];
  const translate = topo?.transform?.translate || [0, 0];

  const decodedArcs = rawArcs.map((arc) => decodeArc(arc, scale, translate));

  for (const geom of geometries) {
    const geoName = geom.properties?.name || "Unknown";
    const iso3 = resolveGeoToIso3(geom.id, geoName);
    if (!iso3) continue;

    const outerRings: number[][] = [];
    if (geom.type === "Polygon" && Array.isArray(geom.arcs)) {
      const poly = geom.arcs as number[][];
      if (poly[0]) outerRings.push(poly[0]);
    } else if (geom.type === "MultiPolygon" && Array.isArray(geom.arcs)) {
      const mpoly = geom.arcs as number[][][];
      for (const poly of mpoly) {
        if (poly[0]) outerRings.push(poly[0]);
      }
    }

    if (outerRings.length === 0) continue;

    let bestRingMetrics = ringMetrics(decodeRing(outerRings[0], decodedArcs));
    for (let i = 1; i < outerRings.length; i++) {
      const m = ringMetrics(decodeRing(outerRings[i], decodedArcs));
      if (m.areaScore > bestRingMetrics.areaScore) {
        bestRingMetrics = m;
      }
    }

    const span = Math.max(1.5, bestRingMetrics.span);
    // Compute comfortable globe scale so country fills nicely into view (capped 320..1250)
    const idealScale = Math.round(Math.min(1250, Math.max(320, 2400 / Math.sqrt(span))));

    result[iso3] = {
      iso3,
      name: geoName,
      coordinates: bestRingMetrics.center,
      recommendedScale: idealScale,
    };
  }

  // Fine-tuned focal points for countries with wide island arcs / key capitals
  if (result["UZB"]) {
    result["UZB"] = { ...result["UZB"], coordinates: [64.5, 41.3], recommendedScale: 680 };
  }
  if (result["USA"]) {
    result["USA"] = { ...result["USA"], coordinates: [-98.5, 39.5], recommendedScale: 340 };
  }
  if (result["FRA"]) {
    result["FRA"] = { ...result["FRA"], coordinates: [2.4, 46.6], recommendedScale: 720 };
  }
  if (result["RUS"]) {
    result["RUS"] = { ...result["RUS"], coordinates: [90, 61], recommendedScale: 290 };
  }

  return result;
}
