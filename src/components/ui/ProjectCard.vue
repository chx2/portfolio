<script setup lang="ts">
import type { Project } from '@/data/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <div class="group flex flex-col p-6 rounded-lg border border-white/5 bg-surface hover:border-primary/30 transition-colors duration-300">
    <h3 class="text-white font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-200">
      {{ project.title }}
    </h3>
    <p class="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
      {{ project.description }}
    </p>
    <div class="flex flex-wrap gap-1.5 mb-5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
      <span
        v-for="tech in project.tech"
        :key="tech"
        class="px-2 py-0.5 rounded text-xs font-mono text-primary/70 bg-primary/5 border border-primary/10"
      >
        {{ tech }}
      </span>
    </div>
    <div class="flex gap-4 font-mono text-xs">
      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener"
        class="text-gray-400 hover:text-primary transition-colors"
      >
        Live ↗
      </a>
      <a
        v-if="project.repoUrl"
        :href="project.repoUrl"
        target="_blank"
        rel="noopener"
        class="text-gray-400 hover:text-primary transition-colors"
      >
        GitHub ↗
      </a>
    </div>
  </div>
</template>
