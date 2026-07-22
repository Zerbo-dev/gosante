"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type LegacyProps = {
  title: string;
  onSubmit: (score: number, comment: string) => Promise<void>;
};

type ApiProps = {
  title?: string;
  targetType: "livreur" | "psychologist";
  targetId: string;
  orderId?: string;
  appointmentId?: string;
  onRated?: (rating: { score: number; comment: string | null }) => void;
};

export function RatingForm({
  ...props
}: LegacyProps | ApiProps) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = props.title ?? "Votre avis";

  async function submitRating() {
    if ("onSubmit" in props) {
      await props.onSubmit(score, comment);
      return;
    }

    const res = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetType: props.targetType,
        targetUserId: props.targetId,
        orderId: props.orderId,
        appointmentId: props.appointmentId,
        score,
        comment,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "Impossible d'envoyer la note");
    }
    props.onRated?.(
      data.rating ?? { score, comment: comment.trim() || null }
    );
  }

  if (done) {
    return (
      <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
        Merci pour votre avis !
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-medium text-amber-900">{title}</p>
      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setScore(n)}
            className="p-0.5"
            aria-label={`${n} étoiles`}
          >
            <Star
              className={`h-7 w-7 ${
                n <= (hover || score) ? "fill-amber-400 text-amber-400" : "text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Commentaire (optionnel)"
        rows={2}
        className="mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button
        type="button"
        disabled={score < 1 || saving}
        onClick={async () => {
          setSaving(true);
          setError(null);
          try {
            await submitRating();
            setDone(true);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Impossible d'envoyer la note");
          } finally {
            setSaving(false);
          }
        }}
        className="mt-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "Envoi…" : "Envoyer la note"}
      </button>
    </div>
  );
}
