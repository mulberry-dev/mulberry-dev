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
          d="M46 20 C42 46 38 74 36 98 C35 112 42 116 48 100 C52 84 54 58 56 40 C57 28 54 20 46 20 Z"
        />
        <path
          className="about-mx__land"
          d="M70 34 L94 24 L128 26 L156 42 L168 62 L160 80 L198 66 L240 74 L230 92 L196 90 L170 108 L154 148 L138 156 L130 126 L112 106 L90 104 L78 118 L70 98 L66 72 L68 48 Z"
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
