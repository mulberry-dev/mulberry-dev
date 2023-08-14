import { APIRequest } from "@/app/utils/APIRequest";

export const APIService = {
  peticiones: {
    lista: async (params: any) => {
      const END_POINT = params.url;
      const PAY_LOAD = params.body;
      return APIRequest.get(`${END_POINT}${PAY_LOAD}`);
    },

    detalle: async (params: any) => {
      const END_POINT = params.url;
      const PAY_LOAD = params.body;
      const ID = params.id;
      return APIRequest.get(`${END_POINT}${PAY_LOAD}${ID}`);
    },

    agregar: async (params: any) => {
      const END_POINT = params.url;
      const PAY_LOAD = params.body;
      return APIRequest.post(`${END_POINT}`, PAY_LOAD);
    },

    actualizar: async (params: any) => {
      const END_POINT = params.url;
      const PAY_LOAD = params.body;
      const ID = params.id;
      return APIRequest.patch(`${END_POINT}${PAY_LOAD}${ID}`);
    },

    eliminar: async (params: any) => {
      const END_POINT = params.url;
      const PAY_LOAD = params.body;
      const ID = params.id;
      return APIRequest.delete(`${END_POINT}${PAY_LOAD}${ID}`);
    },
  },
};
