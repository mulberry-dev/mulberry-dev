export async function PrivateDeployment(params: string) {
  if (!params) {
    return
  }

  const { default: Swal } = await import("sweetalert2")

  Swal.fire({
    icon: "info",
    title: `${params} is private`,
    text: "Contact me if you want details.",
    focusConfirm: false,
    confirmButtonText: "OK",
    confirmButtonAriaLabel: "Thumbs up, great!",
    confirmButtonColor:
      getComputedStyle(document.body).getPropertyValue("--color-teal").trim() ||
      "#2dd4bf"
  })
}
