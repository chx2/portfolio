import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnim(target: Ref<HTMLElement | null>, delay = 0) {
  let trigger: ScrollTrigger | undefined

  onMounted(() => {
    if (!target.value) return

    gsap.from(target.value, {
      opacity: 0,
      y: 40,
      duration: 0.75,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target.value,
        start: 'top 85%',
        once: true,
      },
    })
  })

  onUnmounted(() => trigger?.kill())
}
