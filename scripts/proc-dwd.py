"""De-watermark + optimize the 4 'Development With Direction' brush-ink illustrations.
Gemini drops a white sparkle in the bottom-right corner; the red seal sits higher/left, so a
bottom-right corner box covers the sparkle without touching the seal. Fill = mean of the clean
cream band just above the box (seamless on the near-uniform background)."""
from PIL import Image, ImageDraw, ImageStat, ImageFilter
import os

SRC = r"E:\Panthers gate\8 hands qi house\8 Hands Photos\Studio\Photos for website\Generated images\Development"
DST = r"E:\Panthers gate\8 hands qi house\Qi-House Website Build\public\img"
MAXD = 2000

jobs = [
    ("Observe.png", "dwd-observe.jpg"),
    ("Practice.png", "dwd-practice.jpg"),
    ("Integrate.png", "dwd-integrate.jpg"),
    ("Contribute.png", "dwd-contribute.jpg"),
]

BW, BH = 230, 220  # corner box covering the sparkle; clears the red seal (which is higher + left)

for src, dst in jobs:
    im = Image.open(os.path.join(SRC, src)).convert("RGB")
    W, H = im.size
    ref = im.crop((W - BW, H - BH - 180, W, H - BH - 20))  # clean cream just above the box
    fill = tuple(int(round(c)) for c in ImageStat.Stat(ref).mean[:3])
    ImageDraw.Draw(im).rectangle([W - BW, H - BH, W, H], fill=fill)
    scale = min(1.0, MAXD / max(W, H))
    if scale < 1.0:
        im = im.resize((round(W * scale), round(H * scale)), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.0, percent=50, threshold=2))
    out = os.path.join(DST, dst)
    im.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print(dst, im.size, str(round(os.path.getsize(out) / 1024)) + " KB")
