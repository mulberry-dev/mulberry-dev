import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "ghost"

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  href?: string
  className?: string
  external?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  variant = "primary",
  href,
  className = "",
  external,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = `ui-button ui-button--${variant} ${className}`.trim()

  if (href) {
    if (external) {
      return (
        <a className={classes} href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      )
    }

    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
