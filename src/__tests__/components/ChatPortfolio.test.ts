import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ChatPortfolio from '@/components/ChatPortfolio.vue'
import { projects } from '@/data/projects'
import { experience } from '@/data/experience'
import { skills } from '@/data/skills'
import { about } from '@/data/about'
import { contact } from '@/data/contact'

// ThemeToggle uses localStorage — stub it out
vi.mock('@/components/ui/ThemeToggle.vue', () => ({
  default: { template: '<div />' },
}))

async function advanceAndFlush(ms: number) {
  vi.advanceTimersByTime(ms)
  await flushPromises()
}

describe('ChatPortfolio', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // jsdom doesn't implement scrollTo on elements
    Element.prototype.scrollTo = vi.fn() as typeof Element.prototype.scrollTo
  })
  afterEach(() => vi.useRealTimers())

  function mountWithQuery(query = 'Who is chris hackett?') {
    return mount(ChatPortfolio, { props: { query } })
  }

  // --- Initial load ---

  it('renders the user query as the first message', async () => {
    const wrapper = mountWithQuery('Who is chris hackett?')
    await flushPromises()
    expect(wrapper.text()).toContain('Who is chris hackett?')
  })

  it('displays the about text from data/about.ts after the initial delay', async () => {
    const wrapper = mountWithQuery()
    // 900ms responding delay + 200ms render delay
    await advanceAndFlush(1200)
    expect(wrapper.text()).toContain(about.slice(0, 40))
  })

  // --- Projects ---

  it('renders every project title from data/projects.ts when the projects option is selected', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200) // initial about message

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('projects')
    await advanceAndFlush(800) // 500ms respond + 200ms render

    for (const proj of projects) {
      expect(wrapper.text()).toContain(proj.title)
    }
  })

  it('renders every project description from data/projects.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('projects')
    await advanceAndFlush(800)

    for (const proj of projects) {
      expect(wrapper.text()).toContain(proj.description)
    }
  })

  it('renders all tech tags for each project', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('projects')
    await advanceAndFlush(800)

    for (const proj of projects) {
      for (const tag of proj.tech) {
        expect(wrapper.text()).toContain(tag)
      }
    }
  })

  it('renders GitHub and Live links for projects that have them', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('projects')
    await advanceAndFlush(800)

    const anchors = wrapper.findAll('a')
    const hrefs = anchors.map((a) => a.attributes('href') ?? '')

    for (const proj of projects) {
      if (proj.repoUrl) expect(hrefs).toContain(proj.repoUrl)
      if (proj.liveUrl) expect(hrefs).toContain(proj.liveUrl)
    }
  })

  // --- Experience ---

  it('renders every role and company from data/experience.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('experience')
    await advanceAndFlush(800)

    for (const exp of experience) {
      expect(wrapper.text()).toContain(exp.role)
      expect(wrapper.text()).toContain(exp.company)
    }
  })

  it('renders bullet points for every experience entry', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('experience')
    await advanceAndFlush(800)

    for (const exp of experience) {
      for (const bullet of exp.bullets) {
        expect(wrapper.text()).toContain(bullet)
      }
    }
  })

  // --- Skills ---

  it('renders every skill category from data/skills.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('skills')
    await advanceAndFlush(800)

    for (const group of skills) {
      expect(wrapper.text()).toContain(group.category)
    }
  })

  it('renders every skill item from data/skills.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('skills')
    await advanceAndFlush(800)

    for (const group of skills) {
      for (const item of group.items) {
        expect(wrapper.text()).toContain(item)
      }
    }
  })

  // --- Contact ---

  it('renders the email address from data/contact.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('contact')
    await advanceAndFlush(800)

    expect(wrapper.text()).toContain(contact.email)
  })

  it('renders GitHub and LinkedIn display names from data/contact.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('contact')
    await advanceAndFlush(800)

    expect(wrapper.text()).toContain(contact.github.display)
    expect(wrapper.text()).toContain(contact.linkedin.display)
  })

  it('renders mailto href for the email from data/contact.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('contact')
    await advanceAndFlush(800)

    const mailto = wrapper.find(`a[href="mailto:${contact.email}"]`)
    expect(mailto.exists()).toBe(true)
  })

  it('renders the GitHub profile link from data/contact.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('contact')
    await advanceAndFlush(800)

    const githubLink = wrapper.find(`a[href="${contact.github.url}"]`)
    expect(githubLink.exists()).toBe(true)
  })

  it('renders the LinkedIn profile link from data/contact.ts', async () => {
    const wrapper = mountWithQuery()
    await advanceAndFlush(1200)

    const vm = wrapper.vm as unknown as { handleOption: (o: string) => void }
    vm.handleOption('contact')
    await advanceAndFlush(800)

    const linkedinLink = wrapper.find(`a[href="${contact.linkedin.url}"]`)
    expect(linkedinLink.exists()).toBe(true)
  })
})
