
import http from "./http-externo.js";

class ServicioUsuario {

  login(usuario) {
      return http.get(`/usuarios/login`, usuario);
   }


}

export default new ServicioUsuario();
