import React, { useState } from 'react';
import ServicioProductos from '../servicios/ServicioProductos';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../estilos/comparador.css"
import ResultadoBusqueda from './resultadoBusqueda';
import EncabezadoComparadores from './encabezadoComparadores';

const Comparador = () => {
  const [producto, setProducto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [resultadosCompleto, setResultadosCompleto] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // nuevo estado de loading
  
  const titulo = "Comparator, tu comparador de confianza"
  const textoEncabezado1 = "Descubre la manera más fácil y eficiente de realizar tus compras online con nuestro comparador de precios entre supermercados. ¡Ahorra tiempo y dinero en tus compras!"
  const textoEncabezado2 = "Busca un producto y lo compararemos entre varios supermercados"

  const filtrarPorSupermercado = () => {
    const establecimiento = document.getElementById("selectSupermercado").value
    setResultados(resultadosCompleto)
    if(establecimiento !== "Todos los supermercados"){
      setResultados(resultadosCompleto.filter(prod => prod.supermercado === establecimiento.toUpperCase()))     
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto.trim()) {
      setError("Introduzca el nombre de un producto.")
      setResultados([])
    } else {
      setLoading(true); // comienza la carga

      try {
        const respuesta = await ServicioProductos.buscarProducto(producto.trim().toLowerCase());

        if (respuesta.data && respuesta.data.length > 0) {
          // Esperar 1 segundo antes de mostrar resultados
          setTimeout(() => {
            setResultadosCompleto(respuesta.data);
            setResultados(respuesta.data)
            setError(null);
            setLoading(false); // termina la carga después del delay
          }, 1000);
          setTimeout(() => {
            window.scrollTo({ top: 500, behavior: 'smooth' });
            //Por qué al poner aquí el filtro para que la primera vez que se hace una búsqueda también pueda ser
            //filtrado por supermercado no funciona ya que aparece que resultadosCompleto y resultados está vacío   
            //filtrarPorSupermercado()
          }, 1300)
        } else {
          setTimeout(() => {
            setError('No se encontraron productos.');
            setResultadosCompleto([]);
            setResultados([])
            setLoading(false); // termina la carga después del delay
          }, 1000);
        }

      } catch (err) {
        setTimeout(() => {
          setError('Ha ocurrido un error con la conexión');
          setResultadosCompleto([]);
          setResultados([])
          setLoading(false); // termina la carga después del delay
        }, 1000);
      }
    }
  };


  return (
    <div className="container p-4">
      {/* Encabezado */}
      <EncabezadoComparadores titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"}/>

      <form className="d-flex flex-wrap justify-content-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Busca el producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <select name="supermercado" id='selectSupermercado' className='form-select w-auto' onChange={filtrarPorSupermercado}>
          <option value="Todos los supermercados">Todos los supermercados</option>
          <option value="Mercadona">Mercadona</option>
          <option value="Ahorramas">Ahorra más</option>
          <option value="Carrefour">Carrefour</option>
          <option value="Dia">Día</option>
        </select>
        <button type="submit" className="btn btn-success">Buscar</button>
      </form>

      <ResultadoBusqueda producto={producto} resultados={resultados} loading={loading} error={error}/>

    </div>
  );
};

export default Comparador;
