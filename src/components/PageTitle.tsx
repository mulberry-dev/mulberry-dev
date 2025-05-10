import { useEffect } from "react"

interface PageTitleProps {
  title: string
  bodyClass: string
}

const PageTitle = ({ title, bodyClass }: PageTitleProps) => {
  useEffect(
    () => {
      document.title = `${title} | ThisIsSanti.dev`
      document.body.classList.add(bodyClass)

      return () => {
        document.body.classList.remove(bodyClass)
      }
    },
    [title, bodyClass]
  )

  return null
}

export default PageTitle
