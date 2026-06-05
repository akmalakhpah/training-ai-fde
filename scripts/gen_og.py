#!/usr/bin/env python3
"""Generate 1200x630 Open Graph share images for the AI FDE Training site.

Light glassmorphism theme matching slides.css. One image per week plus the
main page, with a phase-colored accent (P1 blue, P2 green, P3 amber, P4 red).
Output: /og/*.png  (run from repo root: python3 scripts/gen_og.py)
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "og")
os.makedirs(OUT, exist_ok=True)

W, H = 1200, 630

# ---- Fonts (macOS system SF + locally-installed JetBrains Mono) -------------
SF = "/System/Library/Fonts/SFNS.ttf"
MONO = os.path.expanduser("~/Library/Fonts/JetBrainsMono-Bold.ttf")
MONO_R = os.path.expanduser("~/Library/Fonts/JetBrainsMono-Regular.ttf")


def sf(size, weight="Bold"):
    f = ImageFont.truetype(SF, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def mono(size, bold=True):
    return ImageFont.truetype(MONO if bold else MONO_R, size)


# ---- Palette ----------------------------------------------------------------
INK = (20, 20, 20)
MUTED = (91, 88, 112)
SUBTLE = (138, 135, 154)

PHASE = {
    "p0": {"name": "Setup", "color": (24, 86, 255)},
    "p1": {"name": "Production Engineering Foundations", "color": (24, 86, 255)},
    "p2": {"name": "AI Application Engineering", "color": (7, 202, 107)},
    "p3": {"name": "The FDE Craft", "color": (244, 165, 42)},
    "p4": {"name": "Capstone Embedded Deployment", "color": (234, 33, 67)},
}

# week -> (phaseId, topic, time-budget subline)
WEEKS = {
    0:  ("p0", "Setup and Diagnostic", "Tooling, accounts, and a working environment before Week 1"),
    1:  ("p1", "From Coursework to Production", "The habits that survive contact with a real system"),
    2:  ("p1", "Data Fluency", "Reading, shaping, and trusting real-world data"),
    3:  ("p1", "Deploy, Observe, Recover", "Shipping code and keeping it alive in production"),
    4:  ("p2", "LLM Application Patterns", "Building reliable systems on unreliable models"),
    5:  ("p2", "Retrieval and Grounding (RAG)", "Giving models the right context, on demand"),
    6:  ("p2", "MCP and Tool Calling", "Letting models act through real tools"),
    7:  ("p2", "Automation with N8N", "Wiring services into working pipelines"),
    8:  ("p3", "Scoping Ambiguity", "Turning a vague brief into a real plan"),
    9:  ("p3", "Integration and the Messy Real World", "Making it work inside someone else's system"),
    10: ("p3", "Customer-Facing Communication and Capstone Scoping", "Talking to customers and scoping the capstone"),
    11: ("p4", "Build in Place", "A real deployment with a real owner"),
    12: ("p4", "Ship and Defend", "Ship it, then defend the decisions"),
}


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def background(accent):
    """Light vertical gradient + soft accent glow in the top-right corner."""
    top, mid, bot = (238, 242, 255), (247, 245, 255), (240, 251, 255)
    base = Image.new("RGB", (W, H))
    px = base.load()
    for y in range(H):
        t = y / H
        c = lerp(top, mid, t * 2) if t < 0.5 else lerp(mid, bot, (t - 0.5) * 2)
        for x in range(W):
            px[x, y] = c

    # accent glow (top-right) + a faint phase tint (bottom-left)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W - 620, -360, W + 260, 520], fill=accent + (60,))
    gd.ellipse([-360, H - 360, 320, H + 320], fill=accent + (26,))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    base = Image.alpha_composite(base.convert("RGBA"), glow)
    return base


def rounded(draw, box, r, fill):
    draw.rounded_rectangle(box, radius=r, fill=fill)


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_card(img, accent, eyebrow, big_lines_text, subline, badge, badge_sub):
    d = ImageDraw.Draw(img)
    PAD = 90
    content_w = 760  # leave room for the badge on the right

    # left phase spine
    rounded(d, [0, 0, 14, H], 0, accent + (255,))

    # eyebrow (mono, phase color)
    ey_font = mono(26)
    dot_r = 8
    ey_y = 96
    d.ellipse([PAD, ey_y + 9, PAD + dot_r * 2, ey_y + 9 + dot_r * 2], fill=accent)
    d.text((PAD + dot_r * 2 + 18, ey_y), eyebrow, font=ey_font, fill=accent)

    # headline (SF Heavy)
    head_font = sf(82, "Heavy")
    lines = wrap(d, big_lines_text, head_font, content_w)
    # shrink if too many lines
    while len(lines) > 3 and head_font.size > 54:
        head_font = sf(head_font.size - 6, "Heavy")
        lines = wrap(d, big_lines_text, head_font, content_w)
    line_h = head_font.size + 14

    # subline (muted) — shrink to a single line so it never collides
    sub_font = sf(30, "Medium")
    while d.textlength(subline, font=sub_font) > content_w and sub_font.size > 22:
        sub_font = sf(sub_font.size - 1, "Medium")

    # vertically center the headline + divider + subline block
    block_h = len(lines) * line_h + 14 + 6 + 30 + sub_font.size
    y = 150 + max(0, ((H - 230) - 150 - block_h) // 2)

    for ln in lines:
        d.text((PAD, y), ln, font=head_font, fill=INK)
        y += line_h

    # divider
    y += 14
    d.rounded_rectangle([PAD, y, PAD + 70, y + 6], radius=3, fill=accent)
    y += 30

    # subline
    d.text((PAD, y), subline, font=sub_font, fill=MUTED)

    # bottom brand bar
    brand_font = mono(24, bold=False)
    d.text((PAD, H - 70), "AI Forward Deployed Engineer  ·  12-Week Training",
           font=brand_font, fill=SUBTLE)

    # right-side badge (glassy circle with week label / "FDE")
    bx, by, br = W - 220, H // 2 - 10, 118
    badge_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(badge_layer)
    bd.ellipse([bx - br - 6, by - br - 6, bx + br + 6, by + br + 6], fill=accent + (38,))
    bd.ellipse([bx - br, by - br, bx + br, by + br], fill=(255, 255, 255, 150),
               outline=accent + (255,), width=5)
    img.alpha_composite(badge_layer)
    d = ImageDraw.Draw(img)

    # badge text centered
    bsub_font = mono(26)
    bnum_font = sf(96, "Black")
    sub_w = d.textlength(badge_sub, font=bsub_font)
    d.text((bx - sub_w / 2, by - 78), badge_sub, font=bsub_font, fill=accent)
    nb = d.textbbox((0, 0), badge, font=bnum_font)
    nw, nh = nb[2] - nb[0], nb[3] - nb[1]
    d.text((bx - nw / 2 - nb[0], by - nh / 2 - nb[1] + 18), badge, font=bnum_font, fill=INK)


def gen_week(num):
    pid, topic, subline = WEEKS[num]
    accent = PHASE[pid]["color"]
    phase_no = pid[1]
    eyebrow = f"PHASE {phase_no} · {PHASE[pid]['name'].upper()}"
    img = background(accent)
    draw_card(img, accent, eyebrow, topic, subline,
              badge=str(num), badge_sub="WEEK")
    out = os.path.join(OUT, f"week-{num:02d}.png")
    img.convert("RGB").save(out, "PNG")
    print("wrote", out)


def gen_home():
    accent = PHASE["p1"]["color"]
    img = background(accent)
    draw_card(
        img, accent,
        "AI FDE TRAINING · 12-WEEK HYBRID COURSE",
        "From Fresh Graduate to Deployable AI FDE",
        "Production engineering · AI application craft · a real capstone",
        badge="FDE", badge_sub="AI",
    )
    out = os.path.join(OUT, "home.png")
    img.convert("RGB").save(out, "PNG")
    print("wrote", out)


if __name__ == "__main__":
    gen_home()
    for n in WEEKS:
        gen_week(n)
