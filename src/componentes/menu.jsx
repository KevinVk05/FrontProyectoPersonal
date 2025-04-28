import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../estilos/menu.css';


// Componente MenuSuperior
const MenuSuperior = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    //localStorage.removeItem('token'); // Elimina el token
    navigate('/login');
  };

  return (
    <div className="menu-superior">
      <nav>
        <ul className="menu-list">
          {/* Logo o ícono */}
          <li className="menu-item">
          <Link to="/">
            <img
              src="/imagenes/logo.png"
              alt="Supermercado"
              className="icono"
            />
            </Link>
          </li>

          {/* Enlaces y acciones dependiendo del estado del usuario */}
          {user === null ? (
            <li className="menu-item">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <>
              <li className="menu-item">
                <Link to="/comparador2">Comparador de 2 Supermercados</Link>
              </li>

              <li className="menu-item">
                <Link to="/favoritos">Favoritos</Link>
              </li>

              <li className="menu-item">
                <Link to="/historial">Historial</Link>
              </li>
              
              <li className="menu-item saludo">
                Hola, {user}
              </li>
              <li className="menu-item">
                <button className="btn-salir" onClick={handleLogout}>
                  Salir
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MenuSuperior;
