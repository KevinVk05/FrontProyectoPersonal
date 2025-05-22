import { useState } from "react";
import ServicioProductos from "../servicios/ServicioProductos";

const ListasPredeterminadas = () => {

    const [productosLista, setProductosLista] = useState()
    ServicioProductos.prods().then((respuesta) => {
        setProductosLista(respuesta.data)
    })
    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={productosLista} />

            {productosLista.length > 0 && !loading && (
                <section className='p-3 shadow-sm border rounded'>
                    <div className='d-flex gap-3 justify-content-center py-4'>
                        <div className='d-flex align-items-center'><span>Si ya has realizado la compra...</span></div>
                        <button className='btn btn-danger' onClick={() => abrirModalEliminarLista()}>Descartar lista</button>
                    </div>
                    {Object.entries(productosPorSupermercado).map(([nombreSupermercado, productos], indexSuper) => (
                        <div key={indexSuper}>
                            {productos.length > 0 && (
                                <div className='shadow-sm border rounded mb-4'>
                                    <img
                                        src={`imagenes/${nombreSupermercado.toUpperCase()}_NOMBRE.svg`}
                                        alt={nombreSupermercado}
                                        className='mt-5 ms-5'
                                        style={{ height: 30 }} />
                                    <div className='d-flex overflow-auto align-items-stretch gap-3 m-4'>
                                        {productos.map((item, indexProd) => (
                                            <div
                                                key={indexProd}
                                                className={`product-card my-3${eliminando === obtenerIdProducto(item) ? ' fade-up' : ''}`}
                                                id={obtenerIdProducto(item)}
                                                style={{ viewTransitionName: obtenerIdProducto(item) }}
                                            >
                                                <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between"
                                                    style={{
                                                        width: 250,
                                                    }}>
                                                    <div className="d-flex justify-content-center">
                                                        <img
                                                            src={item.urlImagen}
                                                            className="p-3"
                                                            alt={item.nombre}
                                                            style={{ maxHeight: 200 }}
                                                        />
                                                    </div>
                                                    <div className="text-center mt-auto">
                                                        <p className="mb-2 fs-6 fw-bold">{item.nombre}</p>
                                                        <p className="my-1 mx-1">
                                                            Precio: <strong>{item.precio}€</strong>
                                                        </p>
                                                        <p>
                                                            Precio a granel: <strong>{item.precioGranel} €/{item.unidadMedida}</strong>
                                                        </p>
                                                        <button type="button" className={`btn btn-danger delete-btn-${item.index}-${item.supermercado}`} onClick={() => abrirModalEliminarProducto(item)}>Eliminar de la cesta</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}
        </div>
    )
}

export default ListasPredeterminadas;