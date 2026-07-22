"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ORDER_STATUS_LABELS } from "@/lib/auth-shared";
import { Package, CheckCircle, Clock, XCircle, KeyRound, MapPin, Truck } from "lucide-react";
import { RatingForm } from "@/components/RatingForm";
import { MyRatingDisplay, type MyRating } from "@/components/MyRatingDisplay";
import { NavigationMap } from "@/components/maps/NavigationMap";

interface OrderRow {
  id: string;
  status: string;
  payment_status: string;
  payment_method: string;
  total_amount: number;
  delivery_code: string | null;
  delivery_lat: number | null;
  delivery_lng: number | null;
  livreur_lat: number | null;
  livreur_lng: number | null;
  livreur_id: string | null;
  rated_at: string | null;
  urgency_level: string;
  created_at: string;
  pharmacies: { name: string; city: string; latitude?: number; longitude?: number } | null;
  order_items: { medication_dci: string; quantity: number; unit_price: number | null }[];
  my_rating?: MyRating | null;
}

export function OrdersModule() {
  const supabase = createClient();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("orders")
        .select(
          "*, pharmacies(name, city, latitude, longitude), order_items(medication_dci, quantity, unit_price)"
        )
        .order("created_at", { ascending: false });

      const list = (data as OrderRow[]) ?? [];
      const orderIds = list.map((o) => o.id);
      let ratingByOrder = new Map<string, MyRating>();
      if (user && orderIds.length) {
        const { data: ratings } = await supabase
          .from("service_ratings")
          .select("order_id, score, comment, created_at")
          .eq("rater_id", user.id)
          .in("order_id", orderIds);
        ratingByOrder = new Map(
          (ratings ?? [])
            .filter((r) => r.order_id)
            .map((r) => [
              r.order_id as string,
              {
                score: Number(r.score),
                comment: (r.comment as string | null) ?? null,
                created_at: r.created_at as string,
              },
            ])
        );
      }

      setOrders(
        list.map((o) => ({
          ...o,
          my_rating: ratingByOrder.get(o.id) ?? null,
        }))
      );
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel("patient-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Mes commandes</h1>
          <p className="text-sm text-slate-600 sm:text-base">Suivi, code livraison et paiements</p>
        </div>

        {loading && <p className="text-sm text-slate-500">Chargement…</p>}

        {!loading && orders.length === 0 && (
          <div className="rounded-xl border border-dashed p-8 text-center text-slate-500">
            <Package className="mx-auto mb-2 h-10 w-10 text-slate-300" />
            Aucune commande pour le moment
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900">
                    Commande #{order.id.slice(0, 8)}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(order.created_at).toLocaleString("fr-FR")}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge label={ORDER_STATUS_LABELS[order.status] ?? order.status} />
                  <PaymentBadge status={order.payment_status} />
                  {order.urgency_level && order.urgency_level !== "normal" && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.urgency_level === "emergency"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {order.urgency_level === "emergency" ? "Urgence vitale" : "Urgent"}
                    </span>
                  )}
                </div>
              </div>

              {order.pharmacies ? (
                <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {order.pharmacies.name} — {order.pharmacies.city}
                </p>
              ) : (
                <p className="mt-2 text-sm text-amber-700">Pharmacie non assignée (ancienne commande)</p>
              )}

              {order.delivery_code && order.status !== "completed" && order.status !== "cancelled" && (
                <div className="mt-3 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                    <KeyRound className="h-4 w-4" />
                    Code livraison
                  </div>
                  <div className="mt-1 text-3xl font-bold tracking-[0.3em] text-emerald-900">
                    {order.delivery_code}
                  </div>
                  <p className="mt-2 text-xs text-emerald-700">
                    Donnez ce code au livreur à la réception pour confirmer la livraison.
                  </p>
                </div>
              )}

              {!order.livreur_id &&
                ["confirmed", "preparing", "ready"].includes(order.status) && (
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
                    <div className="flex items-start gap-2">
                      <Truck className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>
                        {order.status === "ready"
                          ? "Commande prête chez la pharmacie. En attente d'un livreur en ligne — assignation automatique dès qu'un livreur se connecte."
                          : "Commande en cours de préparation. Un livreur sera assigné automatiquement dès qu'il sera en ligne."}
                      </p>
                    </div>
                  </div>
                )}

              {(order.status === "delivering" || order.status === "ready") &&
                order.livreur_id &&
                order.delivery_lat != null &&
                order.delivery_lng != null && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                      <Truck className="h-4 w-4 text-emerald-600" />
                      {order.status === "delivering"
                        ? "Suivi livreur en temps réel"
                        : "Livreur assigné — en attente de prise en charge"}
                    </div>
                    {order.livreur_lat != null && order.livreur_lng != null ? (
                      <NavigationMap
                        origin={{ lat: order.livreur_lat, lng: order.livreur_lng }}
                        destination={{ lat: order.delivery_lat, lng: order.delivery_lng }}
                        extraMarkers={[
                          {
                            id: "livreur",
                            lat: order.livreur_lat,
                            lng: order.livreur_lng,
                            label: "Livreur",
                            color: "emerald",
                          },
                        ]}
                        followUser={false}
                        className="h-56"
                      />
                    ) : (
                      <p className="text-xs text-slate-500">
                        Position du livreur en cours de mise à jour…
                      </p>
                    )}
                  </div>
                )}

              {order.status === "completed" && !order.rated_at && order.livreur_id && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-medium text-slate-800">
                    Comment s&apos;est passée la livraison ?
                  </p>
                  <RatingForm
                    targetType="livreur"
                    targetId={order.livreur_id}
                    orderId={order.id}
                    onRated={(rating) => {
                      setOrders((prev) =>
                        prev.map((o) =>
                          o.id === order.id
                            ? {
                                ...o,
                                rated_at: new Date().toISOString(),
                                my_rating: rating,
                              }
                            : o
                        )
                      );
                    }}
                  />
                </div>
              )}
              {order.my_rating && (
                <MyRatingDisplay rating={order.my_rating} label="Votre avis sur la livraison" />
              )}
              {order.status === "completed" && order.rated_at && !order.my_rating && (
                <p className="mt-3 text-xs text-slate-500">Vous avez déjà noté cette livraison.</p>
              )}

              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {order.order_items?.map((item, i) => (
                  <li key={i}>
                    {item.quantity}× {item.medication_dci}
                    {item.unit_price != null && (
                      <span className="text-slate-400">
                        {" "}
                        — {(item.unit_price * item.quantity).toLocaleString("fr-FR")} FCFA
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-3 font-semibold text-emerald-700">
                Total : {Number(order.total_amount).toLocaleString("fr-FR")} FCFA
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
      {label}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const map: Record<string, { icon: typeof CheckCircle; className: string; label: string }> = {
    paid: { icon: CheckCircle, className: "bg-emerald-100 text-emerald-800", label: "Payé" },
    pending: { icon: Clock, className: "bg-amber-100 text-amber-800", label: "Paiement en cours" },
    failed: { icon: XCircle, className: "bg-red-100 text-red-800", label: "Échec paiement" },
    unpaid: { icon: Clock, className: "bg-slate-100 text-slate-600", label: "Non payé" },
  };
  const cfg = map[status] ?? map.unpaid;
  const Icon = cfg.icon;
  return (
    <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}
