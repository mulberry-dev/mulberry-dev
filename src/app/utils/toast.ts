/* import { toastProps } from "./defaultVariables"; */

import { toast } from "react-toastify";

export const toastProps = {
  position: "bottom-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const successNotify = (message: any) =>
  toast.success(message /* toastProps */);

export const errorNotify = (message: any) =>
  toast.error(message /* toastProps */);

export const warnNotify = (message: any) =>
  toast.warn(message /* toastProps */);

export const infoNotify = (message: any) =>
  toast.info(message /* toastProps */);
