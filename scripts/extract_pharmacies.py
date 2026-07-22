"""Extract pharmacies from pharmacies-burkina-faso.html into JSON."""
import json
import re
from pathlib import Path

HTML = Path(r"d:\tontine_structure\pharmacies-burkina-faso.html")
OUT = Path(__file__).resolve().parents[1] / "web" / "src" / "data" / "pharmacies.json"

text = HTML.read_text(encoding="utf-8")
start = text.index("const DATA = ") + len("const DATA = ")
decoder = json.JSONDecoder()
data, _ = decoder.raw_decode(text, start)
pharmacies = []

for p in data["pharmacies"]:
    lat = p.get("lat")
    lng = p.get("lng")
    if lat is None or lng is None:
        continue
    pharmacies.append(
        {
            "external_id": p.get("id"),
            "name": f"Pharmacie {p.get('name', '').strip()}".replace("Pharmacie Pharmacie", "Pharmacie"),
            "address": p.get("address") or "",
            "city": p.get("city_name") or p.get("city") or "Ouagadougou",
            "phone": p.get("telephone") or "",
            "latitude": float(lat),
            "longitude": float(lng),
            "is_on_duty": p.get("status") == "guard",
            "opening_hours": p.get("hours") or None,
            "status_label": p.get("status_label") or "",
        }
    )

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(
    json.dumps({"count": len(pharmacies), "pharmacies": pharmacies}, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
print(f"Exported {len(pharmacies)} pharmacies -> {OUT}")
