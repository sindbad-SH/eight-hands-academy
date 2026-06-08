#!/usr/bin/env python3
"""Generate on-brand 2D art tiles via the Gemini image API (Nano Banana).

Reads the API key from ~/.gemkey (NEVER committed). Writes 4:3 tiles into public/img/.
Run:  python scripts/gen-art.py
Requires Pillow:  pip install pillow

These are deliberately STYLIZED illustrations (no faces/photoreal/logos) used only in abstract /
conceptual slots and as branded placeholders for event links that expose no image. Authentic slots
(real studio / instructors / students) keep real photography.
"""
import os, sys, json, base64, io, urllib.request, urllib.error
from PIL import Image, ImageOps

KEY = open(os.path.expanduser('~/.gemkey')).read().strip()
MODEL = 'gemini-2.5-flash-image'
URL = f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={KEY}'
PUB = os.path.join(os.path.dirname(__file__), '..', 'public', 'img')

STYLE = ("Flat 2D editorial illustration, sumi-e ink-brush texture meeting clean modern line-art. "
         "Deep navy (#0B2341) background, warm gold (#C9A44C) linework, a single restrained crimson "
         "(#8C1D18) accent. Calm, dignified, institutional, uncluttered. No text, no faces, no logos, "
         "no photographic realism. Composition centered.")

JOBS = [
    ("events/cerus.jpg",
     "A single stylized boxing glove rising upward in confident ink-brush strokes, suggesting strength "
     "and recovery. " + STYLE),
    ("events/tapcancerout.jpg",
     "Two abstract figures in a respectful grappling embrace forming a balanced circular composition that "
     "also evokes an awareness ribbon. " + STYLE),
    ("art/twelve-houses.jpg",
     "Twelve subtle circular nodes arranged in a balanced constellation, joined by fine lines, suggesting "
     "facets of one whole rather than a hierarchy. " + STYLE),
    ("art/ethos.jpg",
     "A single elegant enso-like brush circle and a balanced flowing form suggesting harmony between "
     "movement and stillness, mind and body. " + STYLE),
    ("art/governance.jpg",
     "Clean architectural linework of balanced pillars and a measured grid, evoking structure, standards, "
     "and stewardship. " + STYLE),
]


def gen(prompt):
    body = json.dumps({"contents": [{"parts": [{"text": prompt}]}],
                       "generationConfig": {"responseModalities": ["IMAGE"]}}).encode()
    req = urllib.request.Request(URL, data=body, headers={'Content-Type': 'application/json'})
    d = json.loads(urllib.request.urlopen(req, timeout=180).read())
    for p in d.get('candidates', [{}])[0].get('content', {}).get('parts', []):
        dat = p.get('inlineData', {}).get('data') or p.get('inline_data', {}).get('data')
        if dat:
            return base64.b64decode(dat)
    raise RuntimeError('no image in response: ' + json.dumps(d)[:200])


def save_43(raw, out):
    im = ImageOps.exif_transpose(Image.open(io.BytesIO(raw))).convert('RGB')
    w, h = im.size
    target, cur = 4 / 3, w / h
    if cur > target:
        nw = int(h * target); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    elif cur < target:
        nh = int(w / target); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    if im.width > 1000:
        im = im.resize((1000, int(im.height * 1000 / im.width)))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, quality=86, optimize=True)
    return im.size


def main():
    for rel, prompt in JOBS:
        out = os.path.join(PUB, rel)
        try:
            print(rel, 'OK', save_43(gen(prompt), out))
        except urllib.error.HTTPError as e:
            msg = e.read().decode('utf-8', 'ignore')[:240]
            print(rel, 'HTTP', e.code, msg)
            if e.code in (402, 403, 429):
                print('>>> Likely billing/quota gate — stopping so the operator can decide.')
                break
        except Exception as ex:
            print(rel, 'ERR', type(ex).__name__, str(ex)[:200])


if __name__ == '__main__':
    main()
