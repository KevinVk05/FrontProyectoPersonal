import { useEffect, useState } from "react";
import ServicioProductos from "../servicios/ServicioProductos";
import EstadoBusqueda from "./estadoBusqueda";

const ListasPredeterminadas = ({loading, error}) => {

    const [productosLista, setProductosLista] = useState([])

    useEffect(() => {
            ServicioProductos.prods().then((respuesta) => {
        setProductosLista(respuesta.data)
    })
    }, [])

    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={productosLista} />

            {/* <section className='p-3 shadow-sm border rounded'> */}
                {productosLista.length > 0 && (
                    <div className='shadow-sm border rounded p-4'>
                        <div className="m-4">Lista predeterminada</div>
                        <div className='d-flex overflow-auto align-items-stretch gap-3 m-4'>
                            {productosLista.map((item, indexProd) => (
                                <div key={indexProd} className="product-card mb-3 shadow-sm m-2">
                                    <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between"
                                        style={{
                                            width: 250,
                                        }}>
                                                                                <img
                                        src={`imagenes/${item.supermercado}_NOMBRE.svg`}
                                        alt={item.supermercado}
                                        className='mt-2'
                                        style={{ height: 25 }}
                                    />
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
                                            <button type="button" className={`btn btn-danger delete-btn-${item.index}-${item.supermercado}`} >Eliminar de la cesta</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            {/* </section> */}
        </div>
    )
}

export default ListasPredeterminadas;