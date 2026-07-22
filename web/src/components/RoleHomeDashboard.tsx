import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RoleDashboardData, StatCard } from "@/lib/dashboard-stats";

const toneClass: Record<NonNullable<StatCard["tone"]>, string> = {
  default: "bg-white text-slate-900",
  warn: "bg-amber-50 text-amber-950",
  ok: "bg-emerald-50 text-emerald-950",
  accent: "bg-teal-50 text-teal-950",
};

export function RoleHomeDashboard({
  fullName,
  data,
}: {
  fullName: string | null;
  data: RoleDashboardData;
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-700 to-teal-800 p-5 text-white shadow-sm sm:p-7">
        <p className="text-sm font-medium text-emerald-100/90">{data.roleLabel}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Bonjour{fullName ? `, ${fullName}` : ""}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-emerald-50/90 sm:text-base">{data.subtitle}</p>
        <Link
          href={data.workspaceHref}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-teal-800 shadow-sm transition hover:bg-emerald-50"
        >
          {data.workspaceLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Vos indicateurs
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {data.stats.map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl p-4 shadow-sm ${toneClass[s.tone ?? "default"]}`}
            >
              <div className="text-2xl font-bold tabular-nums sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{s.label}</div>
              {s.hint && <div className="mt-1 text-[11px] text-slate-500">{s.hint}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
