<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { projects, type Project } from '@/data/projects'
import { experience, type Experience } from '@/data/experience'
import { skills, type SkillGroup } from '@/data/skills'
import { about } from '@/data/about'
import TypewriterText from '@/components/ui/TypewriterText.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const props = defineProps<{ query: string }>()

function skillTagDelay(groups: SkillGroup[], gi: number, ti: number): number {
  let count = 0
  for (let g = 0; g < gi; g++) count += groups[g].items.length
  return (count + ti) * 55 + gi * 20
}

interface TextMessage {
  id: number
  role: 'assistant' | 'user'
  type: 'text'
  content: string
}
interface ProjectsMessage {
  id: number
  role: 'assistant'
  type: 'projects'
  items: Project[]
}
interface ExperienceMessage {
  id: number
  role: 'assistant'
  type: 'experience'
  items: Experience[]
}
interface SkillsMessage {
  id: number
  role: 'assistant'
  type: 'skills'
  items: SkillGroup[]
}
interface ContactMessage {
  id: number
  role: 'assistant'
  type: 'contact'
}
type Message = TextMessage | ProjectsMessage | ExperienceMessage | SkillsMessage | ContactMessage

const messages = ref<Message[]>([])
const isResponding = ref(true)
const isPickerOpen = ref(false)
const messagesEl = ref<HTMLElement | null>(null)
const usedOptions = ref(new Set<string>(['whoami']))

const eyeEl = ref<SVGElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)

const pupilOffset = computed(() => {
  if (!eyeEl.value) return { x: 0, y: 0 }
  const rect = eyeEl.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = mouseX.value - cx
  const dy = mouseY.value - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist === 0) return { x: 0, y: 0 }
  const factor = Math.min(dist / 80, 1)
  return { x: (dx / dist) * 1.3 * factor, y: (dy / dist) * 1.3 * factor }
})

function onMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

onUnmounted(() => window.removeEventListener('mousemove', onMouseMove))


async function scrollBottom() {
  await nextTick()
  messagesEl.value?.scrollTo({ top: messagesEl.value.scrollHeight, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  messages.value.push({ id: 0, role: 'user', type: 'text', content: props.query })
  scrollBottom()
  setTimeout(() => {
    isResponding.value = false
    messages.value.push({ id: 1, role: 'assistant', type: 'text', content: about })
    scrollBottom()
  }, 900)
})

function togglePicker() {
  isPickerOpen.value = !isPickerOpen.value
  if (isPickerOpen.value) scrollBottom()
}


type Option = 'projects' | 'experience' | 'skills' | 'whoami' | 'contact'

function handleOption(opt: Option) {
  isPickerOpen.value = false
  usedOptions.value.add(opt)

  const userText: Record<Option, string> = {
    projects: 'Show me your projects',
    experience: 'Show me your experience',
    skills: 'What are your skills?',
    whoami: props.query,
    contact: 'How can I contact you?',
  }

  messages.value.push({ id: Date.now(), role: 'user', type: 'text', content: userText[opt] })
  isResponding.value = true
  scrollBottom()

  setTimeout(() => {
    isResponding.value = false
    const id = Date.now() + 1
    if (opt === 'projects') {
      messages.value.push({ id, role: 'assistant', type: 'projects', items: projects })
    } else if (opt === 'experience') {
      messages.value.push({ id, role: 'assistant', type: 'experience', items: experience })
    } else if (opt === 'skills') {
      messages.value.push({ id, role: 'assistant', type: 'skills', items: skills })
    } else if (opt === 'contact') {
      messages.value.push({ id, role: 'assistant', type: 'contact' })
    } else {
      messages.value.push({ id, role: 'assistant', type: 'text', content: about })
    }
    scrollBottom()
  }, 500)
}
</script>

<template>
  <div class="flex flex-col h-screen bg-surface">
    <h1 class="sr-only">Chris Hackett — Portfolio</h1>

    <!-- Scrollable messages -->
    <div ref="messagesEl" role="log" aria-label="Conversation" aria-live="polite" class="flex-1 overflow-y-auto px-4 py-6">
      <div class="max-w-2xl mx-auto space-y-4">

        <!-- Message list -->
        <TransitionGroup name="message" tag="div" class="space-y-4">
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
          >
            <!-- User bubble -->
            <div
              v-if="msg.role === 'user' && msg.type === 'text'"
              class="max-w-[70%] px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-gray-200 text-sm font-mono leading-relaxed"
            >
              {{ msg.content }}
            </div>

            <!-- Assistant: text -->
            <div
              v-else-if="msg.role === 'assistant' && msg.type === 'text'"
              class="max-w-[85%] px-4 py-3.5 rounded-xl bg-card border border-white/5 text-gray-200 text-sm font-mono leading-relaxed"
              style="white-space: pre-line"
            >
              <TypewriterText :content="(msg as TextMessage).content" />
            </div>

            <!-- Assistant: projects -->
            <div v-else-if="msg.type === 'projects'" class="w-full max-w-[90%] space-y-2.5">
              <h2 class="text-[11px] font-mono text-gray-600 tracking-widest uppercase px-1">Projects</h2>
              <article
                v-for="(proj, i) in (msg as ProjectsMessage).items"
                :key="i"
                class="px-4 py-3.5 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors duration-200"
                :style="{ animation: 'card-in 0.35s ease both', animationDelay: `${i * 120}ms` }"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-mono text-gray-100 font-medium">{{ proj.title }}</h3>
                    <p class="text-xs text-gray-500 mt-1 leading-relaxed">{{ proj.description }}</p>
                    <ul class="flex flex-wrap gap-1.5 mt-2.5 list-none" aria-label="Technologies used">
                      <li
                        v-for="t in proj.tech"
                        :key="t"
                        class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary/70 border border-primary/20"
                      >
                        {{ t }}
                      </li>
                    </ul>
                  </div>
                  <div class="flex flex-col gap-1.5 shrink-0 items-end">
                    <a
                      v-if="proj.repoUrl"
                      :href="proj.repoUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      :aria-label="`${proj.title} source code on GitHub (opens in new tab)`"
                      class="text-[11px] font-mono text-gray-600 hover:text-primary transition-colors"
                    >
                      GitHub →
                    </a>
                    <a
                      v-if="proj.liveUrl"
                      :href="proj.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      :aria-label="`${proj.title} live demo (opens in new tab)`"
                      class="text-[11px] font-mono text-gray-600 hover:text-primary transition-colors"
                    >
                      Live →
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <!-- Assistant: experience -->
            <div v-else-if="msg.type === 'experience'" class="w-full max-w-[90%] space-y-2.5">
              <h2 class="text-[11px] font-mono text-gray-600 tracking-widest uppercase px-1">Experience</h2>
              <article
                v-for="(exp, i) in (msg as ExperienceMessage).items"
                :key="i"
                class="px-4 py-3.5 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors duration-200"
                :style="{ animation: 'card-in 0.35s ease both', animationDelay: `${i * 120}ms` }"
              >
                <div class="flex items-start justify-between gap-4 mb-2.5">
                  <div>
                    <h3 class="text-sm font-mono text-gray-100 font-medium">{{ exp.role }}</h3>
                    <p class="text-xs font-mono text-gray-400">{{ exp.company }}</p>
                  </div>
                  <span class="text-[11px] font-mono text-gray-600 shrink-0 mt-0.5" aria-label="Period">{{ exp.period }}</span>
                </div>
                <ul class="space-y-1.5">
                  <li
                    v-for="(bullet, j) in exp.bullets"
                    :key="j"
                    class="flex gap-2 text-xs font-mono text-gray-500 leading-relaxed"
                  >
                    <span aria-hidden="true" class="text-primary/50 shrink-0 mt-0.5">—</span>
                    <span>{{ bullet }}</span>
                  </li>
                </ul>
              </article>
            </div>

            <!-- Assistant: skills -->
            <div v-else-if="msg.type === 'skills'" class="w-full max-w-[90%]">
              <h2 class="text-[11px] font-mono text-gray-600 tracking-widest uppercase px-1 mb-2.5">Skills</h2>
              <div class="px-4 py-3.5 rounded-xl bg-card border border-white/5 space-y-3">
                <div
                  v-for="(group, gi) in (msg as SkillsMessage).items"
                  :key="group.category"
                  class="flex items-start gap-4"
                  :style="{ animation: 'card-in 0.3s ease both', animationDelay: `${gi * 80}ms` }"
                >
                  <span class="text-[11px] font-mono text-gray-600 w-20 shrink-0 pt-0.5" :aria-label="group.category">{{ group.category }}</span>
                  <ul class="flex flex-wrap gap-1.5 list-none" :aria-label="`${group.category} skills`">
                    <li
                      v-for="(item, ti) in group.items"
                      :key="item"
                      class="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary/70 border border-primary/20"
                      :style="{ animation: 'tag-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both', animationDelay: `${skillTagDelay((msg as SkillsMessage).items, gi, ti)}ms` }"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Assistant: contact -->
            <div v-else-if="msg.type === 'contact'" class="w-full max-w-[85%]">
              <h2 class="text-[11px] font-mono text-gray-600 tracking-widest uppercase px-1 mb-2.5">Contact</h2>
              <div class="rounded-xl bg-card border border-white/5 overflow-hidden" style="animation: card-in 0.35s ease both">
                <a
                  href="mailto:crishack8@gmail.com"
                  aria-label="Send email to crishack8@gmail.com"
                  class="flex items-center gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/[0.04] transition-colors group"
                >
                  <svg aria-hidden="true" focusable="false" class="w-4 h-4 shrink-0 text-gray-600 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="flex-1 font-mono text-sm text-gray-400 group-hover:text-gray-100 transition-colors">crishack8@gmail.com</span>
                  <svg aria-hidden="true" focusable="false" class="w-3.5 h-3.5 text-gray-700 shrink-0 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://github.com/chx2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  class="flex items-center gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/[0.04] transition-colors group"
                >
                  <svg aria-hidden="true" focusable="false" class="w-4 h-4 shrink-0 text-gray-600 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span class="flex-1 font-mono text-sm text-gray-400 group-hover:text-gray-100 transition-colors">github.com/chx2</span>
                  <svg aria-hidden="true" focusable="false" class="w-3.5 h-3.5 text-gray-700 shrink-0 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/crishackett"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  class="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors group"
                >
                  <svg aria-hidden="true" focusable="false" class="w-4 h-4 shrink-0 text-gray-600 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span class="flex-1 font-mono text-sm text-gray-400 group-hover:text-gray-100 transition-colors">linkedin.com/in/crishackett</span>
                  <svg aria-hidden="true" focusable="false" class="w-3.5 h-3.5 text-gray-700 shrink-0 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Responding typing indicator -->
        <Transition name="bubble">
          <div v-if="isResponding" role="status" aria-label="Assistant is typing" class="flex items-center gap-3 w-fit px-4 py-3 rounded-xl bg-card border border-white/5">
            <span
              v-for="n in 3"
              :key="n"
              aria-hidden="true"
              class="h-1.5 w-1.5 rounded-full bg-primary"
              :style="{ animation: 'dotBounce 1s ease-in-out infinite', animationDelay: `${(n - 1) * 0.18}s` }"
            />
          </div>
        </Transition>

      </div>
    </div>

    <!-- Sticky bottom picker -->
    <div role="region" aria-label="Chat input" class="shrink-0 border-t border-white/5 bg-surface px-4 pt-3 pb-5">
      <div class="max-w-2xl mx-auto">
        <div
          class="rounded-xl border bg-card shadow-lg shadow-black/40 overflow-hidden transition-colors duration-200"
          :class="isPickerOpen ? 'border-primary/30' : 'border-white/10'"
        >
          <!-- Collapsed bar: button + ThemeToggle side by side (not nested) -->
          <div class="flex items-center group">
            <button
              @click="togglePicker"
              :aria-expanded="isPickerOpen"
              aria-controls="option-picker"
              aria-label="Toggle chat options"
              class="flex-1 flex items-center gap-3 px-4 py-3.5 text-left"
            >
              <span class="relative shrink-0 eye-wrapper">
                <svg
                  ref="eyeEl"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                  class="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 8C1.5 8 4 3.5 8 3.5C12 3.5 14.5 8 14.5 8C14.5 8 12 12.5 8 12.5C4 12.5 1.5 8 1.5 8Z"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linejoin="round"
                  />
                  <circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1" />
                  <circle :cx="8 + pupilOffset.x" :cy="8 + pupilOffset.y" r="1.2" fill="currentColor" />
                </svg>
                <!-- Question mark popup on eye hover -->
                <span aria-hidden="true" class="eye-tooltip">?</span>
              </span>
              <span class="flex-1 font-mono text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                Ask me something&hellip;
              </span>
              <svg
                aria-hidden="true"
                focusable="false"
                class="w-4 h-4 text-gray-600 shrink-0 transition-transform duration-200"
                :class="isPickerOpen ? 'rotate-180' : ''"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="shrink-0 pr-2">
              <ThemeToggle />
            </div>
          </div>

          <!-- Expandable options -->
          <Transition name="picker-expand">
            <div v-if="isPickerOpen" id="option-picker" class="border-t border-white/5">

              <!-- Who are you? -->
              <button
                @click="handleOption('whoami')"
                class="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-white/5 transition-colors group"
                :class="usedOptions.has('whoami') ? 'bg-primary/5 hover:bg-primary/[0.08]' : 'hover:bg-white/[0.03]'"
              >
                <svg aria-hidden="true" focusable="false" class="w-4 h-4 shrink-0 transition-colors" :class="usedOptions.has('whoami') ? 'text-primary/60' : 'text-gray-600 group-hover:text-primary'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="flex-1 font-mono text-sm transition-colors" :class="usedOptions.has('whoami') ? 'text-primary/60' : 'text-gray-300 group-hover:text-gray-100'">Who are you?</span>
                <svg v-if="usedOptions.has('whoami')" aria-label="Asked" focusable="false" class="w-3.5 h-3.5 text-primary/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else aria-hidden="true" focusable="false" class="w-3.5 h-3.5 text-gray-700 shrink-0 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Experience -->
              <button
                @click="handleOption('experience')"
                class="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-white/5 transition-colors group"
                :class="usedOptions.has('experience') ? 'bg-primary/5 hover:bg-primary/[0.08]' : 'hover:bg-white/[0.03]'"
              >
                <svg aria-hidden="true" focusable="false" class="w-4 h-4 shrink-0 transition-colors" :class="usedOptions.has('experience') ? 'text-primary/60' : 'text-gray-600 group-hover:text-primary'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="flex-1 font-mono text-sm transition-colors" :class="usedOptions.has('experience') ? 'text-primary/60' : 'text-gray-300 group-hover:text-gray-100'">Experience</span>
                <svg v-if="usedOptions.has('experience')" aria-label="Asked" focusable="false" class="w-3.5 h-3.5 text-primary/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else aria-hidden="true" focusable="false" class="w-3.5 h-3.5 text-gray-700 shrink-0 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Skills -->
              <button
                @click="handleOption('skills')"
                class="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-white/5 transition-colors group"
                :class="usedOptions.has('skills') ? 'bg-primary/5 hover:bg-primary/[0.08]' : 'hover:bg-white/[0.03]'"
              >
                <svg aria-hidden="true" focusable="false" class="w-4 h-4 shrink-0 transition-colors" :class="usedOptions.has('skills') ? 'text-primary/60' : 'text-gray-600 group-hover:text-primary'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span class="flex-1 font-mono text-sm transition-colors" :class="usedOptions.has('skills') ? 'text-primary/60' : 'text-gray-300 group-hover:text-gray-100'">Skills</span>
                <svg v-if="usedOptions.has('skills')" aria-label="Asked" focusable="false" class="w-3.5 h-3.5 text-primary/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else aria-hidden="true" focusable="false" class="w-3.5 h-3.5 text-gray-700 shrink-0 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Projects -->
              <button
                @click="handleOption('projects')"
                class="w-full flex items-center gap-3 px-4 py-3 text-left border-b border-white/5 transition-colors group"
                :class="usedOptions.has('projects') ? 'bg-primary/5 hover:bg-primary/[0.08]' : 'hover:bg-white/[0.03]'"
              >
                <svg aria-hidden="true" focusable="false" class="w-4 h-4 shrink-0 transition-colors" :class="usedOptions.has('projects') ? 'text-primary/60' : 'text-gray-600 group-hover:text-primary'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span class="flex-1 font-mono text-sm transition-colors" :class="usedOptions.has('projects') ? 'text-primary/60' : 'text-gray-300 group-hover:text-gray-100'">Projects</span>
                <svg v-if="usedOptions.has('projects')" aria-label="Asked" focusable="false" class="w-3.5 h-3.5 text-primary/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else aria-hidden="true" focusable="false" class="w-3.5 h-3.5 text-gray-700 shrink-0 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Contact -->
              <button
                @click="handleOption('contact')"
                class="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors group"
                :class="usedOptions.has('contact') ? 'bg-primary/5 hover:bg-primary/[0.08]' : 'hover:bg-white/[0.03]'"
              >
                <svg aria-hidden="true" focusable="false" class="w-4 h-4 shrink-0 transition-colors" :class="usedOptions.has('contact') ? 'text-primary/60' : 'text-gray-600 group-hover:text-primary'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="flex-1 font-mono text-sm transition-colors" :class="usedOptions.has('contact') ? 'text-primary/60' : 'text-gray-300 group-hover:text-gray-100'">Contact</span>
                <svg v-if="usedOptions.has('contact')" aria-label="Asked" focusable="false" class="w-3.5 h-3.5 text-primary/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else aria-hidden="true" focusable="false" class="w-3.5 h-3.5 text-gray-700 shrink-0 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>
          </Transition>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.eye-wrapper {
  display: inline-flex;
}

.eye-tooltip {
  position: absolute;
  top: -2px;
  left: calc(100% + 2px);
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-primary, #a78bfa);
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.eye-wrapper:hover .eye-tooltip {
  opacity: 1;
  transform: translateY(-6px);
}

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes tag-pop {
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: scale(1); }
}

.bubble-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.bubble-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.bubble-leave-active {
  transition: opacity 0.2s ease;
}
.bubble-leave-to {
  opacity: 0;
}

.message-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.message-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.picker-expand-enter-active,
.picker-expand-leave-active {
  transition: max-height 0.25s ease, opacity 0.2s ease;
  max-height: 320px;
  overflow: hidden;
}
.picker-expand-enter-from,
.picker-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
