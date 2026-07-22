"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { LocateFixed, Maximize2, Minus, Plus } from "lucide-react";
import type { LatLng } from "@/lib/routing";
import { MAP_TILE } from "./mapTheme";

export function BaseTileLayer() {
  return (
    <TileLayer
      attribution={MAP_TILE.attribution}
      url={MAP_TILE.url}
      maxZoom={MAP_TILE.maxZoom}
    />
  );
}

/** Recalcule la taille Leaflet après montage / resize */
export function InvalidateSizeOnMount({ deps = [] as unknown[] }: { deps?: unknown[] }) {
  const map = useMap();
  useEffect(() => {
    const t = window.setTimeout(() => map.invalidateSize(), 60);
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional external deps
  }, [map, ...deps]);
  return null;
}

export function FitToPoints({
  points,
  padding = 56,
  maxZoom = 16,
  enabled = true,
  trigger = 0,
}: {
  points: (LatLng | null | undefined)[];
  padding?: number;
  maxZoom?: number;
  enabled?: boolean;
  /** Incrémente pour forcer un re-cadrage */
  trigger?: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (!enabled) return;
    const valid = points.filter(
      (p): p is LatLng => !!p && Number.isFinite(p.lat) && Number.isFinite(p.lng)
    );
    if (valid.length === 0) return;
    if (valid.length === 1) {
      map.flyTo([valid[0].lat, valid[0].lng], Math.min(Math.max(map.getZoom() || 14, 14), maxZoom), {
        duration: 0.55,
      });
      return;
    }
    const bounds = L.latLngBounds(valid.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [padding, padding], maxZoom, animate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- trigger drives refit; points read at call time
  }, [map, enabled, padding, maxZoom, trigger]);
  return null;
}

/**
 * Contrôles flottants style Maps (zoom +, −, recentrer, cadrer).
 * Rendus en portal dans le container Leaflet pour rester au-dessus des tuiles.
 */
export function MapFloatingControls({
  onLocate,
  locateDisabled,
  onFit,
  showFit = false,
}: {
  onLocate?: () => void;
  locateDisabled?: boolean;
  onFit?: () => void;
  showFit?: boolean;
}) {
  const map = useMap();
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = map.getContainer();
    let root = el.querySelector(".gs-map-controls") as HTMLElement | null;
    if (!root) {
      root = document.createElement("div");
      root.className = "gs-map-controls";
      el.appendChild(root);
    }
    setHost(root);
    map.zoomControl?.remove();
  }, [map]);

  if (!host) return null;

  return createPortal(
    <div className="gs-map-controls-inner" role="group" aria-label="Contrôles carte">
      <div className="gs-map-ctrl-stack">
        <button
          type="button"
          className="gs-map-ctrl-btn"
          aria-label="Zoom avant"
          onClick={() => map.zoomIn()}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          className="gs-map-ctrl-btn"
          aria-label="Zoom arrière"
          onClick={() => map.zoomOut()}
        >
          <Minus className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
      {(onLocate || showFit) && (
        <div className="gs-map-ctrl-stack">
          {onLocate && (
            <button
              type="button"
              className="gs-map-ctrl-btn"
              aria-label="Ma position"
              disabled={locateDisabled}
              onClick={onLocate}
            >
              <LocateFixed className="h-4 w-4" strokeWidth={2.5} />
            </button>
          )}
          {showFit && onFit && (
            <button
              type="button"
              className="gs-map-ctrl-btn"
              aria-label="Cadrer l'itinéraire"
              onClick={onFit}
            >
              <Maximize2 className="h-4 w-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
      )}
    </div>,
    host
  );
}
