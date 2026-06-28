import { describe, it, expect } from 'vitest'
import { skills } from '@/data/skills'

describe('skills data', () => {
  it('contains at least one skill group', () => {
    expect(skills.length).toBeGreaterThan(0)
  })

  it('every group has a non-empty category and items list', () => {
    for (const group of skills) {
      expect(group.category).toBeTruthy()
      expect(group.items.length).toBeGreaterThan(0)
    }
  })
})
