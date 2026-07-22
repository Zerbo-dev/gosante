"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useDashboardProfile } from "@/components/ProfileProvider";
import { Bell, CheckCheck, Loader2, Trash2, X } from "lucide-react";

type Notif = {
  id: string;
  title: string;
  body: string;
  type: string;
  href: string | null;
  read_at: string | null;
  created_at: string;
};

function maybeBrowserToast(n: Pick<Notif, "title" | "body" | "id">) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  if (document.visibilityState === "visible") return;
  try {
    new Notification(n.title, {
      body: n.body,
      icon: "/logo-gosante.svg",
      tag: n.id,
    });
  } catch {
    /* ignore */
  }
}

export function NotificationBell() {
  const profile = useDashboardProfile();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(false);
  const [browserPerm, setBrowserPerm] = useState<NotificationPermission | "unsupported">(
    "default"
  );
  const panelRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (res.ok) setItems(data.notifications ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!profile) return;
    load();
    if (!("Notification" in window)) {
      setBrowserPerm("unsupported");
    } else {
      setBrowserPerm(Notification.permission);
    }
  }, [profile, load]);

  useEffect(() => {
    if (!profile?.id) return;
    const channel = supabase
      .channel(`notifs-${profile.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${profile.id}`,
        },
        (payload) => {
          const row = payload.new as Notif;
          setItems((prev) => [row, ...prev.filter((x) => x.id !== row.id)].slice(0, 40));
          maybeBrowserToast(row);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id, supabase]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Empêche le scroll de fond uniquement sur mobile (feuille plein largeur)
    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const unread = items.filter((n) => !n.read_at).length;

  async function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_at: n.read_at ?? new Date().toISOString() } : n))
    );
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  async function markAll() {
    setItems((prev) =>
      prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() }))
    );
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAll: true }),
    });
  }

  async function dismiss(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id));
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, delete: true }),
    });
  }

  async function enableBrowser() {
    if (!("Notification" in window)) return;
    const perm = await Notification.requestPermission();
    setBrowserPerm(perm);
    if (perm === "granted") {
      new Notification("GoSanté", {
        body: "Alertes activées — vous serez prévenu même hors de l’onglet.",
        icon: "/logo-gosante.svg",
      });
    }
  }

  if (!profile) return null;

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          if (!open) load();
        }}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-none text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Fond mobile */}
          <button
            type="button"
            aria-label="Fermer les notifications"
            className="fixed inset-0 z-50 bg-slate-900/45 sm:hidden"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-label="Notifications"
            className="fixed inset-x-0 bottom-0 z-[60] flex max-h-[min(88dvh,36rem)] flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:z-50 sm:mt-2 sm:max-h-[min(70vh,28rem)] sm:w-[22rem] sm:rounded-2xl sm:shadow-xl"
          >
            <div className="flex shrink-0 justify-center pt-2 sm:hidden" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 border-b px-3 py-2.5">
              <h2 className="min-w-0 truncate text-sm font-semibold text-slate-900">
                Notifications
              </h2>
              <div className="flex shrink-0 items-center gap-0.5">
                {unread > 0 && (
                  <button
                    type="button"
                    onClick={markAll}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-emerald-700 hover:bg-emerald-50"
                  >
                    <CheckCheck className="h-3.5 w-3.5 shrink-0" />
                    <span>Tout lu</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {browserPerm === "default" && (
              <button
                type="button"
                onClick={enableBrowser}
                className="w-full shrink-0 border-b bg-teal-50 px-3 py-2.5 text-left text-xs leading-snug text-teal-900 hover:bg-teal-100"
              >
                Activer les alertes système (hors onglet)
              </button>
            )}
            {browserPerm === "denied" && (
              <p className="shrink-0 border-b bg-amber-50 px-3 py-2.5 text-xs leading-snug text-amber-800">
                Alertes système bloquées — les notifs in-app restent actives.
              </p>
            )}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
              {loading && items.length === 0 ? (
                <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
                </div>
              ) : items.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-slate-500">
                  Aucune notification pour le moment.
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {items.map((n) => {
                    const unreadItem = !n.read_at;
                    const content = (
                      <>
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <p
                            className={`min-w-0 flex-1 break-words text-sm leading-snug ${
                              unreadItem
                                ? "font-semibold text-slate-900"
                                : "font-medium text-slate-700"
                            }`}
                          >
                            {n.title}
                          </p>
                          {unreadItem && (
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                          )}
                        </div>
                        <p className="mt-1 break-words text-xs leading-relaxed text-slate-600">
                          {n.body}
                        </p>
                        <p className="mt-1.5 text-[10px] text-slate-400">
                          {new Date(n.created_at).toLocaleString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </>
                    );

                    return (
                      <li key={n.id} className="group relative min-w-0">
                        {n.href ? (
                          <Link
                            href={n.href}
                            onClick={() => {
                              markRead(n.id);
                              setOpen(false);
                            }}
                            className={`block min-w-0 px-3 py-3.5 pr-10 active:bg-slate-100 sm:hover:bg-slate-50 ${
                              unreadItem ? "bg-emerald-50/50" : ""
                            }`}
                          >
                            {content}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => markRead(n.id)}
                            className={`block w-full min-w-0 px-3 py-3.5 pr-10 text-left active:bg-slate-100 sm:hover:bg-slate-50 ${
                              unreadItem ? "bg-emerald-50/50" : ""
                            }`}
                          >
                            {content}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => dismiss(n.id)}
                          className="absolute right-2 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                          title="Retirer de ma boîte"
                          aria-label="Retirer la notification"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
