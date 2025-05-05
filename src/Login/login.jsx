import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/ServicioUsuario';
import bcrypt from 'bcryptjs';
import "../estilos/login.css"

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    ServicioUsuario.login(usuario)
      .then((response) => {
        const user=response.data[0];
        const passwdHash= user.pass;
        let ContraseñaCorrecta=bcrypt.compareSync(password,passwdHash)
        if (ContraseñaCorrecta) {
          login(user.nombre);
          navigate('/');
        } else {
          setError("Usuario no es correcto")
        }


      })
      .catch((error) => {
        alert(error)
        navigate('/login');
      });
  };

  return (
    <div className="container-fluid login-container d-flex justify-content-center align-items-center vh-100">
  <div className="row login-card shadow-lg">
    {/* Lado izquierdo - Formulario */}
    <div className="col-md-6 login-left d-flex flex-column justify-content-center align-items-center p-4">
      <h2 className="mb-4">Log in</h2>
      <form onSubmit={handleSubmit} className="w-100">
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuario</label>
          <input
            id="usuario"
            type="text"
            className="form-control rounded-pill py-1 px-2"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            type="password"
            className="form-control rounded-pill"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn login-btn rounded-pill">Login</button>
        </div>
        {/*<small className="mt-2 d-block text-center">
          ¿No tienes cuenta? <a href="/registro">Regístrate</a>
        </small>*/}
      </form>
    </div>

    {/* Lado derecho - Imagen */}
    <div className="col-md-6 login-right d-flex align-items-center justify-content-center p-0">
      <img src="./imagenes/logo-login.png" alt="Login visual" className="img-fluid rounded-end" />
    </div>
  </div>
</div>

  

  );
};

export default Login;
