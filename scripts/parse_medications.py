"""Parse Burkina Faso essential medicines + 2025 prices into JSON."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRIX_RAW = ROOT / "data" / "prix_raw.txt"
LISTE_RAW = ROOT / "data" / "liste_raw.txt"
OUT = ROOT / "web" / "src" / "data" / "medications.json"

TERMINALS = (
    "ampoule", "blister", "flacon", "tube", "sachet", "conditionnement",
    "gel", "plaquette", "comprimé", "gélule", "sirop", "pommade",
)


def normalize(text: str) -> str:
    text = text.lower()
    for a, b in [("àáâãä", "a"), ("èéêë", "e"), ("ìíîï", "i"), ("òóôõö", "o"), ("ùúûü", "u"), ("ç", "c")]:
        for ch in a:
            text = text.replace(ch, b)
    text = re.sub(r"[^a-z0-9\s/+().%-]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def is_complete_designation(text: str) -> bool:
    low = text.lower().strip(" ,.")
    return any(low.endswith(t) for t in TERMINALS) or "plaquette de" in low


def parse_price_numbers(lines: list[str]) -> list[tuple[float | None, float | None]]:
    nums_batch: list[float] = []
    pairs: list[tuple[float | None, float | None]] = []

    for line in lines:
        clean = line.replace(" ", "")
        found = [float(x.replace(",", ".")) for x in re.findall(r"\d+(?:[.,]\d+)?", clean)]
        if not found:
            continue
        if len(found) == 2:
            pairs.append((found[0], found[1]))
        elif len(found) == 1:
            nums_batch.append(found[0])

    if not pairs and nums_batch:
        half = len(nums_batch) // 2
        if half > 0:
            for i in range(half):
                pairs.append((nums_batch[i], nums_batch[half + i]))
        else:
            for n in nums_batch:
                pairs.append((None, n))
    return pairs


def parse_prix_sections(text: str) -> list[dict]:
    lines = [l.strip() for l in text.splitlines()]
    items: list[dict] = []
    i = 0
    while i < len(lines):
        if lines[i].lower() not in ("désignation", "designation"):
            i += 1
            continue
        i += 1
        designations: list[str] = []
        buffer: list[str] = []
        while i < len(lines):
            low = lines[i].lower()
            if low in ("pv drd", "pv_drd", "pv_ drd", "pvp 2025") or low.startswith("pv drd"):
                break
            if re.fullmatch(r"n°|\d+\.?", lines[i], re.I):
                i += 1
                continue
            if not lines[i]:
                i += 1
                continue
            buffer.append(lines[i])
            joined = " ".join(buffer)
            if is_complete_designation(joined):
                designations.append(re.sub(r"\s+", " ", joined).strip(" ,"))
                buffer = []
            i += 1
        if buffer:
            designations.append(re.sub(r"\s+", " ", " ".join(buffer)).strip(" ,"))

        price_lines: list[str] = []
        while i < len(lines):
            low = lines[i].lower()
            if low in ("désignation", "designation"):
                break
            if low.startswith("n°") or re.fullmatch(r"\d+", lines[i]):
                i += 1
                continue
            if re.search(r"\d", lines[i]):
                price_lines.append(lines[i])
            elif low in ("pv drd", "pv_ drd", "pv_ drd", "pvp 2025"):
                pass
            i += 1

        pairs = parse_price_numbers(price_lines)
        for idx, designation in enumerate(designations):
            pv_drd, pvp = (None, None)
            if idx < len(pairs):
                pv_drd, pvp = pairs[idx]
            dci = re.split(r"\s+\d", designation, maxsplit=1)[0].strip(" ,/+")
            dosage = None
            dm = re.search(r"(\d+(?:[.,]\d+)?\s*(?:mg|g|ml|µg|mui|%|°)[^,]*)", designation, re.I)
            if dm:
                dosage = dm.group(1).strip()
            items.append(
                {
                    "dci": dci[:150],
                    "designation": designation,
                    "dosage": dosage,
                    "form": extract_form(designation),
                    "pv_drd": pv_drd,
                    "pvp": pvp,
                    "search_text": normalize(designation),
                }
            )
    return dedupe(items)


def extract_form(text: str) -> str | None:
    low = text.lower()
    for f in ("comprimé", "gélule", "sirop", "suspension", "injectable", "ampoule", "pommade", "crème", "sachet", "flacon", "blister", "poudre", "gel"):
        if f in low:
            return f
    return None


def dedupe(items: list[dict]) -> list[dict]:
    seen: set[str] = set()
    out: list[dict] = []
    for item in items:
        key = item["designation"].lower()
        if key in seen or len(key) < 8:
            continue
        seen.add(key)
        out.append(item)
    return out


def parse_liste(text: str) -> list[dict]:
    items: list[dict] = []
    audience = "adulte"
    current_group = None
    buffer = ""

    for raw in text.splitlines():
        if "ENFANTS (0-14" in raw.upper() or "POUR ENFANTS" in raw.upper():
            audience = "enfant"
        if "POUR ADULTES" in raw.upper() or "ADULTES" in raw.upper() and "ENFANTS" not in raw.upper():
            audience = "adulte"

        gm = re.match(r"^(\d+)\.\s+([A-ZÀ-ÿ][A-ZÀ-ÿ\s\-+*/'(),.]+)$", raw.strip())
        if gm and len(gm.group(2)) < 60 and not re.search(r"\bNON\b|\bX\b", raw):
            current_group = gm.group(2).strip()
            continue

        m = re.match(
            r"^(\d+)\.\s+(.+?)\s+(Comprimé|Injectable|Sirop|Gélule|Suspension|Inhalation|Poudre|Crème|Gel|Suppositoire|Solution|Cartouche|Collyre|Patch|Spray|Ovule|Lotion|Sirop|Gouttes)\b",
            raw.strip(),
            re.I,
        )
        if m:
            buffer = raw.strip()
            dci = m.group(2).strip().strip("*")
            form = m.group(3).lower()
            dosage_match = re.search(r"(\d+(?:[.,]\d+)?\s*(?:mg|g|ml|µg|%)[^XNON]*)", raw, re.I)
            designation = f"{dci} {form}"
            if dosage_match:
                designation += f" {dosage_match.group(1).strip()}"
            items.append(
                {
                    "dci": dci,
                    "designation": designation.strip(),
                    "dosage": dosage_match.group(1).strip() if dosage_match else None,
                    "form": form,
                    "pv_drd": None,
                    "pvp": None,
                    "audience": audience,
                    "group": current_group,
                    "search_text": normalize(designation),
                }
            )
            buffer = ""
            continue

        if buffer and raw.strip() and not raw.strip().startswith("N°"):
            buffer += " " + raw.strip()

    return dedupe(items)


def merge_prices(liste: list[dict], prix: list[dict]) -> list[dict]:
  price_by_dci: dict[str, dict] = {}
  for p in prix:
    key = normalize(p["dci"])[:40]
    if key and (p.get("pvp") or p.get("pv_drd")):
      price_by_dci[key] = p

  merged = []
  for item in liste:
    key = normalize(item["dci"])[:40]
    priced = price_by_dci.get(key)
    if priced:
      item = {**item, "pvp": priced.get("pvp"), "pv_drd": priced.get("pv_drd")}
    merged.append(item)

  priced_keys = {normalize(i["dci"])[:40] for i in merged}
  for p in prix:
    key = normalize(p["dci"])[:40]
    if key not in priced_keys:
      merged.append({**p, "audience": "adulte", "group": None})
  return merged


def main():
    prix_items = parse_prix_sections(PRIX_RAW.read_text(encoding="utf-8"))
    liste_items = parse_liste(LISTE_RAW.read_text(encoding="utf-8"))
    medications = merge_prices(liste_items, prix_items) if liste_items else prix_items

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(
            {
                "source": {
                    "liste": "LNME Burkina Faso 2023",
                    "prix": "Arrêté conjoint 2025-00197",
                },
                "count": len(medications),
                "medications": medications,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    with_pvp = sum(1 for m in medications if m.get("pvp"))
    print(f"Wrote {len(medications)} meds ({with_pvp} with PVP) -> {OUT}")


if __name__ == "__main__":
    main()
