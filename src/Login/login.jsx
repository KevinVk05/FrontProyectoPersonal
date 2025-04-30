import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/ServicioUsuario';
import bcrypt from 'bcryptjs';
// import axios from 'axios';

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
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="row w-100 justify-content-center">
      <div className="col-12 col-md-6">
        <div className="card p-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">Usuario</label>
              <input
                id="usuario"
                type="text"
                className="form-control"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default Login;
