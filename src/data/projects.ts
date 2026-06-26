export interface Project {
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    title: 'Portfolio',
    description: 'Personal platform listing experience, and projects.',
    tech: ['Vue 3', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://chrish.me',
  },
  {
    title: 'Forged In Trivia',
    description: 'A web-based trivia game feature several game modes and thousands of trivia questions. Questions are sourced from public apis as well as using local LLM models to parse topic information into trivia questions.',
    tech: ['Vue 3', 'TypeScript', 'Hono', 'Cloudflare Workers'],
    liveUrl: 'https://forgedintrivia.com/',
  },
  {
    title: 'Paid Media Support',
    description: 'Job board for Paid Media job listings integrating with third-party job providers alongside OpenAI technology.',
    tech: ['Vue 3', 'TypeScript', 'OpenAI'],
    liveUrl: 'https://paidmedia.support',
  },
  {
    title: 'Tipoff',
    description: 'Open-source suite for escape rooms including management, online ecommerce, and site/blog support.',
    tech: ['PHP', 'Laravel', 'Vue'],
    repoUrl: 'https://github.com/tipoff',
  },
]
