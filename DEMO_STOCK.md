# GoSanté — démo stock médicaments (sandbox)

Branche isolée : `cursor/demo-stock-medicaments-beb0`

**Ne pas fusionner sur `main` / ne pas déployer sur `gosante.vercel.app`** tant que la démo n’est pas validée.

## Objectif

Remplacer la recherche LNME par une recherche **sur le stock des pharmacies**, avec :

- 3 pharmacies pilotes fictives (ADAMA, AEROPORT, KOSSODO)
- ~40 médicaments courants préchargés
- Import Excel/CSV côté pharmacien

## Doublons LNME

Les « doublons » LNME sont surtout **normaux** : même DCI, formes/dosages différents (ex. Paracétamol 500 mg vs sirop).  
Il y a aussi ~6 vrais doublons de parsing (même DCI+dosage+forme). Ce n’est plus la source de vérité du panier.

## Seed stock

```bash
export NEXT_PUBLIC_SUPABASE_URL=...
export SUPABASE_SERVICE_ROLE_KEY=...
python3 scripts/seed_demo_pharmacy_stock.py
```

## Déploiement recommandé

Projet Vercel séparé : `gosante-stock-demo` (pas `gosante` / `gosantetest`).
