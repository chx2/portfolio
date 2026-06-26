<script setup lang="ts">
import { ref } from 'vue'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { useScrollAnim } from '@/composables/useScrollAnim'

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnim(sectionRef)
</script>

<template>
  <section id="projects" ref="sectionRef" class="py-32 px-6">
    <div class="max-w-5xl mx-auto">
      <p class="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-3">Work</p>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-12">Projects</h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
      </div>
    </div>
  </section>
</template>
