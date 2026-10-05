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

const DEFAULT_PORTS: Record<string, string> = { "http:": "80", "https:": "443" }

const parseOrigin = (value: string | null) => {
  if (!value) {
    return null
  }

  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:" ? url : null
  } catch {
    return null
  }
}

const schemeAllows = (scheme: string, parent: URL) =>
  scheme === parent.protocol || (scheme === "http:" && parent.protocol === "https:")

const HOST_SOURCE =
  /^(?:([a-z][a-z0-9+.-]*):\/\/)?(\*|(?:\*\.)?[a-z0-9.-]+)(?::(\*|\d+))?(?:\/.*)?$/

const sourceAllows = (source: string, parent: URL, target: URL) => {
  const token = source.toLowerCase()

  if (token === "'self'") {
    return parent.origin === target.origin
  }

  if (token === "*") {
    return true
  }

  if (/^[a-z][a-z0-9+.-]*:$/.test(token)) {
    return schemeAllows(token, parent)
  }

  const match = HOST_SOURCE.exec(token)

  if (!match) {
    return false
  }

  const [, scheme, host, port] = match

  if (!schemeAllows(scheme ? `${scheme}:` : target.protocol, parent)) {
    return false
  }

  if (host.startsWith("*.")) {
    if (!parent.hostname.endsWith(host.slice(1))) {
      return false
    }
  } else if (host !== "*" && host !== parent.hostname) {
    return false
  }

  if (port === "*") {
    return true
  }

  const parentPort = parent.port || DEFAULT_PORTS[parent.protocol]
  return parentPort === (port ?? DEFAULT_PORTS[parent.protocol])
}

// Browsers ignore X-Frame-Options when any enforced policy sets frame-ancestors.
const canEmbedFrom = (response: Response, parent: URL, target: URL) => {
  const csp = response.headers.get("content-security-policy") ?? ""
  const policies = csp
    .split(",")
    .map(policy => /(?:^|;)\s*frame-ancestors\b([^;]*)/i.exec(policy)?.[1])
    .filter((sources): sources is string => sources !== undefined)

  if (policies.length) {
    return policies.every(sources =>
      sources
        .trim()
        .split(/\s+/)
        .some(source => sourceAllows(source, parent, target))
    )
  }

  const xfo = response.headers.get("x-frame-options")?.trim().toLowerCase()

  if (xfo === "deny") {
    return false
  }

  if (xfo === "sameorigin") {
    return parent.origin === target.origin
  }

  return true
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const target = searchParams.get("url")
  const normalized = target ? normalize(target) : ""

  if (!normalized || !allowed.has(normalized)) {
    return NextResponse.json({ live: false }, { status: 400 })
  }

  const parent = parseOrigin(searchParams.get("origin")) ?? new URL(origin)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 4000)

  try {
    const response = await probe(target as string, controller.signal)
    clearTimeout(timer)
    const finalUrl = new URL(response.url || (target as string))

    return NextResponse.json(
      {
        live: response.ok,
        paused: response.headers.get("x-vercel-error") === "DEPLOYMENT_PAUSED",
        embeddable: response.ok && canEmbedFrom(response, parent, finalUrl)
      },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch {
    clearTimeout(timer)
    return NextResponse.json(
      { live: false, uncertain: true },
      { headers: { "Cache-Control": "no-store" } }
    )
  }
}
