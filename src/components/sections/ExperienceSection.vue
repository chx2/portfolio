<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/experience'

gsap.registerPlugin(ScrollTrigger)

const cardRefs = ref<(HTMLElement | null)[]>([])

function setCardRef(el: unknown, i: number) {
  cardRefs.value[i] = el as HTMLElement | null
}

onMounted(() => {
  cardRefs.value.forEach((el, i) => {
    if (!el) return
    gsap.from(el, {
      opacity: 0,
      x: i % 2 === 0 ? -60 : 60,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })
})
</script>

<template>
  <section id="experience" class="py-32 px-6 bg-card">
    <div class="max-w-5xl mx-auto">
      <p class="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-3">Career</p>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-16">Experience</h2>

      <div class="relative">
        <template v-for="(job, i) in experience" :key="i">

          <!--
            Even (i%2===0) → LEFT side (no ml-auto)
            Odd  (i%2===1) → RIGHT side (md:ml-auto)
            pt-5 gives headroom above the card box so the dot floats between
            the incoming connector and the card border without overlapping either.
          -->
          <div
            :ref="el => setCardRef(el, i)"
            class="relative md:w-[45%] pt-5"
            :class="i % 2 !== 0 ? 'md:ml-auto' : ''"
          >
            <!--
              Desktop dot: sits at the card's inner edge (the side facing the centre gap).
              Even/LEFT  → right inner edge → -right-1.5
              Odd/RIGHT  → left  inner edge → -left-1.5 (same on mobile)
            -->
            <div
              class="absolute top-0 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-primary bg-surface z-10"
              :class="i % 2 === 0
                ? '-left-1.5 md:left-auto md:-right-1.5'
                : '-left-1.5'"
            />

            <!-- ml-5 on mobile offsets card content right of the dot;
                 md:mr-6 / md:ml-6 creates a gap between the card border and the
                 connector line so they never share the same X coordinate. -->
            <div
              class="ml-5 md:ml-0 border border-white/5 rounded-lg p-6 bg-surface"
              :class="i % 2 === 0 ? 'md:mr-6' : 'md:ml-6'"
            >
              <span class="font-mono text-xs text-gray-500 tracking-widest">{{ job.period }}</span>
              <h3 class="mt-1 text-lg font-semibold text-white">{{ job.role }}</h3>
              <p class="text-primary/80 font-mono text-sm mb-4">{{ job.company }}</p>
              <ul class="space-y-2">
                <li
                  v-for="(bullet, j) in job.bullets"
                  :key="j"
                  class="flex gap-3 text-gray-400 text-sm leading-relaxed"
                >
                  <span class="text-primary/50 mt-0.5 shrink-0">▸</span>
                  {{ bullet }}
                </li>
              </ul>
            </div>
          </div>

          <!--
            S-curve connector between card i and card i+1.

            Even (LEFT, exit at 45%) → Odd (RIGHT, entry at 55%):
              Top half:    45%→50%, left border + bottom border, curve bottom-left
              Bottom half: 50%→55%, top border + right border, curve top-right

            Odd (RIGHT, exit at 55%) → Even (LEFT, entry at 45%):
              Top half:    50%→55%, right border + bottom border, curve bottom-right
              Bottom half: 45%→50%, top border + left border, curve top-left
          -->
          <template v-if="i < experience.length - 1">
            <div
              class="hidden md:block h-24 border-b-2 border-primary/30"
              :class="i % 2 === 0
                ? 'ml-[45%] mr-[50%] border-l-2 rounded-bl-[1.5rem]'
                : 'ml-[50%] mr-[45%] border-r-2 rounded-br-[1.5rem]'"
            />
            <div
              class="hidden md:block h-24 border-t-2 border-primary/30"
              :class="i % 2 === 0
                ? 'ml-[50%] mr-[45%] border-r-2 rounded-tr-[1.5rem]'
                : 'ml-[45%] mr-[50%] border-l-2 rounded-tl-[1.5rem]'"
            />
          </template>

          <!-- Mobile: simple vertical spacer aligned with the dot -->
          <div
            v-if="i < experience.length - 1"
            class="md:hidden h-8 w-px ml-[0.15rem] bg-white/10"
          />

        </template>
      </div>
    </div>
  </section>
</template>
