import React, { useState, useEffect } from 'react';

const Historial = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Simulamos que cargamos datos de historial (puedes cambiarlo por un fetch o axios)
    const datosHistorial = [
      {
        producto: 'Leche Semi Desnatada',
        resultados: [
          {
            nombre: 'Leche Hacendado 250ml',
            precio: '1,05€',
            supermercado: 'Mercadona',
            imagen: 'https://via.placeholder.com/100',
          },
          {
            nombre: 'Leche Día 250ml',
            precio: '1,10€',
            supermercado: 'Día',
            imagen: 'https://via.placeholder.com/100',
          },
          {
            nombre: 'Leche Carrefour 250ml',
            precio: '1,15€',
            supermercado: 'Carrefour',
            imagen: 'https://via.placeholder.com/100',
          },
        ],
      },
      {
        producto: 'Leche Semi Desnatada',
        resultados: [
          {
            nombre: 'Leche Hacendado 250ml',
            precio: '1,05€',
            supermercado: 'Mercadona',
            imagen: 'https://via.placeholder.com/100',
          },
          {
            nombre: 'Leche Día 250ml',
            precio: '1,10€',
            supermercado: 'Día',
            imagen: 'https://via.placeholder.com/100',
          },
          {
            nombre: 'Leche Carrefour 250ml',
            precio: '1,15€',
            supermercado: 'Carrefour',
            imagen: 'https://via.placeholder.com/100',
          },
        ],
      },
    ];

    setHistorial(datosHistorial);
  }, []);

  return (
    <div>
      <div>
        <h2>Comparador, tu comparador de confianza</h2>
        <p>
          Mira los productos recientemente comparados para una rápida y eficiente forma de ver los precios de los productos recientemente buscados.
        </p>
      </div>

      {historial.map((item, index) => (
        <section key={index}>
          <h3>Producto comparado: {item.producto}</h3>
          <div>
            {item.resultados.map((resultado, idx) => (
              <div key={idx}>
                <img src={resultado.imagen} alt={resultado.nombre} />
                <p>{resultado.nombre}</p>
                <p>Precio: {resultado.precio}</p>
                <p>Supermercado: {resultado.supermercado}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Historial;
