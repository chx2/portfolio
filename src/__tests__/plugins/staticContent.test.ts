import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { staticContentPlugin, esc } from '../../../plugins/staticContent'
import { contact } from '../../data/contact'
import { experience } from '../../data/experience'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'

const SAMPLE_HTML = `<!doctype html><html><head></head><body><!-- STATIC_CONTENT --></body></html>`

type TransformResult = { html: string; tags: { tag: string; injectTo: string; children: string }[] }

function runTransform(html = SAMPLE_HTML): TransformResult {
  const plugin = staticContentPlugin()
  // configResolved defaults to process.cwd() which is the project root under vitest
  return (plugin.transformIndexHtml as (html: string) => TransformResult)(html)
}

describe('esc', () => {
  it('escapes ampersands', () => expect(esc('a&b')).toBe('a&amp;b'))
  it('escapes less-than', () => expect(esc('<script>')).toBe('&lt;script&gt;'))
  it('escapes greater-than', () => expect(esc('a>b')).toBe('a&gt;b'))
  it('escapes double quotes', () => expect(esc('"hello"')).toBe('&quot;hello&quot;'))
  it('handles all four characters together', () =>
    expect(esc('<a href="x&y">z</a>')).toBe('&lt;a href=&quot;x&amp;y&quot;&gt;z&lt;/a&gt;'))
  it('returns plain strings unchanged', () => expect(esc('hello world')).toBe('hello world'))
})

describe('staticContentPlugin', () => {
  it('replaces the STATIC_CONTENT placeholder', () => {
    const { html } = runTransform()
    expect(html).not.toContain('<!-- STATIC_CONTENT -->')
    expect(html.length).toBeGreaterThan(SAMPLE_HTML.length)
  })

  it('injects an anti-FOUC <style> tag into head-prepend', () => {
    const { tags } = runTransform()
    const styleTag = tags.find(t => t.tag === 'style' && t.injectTo === 'head-prepend')
    expect(styleTag).toBeDefined()
  })

  it('injected style contains html and html.dark background rules', () => {
    const { tags } = runTransform()
    const { children } = tags.find(t => t.tag === 'style')!
    expect(children).toMatch(/html\{background-color:#[0-9a-fA-F]+\}/)
    expect(children).toMatch(/html\.dark\{background-color:#[0-9a-fA-F]+\}/)
  })

  it('background colors match --color-surface values in style.css', () => {
    const css = fs.readFileSync(path.resolve('src/style.css'), 'utf-8')
    const lightMatch = css.match(/:root\s*\{[^}]*--color-surface:\s*([^;]+);/)
    const darkMatch = css.match(/\.dark\s*\{[^}]*--color-surface:\s*([^;]+);/)
    expect(lightMatch).not.toBeNull()
    expect(darkMatch).not.toBeNull()

    const { tags } = runTransform()
    const { children } = tags.find(t => t.tag === 'style')!
    expect(children).toContain(lightMatch![1].trim())
    expect(children).toContain(darkMatch![1].trim())
  })

  describe('generated static HTML', () => {
    it('contains all five section headings', () => {
      const { html } = runTransform()
      for (const heading of ['About', 'Experience', 'Projects', 'Skills', 'Contact']) {
        expect(html).toContain(`<h2>${heading}</h2>`)
      }
    })

    it('includes the first experience entry', () => {
      const { html } = runTransform()
      expect(html).toContain(experience[0].company)
      expect(html).toContain(experience[0].role)
    })

    it('includes the first project title', () => {
      const { html } = runTransform()
      expect(html).toContain(projects[0].title)
    })

    it('includes the first skill category', () => {
      const { html } = runTransform()
      expect(html).toContain(skills[0].category)
    })

    it('includes contact email and links', () => {
      const { html } = runTransform()
      expect(html).toContain(contact.email)
      expect(html).toContain(contact.github.url)
      expect(html).toContain(contact.linkedin.url)
    })
  })
})
