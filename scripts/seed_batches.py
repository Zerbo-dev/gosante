import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
meds = json.loads((ROOT / "web" / "src" / "data" / "medications.json").read_text(encoding="utf-8"))["medications"]


def esc(value):
    if value is None:
        return "NULL"
    return "'" + str(value).replace("'", "''") + "'"


batches = []
for i in range(0, len(meds), 40):
    chunk = meds[i : i + 40]
    values = []
    for m in chunk:
        values.append(
            "("
            + ",".join(
                [
                    esc(m.get("dci", "")),
                    esc(m.get("designation", "")),
                    esc(m.get("dosage")),
                    esc(m.get("form")),
                    str(m["pvp"]) if m.get("pvp") is not None else "NULL",
                    str(m["pv_drd"]) if m.get("pv_drd") is not None else "NULL",
                    esc(m.get("audience")),
                    esc(m.get("group")),
                    esc(m.get("search_text", "")),
                ]
            )
            + ")"
        )
    sql = (
        "INSERT INTO public.medications (dci, designation, dosage, form, pvp, pv_drd, audience, pharmacological_group, search_text) VALUES "
        + ",".join(values)
        + ";"
    )
    batches.append(sql)

out = ROOT / "data" / "seed_batches.json"
out.write_text(json.dumps(batches), encoding="utf-8")
print(len(batches), "batches", len(meds), "meds")
