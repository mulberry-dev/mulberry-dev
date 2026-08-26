import { ABOUT_CRAFT } from "@/data/about"

const InterfaceVisual = () => (
  <div className="about-ui" aria-hidden="true">
    <div className="about-ui__chrome">
      <span />
      <span />
      <span />
    </div>
    <div className="about-ui__stage">
      <div className="about-ui__nav" />
      <div className="about-ui__hero" />
      <div className="about-ui__grid">
        <span />
        <span />
        <span />
      </div>
      <span className="about-ui__cursor" />
    </div>
  </div>
)

const SystemVisual = () => (
  <div className="about-sys" aria-hidden="true">
    <div className="about-sys__row">
      <span className="about-sys__method">POST</span>
      <span className="about-sys__path">/product</span>
      <span className="about-sys__ok">200</span>
    </div>
    <ol className="about-sys__layers">
      <li>API</li>
      <li>Logic</li>
      <li>Data</li>
    </ol>
    <span className="about-sys__packet" />
  </div>
)

const CraftSplit = () => (
  <div className="about-craft__split">
    <article className="about-panel about-panel--front">
      <InterfaceVisual />
      <p className="about-panel__kicker">{ABOUT_CRAFT.frontend.kicker}</p>
      <h3>{ABOUT_CRAFT.frontend.title}</h3>
      <p className="about-panel__text">{ABOUT_CRAFT.frontend.text}</p>
    </article>

    <div className="about-craft__join" aria-hidden="true">
      <span className="about-craft__track" />
      <span className="about-craft__pulse" />
      <span className="about-craft__join-label">{ABOUT_CRAFT.join}</span>
    </div>

    <article className="about-panel about-panel--back">
      <SystemVisual />
      <p className="about-panel__kicker">{ABOUT_CRAFT.backend.kicker}</p>
      <h3>{ABOUT_CRAFT.backend.title}</h3>
      <p className="about-panel__text">{ABOUT_CRAFT.backend.text}</p>
    </article>
  </div>
)

export default CraftSplit
