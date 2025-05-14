
import httpExterno from "./http-externo.js";

class ServicioUsuario {

  login(usuario) {
   
      return httpExterno.post(`/usuarios/login`, usuario);
   }


}

export default new ServicioUsuario();
