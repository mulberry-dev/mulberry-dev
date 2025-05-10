import Swal from "sweetalert2"

const lastUpdate = "May 10 2025"


export function alertInfo(params: string) {
  if (params) {
    Swal.fire({
      icon: "info",
      title: "App developed with: <br/> <span>Next.js<span/>",
      text: `Last update: ${lastUpdate}`,
      focusConfirm: false,
      confirmButtonText: "Great!",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonColor: "#3fc3ee"
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
      confirmButtonColor: "#3fc3ee"
    })
  }
}
