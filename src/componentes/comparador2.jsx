import React, { useState } from 'react';

const Comparador2 = () => {
  const [producto, setProducto] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [super1, setSuper1] = useState('');
  const [super2, setSuper2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (producto.trim()) {
      setBusqueda(producto.trim());
    }
  };

  return (
    <div>
      <div>
        <h2>Comparador, tu comparador de confianza</h2>
        <p>
          Compara precios entre 2 supermercados, de esta manera podrás elegir entre los establecimientos que están más cerca de ti
        </p>
        <div>
          {/* Aquí puedes poner imágenes si quieres los logos */}
          <span>🛒 Carrefour | Dia | Mercadona</span>
        </div>
      </div>

      <div>
        <p>Busca un producto y filtra por los supermercados que quieres comparar</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Busca el producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          />
          <button type="submit">🔍</button>
          <select value={super1} onChange={(e) => setSuper1(e.target.value)}>
            <option value="">Supermercado 1</option>
            <option value="Mercadona">Mercadona</option>
            <option value="Carrefour">Carrefour</option>
            <option value="Dia">Dia</option>
          </select>
          <select value={super2} onChange={(e) => setSuper2(e.target.value)}>
            <option value="">Supermercado 2</option>
            <option value="Mercadona">Mercadona</option>
            <option value="Carrefour">Carrefour</option>
            <option value="Dia">Dia</option>
          </select>
        </form>
      </div>

      {busqueda && (
        <div>
          <h3>Producto comparado: {busqueda}</h3>
          <div>
            {super1 && (
              <div>
                <img src="https://via.placeholder.com/100" alt={busqueda} />
                <p>{busqueda} 1L</p>
                <p>Precio: 1,05€</p>
                <p>Supermercado: {super1}</p>
              </div>
            )}
            {super2 && (
              <div>
                <img src="https://via.placeholder.com/100" alt={busqueda} />
                <p>{busqueda} 1L</p>
                <p>Precio: 1,12€</p>
                <p>Supermercado: {super2}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comparador2;
