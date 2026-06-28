import { describe, it, expect } from 'vitest'
import { experience } from '@/data/experience'

describe('experience data', () => {
  it('contains at least one entry', () => {
    expect(experience.length).toBeGreaterThan(0)
  })

  it('every entry has role, company, period, and bullets', () => {
    for (const entry of experience) {
      expect(entry.role).toBeTruthy()
      expect(entry.company).toBeTruthy()
      expect(entry.period).toBeTruthy()
      expect(entry.bullets.length).toBeGreaterThan(0)
    }
  })
})
