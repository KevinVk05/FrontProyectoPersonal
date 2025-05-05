import React, { useState } from 'react';
import ServicioProductos from '../servicios/ServicioProductos';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../estilos/comparador.css"

const Comparador = () => {
  const [producto, setProducto] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // nuevo estado de loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto.trim()) return;
  
    setLoading(true); // comienza la carga
  
    try {
      const res = await ServicioProductos.buscarProducto(producto.trim().toLowerCase());
  
      if (res.data && res.data.length > 0) {
        // Esperar 1 segundo antes de mostrar resultados
        setTimeout(() => {
          setResultados(res.data);
          setBusqueda(res.data[0].nombre);
          setError(null);
          setLoading(false); // termina la carga después del delay
        }, 2000);
      } else {
        setTimeout(() => {
          setError('No se encontraron productos.');
          setResultados([]);
          setBusqueda('');
          setLoading(false); // termina la carga después del delay
        }, 1000);
      }
  
    } catch (err) {
      setTimeout(() => {
        setError('No se encontró el producto');
        setResultados([]);
        setBusqueda('');
        setLoading(false); // termina la carga después del delay
      }, 1000);
    }
  };
  

  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="header-box mb-4 d-flex justify-content-between align-items-center p-4">
        <div>
          <h2 className="mb-3">Comparador, tu comparador de confianza</h2>
          <p className="mb-0 te">
            Descubre la manera más fácil y eficiente de realizar tus compras online con nuestro comparador de precios entre supermercados. ¡Ahorra tiempo y dinero en tus compras!
          </p>
        </div>
        <img
          src="imagenes/compra.png"
          alt="Logo Comparador"
          className="ms-3"
          style={{width:'130px'}}
        />
      </div>

      {/* Buscador */}
      <section className="search-section mb-4 p-3 my-4">
        <p className="mb-3 fw-bold text-center">Busca un producto y lo compararemos entre x supermercados</p>
      </section>

      <form className="d-flex justify-content-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Busca el producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {loading && (
        <div className="text-center my-4">
          <img src="./imagenes/loading.gif" alt="Cargando..." className='loading'/>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {/* Resultados */}
      {busqueda && resultados.length > 0 && !loading && (
        <section className="mb-5">
          <h3 className="text-center mb-4">Producto comparado: {producto}</h3>
          <div className="horizontal-scroll d-flex overflow-x-auto px-3 gap-4">
            {resultados.map((item, index) => (
              <div className="product-card-wrapper" key={index}>
                <div className="card product-card shadow-sm h-100 p-3">
                  <img
                    src={item.urlImagen}
                    className="card-img-top p-3"
                    alt={item.supermercado}
                  />
                  <div className="card-body text-center p-3">
                    <h5 className="card-title mb-2">{item.nombre}</h5>
                    <p className="card-text mb-1 my-1 mx-0">
                      Precio: <strong>{item.precio}€</strong>
                    </p>
                    <p className="card-text my-1 mx-0" style={{width:'130px'}}>Supermercado: {item.supermercado}</p>
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
