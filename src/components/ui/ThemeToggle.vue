<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    @click="toggle"
    class="p-1.5 rounded-lg transition-all duration-200 hover:bg-white/5 active:scale-90 cursor-pointer"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Transition name="icon-swap" mode="out-in">
      <!-- Sun: shown in dark mode, click to go light -->
      <svg
        v-if="isDark"
        key="sun"
        class="w-4 h-4 text-gray-500"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </svg>
      <!-- Moon: shown in light mode, click to go dark -->
      <svg
        v-else
        key="moon"
        class="w-4 h-4 text-gray-500"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </Transition>
  </button>
</template>

<style scoped>
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-30deg);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(30deg);
}
</style>
