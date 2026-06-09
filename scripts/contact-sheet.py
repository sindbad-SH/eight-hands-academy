"""Build a labeled contact sheet of the candidate photos so I can curate de-duped placements."""
from PIL import Image, ImageDraw, ImageFont
import os

IMG = r"E:\Panthers gate\8 hands qi house\Qi-House Website Build\public\img"
SRC = r"E:\Panthers gate\8 hands qi house\8 Hands Photos\Studio\Photos for website\Student and instructor photos"
LOC = r"E:\Panthers gate\8 hands qi house\8 Hands Photos\Studio\Photos for website\Location shots no people"

items = [
    (IMG, "instruction-1.jpg"), (IMG, "instruction-2.jpg"), (IMG, "instruction-3.jpg"),
    (IMG, "group-1.jpg"), (IMG, "group-2.jpg"),
    (IMG, "mentoring-1.jpg"), (IMG, "mentoring-2.jpg"),
    (IMG, "environment-1.jpg"), (IMG, "environment-2.jpg"), (IMG, "environment-3.jpg"),
    (IMG, "interior-wide.jpg"), (IMG, "exterior-wide.jpg"),
    (IMG, "reflection-1.jpg"), (IMG, "reflection-2.jpg"),
    (IMG, "community-1.jpg"), (IMG, "service-1.jpg"), (IMG, "extra-1.jpg"),
    (SRC, "Martial arts student in form.png"), (SRC, "Copy of IMG_2474.JPG"),
]

COLS, CELL, PAD, LBL = 5, 340, 10, 26
rows = (len(items) + COLS - 1) // COLS
W = COLS * (CELL + PAD) + PAD
H = rows * (CELL + LBL + PAD) + PAD
sheet = Image.new("RGB", (W, H), (245, 243, 238))
d = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("arial.ttf", 18)
except Exception:
    font = ImageFont.load_default()

for idx, (folder, name) in enumerate(items):
    r, c = divmod(idx, COLS)
    x = PAD + c * (CELL + PAD)
    y = PAD + r * (CELL + LBL + PAD)
    p = os.path.join(folder, name)
    if os.path.exists(p):
        im = Image.open(p).convert("RGB")
        im.thumbnail((CELL, CELL), Image.LANCZOS)
        ox = x + (CELL - im.width) // 2
        oy = y + (CELL - im.height) // 2
        sheet.paste(im, (ox, oy))
    else:
        d.rectangle([x, y, x + CELL, y + CELL], outline=(200, 0, 0))
        d.text((x + 8, y + 8), "MISSING", fill=(200, 0, 0), font=font)
    d.text((x + 2, y + CELL + 3), name, fill=(11, 35, 65), font=font)

out = os.path.join(os.environ["TEMP"], "contact_sheet.jpg")
sheet.save(out, "JPEG", quality=82)
print(out)
