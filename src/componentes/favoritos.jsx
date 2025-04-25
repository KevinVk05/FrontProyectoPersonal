import React from 'react';

const Favoritos = () => {
  const productosFavoritos = [
    {
      nombre: 'Leche Día 250ml',
      precio: '1,10€/L',
      supermercado: 'Día',
      logo: 'https://via.placeholder.com/60x60?text=Dia',
    },
    {
      nombre: 'Leche Día 250ml',
      precio: '1,15€/L',
      supermercado: 'Día',
      logo: 'https://via.placeholder.com/60x60?text=Dia',
    },
    {
      nombre: 'Leche Día 250ml',
      precio: '1,13€/L',
      supermercado: 'Día',
      logo: 'https://via.placeholder.com/60x60?text=Dia',
    },
  ];

  return (
    <div>
      <div>
        <h2>Comparador, dónde encontrarás tus búsquedas favoritas</h2>
        <p>
          Guarda tus búsquedas favoritas, así podrás ver rápidamente los precios de productos que compras habitualmente
        </p>
        <span>🛒</span>
      </div>

      <div>
        <h3>Búsquedas favoritas</h3>
        {productosFavoritos.map((producto, index) => (
          <div key={index}>
            <div>
              <p><strong>Producto más barato:</strong></p>
              <div>
                <img src="https://via.placeholder.com/100" alt={producto.nombre} />
                <div>
                  <p>{producto.nombre}</p>
                  <p>Precio: {producto.precio}</p>
                  <p>Supermercado: {producto.supermercado}</p>
                </div>
                <img src={producto.logo} alt={`Logo de ${producto.supermercado}`} />
              </div>
            </div>
            <div>
              <a href="#">Volver a realizar comparación</a>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritos;
