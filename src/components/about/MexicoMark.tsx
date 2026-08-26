import { ABOUT_ORIGIN } from "@/data/about"

const MexicoMark = () => (
  <figure className="about-mx">
    <div className="about-mx__stage" aria-hidden="true">
      <svg
        className="about-mx__map"
        viewBox="0 0 260 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aboutMxFill" x1="40" y1="16" x2="230" y2="170">
            <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.58" />
            <stop offset="100%" stopColor="var(--color-purple)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          className="about-mx__land"
          d="M48 18 C44 48 40 78 38 104 C37 118 46 120 52 102 C56 84 58 54 60 36 C61 26 56 18 48 18 Z"
        />
        <path
          className="about-mx__land"
          d="M72 32 L96 22 L132 24 L158 40 L172 58 L164 78 L204 64 L244 72 L236 88 L200 88 L176 106 L160 146 L142 158 L132 126 L114 104 L92 102 L80 118 L70 96 L64 70 L68 46 Z"
        />
        <circle className="about-mx__city-dot" cx="132" cy="112" r="4.2" />
        <circle className="about-mx__city-ring" cx="132" cy="112" r="10" />
      </svg>
      <span className="about-mx__code">{ABOUT_ORIGIN.code}</span>
    </div>
    <figcaption className="about-mx__meta">
      <span className="about-mx__city">{ABOUT_ORIGIN.city}</span>
      <span className="about-mx__coords">{ABOUT_ORIGIN.coords}</span>
      <span className="about-mx__caption">{ABOUT_ORIGIN.caption}</span>
    </figcaption>
  </figure>
)

export default MexicoMark
