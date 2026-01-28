---
layout: layouts/base.njk
title: "Markus Bitterman - Portfolio, Blog & Devlog"
description: "Welcome to my living GitHub Pages site: a portfolio, blog, devlog, playground, and starter kit all in one."
hero: true
heroTitle: "🧾✨ Welcome to My Digital Home"
heroSubtitle: "Portfolio • Blog • Devlog • Playground • Living Starter Kit"
heroClass: "is-primary"
permalink: /index.html
---

<section class="hero is-medium is-light">
  <div class="hero-body">
    <div class="container">
      <h1 class="title is-1">
        {{ heroTitle }}
      </h1>
      <p class="subtitle is-3">
        {{ heroSubtitle }}
      </p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="content">
      <h2 class="title is-2">👋 Hello, World!</h2>
      <p class="is-size-5">
        This is my <strong>living GitHub Pages site</strong> — a place where I share my work, thoughts, and experiments.
        It's also designed to be <strong>inspectable, forkable, and remixable</strong> so you can learn from it and build your own.
      </p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="title is-2 has-text-centered mb-6">What You'll Find Here</h2>
    
    <div class="columns is-multiline">
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">🏪 Portfolio</p>
            <p class="content">
              A curated showcase of my projects, code, and creative work. See what I've been building.
            </p>
            <a href="/portfolio/" class="button is-primary is-light">View Portfolio →</a>
          </div>
        </div>
      </div>
      
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">📰 Blog & Devlog</p>
            <p class="content">
              Thoughts, tutorials, devlogs, and journal entries. The classic "finger file" tradition lives on.
            </p>
            <a href="/blog/" class="button is-primary is-light">Read Posts →</a>
          </div>
        </div>
      </div>
      
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">🧭 Now / Status</p>
            <p class="content">
              What I'm working on right now. Inspired by the <a href="https://nownownow.com/about" target="_blank">/now movement</a>.
            </p>
            <a href="/now/" class="button is-primary is-light">See What's Up →</a>
          </div>
        </div>
      </div>
      
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">🛝 Playground</p>
            <p class="content">
              Experiments, demos, and interactive things. A place to play with ideas and share the results.
            </p>
            <a href="/playground/" class="button is-primary is-light">Explore →</a>
          </div>
        </div>
      </div>
      
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">⛱️ Sandbox</p>
            <p class="content">
              Work-in-progress experiments and rough ideas. The messier, experimental sibling of the playground.
            </p>
            <a href="/sandbox/" class="button is-primary is-light">Dig In →</a>
          </div>
        </div>
      </div>
      
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">👤 About</p>
            <p class="content">
              Learn more about me, my background, skills, and what makes me tick as a developer.
            </p>
            <a href="/about/" class="button is-primary is-light">Get to Know Me →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section has-background-light">
  <div class="container">
    <div class="content has-text-centered">
      <h2 class="title is-2">📺 Clone This Repo & Roll Your Own</h2>
      <p class="is-size-5">
        This entire site is <strong>open source and built to be cloned</strong>. 
        It's powered by <a href="https://www.11ty.dev/" target="_blank">Eleventy</a>, 
        styled with <a href="https://bulma.io/" target="_blank">Bulma</a> and 
        <a href="https://sass-lang.com/" target="_blank">Sass</a>, 
        and designed to be your <strong>starter kit</strong>.
      </p>
      <p class="is-size-5">
        <strong>Everything is visible, inspectable, and remixable.</strong> 
        Fork it, customize it, make it yours!
      </p>
      <div class="buttons is-centered mt-5">
        <a href="https://github.com/MarkusBitterman/MarkusBitterman.github.io" class="button is-primary is-medium" target="_blank">
          <span class="icon">
            <i class="fab fa-github"></i>
          </span>
          <span>View on GitHub</span>
        </a>
        <a href="#getting-started" class="button is-light is-medium">
          <span>Getting Started Guide</span>
        </a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="getting-started">
  <div class="container">
    <div class="content">
      <h2 class="title is-2">🚀 Quick Start</h2>
      
      <h3 class="title is-4">1. Clone the Repository</h3>
      <pre><code>git clone https://github.com/MarkusBitterman/MarkusBitterman.github.io.git
cd MarkusBitterman.github.io</code></pre>
      
      <h3 class="title is-4">2. Install Dependencies</h3>
      <pre><code>npm install</code></pre>
      
      <h3 class="title is-4">3. Start the Development Server</h3>
      <pre><code>npm start</code></pre>
      
      <h3 class="title is-4">4. Build for Production</h3>
      <pre><code>npm run build</code></pre>
      
      <p class="is-size-5">
        That's it! Your site will be running locally at <code>http://localhost:8080</code>.
        Edit the Markdown files in <code>src/</code>, and watch your changes appear instantly.
      </p>
      
      <div class="notification is-info is-light">
        <p class="is-size-6">
          <strong>💡 Pro Tip:</strong> Check out the <code>README.md</code> for a complete guide on 
          customizing layouts, adding posts, styling with Bulma/Sass, and deploying to GitHub Pages.
        </p>
      </div>
    </div>
  </div>
</section>
