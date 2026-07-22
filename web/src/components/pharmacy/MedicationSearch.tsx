"use client";

import { useMemo, useState } from "react";
import { searchMedications } from "@/lib/gosante";
import { useCart } from "@/lib/cart";
import type { Medication } from "@/types";
import { Plus, Search, ShoppingCart } from "lucide-react";

export function MedicationSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const { addItem } = useCart();

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchMedications(query, compact ? 8 : 15);
  }, [query, compact]);

  return (
    <div className="min-w-0 max-w-full space-y-3 overflow-x-clip">
      <div className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Médicament (DCI, nom)…"
          className="min-w-0 flex-1 text-sm outline-none"
        />
      </div>

      {query.length >= 2 && results.length === 0 && (
        <p className="text-sm text-slate-500">Aucun médicament trouvé dans la LNME 2023.</p>
      )}

      <div className={`min-w-0 space-y-2 ${compact ? "max-h-64 overflow-y-auto" : ""}`}>
        {results.map((med) => (
          <MedicationRow key={med.designation} med={med} onAdd={() => addItem(med)} />
        ))}
      </div>
    </div>
  );
}

function MedicationRow({ med, onAdd }: { med: Medication; onAdd: () => void }) {
  return (
    <div className="flex min-w-0 max-w-full items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 sm:gap-3">
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="break-words font-medium leading-snug text-slate-900">{med.dci}</div>
        <div className="mt-0.5 line-clamp-2 break-words text-xs text-slate-500">
          {med.designation}
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
          <div className="flex shrink-0 items-center gap-2">
            <input
              type="number"
              min={1}
              max={99}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.key, Number(e.target.value))}
              className="w-12 rounded border px-1.5 py-1 text-center text-sm sm:w-14 sm:px-2"
            />
            <button
              type="button"
              onClick={() => removeItem(item.key)}
              className="text-xs text-red-600 hover:underline"
            >
              Retirer
            </button>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between gap-2 pt-2 font-semibold">
        <span>Total</span>
        <span className="truncate text-emerald-700">
          {total.toLocaleString("fr-FR")} FCFA
        </span>
      </div>
      <button
        type="button"
        disabled={checkoutLoading || disabled}
        onClick={onCheckout}
        className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {checkoutLoading ? "Traitement…" : disabled ? "Choisir une pharmacie" : "Commander"}
      </button>
    </div>
  );
}
