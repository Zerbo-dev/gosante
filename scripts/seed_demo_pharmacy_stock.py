#!/usr/bin/env python3
"""Seed stocks démo pour 3 pharmacies pilotes (ADAMA, AEROPORT, KOSSODO)."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "web" / "src" / "data" / "demo_pharmacy_stock.json"

PHARMACIES = {
    17673: "Pharmacie ADAMA",
    51: "Pharmacie AEROPORT",
    12: "Pharmacie KOSSODO",
}

# Variantes de stock par pharmacie (multiplicateur qty / écart prix)
VARIANT = {
    17673: {"qty": 1.0, "price": 1.0, "skip_every": 0},
    51: {"qty": 0.7, "price": 1.05, "skip_every": 3},
    12: {"qty": 1.2, "price": 0.95, "skip_every": 4},
}


def req(url: str, key: str, method: str, path: str, body=None):
    data = None if body is None else json.dumps(body).encode()
    r = urllib.request.Request(
        url.rstrip("/") + path,
        data=data,
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
        method=method,
    )
    try:
        with urllib.request.urlopen(r) as resp:
            return resp.status, json.loads(resp.read().decode() or "null")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()


def main() -> int:
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SECRET_KEY")
    if not url or not key:
        print("Missing SUPABASE URL / SERVICE_ROLE_KEY")
        return 1

    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    eids = ",".join(str(x) for x in PHARMACIES)
    st, pharmacies = req(
        url,
        key,
        "GET",
        f"/rest/v1/pharmacies?external_id=in.({eids})&select=id,external_id,name",
    )
    if st != 200 or not isinstance(pharmacies, list):
        print("pharmacies fetch failed", st, pharmacies)
        return 1

    by_eid = {p["external_id"]: p for p in pharmacies}
    print("pharmacies", [(p["external_id"], p["name"]) for p in pharmacies])

    for eid, meta in VARIANT.items():
        p = by_eid.get(eid)
        if not p:
            print("missing pharmacy", eid)
            continue
        pid = p["id"]
        # clear previous demo stock for this pharmacy
        req(url, key, "DELETE", f"/rest/v1/pharmacy_stock?pharmacy_id=eq.{pid}")
        rows = []
        for i, item in enumerate(catalog):
            if meta["skip_every"] and i % meta["skip_every"] == 0 and i > 0:
                continue
            dci = item["dci"]
            dosage = item.get("dosage")
            med_key = f"{dci} — {dosage}" if dosage else dci
            qty = max(1, int(item["quantity"] * meta["qty"]))
            price = round(float(item["unit_price"]) * meta["price"])
            rows.append(
                {
                    "pharmacy_id": pid,
                    "medication_dci": med_key,
                    "designation": item["designation"],
                    "dosage": dosage,
                    "quantity": qty,
                    "unit_price": price,
                }
            )
        # upsert in chunks
        for i in range(0, len(rows), 50):
            chunk = rows[i : i + 50]
            st, body = req(
                url,
                key,
                "POST",
                "/rest/v1/pharmacy_stock?on_conflict=pharmacy_id,medication_dci",
                chunk,
            )
            # Prefer resolution merge-duplicates
            if st not in (200, 201):
                # retry with Prefer header via upsert semantics - PostgREST needs Prefer
                r = urllib.request.Request(
                    url.rstrip("/")
                    + "/rest/v1/pharmacy_stock?on_conflict=pharmacy_id,medication_dci",
                    data=json.dumps(chunk).encode(),
                    headers={
                        "apikey": key,
                        "Authorization": f"Bearer {key}",
                        "Content-Type": "application/json",
                        "Prefer": "resolution=merge-duplicates,return=minimal",
                    },
                    method="POST",
                )
                try:
                    with urllib.request.urlopen(r) as resp:
                        st = resp.status
                        body = resp.read().decode()
                except urllib.error.HTTPError as e:
                    st, body = e.code, e.read().decode()
            print(f"  {p['name']}: chunk {i} -> {st} ({len(chunk)} rows)")
            if st >= 400:
                print(body[:300])
                return 1
        print(f"seeded {p['name']}: {len(rows)} products")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
