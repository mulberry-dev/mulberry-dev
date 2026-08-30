import { ABOUT_NAME, ABOUT_ROLE } from "@/data/about"
import Image from "next/image"

const AboutPortrait = () => (
  <div className="about-portrait">
    <Image
      src="/images/about/mexico-map.png"
      alt=""
      width={1024}
      height={682}
      unoptimized
      loading="lazy"
      decoding="async"
      className="about-portrait__map"
      aria-hidden="true"
    />
    <Image
      src="/images/Webp/about-me.webp"
      alt={`${ABOUT_NAME}, ${ABOUT_ROLE}`}
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
