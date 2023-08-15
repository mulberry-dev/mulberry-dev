export const EDIT_DEFAULT_VALUES_MESSAGE_ERROR = "Se debe cambiar al menos un dato";

export const LOGO_SOLO_FULL_RES = "/content/logoProfuturo.webp";

export const LOGO_SIN_TEXTO = "/content/profufav.webp"

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

export const sweetAlertProps = {
    title: '¿Estás seguro?',
    text: "¡Esta opcion no se puede deshacer!",
    icon: 'warning',
    cancelButtonText: `Cancelar`,
    confirmButtonColor: '#004B8D',
    cancelButtonColor: '#FFC000',
    confirmButtonText: '¡Si, eliminar!',
    showCancelButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
};

export const reprocesoSweetAlertProps = {
    title: '¿Reprocesar?',
    text: "¡Programa Listo para la reprocesar!",
    imageUrl: 'https://media3.giphy.com/media/XfgLjpEdygQEuqlIyP/giphy.gif?cid=ecf05e47r9h7mllqxz9kiix0fxgskgtxzuwd80fpquel4dpw&ep=v1_stickers_search&rid=giphy.gif&ct=s',
    imageWidth: 120,
    imageHeight: 120,
    cancelButtonText: `Cancelar`,
    confirmButtonColor: '#004B8D',
    cancelButtonColor: '#FFC000',
    confirmButtonText: '¡Si, reprocesar!',
    showCancelButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
};
export const ejecutarSweetAlertProps = {
    title: '¿Ejecutar proceso?',
    text: "¡Programa Listo para la ejecucion!",
    imageUrl: 'https://media2.giphy.com/media/SUtvksFVObjj7yq1Z3/giphy.gif?cid=ecf05e47qlzfm15b6bc54q1f8j0inxcpz69vbqt4nu78snh8&ep=v1_stickers_search&rid=giphy.gif&ct=s',
    imageWidth: 120,
    imageHeight: 120,
    cancelButtonText: `Cancelar`,
    confirmButtonColor: '#004B8D',
    cancelButtonColor: '#FFC000',
    confirmButtonText: '¡Si, ejectutar!',
    showCancelButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
};

export const PAPER_STYLE = {
    height: '86vh',
    borderRadius: '6px',
    paddingTop: '20px',
    padding: '10px',
    overflowY: 'auto',
};


export const notificacionesTimer = 1000;

export const bitacoraFasesTimer = 5000;

export const ejecucionIngestasTimer = 5000;

export const idTablaAdjuntaNotificaciones = "tabla-adjunta-notificaciones";

export const nombreHojaCifrasControl = "CifrasControl";

export const clasesBotonOutlinedPtimario = "MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-fullWidth";

export const idBotonDescragaCifrasControlAdjuntas = "boton-descraga-cifras-control-adjuntas";

export const description = 250;

export const shortDescription = 50;

export const caracteresProhibidos = /[\/{}+[*=”#@*;¨]/;

export const imagenEjecucion = 'https://media2.giphy.com/media/SUtvksFVObjj7yq1Z3/giphy.gif?cid=ecf05e47qlzfm15b6bc54q1f8j0inxcpz69vbqt4nu78snh8&ep=v1_stickers_search&rid=giphy.gif&ct=s';

export const slaColors = {
    Verde: 'success',
    Amarillo: 'warn',
    Rojo: 'error',
    default: 'inherit'
}