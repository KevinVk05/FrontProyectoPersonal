import { useEffect, useState } from 'react'

import MenuSuperior from './componentes/menu'
import Comparador from './componentes/comparador'
import Comparador2 from './componentes/comparador2'
import Favoritos from './componentes/favoritos';
import Historial from './componentes/historial';

import { Routes, Route } from 'react-router-dom';
import Pagina404 from './componentes/Pagina404';
import UseStorageState from './servicios/UseStorageState';
import { AuthProvider, useAuth  } from './Login/AuthProvider';
import Login from './Login/login';
import RutasProtegidas from './Login/RutasProtegidas';
import LocalStorageServicio from "./servicios/storage";



function App() {

  const [total, setTotal] = UseStorageState("total", 0); // Estado para el importe total
  const [productosJson, setProductosJson] = UseStorageState("porductosJson", []);
  const UserIniciado=LocalStorageServicio.get("usuario");

  return (

    <AuthProvider>

      <div className="App">
        {UserIniciado!=null && 
        <header className="App-header">
        <MenuSuperior />
      </header>
      }
        
  
        <main>
          <Routes>
            {/* Ruta principal con ListaImagenes */}
            <Route
              path="/"
              element={
                <RutasProtegidas>
                  <Comparador/>           
                  </RutasProtegidas>
              }
            />
       
            <Route
              path="/login"
              element={<Login />}
            />

            <Route path="/comparador2" element={
              <RutasProtegidas>
                <Comparador2/>
              </RutasProtegidas>
            } />

            <Route path="/favoritos" element={
              <RutasProtegidas>
                <Favoritos/>
              </RutasProtegidas>
            } />

            <Route path="/historial" element={
              <RutasProtegidas>
                <Historial />
              </RutasProtegidas>
            } />


            <Route path="*" element={<Pagina404 />} />



          </Routes>
        </main>
      </div>
    </AuthProvider>

  );
}

export default App