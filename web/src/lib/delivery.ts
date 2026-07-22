/** Génère un code livraison à 6 chiffres (ex: 482917) */
export function generateDeliveryCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
