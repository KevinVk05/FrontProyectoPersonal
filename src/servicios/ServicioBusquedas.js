import httpExterno from "./http-externo";
import { getAuthHeaders, getToken } from "./token";

class ServicioBusquedas {
  anadirBusquedaFav(favoritoAnadir) {
    return httpExterno.post(`/favoritos`,favoritoAnadir, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      }
    });
  }

  eliminarBusquedaFav(favoritoEliminar) {
    return httpExterno.delete(`/favoritos`, {
      data: favoritoEliminar,
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      }
    });
  }

  getBusquedasFavs(user) {
    return httpExterno.get(`/favoritos/${user}`, {
      headers: getAuthHeaders(),
    })
  }


}

export default new ServicioBusquedas();
