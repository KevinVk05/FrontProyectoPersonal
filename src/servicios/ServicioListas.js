import httpExterno from "./http-externo";

const token = localStorage.getItem("token");

class ServicioListas {

  getListas() {
    return httpExterno.get(`/listas/todas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getListasVisibles() {
    return httpExterno.get(`/listas/visibles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getListaPorNombre(nombre) {
    return httpExterno.get(`/listas/${nombre}`, {
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
    return httpExterno.post(`/listas/agregar`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  eliminarProductoLista(prod) {
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
