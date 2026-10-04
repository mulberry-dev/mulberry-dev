export const CategoryIcon = ({ variant }: { variant?: string }) => {
  if (variant === "all") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2.2" y="2.2" width="4.6" height="4.6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9.2" y="2.2" width="4.6" height="4.6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2.2" y="9.2" width="4.6" height="4.6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9.2" y="9.2" width="4.6" height="4.6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    )
  }

  if (variant === "mobile") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect
          x="4.4"
          y="1.8"
          width="7.2"
          height="12.4"
          rx="1.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M7 12.6h2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (variant === "development") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M6.2 4.2 2.4 8l3.8 3.8M9.8 4.2 13.6 8l-3.8 3.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (variant === "security") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M8 2.2 3.5 4.1v4.2c0 3 2 4.9 4.5 5.7 2.5-.8 4.5-2.7 4.5-5.7V4.1L8 2.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M6.4 8.1 7.5 9.2 9.8 6.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (variant === "landing") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect
          x="2.2"
          y="2.2"
          width="11.6"
          height="11.6"
          rx="1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M2.2 6.3h11.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M4.3 8.5h7.4M4.3 10.8h4.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (variant === "web") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect
          x="1.8"
          y="2.4"
          width="12.4"
          height="11.2"
          rx="1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M1.8 5.6h12.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="3.9" cy="4" r="0.55" fill="currentColor" />
        <circle cx="5.7" cy="4" r="0.55" fill="currentColor" />
      </svg>
    )
  }

  if (variant === "api") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2.3" y="2.2" width="11.4" height="3.2" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="4.5" cy="3.8" r="0.5" fill="currentColor" />
        <rect x="2.3" y="6.4" width="11.4" height="3.2" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="4.5" cy="8" r="0.5" fill="currentColor" />
        <rect x="2.3" y="10.6" width="11.4" height="3.2" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="4.5" cy="12.2" r="0.5" fill="currentColor" />
      </svg>
    )
  }

  if (variant === "ecommerce") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M4.2 5.2h7.6l-.7 6.4H4.9L4.2 5.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M6.2 5.1V4.2a1.8 1.8 0 0 1 3.6 0v.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (variant === "english") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M2.6 8h10.8M8 2.6c-1.6 1.7-2.4 3.5-2.4 5.4S6.4 11.7 8 13.4M8 2.6c1.6 1.7 2.4 3.5 2.4 5.4S9.6 11.7 8 13.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return null
}
