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
        console.log(password)
        console.log(passwdHash)
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
    <div className='contenedor'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
