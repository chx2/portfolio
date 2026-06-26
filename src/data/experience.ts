export interface Experience {
  role: string
  company: string
  period: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Full-Stack Developer',
    company: 'IMT Insurance',
    period: '2020 — Present',
    bullets: [
      'Building full-stack applications using Vue to tie into backend microservices built in Laravel and Django.',
      'Contributing reusable components into in-house component framework to align with brand styling.',
      'Using and contributing to internal tooling ranging from local scripting to AI tooling to improve developer experience and productivity.',
      'Providing feedback to other developers through a code review process from both a developer and QA perspective.',
      'Working with legacy development teams to advocate for modern programming practices.',
    ],
  },
  {
    role: 'Teaching Assistant',
    company: 'Trilogy Education',
    period: '2020 — 2021',
    bullets: [
      'Assisting students with coursework in full-stack JavaScript courses.',
      'Working with fellow TAs and professor to craft lesson plans.',
      'Providing helpful feedback for students through coursework and in-class assignments.',
    ],
  },
  {
    role: 'Web Application Developer',
    company: 'Amplimark LLC',
    period: '2019 — 2020',
    bullets: [
      'Converted wireframes/markups into functioning websites and applications.',
      'Consulted clients to discuss requirements during application planning phases.',
      'Maintained existing client sites and applications through requested layout and functionality updates.',
    ],
  },
]
