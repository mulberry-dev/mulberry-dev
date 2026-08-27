import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "ghost"

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  href?: string
  className?: string
  external?: boolean
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  variant = "primary",
  href,
  className = "",
  external,
  loading = false,
  disabled,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = [
    "ui-button",
    `ui-button--${variant}`,
    loading ? "ui-button--loading" : "",
    className
  ]
    .filter(Boolean)
    .join(" ")

  if (href) {
    if (external) {
      return (
        <a className={classes} href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      )
    }

    return (
      <Link className={classes} href={href} scroll={false}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="ui-button__spinner" aria-hidden="true" /> : null}
      <span className="ui-button__label">{children}</span>
    </button>
  )
}

export default Button
