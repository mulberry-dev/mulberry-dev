import { CONTACT_EMAIL } from "@/data/site"
import { NextResponse } from "next/server"

type ContactBody = {
  name?: unknown
  email?: unknown
  company?: unknown
  project?: unknown
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export async function POST(request: Request) {
  let body: ContactBody

  try {
    body = (await request.json()) as ContactBody
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const name = isNonEmptyString(body.name) ? body.name.trim() : ""
  const email = isNonEmptyString(body.email) ? body.email.trim() : ""
  const company = typeof body.company === "string" ? body.company.trim() : ""
  const project = isNonEmptyString(body.project) ? body.project.trim() : ""

  if (!name || !email || !isEmail(email) || !project) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({ ok: false, fallback: true }, { status: 503 })
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    project
  ].filter((line): line is string => line !== null)

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Mulberry Dev <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      reply_to: email,
      subject: `Project inquiry from ${name}`,
      text: lines.join("\n")
    })
  })

  if (!response.ok) {
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
