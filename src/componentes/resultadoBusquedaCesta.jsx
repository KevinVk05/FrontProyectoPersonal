import { useState } from "react";
import EstadoBusqueda from "./estadoBusqueda";
import ModalEliminarProducto from "./modalEliminarProducto";
import ModalEliminarLista from "./modalEliminarLista";
import Modal from "./modal";
import "../estilos/transicion.css"

const ResultadoBusquedaCesta = ({ resultadosPorSupermercados, error, loading }) => {

    const [productoEliminado, setProductoEliminado] = useState([])
    const [childrenModal, setChildrenModal] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChildrenModal(null)
    }

    const eliminarProd = (producto) => {
        document.querySelectorAll(`.delete-btn-${producto.index}-${producto.supermercado}`).forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.carta');

                // Añadir la clase para la animación de difuminado
                card.classList.add('fade-up');

                // Después de 1 segundo (que es la duración de la animación), eliminar la carta
                setTimeout(() => {
                    card.remove(); // Elimina la carta del DOM

                    // Reorganiza las cartas restantes con el efecto de rebote
                    const cards = document.querySelectorAll('.carta');
                    cards.forEach(card => {
                        card.classList.remove('bounce'); // Limpiar animaciones anteriores
                        card.offsetHeight; // Forzar reflow para reiniciar la animación
                        card.classList.add('bounce'); // Añadir la animación de rebote
                    });
                }, 1000); // 1000 ms coincide con la duración de la animación fadeUp
            });
        });
    }
    

    const abrirModalEliminarLista = (lista) => {
        setChildrenModal(<ModalEliminarLista lista={lista} onClose={closeModal} />)
        openModal()
    }


    const abrirModalEliminarProducto = (producto) => {
        setChildrenModal(<ModalEliminarProducto producto={producto} onClose={closeModal} eliminarProd={eliminarProd} />)
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
                                            <div key={indexProd} className="carta product-card my-3">
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

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {childrenModal}
            </Modal>

        </div>
    )
}

export default ResultadoBusquedaCesta;