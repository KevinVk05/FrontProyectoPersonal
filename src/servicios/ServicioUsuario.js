import httpExterno from "./http-externo.js";
import { getAuthHeaders, getToken } from "./token.js";

class ServicioUsuario {
  
  login(usuario) {
    return httpExterno.post(`/usuarios/login`, usuario);
  }

  registrar(usuario) {
    return httpExterno.post(`/usuarios/registro`, usuario);
  }

  obtenerDatosProtegidos() {
    return httpExterno.get("/ruta-protegida", {
      headers: getAuthHeaders(),
    });
  }
}

export default new ServicioUsuario();
