<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits<{ done: [query: string] }>()

const QUERIES: string[] = [
  'Who is chris hackett?',
  'Tell me about chris hackett',
  'What does chris hackett build?',
  'Chris hackett portfolio',
  'What can chris hackett do?',
  'Describe chris hackett',
  'Who built this?',
  'Chris hackett — software engineer',
  'Launch portfolio for chris hackett',
  'Introduce me to chris hackett',
]

const PROCESSING_PHRASES: string[] = [
  'Thinking...',
  'Searching knowledge base...',
  'Compiling experience...',
  'Loading personality...',
  'Resolving dependencies...',
  'Rendering portfolio...',
  'Almost there...',
  'Finalizing results...',
  'Cross-referencing projects...',
  'Calibrating responses...',
  'Fetching career history...',
  'Building skill tree...',
  'Processing request...',
  'Gathering evidence...',
  'Vibing with the code...',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickN<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

const selectedQuery = pick(QUERIES)
const processingPhrases = pickN(PROCESSING_PHRASES, 4)

// --- State ---
const overlayRef = ref<HTMLElement | null>(null)
const phase = ref<'typing' | 'sent' | 'processing' | 'done'>('typing')
const typedText = ref('')
const showCursor = ref(true)
const currentProcessingPhrase = ref(processingPhrases[0])

let timeouts: ReturnType<typeof setTimeout>[] = []

function schedule(fn: () => void, ms: number) {
  const id = setTimeout(fn, ms)
  timeouts.push(id)
}

// Phase 1: type the query
function startTyping() {
  let i = 0
  const CHAR_DELAY = 30

  function typeNext() {
    if (i < selectedQuery.length) {
      typedText.value += selectedQuery[i]
      i++
      schedule(typeNext, CHAR_DELAY + Math.random() * 15)
    } else {
      schedule(sendQuery, 250)
    }
  }

  typeNext()
}

// Phase 2: animate the send, transition to processing
function sendQuery() {
  showCursor.value = false
  phase.value = 'sent'
  schedule(startProcessing, 350)
}

// Phase 3: cycle through processing phrases
function startProcessing() {
  phase.value = 'processing'
  let i = 0

  function nextPhrase() {
    i++
    if (i < processingPhrases.length) {
      currentProcessingPhrase.value = processingPhrases[i]
      schedule(nextPhrase, 900)
    } else {
      // Done — slide bubble up, then fade out overlay
      schedule(() => {
        phase.value = 'done'
        schedule(() => {
          gsap.to(overlayRef.value, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => emit('done', selectedQuery),
          })
        }, 350)
      }, 500)
    }
  }

  schedule(nextPhrase, 700)
}

onMounted(() => schedule(startTyping, 300))
onUnmounted(() => timeouts.forEach(clearTimeout))
</script>

<template>
  <div
    ref="overlayRef"
    role="region"
    aria-label="Portfolio loading"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface px-6 gap-4"
  >
    <!-- Chat input (typing phase) -->
    <Transition name="slide-up">
      <div v-if="phase === 'typing' || phase === 'sent'" class="w-full max-w-lg">
        <div
          class="flex items-center gap-3 rounded-xl border px-4 py-3.5 shadow-lg shadow-black/40 transition-colors duration-300"
          :class="phase === 'sent' ? 'border-primary/40 bg-card' : 'border-white/10 bg-card'"
        >
          <span class="flex-1 font-mono text-sm text-gray-200 min-h-[1.25rem]">
            {{ typedText
            }}<span
              v-if="showCursor"
              aria-hidden="true"
              class="inline-block w-0.5 h-4 bg-primary ml-px align-middle"
              style="animation: blink 0.9s step-end infinite"
            />
          </span>
          <!-- Arrow animates to a check on send -->
          <Transition name="icon-swap" mode="out-in">
            <svg
              v-if="phase === 'typing'"
              key="arrow"
              aria-hidden="true"
              focusable="false"
              class="w-4 h-4 text-gray-600 shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <svg
              v-else
              key="check"
              aria-label="Sent"
              focusable="false"
              class="w-4 h-4 text-primary shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </Transition>
        </div>
      </div>
    </Transition>

    <!-- Processing response bubble -->
    <Transition name="bubble-in">
      <div v-if="phase === 'processing'" class="w-full max-w-lg" role="status">
        <div class="flex items-center gap-3 rounded-xl border border-white/5 bg-card px-4 py-3.5 shadow-lg shadow-black/40">
          <!-- Bouncing dots -->
          <div aria-hidden="true" class="flex gap-1 shrink-0">
            <span
              v-for="n in 3"
              :key="n"
              class="h-1.5 w-1.5 rounded-full bg-primary"
              :style="{ animation: `dotBounce 1s ease-in-out infinite`, animationDelay: `${(n - 1) * 0.18}s` }"
            />
          </div>

          <!-- Cycling phrase — fixed-height container prevents box resizing -->
          <div class="relative flex-1 h-4 overflow-hidden" aria-live="polite" aria-atomic="true">
            <Transition name="phrase" mode="out-in">
              <span
                :key="currentProcessingPhrase"
                class="absolute inset-0 font-mono text-xs text-gray-500 tracking-wide whitespace-nowrap"
              >
                {{ currentProcessingPhrase }}
              </span>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
}
</style>

<style scoped>

/* Input slides up when processing begins */
.slide-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Processing bubble rises in, then fades up on done */
.bubble-in-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.bubble-in-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.bubble-in-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.bubble-in-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Phrase swap */
.phrase-enter-active {
  transition: opacity 0.2s ease;
}
.phrase-leave-active {
  transition: opacity 0.15s ease;
}
.phrase-enter-from,
.phrase-leave-to {
  opacity: 0;
}

/* Arrow → check icon swap */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
