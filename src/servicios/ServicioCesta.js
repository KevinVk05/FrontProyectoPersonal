import httpExterno from "./http-externo";
import { getAuthHeaders, getToken } from "./token";

class ServicioCesta {
  anadirProdCesta(producto) {
    return httpExterno.post(`/cesta/agregar`, producto, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
  }

  eliminarProdCesta(producto) {
    return httpExterno.delete(`/cesta/eliminar`, {
      data: producto,
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
  }

  eliminarCesta(user) {
    return httpExterno.delete(`/cesta/eliminarCesta`, {
      data: { nombreUsuario: user },
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
  }

  getProdsCesta(user) {
    return httpExterno.get(`/cesta/${user}`, {
      headers: getAuthHeaders(),
    });
  }
}

export default new ServicioCesta();
