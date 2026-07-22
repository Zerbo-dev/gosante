"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ORDER_STATUS_LABELS } from "@/lib/auth-shared";
import { Loader2, Plus, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface StockRow {
  id: string;
  pharmacy_id: string;
  medication_dci: string;
  designation: string | null;
  dosage: string | null;
  quantity: number;
  unit_price: number | null;
  updated_at: string;
}

interface PharmacyAssignment {
  pharmacy_id: string;
  pharmacies: { id: string; name: string; city: string } | null;
}

interface OrderRow {
  id: string;
  status: string;
  payment_status: string;
  total_amount: number;
  delivery_address: string | null;
  livreur_id: string | null;
  created_at: string;
  order_items: { medication_dci: string; quantity: number }[];
}

export function PharmacistModule() {
  const supabase = createClient();
  const [assignments, setAssignments] = useState<PharmacyAssignment[]>([]);
  const [pharmacyId, setPharmacyId] = useState<string | null>(null);
  const [stock, setStock] = useState<StockRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ dci: "", designation: "", dosage: "", quantity: "0", price: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [msgTone, setMsgTone] = useState<"success" | "warning">("success");

  const loadStock = useCallback(async (pid: string) => {
    const { data } = await supabase
      .from("pharmacy_stock")
      .select("*")
      .eq("pharmacy_id", pid)
      .order("medication_dci");
    setStock((data as StockRow[]) ?? []);
  }, [supabase]);

  const loadOrders = useCallback(async (pid: string) => {
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(medication_dci, quantity)")
      .eq("pharmacy_id", pid)
      .in("status", ["pending", "confirmed", "preparing", "ready"])
      .order("created_at", { ascending: false });
    setOrders((data as OrderRow[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    async function init() {
      const { data: staff } = await supabase
        .from("pharmacy_staff")
        .select("pharmacy_id, pharmacies(id, name, city)");
      const rows = (staff ?? []).map((row) => ({
        pharmacy_id: row.pharmacy_id,
        pharmacies: Array.isArray(row.pharmacies) ? row.pharmacies[0] ?? null : row.pharmacies,
      })) as PharmacyAssignment[];
      setAssignments(rows);
      const pid = rows[0]?.pharmacy_id ?? null;
      setPharmacyId(pid);
      if (pid) {
        await Promise.all([loadStock(pid), loadOrders(pid)]);
      }
      setLoading(false);
    }
    init();
  }, [supabase, loadStock, loadOrders]);

  useEffect(() => {
    if (!pharmacyId) return;
    let channel: RealtimeChannel;
    channel = supabase
      .channel(`stock-${pharmacyId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pharmacy_stock", filter: `pharmacy_id=eq.${pharmacyId}` },
        () => loadStock(pharmacyId)
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders", filter: `pharmacy_id=eq.${pharmacyId}` },
        () => loadOrders(pharmacyId)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pharmacyId, supabase, loadStock, loadOrders]);

  async function handleAddStock(e: React.FormEvent) {
    e.preventDefault();
    if (!pharmacyId || !form.dci.trim()) return;
    setSaving(true);
    setMsg(null);

    const { error } = await supabase.from("pharmacy_stock").upsert(
      {
        pharmacy_id: pharmacyId,
        medication_dci: form.dci.trim(),
        designation: form.designation || null,
        dosage: form.dosage || null,
        quantity: parseInt(form.quantity, 10) || 0,
        unit_price: form.price ? parseFloat(form.price) : null,
      },
      { onConflict: "pharmacy_id,medication_dci" }
    );

    setSaving(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setForm({ dci: "", designation: "", dosage: "", quantity: "0", price: "" });
    setMsg("Stock mis à jour");
    loadStock(pharmacyId);
  }

  async function updateQty(row: StockRow, delta: number) {
    const qty = Math.max(0, row.quantity + delta);
    await supabase.from("pharmacy_stock").update({ quantity: qty }).eq("id", row.id);
    loadStock(pharmacyId!);
  }

  async function deleteRow(id: string) {
    await supabase.from("pharmacy_stock").delete().eq("id", id);
    loadStock(pharmacyId!);
  }

  async function updateOrderStatus(orderId: string, status: string) {
    if (status === "ready") {
      const res = await fetch("/api/orders/ready", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      setMsg(data.assignMessage ?? (res.ok ? "Commande prête" : data.error));
      setMsgTone(data.waitingForLivreur ? "warning" : "success");
      if (pharmacyId) loadOrders(pharmacyId);
      return;
    }
    await supabase.from("orders").update({ status }).eq("id", orderId);
    if (pharmacyId) loadOrders(pharmacyId);
  }

  if (loading) {
    return (
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
        </div>
    );
  }

  if (!pharmacyId) {
    return (
        <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-8 text-center">
          <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-amber-600" />
          <h1 className="text-lg font-semibold text-slate-900">Aucune pharmacie assignée</h1>
          <p className="mt-2 text-sm text-slate-600">
            Contactez un administrateur pour vous rattacher à une pharmacie.
          </p>
        </div>
    );
  }

  const pharmacyName = assignments.find((a) => a.pharmacy_id === pharmacyId)?.pharmacies?.name ?? "Pharmacie";

  return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Espace pharmacien</h1>
            <p className="truncate text-sm text-slate-600 sm:text-base">
              {pharmacyName} — stocks temps réel
            </p>
          </div>
          {assignments.length > 1 && (
            <select
              value={pharmacyId}
              onChange={(e) => {
                setPharmacyId(e.target.value);
                loadStock(e.target.value);
                loadOrders(e.target.value);
              }}
              className="rounded-lg border px-3 py-2 text-sm"
            >
              {assignments.map((a) => (
                <option key={a.pharmacy_id} value={a.pharmacy_id}>
                  {a.pharmacies?.name}
                </option>
              ))}
            </select>
          )}
          <button
            type="button"
            onClick={() => { loadStock(pharmacyId); loadOrders(pharmacyId); }}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
          >
            <RefreshCw className="h-4 w-4" /> Actualiser
          </button>
        </div>

        {msg && (
          <div
            className={`rounded-lg px-4 py-2 text-sm ${
              msgTone === "warning"
                ? "bg-amber-50 text-amber-900"
                : "bg-emerald-50 text-emerald-800"
            }`}
          >
            {msg}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 font-semibold text-slate-900">Stocks médicaments</h2>
            <form onSubmit={handleAddStock} className="mb-4 grid gap-2 sm:grid-cols-2">
              <input
                placeholder="DCI *"
                value={form.dci}
                onChange={(e) => setForm({ ...form, dci: e.target.value })}
                className="rounded-lg border px-3 py-2 text-sm"
                required
              />
              <input
                placeholder="Désignation"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                className="rounded-lg border px-3 py-2 text-sm"
              />
              <input
                placeholder="Dosage"
                value={form.dosage}
                onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                className="rounded-lg border px-3 py-2 text-sm"
              />
              <input
                type="number"
                min={0}
                placeholder="Quantité"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="rounded-lg border px-3 py-2 text-sm"
              />
              <input
                type="number"
                min={0}
                placeholder="Prix unitaire FCFA"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="rounded-lg border px-3 py-2 text-sm"
              />
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white"
              >
                <Plus className="h-4 w-4" /> {saving ? "…" : "Ajouter / mettre à jour"}
              </button>
            </form>

            <div className="max-h-96 space-y-2 overflow-y-auto">
              {stock.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-500">Aucun stock enregistré</p>
              )}
              {stock.map((row) => (
                <div key={row.id} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{row.medication_dci}</div>
                    <div className="text-xs text-slate-500">
                      {row.designation} {row.dosage && `· ${row.dosage}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => updateQty(row, -1)} className="rounded border px-2 py-1">−</button>
                    <span className={`min-w-[2rem] text-center font-semibold ${row.quantity <= 5 ? "text-red-600" : ""}`}>
                      {row.quantity}
                    </span>
                    <button type="button" onClick={() => updateQty(row, 1)} className="rounded border px-2 py-1">+</button>
                  </div>
                  <button type="button" onClick={() => deleteRow(row.id)} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 font-semibold text-slate-900">Commandes à traiter</h2>
            <div className="space-y-3">
              {orders.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-500">Aucune commande en cours</p>
              )}
              {orders.map((order) => (
                <div key={order.id} className="rounded-xl border p-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-medium">#{order.id.slice(0, 8)}</span>
                    <span className="text-xs text-slate-500">
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </div>
                  <ul className="mt-2 text-sm text-slate-600">
                    {order.order_items?.map((it, i) => (
                      <li key={i}>{it.quantity}× {it.medication_dci}</li>
                    ))}
                  </ul>
                  {order.delivery_address && (
                    <p className="mt-1 text-xs text-slate-500">📍 {order.delivery_address}</p>
                  )}
                  {order.status === "ready" && !order.livreur_id && (
                    <p className="mt-2 rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-800">
                      Aucun livreur en ligne — assignation automatique à la connexion d&apos;un livreur.
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {order.status === "pending" && (
                      <StatusBtn label="Confirmer" onClick={() => updateOrderStatus(order.id, "confirmed")} />
                    )}
                    {["pending", "confirmed"].includes(order.status) && (
                      <StatusBtn label="Préparer" onClick={() => updateOrderStatus(order.id, "preparing")} />
                    )}
                    {["preparing", "confirmed"].includes(order.status) && (
                      <StatusBtn label="Prête" onClick={() => updateOrderStatus(order.id, "ready")} primary />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
  );
}

function StatusBtn({ label, onClick, primary }: { label: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
        primary ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}
