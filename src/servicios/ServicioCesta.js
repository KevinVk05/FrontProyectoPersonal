import httpExterno from "./http-externo";

class ServicioCesta {
  anadirProdCesta(producto) {
    return httpExterno.post(`/cesta/agregar`, producto);
  }

  eliminarProdCesta(producto) {
    return httpExterno.delete(`/cesta/eliminar`, {
      data: producto,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getProdsCesta(user) {
    return httpExterno.get(`/cesta/${user}`);
  }
}

export default new ServicioCesta();
