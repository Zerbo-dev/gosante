"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ORDER_STATUS_LABELS } from "@/lib/auth-shared";
import { Download, FileSpreadsheet, Loader2, Plus, RefreshCw, ShieldCheck, Trash2, Upload } from "lucide-react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

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
  const [importing, setImporting] = useState(false);
  const [replaceOnImport, setReplaceOnImport] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
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

    const dci = form.dci.trim();
    const dosage = form.dosage.trim() || null;
    const medication_dci = dosage ? `${dci} — ${dosage}` : dci;

    const { error } = await supabase.from("pharmacy_stock").upsert(
      {
        pharmacy_id: pharmacyId,
        medication_dci,
        designation: form.designation || dci,
        dosage,
        quantity: parseInt(form.quantity, 10) || 0,
        unit_price: form.price ? parseFloat(form.price) : null,
      },
      { onConflict: "pharmacy_id,medication_dci" }
    );

    setSaving(false);
    if (error) {
      setMsg(error.message);
      setMsgTone("warning");
      return;
    }
    setForm({ dci: "", designation: "", dosage: "", quantity: "0", price: "" });
    setMsg("Stock mis à jour");
    setMsgTone("success");
    loadStock(pharmacyId);
  }

  function normalizeHeader(h: string): string {
    return h
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
  }

  function mapImportRow(raw: Record<string, unknown>) {
    const mapped: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(raw)) {
      mapped[normalizeHeader(k)] = v;
    }
    const dci =
      mapped.dci ??
      mapped.medication_dci ??
      mapped.principe_actif ??
      mapped.nom ??
      mapped.medicament;
    const designation = mapped.designation ?? mapped.libelle ?? mapped.produit ?? dci;
    const dosage = mapped.dosage ?? mapped.dose ?? mapped.posologie ?? null;
    const quantity = mapped.quantity ?? mapped.quantite ?? mapped.qty ?? mapped.stock ?? 0;
    const unit_price =
      mapped.unit_price ?? mapped.prix ?? mapped.prix_unitaire ?? mapped.pvp ?? mapped.price ?? null;
    return {
      dci: dci != null ? String(dci).trim() : "",
      designation: designation != null ? String(designation).trim() : null,
      dosage: dosage != null && String(dosage).trim() ? String(dosage).trim() : null,
      quantity: Number(quantity) || 0,
      unit_price:
        unit_price === null || unit_price === undefined || unit_price === ""
          ? null
          : Number(unit_price),
    };
  }

  async function handleImportFile(file: File) {
    if (!pharmacyId) return;
    setImporting(true);
    setMsg(null);
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
      const rows = json.map(mapImportRow).filter((r) => r.dci);
      if (rows.length === 0) {
        setMsg("Fichier vide ou colonnes non reconnues (il faut une colonne dci / médicament).");
        setMsgTone("warning");
        setImporting(false);
        return;
      }

      const res = await fetch("/api/stock/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pharmacyId,
          rows,
          mode: replaceOnImport ? "replace" : "upsert",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || "Import impossible");
        setMsgTone("warning");
      } else {
        setMsg(
          `${data.imported} ligne(s) importée(s)${
            replaceOnImport ? " (stock remplacé)" : " (fusionnées)"
          }.`
        );
        setMsgTone("success");
        loadStock(pharmacyId);
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erreur lecture fichier");
      setMsgTone("warning");
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
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

            <div className="mb-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-900">
                <FileSpreadsheet className="h-4 w-4" />
                Import Excel / CSV
              </div>
              <p className="mb-3 text-xs text-slate-600">
                Colonnes acceptées : <code>dci</code>, <code>designation</code>, <code>dosage</code>,{" "}
                <code>quantity</code> (ou quantité), <code>unit_price</code> (ou prix).
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/templates/stock-import-modele.csv"
                  download
                  className="inline-flex items-center gap-1 rounded-lg border bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  <Download className="h-3.5 w-3.5" /> Modèle CSV
                </a>
                <label className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white">
                  <Upload className="h-3.5 w-3.5" />
                  {importing ? "Import…" : "Charger un fichier"}
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                    disabled={importing}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImportFile(f);
                    }}
                  />
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={replaceOnImport}
                    onChange={(e) => setReplaceOnImport(e.target.checked)}
                  />
                  Remplacer tout le stock
                </label>
              </div>
            </div>

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
                      {row.unit_price != null && ` · ${row.unit_price} FCFA`}
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
