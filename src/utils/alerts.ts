import Swal from "sweetalert2"

const lastUpdate = "February 04 2026"


export function alertInfo(params: string) {
  if (params) {
    Swal.fire({
      icon: "info",
      title: "App developed with: <br/> <span>Next.js<span/>",
      text: `Last update: ${lastUpdate}`,
      focusConfirm: false,
      confirmButtonText: "Great!",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonColor: "#2dd4bf"
    })
  }
}
export function PrivateDeployment(params: string) {
  if (params) {
    Swal.fire({
      icon: "info",
      title: `This deployment is private: <br/> <span>${params} <span/> <br/>  🔒 `,
      text: `If you want to know more about this project, please contact me.`,
      focusConfirm: false,
      confirmButtonText: "Great!",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonColor: "#2dd4bf"
    })
  }
}
