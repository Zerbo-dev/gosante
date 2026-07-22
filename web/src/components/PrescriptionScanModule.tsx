"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { matchMedicationsFromOcr } from "@/lib/gosante";
import { useCart } from "@/lib/cart";
import type { MatchedMedication } from "@/types";
import { Camera, Loader2, Save, ShoppingCart, Upload } from "lucide-react";
import Link from "next/link";

export function PrescriptionScanModule() {
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState("");
  const [items, setItems] = useState<MatchedMedication[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { addItem } = useCart();

  async function handleFile(file: File) {
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setLoading(true);
    setMessage(null);

    try {
      const Tesseract = await import("tesseract.js");
      const { data } = await Tesseract.recognize(file, "fra", {
        logger: () => undefined,
      });
      const text = data.text;
      setOcrText(text);
      setItems(matchMedicationsFromOcr(text));
    } catch {
      setMessage("Erreur OCR. Vérifiez la qualité de la photo.");
    } finally {
      setLoading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function updateItem(index: number, dci: string) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              medication_dci: dci,
              raw_text: dci,
              confidence: 1,
              matched: item.matched ? { ...item.matched, dci } : null,
            }
          : item
      )
    );
  }

  async function savePrescription() {
    setSaving(true);
    setMessage(null);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setMessage("Connectez-vous pour enregistrer.");
      setSaving(false);
      return;
    }

    const { data: prescription, error } = await supabase
      .from("prescriptions")
      .insert({
        user_id: user.id,
        ocr_raw_text: ocrText,
        status: "processed",
      })
      .select()
      .single();

    if (error || !prescription) {
      setMessage("Erreur lors de l'enregistrement.");
      setSaving(false);
      return;
    }

    if (imageFile) {
      const ext = imageFile.name.split(".").pop() ?? "jpg";
      const path = `${user.id}/${prescription.id}.${ext}`;
      await supabase.storage.from("prescriptions").upload(path, imageFile, { upsert: true });
      await supabase.from("prescriptions").update({ image_path: path }).eq("id", prescription.id);
    }

    if (items.length > 0) {
      await supabase.from("prescription_items").insert(
        items.map((item) => ({
          prescription_id: prescription.id,
          raw_text: item.raw_text,
          medication_dci: item.medication_dci,
          dosage: item.dosage,
          confidence: item.confidence,
          validated: item.confidence >= 0.7,
        }))
      );
    }

    setMessage("Ordonnance enregistrée dans votre carnet.");
    setSaving(false);
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scan d&apos;ordonnance</h1>
          <p className="text-slate-600">
            Photographiez une ordonnance — reconnaissance OCR et correspondance LNME Burkina 2023
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-semibold">1. Capturer l&apos;ordonnance</h2>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={onFileChange}
            />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white"
              >
                <Camera className="h-4 w-4" />
                Prendre une photo
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm"
              >
                <Upload className="h-4 w-4" />
                Importer une image
              </button>
            </div>
            {imagePreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt="Ordonnance"
                className="mt-4 max-h-80 w-full rounded-xl border object-contain"
              />
            )}
            {loading && (
              <div className="mt-4 flex items-center gap-2 text-sm text-sky-700">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyse OCR en cours...
              </div>
            )}
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-semibold">2. Texte détecté</h2>
            <textarea
              rows={10}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={ocrText}
              onChange={(e) => {
                setOcrText(e.target.value);
                setItems(matchMedicationsFromOcr(e.target.value));
              }}
              placeholder="Le texte extrait apparaîtra ici. Vous pouvez le corriger manuellement."
            />
          </section>
        </div>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold">3. Médicaments identifiés</h2>
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucun médicament détecté. Scannez une ordonnance ou saisissez le texte manuellement.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl border p-4 ${
                    item.confidence >= 0.7 ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase">
                      Confiance {Math.round(item.confidence * 100)}%
                    </span>
                    {item.matched?.pvp && (
                      <span className="text-sm font-semibold text-emerald-800">
                        PVP: {item.matched.pvp.toLocaleString("fr-FR")} FCFA
                      </span>
                    )}
                  </div>
                  <input
                    className="mb-2 w-full rounded-lg border border-white bg-white px-3 py-2 text-sm"
                    value={item.medication_dci ?? item.raw_text}
                    onChange={(e) => updateItem(index, e.target.value)}
                  />
                  {item.matched && (
                    <p className="text-sm text-slate-600">
                      Correspondance: {item.matched.designation}
                      {item.dosage && ` — ${item.dosage}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  items.forEach((item) => {
                    if (item.matched) addItem(item.matched);
                  });
                  setMessage("Médicaments ajoutés au panier.");
                }}
                className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800"
              >
                <ShoppingCart className="h-4 w-4" />
                Ajouter au panier
              </button>
              <Link
                href="/dashboard/pharmacie"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
              >
                Commander →
              </Link>
              <button
                type="button"
                onClick={savePrescription}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          )}
          {message && <p className="mt-3 text-sm text-emerald-700">{message}</p>}
        </section>
      </div>
  );
}
