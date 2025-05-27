import Comparador from './componentes/comparadores/comparador'
import Comparador2 from './componentes/comparadores/comparador2'

import { Routes, Route } from 'react-router-dom';
import UseStorageState from './servicios/UseStorageState';
import { AuthProvider, useAuth } from './Login/AuthProvider';
import Login from './Login/login';
import RutasProtegidas from './Login/RutasProtegidas';
import CestaCompra from './componentes/cesta/cestaCompra';
import AdministrarListas from './componentes/admin/administrarListas/administrarListas';
import MenuSuperior from './componentes/comunes/menu';
import Pagina404 from './componentes/comunes/Pagina404';
import ComparadorAdmin from './componentes/admin/comparadorAdmin';
import RutasAdminProtegida from './Login/RutasAdminProtegidas';


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
                <RutasAdminProtegida>
                  <AdministrarListas />
                </RutasAdminProtegida>
              }
            />

            <Route
              path="/comparadorAdmin"
              element={
                <RutasAdminProtegida>
                  <ComparadorAdmin />
                </RutasAdminProtegida>
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