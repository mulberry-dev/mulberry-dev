import { ABOUT_ORIGIN } from "@/data/about"
import Image from "next/image"

const MexicoMap = () => (
  <svg
    className="about-portrait__map"
    viewBox="0 0 280 180"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M58 14c-3 12-6 26-5 40-1 12-5 24-10 35 3 8 11 11 17 6 3-11 6-24 7-37 3-14 8-26 14-32 8-8 20-12 32-14 16-3 34-2 50 2 14 4 28 3 41 9 13 6 24 16 38 20 4 10-6 16-16 19-6 14-12 30-22 41-10 12-24 20-39 23-10 11-22 18-35 16-10-2-16-12-18-23-10 2-21-1-29-8-10 5-22 3-30-6-8-10-13-24-11-37 3-14 11-26 22-34 5-10 12-21 24-30Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <path
      d="M42 18c-4 16-7 34-6 50-1 14-5 28-11 40 2 4 7 5 10 2 4-14 7-30 9-46 2-16 7-32 14-46-6 0-12 0-16 0Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <path
      d="M216 64c14 4 26 12 32 24-4 8-14 11-22 9-6-10-12-20-18-29 3-2 5-3 8-4Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
)

const AboutPortrait = () => (
  <div className="about-portrait">
    <MexicoMap />
    <span className="about-portrait__code" aria-hidden="true">
      {ABOUT_ORIGIN.code}
    </span>
    <Image
      src="/images/Webp/about-me.webp"
      alt="Santiago Morera, Mexican Full Stack Developer"
      width={1254}
      height={1254}
      unoptimized
      loading="lazy"
      decoding="async"
      className="about-portrait__img"
    />
  </div>
)

export default AboutPortrait
