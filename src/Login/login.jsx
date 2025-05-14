import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/ServicioUsuario';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ServicioUsuario.login({
        "nombre": usuario,
        "contrasena": password
      });
      if (response.data === "Login exitoso") {
        login(usuario); 
        navigate('/'); 
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <section className="min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5 text-center justify-content-center">
            <img
              src="/imagenes/logoapp.png"
              alt="logo"
              className="w-100 h-100 overflow-hidden"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-5">
            <form onSubmit={handleSubmit} className="p-4 rounded bg-gold shadow-sm">
              <h1 className="mb-4 text-center text-gold">Comparator</h1>
              <h2 className="text-center text-purple mb-4">Identifícate</h2>
              <div className="card bg-cream border-0">
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="usuario" className="form-label text-purple">Usuario:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="usuario"
                      placeholder="ainhoa"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-purple">Contraseña:</label>
                    <input
                      type="password"
                      className="form-control border-purple"
                      id="password"
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="text-center">
                    <button type="submit" className="btn btn-purple btn-lg rounded-pill">Acceder</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
