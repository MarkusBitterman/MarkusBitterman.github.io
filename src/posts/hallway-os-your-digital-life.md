---
title: "HALLway OS: Your Digital Life, Under Your Rules"
date: 2026-02-11
layout: layouts/post.njk
description: "Introducing HALLway — a NixOS-based operating system stack built around one stubborn, calming idea: your digital life should live on your hardware, under your rules."
tags:
  - posts
  - 🐧 nixos
  - 🏗️ hallway
  - 📓 devlog
---

## One Stubborn, Calming Idea 🧘🏾‍♀️

> **Your digital life should live on your hardware, under your rules — by default.**

Not "privacy theater." Not survivalist paranoia. Just **practical peace of mind**.

That's the core of [HALLway](https://github.com/MarkusBitterman/HALLway) — an operating system stack and a whole way of doing computing. It's a modern device OS + router + digital wallet + local-first "cloud" that treats the public internet like what it often is: a shared pipe full of surveillance incentives, sketchy middleboxes, and "free" services paid for with your attention and behavior.

## What HALLway Actually Is 🔐

HALLway is built on **NixOS** — the declarative, reproducible Linux distribution that makes "works on my machine" ghost stories a thing of the past. Everything is defined in code. Systems are described, not accidentally assembled.

The first implementation, codenamed **2600AD**, runs on an Atari VCS 800 — a compact gaming/media workstation with:

- **Zen kernel and ZFS root** — robust, snapshot-capable storage
- **LUKS encryption with TPM2 auto-unlock** — full-disk encryption that doesn't require a password on every boot
- **Hyprland/Wayland desktop** — modern, tiling window manager
- **Steam with gamescope** — gaming is a first-class citizen
- **Home Manager integration** — per-user configuration management

## The Role-Based Philosophy 🎭

HALLway's signature feature is its **role-based user management system**. Instead of users being defined by what they _can access_, they're defined by _what they do_.

The Three-Line Philosophy:

1. **`groups`** — assigns software to you (package groups like `developers`, `gaming`, `desktop`)
2. **`extraGroups`** — assigns hardware to you (Unix permissions: `audio`, `video`, `wheel`)
3. **`extraPackages`** — tailors your specific needs (one-off packages)

This produces configurations that are clean, explicit, and self-documenting:

```nix
roles.users.alice = {
  groups = [ "developers" "desktop" "viewers" ];
  extraGroups = [ "wheel" "audio" "video" ];
  extraPackages = with pkgs; [ blender ];
};
```

Alice gets everything she needs. Nothing she doesn't. And the configuration _is_ the documentation.

## The Bigger Vision 🌍

HALLway isn't just an OS config. The [Project Bible](https://github.com/MarkusBitterman/HALLway/blob/main/HALLway%20Project%20Bible.md) lays out a larger ecosystem:

- **The HALLway Wallet** 👛 — your front door key to the whole stack. Sign into devices as _you_, manage trust tiers, revoke access instantly.
- **The HALLway Router** 🛜 — WireGuard coordinator, vLAN segmentation, relationship-based networking. Your home network becomes a well-lit hallway with doors, not a haunted house of mystery devices.
- **Pool-based networking** 🏊🏻 — devices get addresses from intentional pools. Identity and routing are clean, predictable, and policy-driven.
- **Handshake-based trust** 🫱🏼‍🫲🏿 — every relationship is established by a deliberate handshake, not accidental exposure.

The emotional center: _you deserve tools that respect you. Trust should be earned, demonstrated, and reversible. Technology can be fun and safe._

## Guest Users: The Clean Room 🧹

One detail I love: HALLway supports **ephemeral guest accounts** with tmpfs home directories that reset on reboot. Log in, use the system, log out — and every trace is garbage-collected. A true clean room session.

```nix
roles.users.guest = {
  isGuest = true;
  guestTmpfsSize = "2G";
  groups = [ "core" "desktop" "viewers" ];
};
```

## Building in Public 🧑🏻‍💻

HALLway is built openly — public repo, issues, milestones, PRs. Copilot helps accelerate the work, but humans verify everything. Code review, threat modeling, tests, and reproducible builds are non-negotiable.

We're building a hallway, not a trap door. 🚪

## What's Next 🚀

The [roadmap](https://github.com/MarkusBitterman/HALLway/blob/main/CHANGELOG.md) includes:

- Modularizing hardware configuration for multi-machine support
- Adding `roles.presets` for common user archetypes
- Abstracting HALLway into a standalone flake input
- Web UI for role/user management

## Get Involved 🤝

HALLway is licensed under **AGPL-3.0** — keeping it open and keeping it honest.

Whether you're a NixOS veteran, a privacy enthusiast, or someone who just wants their computer to make sense, there's room in the hallway.

---

👉 [View the Repository](https://github.com/MarkusBitterman/HALLway) · [Read the Project Bible](https://github.com/MarkusBitterman/HALLway/blob/main/HALLway%20Project%20Bible.md)

_Your digital life should live on your hardware, under your rules — by default._ 🫱🏼‍🫲🏿🧠
