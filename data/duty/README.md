# Programme de garde pharmacies 2026

Données extraites du PDF officiel « Pharmacie de garde pour 2026 » (Ouagadougou).

## Fichiers

- `garde_2026.json` — groupes, calendrier, matching PDF → base
- `garde_2026_seed.sql` — SQL à appliquer / réappliquer

## Régénération

```bash
python3 scripts/build_duty_2026.py
```

## Sémantique des dates

Chaque rotation va du samedi `starts_on` au samedi `ends_on` **exclu**
(jour de relève). L’API utilise `starts_on <= today < ends_on`.

## Matching

~168 / 239 noms du PDF sont reliés aux pharmacies de `pharmacies.json`.
Les noms restants n’existent pas (encore) dans la base GoSanté.
