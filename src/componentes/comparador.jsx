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
        setResultados(res.data);
        setBusqueda(res.data[0].nombre);
        setError(null);
      } else {
        setError('No se encontraron productos.');
        setResultados([]);
        setBusqueda('');
      }

    } catch (err) {
      setError('No se encontró el producto');
      setResultados([]);
      setBusqueda('');
    }
    setLoading(false); // termina la carga
  };

  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="header-box mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-3">Comparador, tu comparador de confianza</h2>
          <p className="mb-0">
            Descubre la manera más fácil y eficiente de realizar tus compras online con nuestro comparador de precios entre supermercados. ¡Ahorra tiempo y dinero en tus compras!
          </p>
        </div>
        <img
          src="imagenes/compra.png"
          alt="Logo Comparador"
          className="ms-3"
        />
      </div>

      {/* Buscador */}
      <section className="search-section mb-4">
        <p className="mb-3 fw-bold">Busca un producto y lo compararemos entre x supermercados</p>
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
          <img
            src="https://i.gifer.com/XOsX.gif"
            alt="Cargando..."
            style={{ width: '80px', height: '80px' }}
          />
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
          <div className="row g-4 justify-content-center">
            {resultados.map((item, index) => (
              <div className="col-6 col-md-4 col-lg-3" key={index}>
                <div className="card product-card h-100 shadow-sm">
                  <img
                    src={item.imagen}
                    className="card-img-top p-3"
                    alt={item.supermercado}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="card-text mb-1">Precio: <strong>{item.precio}€</strong></p>
                    <p className="card-text">Supermercado: {item.supermercado}</p>
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
