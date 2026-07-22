"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Brain,
  FileHeart,
  LogOut,
  Home,
  HeartPulse,
  MapPin,
  ShoppingBag,
  Package,
  Truck,
  Shield,
  Boxes,
  Video,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useDashboardProfile } from "@/components/ProfileProvider";
import { NotificationBell } from "@/components/NotificationBell";
import { ROLE_LABELS } from "@/lib/auth-shared";

type NavLink = {
  href: string;
  label: string;
  shortLabel: string;
  icon: typeof Home;
  roles?: UserRole[];
};

const allLinks: NavLink[] = [
  { href: "/dashboard", label: "Accueil", shortLabel: "Accueil", icon: Home },
  {
    href: "/dashboard/pharmacie",
    label: "Pharmacie",
    shortLabel: "Pharma",
    icon: MapPin,
    roles: ["patient"],
  },
  {
    href: "/dashboard/commandes",
    label: "Commandes",
    shortLabel: "Cmds",
    icon: ShoppingBag,
    roles: ["patient"],
  },
  {
    href: "/dashboard/consultation",
    label: "Consultation",
    shortLabel: "RDV",
    icon: Video,
    roles: ["patient"],
  },
  {
    href: "/dashboard/sante-mentale",
    label: "Santé mentale",
    shortLabel: "Mental",
    icon: Brain,
    roles: ["patient"],
  },
  {
    href: "/dashboard/carnet",
    label: "Carnet médical",
    shortLabel: "Carnet",
    icon: FileHeart,
    roles: ["patient"],
  },
  {
    href: "/dashboard/pharmacien",
    label: "Espace pharmacien",
    shortLabel: "Stock",
    icon: Boxes,
    roles: ["pharmacien", "admin"],
  },
  {
    href: "/dashboard/livreur",
    label: "Livraisons",
    shortLabel: "Livr.",
    icon: Truck,
    roles: ["livreur", "admin"],
  },
  {
    href: "/dashboard/psychologue",
    label: "Mes consultations",
    shortLabel: "RDV",
    icon: Video,
    roles: ["psychologue", "admin"],
  },
  {
    href: "/dashboard/admin",
    label: "Administration",
    shortLabel: "Admin",
    icon: Shield,
    roles: ["admin"],
  },
];

function linksForRole(role: UserRole): NavLink[] {
  return allLinks.filter((l) => !l.roles || l.roles.includes(role) || role === "admin");
}

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
}

const MOBILE_ALL_MAX = 6;
const MOBILE_PRIMARY_MAX = 4;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { count: cartCount } = useCart();
  const profile = useDashboardProfile();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // Pas de rôle → pas de liens « patient » par défaut (évite le flash)
  const links = profile ? linksForRole(profile.role) : [];

  const { primary, more } = useMemo(() => {
    if (links.length <= MOBILE_ALL_MAX) {
      return { primary: links, more: [] as NavLink[] };
    }
    return {
      primary: links.slice(0, MOBILE_PRIMARY_MAX),
      more: links.slice(MOBILE_PRIMARY_MAX),
    };
  }, [links]);

  const moreActive = more.some((l) => isActive(pathname, l.href));

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-emerald-100/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-3.5">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-2 font-semibold text-emerald-800"
          >
            <HeartPulse className="h-6 w-6 shrink-0 text-emerald-600" />
            <span className="truncate">GoSanté</span>
            {profile?.role && profile.role !== "patient" && (
              <span className="hidden truncate rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 sm:inline">
                {ROLE_LABELS[profile.role] ?? profile.role}
              </span>
            )}
          </Link>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <NotificationBell />
            <button
              type="button"
              onClick={handleLogout}
              className="flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-100 sm:px-3"
              aria-label="Déconnexion"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-4 px-3 pb-[calc(4.75rem+env(safe-area-inset-bottom))] pt-4 sm:gap-6 sm:px-4 sm:pt-6 lg:grid-cols-[220px_1fr] lg:pb-8">
        <nav className="hidden lg:flex lg:flex-col lg:gap-1.5" aria-busy={!profile}>
          {!profile
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-11 animate-pulse rounded-xl bg-slate-200/70"
                  aria-hidden
                />
              ))
            : links.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-emerald-50"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{label}</span>
                    {href === "/dashboard/pharmacie" && cartCount > 0 && (
                      <span className="ml-auto rounded-full bg-white/20 px-1.5 text-xs">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                );
              })}
        </nav>

        <main className="min-w-0">{children}</main>
      </div>

      {/* Bottom nav mobile */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:hidden"
        aria-label="Navigation principale"
        aria-busy={!profile}
      >
        <div className="mx-auto flex max-w-6xl items-stretch justify-around px-1 pt-1">
          {!profile
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-1 py-2"
                  aria-hidden
                >
                  <div className="h-8 w-8 animate-pulse rounded-xl bg-slate-200/80" />
                  <div className="h-2 w-10 animate-pulse rounded bg-slate-200/80" />
                </div>
              ))
            : primary.map(({ href, shortLabel, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-0.5 py-2 text-[10px] font-medium leading-tight sm:text-[11px] ${
                      active ? "text-emerald-700" : "text-slate-500"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                        active ? "bg-emerald-50 text-emerald-700" : "text-slate-500"
                      }`}
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" />
                    </span>
                    <span className="max-w-full truncate px-0.5">{shortLabel}</span>
                    {href === "/dashboard/pharmacie" && cartCount > 0 && (
                      <span className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-semibold text-white">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </Link>
                );
              })}

          {more.length > 0 && (
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              className={`relative flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-0.5 py-2 text-[10px] font-medium leading-tight sm:text-[11px] ${
                moreActive || moreOpen ? "text-emerald-700" : "text-slate-500"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                  moreActive || moreOpen ? "bg-emerald-50 text-emerald-700" : "text-slate-500"
                }`}
              >
                <MoreHorizontal className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <span>Plus</span>
            </button>
          )}
        </div>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Fermer le menu"
            onClick={() => setMoreOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Plus de menus</h2>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {more.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                      active
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-emerald-50"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{label}</span>
                    {href === "/dashboard/pharmacie" && cartCount > 0 && (
                      <span
                        className={`ml-auto rounded-full px-1.5 text-xs ${
                          active ? "bg-white/20" : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { Package, Truck, Shield, Boxes };
