export async function PrivateDeployment(params: string) {
  if (!params) {
    return
  }

  const { default: Swal } = await import("sweetalert2")

  Swal.fire({
    icon: "info",
    title: `This deployment is private: <br/> <span>${params} <span/> <br/>  🔒 `,
    text: `If you want to know more about this project, please contact me.`,
    focusConfirm: false,
    confirmButtonText: "Great!",
    confirmButtonAriaLabel: "Thumbs up, great!",
    confirmButtonColor:
      getComputedStyle(document.body).getPropertyValue("--color-teal").trim() ||
      "#2dd4bf"
  })
}
