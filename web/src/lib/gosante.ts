import type { Medication } from "@/types";
import medicationsData from "@/data/medications.json";

const medications = medicationsData.medications as Medication[];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9àâäéèêëïîôùûüç\s]/gi, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

export function searchMedications(query: string, limit = 10): Medication[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = medications
    .map((med) => {
      const hay = med.search_text || med.designation.toLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (hay.includes(token)) score += 2;
        if (med.dci.toLowerCase().includes(token)) score += 3;
      }
      return { med, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((x) => x.med);
}

export function matchMedicationsFromOcr(text: string): {
  raw_text: string;
  medication_dci: string | null;
  dosage: string | null;
  confidence: number;
  matched: Medication | null;
}[] {
  const lines = text
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 4);

  return lines.map((line) => {
    const matches = searchMedications(line, 1);
    const matched = matches[0] ?? null;
    const dosageMatch = line.match(/\d+(?:[.,]\d+)?\s*(?:mg|g|ml|µg|cp|comp)/i);
    return {
      raw_text: line,
      medication_dci: matched?.dci ?? null,
      dosage: dosageMatch?.[0] ?? matched?.dosage ?? null,
      confidence: matched ? 0.75 : 0.2,
      matched,
    };
  });
}

export function getAllMedications(): Medication[] {
  return medications;
}

export const EXERCISES = [
  {
    id: "breathing",
    title: "Respiration carrée",
    duration: "2 min",
    description:
      "Inspirez, retenez, expirez et pause — 4 secondes par phase. 8 cycles.",
  },
  {
    id: "grounding",
    title: "Ancrage 5-4-3-2-1",
    duration: "3 min",
    description:
      "Nommez 5 choses que vous voyez, 4 que vous touchez, 3 que vous entendez, 2 que vous sentez, 1 que vous goûtez.",
  },
  {
    id: "release",
    title: "Relâchement corps",
    duration: "2 min",
    description: "Serrez puis relâchez épaules, mâchoire, mains et ventre.",
  },
  {
    id: "gratitude",
    title: "Trois points positifs",
    duration: "2 min",
    description: "Notez 3 petites choses positives de votre journée, même minimes.",
  },
];

export const EMERGENCY_CONTACTS = [
  { name: "SAMU", phone: "15", note: "Urgences médicales" },
  { name: "Police secours", phone: "17", note: "Danger immédiat" },
  { name: "Pompiers", phone: "18", note: "Secours" },
  { name: "Écoute psychologique", phone: "80 00 12 12", note: "Soutien gratuit" },
];

export const CHAT_DISCLAIMER =
  "Un espace d’écoute entre proches. Pas un diagnostic. En danger immédiat seulement : 15.";

export const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Inconnu"];
