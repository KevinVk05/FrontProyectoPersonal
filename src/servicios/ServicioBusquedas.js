import httpExterno from "./http-externo";

class ServicioBusquedas {
  anadirBusquedaFav(favoritoAnadir) {
    return httpExterno.post(`/favoritos`, favoritoAnadir);
  }

  eliminarBusquedaFav(favoritoEliminar) {
    return httpExterno.delete(`/favoritos`, favoritoEliminar);
  }

  getBusquedasFavs(user) {
    return httpExterno.get(`/favoritos/${user}`)
  }


}

export default new ServicioBusquedas();
