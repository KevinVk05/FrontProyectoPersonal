import httpExterno from "./http-externo";

class ServicioProductos {
  buscarProducto(nombre) {
    return httpExterno.get(`/productos/${nombre}`);
  }
}

export default new ServicioProductos();
