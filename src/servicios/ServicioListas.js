import http from "./http-axios";
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

  getListas() {
    return httpExterno.get(`/listas/todas`, {
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
    return httpExterno.post(`/listas/crear`, { nombre: nombreLista }, {
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

  eliminarProdLista(prod) {
    return httpExterno.delete(`/listas/eliminar-producto`, {
      data: prod,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }


  eliminarLista(nombreLista) {
    return httpExterno.delete(`/listas/eliminar/${nombreLista}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  alternarVisibilidadLista(nombre) {
    return httpExterno.put(`/listas/visibilidad/${nombre}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ServicioListas();
