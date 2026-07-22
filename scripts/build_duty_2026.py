#!/usr/bin/env python3
"""
Construit les données de garde 2026 (groupes + calendrier) et matche
les pharmacies du fichier JSON local.
"""

from __future__ import annotations

import json
import re
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PHARMACIES_JSON = ROOT / "web" / "src" / "data" / "pharmacies.json"
OUT_DIR = ROOT / "data" / "duty"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# --- Groupes issus du PDF « Pharmacie de garde pour 2026 » ---
GROUPS: dict[str, list[str]] = {
    "I": [
        "Archanges", "Avenir", "Baani", "Bang-Pooré", "Baowendsom", "Barkwende",
        "Beatitudes", "Benaia", "Bonheur", "Camille", "Centre", "Crystal",
        "Des Apotres", "Desa", "Diaby", "Divine", "Dominique Kaboré", "El Wanogo",
        "Elite", "Gova", "Gueswende", "Guuduma", "Hosanna", "Jober", "Katra",
        "Keneya", "Kossodo", "Lanibougna", "Lanzané", "Lendimti", "Les champions",
        "Liberté", "Lina", "Magnificat", "Maré", "Minitché", "Monderoué", "Nanlé",
        "Neerwaya", "Nouvelle", "Pelega", "Rachel Yagma", "Rayib-Tiga", "Rivage",
        "Saint Bernard", "Saint François D'Assise", "Saint Jean", "Siloé",
        "Song Taaba", "Tale", "Tenedia", "Tengandogo", "Trypano", "Wend La Laafi",
        "Wend Iamita", "Wendpanga", "Yathrib",
    ],
    "II": [
        "Adadoua", "Aéroport", "Agora-Rood Wooko", "Amaro", "Amina", "Ar-rahmá",
        "Augustine", "Bao Neeré", "Boulmiougou", "Cathédrale", "Cité An 3",
        "Danouma", "Dapoya", "Delwindé", "Denisa", "Faso", "Flayiri", "Hamdalaye",
        "Hanniel", "Hope", "Horizon", "Jabnéel", "Jireh", "Joriel", "Jourdain",
        "Karpala", "Koulouba", "Koumajer", "Ko-Viiga", "Les Lauriers", "Marlass",
        "Martin", "Meira", "Meteba", "Mitspah", "Nayyira", "Neima", "Nemadis",
        "Prim'santé", "Progrès", "Raklsmanegré", "Saint Joseph", "Sainte Véronique",
        "Samandin", "Sangoulé Lamizana", "Schifeyi", "Sig-Noghin", "Sigri",
        "Somketa", "Sud", "Talba", "Tanko", "Ti-Bangré", "Tiis Yondo", "Univers",
        "Viim", "Vincent de Paul", "Wapassi Lafi", "Wati", "Yobi", "Zidou",
    ],
    "III": [
        "Aïmèvo", "Arzouma", "Avé Maria", "Balkuy", "Baraka", "Belle ville",
        "Blessing", "Carrefour", "Charis", "Christvi", "Concorde", "Coura",
        "Djabal", "Djimbia", "Dunia", "Ecoles", "Fabéré", "Galiam", "Georgette",
        "Hamamickely", "Indépendance", "Jeunesse", "Jizreel", "Kalifa Traore",
        "Kamboinsin", "Kamin", "Kilwin", "La famille", "La Sainte Trinité",
        "Marjean", "Naab Raga", "Naaba-Koom", "Nagrin", "Nayalgba", "Ninrwa",
        "Nonsin", "Noom-Wendé", "Pierre Tapsoba", "Pissy", "Renaissance", "Saaba",
        "Sacré Cœur", "Saint Lazare", "Saint Michel", "Santé-vitalité", "Savane",
        "Seneve", "Taoko", "Téranga", "Tiyéle", "Wayalghin", "Wend Denda",
        "Yempabou", "Yennenga", "Zone", "Zoungrana",
    ],
    "IV": [
        "1200 Logements", "Adama", "Afiya", "Amitié Miyougou", "Angèle", "Bassinko",
        "Bedjou", "Bethania", "Blandine Congo", "Choukroullah", "Circulaire Sède",
        "De l'Alliance", "De l'Hippodrome", "Des cités", "Diawara", "El Shaddaï",
        "Espoir", "Fraternité", "Gare", "Gemme", "Hambila", "Hamid", "Hanahim",
        "Hôpital", "Iris", "Jean Paul II", "Kadiogo", "Kamalia", "Kawsar", "Kouma",
        "La Croix", "La Roche", "Lallé", "Latando", "Le Rocher", "Les Grâces",
        "Louis Pasteur", "Maignon", "Miséricorde", "Musée", "Natilgé", "Nioko I",
        "Nongui", "Ouédraogo Rémi", "Pingdba", "Principale", "Providence", "Rima",
        "Rimkièta", "Sahel", "Sainte Odile", "Sira", "Somgandé", "Sondogo",
        "Sotissé", "Sü-Maasem", "Unité", "Vénégré", "Vidal Bafa", "Vièl",
        "Wend Kuuni", "Wend Yam", "Wend Zinkré", "Yan-marou", "Yentema",
    ],
}

# Calendrier 2026 (samedi → samedi). ends_on = jour de relève (exclu côté API).
# Semaine manquante 28/03→04/04 déduite de la rotation IV→I→II.
ROTATIONS: list[tuple[str, str, str]] = [
    ("2025-12-27", "2026-01-03", "IV"),
    ("2026-01-03", "2026-01-10", "I"),
    ("2026-01-10", "2026-01-17", "II"),
    ("2026-01-17", "2026-01-24", "III"),
    ("2026-01-24", "2026-01-31", "IV"),
    ("2026-01-31", "2026-02-07", "I"),
    ("2026-02-07", "2026-02-14", "II"),
    ("2026-02-14", "2026-02-21", "III"),
    ("2026-02-21", "2026-02-28", "IV"),
    ("2026-02-28", "2026-03-07", "I"),
    ("2026-03-07", "2026-03-14", "II"),
    ("2026-03-14", "2026-03-21", "III"),
    ("2026-03-21", "2026-03-28", "IV"),
    ("2026-03-28", "2026-04-04", "I"),  # déduite
    ("2026-04-04", "2026-04-11", "II"),
    ("2026-04-11", "2026-04-18", "III"),
    ("2026-04-18", "2026-04-25", "IV"),
    ("2026-04-25", "2026-05-02", "I"),
    ("2026-05-02", "2026-05-09", "II"),
    ("2026-05-09", "2026-05-16", "III"),
    ("2026-05-16", "2026-05-23", "IV"),
    ("2026-05-23", "2026-05-30", "I"),
    ("2026-05-30", "2026-06-06", "II"),
    ("2026-06-06", "2026-06-13", "III"),
    ("2026-06-13", "2026-06-20", "IV"),
    ("2026-06-20", "2026-06-27", "I"),
    ("2026-06-27", "2026-07-04", "II"),
    ("2026-07-04", "2026-07-11", "III"),
    ("2026-07-11", "2026-07-18", "IV"),
    ("2026-07-18", "2026-07-25", "I"),
    ("2026-07-25", "2026-08-01", "II"),
    ("2026-08-01", "2026-08-08", "III"),
    ("2026-08-08", "2026-08-15", "IV"),
    ("2026-08-15", "2026-08-22", "I"),
    ("2026-08-22", "2026-08-29", "II"),
    ("2026-08-29", "2026-09-05", "III"),
    ("2026-09-05", "2026-09-12", "IV"),
    ("2026-09-12", "2026-09-19", "I"),
    ("2026-09-19", "2026-09-26", "II"),
    ("2026-09-26", "2026-10-03", "III"),
    ("2026-10-03", "2026-10-10", "IV"),
    ("2026-10-10", "2026-10-17", "I"),
    ("2026-10-17", "2026-10-24", "II"),
    ("2026-10-24", "2026-10-31", "III"),
    ("2026-10-31", "2026-11-07", "IV"),
    ("2026-11-07", "2026-11-14", "I"),
    ("2026-11-14", "2026-11-21", "II"),
    ("2026-11-21", "2026-11-28", "III"),
    ("2026-11-28", "2026-12-05", "IV"),
    ("2026-12-05", "2026-12-12", "I"),
    ("2026-12-12", "2026-12-19", "II"),
    ("2026-12-19", "2026-12-26", "III"),
    ("2026-12-26", "2027-01-02", "IV"),
]

# PDF short name → clé normalisée de la pharmacie en base
ALIASES: dict[str, str] = {
    "lendimti": "lendimi",
    "rayib tiga": "rayibtiga",
    "raklsmanegre": "rakismanegre",
    "blandine congo": "congo blandine",
    "christvi": "christ vi",
    "nioko i": "nioko 1",
    "hamid": "hadim",
    "wend iamita": "wend lamita",
    "wendpanga": "wend panga",
    "wend la laafi": "wend la laafi",
    "saint francois d assise": "st francois d assise",
    "des apotres": "des apotres",
    "cite an 3": "cite an iii",
    "agora rood wooko": "agora rood wooko",
    "ave maria": "ave marie",
    "sainte veronique": "ste veronique",
    "sangoule lamizana": "sg lamizana",
    "saint michel": "st michel",
    "sainte odile": "ste odile",
    "wapassi lafi": "wappasi laafi",
    "yobi": "wobi",
    "les lauriers": "lauriers",
    "de l hippodrome": "hippodrome",
    "zone": "zone 1",
    "samandin": "samandin ex heera",
    "su maasem": "su maasem",
    "yennenga": "yennenga",
    "nouvelle": "aube nouvelle",  # seule candidate plausible en base
    "renaissance": "renaissance ex st julien",
}


def norm(s: str) -> str:
    s = s.lower().strip()
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("œ", "oe").replace("æ", "ae")
    s = re.sub(r"^pharmacie\s+", "", s)
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def compact(s: str) -> str:
    return norm(s).replace(" ", "")


def key(s: str) -> str:
    n = norm(s)
    return ALIASES.get(n, n)


def similarity(a: str, b: str) -> float:
    ca, cb = compact(a), compact(b)
    if not ca or not cb:
        return 0.0
    if ca == cb:
        return 1.0
    # Avoid short false positives (e.g. kouma ⊂ koumajer)
    if len(ca) >= 5 and len(cb) >= 5 and (ca in cb or cb in ca):
        shorter, longer = (ca, cb) if len(ca) <= len(cb) else (cb, ca)
        if len(shorter) / len(longer) >= 0.75:
            return 0.94
    return SequenceMatcher(None, ca, cb).ratio()


def main() -> None:
    pharmacies = json.loads(PHARMACIES_JSON.read_text(encoding="utf-8"))
    by_key: dict[str, list[dict]] = {}
    for p in pharmacies:
        k = key(p["name"])
        by_key.setdefault(k, []).append(p)

    matches: list[dict] = []
    unmatched_pdf: list[dict] = []
    used_ids: set[int] = set()

    # Pass 1: exact / alias key
    pending: list[tuple[str, str]] = []
    for group, names in GROUPS.items():
        for raw in names:
            k = key(raw)
            cands = [p for p in by_key.get(k, []) if p["external_id"] not in used_ids]
            if len(cands) == 1:
                p = cands[0]
                used_ids.add(p["external_id"])
                matches.append(
                    {
                        "external_id": p["external_id"],
                        "name": p["name"],
                        "duty_group": group,
                        "pdf_name": raw,
                        "match": "exact",
                        "score": 1.0,
                    }
                )
            elif len(cands) > 1:
                # Prefer Ouagadougou; then shortest name
                cands = sorted(
                    cands,
                    key=lambda x: (
                        0 if "ouaga" in (x.get("city") or "").lower() else 1,
                        len(x["name"]),
                        x["external_id"],
                    ),
                )
                p = cands[0]
                used_ids.add(p["external_id"])
                matches.append(
                    {
                        "external_id": p["external_id"],
                        "name": p["name"],
                        "duty_group": group,
                        "pdf_name": raw,
                        "match": "ambiguous",
                        "candidates": [c["name"] for c in cands[:5]],
                        "score": 1.0,
                    }
                )
            else:
                pending.append((group, raw))

    # Pass 2: fuzzy against unused pharmacies (high threshold)
    unused = [p for p in pharmacies if p["external_id"] not in used_ids]
    for group, raw in pending:
        scored = []
        for p in unused:
            if p["external_id"] in used_ids:
                continue
            s = similarity(raw, p["name"])
            if s >= 0.88:
                scored.append((s, p))
        scored.sort(key=lambda x: (-x[0], len(x[1]["name"])))
        if scored:
            s, p = scored[0]
            used_ids.add(p["external_id"])
            matches.append(
                {
                    "external_id": p["external_id"],
                    "name": p["name"],
                    "duty_group": group,
                    "pdf_name": raw,
                    "match": "fuzzy",
                    "score": round(s, 3),
                }
            )
        else:
            unmatched_pdf.append({"pdf_name": raw, "duty_group": group, "key": key(raw)})

    unmatched_db = [
        {"external_id": p["external_id"], "name": p["name"]}
        for p in pharmacies
        if p["external_id"] not in used_ids
    ]

    # Active group for today (Ouagadougou) — used to refresh pharmacies.json
    from datetime import datetime
    from zoneinfo import ZoneInfo

    today = datetime.now(ZoneInfo("Africa/Ouagadougou")).date().isoformat()
    active_group = None
    for a, b, g in ROTATIONS:
        if a <= today < b:
            active_group = g
            break

    # Update local JSON snapshot (duty_group + is_on_duty)
    by_eid = {p["external_id"]: p for p in pharmacies}
    for m in matches:
        p = by_eid[m["external_id"]]
        p["duty_group"] = m["duty_group"]
        on = m["duty_group"] == active_group
        p["is_on_duty"] = on
        if on:
            p["status_label"] = "De garde"
        elif p.get("status_label") == "De garde":
            p["status_label"] = "Ouverte"
    for p in pharmacies:
        if p["external_id"] not in used_ids:
            p["duty_group"] = None
            if p.get("is_on_duty"):
                p["is_on_duty"] = False
            if p.get("status_label") == "De garde":
                p["status_label"] = "Ouverte"

    PHARMACIES_JSON.write_text(
        json.dumps(pharmacies, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    payload = {
        "source": "Pharmacie_de_garde_pour_2026.pdf",
        "timezone": "Africa/Ouagadougou",
        "today": today,
        "active_group": active_group,
        "groups": {g: names for g, names in GROUPS.items()},
        "rotations": [
            {
                "duty_group": g,
                "starts_on": a,
                "ends_on": b,
                "notes": "Programme de garde 2026 (PDF)",
            }
            for a, b, g in ROTATIONS
        ],
        "matches": matches,
        "unmatched_pdf": unmatched_pdf,
        "unmatched_db": unmatched_db,
        "stats": {
            "pdf_names": sum(len(v) for v in GROUPS.values()),
            "matched": len(matches),
            "unmatched_pdf": len(unmatched_pdf),
            "unmatched_db": len(unmatched_db),
            "rotations": len(ROTATIONS),
            "active_group": active_group,
            "on_duty_today": sum(1 for m in matches if m["duty_group"] == active_group),
        },
    }

    out_json = OUT_DIR / "garde_2026.json"
    out_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "-- Garde pharmacies 2026 (groupes + rotations)",
        "-- ends_on = jour de relève (exclu dans l'API)",
        "BEGIN;",
        "UPDATE public.pharmacies SET duty_group = NULL;",
        "DELETE FROM public.pharmacy_duty_rotations;",
    ]
    for m in matches:
        eid = m["external_id"]
        g = m["duty_group"]
        lines.append(
            f"UPDATE public.pharmacies SET duty_group = '{g}' "
            f"WHERE external_id = {eid};"
        )
    for a, b, g in ROTATIONS:
        lines.append(
            "INSERT INTO public.pharmacy_duty_rotations "
            "(duty_group, starts_on, ends_on, notes) VALUES "
            f"('{g}', '{a}', '{b}', 'Programme de garde 2026');"
        )
    lines.append(
        """
-- Met à jour is_on_duty selon la rotation active aujourd'hui (TZ Ouagadougou)
WITH today AS (
  SELECT (timezone('Africa/Ouagadougou', now()))::date AS d
),
active AS (
  SELECT r.duty_group
  FROM public.pharmacy_duty_rotations r, today t
  WHERE r.starts_on <= t.d AND r.ends_on > t.d
)
UPDATE public.pharmacies p
SET
  is_on_duty = (p.duty_group IN (SELECT duty_group FROM active)),
  status_label = CASE
    WHEN p.duty_group IN (SELECT duty_group FROM active) THEN 'De garde'
    ELSE COALESCE(NULLIF(p.status_label, 'De garde'), 'Ouverte')
  END;
"""
    )
    lines.append("COMMIT;")
    (OUT_DIR / "garde_2026_seed.sql").write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(json.dumps(payload["stats"], indent=2))
    print("unmatched_pdf:", [u["pdf_name"] for u in unmatched_pdf])
    print("wrote", out_json)
    print("wrote", OUT_DIR / "garde_2026_seed.sql")
    print("updated", PHARMACIES_JSON)


if __name__ == "__main__":
    main()
