<script setup lang="ts">
import { ref } from 'vue'
import ChatIntro from '@/components/ui/ChatIntro.vue'
import ChatPortfolio from '@/components/ChatPortfolio.vue'

const introComplete = ref(false)
const introQuery = ref('')
</script>

<template>
  <ChatIntro v-if="!introComplete" @done="(q: string) => { introComplete = true; introQuery = q }" />

  <Transition name="main-fade">
    <ChatPortfolio v-if="introComplete" :query="introQuery" />
  </Transition>
</template>

<style>
.main-fade-enter-active {
  transition: opacity 0.8s ease;
}
.main-fade-enter-from {
  opacity: 0;
}
</style>
