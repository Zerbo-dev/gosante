import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
pharmacies = json.loads((ROOT / "web" / "src" / "data" / "pharmacies.json").read_text(encoding="utf-8"))[
    "pharmacies"
]


def esc(v):
    if v is None:
        return "NULL"
    return "'" + str(v).replace("'", "''") + "'"


batches = []
for i in range(0, len(pharmacies), 35):
    chunk = pharmacies[i : i + 35]
    values = []
    for p in chunk:
        values.append(
            "("
            + ",".join(
                [
                    str(p.get("external_id") or "NULL"),
                    esc(p["name"]),
                    esc(p.get("address") or ""),
                    esc(p.get("city") or "Ouagadougou"),
                    esc(p.get("phone") or ""),
                    str(p["latitude"]),
                    str(p["longitude"]),
                    "true" if p.get("is_on_duty") else "false",
                    esc(p.get("opening_hours")),
                    esc(p.get("status_label") or ""),
                ]
            )
            + ")"
        )
    sql = (
        "INSERT INTO public.pharmacies (external_id, name, address, city, phone, latitude, longitude, is_on_duty, opening_hours, status_label) VALUES "
        + ",".join(values)
        + ";"
    )
    batches.append(sql)

out = ROOT / "data" / "pharmacy_seed_batches.json"
out.write_text(json.dumps(batches), encoding="utf-8")
print(len(batches), "batches,", len(pharmacies), "pharmacies")
