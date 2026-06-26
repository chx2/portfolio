<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ content: string }>()

const displayed = ref('')
const showCursor = ref(true)
let timeouts: ReturnType<typeof setTimeout>[] = []

function schedule(fn: () => void, ms: number) {
  const id = setTimeout(fn, ms)
  timeouts.push(id)
}

onMounted(() => {
  let i = 0

  function typeNext() {
    if (i < props.content.length) {
      displayed.value += props.content[i]
      i++
      schedule(typeNext, 12 + Math.random() * 6)
    } else {
      schedule(() => { showCursor.value = false }, 700)
    }
  }

  schedule(typeNext, 40)
})

onUnmounted(() => timeouts.forEach(clearTimeout))
</script>

<template>
  <span>{{ displayed }}<span
    v-if="showCursor"
    aria-hidden="true"
    class="inline-block w-0.5 h-[1em] bg-primary ml-px align-middle"
    style="animation: blink 0.9s step-end infinite"
  /></span>
</template>

<style scoped>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
