export type ParticlePhase =
  | "idle"
  | "entering"
  | "active"
  | "falling"
  | "transitioning"

type PhaseListener = (phase: ParticlePhase) => void

type Particle = {
  x: number
  y: number
  vx: number
  baseSpeed: number
  size: number
  alpha: number
  homeAlpha: number
  wobbleAmp: number
  wobbleFreq: number
  wobblePhase: number
  fallDelay: number
  fallAge: number
  gone: boolean
  emberSprite: number
  emberHeat: number
  emberScale: number
  emberLag: number
}

type Color = { r: number; g: number; b: number; a: number }

type SpeedTween = {
  from: number
  to: number
  duration: number
  elapsed: number
  ease: (t: number) => number
  onComplete?: () => void
}

type MixTween = {
  from: number
  to: number
  duration: number
  elapsed: number
}

const PEAK_SPEED = 24
const COVER_SPEED = PEAK_SPEED * 0.58
const ACCEL_DURATION = 0.52
const DECEL_DURATION = 0.68
const MIN_TRAVEL = 0.54
const MAX_TRAVEL_WAIT = 2.4
const ENTER_DURATION = 2.35
const ENTER_REVEAL_AT = 0.48
const DPR_CAP = 2
const EMBER_DURATION = 1.08
const EMBER_LAG = 0.22
const EMBER_SPRITE_SIZE = 48

type EmberStop = { inner: string; mid: string; outer: string }

const EMBER_STOPS: EmberStop[] = [
  {
    inner: "rgba(255, 168, 82, 1)",
    mid: "rgba(214, 64, 16, 0.7)",
    outer: "rgba(138, 28, 8, 0)"
  },
  {
    inner: "rgba(255, 146, 48, 1)",
    mid: "rgba(255, 92, 18, 0.72)",
    outer: "rgba(176, 36, 8, 0)"
  },
  {
    inner: "rgba(255, 186, 78, 1)",
    mid: "rgba(255, 122, 28, 0.7)",
    outer: "rgba(196, 58, 10, 0)"
  },
  {
    inner: "rgba(255, 220, 118, 1)",
    mid: "rgba(255, 158, 42, 0.68)",
    outer: "rgba(220, 82, 16, 0)"
  },
  {
    inner: "rgba(255, 248, 214, 1)",
    mid: "rgba(255, 196, 86, 0.62)",
    outer: "rgba(255, 110, 28, 0)"
  }
]

const easeInCubic = (t: number) => t * t * t
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const pickEmberLook = () => {
  const roll = Math.random()
  let sprite = 2
  let heat = 0.5

  if (roll < 0.12) {
    sprite = 0
    heat = 0.12 + Math.random() * 0.2
  } else if (roll < 0.4) {
    sprite = 1
    heat = 0.34 + Math.random() * 0.22
  } else if (roll < 0.74) {
    sprite = 2
    heat = 0.5 + Math.random() * 0.2
  } else if (roll < 0.92) {
    sprite = 3
    heat = 0.68 + Math.random() * 0.16
  } else {
    sprite = 4
    heat = 0.84 + Math.random() * 0.16
  }

  return {
    emberSprite: sprite,
    emberHeat: clamp(heat + (Math.random() - 0.5) * 0.08, 0.08, 1),
    emberScale: 0.82 + Math.random() * 0.46,
    emberLag: Math.random() * EMBER_LAG
  }
}

const countForView = (width: number, height: number) => {
  const area = width * height
  return clamp(Math.round(area / 13500), 72, 210)
}

const parseCssColor = (value: string): Color => {
  const rgba = value.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i
  )

  if (rgba) {
    return {
      r: Number(rgba[1]),
      g: Number(rgba[2]),
      b: Number(rgba[3]),
      a: rgba[4] === undefined ? 1 : Number(rgba[4])
    }
  }

  return { r: 255, g: 255, b: 255, a: 0.55 }
}

export class ParticlesEngine {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private particles: Particle[] = []
  private phase: ParticlePhase = "idle"
  private reducedMotion = false
  private running = false
  private frame = 0
  private lastTime = 0
  private time = 0
  private width = 0
  private height = 0
  private dpr = 1
  private color: Color = { r: 255, g: 255, b: 255, a: 0.55 }
  private speedMul = 1
  private enterBoost = 1
  private enterAge = 0
  private tween: SpeedTween | null = null
  private emberMix = 0
  private emberTween: MixTween | null = null
  private emberSprites: HTMLCanvasElement[] = []
  private darkTheme = true
  private travelAge = 0
  private coverWaiters: Array<() => void> = []
  private contentRevealListener: (() => void) | null = null
  private contentRevealed = false
  private fallDone: (() => void) | null = null
  private phaseListener: PhaseListener | null = null
  private themeObserver: MutationObserver | null = null
  private resizeObserver: ResizeObserver | null = null
  private colorSyncUntil = 0

  setPhaseListener(listener: PhaseListener | null) {
    this.phaseListener = listener
  }

  setContentRevealListener(listener: (() => void) | null) {
    this.contentRevealListener = listener
  }

  getPhase() {
    return this.phase
  }

  setReducedMotion(value: boolean) {
    this.reducedMotion = value
  }

  mount(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d", { alpha: true })

    if (!this.ctx) {
      return
    }

    this.ensureEmberSprites()
    this.syncColor()
    this.resize()
    this.bindChrome()
    this.startLoop()
  }

  unmount() {
    this.stopLoop()
    this.unbindChrome()
    this.canvas = null
    this.ctx = null
  }

  startEnter() {
    this.contentRevealed = false

    if (this.reducedMotion) {
      this.spawn("fill")
      this.speedMul = 0.22
      this.enterBoost = 1
      this.setPhase("active")
      this.markContentReveal()
      return
    }

    this.spawn("enter")
    this.speedMul = 1
    this.enterBoost = 10
    this.enterAge = 0
    this.setPhase("entering")
  }

  setEmberMode(on: boolean) {
    const to = on ? 1 : 0

    if (this.reducedMotion) {
      this.emberTween = null
      this.emberMix = to
      return
    }

    if (this.emberMix === to && !this.emberTween) {
      return
    }

    this.emberTween = {
      from: this.emberMix,
      to,
      duration: EMBER_DURATION,
      elapsed: 0
    }
  }

  startActive() {
    if (!this.particles.length) {
      this.spawn("fill")
    }

    this.speedMul = this.reducedMotion ? 0.22 : 1
    this.enterBoost = 1
    this.setPhase("active")
    this.markContentReveal()
  }

  startFall(onComplete: () => void) {
    this.flushCoverWaiters()
    this.tween = null
    this.fallDone = onComplete
    this.speedMul = 1
    this.enterBoost = 1

    if (this.reducedMotion) {
      this.particles = []
      this.setPhase("idle")
      onComplete()
      this.fallDone = null
      return
    }

    const height = this.height || 1

    for (const particle of this.particles) {
      particle.gone = false
      particle.fallAge = 0
      particle.fallDelay = 0.06 + Math.random() * 0.34 + (1 - particle.y / height) * 0.14
      particle.vx += (Math.random() - 0.5) * 18
    }

    this.setPhase("falling")
  }

  cancelFallAndResume() {
    this.fallDone = null

    for (const particle of this.particles) {
      particle.gone = false
      particle.alpha = particle.homeAlpha
    }

    if (this.reducedMotion) {
      this.startActive()
      return
    }

    this.setPhase("active")
  }

  beginRouteTransition() {
    if (this.phase === "idle" || this.phase === "falling" || this.reducedMotion) {
      return Promise.resolve()
    }

    this.travelAge = 0
    this.setPhase("transitioning")
    this.tweenSpeed(PEAK_SPEED, ACCEL_DURATION, easeInCubic)

    if (this.speedMul >= COVER_SPEED) {
      return new Promise<void>((resolve) => {
        this.coverWaiters.push(resolve)
      })
    }

    return new Promise<void>((resolve) => {
      this.coverWaiters.push(resolve)
    })
  }

  completeRouteTransition() {
    if (this.phase !== "transitioning" || this.reducedMotion) {
      return
    }

    this.tweenSpeed(1, DECEL_DURATION, easeOutCubic, () => {
      if (this.phase === "transitioning") {
        this.setPhase("active")
      }
    })
  }

  private setPhase(phase: ParticlePhase) {
    if (this.phase === phase) {
      return
    }

    this.phase = phase
    this.phaseListener?.(phase)
  }

  private markContentReveal() {
    if (this.contentRevealed) {
      return
    }

    this.contentRevealed = true
    this.contentRevealListener?.()
  }

  private spawn(mode: "enter" | "fill") {
    const width = this.width || window.innerWidth
    const height = this.height || window.innerHeight
    const count = countForView(width, height)
    const next: Particle[] = []

    for (let i = 0; i < count; i += 1) {
      next.push(this.createParticle(width, height, mode))
    }

    this.particles = next
  }

  private createParticle(
    width: number,
    height: number,
    mode: "enter" | "fill"
  ): Particle {
    const deep = Math.random() < 0.38
    const baseSpeed = deep ? 11 + Math.random() * 12 : 18 + Math.random() * 20
    const y =
      mode === "enter"
        ? height + 6 + Math.random() * height * 0.42
        : Math.random() * height

    const homeAlpha = (deep ? 0.28 : 0.42) + Math.random() * 0.28
    const ember = pickEmberLook()

    return {
      x: Math.random() * width,
      y,
      vx: (Math.random() - 0.5) * 6,
      baseSpeed,
      size: deep ? 1.6 + Math.random() * 1.6 : 1.1 + Math.random() * 1.2,
      alpha: mode === "enter" ? 0 : homeAlpha,
      homeAlpha,
      wobbleAmp: 4 + Math.random() * 10,
      wobbleFreq: 0.35 + Math.random() * 0.7,
      wobblePhase: Math.random() * Math.PI * 2,
      fallDelay: 0,
      fallAge: 0,
      gone: false,
      emberSprite: ember.emberSprite,
      emberHeat: ember.emberHeat,
      emberScale: ember.emberScale,
      emberLag: ember.emberLag
    }
  }

  private tweenSpeed(
    to: number,
    duration: number,
    ease: (t: number) => number,
    onComplete?: () => void
  ) {
    this.tween = {
      from: this.speedMul,
      to,
      duration,
      elapsed: 0,
      ease,
      onComplete
    }
  }

  private bindChrome() {
    this.themeObserver = new MutationObserver(() => {
      this.colorSyncUntil = performance.now() + 520
      this.syncColor()
    })
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })
    this.themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"]
    })

    if (this.canvas) {
      this.resizeObserver = new ResizeObserver(() => this.resize())
      this.resizeObserver.observe(this.canvas)
    }

    document.addEventListener("visibilitychange", this.onVisibility)
  }

  private unbindChrome() {
    this.themeObserver?.disconnect()
    this.themeObserver = null
    this.resizeObserver?.disconnect()
    this.resizeObserver = null
    document.removeEventListener("visibilitychange", this.onVisibility)
  }

  private onVisibility = () => {
    if (document.hidden) {
      this.stopLoop()
      return
    }

    this.startLoop()
  }

  private syncColor() {
    const raw = getComputedStyle(document.body)
      .getPropertyValue("--particle-color")
      .trim()
    this.color = parseCssColor(raw || "rgba(255, 255, 255, 0.55)")
    this.darkTheme = document.body.classList.contains("dark")
  }

  private ensureEmberSprites() {
    if (this.emberSprites.length) {
      return
    }

    this.emberSprites = EMBER_STOPS.map((stop) => this.makeEmberSprite(stop))
  }

  private makeEmberSprite(stop: EmberStop) {
    const size = EMBER_SPRITE_SIZE
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      return canvas
    }

    const center = size * 0.5
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center)
    gradient.addColorStop(0, stop.inner)
    gradient.addColorStop(0.22, stop.inner)
    gradient.addColorStop(0.4, stop.mid)
    gradient.addColorStop(0.66, stop.outer.replace(", 0)", ", 0.16)"))
    gradient.addColorStop(1, stop.outer)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    return canvas
  }

  private resize() {
    if (!this.canvas || !this.ctx) {
      return
    }

    const bounds = this.canvas.getBoundingClientRect()
    const width = Math.max(1, Math.round(bounds.width))
    const height = Math.max(1, Math.round(bounds.height))
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    const bufferW = Math.round(width * dpr)
    const bufferH = Math.round(height * dpr)

    if (
      width === Math.round(this.width) &&
      height === Math.round(this.height) &&
      dpr === this.dpr &&
      this.canvas.width === bufferW &&
      this.canvas.height === bufferH
    ) {
      return
    }

    const prevW = this.width || width
    const prevH = this.height || height

    this.width = width
    this.height = height
    this.dpr = dpr
    this.canvas.width = bufferW
    this.canvas.height = bufferH
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    if (this.particles.length) {
      const scaleX = width / prevW
      const scaleY = height / prevH

      for (const particle of this.particles) {
        particle.x *= scaleX
        particle.y *= scaleY
      }

      const target = countForView(width, height)
      const mode = this.phase === "entering" ? "enter" : "fill"

      while (this.particles.length < target) {
        this.particles.push(this.createParticle(width, height, mode))
      }

      if (this.particles.length > target) {
        this.particles.length = target
      }
    }
  }

  private startLoop() {
    if (this.running || !this.ctx) {
      return
    }

    this.running = true
    this.lastTime = performance.now()
    this.frame = window.requestAnimationFrame(this.tick)
  }

  private stopLoop() {
    this.running = false
    window.cancelAnimationFrame(this.frame)
  }

  private tick = (now: number) => {
    if (!this.running) {
      return
    }

    const dt = clamp((now - this.lastTime) / 1000, 0, 0.048)
    this.lastTime = now
    this.time += dt

    if (now < this.colorSyncUntil) {
      this.syncColor()
    }

    this.step(dt)
    this.draw()
    this.frame = window.requestAnimationFrame(this.tick)
  }

  private step(dt: number) {
    this.stepTween(dt)
    this.stepEmber(dt)

    if (this.phase === "entering") {
      this.enterAge += dt
      const settle = clamp((this.enterAge - 1.35) / 1, 0, 1)
      this.enterBoost = 1 + 9 * (1 - easeOutQuart(settle))

      if (this.enterAge >= ENTER_REVEAL_AT) {
        this.markContentReveal()
      }

      if (this.enterAge >= ENTER_DURATION) {
        this.enterBoost = 1
        this.setPhase("active")
      }
    }

    if (this.phase === "transitioning") {
      this.travelAge += dt
      this.flushCoverIfReady()
    }

    if (this.phase === "falling") {
      this.stepFall(dt)
      return
    }

    this.stepFloat(dt)
  }

  private stepTween(dt: number) {
    if (!this.tween) {
      return
    }

    this.tween.elapsed += dt
    const progress = clamp(this.tween.elapsed / this.tween.duration, 0, 1)
    const eased = this.tween.ease(progress)
    this.speedMul = this.tween.from + (this.tween.to - this.tween.from) * eased

    if (progress >= 1) {
      const done = this.tween.onComplete
      this.tween = null
      done?.()
    }
  }

  private stepEmber(dt: number) {
    if (!this.emberTween) {
      return
    }

    this.emberTween.elapsed += dt
    const progress = clamp(this.emberTween.elapsed / this.emberTween.duration, 0, 1)
    const eased = easeInOutCubic(progress)
    this.emberMix =
      this.emberTween.from + (this.emberTween.to - this.emberTween.from) * eased

    if (progress >= 1) {
      this.emberMix = this.emberTween.to
      this.emberTween = null
    }
  }

  private flushCoverIfReady() {
    if (!this.coverWaiters.length) {
      return
    }

    const ready =
      (this.speedMul >= COVER_SPEED && this.travelAge >= MIN_TRAVEL) ||
      this.travelAge >= MAX_TRAVEL_WAIT

    if (ready) {
      this.flushCoverWaiters()
    }
  }

  private flushCoverWaiters() {
    if (!this.coverWaiters.length) {
      return
    }

    const waiters = this.coverWaiters
    this.coverWaiters = []
    waiters.forEach((resolve) => resolve())
  }

  private stepFloat(dt: number) {
    const { width, height, time } = this
    const lift = this.speedMul * this.enterBoost

    for (const particle of this.particles) {
      if (particle.alpha < particle.homeAlpha) {
        particle.alpha = Math.min(particle.homeAlpha, particle.alpha + dt * 3.4)
      }

      const wobble =
        Math.sin(time * particle.wobbleFreq + particle.wobblePhase) *
        particle.wobbleAmp
      particle.x += (particle.vx + wobble) * dt
      particle.y -= particle.baseSpeed * lift * dt

      if (particle.x < -12) {
        particle.x = width + 12
      } else if (particle.x > width + 12) {
        particle.x = -12
      }

      if (particle.y < -16) {
        particle.y = height + 8 + Math.random() * 20
        particle.x = Math.random() * width
      }
    }
  }

  private stepFall(dt: number) {
    const height = this.height
    let remaining = 0

    for (const particle of this.particles) {
      if (particle.gone) {
        continue
      }

      remaining += 1
      particle.fallAge += dt

      if (particle.fallAge < particle.fallDelay) {
        particle.y -= particle.baseSpeed * 0.35 * dt
        continue
      }

      const fallen = particle.fallAge - particle.fallDelay
      const gravity = 980 + particle.baseSpeed * 16
      particle.y += (70 + gravity * fallen) * dt
      particle.x += particle.vx * dt
      particle.alpha = Math.max(0, particle.homeAlpha * (1 - fallen * 0.28))
      particle.size = Math.max(0.6, particle.size * (1 - dt * 0.18))

      if (particle.y > height + 28 || particle.alpha <= 0.02) {
        particle.gone = true
        remaining -= 1
      }
    }

    if (remaining <= 0) {
      this.particles = []
      const done = this.fallDone
      this.fallDone = null
      this.setPhase("idle")
      done?.()
    }
  }

  private emberAmount(particle: Particle) {
    return clamp((this.emberMix - particle.emberLag) / (1 - EMBER_LAG), 0, 1)
  }

  private draw() {
    const ctx = this.ctx

    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, this.width, this.height)

    const coverage = clamp((this.speedMul - 1) / (PEAK_SPEED - 1), 0, 1)

    if (this.emberMix < 0.995) {
      this.drawSparkles(ctx, coverage)
    }

    if (this.emberMix > 0.004) {
      this.drawEmbers(ctx, coverage)
    }

    ctx.globalAlpha = 1
  }

  private drawSparkles(ctx: CanvasRenderingContext2D, coverage: number) {
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`

    for (const particle of this.particles) {
      if (particle.gone) {
        continue
      }

      const fade = 1 - this.emberAmount(particle)
      const alpha = particle.alpha * this.color.a * (1 + coverage * 0.2) * fade

      if (alpha <= 0.01) {
        continue
      }

      const speed = particle.baseSpeed * this.speedMul * this.enterBoost
      const stretch =
        this.phase === "transitioning"
          ? 1 + coverage * Math.min(3.8, speed / 170)
          : 1
      const radiusX = (particle.size * 0.5) / (1 + coverage * 0.45)
      const radiusY = particle.size * 0.5 * stretch

      ctx.globalAlpha = clamp(alpha, 0, 1)
      ctx.beginPath()
      ctx.ellipse(particle.x, particle.y, radiusX, radiusY, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  private drawEmbers(ctx: CanvasRenderingContext2D, coverage: number) {
    if (!this.emberSprites.length) {
      return
    }

    const prev = ctx.globalCompositeOperation

    if (this.darkTheme) {
      ctx.globalCompositeOperation = "lighter"
    }

    const baseAlpha = this.darkTheme ? 0.4 : 0.52

    for (const particle of this.particles) {
      if (particle.gone) {
        continue
      }

      const mix = this.emberAmount(particle)

      if (mix <= 0.01) {
        continue
      }

      const sprite = this.emberSprites[particle.emberSprite]

      if (!sprite) {
        continue
      }

      const alpha =
        particle.alpha *
        baseAlpha *
        (0.58 + particle.emberHeat * 0.55) *
        mix *
        (1 + coverage * 0.12)

      if (alpha <= 0.01) {
        continue
      }

      const dim =
        particle.size * (2.7 + particle.emberHeat * 1.7) * particle.emberScale
      const half = dim * 0.5

      ctx.globalAlpha = clamp(alpha, 0, 0.9)
      ctx.drawImage(sprite, particle.x - half, particle.y - half, dim, dim)
    }

    ctx.globalCompositeOperation = prev
  }
}
