import type { Locale } from "@/lib/locale"

export type ProjectHighlightCopy = {
  title: string
  text: string
}

export type ProjectCopy = {
  teaser: string
  description: string
  highlights: ProjectHighlightCopy[]
}

export type Messages = {
  locale: Locale
  htmlLang: string
  skipToContent: string
  nav: {
    home: string
    about: string
    skills: string
    portfolio: string
    certifications: string
    contact: string
    primary: string
    openMenu: string
    closeMenu: string
    onThisPage: string
  }
  language: {
    label: string
    en: string
    es: string
  }
  site: {
    title: string
    description: string
    keywords: string[]
    role: string
    location: string
  }
  sections: Record<
    "/" | "/about" | "/skills" | "/portfolio" | "/certifications" | "/contact",
    { title: string; description: string }
  >
  workspace: {
    home: string
    about: string
    skills: string
    work: string
    certifications: string
    contact: string
  }
  home: {
    ariaLabel: string
    greeting: string
    name: string
    roleLead: string
    roleTrail: string
    bodyBefore: string
    bodySolutions: string
    bodyMid: string
    bodyValue: string
    ctaSr: string
    cta: string
  }
  about: {
    ariaLabel: string
    command: string
    headline: string[]
    accentFrom: number
    body: string[]
    whoami: string
    passionsCommand: string
    passions: string[]
    historyCommand: string
    history: { title: string; text: string }[]
    footerQuestion: string
    footerAction: string
    rail: { intro: string; identity: string; path: string }
  }
  skills: {
    ariaLabel: string
    headline: string
    stackTitle: string
    stackLead: string
    capabilities: { title: string; text: string }[]
    interfaces: {
      kicker: string
      items: string[]
    }
    systems: {
      kicker: string
      items: string[]
    }
    connected: {
      kicker: string
      items: string[]
    }
    modernization: {
      kicker: string
      copy: string[]
      legacyLabel: string
      modernLabel: string
      legacy: string[]
      modern: string[]
    }
    approach: {
      kicker: string
      stages: { title: string; text: string }[]
    }
    groups: {
      frontend: string
      backend: string
      databases: string
      devops: string
      tools: string
      ai: string
    }
    rail: {
      intro: string
      frontend: string
      backend: string
      connected: string
      modernize: string
      star: string
    }
  }
  portfolio: {
    ariaLabel: string
    command: string
    archiveCommand: string
    featured: string
    year: string
    type: string
    stack: string
    viewCase: string
    view: string
    loading: string
    meta: string
    archiveMeta: string
    archiveNoAi: string
    filters: { all: string; web: string; landing: string; api: string; ecommerce: string }
  }
  certifications: {
    ariaLabel: string
    meta: string
    view: string
    filters: { all: string; security: string; english: string; development: string }
  }
  contact: {
    ariaLabel: string
    command: string
    checking: string
    statusPrefix: string
    availability: string
    supporting: string
    startConversation: string
    selectChannel: string
    opensTab: string
    options: {
      email: { title: string; description: string; cta: string }
      phone: { title: string; description: string; cta: string }
      linkedin: { title: string; description: string; cta: string }
      github: { title: string; description: string; cta: string }
      call: { title: string; description: string; cta: string }
    }
  }
  project: {
    notFound: string
    back: string
    kicker: string
    visit: string
    private: string
    github: string
    year: string
    type: string
    about: string
    features: string
    technologies: string
    previous: string
    next: string
    navLabel: string
    privateTitle: string
    privateText: string
    privateConfirm: string
    leaveTitle: string
    leaveText: string
    leaveStay: string
    leaveGo: string
    preview: string
    previewInteract: string
    previewExit: string
  }
  footer: {
    systemOnline: string
  }
  notFound: {
    title: string
    heading: string
    body: string
    back: string
  }
  categories: {
    web: string
    landing: string
    api: string
    ecommerce: string
  }
  status: {
    live: string
    ongoing: string
    private: string
    noAi: string
    noAiTitle: string
  }
  jsonLd: {
    jobTitle: string
    description: string
  }
  projects: Record<string, ProjectCopy>
}

export const SECTION_PATHS = [
  "/",
  "/about",
  "/skills",
  "/portfolio",
  "/certifications",
  "/contact"
] as const

export type SectionPath = (typeof SECTION_PATHS)[number]
