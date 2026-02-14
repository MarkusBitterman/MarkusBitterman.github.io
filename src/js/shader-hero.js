// ================================================================
// SHADER-HERO.JS — WebGL2 GLSL shader backgrounds for hero sections
// ================================================================
// Zero dependencies. Each page gets a unique fragment shader keyed
// by a data attribute on the canvas element. Inspired by:
// https://jovianmoon.io/posts/using-glsl-shaders-on-websites-with-no-dependencies
//
// AESTHETIC: Early 90s NES — scanlines, static snow, RF injection
// switch visual quality, quantized color palettes, low-res chunky
// pixels. Think the signal coming through a worn RF adapter into
// a 13" Zenith CRT.
//
// NP50 palette colors are baked into each shader as vec3 constants.
// ================================================================

(function () {
  "use strict";

  // ──────────────────────────────────────────────────────────────
  // VERTEX SHADER (shared by all — full-screen quad)
  // ──────────────────────────────────────────────────────────────

  const VERT = `#version 300 es
  in vec4 aPosition;
  void main() {
    gl_Position = aPosition;
  }`;

  // ──────────────────────────────────────────────────────────────
  // SHARED GLSL FUNCTIONS — retro CRT toolkit
  // ──────────────────────────────────────────────────────────────
  // Prepended to every fragment shader. Provides:
  //   hash()       — cheap pseudo-random noise
  //   scanline()   — horizontal CRT scanline darkening
  //   snow()       — RF static / analog snow
  //   quantize()   — NES-style color banding (4-bit per channel)
  //   rfJitter()   — horizontal line offset (bad RF cable wobble)
  // ──────────────────────────────────────────────────────────────

  const RETRO_LIB = `
  // --- RETRO CRT TOOLKIT ---

  // fast hash noise (0..1)
  float hash(vec2 p) {
    p = fract(p * vec2(443.897, 441.423));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }

  // CRT scanlines: darkens every other pixel row
  float scanline(vec2 uv, float resolution, float intensity) {
    float line = sin(uv.y * resolution * 3.14159) * 0.5 + 0.5;
    return 1.0 - (1.0 - line) * intensity;
  }

  // analog snow / static
  float snow(vec2 uv, float t) {
    return hash(uv * 800.0 + t * 137.0) * hash(uv * 400.0 - t * 91.0);
  }

  // NES-style color quantization (reduces to ~4 bit per channel)
  vec3 quantize(vec3 col, float levels) {
    return floor(col * levels + 0.5) / levels;
  }

  // horizontal jitter — bad RF cable / composite wobble
  float rfJitter(float y, float t) {
    float wobble = sin(y * 90.0 + t * 3.0) * 0.001;
    wobble += sin(y * 250.0 - t * 7.0) * 0.0004;
    // occasional glitch band
    float glitch = step(0.992, hash(vec2(floor(y * 20.0), floor(t * 4.0))));
    wobble += glitch * 0.008 * sin(t * 50.0);
    return wobble;
  }
  `;

  // ──────────────────────────────────────────────────────────────
  // FRAGMENT SHADERS — one per page, full NP50 palette spread
  // ──────────────────────────────────────────────────────────────

  const SHADERS = {};

  // ── HOME: "Dungeon Entrance" ─────────────────────────────────
  // Shadow-bark and hero-blue — like the first frame when Link
  // walks into a dungeon room. Dark brick walls, stone floor
  // tiles, subtle torch flicker in the corners. That moment of
  // "what's in here?" before the doors slam shut.
  SHADERS.home =
    `#version 300 es
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  out vec4 fragColor;
  ` +
    RETRO_LIB +
    `
  const vec3 SHADOW_BARK    = vec3(0.227, 0.165, 0.118);
  const vec3 HERO_BLUE      = vec3(0.122, 0.235, 0.533);
  const vec3 OWL_UMBER      = vec3(0.541, 0.310, 0.165);
  const vec3 POWER_GOLD     = vec3(1.000, 0.761, 0.055);
  const vec3 FEATHER_RUST   = vec3(0.769, 0.416, 0.176);
  const vec3 INK_BLACK      = vec3(0.110, 0.110, 0.110);
  const vec3 KOHOLINT_GRASS = vec3(0.373, 0.686, 0.227);

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.x += rfJitter(uv.y, iTime);

    float aspect = iResolution.x / iResolution.y;

    // dungeon floor — 12x8 tile grid, stone pattern
    float gridX = 12.0 * aspect;
    float gridY = 8.0;
    vec2 tile = floor(vec2(uv.x * gridX, uv.y * gridY));
    vec2 tileUV = fract(vec2(uv.x * gridX, uv.y * gridY));

    // base stone floor — dark blue-brown dungeon color
    float tileSeed = hash(tile);
    vec3 col = mix(SHADOW_BARK, HERO_BLUE * 0.4, 0.3);

    // vary each tile slightly for a hand-placed stone look
    col *= 0.7 + 0.3 * tileSeed;

    // top and bottom wall rows — darker brick
    float isWall = step(gridY - 1.5, tile.y) + step(tile.y, 0.5);
    vec3 wallCol = mix(INK_BLACK, SHADOW_BARK * 0.6, tileSeed * 0.5);
    col = mix(col, wallCol, min(1.0, isWall));

    // brick pattern on walls (offset every other row)
    float brickOff = mod(tile.y, 2.0) * 0.5;
    float brickEdgeX = step(fract(tileUV.x + brickOff), 0.06);
    float brickEdgeY = step(tileUV.y, 0.08);
    float brickEdge = min(1.0, brickEdgeX + brickEdgeY);
    col = mix(col, INK_BLACK, brickEdge * isWall * 0.5);

    // floor tile edges (mortar lines)
    float mortarX = step(tileUV.x, 0.05) + step(0.95, tileUV.x);
    float mortarY = step(tileUV.y, 0.05) + step(0.95, tileUV.y);
    float mortar = min(1.0, mortarX + mortarY);
    col = mix(col, INK_BLACK * 1.2, mortar * 0.3 * (1.0 - isWall));

    // two torch positions (upper corners of the room)
    vec2 torchL = vec2(0.15, 0.75);
    vec2 torchR = vec2(0.85, 0.75);

    // flickering glow — each torch has independent flicker
    float flickerL = 0.7 + 0.3 * sin(iTime * 2.1 + 0.0)
                   * sin(iTime * 3.7 + 1.0);
    float flickerR = 0.7 + 0.3 * sin(iTime * 2.5 + 3.0)
                   * sin(iTime * 3.3 + 2.0);

    // warm light radius from each torch
    float dL = length(uv - torchL);
    float dR = length(uv - torchR);
    float glowL = smoothstep(0.55, 0.0, dL) * flickerL;
    float glowR = smoothstep(0.55, 0.0, dR) * flickerR;

    // torch light color — gold to rust gradient
    vec3 torchLight = mix(POWER_GOLD * 0.6, FEATHER_RUST * 0.5, 0.4);
    col += torchLight * glowL;
    col += torchLight * glowR;

    // center door — a darker rectangle hinting at the next room
    float doorX = step(0.40, uv.x) * step(uv.x, 0.60);
    float doorY = step(0.55, uv.y) * step(uv.y, 0.88);
    col = mix(col, INK_BLACK * 0.7, doorX * doorY * 0.6);

    // door frame highlight — faint gold edge
    float frameX = step(0.39, uv.x) * step(uv.x, 0.61);
    float frameY = step(0.54, uv.y) * step(uv.y, 0.89);
    float frame = (frameX * frameY) - (doorX * doorY);
    col = mix(col, OWL_UMBER * 0.6, max(0.0, frame) * 0.5);

    // tiny green glint — like a rupee or key catch
    float glintPhase = floor(iTime * 0.4);
    vec2 glintPos = vec2(
      0.3 + hash(vec2(glintPhase, 1.0)) * 0.4,
      0.2 + hash(vec2(glintPhase, 2.0)) * 0.3
    );
    float glintD = length(uv - glintPos);
    float glint = smoothstep(0.02, 0.0, glintD)
                * step(0.5, fract(iTime * 0.8));
    col += KOHOLINT_GRASS * 0.5 * glint;

    // CRT vignette — heavier for dungeon darkness
    float vig = 1.0 - 0.5 * pow(length(uv - 0.5) * 1.4, 2.0);
    col *= vig;

    // static snow
    float s = snow(uv, iTime);
    col = mix(col, vec3(s), 0.08);

    // scanlines
    col *= scanline(uv, iResolution.y * 0.5, 0.28);

    // quantize to NES levels
    col = quantize(col, 10.0);

    fragColor = vec4(col, 1.0);
  }`;

  // ── ABOUT: "Koholint Ocean" ───────────────────────────────────
  // Hero-blue and sky-hint — NES water scrolling effect, like
  // the side-scrolling water levels. Chunky horizontal wave bands
  // with that distinctive blue palette.
  SHADERS.about =
    `#version 300 es
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  out vec4 fragColor;
  ` +
    RETRO_LIB +
    `
  const vec3 HERO_BLUE    = vec3(0.122, 0.235, 0.533);
  const vec3 SKY_HINT     = vec3(0.435, 0.639, 0.851);
  const vec3 INK_BLACK    = vec3(0.110, 0.110, 0.110);
  const vec3 AGED_PAPER   = vec3(0.937, 0.890, 0.773);

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.x += rfJitter(uv.y, iTime);

    // NES water: 4 shades of blue in wavy horizontal bands
    // each band scrolls at a slightly different speed
    float y = uv.y;

    // chunky wave distortion (quantized to pixel rows)
    float pixelY = floor(uv.y * 60.0) / 60.0;
    float waveOff = sin(pixelY * 8.0 + iTime * 1.2) * 0.03
                  + sin(pixelY * 16.0 - iTime * 0.8) * 0.015;
    float x = uv.x + waveOff;

    // 4-color palette cycling like NES water animation
    float phase = y * 6.0 + iTime * 0.5;
    float band = mod(floor(phase), 4.0);

    vec3 col;
    if (band == 0.0) col = INK_BLACK * 1.5;
    else if (band == 1.0) col = HERO_BLUE;
    else if (band == 2.0) col = SKY_HINT * 0.7;
    else col = SKY_HINT;

    // subtle horizontal streaks (like NES tile edges)
    float tileEdge = step(0.95, fract(phase));
    col = mix(col, INK_BLACK, tileEdge * 0.3);

    // CRT vignette
    float vig = 1.0 - 0.35 * pow(length(uv - 0.5) * 1.4, 2.0);
    col *= vig;

    // static snow
    float s = snow(uv, iTime);
    col = mix(col, vec3(s), 0.07);

    // scanlines
    col *= scanline(uv, iResolution.y * 0.5, 0.20);

    col = quantize(col, 10.0);

    fragColor = vec4(col, 1.0);
  }`;

  // ── PORTFOLIO: "Overworld — Lost Woods" ────────────────────────
  // Koholint-grass and owl-umber — top-down scrolling overworld
  // map. The scroll direction follows the Lost Woods solution from
  // the original Legend of Zelda (N, W, S, W), inverted so the
  // camera moves opposite to Link — the tiles scroll DOWN, RIGHT,
  // UP, RIGHT. Each leg takes ~4 seconds.
  SHADERS.portfolio =
    `#version 300 es
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  out vec4 fragColor;
  ` +
    RETRO_LIB +
    `
  const vec3 KOHOLINT_GRASS = vec3(0.373, 0.686, 0.227);
  const vec3 POWER_GOLD     = vec3(1.000, 0.761, 0.055);
  const vec3 OWL_UMBER      = vec3(0.541, 0.310, 0.165);
  const vec3 SHADOW_BARK    = vec3(0.227, 0.165, 0.118);
  const vec3 AGED_PAPER     = vec3(0.937, 0.890, 0.773);

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.x += rfJitter(uv.y, iTime);

    // tile grid — 16x12 tiles like NES resolution
    float gridSize = 16.0;
    float aspect = iResolution.x / iResolution.y;
    vec2 tile = floor(vec2(uv.x * gridSize * aspect, uv.y * gridSize));

    // ── Lost Woods scroll pattern (N,W,S,W) ──
    // Link goes: North, West, South, West
    // Camera (inverted): tiles scroll Down, Right, Up, Right
    // Directions as vec2 offsets:
    //   Down  = ( 0, -1)   Right = (+1, 0)
    //   Up    = ( 0, +1)   Right = (+1, 0)
    float legDuration = 4.0;              // seconds per direction
    float cycleDuration = legDuration * 4.0;  // full loop = 16s
    float cycleTime = mod(iTime, cycleDuration);
    float leg = cycleTime / legDuration;  // 0-4 continuous

    // accumulate tile offset through each completed leg
    vec2 offset = vec2(0.0);
    float speed = 0.5;  // tiles per second

    // leg 0: Down (0, -1)
    float t0 = clamp(cycleTime, 0.0, legDuration);
    offset += vec2(0.0, -1.0) * t0 * speed;

    // leg 1: Right (+1, 0)
    float t1 = clamp(cycleTime - legDuration, 0.0, legDuration);
    offset += vec2(1.0, 0.0) * t1 * speed;

    // leg 2: Up (0, +1)
    float t2 = clamp(cycleTime - legDuration * 2.0, 0.0, legDuration);
    offset += vec2(0.0, 1.0) * t2 * speed;

    // leg 3: Right (+1, 0)
    float t3 = clamp(cycleTime - legDuration * 3.0, 0.0, legDuration);
    offset += vec2(1.0, 0.0) * t3 * speed;

    tile += floor(offset);

    // pseudo-random tile type from hash
    float tileType = hash(tile);

    vec3 col;
    if (tileType < 0.45) {
      // grass tile — two shades
      col = mix(KOHOLINT_GRASS * 0.7, KOHOLINT_GRASS, step(0.25, tileType));
    } else if (tileType < 0.65) {
      // path / dirt tile
      col = mix(OWL_UMBER, POWER_GOLD * 0.5, step(0.55, tileType));
    } else if (tileType < 0.80) {
      // dark grass / bush
      col = KOHOLINT_GRASS * 0.45;
    } else if (tileType < 0.92) {
      // earth / rock
      col = SHADOW_BARK;
    } else {
      // flower / highlight
      col = mix(POWER_GOLD * 0.8, AGED_PAPER * 0.6, hash(tile + 99.0));
    }

    // tile edge darkening (grid lines)
    vec2 tileUV = fract(vec2(uv.x * gridSize * aspect, uv.y * gridSize));
    float edge = step(tileUV.x, 0.06) + step(tileUV.y, 0.06);
    col *= 1.0 - edge * 0.2;

    // CRT vignette
    float vig = 1.0 - 0.35 * pow(length(uv - 0.5) * 1.4, 2.0);
    col *= vig;

    float s = snow(uv, iTime);
    col = mix(col, vec3(s), 0.08);

    col *= scanline(uv, iResolution.y * 0.5, 0.22);

    col = quantize(col, 10.0);

    fragColor = vec4(col, 1.0);
  }`;

  // ── NOW: "Time Gate" ───────────────────────────────────────────
  // Two mirrored planes (ceiling + floor) conveyor-belted past you
  // toward a vanishing point that's less "horizon" and more "the
  // universe's drain." Parallel rails sine-bend like spacetime
  // flexing. Blue-purple pulse is charged wonder — voltage with
  // intent. Beneath it all: a circular void, quietly hungry.
  // Inspired by the Chrono Trigger time-warp tunnel.
  SHADERS.now =
    `#version 300 es
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  out vec4 fragColor;
  ` +
    RETRO_LIB +
    `
  const vec3 GATE_BLUE   = vec3(0.15, 0.25, 1.00);
  const vec3 GATE_PURPLE = vec3(0.60, 0.10, 0.90);
  const vec3 INK_BLACK   = vec3(0.110, 0.110, 0.110);
  const vec3 AGED_PAPER  = vec3(0.937, 0.890, 0.773);

  void main() {
    vec2 rawUV = gl_FragCoord.xy / iResolution.xy;
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

    // ── LAYER 0: the void ──
    // circular static noise beneath everything — the gate's mouth
    float r = length(uv * vec2(1.2, 1.0));
    float voidRing = smoothstep(0.35, 0.10, r);
    float voidHole = smoothstep(0.18, 0.03, abs(r - 0.10));
    float voidNoise = hash(uv * 120.0 + iTime * 0.5);
    float voidStatic = (voidNoise - 0.5) * 0.35;
    float voidMask = clamp(voidRing * (0.6 + voidStatic) + voidHole * 0.4, 0.0, 1.0);

    // dark base with faint purple-blue wash from the void
    vec3 col = vec3(0.02, 0.01, 0.04);
    col += mix(GATE_BLUE, GATE_PURPLE, 0.5) * 0.08 * voidMask;

    // ── LAYER 1: two-plane fold ──
    // mirror y so top and bottom share one set of math
    vec2 p = uv;
    p.y = abs(p.y);

    // perspective depth — infinity at y=0, near at screen edges
    float depth = 1.0 / (0.12 + p.y);

    // perspective-correct x coordinate
    float x = p.x * depth;

    // forward motion — the world conveyor-belts past you
    float t = iTime * 0.8;

    // ── parallel rails with sine-bend ──
    // the bend depends on depth, so the wave travels along the tunnel
    float bend = 0.25 * sin(3.0 * p.y * depth - t * 3.0);
    float bentX = x + bend;

    // repeating line pattern — sharp bright rails
    float stripes = abs(fract(bentX * 5.0) - 0.5);
    float rails = smoothstep(0.12, 0.02, stripes);

    // ── energy pulse (blue-purple breathing) ──
    float pulse = 0.6 + 0.4 * sin(t * 4.0 - p.y * 18.0);
    float glow = rails * 1.5 * pulse;

    // color shifts between blue and purple with depth and time
    float colorMix = 0.5 + 0.5 * sin(t * 1.5 + p.y * 6.0);
    vec3 railCol = mix(GATE_BLUE, GATE_PURPLE, colorMix) * glow;

    // depth fade — rails dim toward the vanishing point & screen edge
    float depthFade = smoothstep(0.0, 0.15, p.y) * smoothstep(0.5, 0.2, p.y);
    railCol *= depthFade;

    // composite rails over void base
    col += railCol;

    // ── center convergence glow ──
    // the vanishing point pulls everything inward
    float centerPinch = smoothstep(0.9, 0.0, abs(uv.x));
    col += vec3(0.03, 0.01, 0.05) * centerPinch;

    // ── void undertow ──
    // the static void modulates everything — beneath, through
    col *= 0.55 + 0.45 * voidMask;

    // RF jitter — the signal isn't clean
    float jit = rfJitter(rawUV.y, iTime);
    col = mix(col, col * 0.85, abs(jit) * 40.0);

    // CRT vignette
    float vig = 1.0 - 0.35 * pow(length(rawUV - 0.5) * 1.4, 2.0);
    col *= vig;

    // static snow — light
    float s = snow(rawUV, iTime);
    col = mix(col, vec3(s), 0.06);

    // scanlines
    col *= scanline(rawUV, iResolution.y * 0.5, 0.25);

    // quantize to NES palette
    col = quantize(col, 12.0);

    fragColor = vec4(col, 1.0);
  }`;

  // ── TOOLBOX: "Diagnostic Screen" ──────────────────────────────
  // Sky-hint and hero-blue — NES-era hardware test screen. Grid
  // of blinking blocks, register-style readout aesthetic.
  SHADERS.toolbox =
    `#version 300 es
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  out vec4 fragColor;
  ` +
    RETRO_LIB +
    `
  const vec3 SKY_HINT       = vec3(0.435, 0.639, 0.851);
  const vec3 HERO_BLUE      = vec3(0.122, 0.235, 0.533);
  const vec3 POWER_GOLD     = vec3(1.000, 0.761, 0.055);
  const vec3 POWER_RED      = vec3(0.902, 0.000, 0.071);
  const vec3 KOHOLINT_GRASS = vec3(0.373, 0.686, 0.227);
  const vec3 INK_BLACK      = vec3(0.110, 0.110, 0.110);

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.x += rfJitter(uv.y, iTime);

    float aspect = iResolution.x / iResolution.y;

    // 8x6 block grid
    vec2 blockCoord = floor(vec2(uv.x * 8.0 * aspect, uv.y * 6.0));
    vec2 blockUV = fract(vec2(uv.x * 8.0 * aspect, uv.y * 6.0));

    // cycle colors through blocks — VERY slow to avoid flashing
    float idx = hash(blockCoord) * 5.0;
    float phase = floor(iTime * 0.15 + idx);
    float selector = mod(phase, 5.0);

    vec3 col;
    if (selector < 1.0) col = SKY_HINT;
    else if (selector < 2.0) col = HERO_BLUE;
    else if (selector < 3.0) col = POWER_GOLD;
    else if (selector < 4.0) col = POWER_RED * 0.8;
    else col = KOHOLINT_GRASS;

    // mute 80% of blocks — keep colorful but subdued
    float isBright = step(0.80, hash(blockCoord + 7.0));
    col = mix(col * 0.22, col, isBright);

    // block border
    float borderX = step(blockUV.x, 0.08) + step(0.92, blockUV.x);
    float borderY = step(blockUV.y, 0.08) + step(0.92, blockUV.y);
    float border = min(1.0, borderX + borderY);
    col = mix(col, INK_BLACK, border * 0.7);

    // rare subtle pulse on some blocks (no blink/flash)
    float pulse = 0.9 + 0.1 * sin(iTime * 0.3 + idx * 6.0);
    col *= pulse;

    // CRT vignette
    float vig = 1.0 - 0.35 * pow(length(uv - 0.5) * 1.4, 2.0);
    col *= vig;

    float s = snow(uv, iTime);
    col = mix(col, vec3(s), 0.09);

    col *= scanline(uv, iResolution.y * 0.5, 0.25);

    col = quantize(col, 10.0);

    fragColor = vec4(col, 1.0);
  }`;

  // ── BLOG: "Scroll Text" ───────────────────────────────────────
  // Feather-rust and owl-umber — like the slow scrolling text
  // screens in NES RPGs. Warm amber-on-dark, text-prompt feel,
  // with the cursor blinking at the bottom. Occasional groups
  // of "characters" highlight in red or blue as they scroll by.
  SHADERS.blog =
    `#version 300 es
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  out vec4 fragColor;
  ` +
    RETRO_LIB +
    `
  const vec3 FEATHER_RUST   = vec3(0.769, 0.416, 0.176);
  const vec3 OWL_UMBER      = vec3(0.541, 0.310, 0.165);
  const vec3 SHADOW_BARK    = vec3(0.227, 0.165, 0.118);
  const vec3 POWER_GOLD     = vec3(1.000, 0.761, 0.055);
  const vec3 POWER_RED      = vec3(0.902, 0.000, 0.071);
  const vec3 HERO_BLUE      = vec3(0.122, 0.235, 0.533);
  const vec3 INK_BLACK      = vec3(0.110, 0.110, 0.110);
  const vec3 AGED_PAPER     = vec3(0.937, 0.890, 0.773);

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.x += rfJitter(uv.y, iTime);

    // dark background like an NES text box
    vec3 col = mix(SHADOW_BARK, INK_BLACK, 0.6);

    // horizontal "text lines" — rows of blocky dashes
    float aspect = iResolution.x / iResolution.y;
    float rows = 10.0;
    float cols = 32.0;
    vec2 cell = floor(vec2(uv.x * cols * aspect, uv.y * rows));
    vec2 cellUV = fract(vec2(uv.x * cols * aspect, uv.y * rows));

    // "text" appears row by row, scrolling up slowly
    float rowIdx = cell.y + floor(iTime * 0.5);
    float charSeed = hash(vec2(cell.x, rowIdx));

    // only some cells have "characters" (simulated text density)
    float hasChar = step(0.25, charSeed) * step(charSeed, 0.88);

    // character block (inner rectangle of the cell)
    float charBlock = step(0.15, cellUV.x) * step(cellUV.x, 0.85)
                    * step(0.20, cellUV.y) * step(cellUV.y, 0.80);

    // text color — warm amber tones (default)
    vec3 textColor = mix(FEATHER_RUST, POWER_GOLD, charSeed);
    if (charSeed > 0.75) textColor = mix(textColor, OWL_UMBER, 0.4);

    // ── occasional red or blue highlight groups ──
    // group cells into 4x2 clusters; occasionally tint one
    vec2 group = floor(vec2(cell.x / 4.0, rowIdx / 2.0));
    float groupSeed = hash(group + 31.0);
    float highlightPhase = floor(iTime * 0.25);  // change which groups glow
    float groupActive = hash(group + highlightPhase * 17.0);

    // ~8% of groups get a highlight at any time
    if (groupActive > 0.92) {
      // alternate red and blue based on group seed
      if (groupSeed > 0.5) {
        textColor = mix(textColor, POWER_RED * 1.2, 0.7);
      } else {
        textColor = mix(textColor, HERO_BLUE * 1.8, 0.7);
      }
    }

    col = mix(col, textColor, hasChar * charBlock * 0.8);

    // blinking cursor at bottom-right area
    float cursorX = step(0.85, uv.x) * step(uv.x, 0.90);
    float cursorY = step(0.08, uv.y) * step(uv.y, 0.16);
    float cursorBlink = step(0.5, fract(iTime * 0.6));
    col = mix(col, AGED_PAPER * 0.9, cursorX * cursorY * cursorBlink);

    // text box border (NES-style double border)
    float borderOuter = step(uv.x, 0.02) + step(0.98, uv.x)
                      + step(uv.y, 0.02) + step(0.98, uv.y);
    float borderInner = step(uv.x, 0.04) * step(0.02, uv.x)
                      + step(0.96, uv.x) * step(uv.x, 0.98)
                      + step(uv.y, 0.04) * step(0.02, uv.y)
                      + step(0.96, uv.y) * step(uv.y, 0.98);
    col = mix(col, AGED_PAPER * 0.7, min(1.0, borderOuter));
    col = mix(col, OWL_UMBER, min(1.0, borderInner) * 0.5);

    // CRT vignette
    float vig = 1.0 - 0.4 * pow(length(uv - 0.5) * 1.4, 2.0);
    col *= vig;

    float s = snow(uv, iTime);
    col = mix(col, vec3(s), 0.10);

    col *= scanline(uv, iResolution.y * 0.5, 0.28);

    col = quantize(col, 10.0);

    fragColor = vec4(col, 1.0);
  }`;

  // ── POST (individual blog posts): alias to blog shader
  SHADERS.post = SHADERS.blog;

  // ── THANK YOU: "Castle Fireworks" ────────────────────────────
  // SMB end-of-level celebration — Mario reaches the castle and
  // fireworks explode over the ramparts. Circular bursts with
  // radiating particles in classic red/white/blue palette.
  // Blocky castle silhouette at bottom, stars twinkling in night
  // sky. That victory fanfare moment before the level clears.
  SHADERS["thank-you"] =
    `#version 300 es
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  out vec4 fragColor;
  ` +
    RETRO_LIB +
    `
  const vec3 NIGHT_SKY      = vec3(0.051, 0.047, 0.180);
  const vec3 CASTLE_SHADOW  = vec3(0.090, 0.082, 0.137);
  const vec3 POWER_GOLD     = vec3(1.000, 0.761, 0.055);
  const vec3 STAR_WHITE     = vec3(0.980, 0.980, 0.980);

  // Rainbow colors for fireworks (Iowa state motto: liberties we prize, rights we will maintain)
  const vec3 FW_RED         = vec3(0.902, 0.000, 0.071);
  const vec3 FW_ORANGE      = vec3(1.000, 0.600, 0.000);
  const vec3 FW_YELLOW      = vec3(1.000, 0.900, 0.000);
  const vec3 FW_GREEN       = vec3(0.000, 0.800, 0.200);
  const vec3 FW_BLUE        = vec3(0.122, 0.400, 0.900);
  const vec3 FW_INDIGO      = vec3(0.294, 0.000, 0.510);
  const vec3 FW_VIOLET      = vec3(0.580, 0.000, 0.827);
  const vec3 FW_WHITE       = vec3(0.980, 0.980, 0.980);

  // Burst shape positions: dots arranged in mushroom/star/tulip outlines
  // Returns position for particle i out of count, scaled by radius

  // 🍄 Mushroom outline: cap arc + stem sides
  vec2 mushroomPoint(float i, float count) {
    float t = i / count;
    if (t < 0.6) {
      // cap arc (top half-circle)
      float a = 3.14159 * (t / 0.6);
      return vec2(cos(a) * 1.0, sin(a) * 0.8 + 0.2);
    } else if (t < 0.8) {
      // right stem
      float s = (t - 0.6) / 0.2;
      return vec2(0.4, 0.2 - s * 1.0);
    } else {
      // left stem
      float s = (t - 0.8) / 0.2;
      return vec2(-0.4, -0.8 + s * 1.0);
    }
  }

  // ⭐ Star outline: 5-pointed star vertices connected
  vec2 starPoint(float i, float count) {
    float t = i / count;
    float totalAngle = t * 6.283;
    // alternating inner/outer radius for star shape
    float pointIndex = t * 10.0;
    float r = (fract(pointIndex * 0.5) < 0.25) ? 1.0 : 0.45;
    float a = totalAngle - 1.5708; // start from top
    return vec2(cos(a) * r, sin(a) * r);
  }

  // 🌷 Tulip outline: three petals + stem
  vec2 tulipPoint(float i, float count) {
    float t = i / count;
    if (t < 0.25) {
      // left petal arc
      float a = 3.14159 * (t / 0.25);
      return vec2(cos(a) * 0.5 - 0.55, sin(a) * 0.6 + 0.3);
    } else if (t < 0.5) {
      // center petal arc
      float a = 3.14159 * ((t - 0.25) / 0.25);
      return vec2(cos(a) * 0.5, sin(a) * 0.7 + 0.5);
    } else if (t < 0.75) {
      // right petal arc
      float a = 3.14159 * ((t - 0.5) / 0.25);
      return vec2(cos(a) * 0.5 + 0.55, sin(a) * 0.6 + 0.3);
    } else {
      // stem
      float s = (t - 0.75) / 0.25;
      return vec2(0.0, 0.3 - s * 1.3);
    }
  }

  // pick shape point based on seed
  vec2 shapePoint(float i, float count, float shapeId) {
    if (shapeId < 0.33) return mushroomPoint(i, count);
    if (shapeId < 0.66) return starPoint(i, count);
    return tulipPoint(i, count);
  }

  // Enhanced firework with launch, burst, and falling particles
  float firework(vec2 p, float t, float seed) {
    float cycle = fract(t * 0.15 + seed); // slower cycle
    float shapeId = fract(seed * 7.13); // pick shape per firework
    float result = 0.0;

    // Phase 1: Launch (0.0 - 0.25) - spiraling rocket trail
    if (cycle < 0.25) {
      float launchPhase = cycle / 0.25;
      float launchHeight = launchPhase;

      // spiral trail as it launches
      float spiralAngle = launchPhase * 12.0;
      vec2 spiralOffset = vec2(cos(spiralAngle), sin(spiralAngle)) * 0.03 * (1.0 - launchPhase);
      vec2 launchPos = vec2(spiralOffset.x, -0.8 + launchHeight * 1.2);

      float launchDist = length(p - launchPos);
      float trail = exp(-launchDist * 80.0) * (0.5 + 0.5 * hash(vec2(launchPhase * 10.0)));

      // add trail segments
      for (float i = 0.0; i < 5.0; i++) {
        float trailT = launchPhase - i * 0.05;
        if (trailT > 0.0) {
          float trailSpiral = trailT * 12.0;
          vec2 trailSpiralOffset = vec2(cos(trailSpiral), sin(trailSpiral)) * 0.03 * (1.0 - trailT);
          vec2 trailPos = vec2(trailSpiralOffset.x, -0.8 + trailT * 1.2);
          float trailSegDist = length(p - trailPos);
          trail += exp(-trailSegDist * 60.0) * 0.3 * (1.0 - i / 5.0);
        }
      }

      result = trail;
    }
    // Phase 2: Burst (0.25 - 0.45) - dots arranged in shape
    else if (cycle < 0.45) {
      float burstPhase = (cycle - 0.25) / 0.2;
      float radius = burstPhase * 0.3;

      float dist = length(p);

      // 24 dots placed along shape outline
      float particleCount = 24.0;
      for (float i = 0.0; i < 24.0; i++) {
        vec2 shapePos = shapePoint(i, particleCount, shapeId) * radius;
        float d = length(p - shapePos);
        result += exp(-d * 100.0) * (1.0 - burstPhase * 0.7);
      }

      // central flash
      float flash = exp(-dist * 30.0) * smoothstep(0.2, 0.0, burstPhase);
      result += flash * 2.0;
    }
    // Phase 3: Fall (0.45 - 1.0) - dots fall DOWN AND AWAY from shape
    else if (cycle < 1.0) {
      float fallPhase = (cycle - 0.45) / 0.55;
      float burstRadius = 0.3;

      // 24 falling dot particles
      float particleCount = 24.0;
      for (float i = 0.0; i < 24.0; i++) {
        // start at shape position
        vec2 shapePos = shapePoint(i, particleCount, shapeId) * burstRadius;

        // direction: away from center + down
        vec2 dir = normalize(shapePos + vec2(0.0, 0.001));
        vec2 momentum = dir * fallPhase * 0.2;
        vec2 gravity = vec2(0.0, -fallPhase * fallPhase * 0.5);
        vec2 particlePos = shapePos + momentum + gravity;

        float particleDist = length(p - particlePos);
        float particle = exp(-particleDist * 80.0) * (1.0 - fallPhase * 0.8);

        // decay trail — longer arc behind each falling dot
        for (float j = 1.0; j < 8.0; j++) {
          float trailT = max(fallPhase - j * 0.03, 0.0);
          vec2 trailMomentum = dir * trailT * 0.2;
          vec2 trailGravity = vec2(0.0, -trailT * trailT * 0.5);
          vec2 trailPos = shapePos + trailMomentum + trailGravity;
          float trailDist = length(p - trailPos);
          float trailFade = (1.0 - j / 8.0) * (1.0 - j / 8.0);
          particle += exp(-trailDist * 50.0) * 0.25 * (1.0 - fallPhase * 0.6) * trailFade;
        }

        result += particle;
      }
    }

    return result * 1.2;
  }

  // Old Iowa Capitol building — neoclassical with gold dome
  // Real proportions: wide body, narrower central portico with columns,
  // pediment, drum, gold dome, cupola, flagpole.
  float capitolShape(vec2 uv, out float goldDome, out float windowMask, out float stairMask, out float columnMask) {
    float y = uv.y;
    float x = uv.x - 0.5;
    float ax = abs(x);

    goldDome = 0.0;
    windowMask = 0.0;
    stairMask = 0.0;
    columnMask = 0.0;
    float doorMask = 0.0;

    // ── FRONT STAIRS (wide at bottom, narrow at top) ──
    // 5 steps narrowing upward in the center
    float s1 = step(y, 0.02) * step(ax, 0.38);
    float s2 = step(0.02, y) * step(y, 0.04) * step(ax, 0.34);
    float s3 = step(0.04, y) * step(y, 0.06) * step(ax, 0.30);
    float s4 = step(0.06, y) * step(y, 0.08) * step(ax, 0.26);
    float s5 = step(0.08, y) * step(y, 0.10) * step(ax, 0.22);
    stairMask = max(s1, max(s2, max(s3, max(s4, s5))));

    // ── MAIN BUILDING BODY (wide, 2 stories) ──
    float body = step(0.10, y) * step(y, 0.32) * step(ax, 0.44);

    // ── WINDOWS (two rows across body, evenly spaced) ──
    float winRow = step(0.22, y) * step(y, 0.30) * step(ax, 0.42);
    float winPattern = step(0.3, fract(ax * 12.0)) * step(fract(ax * 12.0), 0.7);
    windowMask = winRow * winPattern;

    // ── CENTRAL PORTICO (narrower, with 4 tall columns) ──
    float portico = step(0.10, y) * step(y, 0.34) * step(ax, 0.18);

    // 4 columns within portico zone
    float col1 = step(0.10, y) * step(y, 0.34) * step(abs(ax - 0.04), 0.008);
    float col2 = step(0.10, y) * step(y, 0.34) * step(abs(ax - 0.10), 0.008);
    float col3 = step(0.10, y) * step(y, 0.34) * step(abs(ax - 0.16), 0.008);
    columnMask = max(col1, max(col2, col3));

    // ── FRONT DOOR (centered in portico, below columns) ──
    // Use same approach as columns: tall, narrow, centered
    float doorW = 0.025;
    float doorH1 = step(0.10, y) * step(y, 0.19) * step(ax, doorW);
    float doorH2 = step(0.19, y) * step(y, 0.22) * step(ax, doorW * 0.7); // arched top
    doorMask = max(doorH1, doorH2);

    // ── PEDIMENT (triangle above portico) ──
    // triangular: slopes from 0.34 at edges (ax=0.20) to 0.40 at center (ax=0)
    float pedimentTop = 0.34 + (0.20 - ax) * 0.3;
    float pediment = step(0.34, y) * step(y, pedimentTop) * step(ax, 0.20);

    // ── CORNICE / ROOFLINE (thin line across full body width) ──
    float cornice = step(0.32, y) * step(y, 0.34) * step(ax, 0.44);

    // ── DRUM (octagonal base for dome, narrower) ──
    float drum = step(0.40, y) * step(y, 0.44) * step(ax, 0.10);

    // ── DOME BASE (flattened top under gold cap) ──
    // Wide at base, flattens at top (0.44-0.48), then gold cap above
    float domeBase = step(0.44, y) * step(y, 0.48) * step(ax, 0.09) * step(y, 0.46 + 0.02 * (1.0 - ax / 0.09));

    // ── GOLD DOME (cap, sits on flattened dome base) ──
    float gd1 = step(0.48, y) * step(y, 0.52) * step(ax, 0.07);
    float gd2 = step(0.52, y) * step(y, 0.55) * step(ax, 0.04);
    goldDome = max(gd1, gd2);

    // ── CUPOLA (small lantern on top of dome) ──
    float cupola = step(0.55, y) * step(y, 0.58) * step(ax, 0.015);

    // ── FLAGPOLE ──
    float flagPole = step(0.58, y) * step(y, 0.64) * step(ax, 0.004);

    // ── FLAG ──
    float flag = step(0.62, y) * step(y, 0.64) * step(x, 0.02) * step(-0.004, x);

    // combine stone parts (add domeBase, cut out door)
    float stone = max(stairMask, max(body, max(portico, max(pediment, max(cornice, max(drum, max(domeBase, max(cupola, max(flagPole, flag)))))))));

    // cut out windows and door
    stone *= (1.0 - windowMask * 0.7);
    stone *= (1.0 - doorMask * 0.95);

    return stone;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;

    // jitter from RETRO_LIB
    p.x += rfJitter(uv.y, iTime);

    // night sky base (dark)
    vec3 col = NIGHT_SKY;

    // compute building masks first
    float goldDomeMask, windowMask, stairMask, columnMask;
    float capitol = capitolShape(uv, goldDomeMask, windowMask, stairMask, columnMask);

    // twinkling stars (only in sky, not behind building)
    float starField = hash(floor(uv * 40.0));
    float starTwinkle = step(0.96, starField) * (0.5 + 0.5 * sin(iTime * 3.0 + starField * 100.0));
    float buildingBlock = max(capitol, goldDomeMask);
    col = mix(col, STAR_WHITE, starTwinkle * 0.6 * (1.0 - buildingBlock));

    // 8 fireworks spread wide across the sky (rainbow)
    vec3 fireworkCol = vec3(0.0);

    // Firework 1 - red (far left high)
    vec2 fw1Pos = p - vec2(-0.9, 0.3);
    fireworkCol += FW_RED * firework(fw1Pos, iTime, 0.0);

    // Firework 2 - orange (far right high)
    vec2 fw2Pos = p - vec2(0.9, 0.4);
    fireworkCol += FW_ORANGE * firework(fw2Pos, iTime, 0.14);

    // Firework 3 - yellow (left high)
    vec2 fw3Pos = p - vec2(-0.6, 0.6);
    fireworkCol += FW_YELLOW * firework(fw3Pos, iTime, 0.28);

    // Firework 4 - green (right mid)
    vec2 fw4Pos = p - vec2(0.7, 0.2);
    fireworkCol += FW_GREEN * firework(fw4Pos, iTime, 0.42);

    // Firework 5 - blue (center high)
    vec2 fw5Pos = p - vec2(-0.2, 0.7);
    fireworkCol += FW_BLUE * firework(fw5Pos, iTime, 0.56);

    // Firework 6 - indigo (far right low)
    vec2 fw6Pos = p - vec2(0.85, 0.5);
    fireworkCol += FW_INDIGO * firework(fw6Pos, iTime, 0.70);

    // Firework 7 - violet (far left low)
    vec2 fw7Pos = p - vec2(-0.8, 0.15);
    fireworkCol += FW_VIOLET * firework(fw7Pos, iTime, 0.84);

    // Firework 8 - white (center-right high)
    vec2 fw8Pos = p - vec2(0.3, 0.55);
    fireworkCol += FW_WHITE * firework(fw8Pos, iTime, 0.07);

    // add fireworks with bloom
    col += fireworkCol;
    col += fireworkCol * 0.3; // bloom glow

    // ── GROUND PLANE: green grass over brown dirt, with magenta wash for silhouette clarity ──
    float groundY = 0.10; // base of lowest step
    float grassY = 0.06;  // top of grass, just below steps
    float dirtY = 0.0;    // bottom of dirt
    float magentaWash = smoothstep(0.6, 0.0, uv.y);
    float dirtMask = smoothstep(grassY, dirtY, uv.y);
    float grassMask = smoothstep(groundY, grassY, uv.y);
    vec3 grassCol = vec3(0.373, 0.686, 0.227); // $koholint-grass
    vec3 dirtCol = vec3(0.541, 0.310, 0.165);  // $owl-umber
    col = mix(col, dirtCol, dirtMask);
    col = mix(col, grassCol, grassMask);
    col += vec3(0.6, 0.0, 0.4) * magentaWash;

    // Draw building: stone body
    col = mix(col, CASTLE_SHADOW, capitol);

    // Stairs: slightly lighter stone
    col = mix(col, CASTLE_SHADOW * 1.4, stairMask);

    // Columns: bright highlight lines
    col = mix(col, CASTLE_SHADOW * 2.0, columnMask);

    // Front door: deep shadow (almost black)
    // Use the same mask as in capitolShape for perfect alignment
    float doorW = 0.025;
    float doorH1 = step(0.10, uv.y) * step(uv.y, 0.19) * step(abs(uv.x - 0.5), doorW);
    float doorH2 = step(0.19, uv.y) * step(uv.y, 0.22) * step(abs(uv.x - 0.5), doorW * 0.7);
    float doorMask = max(doorH1, doorH2);
    col = mix(col, vec3(0.08, 0.07, 0.13), doorMask);

    // Draw gold dome on top
    col = mix(col, POWER_GOLD * 0.85, goldDomeMask);

    // Lit windows: warm gold glow
    col = mix(col, POWER_GOLD * 0.7, windowMask * 0.6);

    // CRT vignette
    float vig = 1.0 - 0.3 * pow(length(uv - 0.5) * 1.2, 2.0);
    col *= vig;

    // subtle snow
    float s = snow(uv, iTime);
    col = mix(col, vec3(s), 0.06);

    // scanlines
    col *= scanline(uv, iResolution.y * 0.5, 0.25);

    // NES color quantization
    col = quantize(col, 12.0);

    fragColor = vec4(col, 1.0);
  }`;

  // ──────────────────────────────────────────────────────────────
  // WebGL2 ENGINE
  // ──────────────────────────────────────────────────────────────

  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function initShaderCanvas(canvas) {
    var shaderId = canvas.getAttribute("data-shader");
    var fsSource = SHADERS[shaderId];
    if (!fsSource) {
      console.warn("No shader found for id:", shaderId);
      return;
    }

    var gl = canvas.getContext("webgl2");
    if (!gl) {
      console.warn("WebGL2 not supported — shader background disabled");
      canvas.style.display = "none";
      return;
    }

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, VERT);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) {
      canvas.style.display = "none";
      return;
    }

    var program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      canvas.style.display = "none";
      return;
    }

    // Full-screen quad
    var positionBuffer = gl.createBuffer();
    var positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    var posLoc = gl.getAttribLocation(program, "aPosition");
    var resLoc = gl.getUniformLocation(program, "iResolution");
    var timeLoc = gl.getUniformLocation(program, "iTime");

    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    var startTime = performance.now();
    var rafId;

    // Pause when off-screen (battery-friendly)
    var isVisible = true;
    var observer = new IntersectionObserver(
      function (entries) {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !rafId) render();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    function render() {
      if (!isVisible) {
        rafId = 0;
        return;
      }

      var width = canvas.clientWidth;
      var height = canvas.clientHeight;

      // Intentionally render at LOW resolution for chunky NES pixels.
      // 0.35x DPR gives that fat-pixel RF-adapter look.
      var dpr = Math.min(window.devicePixelRatio || 1, 2) * 0.35;
      var drawWidth = Math.floor(width * dpr);
      var drawHeight = Math.floor(height * dpr);

      if (canvas.width !== drawWidth || canvas.height !== drawHeight) {
        canvas.width = drawWidth;
        canvas.height = drawHeight;
        gl.viewport(0, 0, drawWidth, drawHeight);
      }

      var elapsed = (performance.now() - startTime) / 1000;

      gl.useProgram(program);
      gl.uniform2f(resLoc, drawWidth, drawHeight);
      gl.uniform1f(timeLoc, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafId = requestAnimationFrame(render);
    }

    render();

    // Cleanup hook (in case this ever runs in a SPA context)
    canvas._shaderCleanup = function () {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }

  // ──────────────────────────────────────────────────────────────
  // BOOTSTRAP — find all shader canvases on the page
  // ──────────────────────────────────────────────────────────────

  // Respect prefers-reduced-motion: skip shader init entirely
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return; // NP50 CSS gradient fallback remains visible
  }

  document.addEventListener("DOMContentLoaded", function () {
    var canvases = document.querySelectorAll("canvas[data-shader]");
    canvases.forEach(initShaderCanvas);
  });
})();
