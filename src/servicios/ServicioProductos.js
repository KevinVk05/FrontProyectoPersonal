import httpExterno from "./http-externo";
import http from "./http-axios"

class ServicioProductos {
  buscarProducto(nombre) {
    return httpExterno.get(`/productos/precioGranel/${nombre}`);
  }

  prods(){
    return http.get("/productos")
  }

  prodsCesta(){
    return http.get("/productosCesta")
  }

  buscarProductoSupermercadosConcretos(nombre, supermercados){
    return httpExterno.get(`/productos/precioGranel/${nombre}/${supermercados}`)
  }

  buscarCesta(correoUsuario){
    return httpExterno.get(`/productos/${correoUsuario}`)
  }
}

export default new ServicioProductos();
