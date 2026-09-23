import { spawn } from "node:child_process"
import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
const userData = mkdtempSync(join(tmpdir(), "mulberry-edge-"))
const port = 9333
const browser = spawn(
  edge,
  [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userData}`,
    "about:blank"
  ],
  { stdio: "ignore" }
)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const waitForTarget = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`)
      const targets = await response.json()
      const page = targets.find((target) => target.type === "page")
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {
      // Edge is still starting.
    }
    await sleep(250)
  }
  throw new Error("Edge debugging endpoint did not start")
}

const connect = (url) =>
  new Promise((resolve, reject) => {
    const socket = new WebSocket(url)
    let id = 0
    const pending = new Map()
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data)
      if (message.id && pending.has(message.id)) {
        const { resolve: done, reject: fail } = pending.get(message.id)
        pending.delete(message.id)
        if (message.error) fail(new Error(JSON.stringify(message.error)))
        else done(message.result)
      }
    })
    const send = (method, params = {}) =>
      new Promise((done, fail) => {
        const next = ++id
        pending.set(next, { resolve: done, reject: fail })
        socket.send(JSON.stringify({ id: next, method, params }))
      })
    socket.addEventListener("open", () => resolve({ send, socket }))
    socket.addEventListener("error", () => reject(new Error("WebSocket failed")))
  })

const evaluate = async (send, expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  })
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text)
  }
  return result.result.value
}

try {
  const { send, socket } = await connect(await waitForTarget())
  await send("Page.enable")
  await send("Runtime.enable")
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false
  })
  await send("Page.navigate", { url: "http://127.0.0.1:3001/es/portfolio" })
  const expanded = await evaluate(
    send,
    `new Promise((resolve) => {
      const started = Date.now()
      const tick = () => {
        const button = document.querySelector(".archive-more button")
        if (!button && Date.now() - started < 12000) {
          setTimeout(tick, 200)
          return
        }
        if (!button) {
          resolve({ missing: true, href: location.href, text: document.body.innerText.slice(0, 180) })
          return
        }
        button.scrollIntoView({ block: "center" })
        const key = Object.keys(button).find((name) => name.startsWith("__reactProps"))
        button.click()
        setTimeout(() => {
          const current = document.querySelector(".archive-more button")
          resolve({
            reactKey: Boolean(key),
            debug: document.documentElement.dataset.archiveDebug || null,
            archive: document.querySelectorAll(".archive-card").length,
            featured: document.querySelectorAll(".work-card").length,
            button: current ? current.textContent.trim() : null,
            expanded: current ? current.getAttribute("aria-expanded") : null
          })
        }, 600)
      }
      tick()
    })`
  )
  console.log(JSON.stringify(expanded, null, 2))
  socket.close()
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  browser.kill()
}
