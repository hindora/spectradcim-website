"""Cuts the site's screenshots (public/shots/*.webp) out of the raw DCIM captures.

Rules the boxes follow:
  * 3-D viewer screens use the whole viewer (everything below the app's top menu bar), so no
    toolbar, side panel or timeline is cut.
  * Page screens are cut on panel borders with a little page background left around them.
  * Where a screen sits in a narrow slot, an excerpt is cut from INSIDE one panel (no border in
    the picture), so text stays readable and nothing looks sliced.
  * A list that continues past the picture fades out on that edge ("fade").
The site zooms a picture 3% on hover, which hides ~1.5% at each edge; every box leaves that
much plain background, so the zoom never cuts content.

Run from the repo root:  python assets/captures-raw/crop.py
Sources: assets/captures-raw/1280/ (window 1280 wide, 2x) and two older captures beside it.
The four trend charts are not cut here; they are drawn by assets/charts.
"""
import json, os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SHOTS = os.path.join(HERE, '..', '..', 'public', 'shots')
N = lambda n: os.path.join(HERE, '1280', n + '.png')
RACK = os.path.join(HERE, 'rack.png')                 # 1600-wide window, taken while the rack was healthy
INC = os.path.join(HERE, 'incident-page-old.png')     # incident page (1x)
INV = os.path.join(HERE, 'assets-inventory.png')      # 1600-wide window: the 1280 one overlaps two column headings
WIN = (0, 124, 2560, 1520)                             # whole viewer, below the app's top menu bar
BG = (11, 14, 20)

CROPS = {
    # 3-D viewer: whole window
    'replay-bar':    (N('v-replay'), WIN), 'replay-wide': (N('v-replay'), WIN),
    'viewer-full':   (N('v-hallA-temp'), WIN), 'hall-alarm': (N('v-hallA-alarm'), WIN),
    'hall-power':    (N('v-hallA-power'), WIN), 'hallb-inlet': (N('v-hallB-inlet'), WIN),
    'plan-heat':     (N('v-plan-heat'), WIN), 'plant': (N('v-plant'), WIN),
    'site-view':     (N('v-site'), WIN), 'building': (N('v-building'), WIN),
    'connectivity':  (N('connectivity'), (0, 122, 2560, 1492)),
    'world':         (N('world'), (30, 150, 2530, 1410)),
    # whole page sections
    'home':            (N('home'), (30, 150, 2530, 1215)),
    'power-top':       (N('power'), (26, 205, 2535, 850)),
    'thermal-top':     (N('thermal'), (26, 205, 2535, 815)),
    'capacity':        (N('capacity'), (26, 205, 2535, 815)),
    'assets-overview': (N('assets'), (405, 205, 2535, 1885)),
    'platform':        (N('platform'), (26, 140, 2200, 1475)),
    'discovery':       (N('discovery'), (415, 215, 2540, 1392)),
    'placement':       (N('estate'), (416, 316, 2200, 1012)),
    'maintenance':     (N('maintenance'), (416, 150, 2540, 445)),
    'incident-page':   (INC, (12, 85, 1518, 1219)),
    'rack-unusual':    (RACK, (1902, 796, 3170, 1174)),
    # excerpts from inside one panel, for narrow slots
    'incidents':         (N('incidents'), (86, 554, 1920, 1447), 'rb'),
    'inventory':         (INV, (835, 290, 2740, 1070), 'rb'),
    'power-headroom':    (N('power'), (58, 518, 900, 742), 'r'),
    'analytics':         (N('analytics'), (62, 556, 1420, 724)),
    'rack-feeds':        (RACK, (70, 1036, 975, 1226)),
    'rack-redundancy':   (RACK, (66, 1228, 1075, 1392)),
    'incident-cause':    (INC, (29, 207, 634, 453)),
    'incident-evidence': (INC, (29, 736, 707, 1175)),
}

def fade(im, edges, px=70):
    """Fade the named edges (r, b) into the frame colour, to show the list carries on."""
    w, h = im.size
    over = Image.new('RGB', im.size, BG)
    mask = Image.new('L', im.size, 0)
    m = mask.load()
    for e in edges:
        for i in range(px):
            a = int(255 * (i / px) ** 1.5)
            if e == 'r':
                x = w - px + i
                for y in range(h): m[x, y] = max(m[x, y], a)
            if e == 'b':
                y = h - px + i
                for x in range(w): m[x, y] = max(m[x, y], a)
    return Image.composite(over, im, mask)

if __name__ == '__main__':
    sizes = json.load(open(os.path.join(SHOTS, '_sizes.json')))
    for k, spec in CROPS.items():
        src, box = spec[0], spec[1]
        im = Image.open(src).convert('RGB').crop(box)
        if len(spec) > 2: im = fade(im, spec[2])
        if im.width > 1920: im = im.resize((1920, round(im.height * 1920 / im.width)), Image.LANCZOS)
        im.save(os.path.join(SHOTS, k + '.webp'), 'WEBP', quality=76, method=6)
        sizes[k] = [im.width, im.height]
        print(f'{k:18} {im.width}x{im.height}')
    json.dump(sizes, open(os.path.join(SHOTS, '_sizes.json'), 'w'), indent=1)
