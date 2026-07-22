import { jsPDF } from "jspdf";
import type { MedicalHistoryEntry, MedicalRecord } from "@/types";

type PatientInfo = {
  fullName: string | null;
  phone: string | null;
};

const COLORS = {
  emerald: [5, 150, 105] as const,
  emeraldDark: [4, 120, 87] as const,
  emeraldLight: [209, 250, 229] as const,
  slate: [51, 65, 85] as const,
  slateLight: [100, 116, 139] as const,
  rose: [225, 29, 72] as const,
  roseLight: [255, 228, 230] as const,
  amber: [217, 119, 6] as const,
  amberLight: [254, 243, 199] as const,
  white: [255, 255, 255] as const,
  bg: [248, 250, 252] as const,
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 16;
const CONTENT_W = PAGE_W - MARGIN * 2;

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
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

class CarnetPdf {
  doc = new jsPDF({ unit: "mm", format: "a4" });
  y = 0;
  page = 1;

  constructor(private patient: PatientInfo) {
    this.drawPageFrame();
    this.y = 58;
  }

  private setFill(color: readonly number[]) {
    this.doc.setFillColor(color[0], color[1], color[2]);
  }

  private setDraw(color: readonly number[]) {
    this.doc.setDrawColor(color[0], color[1], color[2]);
  }

  private setText(color: readonly number[]) {
    this.doc.setTextColor(color[0], color[1], color[2]);
  }

  private drawPageFrame() {
    const { doc } = this;
    this.setFill(COLORS.bg);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");

    // Bandeau supérieur
    this.setFill(COLORS.emerald);
    doc.rect(0, 0, PAGE_W, 40, "F");
    this.setFill(COLORS.emeraldDark);
    doc.rect(0, 36, PAGE_W, 4, "F");

    // Croix médicale
    this.setFill(COLORS.white);
    doc.roundedRect(MARGIN, 10, 18, 18, 3, 3, "F");
    this.setFill(COLORS.emerald);
    doc.rect(MARGIN + 7.5, 13, 3, 12, "F");
    doc.rect(MARGIN + 3, 17.5, 12, 3, "F");

    this.setText(COLORS.white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Carnet Médical", MARGIN + 24, 19);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("GoSanté — Plateforme de santé numérique du Burkina Faso", MARGIN + 24, 26);

    if (this.page === 1) {
      // Carte identité patient
      this.setFill(COLORS.white);
      this.setDraw(COLORS.emeraldLight);
      doc.setLineWidth(0.4);
      doc.roundedRect(MARGIN, 44, CONTENT_W, 10, 2, 2, "FD");
      this.setText(COLORS.slate);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(this.patient.fullName || "Patient GoSanté", MARGIN + 4, 50.5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      this.setText(COLORS.slateLight);
      const meta = [
        this.patient.phone ? `Tél : ${this.patient.phone}` : null,
        `Édité le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`,
      ]
        .filter(Boolean)
        .join("   ·   ");
      doc.text(meta, PAGE_W - MARGIN - 4, 50.5, { align: "right" });
    }

    // Pied de page
    this.setText(COLORS.slateLight);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Document confidentiel — à présenter aux professionnels de santé", MARGIN, PAGE_H - 8);
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${this.page}`, PAGE_W - MARGIN, PAGE_H - 8, { align: "right" });
  }

  private ensureSpace(height: number) {
    if (this.y + height <= PAGE_H - 16) return;
    this.doc.addPage();
    this.page += 1;
    this.drawPageFrame();
    this.y = 48;
  }

  sectionTitle(title: string, color: readonly number[] = COLORS.emerald) {
    this.ensureSpace(14);
    const { doc } = this;
    this.setFill(color);
    doc.roundedRect(MARGIN, this.y, 2.5, 7, 1, 1, "F");
    this.setText(COLORS.slate);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title.toUpperCase(), MARGIN + 6, this.y + 5.2);
    this.setDraw(COLORS.emeraldLight);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, this.y + 9, PAGE_W - MARGIN, this.y + 9);
    this.y += 13;
  }

  bloodTypeCard(bloodType: string | null, emergencyName: string | null, emergencyPhone: string | null) {
    this.ensureSpace(26);
    const { doc } = this;
    const half = (CONTENT_W - 4) / 2;

    // Groupe sanguin
    this.setFill(COLORS.roseLight);
    doc.roundedRect(MARGIN, this.y, half, 22, 3, 3, "F");
    this.setText(COLORS.rose);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("GROUPE SANGUIN", MARGIN + 5, this.y + 7);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(bloodType || "—", MARGIN + 5, this.y + 17);

    // Urgence
    this.setFill(COLORS.amberLight);
    doc.roundedRect(MARGIN + half + 4, this.y, half, 22, 3, 3, "F");
    this.setText(COLORS.amber);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("CONTACT D'URGENCE", MARGIN + half + 9, this.y + 7);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(emergencyName || "Non renseigné", MARGIN + half + 9, this.y + 13.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(emergencyPhone || "", MARGIN + half + 9, this.y + 19);

    this.y += 28;
  }

  chips(items: string[], color: readonly number[], bg: readonly number[]) {
    if (!items.length) {
      this.mutedLine("Aucune information renseignée");
      return;
    }
    const { doc } = this;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    let x = MARGIN;
    for (const item of items) {
      const width = doc.getTextWidth(item) + 8;
      if (x + width > PAGE_W - MARGIN) {
        x = MARGIN;
        this.y += 9;
      }
      this.ensureSpace(10);
      this.setFill(bg);
      doc.roundedRect(x, this.y, width, 7, 3.5, 3.5, "F");
      this.setText(color);
      doc.text(item, x + 4, this.y + 4.8);
      x += width + 3;
    }
    this.y += 12;
  }

  mutedLine(text: string) {
    this.ensureSpace(8);
    this.setText(COLORS.slateLight);
    this.doc.setFont("helvetica", "italic");
    this.doc.setFontSize(9.5);
    this.doc.text(text, MARGIN, this.y + 4);
    this.y += 9;
  }

  vaccineTable(vaccines: { name: string; date?: string }[]) {
    if (!vaccines.length) {
      this.mutedLine("Aucun vaccin enregistré");
      return;
    }
    const { doc } = this;
    const rowH = 8;

    this.ensureSpace(rowH + 2);
    this.setFill(COLORS.emerald);
    doc.roundedRect(MARGIN, this.y, CONTENT_W, rowH, 1.5, 1.5, "F");
    this.setText(COLORS.white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Vaccin", MARGIN + 4, this.y + 5.4);
    doc.text("Date d'administration", MARGIN + CONTENT_W * 0.62, this.y + 5.4);
    this.y += rowH;

    vaccines.forEach((vaccine, index) => {
      this.ensureSpace(rowH);
      this.setFill(index % 2 === 0 ? COLORS.white : COLORS.emeraldLight);
      doc.rect(MARGIN, this.y, CONTENT_W, rowH, "F");
      this.setText(COLORS.slate);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(vaccine.name, MARGIN + 4, this.y + 5.4);
      doc.text(formatDate(vaccine.date) || "—", MARGIN + CONTENT_W * 0.62, this.y + 5.4);
      this.y += rowH;
    });
    this.y += 6;
  }

  paragraph(text: string) {
    const { doc } = this;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    this.setText(COLORS.slate);
    const lines = doc.splitTextToSize(text, CONTENT_W - 4);
    for (const line of lines) {
      this.ensureSpace(6);
      doc.text(line, MARGIN + 2, this.y + 4);
      this.y += 5.5;
    }
    this.y += 5;
  }

  historyEntry(entry: MedicalHistoryEntry) {
    const { doc } = this;
    const label = ENTRY_TYPE_LABELS[entry.entry_type] ?? entry.entry_type;
    const description = entry.description
      ? doc.splitTextToSize(entry.description, CONTENT_W - 14)
      : [];
    const height = 15 + description.length * 4.6 + (entry.facility_name ? 5 : 0);
    this.ensureSpace(height + 4);

    // Ligne de temps
    this.setFill(COLORS.emerald);
    doc.circle(MARGIN + 2.5, this.y + 4, 1.6, "F");
    this.setDraw(COLORS.emeraldLight);
    doc.setLineWidth(0.5);
    doc.line(MARGIN + 2.5, this.y + 6.5, MARGIN + 2.5, this.y + height - 2);

    this.setFill(COLORS.white);
    this.setDraw(COLORS.emeraldLight);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN + 7, this.y, CONTENT_W - 7, height, 2, 2, "FD");

    // Badge type
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    const badgeW = doc.getTextWidth(label.toUpperCase()) + 6;
    this.setFill(COLORS.emeraldLight);
    doc.roundedRect(MARGIN + 11, this.y + 3, badgeW, 5.5, 2.5, 2.5, "F");
    this.setText(COLORS.emeraldDark);
    doc.text(label.toUpperCase(), MARGIN + 14, this.y + 6.8);

    this.setText(COLORS.slateLight);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(formatDate(entry.entry_date) || "Date inconnue", PAGE_W - MARGIN - 4, this.y + 7, {
      align: "right",
    });

    this.setText(COLORS.slate);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(entry.title, MARGIN + 11, this.y + 13.5);

    let innerY = this.y + 13.5;
    if (entry.facility_name) {
      innerY += 5;
      this.setText(COLORS.slateLight);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.text(entry.facility_name, MARGIN + 11, innerY);
    }
    if (description.length) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      this.setText(COLORS.slate);
      for (const line of description) {
        innerY += 4.6;
        doc.text(line, MARGIN + 11, innerY);
      }
    }
    this.y += height + 4;
  }

  save(fileName: string) {
    this.doc.save(fileName);
  }
}

export function exportCarnetPdf(
  patient: PatientInfo,
  record: Omit<MedicalRecord, "id" | "user_id">,
  history: MedicalHistoryEntry[]
) {
  const pdf = new CarnetPdf(patient);

  pdf.sectionTitle("Informations vitales", COLORS.rose);
  pdf.bloodTypeCard(record.blood_type, record.emergency_contact_name, record.emergency_contact_phone);

  pdf.sectionTitle("Allergies", COLORS.rose);
  pdf.chips(record.allergies, COLORS.rose, COLORS.roseLight);

  pdf.sectionTitle("Maladies chroniques", COLORS.amber);
  pdf.chips(record.chronic_conditions, COLORS.amber, COLORS.amberLight);

  pdf.sectionTitle("Traitements en cours");
  pdf.chips(record.current_treatments, COLORS.emeraldDark, COLORS.emeraldLight);

  pdf.sectionTitle("Vaccinations");
  pdf.vaccineTable(record.vaccines);

  if (record.notes) {
    pdf.sectionTitle("Notes complémentaires");
    pdf.paragraph(record.notes);
  }

  if (history.length) {
    pdf.sectionTitle("Historique médical");
    for (const entry of history) {
      pdf.historyEntry(entry);
    }
  }

  const safeName = (patient.fullName || "patient")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
  pdf.save(`carnet-medical-${safeName}.pdf`);
}
