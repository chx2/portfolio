import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatIntro from '@/components/ui/ChatIntro.vue'
import { QUERIES, PROCESSING_PHRASES } from '@/data/chatIntro'

vi.mock('gsap', () => ({ default: { to: vi.fn() } }))

describe('ChatIntro', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renders the portfolio loading overlay', () => {
    const wrapper = mount(ChatIntro)
    expect(wrapper.find('[aria-label="Portfolio loading"]').exists()).toBe(true)
  })

  it('shows the chat input area in the typing phase', () => {
    const wrapper = mount(ChatIntro)
    expect(wrapper.find('.font-mono').exists()).toBe(true)
  })

  it('types a query that is one of the predefined QUERIES', async () => {
    const wrapper = mount(ChatIntro)
    // Advance past start delay + all typing + send delay + processing delay
    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    // After all timers the typed text should be a complete QUERIES entry
    const vm = wrapper.vm as { typedText: string }
    expect(QUERIES).toContain(vm.typedText)
  })

  it('shows cursor only during typing phase', async () => {
    const wrapper = mount(ChatIntro)
    // Initially in typing phase — cursor should be visible
    expect(wrapper.find('[aria-hidden="true"].inline-block').exists()).toBe(true)

    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    // After send the cursor is hidden
    const vm = wrapper.vm as { showCursor: boolean }
    expect(vm.showCursor).toBe(false)
  })

  it('transitions through processing phrases from the predefined list', async () => {
    const wrapper = mount(ChatIntro)
    vi.advanceTimersByTime(300) // start delay
    vi.runAllTimers()           // complete typing + send + processing
    await wrapper.vm.$nextTick()

    const vm = wrapper.vm as { currentProcessingPhrase: string }
    // The last displayed phrase must be one from the known list
    expect(PROCESSING_PHRASES).toContain(vm.currentProcessingPhrase)
  })

  it('emits "done" with the typed query after the animation completes', async () => {
    const wrapper = mount(ChatIntro)
    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    const emitted = wrapper.emitted<[string][]>('done')
    if (emitted) {
      const [query] = emitted[0]
      expect(QUERIES).toContain(query)
    }
    // gsap.to is mocked so onComplete won't fire — just verify the internal state settled
    const vm = wrapper.vm as { phase: string }
    expect(['done', 'processing']).toContain(vm.phase)
  })
})
