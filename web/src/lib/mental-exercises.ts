export type ExerciseId = "breathing" | "grounding" | "gratitude" | "release";

export type ExerciseMeta = {
  id: ExerciseId;
  title: string;
  durationLabel: string;
  durationSec: number;
  description: string;
  why: string;
  tag: string;
};

export const MENTAL_EXERCISES: ExerciseMeta[] = [
  {
    id: "breathing",
    title: "Respiration carrée",
    durationLabel: "≈ 2 min",
    durationSec: 128,
    description: "Quatre phases de 4 secondes pour calmer le rythme cardiaque.",
    why: "Utile quand le cœur s’emballe, avant un RDV, ou dans le bruit de la ville.",
    tag: "Calme",
  },
  {
    id: "grounding",
    title: "Ancrage 5-4-3-2-1",
    durationLabel: "≈ 3 min",
    durationSec: 180,
    description: "Revenez ici et maintenant avec vos cinq sens, un pas à la fois.",
    why: "Aide quand les pensées tournent en boucle ou que l’anxiété monte.",
    tag: "Présence",
  },
  {
    id: "release",
    title: "Relâchement corps",
    durationLabel: "≈ 2 min",
    durationSec: 120,
    description: "Serrez puis relâchez les muscles — épaules, mâchoire, mains, ventre.",
    why: "Bon après une longue journée, la chaleur, ou une tension dans le dos.",
    tag: "Corps",
  },
  {
    id: "gratitude",
    title: "Trois points positifs",
    durationLabel: "≈ 2 min",
    durationSec: 120,
    description: "Notez trois petites choses qui ont adouci votre journée.",
    why: "Même minuscules : un verre d’eau fraîche, un message, un moment de calme.",
    tag: "Lumière",
  },
];

export const BREATH_PHASES = [
  { label: "Inspirez", hint: "Par le nez, doucement", scale: 1.15 },
  { label: "Retenez", hint: "Poumons pleins, sans forcer", scale: 1.1 },
  { label: "Expirez", hint: "Laissez partir l’air", scale: 0.78 },
  { label: "Pause", hint: "Reposz vide un instant", scale: 0.85 },
] as const;

export const BREATH_PHASE_MS = 4000;
export const BREATH_CYCLES = 8;

export const GROUNDING_STEPS = [
  {
    count: 5,
    sense: "Vue",
    prompt: "Nommez 5 choses que vous voyez autour de vous",
    examples: ["la lumière", "un mur", "vos mains", "une ombre", "un objet proche"],
  },
  {
    count: 4,
    sense: "Toucher",
    prompt: "Nommez 4 choses que vous touchez ou sentez sur la peau",
    examples: ["le tissu de vos vêtements", "le sol sous vos pieds", "l’air", "un téléphone"],
  },
  {
    count: 3,
    sense: "Ouïe",
    prompt: "Nommez 3 sons que vous entendez maintenant",
    examples: ["des voix au loin", "un ventilateur", "des oiseaux", "le silence relatif"],
  },
  {
    count: 2,
    sense: "Odorat",
    prompt: "Nommez 2 odeurs (même faibles)",
    examples: ["savon", "cuisine", "poussière", "parfum", "air chaud"],
  },
  {
    count: 1,
    sense: "Goût",
    prompt: "Nommez 1 goût ou sensation dans la bouche",
    examples: ["eau", "thé", "dents", "langue", "air"],
  },
] as const;

export const RELEASE_STEPS = [
  {
    title: "Épaules",
    tense: "Montez les épaules vers les oreilles… serrez 5 secondes",
    release: "Laissez tomber. Sentez la différence.",
  },
  {
    title: "Mâchoire",
    tense: "Serrez légèrement les dents… 5 secondes",
    release: "Détendez la mâchoire. Laissez la langue reposer.",
  },
  {
    title: "Mains",
    tense: "Fermez les poings… serrez 5 secondes",
    release: "Ouvrez les doigts. Relâchez complètement.",
  },
  {
    title: "Ventre",
    tense: "Rentrez un peu le ventre… 5 secondes",
    release: "Relâchez. Respirez naturellement.",
  },
] as const;

export const RELEASE_HOLD_MS = 5000;
export const RELEASE_REST_MS = 4000;

const STREAK_KEY = "gosante_exercise_streak";

export type ExerciseStreak = {
  count: number;
  lastDate: string; // YYYY-MM-DD local
  totalCompleted: number;
};

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function readExerciseStreak(): ExerciseStreak {
  if (typeof window === "undefined") {
    return { count: 0, lastDate: "", totalCompleted: 0 };
  }
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, lastDate: "", totalCompleted: 0 };
    return JSON.parse(raw) as ExerciseStreak;
  } catch {
    return { count: 0, lastDate: "", totalCompleted: 0 };
  }
}

export function recordExerciseCompletion(): ExerciseStreak {
  const prev = readExerciseStreak();
  const today = todayKey();
  let count = prev.count;
  if (prev.lastDate === today) {
    // already counted streak today
  } else if (prev.lastDate === yesterdayKey()) {
    count = prev.count + 1;
  } else {
    count = 1;
  }
  const next: ExerciseStreak = {
    count,
    lastDate: today,
    totalCompleted: (prev.totalCompleted ?? 0) + 1,
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  return next;
}
