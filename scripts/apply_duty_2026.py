#!/usr/bin/env python3
"""Applique data/duty/garde_2026.json dans Supabase (service_role)."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAYLOAD = ROOT / "data" / "duty" / "garde_2026.json"


def load_env() -> None:
    for p in (
        ROOT / "web" / ".env.local",
        ROOT / "web" / ".env",
        ROOT / ".env",
    ):
        if not p.exists():
            continue
        for line in p.read_text().splitlines():
            if not line.strip() or line.strip().startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            k, v = k.strip(), v.strip().strip('"').strip("'")
            if k and k not in os.environ:
                os.environ[k] = v


def req(url: str, key: str, method: str, path: str, body=None):
    data = None if body is None else json.dumps(body).encode()
    r = urllib.request.Request(
        url + path,
        data=data,
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        method=method,
    )
    try:
        with urllib.request.urlopen(r) as resp:
            return resp.status, resp.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()


def main() -> int:
    load_env()
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get(
        "SUPABASE_SECRET_KEY"
    )
    if not url or not key or key.startswith("["):
        print("Missing usable SUPABASE_SERVICE_ROLE_KEY / URL", file=sys.stderr)
        return 1

    payload = json.loads(PAYLOAD.read_text(encoding="utf-8"))
    matches = payload["matches"]
    rotations = payload["rotations"]
    active = payload.get("active_group")

    print("null duty_group…")
    print(req(url, key, "PATCH", "/rest/v1/pharmacies?external_id=not.is.null", {"duty_group": None})[0])
    print("delete rotations…")
    print(req(url, key, "DELETE", "/rest/v1/pharmacy_duty_rotations?id=not.is.null")[0])

    by_g: dict[str, list[int]] = defaultdict(list)
    for m in matches:
        by_g[m["duty_group"]].append(m["external_id"])
    for g, ids in by_g.items():
        for i in range(0, len(ids), 40):
            chunk = ids[i : i + 40]
            filt = ",".join(str(x) for x in chunk)
            st, _ = req(
                url,
                key,
                "PATCH",
                f"/rest/v1/pharmacies?external_id=in.({filt})",
                {"duty_group": g},
            )
            print(f"  group {g} +{len(chunk)} -> {st}")

    st, body = req(url, key, "POST", "/rest/v1/pharmacy_duty_rotations", rotations)
    print("insert rotations", st, body[:120] if body else "")

    req(url, key, "PATCH", "/rest/v1/pharmacies?external_id=not.is.null", {"is_on_duty": False})
    if active:
        st, _ = req(
            url,
            key,
            "PATCH",
            f"/rest/v1/pharmacies?duty_group=eq.{active}",
            {"is_on_duty": True, "status_label": "De garde"},
        )
        print("active group", active, "->", st)
        req(
            url,
            key,
            "PATCH",
            "/rest/v1/pharmacies?is_on_duty=eq.false&status_label=eq.De%20garde",
            {"status_label": "Ouverte"},
        )

    print("done", payload["stats"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
