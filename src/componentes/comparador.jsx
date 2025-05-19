import { useState } from 'react';
import ServicioProductos from '../servicios/ServicioProductos';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../estilos/comparador.css"
import ResultadoBusqueda from './resultadoBusqueda';
import Encabezado from './encabezados';
import ServicioBusquedas from "../servicios/ServicioBusquedas";
import { cambiarImgFavoritos, comprobarSiEstanEnLaCesta, filtrarPorSupermercado } from '../herramientas/general';
import { useAuth } from '../Login/AuthProvider';

const Comparador = () => {

  const [producto, setProducto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [supermercadoSeleccionado, setSupermercadoSeleccionado] = useState("Todos los supermercados");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // nuevo estado de loading

  const { user } = useAuth();

  const titulo = "Comparator, tu comparador de confianza"
  const textoEncabezado1 = "Descubre la manera más fácil y eficiente de realizar tus compras online con nuestro comparador de precios entre supermercados. ¡Ahorra tiempo y dinero en tus compras!"
  const textoEncabezado2 = "Busca un producto y lo compararemos entre varios supermercados"

  const [imagen, setImagen] = useState("/imagenes/fav1.png");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto.trim()) {
      setError("Introduzca el nombre de un producto.")
    } else {
      setLoading(true); // comienza la carga

      ServicioProductos.buscarProducto(producto.trim().toLowerCase()).then(respuesta => {
        if (respuesta.data && respuesta.data.length > 0) {
          // Esperar 1 segundo antes de mostrar resultados
          setError(null);
          setLoading(false); // termina la carga después del delay
          comprobarSiEstanEnLaCesta(respuesta.data, setResultados, setError)
          window.scrollTo({ top: 500, behavior: 'smooth' });
        } else {
          setTimeout(() => {
            setError('No se encontraron productos.');
            setResultados([]);
            setLoading(false); // termina la carga después del delay
          }, 1000);
        }
      }).catch(() => {
        setError('Ha ocurrido un error con la conexión');
        setResultados([]);
        setLoading(false); // termina la carga después del delay
      });
    }
  };

  const manejarFavoritos = () => {
    if (!producto.trim()) {
      setError("Introduzca el nombre de un producto.")
      cambiarImgFavoritos(imagen, setImagen)
    } else {
      const busquedaFavAnadir = {
        usuario: user,
        nombreBusqueda: producto
      }

      ServicioBusquedas.anadirBusquedaFav(busquedaFavAnadir).then(() => {
        alert("Se ha añadido la busqueda")
      }).catch(() => {
        setError('Ha ocurrido un error con la conexión');
      })
    }
  }

  return (
    <div className="container py-4">
      <Encabezado titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"} />

      <form className="d-flex flex-wrap justify-content-center gap-2" onSubmit={handleSubmit}>
        <div style={{ width: 35, height: 35 }} className='d-flex align-items-center justify-content-center'>
          <img src={imagen} onClick={manejarFavoritos}  alt="favoritos" title='Añadir búsqueda a favoritos' className='fav w-100 h-100' />
        </div>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Busca el producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <select name="supermercado" id='selectSupermercado' className='form-select w-auto' onChange={(e) => setSupermercadoSeleccionado(e.target.value)}>
          <option value="Todos los supermercados">Todos los supermercados</option>
          <option value="Mercadona">Mercadona</option>
          <option value="Ahorramas">Ahorra más</option>
          <option value="Carrefour">Carrefour</option>
          <option value="Dia">Día</option>
        </select>
        <button type="submit" className="btn btn-success">Buscar</button>
      </form>

      <ResultadoBusqueda producto={producto} resultados={filtrarPorSupermercado(resultados, supermercadoSeleccionado)} setResultados={setResultados} loading={loading} error={error} />

    </div>
  );
};

export default Comparador;
