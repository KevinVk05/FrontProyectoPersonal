import React, { useState } from 'react';
import ServicioProductos from '../servicios/ServicioProductos'; 

// Datos de imágenes


const Comparador = () => {
  const [producto, setProducto] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async  (e) => {
    e.preventDefault();
    if (!producto.trim()) return;
    try {
      const res = await ServicioProductos.buscarProducto(producto.trim().toLowerCase());
      setBusqueda(res.data.nombre);
      setResultados(res.data.precios);
      setError(null);
    } catch (err) {
      setError('No se encontró el producto');
      setResultados([]);
      setBusqueda('');
    }
  };

  return (
    <div>
      <div>
        <h2>Comparador, tu comparador de confianza</h2>
        <p>
          Descubre la manera más fácil y eficiente de realizar tus compras online con nuestro comparador de precios entre supermercados. ¡Ahorra tiempo y dinero en tus compras!
        </p>
      </div>

      <section>
        <p>Busca un producto y lo compararemos entre x supermercados</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Busca el producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </section>

      {error && <p>{error}</p>}

      {busqueda && resultados.length > 0 && (
        <section>
          <h3>Producto comparado: {busqueda}</h3>
          <div>
            {resultados.map((item, index) => (
              <div key={index}>
                <img src={item.imagen || "https://via.placeholder.com/100"} alt={item.supermercado} />
                <p>{busqueda} 1L</p>
                <p>Precio: {item.precio}€</p>
                <p>Supermercado: {item.supermercado}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Comparador;