import Swal from "sweetalert2";

export function alertInfo(params: string) {
  if (params) {
    Swal.fire({
      icon: "info",
      title:
        "This site is a web application developed with <br/> Next.js React framework",
      text: "Version: 13.4.13",
      focusConfirm: false,
      confirmButtonText: "Great!",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonColor: "#3fc3ee",
    });
  }
}
