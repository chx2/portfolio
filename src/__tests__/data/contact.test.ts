import { describe, it, expect } from 'vitest'
import { contact } from '@/data/contact'

describe('contact data', () => {
  it('has a valid email address', () => {
    expect(contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('has a GitHub url and display name', () => {
    expect(contact.github.url).toMatch(/^https:\/\/github\.com\//)
    expect(contact.github.display).toBeTruthy()
  })

  it('has a LinkedIn url and display name', () => {
    expect(contact.linkedin.url).toMatch(/^https:\/\/linkedin\.com\//)
    expect(contact.linkedin.display).toBeTruthy()
  })
})
