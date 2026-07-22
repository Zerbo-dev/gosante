"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BREATH_CYCLES,
  BREATH_PHASE_MS,
  BREATH_PHASES,
  GROUNDING_STEPS,
  MENTAL_EXERCISES,
  RELEASE_HOLD_MS,
  RELEASE_REST_MS,
  RELEASE_STEPS,
  readExerciseStreak,
  recordExerciseCompletion,
  type ExerciseId,
  type ExerciseStreak,
} from "@/lib/mental-exercises";
import {
  Brain,
  Check,
  ChevronLeft,
  HeartHandshake,
  Play,
  Sparkles,
  Square,
  Wind,
  Activity,
} from "lucide-react";

const ICONS = {
  breathing: Wind,
  grounding: Brain,
  release: Activity,
  gratitude: HeartHandshake,
} as const;

type Props = {
  onSaveGratitudeToJournal?: (text: string) => void;
};

export function MentalExercisesPanel({ onSaveGratitudeToJournal }: Props) {
  const [activeId, setActiveId] = useState<ExerciseId | null>(null);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState<ExerciseStreak>({ count: 0, lastDate: "", totalCompleted: 0 });

  useEffect(() => {
    setStreak(readExerciseStreak());
  }, []);

  function open(id: ExerciseId) {
    setCompleted(false);
    setActiveId(id);
  }

  function close() {
    setActiveId(null);
    setCompleted(false);
  }

  function finish() {
    setStreak(recordExerciseCompletion());
    setCompleted(true);
  }

  if (activeId) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
        <button
          type="button"
          onClick={close}
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-700"
        >
          <ChevronLeft className="h-4 w-4" /> Tous les exercices
        </button>

        {completed ? (
          <CompletionView streak={streak} onAgain={() => open(activeId)} onClose={close} />
        ) : activeId === "breathing" ? (
          <BreathingSession onDone={finish} onStop={close} />
        ) : activeId === "grounding" ? (
          <GroundingSession onDone={finish} onStop={close} />
        ) : activeId === "release" ? (
          <ReleaseSession onDone={finish} onStop={close} />
        ) : (
          <GratitudeSession
            onDone={finish}
            onStop={close}
            onSaveToJournal={onSaveGratitudeToJournal}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-800 p-5 text-white sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white/15 p-2.5">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold sm:text-xl">Exercices anti-stress</h2>
            <p className="mt-1 text-sm text-emerald-50/90">
              Courtes pauses guidées — sans matériel. Choisissez selon ce dont vous avez besoin
              maintenant.
            </p>
            {(streak.count > 0 || streak.totalCompleted > 0) && (
              <p className="mt-3 text-xs font-medium text-emerald-100">
                {streak.count > 0 ? `🔥 ${streak.count} jour${streak.count > 1 ? "s" : ""} d’affilée` : null}
                {streak.count > 0 && streak.totalCompleted > 0 ? " · " : null}
                {streak.totalCompleted > 0
                  ? `${streak.totalCompleted} exercice${streak.totalCompleted > 1 ? "s" : ""} terminé${streak.totalCompleted > 1 ? "s" : ""}`
                  : null}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {MENTAL_EXERCISES.map((ex) => {
          const Icon = ICONS[ex.id];
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => open(ex.id)}
              className="group rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md active:scale-[0.99] sm:p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                  {ex.durationLabel}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <h3 className="font-semibold text-slate-900">{ex.title}</h3>
                <span className="rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-medium text-teal-700">
                  {ex.tag}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-slate-600">{ex.description}</p>
              <p className="mt-2 text-xs text-slate-500">{ex.why}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                <Play className="h-3.5 w-3.5" /> Commencer
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CompletionView({
  streak,
  onAgain,
  onClose,
}: {
  streak: ExerciseStreak;
  onAgain: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Check className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-slate-900">Bien joué</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600">
        Vous avez pris un moment pour vous. Même deux minutes comptent.
      </p>
      {streak.count > 0 && (
        <p className="mt-3 text-sm font-medium text-emerald-700">
          Série : {streak.count} jour{streak.count > 1 ? "s" : ""}
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={onAgain}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white"
        >
          Refaire
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700"
        >
          Retour
        </button>
      </div>
    </div>
  );
}

function SessionChrome({
  title,
  progress,
  onStop,
  children,
}: {
  title: string;
  progress: number;
  onStop: () => void;
  children: React.ReactNode;
}) {
  const pct = Math.min(100, Math.max(0, progress * 100));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <button
          type="button"
          onClick={onStop}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600"
        >
          <Square className="h-3 w-3" /> Arrêter
        </button>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {children}
    </div>
  );
}

function BreathingSession({ onDone, onStop }: { onDone: () => void; onStop: () => void }) {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [tick, setTick] = useState(BREATH_PHASE_MS / 1000);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    doneRef.current = false;
    let phaseIdx = 0;
    let cycleIdx = 0;
    setPhase(0);
    setCycle(0);
    setTick(BREATH_PHASE_MS / 1000);

    const countdown = setInterval(() => {
      setTick((t) => Math.max(1, t - 1));
    }, 1000);

    const advance = setInterval(() => {
      if (doneRef.current) return;
      phaseIdx = (phaseIdx + 1) % 4;
      setPhase(phaseIdx);
      setTick(BREATH_PHASE_MS / 1000);
      if (phaseIdx === 0) {
        cycleIdx += 1;
        setCycle(cycleIdx);
        if (cycleIdx >= BREATH_CYCLES) {
          doneRef.current = true;
          clearInterval(countdown);
          clearInterval(advance);
          onDoneRef.current();
        }
      }
    }, BREATH_PHASE_MS);

    return () => {
      clearInterval(countdown);
      clearInterval(advance);
    };
  }, []);

  const meta = BREATH_PHASES[phase];
  const progress = (cycle * 4 + phase) / (BREATH_CYCLES * 4);

  return (
    <SessionChrome title="Respiration carrée" progress={progress} onStop={onStop}>
      <div className="flex flex-col items-center py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Cycle {Math.min(cycle + 1, BREATH_CYCLES)} / {BREATH_CYCLES}
        </p>
        <div
          className="mt-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-700 text-center text-white shadow-lg transition-transform duration-[4000ms] ease-in-out sm:h-40 sm:w-40"
          style={{ transform: `scale(${meta.scale})` }}
        >
          <div>
            <div className="text-lg font-bold sm:text-xl">{meta.label}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{tick}</div>
          </div>
        </div>
        <p className="mt-5 max-w-xs text-center text-sm text-slate-600">{meta.hint}</p>
      </div>
    </SessionChrome>
  );
}

function GroundingSession({ onDone, onStop }: { onDone: () => void; onStop: () => void }) {
  const [step, setStep] = useState(0);
  const [checks, setChecks] = useState(0);
  const current = GROUNDING_STEPS[step];

  const progress = (step + checks / current.count) / GROUNDING_STEPS.length;

  function addCheck() {
    if (checks + 1 >= current.count) {
      if (step + 1 >= GROUNDING_STEPS.length) {
        onDone();
      } else {
        setStep((s) => s + 1);
        setChecks(0);
      }
    } else {
      setChecks((c) => c + 1);
    }
  }

  return (
    <SessionChrome title="Ancrage 5-4-3-2-1" progress={progress} onStop={onStop}>
      <div className="space-y-4">
        <div className="rounded-xl bg-emerald-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Étape {step + 1}/5 — {current.sense}
          </p>
          <p className="mt-1 text-base font-medium text-slate-900">{current.prompt}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {current.examples.map((ex) => (
            <span
              key={ex}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
            >
              ex. {ex}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: current.count }).map((_, i) => (
            <span
              key={i}
              className={`h-3 flex-1 rounded-full ${
                i < checks ? "bg-emerald-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <p className="text-center text-sm text-slate-500">
          {checks}/{current.count} — touchez quand vous en avez trouvé une
        </p>

        <button
          type="button"
          onClick={addCheck}
          className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white"
        >
          {checks + 1 >= current.count && step + 1 >= GROUNDING_STEPS.length
            ? "Terminer"
            : checks + 1 >= current.count
              ? "Étape suivante"
              : "J’en ai trouvé une"}
        </button>
      </div>
    </SessionChrome>
  );
}

function ReleaseSession({ onDone, onStop }: { onDone: () => void; onStop: () => void }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"tense" | "release">("tense");
  const [seconds, setSeconds] = useState(RELEASE_HOLD_MS / 1000);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const step = RELEASE_STEPS[index];
  const totalUnits = RELEASE_STEPS.length * 2;
  const doneUnits = index * 2 + (mode === "release" ? 1 : 0);
  const progress = doneUnits / totalUnits;

  useEffect(() => {
    const duration = mode === "tense" ? RELEASE_HOLD_MS : RELEASE_REST_MS;
    setSeconds(Math.round(duration / 1000));
    const countdown = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    const timer = setTimeout(() => {
      if (mode === "tense") {
        setMode("release");
      } else if (index + 1 >= RELEASE_STEPS.length) {
        onDoneRef.current();
      } else {
        setIndex((i) => i + 1);
        setMode("tense");
      }
    }, duration);
    return () => {
      clearInterval(countdown);
      clearTimeout(timer);
    };
  }, [index, mode]);

  return (
    <SessionChrome title="Relâchement corps" progress={progress} onStop={onStop}>
      <div className="flex flex-col items-center py-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          {step.title} — {mode === "tense" ? "Serrez" : "Relâchez"}
        </p>
        <p className="mt-4 max-w-sm text-lg font-medium text-slate-900">
          {mode === "tense" ? step.tense : step.release}
        </p>
        <div
          className={`mt-8 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold tabular-nums text-white transition-all ${
            mode === "tense" ? "bg-amber-500 scale-110" : "bg-emerald-600 scale-95"
          }`}
        >
          {seconds}
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Zone {index + 1} / {RELEASE_STEPS.length}
        </p>
      </div>
    </SessionChrome>
  );
}

function GratitudeSession({
  onDone,
  onStop,
  onSaveToJournal,
}: {
  onDone: () => void;
  onStop: () => void;
  onSaveToJournal?: (text: string) => void;
}) {
  const [items, setItems] = useState(["", "", ""]);
  const filled = items.filter((t) => t.trim()).length;
  const progress = filled / 3;

  const canFinish = filled >= 3;

  const saveText = useMemo(() => {
    const lines = items.map((t, i) => `${i + 1}. ${t.trim()}`).join("\n");
    return `Aujourd’hui, je suis reconnaissant(e) pour :\n${lines}`;
  }, [items]);

  const finish = useCallback(() => {
    if (!canFinish) return;
    onSaveToJournal?.(saveText);
    onDone();
  }, [canFinish, onDone, onSaveToJournal, saveText]);

  return (
    <SessionChrome title="Trois points positifs" progress={progress} onStop={onStop}>
      <div className="space-y-3">
        <p className="text-sm text-slate-600">
          Même tout petit. Pas besoin que ce soit « important ».
        </p>
        {items.map((value, i) => (
          <label key={i} className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">
              Point positif {i + 1}
            </span>
            <input
              value={value}
              onChange={(e) =>
                setItems((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
              }
              placeholder={
                i === 0
                  ? "ex. un verre d’eau fraîche"
                  : i === 1
                    ? "ex. quelqu’un m’a salué"
                    : "ex. un moment sans téléphone"
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-400"
            />
          </label>
        ))}
        <button
          type="button"
          disabled={!canFinish}
          onClick={finish}
          className="mt-2 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          {onSaveToJournal ? "Terminer (prépare le journal)" : "Terminer"}
        </button>
      </div>
    </SessionChrome>
  );
}
