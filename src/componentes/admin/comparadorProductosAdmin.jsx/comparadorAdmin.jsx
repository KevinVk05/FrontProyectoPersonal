import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../estilos/comparador.css"
import { filtrarPorSupermercado } from '../../../herramientas/general';
import ServicioProductos from '../../../servicios/ServicioProductos';
import { useAuth } from '../../../Login/AuthProvider';
import Encabezado from '../../comunes/encabezados';
import ResultadoBusquedaAdmin from './resultadoBusquedaAdmin';
import { useParams } from 'react-router-dom';
import { comprobarSiEstanEnLaLista } from '../../../herramientas/listasAdministrador';

const ComparadorAdmin = () => {

    const [producto, setProducto] = useState('');
    const [resultados, setResultados] = useState([]);
    const [supermercadoSeleccionado, setSupermercadoSeleccionado] = useState("Todos los supermercados");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { nombreLista } = useParams();

    const titulo = "Compara los precios de los productos de mejor calidad"
    const textoEncabezado1 = "Busca los productos más adecuados para la lista predeterminada."
    const textoEncabezado2 = `Elige entre los productos más baratos para la lista: ${nombreLista}.`


    const manejarSubmit = async (e) => {
        e.preventDefault();
        realizarBusqueda()
    };

    const realizarBusqueda = (nombreProducto) => {
        const productoABuscar = nombreProducto || producto
        if (!productoABuscar.trim()) {
            setError("Introduzca el nombre de un producto.")
        } else {
            setLoading(true);

            ServicioProductos.buscarProducto(productoABuscar.trim().toLowerCase()).then(respuesta => {
                if (respuesta.data && respuesta.data.length > 0) {
                    setResultados(respuesta.data)
                    setError(null);
                    setLoading(false);
                    comprobarSiEstanEnLaLista(respuesta.data, setResultados, setError, nombreLista)
                    window.scrollTo({ top: 500, behavior: 'smooth' });
                } else {
                    setTimeout(() => {
                        setError('No se encontraron productos.');
                        setResultados([]);
                        setLoading(false);
                    }, 1000);
                }
            }).catch((error) => {
                setError('Ha ocurrido un error con la conexión');
                setResultados([]);
                setLoading(false);
            });
        }
    }

    return (
        <div className="container py-4">
            <Encabezado titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"/imagenes/compra.png"} />
            <form className="d-flex flex-wrap justify-content-center gap-2" onSubmit={manejarSubmit}>
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

            <ResultadoBusquedaAdmin nombreLista={nombreLista} producto={producto} resultados={filtrarPorSupermercado(resultados, supermercadoSeleccionado)} setResultados={setResultados} loading={loading} error={error} setError={setError} />

        </div>
    );
}

export default ComparadorAdmin;