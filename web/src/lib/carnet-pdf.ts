import { jsPDF } from "jspdf";
import type { MedicalHistoryEntry, MedicalRecord } from "@/types";

type PatientInfo = {
  fullName: string | null;
  phone: string | null;
};

const C = {
  brand: [6, 95, 70] as const, // emerald-900
  brandMid: [5, 150, 105] as const, // emerald-600
  brandSoft: [236, 253, 245] as const, // emerald-50
  brandLine: [167, 243, 208] as const, // emerald-200
  ink: [15, 23, 42] as const, // slate-900
  body: [51, 65, 85] as const, // slate-700
  mute: [100, 116, 139] as const, // slate-500
  line: [226, 232, 240] as const, // slate-200
  paper: [255, 255, 255] as const,
  wash: [248, 250, 252] as const, // slate-50
  danger: [159, 18, 57] as const, // rose-800
  dangerSoft: [255, 241, 242] as const, // rose-50
  dangerLine: [254, 205, 211] as const,
  warn: [146, 64, 14] as const, // amber-800
  warnSoft: [255, 251, 235] as const,
  warnLine: [253, 230, 138] as const,
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 14;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_Y = PAGE_H - 12;
const CONTENT_BOTTOM = PAGE_H - 18;

const ENTRY_TYPE_LABELS: Record<string, string> = {
  consultation: "Consultation",
  examen: "Examen",
  hospitalisation: "Hospitalisation",
  autre: "Autre",
};

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR");
}

function docRef() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const r = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `GS-CM-${y}${m}${day}-${r}`;
}

class CarnetPdf {
  doc = new jsPDF({ unit: "mm", format: "a4" });
  y = 0;
  page = 1;
  ref: string;
  editedAt: string;

  constructor(private patient: PatientInfo) {
    this.ref = docRef();
    this.editedAt = new Date().toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    this.drawChrome(true);
    this.y = 72;
  }

  private fill(c: readonly number[]) {
    this.doc.setFillColor(c[0], c[1], c[2]);
  }
  private stroke(c: readonly number[]) {
    this.doc.setDrawColor(c[0], c[1], c[2]);
  }
  private ink(c: readonly number[]) {
    this.doc.setTextColor(c[0], c[1], c[2]);
  }

  private drawChrome(firstPage: boolean) {
    const { doc } = this;

    // Fond papier
    this.fill(C.wash);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");

    // Marge latérale brand
    this.fill(C.brand);
    doc.rect(0, 0, 4, PAGE_H, "F");

    // En-tête
    this.fill(C.brand);
    doc.rect(0, 0, PAGE_W, firstPage ? 34 : 22, "F");
    this.fill(C.brandMid);
    doc.rect(0, firstPage ? 34 : 22, PAGE_W, 1.2, "F");

    // Marque + croix
    this.fill(C.paper);
    doc.roundedRect(MARGIN + 2, firstPage ? 8 : 5, firstPage ? 16 : 12, firstPage ? 16 : 12, 2.5, 2.5, "F");
    this.fill(C.brandMid);
    const cx = MARGIN + 2 + (firstPage ? 8 : 6);
    const cy = (firstPage ? 8 : 5) + (firstPage ? 8 : 6);
    const arm = firstPage ? 5.5 : 4;
    const thick = firstPage ? 2.2 : 1.8;
    doc.rect(cx - thick / 2, cy - arm, thick, arm * 2, "F");
    doc.rect(cx - arm, cy - thick / 2, arm * 2, thick, "F");

    this.ink(C.paper);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(firstPage ? 16 : 12);
    doc.text("GoSanté", MARGIN + (firstPage ? 22 : 18), firstPage ? 14.5 : 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    this.ink([209, 250, 229]);
    doc.text(
      firstPage
        ? "Carnet médical personnel  ·  Burkina Faso"
        : "Carnet médical  ·  Document confidentiel",
      MARGIN + (firstPage ? 22 : 18),
      firstPage ? 21 : 16
    );

    // Réf. document à droite
    this.ink(C.paper);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(this.ref, PAGE_W - MARGIN, firstPage ? 13 : 9.5, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    this.ink([167, 243, 208]);
    doc.text("EXPORT PDF", PAGE_W - MARGIN, firstPage ? 18 : 14.5, { align: "right" });

    if (firstPage) {
      // Bande identité patient
      this.fill(C.paper);
      this.stroke(C.brandLine);
      doc.setLineWidth(0.35);
      doc.roundedRect(MARGIN, 40, CONTENT_W, 26, 2.5, 2.5, "FD");

      // Pastille initiale
      const initials = (this.patient.fullName || "P")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
      this.fill(C.brandSoft);
      doc.circle(MARGIN + 13, 53, 8, "F");
      this.ink(C.brand);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(initials || "P", MARGIN + 13, 54.8, { align: "center" });

      this.ink(C.ink);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(this.patient.fullName || "Patient GoSanté", MARGIN + 26, 48);

      this.ink(C.mute);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      const leftMeta = [
        this.patient.phone ? `Tél. ${this.patient.phone}` : "Tél. non renseigné",
        `Édité le ${this.editedAt}`,
      ].join("   ·   ");
      doc.text(leftMeta, MARGIN + 26, 55);

      this.ink(C.mute);
      doc.setFontSize(7.5);
      doc.text("À présenter aux professionnels de santé", MARGIN + 26, 61);
    }

    // Pied de page
    this.stroke(C.line);
    doc.setLineWidth(0.25);
    doc.line(MARGIN, FOOTER_Y - 4, PAGE_W - MARGIN, FOOTER_Y - 4);
    this.ink(C.mute);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("Confidentiel — usage médical uniquement  ·  gosante.vercel.app", MARGIN, FOOTER_Y);
    doc.text(`Page ${this.page}`, PAGE_W - MARGIN, FOOTER_Y, { align: "right" });
  }

  private ensure(h: number) {
    if (this.y + h <= CONTENT_BOTTOM) return;
    this.doc.addPage();
    this.page += 1;
    this.drawChrome(false);
    this.y = 30;
  }

  /** Bande d’alerte allergies en tête de document */
  alertBanner(allergies: string[]) {
    if (!allergies.length) return;
    this.ensure(18);
    const { doc } = this;
    const text = allergies.join("  ·  ");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(text, CONTENT_W - 28);
    const h = 10 + lines.length * 4.2;

    this.fill(C.dangerSoft);
    this.stroke(C.dangerLine);
    doc.setLineWidth(0.4);
    doc.roundedRect(MARGIN, this.y, CONTENT_W, h, 2, 2, "FD");

    // pastille ALERTE
    this.fill(C.danger);
    doc.roundedRect(MARGIN + 3, this.y + 3, 16, 5.5, 1.2, 1.2, "F");
    this.ink(C.paper);
    doc.setFontSize(6.5);
    doc.text("ALERTE", MARGIN + 11, this.y + 6.8, { align: "center" });

    this.ink(C.danger);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Allergies connues", MARGIN + 22, this.y + 6.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    let ty = this.y + 11.5;
    for (const line of lines) {
      doc.text(line, MARGIN + 22, ty);
      ty += 4.2;
    }
    this.y += h + 5;
  }

  section(title: string, accent: readonly number[] = C.brandMid) {
    this.ensure(12);
    const { doc } = this;
    this.fill(accent);
    doc.roundedRect(MARGIN, this.y + 0.5, 2.2, 6.5, 0.8, 0.8, "F");
    this.ink(C.ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(title, MARGIN + 5.5, this.y + 5.5);
    this.stroke(C.line);
    doc.setLineWidth(0.3);
    doc.line(MARGIN + 5.5, this.y + 8.5, PAGE_W - MARGIN, this.y + 8.5);
    this.y += 12;
  }

  vitalCards(
    bloodType: string | null,
    emergencyName: string | null,
    emergencyPhone: string | null
  ) {
    this.ensure(28);
    const { doc } = this;
    const gap = 4;
    const half = (CONTENT_W - gap) / 2;

    // Groupe sanguin
    this.fill(C.dangerSoft);
    this.stroke(C.dangerLine);
    doc.setLineWidth(0.35);
    doc.roundedRect(MARGIN, this.y, half, 24, 2.5, 2.5, "FD");
    this.ink(C.danger);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("GROUPE SANGUIN", MARGIN + 5, this.y + 7);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(bloodType || "—", MARGIN + 5, this.y + 18);

    // Contact urgence
    this.fill(C.warnSoft);
    this.stroke(C.warnLine);
    doc.roundedRect(MARGIN + half + gap, this.y, half, 24, 2.5, 2.5, "FD");
    this.ink(C.warn);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("CONTACT D'URGENCE", MARGIN + half + gap + 5, this.y + 7);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const name = emergencyName || "Non renseigné";
    doc.text(doc.splitTextToSize(name, half - 10)[0], MARGIN + half + gap + 5, this.y + 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(emergencyPhone || "—", MARGIN + half + gap + 5, this.y + 20);

    this.y += 30;
  }

  chips(items: string[], color: readonly number[], bg: readonly number[], border: readonly number[]) {
    if (!items.length) {
      this.empty("Aucune information renseignée");
      return;
    }
    const { doc } = this;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    let x = MARGIN;
    let rowH = 7.5;
    this.ensure(rowH + 2);

    for (const item of items) {
      const w = Math.min(doc.getTextWidth(item) + 7, CONTENT_W);
      if (x + w > PAGE_W - MARGIN) {
        x = MARGIN;
        this.y += rowH + 2.5;
        this.ensure(rowH + 2);
      }
      this.fill(bg);
      this.stroke(border);
      doc.setLineWidth(0.25);
      doc.roundedRect(x, this.y, w, rowH, 2, 2, "FD");
      this.ink(color);
      doc.text(item, x + 3.5, this.y + 5);
      x += w + 2.5;
    }
    this.y += rowH + 8;
  }

  empty(text: string) {
    this.ensure(8);
    this.ink(C.mute);
    this.doc.setFont("helvetica", "italic");
    this.doc.setFontSize(9);
    this.doc.text(text, MARGIN + 1, this.y + 3.5);
    this.y += 9;
  }

  vaccineTable(vaccines: { name: string; date?: string }[]) {
    if (!vaccines.length) {
      this.empty("Aucun vaccin enregistré");
      return;
    }
    const { doc } = this;
    const rowH = 7.8;
    const colDate = MARGIN + CONTENT_W * 0.68;

    this.ensure(rowH + 2);
    this.fill(C.brand);
    doc.roundedRect(MARGIN, this.y, CONTENT_W, rowH, 1.5, 1.5, "F");
    // square bottom corners of header
    doc.rect(MARGIN, this.y + rowH - 2, CONTENT_W, 2, "F");
    this.ink(C.paper);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("Vaccin", MARGIN + 4, this.y + 5.2);
    doc.text("Date", colDate, this.y + 5.2);
    this.y += rowH;

    vaccines.forEach((v, i) => {
      this.ensure(rowH);
      this.fill(i % 2 === 0 ? C.paper : C.brandSoft);
      doc.rect(MARGIN, this.y, CONTENT_W, rowH, "F");
      this.stroke(C.line);
      doc.setLineWidth(0.15);
      doc.line(MARGIN, this.y + rowH, PAGE_W - MARGIN, this.y + rowH);

      this.ink(C.body);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const name = doc.splitTextToSize(v.name, CONTENT_W * 0.62)[0];
      doc.text(name, MARGIN + 4, this.y + 5.2);
      doc.text(formatDateShort(v.date), colDate, this.y + 5.2);
      this.y += rowH;
    });
    this.y += 7;
  }

  notesBox(text: string) {
    const { doc } = this;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const lines = doc.splitTextToSize(text, CONTENT_W - 10);
    const h = 8 + lines.length * 5;
    this.ensure(h);
    this.fill(C.paper);
    this.stroke(C.line);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, this.y, CONTENT_W, h, 2, 2, "FD");
    this.ink(C.body);
    let ty = this.y + 6;
    for (const line of lines) {
      doc.text(line, MARGIN + 5, ty);
      ty += 5;
    }
    this.y += h + 6;
  }

  historyEntry(entry: MedicalHistoryEntry) {
    const { doc } = this;
    const label = ENTRY_TYPE_LABELS[entry.entry_type] ?? entry.entry_type;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const description = entry.description
      ? doc.splitTextToSize(entry.description, CONTENT_W - 18)
      : [];
    const h = 16 + description.length * 4.4 + (entry.facility_name ? 4.5 : 0);
    this.ensure(h + 3);

    // Timeline
    this.fill(C.brandMid);
    doc.circle(MARGIN + 2.2, this.y + 5, 1.5, "F");
    this.stroke(C.brandLine);
    doc.setLineWidth(0.6);
    doc.line(MARGIN + 2.2, this.y + 7, MARGIN + 2.2, this.y + h - 1);

    this.fill(C.paper);
    this.stroke(C.line);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN + 7, this.y, CONTENT_W - 7, h, 2, 2, "FD");

    // Badge
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    const badge = label.toUpperCase();
    const badgeW = doc.getTextWidth(badge) + 5;
    this.fill(C.brandSoft);
    doc.roundedRect(MARGIN + 10, this.y + 3, badgeW, 5, 1.5, 1.5, "F");
    this.ink(C.brand);
    doc.text(badge, MARGIN + 12.5, this.y + 6.5);

    this.ink(C.mute);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(formatDate(entry.entry_date) || "Date inconnue", PAGE_W - MARGIN - 4, this.y + 6.5, {
      align: "right",
    });

    this.ink(C.ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(entry.title, MARGIN + 10, this.y + 13);

    let iy = this.y + 13;
    if (entry.facility_name) {
      iy += 4.5;
      this.ink(C.mute);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.text(entry.facility_name, MARGIN + 10, iy);
    }
    if (description.length) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      this.ink(C.body);
      for (const line of description) {
        iy += 4.4;
        doc.text(line, MARGIN + 10, iy);
      }
    }
    this.y += h + 3.5;
  }

  signatureBlock() {
    this.ensure(38);
    const { doc } = this;
    this.section("Validation professionnelle", C.brand);

    this.fill(C.paper);
    this.stroke(C.line);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, this.y, CONTENT_W, 30, 2, 2, "FD");

    const colW = (CONTENT_W - 6) / 2;
    this.ink(C.mute);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Professionnel de santé (nom & qualité)", MARGIN + 4, this.y + 6);
    doc.text("Signature & cachet", MARGIN + colW + 8, this.y + 6);

    this.stroke(C.line);
    doc.setLineWidth(0.25);
    doc.line(MARGIN + 4, this.y + 24, MARGIN + colW - 2, this.y + 24);
    doc.line(MARGIN + colW + 8, this.y + 24, PAGE_W - MARGIN - 4, this.y + 24);

    this.ink(C.mute);
    doc.setFontSize(7);
    doc.text("Date : ____ / ____ / ________", MARGIN + 4, this.y + 28);

    this.y += 34;
  }

  disclaimer() {
    this.ensure(16);
    const { doc } = this;
    this.fill(C.wash);
    this.stroke(C.line);
    doc.setLineWidth(0.25);
    doc.roundedRect(MARGIN, this.y, CONTENT_W, 14, 2, 2, "FD");
    this.ink(C.mute);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    const lines = doc.splitTextToSize(
      "Ce document est généré à partir des informations saisies par le patient sur GoSanté. " +
        "Il ne remplace pas un dossier médical hospitalier. Vérifiez les données avant toute décision clinique. " +
        `Référence ${this.ref}.`,
      CONTENT_W - 8
    );
    let ty = this.y + 5;
    for (const line of lines) {
      doc.text(line, MARGIN + 4, ty);
      ty += 3.5;
    }
    this.y += 16;
  }

  /** Met à jour les numéros de page « Page X / N » */
  finalize() {
    const total = this.doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      this.doc.setPage(i);
      // Efface approximativement la zone page puis réécrit
      this.fill(C.wash);
      this.doc.rect(PAGE_W - MARGIN - 28, FOOTER_Y - 3.5, 28, 5, "F");
      this.ink(C.mute);
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(7);
      this.doc.text(`Page ${i} / ${total}`, PAGE_W - MARGIN, FOOTER_Y, { align: "right" });
    }
  }

  save(fileName: string) {
    this.finalize();
    this.doc.save(fileName);
  }
}

export function exportCarnetPdf(
  patient: PatientInfo,
  record: Omit<MedicalRecord, "id" | "user_id">,
  history: MedicalHistoryEntry[]
) {
  const pdf = new CarnetPdf(patient);

  pdf.alertBanner(record.allergies);

  pdf.section("Informations vitales", C.danger);
  pdf.vitalCards(record.blood_type, record.emergency_contact_name, record.emergency_contact_phone);

  pdf.section("Allergies", C.danger);
  pdf.chips(record.allergies, C.danger, C.dangerSoft, C.dangerLine);

  pdf.section("Maladies chroniques", C.warn);
  pdf.chips(record.chronic_conditions, C.warn, C.warnSoft, C.warnLine);

  pdf.section("Traitements en cours", C.brandMid);
  pdf.chips(record.current_treatments, C.brand, C.brandSoft, C.brandLine);

  pdf.section("Vaccinations", C.brandMid);
  pdf.vaccineTable(record.vaccines);

  if (record.notes?.trim()) {
    pdf.section("Notes complémentaires", C.brandMid);
    pdf.notesBox(record.notes.trim());
  }

  if (history.length) {
    pdf.section("Historique médical", C.brandMid);
    for (const entry of history) {
      pdf.historyEntry(entry);
    }
  }

  pdf.signatureBlock();
  pdf.disclaimer();

  const safeName = (patient.fullName || "patient")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
  pdf.save(`carnet-medical-${safeName}.pdf`);
}
