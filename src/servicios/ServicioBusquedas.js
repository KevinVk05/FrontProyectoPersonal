import httpExterno from "./http-externo";

class ServicioBusquedas {
  anadirBusquedaFav(favoritoAnadir) {
    return httpExterno.post(`/favoritos`, favoritoAnadir);
  }

  eliminarBusquedaFav(favoritoEliminar) {
    return httpExterno.delete(`/favoritos`, {
      data: favoritoEliminar,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  getBusquedasFavs(user) {
    return httpExterno.get(`/favoritos/${user}`)
  }


}

export default new ServicioBusquedas();
