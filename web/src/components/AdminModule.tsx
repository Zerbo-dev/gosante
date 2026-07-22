"use client";

import { useCallback, useEffect, useState } from "react";
import { ORDER_STATUS_LABELS, ROLE_LABELS } from "@/lib/auth-shared";
import type { UserRole } from "@/types";
import { AlertCircle, Building2, Loader2, RefreshCw, Truck, UserCog, Users } from "lucide-react";

interface ProfileRow {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

interface OrderRow {
  id: string;
  status: string;
  payment_status: string;
  total_amount: number;
  livreur_id: string | null;
  pharmacy_id: string | null;
  created_at: string;
  patient_name: string | null;
  livreur_name: string | null;
  pharmacies: { name: string; city: string } | null;
}

interface LivreurStat extends ProfileRow {
  active: number;
  completed: number;
  total: number;
  rating_avg?: number | null;
  rating_count?: number;
}

interface PharmacyRow {
  id: string;
  name: string;
  city: string;
}

interface StaffRow {
  id: string;
  user_id: string;
  pharmacy_id: string;
  pharmacies: { name: string } | null;
}

type Tab = "orders" | "users" | "staff" | "livreurs";

export function AdminModule() {
  const [tab, setTab] = useState<Tab>("users");
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [pharmacies, setPharmacies] = useState<PharmacyRow[]>([]);
  const [staff, setStaff] = useState<StaffRow[]>([]);
  const [livreurs, setLivreurs] = useState<ProfileRow[]>([]);
  const [livreurStats, setLivreurStats] = useState<LivreurStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState({ userId: "", pharmacyId: "" });
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur chargement");
      setProfiles(data.profiles ?? []);
      setOrders(data.orders ?? []);
      setPharmacies(data.pharmacies ?? []);
      setStaff(data.staff ?? []);
      setLivreurs(data.livreurs ?? []);
      setLivreurStats(data.livreurStats ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateRole(userId: string, role: UserRole) {
    setMsg(null);
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error ?? "Erreur");
      return;
    }
    setMsg(`Rôle mis à jour : ${ROLE_LABELS[role]}`);
    load();
  }

  async function assignLivreur(orderId: string, livreurId: string) {
    setMsg(null);
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, livreurId, status: "ready" }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error ?? "Erreur");
      return;
    }
    setMsg("Livreur assigné");
    load();
  }

  async function unassignLivreur(orderId: string) {
    setMsg(null);
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, livreurId: null }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error ?? "Erreur");
      return;
    }
    setMsg("Livreur retiré");
    load();
  }

  async function assignStaff(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const res = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staffForm),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error ?? "Erreur");
      return;
    }
    setMsg("Pharmacien rattaché à la pharmacie");
    setStaffForm({ userId: "", pharmacyId: "" });
    load();
  }

  const stats = {
    users: profiles.length,
    orders: orders.length,
    livreurs: livreurs.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.payment_status === "paid").length,
  };

  const readyForDelivery = orders.filter((o) => o.status === "ready" && !o.livreur_id);
  const activeDeliveries = orders.filter(
    (o) => o.livreur_id && (o.status === "ready" || o.status === "delivering")
  );

  const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
    { id: "users", label: "Utilisateurs", icon: Users },
    { id: "livreurs", label: "Livreurs", icon: Truck },
    { id: "orders", label: "Commandes", icon: Building2 },
    { id: "staff", label: "Pharmaciens", icon: UserCog },
  ];

  return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Administration</h1>
            <p className="text-sm text-slate-600 sm:text-base">
              Gestion des utilisateurs, commandes et pharmacies
            </p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Actualiser</span>
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {msg && (
          <div className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-800">{msg}</div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { label: "Utilisateurs", value: stats.users, icon: UserCog },
            { label: "Livreurs", value: stats.livreurs, icon: Truck },
            { label: "Commandes", value: stats.orders, icon: Building2 },
            { label: "En attente", value: stats.pending, icon: Building2 },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl bg-white p-3 shadow-sm sm:p-4">
              <Icon className="mb-2 h-5 w-5 text-emerald-600" />
              <div className="text-xl font-bold sm:text-2xl">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>

        <div className="-mx-3 flex gap-1 overflow-x-auto px-3 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0 border-b border-slate-200 pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-2 rounded-t-lg px-3 py-2.5 text-sm font-medium transition sm:px-5 sm:py-3 ${
                tab === id
                  ? "border border-b-0 border-slate-200 bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 rounded-xl bg-white p-8 text-slate-500 shadow-sm">
            <Loader2 className="h-5 w-5 animate-spin" />
            Chargement des données…
          </div>
        ) : tab === "users" ? (
          <div className="rounded-xl bg-white shadow-sm">
            <div className="border-b px-5 py-4">
              <h2 className="font-semibold text-slate-900">Utilisateurs ({profiles.length})</h2>
              <p className="text-sm text-slate-500">Changez le rôle pour accéder aux autres interfaces</p>
            </div>
            {profiles.length === 0 ? (
              <p className="p-8 text-center text-sm text-slate-500">Aucun utilisateur</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50 text-left text-slate-500">
                      <th className="p-3">Nom</th>
                      <th className="p-3">Téléphone</th>
                      <th className="p-3">Rôle actuel</th>
                      <th className="p-3">Changer le rôle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map((p) => (
                      <tr key={p.id} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{p.full_name ?? "—"}</td>
                        <td className="p-3">{p.phone ?? "—"}</td>
                        <td className="p-3">
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                            {ROLE_LABELS[p.role]}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={p.role}
                            onChange={(e) => updateRole(p.id, e.target.value as UserRole)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                          >
                            {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                              <option key={r} value={r}>
                                {ROLE_LABELS[r]}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : tab === "livreurs" ? (
          <div className="space-y-6">
            <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
              <h2 className="font-semibold text-slate-900">Gestion des livreurs</h2>
              <p className="text-sm text-slate-500">
                Créez des livreurs (onglet Utilisateurs), puis assignez-les aux commandes prêtes
              </p>
            </div>

            <div className="rounded-xl bg-white shadow-sm">
              <div className="border-b px-5 py-4">
                <h3 className="font-medium text-slate-900">Équipe livraison ({livreurStats.length})</h3>
              </div>
              {livreurStats.length === 0 ? (
                <p className="p-8 text-center text-sm text-slate-500">
                  Aucun livreur — passez un utilisateur en rôle « Livreur » dans l&apos;onglet Utilisateurs
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50 text-left text-slate-500">
                        <th className="p-3">Nom</th>
                        <th className="p-3">Téléphone</th>
                        <th className="p-3">Note</th>
                        <th className="p-3">En cours</th>
                        <th className="p-3">Terminées</th>
                        <th className="p-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {livreurStats.map((l) => (
                        <tr key={l.id} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{l.full_name ?? "—"}</td>
                          <td className="p-3">{l.phone ?? "—"}</td>
                          <td className="p-3">
                            {l.rating_count && l.rating_count > 0 && l.rating_avg != null ? (
                              <span className="font-medium text-amber-700">
                                ★ {l.rating_avg.toFixed(1)}
                                <span className="ml-1 text-xs font-normal text-slate-500">
                                  ({l.rating_count})
                                </span>
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className={l.active > 0 ? "font-semibold text-amber-700" : ""}>
                              {l.active}
                            </span>
                          </td>
                          <td className="p-3 text-emerald-700">{l.completed}</td>
                          <td className="p-3 text-slate-500">{l.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-slate-900">
                À assigner ({readyForDelivery.length})
              </h3>
              {readyForDelivery.length === 0 ? (
                <div className="rounded-xl border border-dashed bg-white p-6 text-center text-sm text-slate-500">
                  Aucune commande prête sans livreur — le pharmacien doit marquer une commande « Prête »
                </div>
              ) : (
                readyForDelivery.map((order) => (
                  <div key={order.id} className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="font-medium">#{order.id.slice(0, 8)}</span>
                      <span className="text-sm text-slate-500">{order.patient_name ?? "Patient"}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {order.pharmacies?.name ?? "—"} · {Number(order.total_amount).toLocaleString("fr-FR")} FCFA
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <select
                        id={`assign-${order.id}`}
                        className="rounded-lg border px-3 py-1.5 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>Choisir livreur</option>
                        {livreurs.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.full_name ?? l.phone ?? l.id.slice(0, 8)}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const sel = document.getElementById(`assign-${order.id}`) as HTMLSelectElement;
                          if (sel?.value) assignLivreur(order.id, sel.value);
                        }}
                        className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white"
                      >
                        Assigner
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-slate-900">
                Livraisons actives ({activeDeliveries.length})
              </h3>
              {activeDeliveries.length === 0 ? (
                <div className="rounded-xl border border-dashed bg-white p-6 text-center text-sm text-slate-500">
                  Aucune livraison en cours
                </div>
              ) : (
                activeDeliveries.map((order) => (
                  <div key={order.id} className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <span className="font-medium">#{order.id.slice(0, 8)}</span>
                        <span className="ml-2 text-sm text-emerald-700">
                          → {order.livreur_name ?? "Livreur"}
                        </span>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs">
                        {ORDER_STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {order.pharmacies?.name ?? "—"} · {order.patient_name ?? "Patient"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <select
                        id={`reassign-${order.id}`}
                        className="rounded-lg border px-3 py-1.5 text-sm"
                        defaultValue={order.livreur_id ?? ""}
                      >
                        {livreurs.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.full_name ?? l.phone ?? l.id.slice(0, 8)}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const sel = document.getElementById(`reassign-${order.id}`) as HTMLSelectElement;
                          if (sel?.value && sel.value !== order.livreur_id) {
                            assignLivreur(order.id, sel.value);
                          }
                        }}
                        className="rounded-lg border px-3 py-1.5 text-sm"
                      >
                        Réassigner
                      </button>
                      <button
                        type="button"
                        onClick={() => unassignLivreur(order.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : tab === "orders" ? (
          <div className="space-y-3">
            <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
              <h2 className="font-semibold text-slate-900">Commandes ({orders.length})</h2>
              <p className="text-sm text-slate-500">Assignez un livreur aux commandes prêtes</p>
            </div>
            {orders.length === 0 ? (
              <div className="rounded-xl border border-dashed bg-white p-8 text-center text-sm text-slate-500">
                Aucune commande pour le moment
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <span className="font-semibold">#{order.id.slice(0, 8)}</span>
                      <span className="ml-2 text-sm text-slate-500">
                        {order.patient_name ?? "Patient"}
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-medium">
                        {ORDER_STATUS_LABELS[order.status] ?? order.status}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-medium text-emerald-800">
                        {order.payment_status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {order.pharmacies?.name ?? "Pharmacie non assignée"} ·{" "}
                    {Number(order.total_amount).toLocaleString("fr-FR")} FCFA
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    {new Date(order.created_at).toLocaleString("fr-FR")}
                  </div>
                  {order.status === "ready" && !order.livreur_id && (
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
                      <span className="text-sm text-slate-600">Assigner livreur :</span>
                      <select
                        id={`livreur-${order.id}`}
                        className="rounded-lg border px-3 py-1.5 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {livreurs.length === 0 ? "Aucun livreur (créez-en un)" : "Choisir livreur"}
                        </option>
                        {livreurs.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.full_name ?? l.phone ?? l.id.slice(0, 8)}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const sel = document.getElementById(`livreur-${order.id}`) as HTMLSelectElement;
                          if (sel?.value) assignLivreur(order.id, sel.value);
                        }}
                        disabled={livreurs.length === 0}
                        className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50"
                      >
                        Assigner
                      </button>
                    </div>
                  )}
                  {order.livreur_id && (
                    <p className="mt-2 text-xs text-emerald-700">
                      Livreur : {order.livreur_name ?? order.livreur_id.slice(0, 8)}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <form onSubmit={assignStaff} className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
              <div>
                <h2 className="font-semibold text-slate-900">Rattacher un pharmacien</h2>
                <p className="text-sm text-slate-500">
                  Le pharmacien pourra gérer les stocks de la pharmacie choisie
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Pharmacien</label>
                <select
                  value={staffForm.userId}
                  onChange={(e) => setStaffForm({ ...staffForm, userId: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                >
                  <option value="">
                    {profiles.filter((p) => p.role === "pharmacien").length === 0
                      ? "Aucun — changez d'abord un rôle en « Pharmacien »"
                      : "Choisir un pharmacien"}
                  </option>
                  {profiles.filter((p) => p.role === "pharmacien").map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.full_name ?? p.id.slice(0, 8)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Pharmacie</label>
                <select
                  value={staffForm.pharmacyId}
                  onChange={(e) => setStaffForm({ ...staffForm, pharmacyId: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                >
                  <option value="">Choisir une pharmacie</option>
                  {pharmacies.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.city}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Rattacher à la pharmacie
              </button>
            </form>

            <div className="space-y-4">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h2 className="mb-3 font-semibold">Affectations actuelles ({staff.length})</h2>
                {staff.length === 0 ? (
                  <p className="text-sm text-slate-500">Aucun pharmacien rattaché</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {staff.map((s) => {
                      const user = profiles.find((p) => p.id === s.user_id);
                      return (
                        <li key={s.id} className="rounded-lg border px-3 py-2">
                          <span className="font-medium">{user?.full_name ?? s.user_id.slice(0, 8)}</span>
                          <span className="text-slate-500"> → {s.pharmacies?.name ?? "Pharmacie"}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h2 className="mb-3 font-semibold">Pharmacies ({pharmacies.length})</h2>
                <ul className="max-h-48 space-y-1 overflow-y-auto text-sm text-slate-600">
                  {pharmacies.map((p) => (
                    <li key={p.id}>
                      {p.name} — {p.city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
