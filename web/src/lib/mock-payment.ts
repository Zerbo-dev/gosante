/** Paiement simulé GoSanté (tests) — remplace Genius Pay en développement. */

export type MockPaymentMethod = "mobile_money" | "card" | "cash";

export function generateMockPaymentRef(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GOP-${y}${m}${day}-${rand}`;
}

export function mockPaymentLabel(method: MockPaymentMethod): string {
  switch (method) {
    case "mobile_money":
      return "Mobile Money (Orange / Moov)";
    case "card":
      return "Carte bancaire";
    case "cash":
      return "Espèces à la livraison";
  }
}

/** Simule un délai réseau puis succès (sauf cash = en attente). */
export async function processMockPayment(opts: {
  method: MockPaymentMethod;
  amount: number;
  phone?: string;
}): Promise<{
  success: boolean;
  reference: string;
  paymentStatus: "paid" | "pending";
  message: string;
}> {
  const reference = generateMockPaymentRef();

  if (opts.method === "cash") {
    return {
      success: true,
      reference,
      paymentStatus: "pending",
      message: `Commande enregistrée. Payez ${opts.amount.toLocaleString("fr-FR")} FCFA au livreur.`,
    };
  }

  // Simulation 1,2 s — Mobile Money / carte
  await new Promise((r) => setTimeout(r, 1200));

  if (opts.method === "mobile_money" && !opts.phone?.trim()) {
    return {
      success: false,
      reference,
      paymentStatus: "pending",
      message: "Numéro Mobile Money requis",
    };
  }

  return {
    success: true,
    reference,
    paymentStatus: "paid",
    message:
      opts.method === "mobile_money"
        ? `Paiement ${reference} confirmé sur ${opts.phone}`
        : `Paiement carte ${reference} accepté`,
  };
}
