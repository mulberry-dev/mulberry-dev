export async function PrivateDeployment(
  params: string,
  copy?: { privateTitle: string; privateText: string; privateConfirm: string }
) {
  if (!params) {
    return
  }

  const { default: Swal } = await import("sweetalert2")
  const title = copy?.privateTitle ?? "This deployment is private"
  const text =
    copy?.privateText ??
    "If you want to know more about this project, please contact me."
  const confirm = copy?.privateConfirm ?? "Great!"

  Swal.fire({
    icon: "info",
    title: `${title}: <br/> <span>${params} <span/> <br/>  🔒 `,
    text,
    focusConfirm: false,
    confirmButtonText: confirm,
    confirmButtonAriaLabel: confirm,
    confirmButtonColor:
      getComputedStyle(document.body).getPropertyValue("--color-teal").trim() ||
      "#2dd4bf"
  })
}
