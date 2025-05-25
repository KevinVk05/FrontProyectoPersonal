import httpExterno from "./http-externo";

const token = localStorage.getItem("token");

class ServicioListas {
  listas() {
    return http.get("/listas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getListaPorNombre(nombre) {
    return httpExterno.get(`/listas/nombre/${nombre}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  crearLista(nombreLista) {
    return httpExterno.post(
      `/listas/crear`,
      { nombre: nombreLista },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  agregarProductoALista(data) {
    return httpExterno.post(`/listas/agregar-producto`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new ServicioListas();
