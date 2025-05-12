import React, { useState, useEffect } from 'react';
import ServicioProductos from '../servicios/ServicioProductos';
import EstadoBusqueda from './estadoBusqueda';
import { useAuth } from '../Login/AuthProvider';
import EncabezadoComparadores from './encabezadoComparadores';
const CestaCompra = () => {

  const titulo = "Comparator, tu cesta de la compra al mejor precio"
  const textoEncabezado1 = "Organiza tu cesta de la compra, asegurándote de hacerla al menor precio manteniendo la misma calidad."
  const textoEncabezado2 = "Tu cesta de la compra:"

  const { user } = useAuth();
  const [producto, setProducto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [supermercado, setSupermercado] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // nuevo estado de loading

  useEffect(() => {

    setLoading(true)

    ServicioProductos.buscarCesta(user).then(respuesta => {
      if (respuesta.data && respuesta.data.length > 0) {
        setResultados(respuesta.data);
        setError(null);
        setLoading(false); // termina la carga después del delay
      }else{
          setError('No se encontraron productos.');
          setResultados([]);
          setLoading(false);
      }
    })
    .catch(() => {
      setError('Ha ocurrido un error con la conexión');
      setResultados([]);
      setLoading(false);
    })
  }, [])

  return (
    <div className="container py-4">
      <EncabezadoComparadores titulo={titulo} texto1={textoEncabezado1} texto2={textoEncabezado2} img={"imagenes/compra.png"} />

      <EstadoBusqueda loading={loading} error={error} resultados={resultados}/>
      
      {/* Hacer que se muestren los productos dependiendo de en qué supermercado están
      Hay que recorrer los resultados y dividirlos por supermercado, mediante
      un scroll horizontal hacer que se puedan ver dependiendo del supermercado
      Además poner encima de las listas cuando se hizo, la fecha y la opción de borrar
      la lista o productos. Por lo tanto tiene que haber id de lista, e id de producto */}
      <div>

      </div>
    </div>
  )
};

export default CestaCompra;