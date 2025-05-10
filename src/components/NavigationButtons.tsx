import Image from "next/image"
import Link from "next/link"

interface NavigationButtonsProps {
  backLink: string
  nextLink: string
  nextText: string
}

const NavigationButtons = ({
  backLink,
  nextLink,
  nextText
}: NavigationButtonsProps) =>
  <div className="buttons_container">
    <Link className="button smallest" href={backLink}>
      <Image
        src="/images/Icons/arrow-right-rounded.svg"
        alt="go-back"
        className="go_back"
        width={40}
        height={40}
        title="Go back"
      />
    </Link>
    <Link className="button-generic" href={nextLink}>
      {nextText}
    </Link>
  </div>

export default NavigationButtons
