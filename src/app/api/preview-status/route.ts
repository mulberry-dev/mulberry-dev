import { data as projects } from "@/data/projects"
import { hasLivePreview } from "@/lib/projects"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const normalize = (value: string) => value.replace(/\/+$/, "")

const allowed = new Set(
  projects.filter(hasLivePreview).map(project => normalize(project.url))
)

const probe = async (url: string, signal: AbortSignal) => {
  const headers = { "User-Agent": "mulberry-dev-preview-check" }
  const head = await fetch(url, {
    method: "HEAD",
    redirect: "follow",
    cache: "no-store",
    signal,
    headers
  })

  if (head.status !== 405 && head.status !== 501) {
    return head
  }

  return fetch(url, {
    method: "GET",
    redirect: "follow",
    cache: "no-store",
    signal,
    headers
  })
}

export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("url")
  const normalized = target ? normalize(target) : ""

  if (!normalized || !allowed.has(normalized)) {
    return NextResponse.json({ live: false }, { status: 400 })
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 4000)

  try {
    const response = await probe(target as string, controller.signal)
    clearTimeout(timer)

    return NextResponse.json(
      {
        live: response.ok,
        paused: response.headers.get("x-vercel-error") === "DEPLOYMENT_PAUSED"
      },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch {
    clearTimeout(timer)
    return NextResponse.json(
      { live: false },
      { headers: { "Cache-Control": "no-store" } }
    )
  }
}
