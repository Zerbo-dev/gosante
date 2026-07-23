"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import type { Medication } from "@/types";
import { Loader2, Plus, Search, ShoppingCart } from "lucide-react";

export type StockMedication = Medication & {
  quantity?: number;
  pharmacy_id?: string | null;
  pharmacy_name?: string | null;
  pharmacies_count?: number;
};

export function MedicationSearch({
  compact = false,
  pharmacyId = null,
}: {
  compact?: boolean;
  /** Si défini, ne cherche que dans le stock de cette pharmacie */
  pharmacyId?: string | null;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockMedication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q,
          limit: String(compact ? 8 : 15),
        });
        if (pharmacyId) params.set("pharmacyId", pharmacyId);
        const res = await fetch(`/api/medicaments/search?${params}`, {
          signal: ctrl.signal,
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur recherche");
        setResults((data.medications ?? []) as StockMedication[]);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setResults([]);
        setError(e instanceof Error ? e.message : "Erreur recherche");
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => {
      ctrl.abort();
      clearTimeout(t);
    };
  }, [query, compact, pharmacyId]);

  return (
    <div className="min-w-0 max-w-full space-y-3 overflow-x-clip">
      <div className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            pharmacyId
              ? "Médicament disponible dans cette pharmacie…"
              : "Médicament (stock pharmacies démo)…"
          }
          className="min-w-0 flex-1 text-sm outline-none"
        />
        {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-slate-400" />}
      </div>

      {!pharmacyId && (
        <p className="text-xs text-amber-800">
          Astuce démo : choisissez d’abord une pharmacie pour voir son stock réel.
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {query.length >= 2 && !loading && results.length === 0 && !error && (
        <p className="text-sm text-slate-500">
          Aucun médicament en stock
          {pharmacyId ? " dans cette pharmacie" : " dans les pharmacies démo"}.
        </p>
      )}

      <div className={`min-w-0 space-y-2 ${compact ? "max-h-64 overflow-y-auto" : ""}`}>
        {results.map((med) => (
          <MedicationRow
            key={`${med.dci}-${med.dosage}-${med.designation}-${med.pharmacy_id ?? "all"}`}
            med={med}
            onAdd={() => addItem(med)}
          />
        ))}
      </div>
    </div>
  );
}

function MedicationRow({ med, onAdd }: { med: StockMedication; onAdd: () => void }) {
  return (
    <div className="flex min-w-0 max-w-full items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 sm:gap-3">
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="break-words font-medium leading-snug text-slate-900">{med.dci}</div>
        <div className="mt-0.5 line-clamp-2 break-words text-xs text-slate-500">
          {med.designation}
          {med.dosage ? ` · ${med.dosage}` : ""}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {med.quantity != null && (
            <span className={med.quantity <= 5 ? "text-red-600" : "text-slate-600"}>
              Stock {med.quantity}
            </span>
          )}
          {med.pharmacy_name && <span>· {med.pharmacy_name}</span>}
          {!med.pharmacy_name && (med.pharmacies_count ?? 0) > 1 && (
            <span>· {med.pharmacies_count} pharmacies</span>
          )}
        </div>
        {med.pvp != null && (
          <div className="mt-1 text-sm font-semibold text-emerald-700">
            {med.pvp.toLocaleString("fr-FR")} FCFA
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex shrink-0 items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 sm:px-3"
      >
        <Plus className="h-3.5 w-3.5" />
        Panier
      </button>
    </div>
  );
}

export function CartPanel({
  onCheckout,
  checkoutLoading,
  disabled,
}: {
  onCheckout: () => void;
  checkoutLoading?: boolean;
  disabled?: boolean;
}) {
  const { items, removeItem, updateQuantity, total, count } = useCart();

  if (count === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        <ShoppingCart className="mx-auto mb-2 h-8 w-8 text-slate-300" />
        Votre panier est vide
      </div>
    );
  }

  return (
    <div className="min-w-0 max-w-full space-y-3 overflow-x-clip rounded-xl border border-emerald-100 bg-white p-3 sm:p-4">
      <h3 className="font-semibold text-slate-900">Panier ({count})</h3>
      {items.map((item) => (
        <div
          key={item.key}
          className="flex min-w-0 flex-wrap items-center gap-2 border-b border-slate-50 pb-2"
        >
          <div className="min-w-0 flex-1 basis-[min(100%,10rem)]">
            <div className="truncate text-sm font-medium">{item.medication.dci}</div>
            <div className="text-xs text-slate-500">
              {(item.medication.pvp ?? 0).toLocaleString("fr-FR")} FCFA
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              className="rounded border px-2 py-0.5 text-sm"
            >
              −
            </button>
            <span className="min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              className="rounded border px-2 py-0.5 text-sm"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            className="text-xs text-red-600"
          >
            Retirer
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1 font-semibold">
        <span>Total</span>
        <span>{total.toLocaleString("fr-FR")} FCFA</span>
      </div>
      <button
        type="button"
        onClick={onCheckout}
        disabled={checkoutLoading || disabled}
        className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white disabled:opacity-50"
      >
        {checkoutLoading ? "Envoi…" : "Commander"}
      </button>
    </div>
  );
}
