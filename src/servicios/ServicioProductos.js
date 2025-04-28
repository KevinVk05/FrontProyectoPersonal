import httpExterno from "./http-externo";

class ServicioProductos {
  buscarProducto(nombre) {
    return httpExterno.get(`/productos/precio/${nombre}`);
  }
}

export default new ServicioProductos();
