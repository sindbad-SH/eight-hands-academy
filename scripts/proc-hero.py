"""One-off: optimize the three client hero photos into public/img.
exif_transpose -> RGB -> downscale to <=2400 -> UnsharpMask -> q85 progressive."""
from PIL import Image, ImageOps, ImageFilter
import os

SRC = r"E:\Panthers gate\8 hands qi house\8 Hands Photos\Studio\Photos for website"
DST = r"E:\Panthers gate\8 hands qi house\Qi-House Website Build\public\img"
MAXD = 2400

jobs = [
    ("Guided instruction.jpg", "guided-instruction.jpg"),
    ("Group training 2.JPG", "group-training-2.jpg"),
    ("Martial arts student being instructed on Kick.jpg", "student-kick.jpg"),
]

for src, dst in jobs:
    im = Image.open(os.path.join(SRC, src))
    im = ImageOps.exif_transpose(im)
    im = im.convert("RGB")
    w, h = im.size
    scale = min(1.0, MAXD / max(w, h))
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=80, threshold=2))
    out = os.path.join(DST, dst)
    im.save(out, "JPEG", quality=85, optimize=True, progressive=True)
    print(dst, im.size, str(round(os.path.getsize(out) / 1024)) + " KB")
