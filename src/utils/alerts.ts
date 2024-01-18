import Swal from "sweetalert2"

const lastUpdate = "January 17, 2024"

export function alertInfo(params: string) {
  if (params) {
    Swal.fire({
      icon: "info",
      title: "App developed with: <br/> <span>Next.js<span/>",
      text: `Last update: ${lastUpdate}`,
      focusConfirm: false,
      confirmButtonText: "Great!",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonColor: "#3fc3ee",
    })
  }
}
