import React, { useState } from 'react';
import ServicioProductos from '../servicios/ServicioProductos';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../estilos/comparador.css"
import ResultadoBusqueda from './resultadoBusqueda';

const Comparador = () => {
  const [producto, setProducto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // nuevo estado de loading

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
            setResultados(respuesta.data);
            setError(null);
            setLoading(false); // termina la carga después del delay
          }, 1000);
        } else {
          setTimeout(() => {
            setError('No se encontraron productos.');
            setResultados([]);
            setLoading(false); // termina la carga después del delay
          }, 1000);
        }

      } catch (err) {
        setTimeout(() => {
          setError('Ha ocurrido un error con la conexión');
          setResultados([]);
          setLoading(false); // termina la carga después del delay
        }, 1000);
      }
    }
  };


  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="header-box my-4 d-flex flex-column flex-md-row flex-wrap justify-content-between align-items-center rounded p-4">
        <div className="w-75">
          <h2 className="mb-3">Comparator, tu comparador de confianza</h2>
          <div className="mb-0">
            Descubre la manera más fácil y eficiente de realizar tus compras online con nuestro comparador de precios entre supermercados. ¡Ahorra tiempo y dinero en tus compras!
          </div>
        </div>
        <img
          src="imagenes/compra.png"
          alt="Logo Comparador"
          className="ms-3"
        />
      </div>

      {/* Buscador */}
      <section className="search-section shadow-sm rounded p-3 my-4">
        <p className="mb-0 fs-5 fw-bold text-center">Busca un producto y lo compararemos entre varios supermercados</p>
      </section>

      <form className="d-flex justify-content-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Busca el producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <select name="supermercado" className='form-select w-auto'>
          <option selected value="Todos los supermercados">Todos los supermercados</option>
          <option value="Mercadona">Mercadona</option>
          <option value="Ahorramas">Ahorra más</option>
          <option value="Carrefour">Carrefour</option>
          <option value="Dia">Día</option>
        </select>
        <button type="submit" className="btn btn-success">Buscar</button>
      </form>

      {/* <ResultadoBusqueda resultados={resultados} loading={loading} error={error}/> */}

      {!loading && !error && resultados.length === 0 && (
        <div className="text-center my-4">
          <img src="./imagenes/buscador.png" alt="Empieza la búsqueda" className='w-25' />
          <div className='textoCarrito fw-semibold'>!Empieza ya la búsqueda!</div>
        </div>
      )}

      {loading && (
        <div className="text-center my-4">
          <img src="./imagenes/loading.gif" alt="Cargando..." className='loading' />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="d-flex justify-content-center my-4">
          <div className='alert alert-danger text-center w-50'>
            {error}
          </div>
        </div>
      )}

      {/* Resultados */}
      {resultados.length > 0 && !loading && (
        <section className="p-3">

          <p className="text-center p-4 fs-4">Producto comparado: {producto}</p>
          <div className='d-flex flex-wrap justify-content-center gap-3'>
            {resultados.map((item, index) => (
              <div key={index} className="product-card mb-3">
                <div className="card p-3 shadow-sm" style={{ height: 500, width: 300 }}>
                  <img
                    src={`imagenes/${item.supermercado}_NOMBRE.svg`}
                    alt={item.supermercado}
                    className='mt-2'
                    style={{ height: 25 }}
                  />
                  <div className="d-flex justify-content-center">
                    <img
                      src={item.urlImagen}
                      className="p-3"
                      alt={item.nombre}
                      style={{ width: 200, maxHeight: 200 }}
                    />
                  </div>
                  <div className="text-center p-3">
                    <p className="mb-2 fs-6 fw-bold">{item.nombre}</p>
                    <p className="my-1 mx-1">
                      Precio: <strong>{item.precio}€</strong>
                    </p>
                    <p>
                      Precio a granel: <strong>{item.precioGranel} €/{item.unidadMedida}</strong>
                    </p>
                    <button type="button" className='btn btn-success'>Añadir a la cesta</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}
    </div>
  );
};

export default Comparador;
