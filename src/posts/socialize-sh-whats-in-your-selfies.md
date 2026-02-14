---
title: "socialize.sh: What's Really in Your Selfies?"
date: 2026-02-12
layout: layouts/post.njk
description: "Exploring the hidden world of social media depth features, portrait metadata, and what platforms actually do with your photos."
tags:
  - posts
  - 📸 photography
  -  privacy
  - 📱 social-media
---

## The Depth Behind the Selfie 🤳🏻

Ever taken a Portrait mode photo on your phone and wondered what's actually happening behind the scenes? That beautiful background blur isn't just a filter — your camera is building a **depth map** of the scene, capturing real 3D spatial data alongside the image.

[socialize.sh](https://github.com/MarkusBitterman/socialize.sh) is a new project exploring exactly this: **what "Social Media depth" features in your digital camera app actually are**, what metadata gets stored with your images, and what platforms do with that data.

## The Questions We're Asking 🔍

- **What data gets kept with your Portrait?** 🖼️ — Modern phones capture depth maps, LiDAR scans, face mesh data, and spatial audio. But how is that metadata stored alongside the image file?

- **What can we do with that data?** 📲 — Beyond the basic bokeh effect, depth data enables relighting, 3D photo effects, augmented reality placement, and more. What's possible when you have access to the raw spatial data?

- **What does platform support look like in the wild?** 🗺️ — When you upload a Portrait photo to Instagram, Facebook, TikTok, or Twitter, what depth data survives? What gets stripped? What gets quietly harvested?

## Why This Matters 📡

We're at an intersection of **photography, privacy, and social media** that most people don't think about:

- Your selfie might contain a 3D model of your face
- Your room photos might include spatial mapping data
- Platform processing pipelines make decisions about your data that aren't transparent

Understanding what's in your images — and what happens to that data when it leaves your device — is both a technical and a privacy question.

## The Approach 🧑🏻‍💻

This project lives at the crossroads of several interests:

- **Image forensics** — examining EXIF, XMP, and proprietary metadata formats
- **Format exploration** — understanding HEIF, HEIC, and depth-embedded image containers
- **Platform analysis** — documenting what survives upload across major social media platforms
- **Creative tooling** — building utilities to extract, visualize, and work with depth data

It's early days — the repo currently contains the research framework and initial questions. The exploration is the point.

## Built in the Open 🌱

Like all my projects, socialize.sh is open source (MIT licensed) and built in public. The messy exploration, the dead ends, the surprising discoveries — it's all part of the process.

If you're interested in image metadata, computational photography, or the invisible data layer behind social media, come explore with me.

---

👉 [View the Repository](https://github.com/MarkusBitterman/socialize.sh)

_What's really in your selfies? Let's find out._ 🧑🏻‍🎤📩
