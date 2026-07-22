"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Shield, Smartphone } from "lucide-react";
import type { Factor } from "@supabase/supabase-js";

export function MfaSettings() {
  const supabase = createClient();
  const [factors, setFactors] = useState<Factor[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadFactors() {
    const { data, error: err } = await supabase.auth.mfa.listFactors();
    if (err) {
      setError(err.message);
    } else {
      setFactors([...(data?.totp ?? []), ...(data?.phone ?? [])]);
    }
    setLoading(false);
  }

  useEffect(() => { loadFactors(); }, []);

  async function startEnroll() {
    setEnrolling(true);
    setError(null);
    setMsg(null);

    const { data, error: err } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "GoSanté Authenticator",
    });

    if (err) {
      setError(err.message);
      setEnrolling(false);
      return;
    }

    setFactorId(data.id);
    setQr(data.totp.qr_code);
    setEnrolling(false);
  }

  async function verifyEnroll(e: React.FormEvent) {
    e.preventDefault();
    if (!factorId) return;
    setError(null);

    const { data: challenge, error: chErr } = await supabase.auth.mfa.challenge({ factorId });
    if (chErr) {
      setError(chErr.message);
      return;
    }

    const { error: verErr } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code,
    });

    if (verErr) {
      setError(verErr.message);
      return;
    }

    setMsg("MFA activée avec succès");
    setQr(null);
    setFactorId(null);
    setCode("");
    loadFactors();
  }

  async function unenroll(id: string) {
    const { error: err } = await supabase.auth.mfa.unenroll({ factorId: id });
    if (err) setError(err.message);
    else {
      setMsg("Facteur supprimé");
      loadFactors();
    }
  }

  const verified = factors.filter((f) => f.status === "verified");

  return (
      <div className="mx-auto max-w-lg space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sécurité du compte</h1>
          <p className="text-slate-600">Authentification à deux facteurs (MFA / TOTP)</p>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
          </div>
        )}

        {error && <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}
        {msg && <div className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-800">{msg}</div>}

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Shield className="h-6 w-6 text-emerald-600" />
            <div>
              <h2 className="font-semibold">Authenticator (TOTP)</h2>
              <p className="text-sm text-slate-500">Google Authenticator, Authy, etc.</p>
            </div>
          </div>

          {verified.length > 0 ? (
            <ul className="space-y-2">
              {verified.map((f) => (
                <li key={f.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <span>{f.friendly_name ?? "TOTP"} — actif</span>
                  <button type="button" onClick={() => unenroll(f.id)} className="text-red-600 text-xs">
                    Désactiver
                  </button>
                </li>
              ))}
            </ul>
          ) : qr ? (
            <form onSubmit={verifyEnroll} className="space-y-4">
              {qr.startsWith("data:") || qr.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qr} alt="QR MFA" className="mx-auto h-48 w-48" />
              ) : (
                <div className="rounded bg-slate-100 p-4 text-center text-xs break-all">{qr}</div>
              )}
              <p className="text-sm text-slate-600">Scannez le QR code puis entrez le code à 6 chiffres.</p>
              <input
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full rounded-lg border px-3 py-2 text-center text-lg tracking-widest"
                placeholder="123456"
                required
              />
              <button
                type="submit"
                disabled={code.length < 6}
                className="w-full rounded-lg bg-emerald-600 py-2.5 font-medium text-white disabled:opacity-60"
              >
                Activer MFA
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={startEnroll}
              disabled={enrolling}
              className="w-full rounded-lg bg-emerald-600 py-2.5 font-medium text-white disabled:opacity-60"
            >
              {enrolling ? "Préparation…" : "Configurer MFA"}
            </button>
          )}
        </section>

        <section className="rounded-2xl border border-dashed p-5 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-medium text-slate-800">
            <Smartphone className="h-5 w-5" />
            Connexion SMS OTP
          </div>
          <p className="mt-2">
            La connexion par SMS est disponible sur l&apos;écran de login (onglet SMS OTP).
            Activez le provider Phone dans Supabase Auth avec Twilio ou MessageBird.
          </p>
        </section>
      </div>
  );
}
