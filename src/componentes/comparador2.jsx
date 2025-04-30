import React, { useState } from 'react';
import ServicioProductos from '../servicios/ServicioProductos'; // Asegúrate de importar correctamente el servicio

const Comparador2 = () => {
  const [producto, setProducto] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [super1, setSuper1] = useState('');
  const [super2, setSuper2] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para manejar el envío del formulario y obtener los productos
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto.trim()) return;

    setLoading(true);
    try {
      const res = await ServicioProductos.buscarProducto(producto.trim().toLowerCase());

      if (res.data && res.data.length > 0) {
        setResultados(res.data);
        setBusqueda(res.data[0].nombre);  // Mostramos el nombre del primer producto
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
    setLoading(false);
  };

  // Filtrar productos por supermercado seleccionado
  const getProductoSupermercado = (supermercado) => {
    return resultados.filter((producto) => producto.supermercado === supermercado);
  };

  // Buscar el producto correspondiente a cada supermercado seleccionado
  const productoSuper1 = getProductoSupermercado(super1)[0];  // Solo tomamos el primer producto
  const productoSuper2 = getProductoSupermercado(super2)[0];  // Solo tomamos el primer producto

  return (
    <div className="container py-5">
       {/* Encabezado */}
       <div className="header-box mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-3">Comparador, tu comparador de confianza</h2>
          <p className="mb-0">
          Compara precios entre 2 supermercados, de esta manera podrás elegir entre los establecimientos que están más cerca de ti.
          </p>
        </div>
        <img
          src="imagenes/supermercados.png"
          alt="Supermercados"
          className="ms-3"
        />
      </div>

      {/* Formulario de búsqueda */}
      <div className="text-center mb-4">
        <p>Busca un producto y filtra por los supermercados que quieres comparar</p>
        <form onSubmit={handleSubmit} className="d-flex justify-content-center gap-2">
          <input
            type="text"
            placeholder="Busca el producto"
            className="form-control w-auto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-primary">🔍</button>
          <select value={super1} onChange={(e) => setSuper1(e.target.value)} className="form-select">
            <option value="">Supermercado 1</option>
            <option value="MERCADONA">Mercadona</option>
            <option value="CARREFOUR">Carrefour</option>
            <option value="DIA">Dia</option>
          </select>
          <select value={super2} onChange={(e) => setSuper2(e.target.value)} className="form-select">
            <option value="">Supermercado 2</option>
            <option value="MERCADONA">Mercadona</option>
            <option value="CARREFOUR">Carrefour</option>
            <option value="DIA">Dia</option>
          </select>
        </form>
      </div>

      {/* Manejo de error*/}
      {loading && (
        <div className="text-center my-4">
          <img
            src="./imagenes/loading.gif"
            alt="Cargando..."
            style={{ width: '130px', height: '130px' }}
          />
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

      {/* Sección de comparación */}
      {busqueda && !loading && (
        <div className="mt-5">
          <h3 className='text-center'>Producto comparado: {producto}</h3>
          <div className="d-flex justify-content-center gap-4">
            {super1 && productoSuper1 && (
              <div className="card" style={{ width: '18rem' }}>
                {/* Aquí no tenemos una imagen, por lo que podemos dejar una imagen genérica */}
                <img src={productoSuper1.imagen} alt={busqueda} className="card-img-top" />
                <div className="card-body">
                  <p className="card-text">{productoSuper1.nombre} {productoSuper1.tamanoUnidad}{productoSuper1.unidadMedida.toUpperCase()}</p>
                  <p className="card-text">Precio: {productoSuper1.precio}€</p>
                  <p className="card-text">Supermercado: {super1}</p>
                </div>
              </div>
            )}
            {super2 && productoSuper2 && (
              <div className="card" style={{ width: '18rem' }}>
                {/* Aquí tampoco tenemos una imagen, por lo que podemos dejar una imagen genérica */}
                <img src={productoSuper2.imagen} alt={busqueda} className="card-img-top" />
                <div className="card-body">
                  <p className="card-text">{productoSuper2.nombre} {productoSuper2.tamanoUnidad}{productoSuper2.unidadMedida.toUpperCase()}</p>
                  <p className="card-text">Precio: {productoSuper2.precio}€</p>
                  <p className="card-text">Supermercado: {super2}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comparador2;
