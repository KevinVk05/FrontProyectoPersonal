import httpExterno from "./http-externo";

class ServicioBusquedas {
  anadirBusquedaFav(favorito) {
    return httpExterno.post(`/favoritos`, favorito);
  }

  eliminarBusquedaFav(favorito) {
    return httpExterno.delete(`/favoritos`, favorito);
  }

  getBusquedasFavs(user) {
    return httpExterno.get(`/favoritos/${user}`)
  }


}

export default new ServicioBusquedas();
