"use client";

import { Star } from "lucide-react";

export type MyRating = {
  score: number;
  comment: string | null;
  created_at?: string;
};

export function MyRatingDisplay({
  rating,
  label = "Votre note",
}: {
  rating: MyRating;
  label?: string;
}) {
  return (
    <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50/80 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium text-amber-900">{label}</p>
        <div className="flex items-center gap-0.5" aria-label={`${rating.score} sur 5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={`h-4 w-4 ${
                n <= rating.score ? "fill-amber-400 text-amber-400" : "text-amber-200"
              }`}
            />
          ))}
          <span className="ml-1.5 text-xs font-semibold text-amber-900">
            {rating.score}/5
          </span>
        </div>
      </div>
      {rating.comment?.trim() && (
        <p className="mt-1.5 text-sm leading-relaxed text-amber-950/80">
          « {rating.comment.trim()} »
        </p>
      )}
    </div>
  );
}
