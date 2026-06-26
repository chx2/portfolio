<script setup lang="ts">
const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
]
</script>

<template>
  <nav class="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 py-4 bg-gray-900/80 backdrop-blur-md border-b border-white/5">
    <span class="font-mono text-primary text-sm tracking-widest font-semibold">CH</span>
    <ul class="flex gap-8">
      <li v-for="link in links" :key="link.href">
        <a
          :href="link.href"
          class="text-sm text-gray-400 hover:text-primary transition-colors duration-200 tracking-wide"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
