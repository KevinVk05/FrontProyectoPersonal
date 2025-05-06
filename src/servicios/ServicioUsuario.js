
import http from "./http-externo.js";

class ServicioUsuario {
   
   getAllUsuarios() {
      return http.get('/usuarios');
    }

  login(usuario) {
      return http.get(`/usuarios?nombre=${usuario}`);
      //http://localhost:8080/usuarios?nombre=agustin&pass=123
   }
}

export default new ServicioUsuario();
