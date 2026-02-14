---
title: "NP50: A CSS Theme Inspired by Nintendo Power No. 50"
date: 2026-01-29
layout: layouts/post.njk
description: "How I built a complete visual theme by sampling colors from the July 1993 issue of Nintendo Power — the one with Zelda: Link's Awakening on the cover."
tags:
  - posts
  - 🎨 design
  - 🎮 retro
  - 💾 css
  - theme
---

## The Issue on the Floor 🎮

July 1993. I'm lying on my stomach on the living-room carpet, flipping through **Nintendo Power No. 50**. The cover is Link's Awakening — Link in his green tunic, standing on Koholint Island, the Wind Fish's egg looming on the mountaintop. The pages inside are dense with maps, hand-drawn strategy art, and those trademark red-and-gold NP stripes running down the margins.

That magazine didn't just teach me where to find the Nightmare Keys. It taught me that **information design matters**. Bold colors, clean layouts, a sense of authority and fun mixed together. Thirty years later, I wanted to bottle that feeling and pour it into a stylesheet.

This is how I built the **NP50 theme**.

## The Palette 🎨

Every color in the NP50 palette was pulled from the visual language of that era of Nintendo Power:

| Swatch | Name           | Hex       | Source                             |
| ------ | -------------- | --------- | ---------------------------------- |
| 🔴     | Power Red      | `#E60012` | The Nintendo Power logo            |
| 🟡     | Power Gold     | `#FFC20E` | Stripe accents, seals, badges      |
| 🔵     | Hero Blue      | `#1F3C88` | Link's tunic shadows, deep headers |
| 🩵     | Sky Hint       | `#6FA3D9` | Ocean backgrounds, info callouts   |
| 🟤     | Owl Umber      | `#8A4F2A` | Owl statues, earthen guidance      |
| 🟠     | Feather Rust   | `#C46A2D` | Autumn warmth, leather, highlight  |
| ⬛     | Shadow Bark    | `#3A2A1E` | Darkest earth, dramatic shadows    |
| 🟢     | Koholint Grass | `#5FAF3A` | Overworld green, life energy       |
| 🏖️     | Parchment Sand | `#C9A46A` | Map edges, aged scroll tones       |
| 📜     | Aged Paper     | `#EFE3C5` | The page itself — cream, warm      |
| ✒️     | Ink Black      | `#1C1C1C` | Body text, not-quite-black         |
| 🌫️     | Soft Shadow    | `#6B6B6B` | Subtle UI shadows, muted text      |

Thirteen named colors. Every one of them earns its place.

## The Architecture: 10 CSS Layers 🏗️

The theme isn't just a color swap on top of Bulma. It's structured as **ten composable layers**, each responsible for one visual effect. They stack on top of each other like printing plates in a four-color press run:

### 1. Theme Tokens

CSS custom properties on `:root` expose every palette color plus derived surface tones using `color-mix()`. Three "tuning knobs" — `--np-paper-contrast`, `--np-ink-bleed`, and `--np-pop` — let you dial the effect intensity without touching a single color value.

### 2. Paper Backdrop

The `<body>` background isn't a flat color. It's a stack of layered gradients: a warm vignette (gold top-left, blue top-right, shadow bottom-center), a fine crosshatch pattern simulating paper fiber, and the aged-paper base. The fiber uses `calc()` with `--np-paper-contrast` so you can soften or deepen it from one variable.

### 3. Stripe Accent

The `.np-stripes` class adds a gold-and-red dashed bar via `::after`, directly evoking the sidebar stripes from the magazine's page layouts. It uses `repeating-linear-gradient` layered with a red fade, and `filter: saturate()` keyed to `--np-pop`.

### 4. Hero Poster Treatment

The `.np-hero` class transforms Bulma's hero section into something that looks like a printed magazine cover. A halftone dot pattern sits in `::before` with `mix-blend-mode: multiply`. A print-registration "ghost" — a subtle offset of blue and red — lives in `::after`, creating that slight misalignment you see in actual offset-printed magazines.

### 5. Paper Cutout Boxes

Every `.box`, `.card`, `.notification`, and `.table` gets a white-highlight gradient top-left (simulating a light source hitting paper), a warm sand-fade bottom, and a fine diagonal hatch in a `::after` overlay. They look like clipped rectangles of thicker stock paper glued to the page.

### 6. Ink Underline Links

Links get a gold gradient underline that expands on hover, using `background-size` animation. The underline sits at 92% vertical, so it doesn't clip descenders. On hover, the color shifts toward a red-blue mix, and saturation bumps up.

### 7. Navbar Masthead

The navbar background is a paper-to-cream gradient with a bottom border. The brand name's `<strong>` element gets a gold dashed stripe underneath via `::after` — the same repeating-linear-gradient technique as the stripe accent, scaled down for the smaller context.

### 8. CSS Seal Badge

The `.np-seal` class places a floating "OFFICIAL" badge in the top-right corner using `::before`. It's built entirely from `conic-gradient` for the gold foil effect, `radial-gradient` for a specular highlight, and a slight `rotate(6deg)` tilt. No images, no SVG — pure CSS.

### 9. Utility Classes

A `.has-border-top` helper for section separators, plus `.post-content` styling for blog prose: proper heading spacing, inline `code` with a paper-tinted background, and `pre` blocks using the `--np-surface-2` token.

### 10. Footer

A gradient from `--np-surface` to a sand-tinted paper, with a top border. Clean, quiet, grounded — like the credits page at the back of the magazine.

## The CSS Techniques 🔧

A few things made this possible without JavaScript or image assets:

**`color-mix(in oklab, ...)`** — Modern CSS color mixing in the perceptually uniform OKLAB color space. This is how I derive surfaces, borders, and hover states from the base palette without hardcoding fifty shades of beige.

**Layered `background` gradients** — Most elements use three or four gradients stacked via CSS's multi-background syntax. The browser composites them in painter's order, bottom to top.

**`mix-blend-mode: multiply`** — The halftone overlay and print-registration ghost use multiply blending to darken without obscuring. It's the same math that printing presses use when ink layers overlap.

**`repeating-linear-gradient` / `repeating-radial-gradient`** — The paper fiber, stripe dashes, halftone dots, and diagonal hatching are all built from repeating gradient functions. Zero images.

**CSS `calc()` with custom properties** — The tuning knobs (`--np-paper-contrast`, `--np-ink-bleed`, `--np-pop`) feed into `calc()` inside gradient opacities and filter values. Change one number and the whole theme responds.

**`prefers-reduced-motion`** — The card hover lift and link underline expansion respect the user's motion preferences. When reduced motion is on, `--np-pop` stays at 1 (no boosted saturation) and transforms are disabled.

## Why Not Just Use an Image? 🖼️

I could have scanned the magazine cover, sliced it up, and used `background-image` everywhere. But that would:

- Add hundreds of KB of image weight
- Break at different viewport sizes
- Be impossible to theme or adjust
- Miss the point entirely

The point is that **the visual language is reproducible from first principles**. The magazine's design system was built from solid colors, geometric patterns, and typographic hierarchy. CSS can express all of that natively. The theme is ~400 lines of SCSS that compiles to a single CSS file. No asset pipeline, no image optimization, no CDN dependency.

## Applying It 🎯

The theme is designed to be **opt-in at the class level**:

- Add `np-hero` to any `.hero` section for the poster treatment
- Add `np-stripes` to any element for the gold-red sidebar stripe
- Add `np-seal` to any `.box` for the floating gold badge (use sparingly — it's spicy)
- Everything else — paper backdrop, link styling, card effects, navbar — applies globally via element selectors and Bulma class overrides

The semantic Bulma colors (`$primary`, `$link`, `$info`, `$success`, `$warning`) are remapped to NP50 palette values, so every existing Bulma component picks up the theme without any class changes.

## GLSL Shader Backgrounds 🕹️

The NP50 theme doesn't stop at CSS. Every hero section on the site has a **live WebGL2 shader** running behind the title text — a full-screen fragment shader rendered at intentionally low resolution (0.35× device pixel ratio) with `image-rendering: pixelated`, giving every page a look straight out of an NES running through an RF adapter into a 13" CRT.

### The Retro CRT Toolkit

All six shaders share a common GLSL library (`RETRO_LIB`) that provides:

- **`hash()`** — cheap pseudo-random noise for tile variation and static
- **`scanline()`** — horizontal CRT scanline darkening
- **`snow()`** — analog RF static / snow
- **`quantize()`** — NES-style color banding (~4-bit per channel)
- **`rfJitter()`** — horizontal line wobble from a bad RF cable, with occasional glitch bands

### Six Shaders, Six Feelings

Each page gets its own shader, keyed to the NP50 palette:

| Page             | Shader               | Vibe                                                                                                                                                                                                                                                                                      |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home** 🏠      | Dungeon Entrance     | Dark brick room, torch flames casting long shadows. A door threshold glows softly — adventure begins here. A green rupee glints in the corner. You know the way.                                                                                                                          |
| **About** 🌊     | Koholint Ocean       | Four-shade NES blue water in chunky wave bands. The Wind Fish's dream, pixel-perfect. Calm, nostalgic, endless.                                                                                                                                                                           |
| **Portfolio** 🌲 | Lost Woods Overworld | Top-down tile map scrolling the Lost Woods solution (N→W→S→W, camera-inverted). Get it wrong, you loop forever. Get it right, you find the Master Sword.                                                                                                                                  |
| **Now** ⏳       | Time Gate            | Two mirrored planes converge to infinity — the universe's drain. Sine-bent rails feel like trajectory steering, not walls wiggling. Blue-purple pulse: voltage with intent. A circular void underneath, quietly hungry. Forward motion without footsteps. You're inside a synth arpeggio. |
| **Toolbox** 🛠️   | Diagnostic Screen    | Hardware test grid, 80% muted blocks, one color change every ~7 seconds. No seizure risk, just the calm hum of a POST screen checking registers.                                                                                                                                          |
| **Blog** 📜      | Scroll Text          | NES RPG text box scrolling amber characters. Red and blue highlights mark key words — the kind your party leader would slow-speak for emphasis. "The PRINCESS is in another CASTLE."                                                                                                      |

### Accessibility

- **`prefers-reduced-motion`** — When enabled, shader initialization is skipped entirely and the CSS gradient fallback remains visible
- **IntersectionObserver** — Shaders pause rendering when scrolled off-screen (battery-friendly)
- **Flashing light safety** — The Toolbox shader deliberately mutes 80% of blocks and cycles colors at roughly one change every 7 seconds

### Credit Where It's Due

The approach of embedding GLSL fragment shaders directly into a static site with zero dependencies was inspired by [JovianMoon's excellent writeup on using GLSL shaders on websites](https://jovianmoon.io/posts/using-glsl-shaders-on-websites-with-no-dependencies). The vanilla JS WebGL2 engine in `shader-hero.js` follows that same philosophy: no Three.js, no build step, no npm packages — just a full-screen quad and a fragment shader.

## The Wind Fish Sleeps 🐋

There's something satisfying about encoding a childhood memory into a system of variables and gradients. The NP50 theme isn't a pixel-perfect reproduction of that magazine — it's a **feeling** rendered in CSS. Warm paper, bold ink, gold foil, halftone dots, and the quiet confidence of a publication that knew exactly what it was.

If you open your browser's DevTools and inspect this page, you'll find no magic. Just colors, gradients, and blend modes — the same tools the magazine's print shop used, translated into a language browsers speak.

Now if you'll excuse me, I need to go find the Magnifying Lens in the Dream Shrine.
