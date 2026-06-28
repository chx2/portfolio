import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { experience } from './src/data/experience.ts'
import { projects } from './src/data/projects.ts'
import { skills } from './src/data/skills.ts'
import { about } from './src/data/about.ts'
import { contact } from './src/data/contact.ts'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function generateStaticHtml(): string {
  const aboutParagraphs = about
    .split('\n\n')
    .map(p => `      <p>${esc(p.trim())}</p>`)
    .join('\n')

  const experienceHtml = experience
    .map(e =>
      [
        `      <h3>${esc(e.role)} — ${esc(e.company)}</h3>`,
        `      <p>${esc(e.period)}</p>`,
        `      <ul>`,
        ...e.bullets.map(b => `        <li>${esc(b)}</li>`),
        `      </ul>`,
      ].join('\n'),
    )
    .join('\n\n')

  const projectsHtml = projects
    .map(p => {
      const links = [
        p.liveUrl ? `<a href="${esc(p.liveUrl)}" target="_blank" rel="noopener noreferrer">Live site</a>` : null,
        p.repoUrl ? `<a href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer">Source</a>` : null,
      ]
        .filter(Boolean)
        .join(', ')
      return [
        `      <h3>${esc(p.title)}</h3>`,
        `      <p>${esc(p.description)}</p>`,
        `      <p>${esc(p.tech.join(', '))}${links ? ` — ${links}` : ''}</p>`,
      ].join('\n')
    })
    .join('\n\n')

  const skillsHtml = skills
    .map(s => `        <dt>${esc(s.category)}</dt><dd>${esc(s.items.join(', '))}</dd>`)
    .join('\n')

  return `\
      <p class="back-link"><a href="/">← Back to full site</a></p>

      <h1>Chris Hackett</h1>
      <p>Full-Stack Software Engineer</p>

      <h2>About</h2>
${aboutParagraphs}

      <h2>Experience</h2>

${experienceHtml}

      <h2>Projects</h2>

${projectsHtml}

      <h2>Skills</h2>
      <dl>
${skillsHtml}
      </dl>

      <h2>Contact</h2>
      <p>
        <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a><br>
        <a href="${esc(contact.github.url)}" target="_blank" rel="noopener noreferrer">${esc(contact.github.display)}</a><br>
        <a href="${esc(contact.linkedin.url)}" target="_blank" rel="noopener noreferrer">${esc(contact.linkedin.display)}</a>
      </p>
    `
}

function staticContentPlugin(): Plugin {
  return {
    name: 'static-content',
    transformIndexHtml(html) {
      return html.replace('<!-- STATIC_CONTENT -->', generateStaticHtml())
    },
  }
}

export default defineConfig({
  plugins: [vue(), staticContentPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
