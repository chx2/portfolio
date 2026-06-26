<script setup lang="ts">
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden"
  >
    <!-- Grid background -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background-image: linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px); background-size: 60px 60px;"
    />
    <!-- Glow -->
    <div class="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

    <div class="relative z-10 text-center max-w-3xl">
      <p class="mb-4 font-mono text-xs tracking-[0.3em] text-primary uppercase">Hello, I'm</p>
      <h1 class="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-4">
        Chris Hackett
      </h1>
      <p class="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
        Software Engineer — building fast, thoughtful experiences with Vue, TypeScript, and Rust.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#projects"
          class="px-6 py-3 rounded border border-primary text-primary font-mono text-sm hover:bg-primary/10 transition-colors duration-200"
        >
          View Projects
        </a>
        <a
          href="mailto:crishack8@gmail.com"
          class="px-6 py-3 rounded border border-white/10 text-gray-300 font-mono text-sm hover:border-white/30 hover:text-white transition-colors duration-200"
        >
          Get in Touch
        </a>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
      <div class="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
    </div>
  </section>
</template>
