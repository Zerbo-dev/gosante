"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Medication } from "@/types";

export interface CartItem {
  key: string;
  medication: Medication;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (med: Medication, qty?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gosante-cart";

function itemKey(med: Medication) {
  return med.designation || med.dci;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (med: Medication, qty = 1) => {
      const key = itemKey(med);
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + qty } : i
          );
        }
        return [...prev, { key, medication: med, quantity: qty }];
      });
    };

    const removeItem = (key: string) => {
      setItems((prev) => prev.filter((i) => i.key !== key));
    };

    const updateQuantity = (key: string, qty: number) => {
      if (qty <= 0) {
        removeItem(key);
        return;
      }
      setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity: qty } : i)));
    };

    const total = items.reduce(
      (sum, i) => sum + (i.medication.pvp ?? 0) * i.quantity,
      0
    );

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear: () => setItems([]),
      total,
      count: items.reduce((n, i) => n + i.quantity, 0),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function cartKey(med: Medication) {
  return itemKey(med);
}
