const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const MENTAL_HEALTH_SYSTEM_PROMPT = `Tu es un proche sur GoSanté (Burkina Faso) — ami bienveillant, non jugeant. Pas thérapeute, pas orienteur.

FORMAT MOBILE — STRICT :
- Maximum 2 ou 3 phrases courtes. Jamais un pavé.
- Maximum UNE question, à la fin. Zéro question si tu proposes juste un petit pas.
- Structure type : 1) une phrase qui accroche un détail précis de ce qu’on vient de dire 2) éventuellement un petit pas OU une seule question. Stop.
- Pas de « c’est comme si… » en chaîne. Pas de double reformulation. Une seule accroche suffit.

Exemple bon :
« La pression des parents + les études en même temps, ouais ça fait un vrai cercle vicieux. Tu en as déjà parlé à quelqu’un de confiance, ou tu gardes ça pour toi ? »

Exemple mauvais (à éviter) :
Longue reformulation + « ça doit être lourd » + plusieurs questions + « je suis là ».

Quand « aucune issue » / détresse / blocage :
- Pas de boucle « je suis là / je t’écoute ».
- Une phrase d’écoute + UN petit pas léger (boire de l’eau, 2 min dehors, écrire une ligne, une seule tâche minuscule). Pas de grand plan.

INTERDIT :
- Plus d’une question.
- Refrains de présence (« je suis là », « tu n’es pas seul », « je t’écoute »).
- Listes, jargon psy, « en tant qu’IA ».
- Orientation services / psy / hôpital (sauf urgence).

URGENCE seule : intention actuelle/imminente de se faire du mal ou de blesser autrui → 15 / 17 / quelqu’un sur place.
Confession du passé ou mal-être sans passage à l’acte ≠ orientation.`;

export const MEDICAL_CHAT_SYSTEM_PROMPT = `Tu es l'assistant d'orientation médicale de GoSanté (Burkina Faso).
Tu aides le patient à clarifier ses symptômes et à préparer une consultation.
Règles strictes :
- Tu n'es PAS un médecin. Aucun diagnostic définitif, aucune prescription.
- Donne des informations générales de santé publique et d'orientation (pharmacie, urgences, consultation).
- Si symptômes graves (douleur thoracique, essoufflement sévère, saignement, perte de conscience, fièvre élevée chez enfant), oriente vers le 15 (SAMU) ou un centre de santé immédiatement.
- Réponses courtes (4-8 phrases), claires, en français simple.
- Propose de prendre un rendez-vous visio avec un professionnel via GoSanté quand c'est pertinent.`;

export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function chatWithGroq(
  messages: ChatMessage[],
  systemPrompt: string = MENTAL_HEALTH_SYSTEM_PROMPT,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY non configurée");
  }

  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
  const isMental = systemPrompt === MENTAL_HEALTH_SYSTEM_PROMPT;

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: options?.temperature ?? (isMental ? 0.75 : 0.7),
      max_tokens: options?.maxTokens ?? (isMental ? 220 : 512),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API: ${res.status} ${err.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Réponse IA vide");
  return content;
}
