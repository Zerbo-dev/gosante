/** La salle s’ouvre au plus tôt 1 h avant l’heure du RDV. */
export const VISIO_EARLY_MS = 60 * 60_000;

const JOINABLE_STATUSES = new Set(["confirmed", "in_progress"]);

export type VisioAccessResult =
  | { ok: true }
  | { ok: false; reason: string };

/**
 * Règles d’accès visio (patient join + psychologue heartbeat).
 * — RDV confirmé ou déjà en cours
 * — pas plus d’1 h avant l’horaire
 */
export function checkVisioAccess(opts: {
  status: string;
  scheduledAt: string;
  nowMs?: number;
}): VisioAccessResult {
  const now = opts.nowMs ?? Date.now();
  const start = new Date(opts.scheduledAt).getTime();

  if (!JOINABLE_STATUSES.has(opts.status)) {
    if (opts.status === "scheduled") {
      return {
        ok: false,
        reason: "Le rendez-vous doit d’abord être confirmé par le psychologue",
      };
    }
    if (opts.status === "cancelled" || opts.status === "completed") {
      return { ok: false, reason: "Ce rendez-vous est terminé" };
    }
    return { ok: false, reason: "Visio indisponible pour ce statut" };
  }

  if (Number.isNaN(start)) {
    return { ok: false, reason: "Date de rendez-vous invalide" };
  }

  if (now < start - VISIO_EARLY_MS) {
    const opensAt = new Date(start - VISIO_EARLY_MS);
    return {
      ok: false,
      reason: `La salle ouvre 1 h avant le RDV (à partir de ${opensAt.toLocaleString("fr-FR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })})`,
    };
  }

  return { ok: true };
}

export function isVisioStatusOk(status: string) {
  return JOINABLE_STATUSES.has(status);
}

export function isVisioTimeOk(scheduledAt: string, nowMs = Date.now()) {
  const start = new Date(scheduledAt).getTime();
  if (Number.isNaN(start)) return false;
  return nowMs >= start - VISIO_EARLY_MS;
}
