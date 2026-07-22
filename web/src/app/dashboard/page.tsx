import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RoleHomeDashboard } from "@/components/RoleHomeDashboard";
import Link from "next/link";
import { Brain, FileHeart, MapPin, ShoppingBag, Video } from "lucide-react";
import { ROLE_LABELS } from "@/lib/auth-shared";
import { loadRoleDashboard } from "@/lib/dashboard-stats";
import type { UserRole } from "@/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const role = (profile?.role ?? "patient") as UserRole;

  if (role !== "patient") {
    const data = await loadRoleDashboard(supabase, user.id, role);
    return data ? (
      <RoleHomeDashboard fullName={profile?.full_name ?? null} data={data} />
    ) : (
      <p className="text-slate-600">Impossible de charger le tableau de bord.</p>
    );
  }

  const modules = [
    {
      href: "/dashboard/pharmacie",
      title: "Pharmacie",
      desc: "218 pharmacies, médicaments LNME, panier & commandes",
      icon: MapPin,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      href: "/dashboard/consultation",
      title: "Consultation",
      desc: "Psychologues, RDV visio sécurisée et suivi de rendez-vous",
      icon: Video,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      href: "/dashboard/commandes",
      title: "Mes commandes",
      desc: "Suivi des commandes et paiements GoSanté (tests)",
      icon: ShoppingBag,
      color: "bg-teal-100 text-teal-700",
    },
    {
      href: "/dashboard/sante-mentale",
      title: "Santé mentale",
      desc: "Écoute, exercices anti-stress et journal personnel",
      icon: Brain,
      color: "bg-violet-100 text-violet-700",
    },
    {
      href: "/dashboard/carnet",
      title: "Carnet médical",
      desc: "Profil santé, allergies, vaccins et historique",
      icon: FileHeart,
      color: "bg-rose-100 text-rose-700",
    },
  ];

  return (
      <div className="space-y-4 sm:space-y-6">
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Bonjour{profile?.full_name ? `, ${profile.full_name}` : ""}
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 sm:mt-2 sm:text-base">
            Bienvenue sur GoSanté — {ROLE_LABELS[role]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
          {modules.map(({ href, title, desc, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl bg-white p-4 shadow-sm transition active:scale-[0.99] hover:shadow-md sm:p-6"
            >
              <div className={`mb-3 inline-flex rounded-xl p-2.5 sm:mb-4 sm:p-3 ${color}`}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h2 className="font-semibold text-slate-900">{title}</h2>
              <p className="mt-1.5 text-sm text-slate-600 sm:mt-2">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
  );
}
