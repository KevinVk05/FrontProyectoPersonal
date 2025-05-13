import React, { useState, useEffect } from 'react';
import EstadoBusqueda from './estadoBusqueda';
import ServicioUsuario from '../servicios/ServicioUsuario';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import ResultadoBusquedaCesta from './resultadoBusquedaCesta';
import Encabezado from './encabezados';

const CestaCompra = () => {

  const titulo = "Comparator, tu cesta de la compra al mejor precio"
  const textoEncabezado1 = "Organiza tu cesta de la compra, asegurándote de hacerla al menor precio manteniendo la misma calidad."
  const textoEncabezado2 = "Tu cesta de la compra:"

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultadosPorSupermercados, setResultadosPorSupermercados] = useState({
    Mercadona: [],
    Carrefour: [],
    Dia: [],
    Ahorramas: []
  });

  const dividirResultadosPorSupermercados = (productos) => {
    const clasificados = {
      mercadona: [],
      carrefour: [],
      dia: [],
      ahorramas: []
    };

    productos.forEach(prod => {
      const supermercado = prod.supermercado.toLowerCase();

      if (clasificados[supermercado]) {
        clasificados[supermercado].push(prod);
      }
    });
    console.log(clasificados)
    setResultadosPorSupermercados(clasificados);
  };


  useEffect(() => {

    setLoading(true)

    //ServicioProductos.buscarCesta(user).then(respuesta => {
    ServicioUsuario.prods().then(respuesta => {
      if (respuesta.data && respuesta.data.length > 0) {
        dividirResultadosPorSupermercados(respuesta.data)
        setError(null);
        setLoading(false); // termina la carga después del delay
        console.log(loading)
      } else {
        setError('No se encontraron productos.');
        setResultadosPorSupermercados({
          Mercadona: [],
          Carrefour: [],
          Dia: [],
          Ahorramas: []
        });
        setLoading(false);
      }
    })
      .catch(() => {
        setError('Ha ocurrido un error con la conexión');
        setResultadosPorSupermercados({
          Mercadona: [],
          Carrefour: [],
          Dia: [],
          Ahorramas: []
        });
        setLoading(false);
      })
  }, [])

  return (
    <div className="container py-4">
      <Encabezado titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"} />

      <EstadoBusqueda loading={loading} error={error} resultados={resultadosPorSupermercados} />

      <ResultadoBusquedaCesta resultadosPorSupermercados={resultadosPorSupermercados} error={error} loading={loading}/>

    </div>
  )
};

export default CestaCompra;