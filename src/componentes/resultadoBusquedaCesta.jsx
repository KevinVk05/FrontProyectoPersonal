import { useState } from "react";
import EstadoBusqueda from "./estadoBusqueda";
import ModalEliminarProducto from "./modalEliminarProducto";
import ModalEliminarLista from "./modalEliminarLista";
import Modal from "./modal";

const ResultadoBusquedaCesta = ({ resultadosPorSupermercados, error, loading }) => {

    const [childrenModal, setChildrenModal] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }

    const abrirModalEliminarLista = (lista) => {
        setChildrenModal(<ModalEliminarLista lista={lista} onClose={closeModal} />)
        openModal()
    }


    const abrirModalEliminarProducto = (producto, indexProducto) => {
        setChildrenModal(<ModalEliminarProducto producto={producto} indexProducto={indexProducto} onClose={closeModal} />)
        openModal()
    }

    return (
        <div>
            <EstadoBusqueda loading={loading} error={error} resultados={resultadosPorSupermercados} />

            {resultadosPorSupermercados && !loading && (
                <section className='p-3 shadow-sm border rounded'>
                    <div className='d-flex gap-3 justify-content-center py-4'>
                        <div className='d-flex align-items-center'><span>Si ya has realizado la compra...</span></div>
                        <button className='btn btn-danger' onClick={() => abrirModalEliminarLista()}>Descartar lista</button>
                    </div>
                    {Object.entries(resultadosPorSupermercados).map(([nombreSupermercado, productos], indexSuper) => (
                        <div key={indexSuper} className='shadow-sm border rounded mb-4'>
                            <img
                                src={`imagenes/${nombreSupermercado.toUpperCase()}_NOMBRE.svg`}
                                alt={nombreSupermercado}
                                className='mt-5 ms-5'
                                style={{ height: 30 }} />


                            <div className='d-flex overflow-auto align-items-stretch gap-3 m-4'>
                                {productos.map((item, index) => (
                                    <div key={index} className="product-card my-3">
                                        <div className="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between"
                                         style={{
                                            width: 250, 
                                            viewTransitionName: `card-${nombreSupermercado}-${index}`
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
                                                <button type="button" className='btn btn-danger' onClick={() => abrirModalEliminarProducto(item, index)}>Eliminar de la cesta</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>

        </div>
    )
}

export default ResultadoBusquedaCesta;