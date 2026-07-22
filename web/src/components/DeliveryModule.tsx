"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { NavigationMap } from "@/components/maps/NavigationMap";
import { ORDER_STATUS_LABELS } from "@/lib/auth-shared";
import {
  isSameRouteAsAny,
  MAX_ACTIVE_DELIVERIES,
  SAME_ROUTE_KM,
  type RoutePoint,
} from "@/lib/geo";
import {
  KeyRound,
  Loader2,
  MapPin,
  Package,
  Phone,
  Power,
  RefreshCw,
  Truck,
} from "lucide-react";

type Tab = "mission" | "file" | "historique";

interface OrderRow {
  id: string;
  status: string;
  pharmacy_id?: string | null;
  payment_status: string;
  payment_method: string;
  total_amount: number;
  delivery_address: string | null;
  delivery_phone: string | null;
  delivery_lat: number | null;
  delivery_lng: number | null;
  urgency_level: string;
  created_at: string;
  pharmacies: {
    name: string;
    address: string | null;
    city: string;
    latitude: number;
    longitude: number;
  } | null;
  order_items: { medication_dci: string; quantity: number }[];
}

function toRoutePoint(o: OrderRow): RoutePoint {
  return {
    pharmacyId: o.pharmacy_id ?? null,
    pharmacyLat: o.pharmacies?.latitude ?? null,
    pharmacyLng: o.pharmacies?.longitude ?? null,
    deliveryLat: o.delivery_lat,
    deliveryLng: o.delivery_lng,
  };
}

export function DeliveryModule() {
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("mission");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [online, setOnline] = useState(false);
  const [presenceError, setPresenceError] = useState<string | null>(null);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }
    setUserId(user.id);

    const { data: prof } = await supabase
      .from("profiles")
      .select("livreur_online")
      .eq("id", user.id)
      .single();
    setOnline(Boolean(prof?.livreur_online));

    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, pharmacies(name, address, city, latitude, longitude), order_items(medication_dci, quantity)"
      )
      .eq("livreur_id", user.id)
      .in("status", ["ready", "delivering", "completed"])
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    setOrders((data as OrderRow[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();

    let debounce: number | null = null;
    const softReload = () => {
      if (debounce) window.clearTimeout(debounce);
      debounce = window.setTimeout(() => void load({ silent: true }), 350);
    };

    const channel = supabase
      .channel("livreur-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, softReload)
      .subscribe();

    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") softReload();
    }, 20_000);

    return () => {
      if (debounce) window.clearTimeout(debounce);
      window.clearInterval(poll);
      supabase.removeChannel(channel);
    };
  }, [supabase, load]);

  // GPS + présence toutes les 20 s quand en ligne
  useEffect(() => {
    if (!online || !userId) return;
    let watchId: number | null = null;

    const push = (lat: number, lng: number, heading?: number) => {
      fetch("/api/livreur/presence", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ online: true, lat, lng, heading }),
      }).catch(() => {});
    };

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          push(pos.coords.latitude, pos.coords.longitude, pos.coords.heading ?? undefined);
          setPresenceError(null);
        },
        () => setPresenceError("GPS requis pour rester en ligne"),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    }

    return () => {
      if (watchId != null) navigator.geolocation.clearWatch(watchId);
    };
  }, [online, userId]);

  async function toggleOnline() {
    if (!online) {
      if (!navigator.geolocation) {
        setPresenceError("Géolocalisation non supportée");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const res = await fetch("/api/livreur/presence", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              online: true,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }),
          });
          const d = await res.json().catch(() => ({}));
          if (res.ok) {
            setOnline(true);
            setPresenceError(
              d.pendingAssigned > 0
                ? `${d.pendingAssigned} commande(s) assignée(s)`
                : null
            );
            await load();
          } else {
            setPresenceError(d.error ?? "Erreur");
          }
        },
        () => setPresenceError("Autorisez le GPS pour vous mettre en ligne")
      );
    } else {
      await fetch("/api/livreur/presence", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ online: false }),
      });
      setOnline(false);
    }
  }

  const deliveringOrders = orders.filter((o) => o.status === "delivering");
  const activeOrders = orders.filter(
    (o) => o.status === "delivering" || o.status === "ready"
  );
  const delivering = deliveringOrders[0] ?? null;
  const ready = orders.filter((o) => o.status === "ready");
  const done = orders.filter((o) => o.status === "completed");

  const missionDest = useMemo(() => {
    if (!delivering?.delivery_lat || !delivering.delivery_lng) return null;
    return { lat: delivering.delivery_lat, lng: delivering.delivery_lng };
  }, [delivering]);

  const pharmacyWaypoint = useMemo(() => {
    const pts: { lat: number; lng: number }[] = [];
    for (const o of deliveringOrders) {
      const p = o.pharmacies;
      if (p?.latitude != null && p?.longitude != null) {
        pts.push({ lat: p.latitude, lng: p.longitude });
      }
      // Autres destinations livraisons en waypoints (sauf la 1ʳᵉ = destination carte)
      if (
        o.id !== delivering?.id &&
        o.delivery_lat != null &&
        o.delivery_lng != null
      ) {
        pts.push({ lat: o.delivery_lat, lng: o.delivery_lng });
      }
    }
    return pts;
  }, [deliveringOrders, delivering]);

  const multiStopMarkers = useMemo(() => {
    return deliveringOrders.flatMap((o, i) => {
      const markers: {
        id: string;
        lat: number;
        lng: number;
        label: string;
        color: "emerald" | "blue" | "amber" | "red";
      }[] = [];
      if (o.pharmacies?.latitude != null && o.pharmacies?.longitude != null) {
        markers.push({
          id: `ph-${o.id}`,
          lat: o.pharmacies.latitude,
          lng: o.pharmacies.longitude,
          label: o.pharmacies.name,
          color: "blue",
        });
      }
      if (o.delivery_lat != null && o.delivery_lng != null) {
        markers.push({
          id: `dest-${o.id}`,
          lat: o.delivery_lat,
          lng: o.delivery_lng,
          label: `Stop ${i + 1}`,
          color: i === 0 ? "emerald" : "amber",
        });
      }
      return markers;
    });
  }, [deliveringOrders]);

  function canStartAlongside(candidate: OrderRow): boolean {
    if (deliveringOrders.length === 0) return true;
    if (activeOrders.length >= MAX_ACTIVE_DELIVERIES) return false;
    return isSameRouteAsAny(deliveringOrders.map(toRoutePoint), toRoutePoint(candidate));
  }

  async function startDelivery(orderId: string) {
    const candidate = ready.find((o) => o.id === orderId);
    if (!candidate) return;

    if (deliveringOrders.length > 0 && !canStartAlongside(candidate)) {
      setPresenceError(
        `Cette commande n’est pas sur le même trajet (±${SAME_ROUTE_KM} km). Terminez d’abord la mission en cours.`
      );
      setTab("mission");
      return;
    }
    if (activeOrders.length >= MAX_ACTIVE_DELIVERIES) {
      setPresenceError(`Maximum ${MAX_ACTIVE_DELIVERIES} missions en même temps.`);
      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ status: "delivering" })
      .eq("id", orderId)
      .eq("status", "ready")
      .select("id")
      .maybeSingle();
    if (error || !data) {
      setPresenceError(error?.message ?? "Impossible de démarrer la livraison");
      return;
    }
    setPresenceError(null);
    setTab("mission");
    await load();
  }

  return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Livraisons</h1>
            <p className="text-sm text-slate-600">
              {online ? "En ligne — assignation automatique active" : "Hors ligne — activez le GPS"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleOnline}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium ${
                online ? "bg-emerald-600 text-white" : "border bg-white text-slate-700"
              }`}
            >
              <Power className="h-4 w-4" />
              <span className="sm:hidden">{online ? "ON" : "Hors ligne"}</span>
              <span className="hidden sm:inline">{online ? "En ligne" : "Passer en ligne"}</span>
            </button>
            <button
              type="button"
              onClick={() => void load()}
              className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {presenceError && (
          <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">{presenceError}</p>
        )}

        <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-200/70 p-1">
          {(
            [
              { id: "mission" as Tab, label: "Mission", badge: deliveringOrders.length },
              { id: "file" as Tab, label: "File", badge: ready.length },
              { id: "historique" as Tab, label: "Historique", badge: done.length },
            ] as const
          ).map(({ id, label, badge }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`relative rounded-lg py-2.5 text-xs font-medium sm:text-sm ${
                tab === id ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"
              }`}
            >
              {label}
              {badge > 0 && (
                <span className="ml-1 rounded-full bg-emerald-600 px-1.5 text-[10px] text-white">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
          </div>
        )}

        {!loading && tab === "mission" && (
          <div className="space-y-4">
            {deliveringOrders.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">
                <Truck className="mx-auto mb-2 h-10 w-10 text-slate-300" />
                {ready.length > 0
                  ? "Prenez une commande dans l'onglet File"
                  : "Aucune mission en cours. Restez en ligne pour recevoir des assignations."}
              </div>
            ) : (
              <>
                {deliveringOrders.length > 1 && (
                  <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">
                    {deliveringOrders.length} stops sur le trajet — clôturez chaque livraison avec
                    le code patient.
                  </p>
                )}
                {missionDest && delivering && (
                  <NavigationMap
                    destination={missionDest}
                    waypoints={pharmacyWaypoint}
                    extraMarkers={multiStopMarkers}
                  />
                )}
                {deliveringOrders.map((o) => (
                  <OrderCard
                    key={o.id}
                    order={o}
                    onStart={() => {}}
                    onDone={async () => {
                      await load();
                      setTab("historique");
                    }}
                  />
                ))}
              </>
            )}
          </div>
        )}

        {tab === "file" && (
          <div className="space-y-3">
            {deliveringOrders.length > 0 && (
              <p className="rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-900">
                Mission en cours : vous pouvez démarrer une autre commande seulement si elle est
                sur le même trajet (même pharmacie ou ≤ {SAME_ROUTE_KM} km).
              </p>
            )}
            {ready.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">Aucune commande en attente</p>
            ) : (
              ready.map((o) => {
                const ok = canStartAlongside(o);
                return (
                  <OrderCard
                    key={o.id}
                    order={o}
                    onStart={startDelivery}
                    onDone={() => void load()}
                    startDisabled={!ok}
                    startHint={
                      !ok && deliveringOrders.length > 0
                        ? "Hors trajet — terminez d’abord la mission en cours"
                        : undefined
                    }
                  />
                );
              })
            )}
          </div>
        )}

        {tab === "historique" && (
          <div className="space-y-3">
            {done.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">Aucune livraison terminée</p>
            ) : (
              done.slice(0, 20).map((o) => (
                <OrderCard key={o.id} order={o} onStart={() => {}} onDone={() => void load()} readonly />
              ))
            )}
          </div>
        )}
      </div>
  );
}

function OrderCard({
  order,
  onStart,
  onDone,
  readonly,
  startDisabled,
  startHint,
}: {
  order: OrderRow;
  onStart: (id: string) => void;
  onDone: () => void;
  readonly?: boolean;
  startDisabled?: boolean;
  startHint?: string;
}) {
  const [code, setCode] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const urgencyLabel =
    order.urgency_level === "emergency"
      ? "Urgence vitale"
      : order.urgency_level === "urgent"
        ? "Urgent"
        : "Normal";

  async function confirmDelivery() {
    setConfirming(true);
    setError(null);
    const res = await fetch("/api/delivery/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id, code }),
    });
    const data = await res.json();
    setConfirming(false);
    if (!res.ok) {
      setError(data.error ?? "Erreur");
      return;
    }
    setCode("");
    setSuccess(true);
    onDone();
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="font-semibold">#{order.id.slice(0, 8)}</div>
          <div className="text-xs text-slate-500">
            {new Date(order.created_at).toLocaleString("fr-FR")}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              order.urgency_level === "emergency"
                ? "bg-red-100 text-red-800"
                : order.urgency_level === "urgent"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {urgencyLabel}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
            {ORDER_STATUS_LABELS[order.status] ?? order.status}
          </span>
        </div>
      </div>

      {order.pharmacies && (
        <p className="mt-2 text-sm text-slate-700">
          🏥 {order.pharmacies.name} — {order.pharmacies.city}
        </p>
      )}

      <ul className="mt-2 space-y-1 text-sm text-slate-600">
        {order.order_items?.map((it, i) => (
          <li key={i}>
            {it.quantity}× {it.medication_dci}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        {order.delivery_address && (
          <span className="flex items-center gap-1 text-slate-600">
            <MapPin className="h-4 w-4" /> {order.delivery_address}
          </span>
        )}
        {order.delivery_phone && (
          <a href={`tel:${order.delivery_phone}`} className="flex items-center gap-1 text-emerald-700">
            <Phone className="h-4 w-4" /> {order.delivery_phone}
          </a>
        )}
      </div>

      <div className="mt-2 font-semibold text-emerald-700">
        {Number(order.total_amount).toLocaleString("fr-FR")} FCFA
        {order.payment_method === "cash" && (
          <span className="ml-2 text-xs font-normal text-amber-700">— à encaisser</span>
        )}
      </div>

      {!readonly && (
        <div className="mt-4 space-y-3 border-t pt-4">
          {order.status === "ready" && (
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => onStart(order.id)}
                disabled={startDisabled}
                className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6"
              >
                {startDisabled && startHint
                  ? "Indisponible (hors trajet)"
                  : "Démarrer la livraison"}
              </button>
              {startDisabled && startHint && (
                <p className="text-xs text-amber-700">{startHint}</p>
              )}
            </div>
          )}
          {order.status === "delivering" && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <KeyRound className="h-4 w-4" />
                Code patient
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6 chiffres"
                  className="w-36 rounded-lg border px-3 py-2 text-center text-lg tracking-widest"
                />
                <button
                  type="button"
                  onClick={confirmDelivery}
                  disabled={confirming || code.length < 6}
                  className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {confirming ? "…" : "Confirmer livraison"}
                </button>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && (
                <p className="text-sm text-emerald-700">Livraison clôturée — merci !</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
