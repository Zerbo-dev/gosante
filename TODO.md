# GoSanté — Feuille de route projet

> Dernière mise à jour : 7 juillet 2026 (session 2)

---

## Légende

- [x] Fait
- [ ] À faire
- [~] En cours / partiel

---

## 1. Infrastructure & setup

- [x] Cahier des charges analysé
- [x] Projet Supabase + MCP connecté
- [x] MCP Supabase + Agent Skills
- [x] Application Next.js + TypeScript + Tailwind
- [x] Client Supabase (auth, middleware, ngrok)
- [x] `.env.local` + `.env.example`
- [~] Migrations versionnées (`supabase/migrations/` — fichier créé, à synchroniser)
- [ ] Déploiement production (Vercel)
- [ ] Conformité hébergement Burkina Faso (validation juridique)
- [ ] CI/CD (lint, build, tests)

---

## 2. Données médicaments (PDF)

- [x] Extraction LNME 2023 + arrêté prix 2025
- [x] Parser automatique — 794 médicaments, 191 PVP
- [x] API recherche `/api/medicaments/search`
- [ ] Améliorer parser prix (100 % PVP)
- [ ] Import bulk Supabase (optionnel — JSON local fonctionne)

---

## 3. Authentification & rôles

- [x] Inscription / connexion email
- [x] Profiles + RLS
- [x] Consentement données santé à l'inscription
- [x] Page politique de confidentialité
- [ ] Désactiver confirmation email Supabase (tests)
- [ ] Auth SMS OTP
- [ ] Interfaces pharmacien / livreur / admin
- [ ] MFA

---

## 4. Module 2 — Santé mentale

- [x] Chat bien-être + journal + exercices + urgences
- [x] Persistance Supabase
- [ ] IA OpenAI / Claude
- [ ] Liste psychologues
- [ ] Notifications push

---

## 5. Module 3 — Carnet médical

- [x] Profil santé complet
- [x] Historique médical
- [x] **Gestion vaccins** (interface dédiée)
- [x] Export basique
- [ ] Export PDF pro
- [ ] Partage médecin (lien / QR)

---

## 6. Module 4 — Scan ordonnance

- [x] OCR + matching LNME + enregistrement
- [x] **Lien panier pharmacie** (ajouter au panier + commander)
- [~] Stockage image Supabase Storage (code prêt, policies storage à finaliser)
- [ ] OCR cloud manuscrit
- [ ] Pré-traitement image

---

## 7. Module 1 — Pharmacie intelligente

- [x] **218 pharmacies** (fichier HTML fourni)
- [x] Carte OpenStreetMap + itinéraire OSRM + durée
- [x] Pharmacies de garde + recherche
- [x] **Catalogue médicaments + recherche LNME**
- [x] **Panier** (localStorage)
- [x] **Commandes** + historique `/dashboard/commandes`
- [x] Paiement cash à la livraison
- [ ] Gestion stocks temps réel (interface pharmacien)
- [ ] Interface livreur / admin

---

## 8. Paiements — Genius Pay

- [x] Documentation intégrée (tontine_structure)
- [x] Lib `geniuspay.ts` + API création commande
- [x] Webhook `/api/webhooks/geniuspay`
- [x] Tables `orders` + `order_items`
- [ ] **Clés API sandbox** à ajouter dans `.env.local`
- [ ] Test bout en bout checkout

---

## 9. Phase 2 — Consultation médicale

- [ ] Chat IA médical
- [ ] Visio Jitsi + RDV
- [ ] Ordonnances électroniques

---

## 10. Phase 3 — Intégrations avancées

- [ ] Hôpitaux, labos, assurances, ambulances
- [ ] Multilingue (mooré, dioula, fulfuldé)

---

## 11. Mobile

- [x] **PWA** manifest (`/manifest.webmanifest`)
- [x] UX mobile-friendly (modules responsive)
- [ ] Icônes PWA dédiées (192/512)
- [ ] App native React Native

---

## 12. Sécurité & conformité

- [x] RLS toutes tables
- [x] **Audit logs** (`audit_logs` table)
- [x] Consentement inscription
- [x] Politique confidentialité
- [ ] CGU complètes
- [ ] Revue Supabase advisors
- [ ] Policies Storage prescriptions

---

## 13. Qualité & documentation

- [ ] Tests E2E Playwright
- [ ] OpenAPI documentation
- [ ] Guide utilisateur
- [ ] Tests pilote terrain

---

## Récapitulatif

| Bloc | Avancement |
|------|------------|
| Setup & infra | **~85 %** |
| Module 1 Pharmacie | **~75 %** |
| Module 2 Santé mentale | **~65 %** |
| Module 3 Carnet | **~80 %** |
| Module 4 Ordonnance | **~75 %** |
| Genius Pay | **~60 %** (clés manquantes) |
| Phase 2 & 3 | **0 %** |
| Mobile PWA | **~50 %** |

---

## Prochaine action pour toi

1. Ajouter tes clés **Genius Pay sandbox** dans `web/.env.local`
2. Appliquer les **policies Storage** prescriptions dans Supabase Dashboard
3. Tester une commande avec paiement cash puis Genius Pay
