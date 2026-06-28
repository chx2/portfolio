import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '@/composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('toggle flips isDark', () => {
    const { isDark, toggle } = useTheme()
    const before = isDark.value
    toggle()
    expect(isDark.value).toBe(!before)
    toggle() // restore
  })

  it('toggle syncs dark class on documentElement', () => {
    const { isDark, toggle } = useTheme()
    toggle()
    expect(document.documentElement.classList.contains('dark')).toBe(isDark.value)
    toggle() // restore
  })

  it('toggle persists preference to localStorage', () => {
    const { isDark, toggle } = useTheme()
    toggle()
    expect(localStorage.getItem('theme')).toBe(isDark.value ? 'dark' : 'light')
    toggle() // restore
  })
})
