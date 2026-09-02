import { isHoneypotTriggered, isTooFastSubmission } from "@/lib/contact/antiSpam"
import { checkRateLimit } from "@/lib/contact/rateLimit"
import { sendContactEmail } from "@/lib/contact/sendContactEmail"
import { validateContact } from "@/lib/contact/validateContact"

export type ProcessResult = {
  status: number
  body: Record<string, unknown>
  headers?: Record<string, string>
}

/**
 * Shared contact submission core used by POST /api/contact.
 */
export const processContactSubmission = async (
  body: unknown,
  options: { clientKey?: string } = {}
): Promise<ProcessResult> => {
  if (isHoneypotTriggered(body) || isTooFastSubmission(body)) {
    return {
      status: 200,
      body: { ok: true }
    }
  }

  const clientKey = options.clientKey || "anonymous"
  const rate = checkRateLimit(clientKey)
  if (!rate.allowed) {
    return {
      status: 429,
      body: { ok: false, error: "rate_limited" },
      headers: rate.retryAfterSec
        ? { "Retry-After": String(rate.retryAfterSec) }
        : undefined
    }
  }

  const validated = validateContact(body)
  if (!validated.ok) {
    return {
      status: 400,
      body: { ok: false, error: "validation_failed" }
    }
  }

  const result = await sendContactEmail(validated.data)
  if (!result.ok) {
    const status = result.error === "email_not_configured" ? 503 : 502
    return {
      status,
      body: { ok: false, error: "submit_failed" }
    }
  }

  return {
    status: 200,
    body: { ok: true }
  }
}

export const getClientKey = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")
  const raw =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  return raw.slice(0, 128)
}
