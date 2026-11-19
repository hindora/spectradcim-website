"""Recolour the SpectraDCIM logo (original artwork shapes, colours only).

Shapes are untouched: every blue pixel keeps its alpha, shading and anti-aliasing.
Mark  -> every bar runs top to bottom from light cyan to deep blue (strong gradient)
"DCIM" -> sky blue;  "Spectra" stays white.
Run from the repo root:  python assets/brand/recolor.py
"""
import colorsys
from PIL import Image, ImageDraw

C0 = (0x7A, 0xF3, 0xFF)     # bars: top (light cyan)
C1 = (0x25, 0x5A, 0xE8)     # bars: bottom (deep blue)
DCIM = (0x4C, 0xC3, 0xFF)   # the word "DCIM"
TILE = (0x16, 0x18, 0x1D)   # favicon tile = --black, the page color
SRC = "assets/brand/spectradcim-logo-blue.png"   # original artwork, background keyed out
OUT = "public/brand/spectradcim-logo.png"
MARK_W = 245                # the mark ends here; the wordmark starts after it


def recolor(im):
    im = im.convert("RGBA")
    px = im.load()
    H = im.height
    # vertical extent of the mark, so the gradient spans exactly the bars
    ys = [y for y in range(H) for x in range(MARK_W) if px[x, y][3] > 128]
    Y0, Y1 = min(ys), max(ys)
    for y in range(H):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            deg = h * 360
            if s < 0.03 or not 170 <= deg <= 250:
                continue
            if x >= MARK_W:
                tgt, vref = DCIM, 1.0
            else:
                # straight down the bars: top of the mark = C0, bottom = C1
                t = min(1.0, max(0.0, (y - Y0) / (Y1 - Y0)))
                tgt = [C0[i] + (C1[i] - C0[i]) * t for i in range(3)]
                # the artwork's lower bars are a darker blue; divide that out so only shading remains
                vref = 1.0 - 0.2 * min(1.0, max(0.0, (deg - 196) / 20))
            k = min(1.0, v / vref)
            w = min(1.0, max(0.0, 1 - s / 0.8))      # keep soft, pale edge pixels pale
            px[x, y] = tuple(round((tgt[i] * (1 - w) + 255 * w) * k) for i in range(3)) + (a,)
    return im


logo = recolor(Image.open(SRC))
logo.save(OUT, optimize=True)

# favicon: the mark alone on a dark rounded tile
mark = logo.crop((0, 0, MARK_W, logo.height))
mark = mark.crop(mark.getbbox())
S = 192 * 4
tile = Image.new("RGBA", (S, S), (0, 0, 0, 0))
ImageDraw.Draw(tile).rounded_rectangle((0, 0, S - 1, S - 1), radius=S // 6, fill=TILE + (255,))
box = int(S * 0.76)
k = min(box / mark.width, box / mark.height)
m = mark.resize((round(mark.width * k), round(mark.height * k)), Image.LANCZOS)
tile.alpha_composite(m, ((S - m.width) // 2, (S - m.height) // 2))
tile.resize((192, 192), Image.LANCZOS).save("public/favicon.png", optimize=True)
print("wrote", OUT, logo.size, "and public/favicon.png")
