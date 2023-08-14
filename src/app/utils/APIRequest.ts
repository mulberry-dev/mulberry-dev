import axios from "axios";
import { errorNotify, successNotify, warnNotify } from "../utils/toast";

const statusSuccess = [201, 202, 203];
const statusAlertSuccess = [301, 302, 303];

export const APIRequest = axios.create();

// Request Interceptor
APIRequest.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    console.error("Request Error: ", error.message);
    errorNotify("Error de conectividad");
  }
);

// Response Interceptor
APIRequest.interceptors.response.use(
  async (response) => {
    let { status, statusCode, message, data } = response.data;
    if (typeof message === "string") {
      let oneStatus = status ?? statusCode;
      if (statusSuccess.indexOf(+oneStatus) >= 0) {
        successNotify(message);
      }
      if (statusAlertSuccess.indexOf(+oneStatus) >= 0) {
        warnNotify(message);
      }
    }
    return data;
  },
  async (error) => {
    console.error("Response Error: ", error);
    if (error.message === "Network Error" && !error.response) {
      errorNotify("Se perdió la conexión con el servidor");
      return;
    }

    let { status, data } = error.response || { status: null, data: null };

    if (status === 401) return null;

    if (status === 404) {
      if (data?.message) {
        errorNotify("No se encontró el servicio");
      }
      return;
    } else if (status >= 500) {
      errorNotify("Ocurrió un error durante la solicitud");
    }

    if (data && typeof data?.message === "string") {
      errorNotify(data.message);
      return;
    }

    if (data && typeof data?.detail === "string") {
      errorNotify(data.detail);
      return;
    }

    if (status === 500) {
      errorNotify("Error en el servidor");
    }
  }
);

export const setAuthToken = (token: any) => {
  if (token)
    APIRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete APIRequest.defaults.headers.common["Authorization"];
};
