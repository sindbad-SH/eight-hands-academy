#!/usr/bin/env python3
"""Refresh Community Impact event images.

Pulls each event link's og:image, optimizes it, and writes public/img/events/<slug>.jpg.
Keep EVENTS in sync with the `events` array in src/pages/index.astro.
Run:  python scripts/fetch-event-images.py   (then rebuild/redeploy)

Requires Pillow:  pip install pillow
Links that expose no usable og:image (e.g. Instagram, some ticketing pages) are skipped;
those cards fall back to a branded tile in index.astro.
"""
import io, os, re, sys, urllib.request

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is required: pip install pillow")

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/124 Safari/537.36"}

# slug -> event page URL  (slug must match the /img/events/<slug>.jpg path in index.astro)
EVENTS = {
    "cerus":         "https://www.instagram.com/p/DY2n5kxjWGq/",
    "tapcancerout":  "https://wecan.tapcancerout.org/campaign/2026-tap-cancer-out-global-grappling-day/c756894",
    "americas-cup":  "https://denvermartialartsevent.com/",
    "red-wine-brew": "https://www.koobit.com/red-wine-and-brew-e188225",
    "summerfest":    "https://www.schoolofrock.com/locations/highlandsranch/events/school-of-rock-highlands-ranch-broomfield-summerfest-fundraiser-at-bar-404-june-14-2026",
    "roots-rhythm":  "https://www.bathgardencenter.com/event-details/roots-rhythm-with-the-friendly-reminders-trio",
}

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img", "events")
OG = re.compile(r'property=["\']og:image["\'][^>]+content=["\']([^"\']+)', re.I)
OG2 = re.compile(r'content=["\']([^"\']+)["\'][^>]+property=["\']og:image', re.I)


def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=25).read()


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, url in EVENTS.items():
        try:
            html = fetch(url).decode("utf-8", "ignore")
            m = OG.search(html) or OG2.search(html)
            if not m:
                print(f"{slug}: no og:image (kept fallback)")
                continue
            iu = m.group(1)
            if iu.startswith("//"):
                iu = "https:" + iu
            im = ImageOps.exif_transpose(Image.open(io.BytesIO(fetch(iu)))).convert("RGB")
            w, h = im.size
            if w > 900:
                im = im.resize((900, int(h * 900 / w)))
            im.save(os.path.join(OUT, f"{slug}.jpg"), quality=82, optimize=True)
            print(f"{slug}: OK {im.size}")
        except Exception as e:
            print(f"{slug}: ERROR {type(e).__name__} {str(e)[:90]}")


if __name__ == "__main__":
    main()
