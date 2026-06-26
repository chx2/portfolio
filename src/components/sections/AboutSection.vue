<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnim } from '@/composables/useScrollAnim'

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnim(sectionRef)
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="py-32 px-6 max-w-5xl mx-auto"
  >
    <p class="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-3">About</p>
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-12">Who I Am</h2>

    <div class="grid md:grid-cols-2 gap-12 items-start">
      <div class="space-y-5 text-gray-400 leading-relaxed">
        <p>
          I'm a software engineer based in the US who loves building things on the web. I work primarily with
          <span class="text-primary">Vue 3</span>, <span class="text-primary">TypeScript</span>, and
          <span class="text-primary">Rust</span> — but I'm comfortable across the full stack.
        </p>
        <p>
          I care about clean code, fast interfaces, and the small details that make a product feel
          polished. When I'm not writing code, you'll find me exploring new tech, contributing to
          open-source, or working on side projects.
        </p>
      </div>

      <div class="font-mono text-sm space-y-3">
        <div class="flex items-center gap-3 text-gray-400">
          <span class="text-primary">→</span>
          <span>Currently building in Vue 3 + Rust</span>
        </div>
        <div class="flex items-center gap-3 text-gray-400">
          <span class="text-primary">→</span>
          <span>Open to interesting collaborations</span>
        </div>
        <div class="flex items-center gap-3 text-gray-400">
          <span class="text-primary">→</span>
          <span>crishack8@gmail.com</span>
        </div>
      </div>
    </div>
  </section>
</template>
