import {
  AUTHOR_NAME,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL
} from "@/data/site"
import { getMessages } from "@/i18n"
import type { Locale } from "@/lib/locale"
import emailjs from "@emailjs/browser"

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const replyTemplateId =
  process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID || templateId
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

export type ContactPayload = {
  name: string
  email: string
  company: string
  project: string
  locale: Locale
}

type MailRole = "visitor" | "owner"

const interpolate = (template: string, vars: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "")

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const textBlock = (value: string) =>
  escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />")

export const isContactMailConfigured = () =>
  Boolean(serviceId && templateId && publicKey)

const fieldRow = (label: string, value: string, last = false) => {
  if (!value) return ""

  return `
    <tr>
      <td style="padding:${last ? "14px 0 0" : "14px 0"};${
        last ? "" : "border-bottom:1px solid rgba(148,163,184,0.16);"
      }">
        <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8b9cb3;">${escapeHtml(label)}</div>
        <div style="margin-top:6px;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.6;color:#f8fafc;">${textBlock(value)}</div>
      </td>
    </tr>`
}

const brandedHtml = ({
  locale,
  preheader,
  kicker,
  headline,
  intro,
  copyLabel,
  fieldsHtml,
  ctaLabel,
  ctaHref,
  footer,
  signoff
}: {
  locale: Locale
  preheader: string
  kicker: string
  headline: string
  intro: string
  copyLabel: string
  fieldsHtml: string
  ctaLabel: string
  ctaHref: string
  footer: string
  signoff?: string
}) => {
  const logoSrc = `${SITE_URL}${SITE_LOGO}`
  const homeHref = locale === "es" ? `${SITE_URL}/es` : SITE_URL

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${escapeHtml(headline)}</title>
</head>
<body style="margin:0;padding:0;background:#0a1224;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a1224;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#0f172a;border:1px solid rgba(148,163,184,0.18);border-radius:18px;overflow:hidden;">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#20e0d2 0%,#3d7bff 52%,#ab55f7 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle" style="width:44px;">
                    <a href="${homeHref}" style="text-decoration:none;">
                      <img src="${logoSrc}" alt="${escapeHtml(SITE_NAME)}" width="40" height="40" style="display:block;border:0;border-radius:10px;background:#000;" />
                    </a>
                  </td>
                  <td valign="middle" style="padding-left:12px;">
                    <div style="font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;letter-spacing:-0.02em;color:#f8fafc;">${escapeHtml(SITE_NAME)}</div>
                    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:12px;color:#20e0d2;">santiago@dev · ~/contact</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px;">
              <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#17c3b2;">● ${escapeHtml(kicker)}</div>
              <h1 style="margin:10px 0 0;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:28px;line-height:1.2;letter-spacing:-0.03em;color:#f8fafc;font-weight:800;">${escapeHtml(headline)}</h1>
              <p style="margin:14px 0 0;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:1.65;color:#cbd5e1;">${escapeHtml(intro)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#151d2e;border:1px solid rgba(148,163,184,0.16);border-radius:14px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8b9cb3;margin-bottom:4px;">${escapeHtml(copyLabel)}</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${fieldsHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${
            signoff
              ? `<tr>
            <td style="padding:8px 32px 0;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:15px;color:#94a3b8;">
              — ${escapeHtml(signoff)}
            </td>
          </tr>`
              : ""
          }
          <tr>
            <td align="left" style="padding:24px 32px 8px;">
              <a href="${ctaHref}" style="display:inline-block;padding:12px 20px;background:#17c3b2;color:#0a1224;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">${escapeHtml(ctaLabel)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid rgba(148,163,184,0.12);">
              <p style="margin:0;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.6;color:#8b9cb3;">${escapeHtml(footer)}</p>
              <p style="margin:10px 0 0;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:12px;">
                <a href="${LINKEDIN_URL}" style="color:#20e0d2;text-decoration:none;">LinkedIn</a>
                <span style="color:#475569;"> · </span>
                <a href="${GITHUB_URL}" style="color:#20e0d2;text-decoration:none;">GitHub</a>
                <span style="color:#475569;"> · </span>
                <a href="${homeHref}" style="color:#20e0d2;text-decoration:none;">${escapeHtml(SITE_NAME)}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

const brandedText = ({
  kicker,
  headline,
  intro,
  copyLabel,
  fields,
  ctaHref,
  footer,
  signoff
}: {
  kicker: string
  headline: string
  intro: string
  copyLabel: string
  fields: string[]
  ctaHref: string
  footer: string
  signoff?: string
}) =>
  [
    `${SITE_NAME}`,
    `santiago@dev · ~/contact · ${kicker}`,
    "",
    headline,
    intro,
    "",
    copyLabel,
    ...fields,
    "",
    signoff ? `— ${signoff}` : "",
    ctaHref,
    footer
  ]
    .filter(line => line !== "")
    .join("\n")

const buildMail = (role: MailRole, payload: ContactPayload) => {
  const t = getMessages(payload.locale).contact.mail
  const vars = {
    name: payload.name,
    email: payload.email,
    locale: t.localeName
  }
  const copy = role === "visitor" ? t.visitor : t.owner
  const fieldsHtml = [
    fieldRow(t.fields.name, payload.name),
    fieldRow(t.fields.email, payload.email),
    fieldRow(t.fields.company, payload.company),
    fieldRow(t.fields.project, payload.project, true)
  ].join("")
  const fieldLines = [
    `${t.fields.name}: ${payload.name}`,
    `${t.fields.email}: ${payload.email}`,
    payload.company ? `${t.fields.company}: ${payload.company}` : "",
    `${t.fields.project}:`,
    payload.project
  ].filter(Boolean)

  const intro = interpolate(copy.intro, vars)
  const headline = copy.headline
  const preheader = interpolate(copy.preheader, vars)
  const subject = interpolate(copy.subject, vars)
  const homeHref = payload.locale === "es" ? `${SITE_URL}/es` : SITE_URL
  const ctaHref =
    role === "owner" ? `mailto:${payload.email}` : homeHref
  const ctaLabel =
    role === "owner"
      ? interpolate(t.owner.replyCta, vars)
      : t.visitor.cta

  return {
    subject,
    html: brandedHtml({
      locale: payload.locale,
      preheader,
      kicker: copy.kicker,
      headline,
      intro,
      copyLabel: copy.copyLabel,
      fieldsHtml,
      ctaLabel,
      ctaHref,
      footer: copy.footer,
      signoff: role === "visitor" ? t.visitor.signoff : undefined
    }),
    text: brandedText({
      kicker: copy.kicker,
      headline,
      intro,
      copyLabel: copy.copyLabel,
      fields: fieldLines,
      ctaHref,
      footer: copy.footer,
      signoff: role === "visitor" ? t.visitor.signoff : undefined
    })
  }
}

const sendOne = async (
  template: string,
  params: Record<string, string>
) => {
  if (!serviceId || !publicKey) {
    return false
  }

  try {
    await emailjs.send(serviceId, template, params, { publicKey })
    return true
  } catch (error) {
    console.error("EmailJS error", error)
    return false
  }
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const templateParams = (
  payload: ContactPayload,
  mail: ReturnType<typeof buildMail>,
  toEmail: string,
  fromName: string,
  replyTo: string
) => ({
  to_email: toEmail,
  from_name: fromName,
  from_email: payload.email,
  user_name: payload.name,
  user_email: payload.email,
  user_company: payload.company,
  message: payload.project,
  reply_to: replyTo,
  subject: mail.subject,
  html_body: mail.html,
  text_body: mail.text,
  locale: payload.locale
})

export const sendContactMails = async (
  payload: ContactPayload
): Promise<"sent" | "fallback" | "error"> => {
  if (!isContactMailConfigured() || !templateId) {
    return "fallback"
  }

  const owner = buildMail("owner", payload)
  const visitor = buildMail("visitor", payload)

  const ownerOk = await sendOne(
    templateId,
    templateParams(
      payload,
      owner,
      CONTACT_EMAIL,
      `${payload.name} via ${SITE_NAME}`,
      payload.email
    )
  )

  if (!ownerOk) {
    return "error"
  }

  // EmailJS free plan allows 1 request per second.
  await wait(1100)

  const visitorOk = await sendOne(
    replyTemplateId || templateId,
    templateParams(
      payload,
      visitor,
      payload.email,
      `${AUTHOR_NAME} · ${SITE_NAME}`,
      CONTACT_EMAIL
    )
  )

  return visitorOk ? "sent" : "error"
}

export const contactMailtoHref = (payload: ContactPayload) => {
  const owner = buildMail("owner", payload)
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : "",
    "",
    payload.project
  ]
  const bodyText = lines
    .filter((line, index, all) => line !== "" || all[index - 1] !== "")
    .join("\n")

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(owner.subject)}&body=${encodeURIComponent(bodyText)}`
}
