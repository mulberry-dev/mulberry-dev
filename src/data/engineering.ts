export const ENGINEERING_INTRO = {
  kicker: "How I design",
  title: "Engineering beyond the code",
  lead: "Working software is the baseline. I care whether it can grow, fail safely, and still be changed a year later — turning a business need into a structure a team can keep building on."
}

export const ENGINEERING_DOMAINS: {
  index: string
  title: string
  text: string
  topics: string[]
}[] = [
  {
    index: "01",
    title: "Problem solving",
    text: "I start with the shape of the problem: the data, the constraints, and the cost of the operations — then choose an approach, not a library first.",
    topics: ["Algorithms", "Data Structures", "Complexity"]
  },
  {
    index: "02",
    title: "System design",
    text: "I reason about what happens when usage is no longer a demo: load, growth, and failure paths — not only the happy path on a local machine.",
    topics: [
      "Distributed Systems",
      "Scalability",
      "Performance",
      "Reliability",
      "Fault Tolerance"
    ]
  },
  {
    index: "03",
    title: "Architecture",
    text: "I choose boundaries so the product can evolve without a rewrite. Structure is a decision, not a side effect of shipping features.",
    topics: [
      "Software Architecture",
      "Design Patterns",
      "SOLID",
      "Clean Architecture"
    ]
  },
  {
    index: "04",
    title: "Engineering practices",
    text: "Interfaces and data that other engineers can extend, and tests that make that change safe. Maintainability is part of the design, not a later cleanup.",
    topics: ["API Design", "Database Design", "Testing", "Maintainability"]
  }
]
