import Comparador from './componentes/comparadores/comparador'
import Comparador2 from './componentes/comparadores/comparador2'

import { Routes, Route } from 'react-router-dom';
import UseStorageState from './servicios/UseStorageState';
import { AuthProvider, useAuth } from './Login/AuthProvider';
import Login from './Login/login';
import RutasProtegidas from './Login/RutasProtegidas';
import CestaCompra from './componentes/cesta/cestaCompra';
import AdministrarListas from './componentes/admin/administrarListas';
import MenuSuperior from './componentes/comunes/menu';
import Pagina404 from './componentes/comunes/Pagina404';
import ComparadorAdmin from './componentes/admin/comparadorAdmin';


function App() {

  const [total, setTotal] = UseStorageState("total", 0); // Estado para el importe total
  const [productosJson, setProductosJson] = UseStorageState("porductosJson", []);

  return (

    <AuthProvider>

      <div className="App">
        <header className="App-header">
          <MenuSuperior />
        </header>



        <main>
          <Routes>
            {/* Ruta principal con ListaImagenes */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/"
              element={
                <RutasProtegidas>
                  <Comparador />
                </RutasProtegidas>
              }
            />

            <Route
              path="/administrarListas"
              element={
                <RutasProtegidas>
                  <AdministrarListas />
                </RutasProtegidas>
              }
            />

            <Route
              path="/comparadorAdmin"
              element={
                <RutasProtegidas>
                  <ComparadorAdmin />
                </RutasProtegidas>
              }
            />

            <Route path="/comparador2" element={
              <RutasProtegidas>
                <Comparador2 />
              </RutasProtegidas>
            } />

            <Route path="/cestaCompra" element={
              <RutasProtegidas>
                <CestaCompra />
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