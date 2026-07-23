/**
 * Filtre soft-delete optionnel : si la colonne n'existe pas encore
 * (migration 019 non appliquée), on ignore le filtre.
 */
export function isMissingColumnError(error: { message?: string; code?: string } | null): boolean {
  if (!error?.message) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("does not exist") ||
    msg.includes("n'existe pas") ||
    error.code === "42703" ||
    error.code === "PGRST204"
  );
}
