export interface SkillGroup {
  category: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'PHP', 'Python'],
  },
  {
    category: 'Frontend',
    items: ['Vue 2/3', 'React', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Backend',
    items: ['Django', 'Laravel', 'Express', 'Hono', 'Edge Functions(serverless)'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'Vite', 'Cloudflare Workers', 'Supabase'],
  },
  {
    category: 'Misc',
    items: ['REST', 'WebSockets', 'MCP', 'CI/CD', 'Agile'],
  },
]
