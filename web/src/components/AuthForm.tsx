"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { HeartPulse, Eye, EyeOff } from "lucide-react";

function formatAuthError(err: unknown, fallback = "Une erreur est survenue"): string {
  if (!err) return fallback;
  if (typeof err === "string") {
    const t = err.trim();
    return !t || t === "{}" ? fallback : t;
  }
  if (err instanceof Error) {
    const t = err.message?.trim();
    if (t && t !== "{}") {
      if (/confirmation email|sending confirmation/i.test(t)) {
        return "Impossible d'envoyer l'email de confirmation. Vérifiez la config SMTP Supabase (Authentication → Email), puis réessayez.";
      }
      if (/already|registered|exists/i.test(t)) {
        return "Cet email est déjà utilisé. Connectez-vous ou réinitialisez votre mot de passe.";
      }
      return t;
    }
  }
  const o = err as Record<string, unknown>;
  for (const key of ["msg", "message", "error_description", "error"]) {
    const v = o[key];
    if (typeof v === "string" && v.trim() && v.trim() !== "{}") return v.trim();
  }
  return fallback;
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  async function finishLogin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("Connexion échouée : session non créée. Vérifiez la config Supabase.");
      setLoading(false);
      return;
    }

    window.location.assign("/dashboard");
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      if (mode === "register" && !consent) {
        setError("Vous devez accepter la politique de confidentialité.");
        setLoading(false);
        return;
      }

      if (mode === "register") {
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
          (typeof window !== "undefined" ? window.location.origin : "");

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: siteUrl ? `${siteUrl}/login` : undefined,
          },
        });

        if (signUpError) {
          setError(formatAuthError(signUpError, "Inscription impossible"));
          setLoading(false);
          return;
        }

        // Compte créé mais email non confirmé → pas de session
        if (!data.session) {
          setInfo(
            "Compte créé. Vérifiez votre boîte mail et cliquez sur le lien de confirmation avant de vous connecter."
          );
          setLoading(false);
          return;
        }

        await finishLogin();
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        const msg = formatAuthError(signInError, "Email ou mot de passe incorrect");
        if (/confirm|verify|not confirmed/i.test(msg)) {
          setError("Confirmez d'abord votre email via le lien reçu, puis reconnectez-vous.");
        } else {
          setError(msg);
        }
        setLoading(false);
        return;
      }

      await finishLogin();
    } catch (err) {
      setError(formatAuthError(err));
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-3 py-8 sm:px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-8">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <HeartPulse className="h-7 w-7 shrink-0 text-emerald-600 sm:h-8 sm:w-8" />
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">GoSanté</h1>
            <p className="text-sm text-slate-500">
              {mode === "login" ? "Connexion à votre espace" : "Créer un compte patient"}
            </p>
          </div>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nom complet</label>
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                minLength={6}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 outline-none focus:border-emerald-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {mode === "register" && (
            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 rounded border-slate-300"
                required
              />
              <span>
                J&apos;accepte la{" "}
                <Link href="/confidentialite" className="text-emerald-700 underline" target="_blank">
                  politique de confidentialité
                </Link>
                .
              </span>
            </label>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {info && <p className="text-sm text-emerald-700">{info}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {mode === "login" ? (
            <>
              Pas encore de compte ?{" "}
              <Link href="/register" className="font-medium text-emerald-700 hover:underline">
                S&apos;inscrire
              </Link>
            </>
          ) : (
            <>
              Déjà inscrit ?{" "}
              <Link href="/login" className="font-medium text-emerald-700 hover:underline">
                Se connecter
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
