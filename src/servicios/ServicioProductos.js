import httpExterno from "./http-externo";

class ServicioProductos {
  buscarProducto(nombre) {
    return httpExterno.get(`/productos/precioGranel/${nombre}`);
  }

  buscarProductoSupermercadosConcretos(nombre, supermercados){
    return httpExterno.get(`/productos/precioGranel/${nombre}/${supermercados}`)
  }

  buscarCesta(correoUsuario){
    return httpExterno.get(`/productos/${correoUsuario}`)
  }
}

export default new ServicioProductos();
