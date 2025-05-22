import React, { useState } from 'react';
import ServicioProductos from '../servicios/ServicioProductos'; // Asegúrate de importar correctamente el servicio
import ResultadoBusqueda from './resultadoBusqueda';
import Encabezado from './encabezados';
import { useFavoritos } from '../hooks/useFavoritos';
import BusquedasFavoritas from './busquedasFavoritas';
import { useAuth } from '../Login/AuthProvider';
import { comprobarSiEstanEnLaCesta } from '../herramientas/general';

const Comparador2 = () => {
  const [producto, setProducto] = useState('');
  const [super1, setSuper1] = useState('');
  const [super2, setSuper2] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cambioBusquedasFavoritas, setCambioBusquedasFavoritas] = useState(1)

  const { user } = useAuth();

  const titulo = "Comparator, tu comparador de confianza"
  const textoEncabezado1 = "Compara precios entre 2 supermercados, de esta manera podrás elegir entre los establecimientos que están más cerca de ti."
  const textoEncabezado2 = "Busca un producto y filtra por los supermercados que quieres comparar"

  const {
    imagen,
    setImagen,
    favoritoGuardado,
    eliminarBusquedaFav,
    anadirBusquedaFav,
    setFavoritoGuardado
  } = useFavoritos(setError);

  const buscarResultados = async (e) => {
    e.preventDefault();
    if (!producto.trim()) {
      setError("Introduzca el nombre de un producto.")
      setResultados([])
    } else if (!super1.trim() || !super2.trim()) {
      setError("Introduzca 2 supermercados a comparar.")
      setResultados([])
    } else if ((super1 === super2)) {
      setError("Introduzca 2 supermercados diferentes.")
      setResultados([])
    } else {
      setLoading(true); // comienza la carga


      ServicioProductos.buscarProductoSupermercadosConcretos(producto.trim().toLowerCase(), super1 + "-" + super2).then(respuesta => {
        if (respuesta.data && respuesta.data.length > 0) {
          setResultados(respuesta.data)
          setError(null);
          setLoading(false);
          comprobarSiEstanEnLaCesta(respuesta.data, setResultados, setError, user)
          window.scrollTo({ top: 500, behavior: 'smooth' });
        } else {
          setError('No se encontraron productos.');
          setResultados([]);
          setLoading(false);
        }
      }).catch(() => {
        setError('Ha ocurrido un error con la conexión');
        setResultados([]);
        setLoading(false);
      });
    }
  }

  const handleInputChange = (e) => {
    setProducto(e.target.value)
    setFavoritoGuardado(false)
    if (favoritoGuardado) {
      cambiarImgFavoritos(imagen, setImagen)
    }
  };

  const hacerBusquedaFavorita = (nombreProd) => {
    setProducto(nombreProd)
  }

  const manejarFavoritos = () => {
    if (!producto.trim()) {
      setError("Introduzca el nombre de un producto.")
    } else {
      const busquedaFav = {
        usuario: user,
        nombreBusqueda: producto
      }

      if (favoritoGuardado) {
        eliminarBusquedaFav(busquedaFav, setCambioBusquedasFavoritas)
      } else {
        anadirBusquedaFav(busquedaFav, setCambioBusquedasFavoritas)
      }
    }
  }

  return (
    <div className="container py-4">

      <Encabezado titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/supermercados.png"} />

      <div className="text-center mb-4">
        <form onSubmit={buscarResultados} className="d-flex flex-wrap justify-content-center gap-2">
          <div style={{ width: 35, height: 35 }} className='d-flex align-items-center justify-content-center'>
            <img src={imagen} onClick={manejarFavoritos} alt="favoritos" title='Añadir búsqueda a favoritos' className='fav w-100 h-100' />
          </div>
          <input
            type="text"
            className="form-control w-50"
            placeholder="Busca el producto"
            value={producto}
            onChange={(e) => handleInputChange(e)}
          />
          <button type="submit" className="btn btn-success">Buscar</button>
          <select value={super1} onChange={(e) => setSuper1(e.target.value)} className="form-select" style={{ width: "30%" }}>
            <option value="">Supermercado 1</option>
            <option value="Mercadona">Mercadona</option>
            <option value="Ahorramas">Ahorra mas</option>
            <option value="Dia">Dia</option>
            <option value="Carrefour">Carrefour</option>
          </select>
          <select value={super2} onChange={(e) => setSuper2(e.target.value)} className="form-select" style={{ width: "30%" }}>
            <option value="">Supermercado 2</option>
            <option value="Mercadona">Mercadona</option>
            <option value="Ahorramas">Ahorra mas</option>
            <option value="Dia">Dia</option>
            <option value="Carrefour">Carrefour</option>
          </select>
        </form>
      </div>

      <BusquedasFavoritas hacerBusquedaFavorita={hacerBusquedaFavorita} setError={setError} favoritoGuardado={favoritoGuardado} cambioBusquedasFavoritas={cambioBusquedasFavoritas} setCambioBusquedasFavoritas={setCambioBusquedasFavoritas} />

      <ResultadoBusqueda producto={producto} resultados={resultados} setResultados={setResultados} loading={loading} error={error} setError={setError} />

    </div>
  );
};

export default Comparador2;
