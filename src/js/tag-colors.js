// ================================================================
// TAG COLOR SYSTEM
// ================================================================
// Deterministic emoji-agnostic tag coloring for blog posts.
// Uses HSL hashing to generate consistent colors from tag names.
// ================================================================

(function (window) {
  "use strict";

  // ── Tag sanitization (remove emoji/special chars for hashing) ──
  function sanitizeTag(tag) {
    return tag
      .replace(/[^\w\s-]/g, "")
      .trim()
      .toLowerCase();
  }

  // ── Deterministic tag color generator (background) ──
  function hashTagColor(tag) {
    var cleanTag = sanitizeTag(tag);
    var hash = 0;
    for (var i = 0; i < cleanTag.length; i++) {
      hash = (hash << 5) - hash + cleanTag.charCodeAt(i);
      hash = hash & hash;
    }
    var hue = Math.abs(hash) % 360;
    var sat = 70;
    var light = 45;
    var c = ((1 - Math.abs((2 * light) / 100 - 1)) * sat) / 100;
    var x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    var m = light / 100 - c / 2;
    var r, g, b;
    if (hue < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (hue < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (hue < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (hue < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (hue < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }
    var toHex = function (n) {
      var hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
  }

  // ── Deterministic tag color generator (border - darker) ──
  function hashTagBorderColor(tag) {
    var cleanTag = sanitizeTag(tag);
    var hash = 0;
    for (var i = 0; i < cleanTag.length; i++) {
      hash = (hash << 5) - hash + cleanTag.charCodeAt(i);
      hash = hash & hash;
    }
    var hue = Math.abs(hash) % 360;
    var sat = 70;
    var light = 30; // Darker than background
    var c = ((1 - Math.abs((2 * light) / 100 - 1)) * sat) / 100;
    var x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    var m = light / 100 - c / 2;
    var r, g, b;
    if (hue < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (hue < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (hue < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (hue < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (hue < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }
    var toHex = function (n) {
      var hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
  }

  // ── Apply colors to all .tag-colored elements ──
  function applyTagColors() {
    var tagElements = document.querySelectorAll(".tag-colored");
    tagElements.forEach(function (tagEl) {
      var tagName = tagEl.getAttribute("data-tag-name");
      if (!tagName) return;

      var bgColor = hashTagColor(tagName);
      var borderColor = hashTagBorderColor(tagName);

      tagEl.style.backgroundColor = bgColor;
      tagEl.style.borderColor = borderColor;
      tagEl.style.color = "#ffffff";
      tagEl.style.fontWeight = "600";
    });
  }

  // ── Export to global scope ──
  window.TagColors = {
    sanitize: sanitizeTag,
    hash: hashTagColor,
    border: hashTagBorderColor,
    apply: applyTagColors,
  };

  // ── Auto-apply on DOMContentLoaded ──
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTagColors);
  } else {
    applyTagColors();
  }
})(window);
