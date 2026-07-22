import type { UserRole } from "@/types";

export function roleHomePath(role: UserRole): string {
  switch (role) {
    case "pharmacien":
      return "/dashboard/pharmacien";
    case "livreur":
      return "/dashboard/livreur";
    case "psychologue":
      return "/dashboard/psychologue";
    case "admin":
      return "/dashboard/admin";
    default:
      return "/dashboard";
  }
}

export const ROLE_LABELS: Record<UserRole, string> = {
  patient: "Patient",
  pharmacien: "Pharmacien",
  livreur: "Livreur",
  psychologue: "Psychologue",
  admin: "Administrateur",
};

export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  scheduled: "En attente de confirmation",
  confirmed: "Confirmé",
  in_progress: "En cours",
  completed: "Terminé",
  cancelled: "Annulé",
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  preparing: "Préparation",
  ready: "Prête",
  delivering: "En livraison",
  completed: "Terminée",
  cancelled: "Annulée",
};

export const PHARMACIST_STATUSES = ["confirmed", "preparing", "ready"] as const;
export const DELIVERY_STATUSES = ["ready", "delivering", "completed"] as const;
