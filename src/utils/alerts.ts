import Swal from "sweetalert2"

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
