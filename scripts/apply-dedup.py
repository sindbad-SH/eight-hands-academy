"""Apply the reconciled de-dup photo plan atomically per file.
Each map is {oldBasename: newBasename}; we swap '/img/OLD.jpg' -> '/img/NEW.jpg' via unique
sentinels so overlapping old/new names can't cross-fire. Asserts each OLD occurs exactly once."""
import os

ROOT = r"E:\Panthers gate\8 hands qi house\Qi-House Website Build"

PLAN = {
    "src/pages/index.astro": {
        "instruction-1": "mentoring-1", "group-2": "reflection-1", "mentoring-1": "form-1",
    },
    "src/pages/admissions.astro": {
        "group-1": "mentoring-1", "environment-1": "reflection-2", "mentoring-1": "exterior-wide",
    },
    "src/pages/about/index.astro": {
        "instruction-2": "form-1",
    },
    "src/pages/community/index.astro": {
        "reflection-2": "community-1", "community-1": "reflection-1",
        "mentoring-2": "exterior-wide", "instruction-3": "extra-1",
    },
    "src/pages/learning.astro": {
        "instruction-2": "instruction-1", "group-1": "reflection-2", "reflection-2": "mentoring-1",
        "mentoring-2": "exterior-wide", "instruction-1": "form-1", "mentoring-1": "mentoring-2",
    },
    "src/pages/daily-life.astro": {
        "environment-2": "group-1", "instruction-2": "instruction-1", "reflection-1": "form-1",
        "environment-1": "reflection-1", "instruction-1": "instruction-3",
        "environment-3": "mentoring-2", "group-1": "community-1",
    },
}

for rel, mp in PLAN.items():
    p = os.path.join(ROOT, rel)
    with open(p, "r", encoding="utf-8") as f:
        txt = f.read()
    # verify each old occurs exactly once
    for i, old in enumerate(mp):
        tok = f"/img/{old}.jpg"
        c = txt.count(tok)
        if c != 1:
            print(f"!! {rel}: '{tok}' occurs {c} times (expected 1) — ABORTING this file")
            break
    else:
        # pass 1: olds -> sentinels
        for i, old in enumerate(mp):
            txt = txt.replace(f"/img/{old}.jpg", f"/img/@@SENT{i}@@.jpg")
        # pass 2: sentinels -> news
        for i, (old, new) in enumerate(mp.items()):
            txt = txt.replace(f"/img/@@SENT{i}@@.jpg", f"/img/{new}.jpg")
        with open(p, "w", encoding="utf-8") as f:
            f.write(txt)
        changes = ", ".join(f"{o}->{n}" for o, n in mp.items())
        print(f"OK {rel}: {changes}")
