export type UserRole = "patient" | "pharmacien" | "livreur" | "psychologue" | "admin";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
}

export interface Medication {
  dci: string;
  designation: string;
  dosage: string | null;
  form: string | null;
  pvp: number | null;
  pv_drd: number | null;
  audience?: string | null;
  group?: string | null;
  search_text: string;
}

export interface MedicalRecord {
  id: string;
  user_id: string;
  blood_type: string | null;
  allergies: string[];
  chronic_conditions: string[];
  current_treatments: string[];
  vaccines: { name: string; date?: string }[];
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  notes: string | null;
}

export interface MedicalHistoryEntry {
  id: string;
  entry_type: "examen" | "hospitalisation" | "consultation" | "autre";
  title: string;
  description: string | null;
  facility_name: string | null;
  entry_date: string | null;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  mood: number | null;
  content: string | null;
  encrypted_content?: string | null;
  encryption_iv?: string | null;
  created_at: string;
}

export interface PrescriptionItem {
  raw_text: string;
  medication_dci: string | null;
  dosage: string | null;
  confidence: number;
  matched?: Medication | null;
}

export interface MatchedMedication extends PrescriptionItem {
  matched: Medication | null;
}

export interface Pharmacy {
  id?: string;
  external_id?: number;
  name: string;
  address: string | null;
  city: string;
  phone: string | null;
  latitude: number;
  longitude: number;
  is_on_duty: boolean;
  opening_hours: string | null;
  status_label?: string | null;
  /** Groupe de garde (tour fixé plus tard via pharmacy_duty_rotations) */
  duty_group?: string | null;
}

export interface PharmacyWithRoute extends Pharmacy {
  straightDistance?: number;
  routeDistance?: number;
  routeDuration?: number;
}

export interface Psychologist {
  id: string;
  full_name: string;
  specialty: string;
  city: string;
  phone: string | null;
  email: string | null;
  bio: string | null;
  languages: string[];
  consultation_fee: number | null;
  is_available: boolean;
}

export interface Appointment {
  id: string;
  user_id: string;
  psychologist_id: string | null;
  scheduled_at: string;
  duration_minutes: number;
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled";
  reason: string | null;
  is_anonymous: boolean;
  jitsi_room: string;
  notes: string | null;
  psychologist_last_seen_at?: string | null;
  created_at: string;
}
