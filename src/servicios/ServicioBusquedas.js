import httpExterno from "./http-externo";

class ServicioBusquedas {
  anadirBusquedaFav(favorito) {
    return httpExterno.post(`/favoritos`, favorito);
  }

  eliminarBusquedaFav(favorito) {
    return httpExterno.delete(`/favoritos`, favorito);
  }

}

export default new ServicioBusquedas();
