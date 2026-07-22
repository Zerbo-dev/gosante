import L from "leaflet";

/** Ouagadougou — centre par défaut GoSanté */
export const DEFAULT_CENTER = { lat: 12.3714, lng: -1.5197 } as const;

/** Tuiles Carto Voyager — rendu proche des apps Maps modernes */
export const MAP_TILE = {
  url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  maxZoom: 20,
} as const;

export const MAP_COLORS = {
  brand: "#0d9488",
  brandDark: "#0f766e",
  user: "#2563eb",
  userRing: "rgba(37, 99, 235, 0.22)",
  pharmacy: "#0d9488",
  pharmacyDuty: "#ea580c",
  selected: "#dc2626",
  delivery: "#ea580c",
  route: "#0d9488",
  routeCasing: "#ffffff",
  waypoint: "#2563eb",
  emerald: "#059669",
  blue: "#2563eb",
  amber: "#d97706",
  red: "#dc2626",
} as const;

export type MarkerTone = keyof typeof MAP_COLORS | "emerald" | "blue" | "amber" | "red";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Point utilisateur type Google Maps (halo + pastille) */
export function userLocationIcon(heading: number | null = null): L.DivIcon {
  const rot = heading != null && !Number.isNaN(heading) ? heading : null;
  const arrow =
    rot != null
      ? `<div class="gs-user-heading" style="transform:rotate(${rot}deg)">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
             <path d="M12 3l6 16-6-3.5L6 19l6-16z" fill="#1d4ed8" stroke="white" stroke-width="1.5"/>
           </svg>
         </div>`
      : "";

  return L.divIcon({
    className: "gs-map-marker gs-user-marker",
    html: `<div class="gs-user-wrap">
      <span class="gs-user-pulse"></span>
      <span class="gs-user-dot"></span>
      ${arrow}
    </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

/** Pin pharmacie (croix santé) — sélection / garde */
export function pharmacyPinIcon(opts: {
  selected?: boolean;
  onDuty?: boolean;
}): L.DivIcon {
  const selected = !!opts.selected;
  const onDuty = !!opts.onDuty;
  const fill = selected
    ? MAP_COLORS.selected
    : onDuty
      ? MAP_COLORS.pharmacyDuty
      : MAP_COLORS.pharmacy;
  const size = selected ? 42 : 34;
  const anchorY = size;

  return L.divIcon({
    className: `gs-map-marker gs-pharmacy-marker${selected ? " is-selected" : ""}`,
    html: `<div class="gs-pin" style="--pin:${fill};width:${size}px;height:${size}px">
      <svg viewBox="0 0 40 48" width="${size}" height="${size}" aria-hidden="true">
        <path d="M20 2C11.7 2 5 8.7 5 17c0 11.2 15 29 15 29s15-17.8 15-29C35 8.7 28.3 2 20 2z" fill="var(--pin)" stroke="#fff" stroke-width="2"/>
        <rect x="17" y="11" width="6" height="16" rx="1.5" fill="#fff"/>
        <rect x="12" y="16" width="16" height="6" rx="1.5" fill="#fff"/>
      </svg>
      ${selected ? '<span class="gs-pin-shadow"></span>' : ""}
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, anchorY - 2],
    popupAnchor: [0, -size + 8],
  });
}

/** Pin destination / livraison (goutte) */
export function dropPinIcon(color: string = MAP_COLORS.delivery, label?: string): L.DivIcon {
  const safe = label ? escapeHtml(label) : "";
  return L.divIcon({
    className: "gs-map-marker gs-drop-marker",
    html: `<div class="gs-drop-pin" style="--pin:${color}">
      <svg viewBox="0 0 36 44" width="36" height="44" aria-hidden="true">
        <path d="M18 2C10.3 2 4 8.3 4 16c0 10.5 14 26 14 26s14-15.5 14-26C32 8.3 25.7 2 18 2z" fill="var(--pin)" stroke="#fff" stroke-width="2"/>
        <circle cx="18" cy="16" r="5.5" fill="#fff"/>
      </svg>
      ${safe ? `<span class="gs-marker-badge">${safe}</span>` : ""}
    </div>`,
    iconSize: [36, 44],
    iconAnchor: [18, 42],
    popupAnchor: [0, -36],
  });
}

/** Pastille numérotée (arrêts / waypoints) */
export function stopBadgeIcon(index: number, color: string = MAP_COLORS.waypoint): L.DivIcon {
  return L.divIcon({
    className: "gs-map-marker gs-stop-marker",
    html: `<div class="gs-stop-badge" style="--pin:${color}">${index}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

/** Dot coloré compact (extra markers navigation) */
export function toneDotIcon(tone: string = "emerald"): L.DivIcon {
  const color =
    (MAP_COLORS as Record<string, string>)[tone] ?? MAP_COLORS.emerald;
  return L.divIcon({
    className: "gs-map-marker gs-dot-marker",
    html: `<div class="gs-tone-dot" style="--pin:${color}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });
}

export function popupHtml(title: string, subtitle?: string | null, meta?: string | null) {
  const sub = subtitle ? `<p class="gs-popup-sub">${escapeHtml(subtitle)}</p>` : "";
  const m = meta ? `<p class="gs-popup-meta">${escapeHtml(meta)}</p>` : "";
  return `<div class="gs-popup"><p class="gs-popup-title">${escapeHtml(title)}</p>${sub}${m}</div>`;
}
